import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ErrorIndicator } from "../../lib/components";
import { CREATE_ACCOUNT } from "../../lib/graphql/mutations";
import {
  CreateAccount as CreateAccountData,
  CreateAccountVariables,
} from "../../lib/graphql/mutations/CreateAccount/__generated__/CreateAccount";
import { Viewer } from "../../lib/type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createAccountCard: {
      borderRadius: 8,
      width: 800,
      margin: "30px auto 0",
    },
    createAccountText: {
      fontSize: "1.5rem",
      textAlign: "left",
      marginBottom: 10,
      marginTop: 15,
      paddingLeft: 40,
    },
    promptText: {
      marginBottom: 24,
      marginLeft: 40,
      fontSize: "1rem",
    },
    inputContainer: {
      margin: "0 40px",
    },
    input: {
      width: "30%",
      paddingRight: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      marginTop: 30,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 30,
      display: "flex",
      justifyContent: "space-between",
    },
    formClassifyText: {
      color: "#5f6368",
      fontSize: "0.8em",
      marginBottom: 5,
      marginTop: 10,
    },
  })
);

interface Props {
  isAuthorized: boolean;
  setViewer: (viewer: Viewer) => void;
}

interface UserInfo {
  name: string;
  userName: string;
  gender: string;
  password: string;
  education: string;
  marriageStatus: string;
  jobStatus: string;
  age: string;
}

const initialUserInfo = {
  name: "",
  userName: "",
  gender: "",
  password: "",
  education: "",
  marriageStatus: "",
  jobStatus: "",
  age: "",
};

export const CreateAccount = ({ isAuthorized, setViewer }: Props) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [reenteredPassword, setReenteredPassword] = useState<string>("");
  const [createAccount] = useMutation<
    CreateAccountData,
    CreateAccountVariables
  >(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      if (data && data.createAccount && data.createAccount.token) {
        setViewer(data.createAccount);
      }
    },
    onError: (error) => {
      if (
        error.message.includes("One user with this userName already exists.")
      ) {
        setErrorMessage("???????????????????????????");
        setShowError(true);
        setErrorField("userNameDuplicate");
      }
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [errorField, setErrorField] = useState<string>();
  const createAccountButtonOnClick = () => {
    if (!userInfo.userName) {
      setErrorMessage("???????????????????????????");
      setShowError(true);
      setErrorField("userName");
      return;
    }
    if (!userInfo.password) {
      setErrorMessage("????????????????????????");
      setShowError(true);
      setErrorField("password");
      return;
    }
    if (!reenteredPassword) {
      setErrorMessage("??????????????????????????????");
      setShowError(true);
      setErrorField("reenteredPassword");
      return;
    }
    if (userInfo.password !== reenteredPassword) {
      setErrorMessage("?????????????????????????????????");
      setShowError(true);
      setErrorField("reenteredPasswordNotSame");
      return;
    }
    if (!userInfo.name) {
      setErrorMessage("????????????????????????");
      setShowError(true);
      setErrorField("name");
      return;
    }
    createAccount({
      variables: {
        input: {
          ...userInfo,
          age: userInfo.age === "" ? undefined : Number(userInfo.age),
        },
      },
    });
  };
  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, userName: e.target.value });
    if (
      errorField === "userName" ||
      (errorField === "userNameDuplicate" && e.target.value)
    ) {
      setErrorField(undefined);
    }
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    if (errorField === "password" && e.target.value) {
      setErrorField(undefined);
    }
  };
  const onReenteredPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReenteredPassword(e.target.value);
    if (errorField === "reenteredPassword" && e.target.value) {
      setErrorField(undefined);
    } else if (
      errorField === "reenteredPasswordNotSame" &&
      e.target.value === userInfo.password
    ) {
      setErrorField(undefined);
    }
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, name: e.target.value });
    if (errorField === "name" && e.target.value) {
      setErrorField(undefined);
    }
  };
  const onGenderChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setUserInfo({ ...userInfo, gender: e.target.value as string });
  };
  const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, age: e.target.value });
  };
  const onEducationChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setUserInfo({ ...userInfo, education: e.target.value as string });
  };
  const onJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, jobStatus: e.target.value });
  };
  const onMarraigeChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setUserInfo({ ...userInfo, marriageStatus: e.target.value as string });
  };
  if (isAuthorized) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Toolbar />
      <Card className={classes.createAccountCard} variant="outlined">
        <CardContent>
          <div className={classes.createAccountText}>??????</div>
          <div className={classes.promptText}>???????????????????????????</div>
          <form>
            <div className={classes.inputContainer}>
              <div className={classes.formClassifyText}>????????????</div>
              <div>
                <TextField
                  required
                  className={classes.input}
                  color="primary"
                  label="?????????"
                  size="small"
                  value={userInfo.userName}
                  onChange={onUserNameChange}
                  helperText={
                    errorField === "userName"
                      ? "???????????????????????????"
                      : errorField === "userNameDuplicate"
                      ? "???????????????????????????"
                      : undefined
                  }
                  error={
                    errorField === "userName" ||
                    errorField === "userNameDuplicate"
                      ? true
                      : undefined
                  }
                />
              </div>
              <div>
                <TextField
                  required
                  className={classes.input}
                  color="primary"
                  type="password"
                  label="??????"
                  size="small"
                  value={userInfo.password}
                  onChange={onPasswordChange}
                  helperText={
                    errorField === "password" ? "????????????????????????" : undefined
                  }
                  error={errorField === "password" ? true : undefined}
                />
                <TextField
                  required
                  type="password"
                  className={classes.input}
                  color="primary"
                  label="????????????"
                  size="small"
                  value={reenteredPassword}
                  onChange={onReenteredPasswordChange}
                  helperText={
                    errorField === "reenteredPassword"
                      ? "????????????????????????"
                      : errorField === "reenteredPasswordNotSame"
                      ? "?????????????????????????????????"
                      : undefined
                  }
                  error={
                    errorField === "reenteredPassword" ||
                    errorField === "reenteredPasswordNotSame"
                      ? true
                      : undefined
                  }
                />
              </div>
              <div className={classes.formClassifyText}>????????????</div>
              <TextField
                required
                className={classes.input}
                color="primary"
                label="??????"
                size="small"
                value={userInfo.name}
                onChange={onNameChange}
                helperText={
                  errorField === "name" ? "?????????????????????!" : undefined
                }
                error={errorField === "name" ? true : undefined}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>??????</InputLabel>
                <Select
                  color="primary"
                  label="??????"
                  value={userInfo.gender}
                  onChange={onGenderChange}
                >
                  <MenuItem value="???">???</MenuItem>
                  <MenuItem value="???">???</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.input}
                color="primary"
                label="??????"
                size="small"
                value={userInfo.age}
                onChange={onAgeChange}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>??????</InputLabel>
                <Select
                  color="primary"
                  value={userInfo.education}
                  onChange={onEducationChange}
                >
                  <MenuItem value="????????????">????????????</MenuItem>
                  <MenuItem value="????????????">????????????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.input}
                color="primary"
                label="??????"
                size="small"
                value={userInfo.jobStatus}
                onChange={onJobChange}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>??????</InputLabel>
                <Select
                  color="primary"
                  value={userInfo.marriageStatus}
                  onChange={onMarraigeChange}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.buttonContainer}>
              <Link to="/login">
                <Button>???????????????</Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                onClick={createAccountButtonOnClick}
              >
                ??????
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ErrorIndicator
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
      />
    </>
  );
};
