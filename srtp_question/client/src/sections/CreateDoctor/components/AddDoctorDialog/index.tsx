import {
  FetchResult,
  MutationFunctionOptions,
  QueryLazyOptions,
} from "@apollo/client";
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
  debounce,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { ErrorIndicator } from "../../../../lib/components";
import { SuccessIndicator } from "../../../../lib/components/SuccessIndicator";
import {
  AddDoctor,
  AddDoctorVariables,
} from "../../../../lib/graphql/mutations/AddDoctor/__generated__/AddDoctor";
import {
  CheckIfDoctorNameUnique,
  CheckIfDoctorNameUniqueVariables,
} from "../../../../lib/graphql/queries/CheckIfDoctorNameUnique/__generated__/CheckIfDoctorNameUnique";

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  checkDoctorUserName: (
    options: QueryLazyOptions<CheckIfDoctorNameUniqueVariables>
  ) => void;
  checkResult: CheckIfDoctorNameUnique | undefined;
  addDoctor: (
    options?: MutationFunctionOptions<AddDoctor, AddDoctorVariables>
  ) => Promise<FetchResult<AddDoctor>>;
  refetchListData: () => void;
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

export const AddDoctorDialog = (props: Props) => {
  const classes = useStyles();
  const {
    isOpen,
    closeDialog,
    checkDoctorUserName,
    checkResult,
    addDoctor,
    refetchListData,
  } = props;
  const [userNameInput, setUserNameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [secondPasswordInput, setSecondPasswordInput] = useState("");
  const [userNameDuplicate, setUserNameDubplicate] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessShown, setIsSuccessShown] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheckDoctorUserName = useCallback(
    debounce(checkDoctorUserName, 300),
    [checkDoctorUserName]
  );
  useEffect(() => {
    setUserNameInput("");
    setNameInput("");
    setPasswordInput("");
    setSecondPasswordInput("");
    setUserNameDubplicate(false);
    setIsSuccessShown(false);
  }, [isOpen]);
  useEffect(() => {
    checkResult &&
      setUserNameDubplicate(!checkResult.checkIfDoctorUserNameUnique.result);
  }, [checkResult]);
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameInput(e.target.value);
    setUserNameDubplicate(false);
    debouncedCheckDoctorUserName({
      variables: {
        userName: e.target.value,
      },
    });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSecondPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondPasswordInput(e.target.value);
  };

  const handleAddButtonClick = async () => {
    if (passwordInput !== secondPasswordInput) {
      setErrorMessage("?????????????????????????????????");
      setIsErrorShown(true);
      return;
    }
    const result = await addDoctor({
      variables: {
        input: {
          userName: userNameInput,
          name: nameInput,
          password: passwordInput,
        },
      },
    });
    if (result.data?.addDoctor.result) {
      closeDialog();
      refetchListData();
      setIsSuccessShown(true);
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">????????????</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ????????????????????????????????????????????????
          </DialogContentText>
          <TextField
            autoFocus
            label="?????????"
            className={classes.input}
            fullWidth
            required
            value={userNameInput}
            onChange={handleUserNameChange}
            error={userNameDuplicate || undefined}
            helperText={userNameDuplicate ? "??????????????????????????????" : undefined}
          />
          <TextField
            label="??????"
            className={classes.input}
            fullWidth
            required
            value={nameInput}
            onChange={handleNameChange}
          />
          <TextField
            label="??????"
            className={classes.input}
            fullWidth
            required
            type="password"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <TextField
            label="????????????"
            className={classes.input}
            fullWidth
            required
            type="password"
            value={secondPasswordInput}
            onChange={handleSecondPasswordInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>??????</Button>
          <Button
            onClick={handleAddButtonClick}
            color="primary"
            disabled={
              userNameDuplicate ||
              !nameInput ||
              !userNameInput ||
              !passwordInput ||
              !secondPasswordInput
                ? true
                : undefined
            }
          >
            ??????
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
        successMessage="??????????????????"
      />
    </>
  );
};
