import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogContentText,
  createStyles,
  makeStyles,
  Theme,
  Button,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  ADDITIONAL_FIELD_KEYS,
  ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES,
} from "..";
import { ADD_DIAGNOSIS } from "../../../../lib/graphql/mutations";
import {
  AddDiagnosis,
  AddDiagnosisVariables,
} from "../../../../lib/graphql/mutations/AddDiagnosis/__generated__/AddDiagnosis";

interface Props {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  patientName: string;
  patientId: string;
  refetch: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    diagnosisText: {
      minWidth: 250,
    },
  })
);

export const AddDiagnosisModal = ({
  isDialogOpen,
  handleDialogClose,
  patientName,
  patientId,
  refetch,
}: Props) => {
  const [addDiagnosis] = useMutation<AddDiagnosis, AddDiagnosisVariables>(
    ADD_DIAGNOSIS
  );
  useEffect(() => {
    setDiagnosis("");
  }, [patientName]);
  const classes = useStyles();
  const [diagnosis, setDiagnosis] = useState("");
  const handleDiagnosisSelectChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setDiagnosis(e.target.value as string);
  };
  const handleComfirm = async () => {
    if (diagnosis !== "") {
      await addDiagnosis({
        variables: {
          input: {
            patientId,
            diagnosis:
              ADDITIONAL_FIELD_KEYS[
                ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES.indexOf(
                  diagnosis as typeof ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES[number]
                )
              ],
          },
        },
      });
    } else {
      await addDiagnosis({
        variables: {
          input: {
            patientId,
            diagnosis,
          },
        },
      });
    }
    handleDialogClose();
    refetch();
  };
  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>诊断</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.diagnosisText}>
          给{patientName}添加诊断
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel shrink>诊断</InputLabel>
          <Select value={diagnosis} onChange={handleDiagnosisSelectChange}>
            {ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>取消</Button>
        <Button onClick={handleComfirm} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
};
