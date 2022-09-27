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
        setErrorMessage("此门诊号已被注册！");
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
      setErrorMessage("请输入您的门诊号！");
      setShowError(true);
      setErrorField("userName");
      return;
    }
    if (!userInfo.password) {
      setErrorMessage("请输入您的密码！");
      setShowError(true);
      setErrorField("password");
      return;
    }
    if (!reenteredPassword) {
      setErrorMessage("请确认您输入的密码！");
      setShowError(true);
      setErrorField("reenteredPassword");
      return;
    }
    if (userInfo.password !== reenteredPassword) {
      setErrorMessage("两次输入的密码不一致！");
      setShowError(true);
      setErrorField("reenteredPasswordNotSame");
      return;
    }
    if (!userInfo.name) {
      setErrorMessage("请输入您的姓名！");
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
          <div className={classes.createAccountText}>注册</div>
          <div className={classes.promptText}>请输入您的个人信息</div>
          <form>
            <div className={classes.inputContainer}>
              <div className={classes.formClassifyText}>登录信息</div>
              <div>
                <TextField
                  required
                  className={classes.input}
                  color="primary"
                  label="门诊号"
                  size="small"
                  value={userInfo.userName}
                  onChange={onUserNameChange}
                  helperText={
                    errorField === "userName"
                      ? "请输入您的门诊号！"
                      : errorField === "userNameDuplicate"
                      ? "此门诊号已被注册！"
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
                  label="密码"
                  size="small"
                  value={userInfo.password}
                  onChange={onPasswordChange}
                  helperText={
                    errorField === "password" ? "请输入您的密码！" : undefined
                  }
                  error={errorField === "password" ? true : undefined}
                />
                <TextField
                  required
                  type="password"
                  className={classes.input}
                  color="primary"
                  label="确认密码"
                  size="small"
                  value={reenteredPassword}
                  onChange={onReenteredPasswordChange}
                  helperText={
                    errorField === "reenteredPassword"
                      ? "请确认您的密码！"
                      : errorField === "reenteredPasswordNotSame"
                      ? "两次输入的密码不一致！"
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
              <div className={classes.formClassifyText}>个人信息</div>
              <TextField
                required
                className={classes.input}
                color="primary"
                label="姓名"
                size="small"
                value={userInfo.name}
                onChange={onNameChange}
                helperText={
                  errorField === "name" ? "请输入您的姓名!" : undefined
                }
                error={errorField === "name" ? true : undefined}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>性别</InputLabel>
                <Select
                  color="primary"
                  label="性别"
                  value={userInfo.gender}
                  onChange={onGenderChange}
                >
                  <MenuItem value="男">男</MenuItem>
                  <MenuItem value="女">女</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.input}
                color="primary"
                label="年龄"
                size="small"
                value={userInfo.age}
                onChange={onAgeChange}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>教育</InputLabel>
                <Select
                  color="primary"
                  value={userInfo.education}
                  onChange={onEducationChange}
                >
                  <MenuItem value="高中以下">高中以下</MenuItem>
                  <MenuItem value="大中专科">大中专科</MenuItem>
                  <MenuItem value="本科">本科</MenuItem>
                  <MenuItem value="硕士">硕士</MenuItem>
                  <MenuItem value="博士">博士</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.input}
                color="primary"
                label="职业"
                size="small"
                value={userInfo.jobStatus}
                onChange={onJobChange}
              />
              <FormControl className={classes.input} size="small">
                <InputLabel>婚姻</InputLabel>
                <Select
                  color="primary"
                  value={userInfo.marriageStatus}
                  onChange={onMarraigeChange}
                >
                  <MenuItem value="已婚">已婚</MenuItem>
                  <MenuItem value="未婚">未婚</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.buttonContainer}>
              <Link to="/login">
                <Button>我已有账号</Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                onClick={createAccountButtonOnClick}
              >
                注册
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
