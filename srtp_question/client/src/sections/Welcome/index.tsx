import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ElementRef, useRef, useState } from "react";
import { DoctorLogInDialog } from "./components";
import logo from "../AppHeader/assets/logo.png";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { FetchResult } from "@apollo/client";
// import { DOCTOR_LOG_OUT } from "../../lib/graphql/mutations";
import { Doctor } from "../../lib/type";
// import { DoctorLogOut } from "../../lib/graphql/mutations/DoctorLogOut/__generated__/doctorLogOut";
import { useHistory } from "react-router-dom";
import { ErrorIndicator } from "../../lib/components";
import {
  DoctorLogIn,
  DoctorLogInVariables,
} from "../../lib/graphql/mutations/DoctorLogIn/__generated__/DoctorLogIn";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      background: "#e3f2fd",
    },
    logoContainer: {
      display: "flex",
      minHeight: 92,
      maxHeight: 290,
      height: "calc(100% - 560px)",
      justifyContent: "center",
    },
    logo: {
      maxHeight: 92,
      height: "100%",
      marginTop: "auto",
    },
    actionContainer: {
      maxHeight: 160,
      padding: 20,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "1.5rem",
    },
    enterSystemButtonContainer: {
      marginTop: 18,
    },
    extendedIcon: {
      position: "absolute",
      right: 20,
      bottom: 20,
      backgroundColor: "#fff",
    },
    seuText: {
      margin: "10px 0 15px",
    },
    header: {
      height: 52,
    },
  })
);

interface Props {
  doctor: Doctor;
  setDoctor: (doctor: Doctor) => void;
  logIn: (variables?: {
    variables: DoctorLogInVariables;
  }) => Promise<FetchResult<DoctorLogIn>>;
}

export const Welcome = ({ setDoctor, doctor, logIn }: Props) => {
  const history = useHistory();
  const classes = useStyles();
  const doctorLogInDialogRef = useRef<ElementRef<typeof DoctorLogInDialog>>(
    null
  );
  // const [logOut] = useMutation<DoctorLogOut>(DOCTOR_LOG_OUT, {
  //   onCompleted: (data) => {
  //     if (data && data.doctorLogOut) {
  //       setDoctor(data.doctorLogOut);
  //       sessionStorage.removeItem("token");
  //       console.log("log out successfully");
  //     }
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     console.log("log out failed");
  //   },
  // });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const openDoctorLoginDialog = () => {
  //   doctorLogInDialogRef.current?.hideError();
  //   setIsDialogOpen(true);
  // };
  // const handleDoctorLogOut = () => {
  //   logOut();
  // };
  const [isLogInErrorShown, setIsLogInErrorShown] = useState(false);
  const handleDoctorLogIn = async (password: string) => {
    if (doctor.userName) {
      if (!password) {
        doctorLogInDialogRef.current?.showError();
        return;
      }
      try {
        const logInResult = await logIn({
          variables: {
            input: {
              userName: doctor.userName,
              password,
            },
          },
        });
        if (logInResult.data && logInResult.data.doctorLogIn.userName) {
          console.log("Second login succeeds.");
          history.push("/doctor");
        }
      } catch {
        setIsLogInErrorShown(true);
      }
    }
  };
  const hideErrorIndicator = () => {
    setIsLogInErrorShown(false);
  };
  const goToLoginPage = () => {
    history.push("/user/login");
  };
  return (
    <div className={classes.root}>
      <div className={classes.header} />
      {/* <Header handleDoctorLogOut={handleDoctorLogOut} doctor={doctor} /> */}
      <div className={classes.logoContainer}>
        <img src={logo} alt="中大医院" className={classes.logo} />
      </div>
      <div className={classes.actionContainer}>
        <div className={classes.seuText}>东南大学附属中大医院</div>
        <div>心理健康评估系统</div>
        <div className={classes.enterSystemButtonContainer}>
          <Button
            startIcon={<PlayArrowRoundedIcon />}
            color="primary"
            variant="contained"
            onClick={goToLoginPage}
          >
            进入系统
          </Button>
        </div>
      </div>
      {/* <Fab
        variant="extended"
        className={classes.extendedIcon}
        onClick={openDoctorLoginDialog}
      >
        <SupervisorAccountIcon />
        医生端
      </Fab> */}
      {doctor.name && (
        <DoctorLogInDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          doctorName={doctor.name}
          handleDoctorLogIn={handleDoctorLogIn}
          hideErrorIndicator={hideErrorIndicator}
          ref={doctorLogInDialogRef}
        />
      )}
      <ErrorIndicator
        showError={isLogInErrorShown}
        setShowError={setIsLogInErrorShown}
        errorMessage={"密码不正确！"}
      />
    </div>
  );
};
