import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ErrorIndicator, LoadingIndicator } from "../../lib/components";
import { DOCTOR_LOG_IN } from "../../lib/graphql/mutations";
import {
  DoctorLogIn,
  DoctorLogInVariables,
} from "../../lib/graphql/mutations/DoctorLogIn/__generated__/DoctorLogIn";
// import {
//   LogIn as LogInData,
//   LogInVariables,
// } from "../../lib/graphql/mutations/Login/__generated__/LogIn";
import { Doctor, Viewer } from "../../lib/type";
import logo from "../AppHeader/assets/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logInCard: {
      borderRadius: 8,
      width: "min(450px, 90%)",
      margin: "0 auto 0",
    },
    logInText: {
      fontSize: "1.5rem",
      textAlign: "center",
      marginBottom: 20,
      marginTop: 25,
    },
    promptText: {
      marginBottom: 24,
      fontSize: "1rem",
      textAlign: "center",
    },
    input: {
      width: "100%",
    },
    inputContainer: {
      margin: "0 40px",
    },
    userNameInput: {
      marginBottom: 15,
    },
    passwordInput: {
      marginBottom: 30,
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
    },
    logo: {
      height: 92,
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
    },
    pageContainer: {
      backgroundColor: "#f5f5f5",
      width: "100%",
      height: "100%",
    },
    topPadding: {
      height: "min(100px, 30%)",
    },
  })
);

interface AccountInfo {
  userName: string;
  password: string;
}

const initialAccountInfo = {
  userName: "",
  password: "",
};

interface Props {
  isAuthorized: boolean;
  setViewer: (viewer: Viewer) => void;
  setDoctor: (doctor: Doctor) => void;
  doctor: Doctor;
}

export const Login = ({
  isAuthorized,
  setViewer,
  setDoctor,
  doctor,
}: Props) => {
  const classes = useStyles();
  // const [logIn] = useMutation<LogInData, LogInVariables>(LOG_IN, {
  //   onCompleted: (data) => {
  //     if (data && data.logIn && data.logIn.token) {
  //       setViewer(data.logIn);
  //     }
  //   },
  //   onError: (error) => {
  //     setIsLogInErrorShown(true);
  //   },
  // });
  // const logInRef = useRef(logIn);
  const [doctorLogIn] = useMutation<DoctorLogIn, DoctorLogInVariables>(
    DOCTOR_LOG_IN,
    {
      onCompleted: (data) => {
        if (data && data.doctorLogIn) {
          const { name, userName, didRequest } = data.doctorLogIn;
          setDoctor({
            name,
            userName,
            didRequest,
          });
          setIsRedo(false);
        }
      },
      onError: (error) => {
        setIsLogInErrorShown(true);
      },
    }
  );
  const doctorLoginRef = useRef(doctorLogIn);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(
    initialAccountInfo
  );
  const [isNameAndPasswordValidated, setIsNameAndPasswordValidated] = useState(
    false
  );
  const [isLogInErrorShown, setIsLogInErrorShown] = useState(false);
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      logInButtonOnClick();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  const [isRedo, setIsRedo] = useState(true);
  const detectRedoRef = useRef(() => {
    if (
      history.location.state &&
      history.location.state.from.pathname === "/doctor"
    ) {
      setIsRedo(true);
    } else {
      setIsRedo(false);
    }
  });

  useEffect(() => {
    detectRedoRef.current();
  }, []);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo({ ...accountInfo, userName: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo({ ...accountInfo, password: e.target.value });
  };
  const logInButtonOnClick = () => {
    setIsNameAndPasswordValidated(true);
    if (accountInfo.userName && accountInfo.password)
      doctorLoginRef.current({
        variables: {
          input: {
            userName: accountInfo.userName,
            password: accountInfo.password,
          },
        },
      });
  };
  const history = useHistory<
    { from: Location; redo: boolean | undefined } | undefined
  >();
  const isDoctor =
    history.location.state &&
    history.location.state.from.pathname.includes("doctor")
      ? true
      : false;
  if (isAuthorized) {
    // let redirectUrl = "/user";
    // if (history.location.state) {
    //   redirectUrl = history.location.state.from.pathname;
    // }
    if (!isRedo) {
      if (isDoctor) {
      	
        if (!doctor.userName) {
          return <LoadingIndicator />;
        } else {
          return <Redirect to={`/doctor/${doctor.userName}`} />;
        }
      }
      return <Redirect to="/user" />;
    }
  }
  console.log("aa\n\n\n\n\n\nbbb");
  return (
    <div className={classes.pageContainer}>
      <div className={classes.topPadding} />
      <Card className={classes.logInCard}>
        <CardContent>
          <div className={classes.logoContainer}>
            <img src={logo} className={classes.logo} alt="医院标志" />
          </div>
          <div className={classes.logInText}>
            {isDoctor ? "医生端" : "用户端"}
          </div>
          <div className={classes.promptText}>请输入医生的用户名和密码</div>
          <form>
            <div className={classes.inputContainer}>
              <TextField
                autoFocus
                className={classes.input + " " + classes.userNameInput}
                color="primary"
                value={accountInfo.userName}
                label="用户名"
                onChange={handleNameChange}
                helperText={
                  isNameAndPasswordValidated && !accountInfo.userName
                    ? "请输入您的用户名"
                    : undefined
                }
                error={
                  isNameAndPasswordValidated && !accountInfo.userName
                    ? true
                    : undefined
                }
                inputProps={{ "aira-label": "用户名" }}
              />
              <TextField
                className={classes.input + " " + classes.passwordInput}
                color="primary"
                value={accountInfo.password}
                label="密码"
                helperText={
                  isNameAndPasswordValidated && !accountInfo.password
                    ? "请输入您的密码"
                    : undefined
                }
                error={
                  isNameAndPasswordValidated && !accountInfo.password
                    ? true
                    : undefined
                }
                onChange={handlePasswordChange}
                type="password"
                inputProps={{ "aira-label": "密码" }}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={logInButtonOnClick}
              >
                登录
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ErrorIndicator
        showError={isLogInErrorShown}
        setShowError={setIsLogInErrorShown}
        errorMessage={"用户名或密码不正确！"}
      />
    </div>
  );
};
