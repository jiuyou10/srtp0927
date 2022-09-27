import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  createStyles,
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ErrorIndicator } from "../../../../lib/components";
import { SuccessIndicator } from "../../../../lib/components/SuccessIndicator";
import { ADD_DOCTOR_CONFIG } from "../../../../lib/graphql/mutations";
import {
  AddDoctorConfig,
  AddDoctorConfigVariables,
} from "../../../../lib/graphql/mutations/AddDoctorConfig/__generated__/AddDoctorConfig";
import { CHECK_IF_DOCTOR_CONFIG_USER_NAME_UNIQUE } from "../../../../lib/graphql/queries";
import {
  CheckIfDoctorConfigNameUnique,
  CheckIfDoctorConfigNameUniqueVariables,
} from "../../../../lib/graphql/queries/CheckIfDoctorConfigNameUnique/__generated__/CheckIfDoctorConfigNameUnique";
import { QuestionnaireList } from "../../../../lib/graphql/queries/QuestionnaireList/__generated__/QuestionnaireList";
import { debounce } from "../../../../lib/utils";

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  refetchListData: () => void;
  formList: QuestionnaireList;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "block",
      margin: 5,
      paddingRight: 5,
    },
    inputContainer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export const AddConfigurationDialog = (props: Props) => {
  const classes = useStyles();
  const { isOpen, closeDialog, refetchListData, formList } = props;
  const [checkConfigName, { data: checkConfigNameResult }] = useLazyQuery<
    CheckIfDoctorConfigNameUnique,
    CheckIfDoctorConfigNameUniqueVariables
  >(CHECK_IF_DOCTOR_CONFIG_USER_NAME_UNIQUE, {
    fetchPolicy: "no-cache",
  });

  const [addDoctorConfig] = useMutation<
    AddDoctorConfig,
    AddDoctorConfigVariables
  >(ADD_DOCTOR_CONFIG);
  const debouncedCheckConfigName = useCallback(
    () => debounce(checkConfigName, 300),
    [checkConfigName]
  );
  const [nameInput, setNameInput] = useState("");
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessShown, setIsSuccessShown] = useState(false);
  const [checkedFormIds, setCheckedFormIds] = useState<string[]>([]);

  useEffect(() => {
    setNameInput("");
    setIsErrorShown(false);
    setErrorMessage("");
    setIsSuccessShown(false);
    if (formList && isOpen) {
      setCheckedFormIds([]);
    }
  }, [formList, isOpen]);

  useEffect(() => {
    if (checkConfigNameResult?.checkIfDoctorConfigNameUnique.result === false) {
      setErrorMessage("此配置名已存在！");
    } else {
      setErrorMessage("");
    }
  }, [checkConfigNameResult]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    debouncedCheckConfigName()({
      variables: { doctorConfigName: e.target.value },
    });
  };

  const handleSwitchChange = (formId: string) => {
    if (checkedFormIds.includes(formId)) {
      setCheckedFormIds(
        checkedFormIds.filter((currentId) => currentId !== formId)
      );
    } else {
      setCheckedFormIds([...checkedFormIds, formId]);
    }
  };

  const handleOkButtonClick = () => {
    addDoctorConfig({
      variables: {
        input: {
          configName: nameInput,
          selected: false,
          formIds: checkedFormIds,
        },
      },
    }).then((addResult) => {
      if (addResult.data?.addDoctorConfig.result === true) {
        setIsSuccessShown(true);
        closeDialog();
        refetchListData();
      }
    });
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">添加配置</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请输入配置名，并选择需要使用的量表。
          </DialogContentText>

          <TextField
            label="配置名"
            className={classes.input}
            fullWidth
            required
            value={nameInput}
            onChange={handleNameChange}
            error={errorMessage ? true : undefined}
            helperText={errorMessage || undefined}
          />
          <List>
            {formList.questionnaireList.map((form) => (
              <ListItem key={form.key}>
                <ListItemText primary={form.name} />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    color="primary"
                    checked={checkedFormIds.includes(form.id)}
                    onChange={() => handleSwitchChange(form.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>取消</Button>
          <Button
            color="primary"
            disabled={!nameInput || errorMessage ? true : undefined}
            onClick={handleOkButtonClick}
          >
            添加
          </Button>
        </DialogActions>
        <ErrorIndicator
          showError={isErrorShown}
          setShowError={setIsErrorShown}
          errorMessage={errorMessage}
        />
      </Dialog>
      <SuccessIndicator
        showSuccess={isSuccessShown}
        setShowSuccess={setIsSuccessShown}
        successMessage="成功添加配置"
      />
    </>
  );
};
