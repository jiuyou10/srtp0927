import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface Props {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  additionalFields: string[];
  setAdditionalFields: (additionalFields: string[]) => void;
  handleAdditionalFieldsSearch: (additionalFields: string[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldsContainer: {},
  })
);

export const ADDITIONAL_FIELD_KEYS = [
  "depressed",
  "anxious",
  "biphasic",
  "schizophrenia",
] as const;
export const ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES = [
  "抑郁障碍",
  "焦虑障碍",
  "双相障碍",
  "精神分裂症",
] as const;

export const removeElementFromArray = <T,>(array: T[], element: T) => {
  const newArray: T[] = [];
  for (let currentElement of array) {
    if (currentElement !== element) {
      newArray.push(currentElement);
    }
  }
  return newArray;
};

export const AdditionalFieldsModal = ({
  isDialogOpen,
  handleDialogClose,
  additionalFields,
  setAdditionalFields,
  handleAdditionalFieldsSearch,
}: Props) => {
  const classes = useStyles();

  const [selectedFields, setSelectedFields] = useState<string[]>(
    additionalFields
  );
  useEffect(() => {
    setSelectedFields(additionalFields);
  }, [isDialogOpen, additionalFields]);
  const selectAdditionalField = (
    fieldKey: typeof ADDITIONAL_FIELD_KEYS[number],
    isSelected: boolean
  ) => {
    if (!isSelected) {
      setSelectedFields(removeElementFromArray(selectedFields, fieldKey));
    } else if (!selectedFields.includes(fieldKey)) {
      setSelectedFields([...selectedFields, fieldKey]);
    }
  };
  const handleOkButtonClick = () => {
    setAdditionalFields(selectedFields);
    handleDialogClose();
    handleAdditionalFieldsSearch(selectedFields);
  };
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="form-dialog-title"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">高级筛选</DialogTitle>
      <DialogContent>
        <div className={classes.fieldsContainer}>
          {ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES.map((displayName, index) => {
            return (
              <div key={displayName}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFields.includes(
                        ADDITIONAL_FIELD_KEYS[index]
                      )}
                      onChange={(event) => {
                        selectAdditionalField(
                          ADDITIONAL_FIELD_KEYS[index],
                          event.target.checked
                        );
                      }}
                    />
                  }
                  label={displayName}
                />
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>取消</Button>
        <Button onClick={handleOkButtonClick} color="primary">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
