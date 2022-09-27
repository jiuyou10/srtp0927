import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import logo from "./assets/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Viewer } from "../../lib/type";
import { useMutation } from "@apollo/client";
import { DOCTOR_LOG_OUT } from "../../lib/graphql/mutations";
import { Route, Switch, useHistory } from "react-router-dom";
import { PatientLogOut } from "../../lib/graphql/mutations/PatientLogOut/__generated__/PatientLogOut";
import { PATIENT_LOG_OUT } from "../../lib/graphql/mutations/PatientLogOut";
import { DoctorLogOut } from "../../lib/graphql/mutations/DoctorLogOut/__generated__/doctorLogOut";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      marginRight: theme.spacing(2),
      maxWidth: 30,
      maxHeight: 30,
    },
    title: {
      flexGrow: 1,
      fontSize: "1.25rem",
    },
    timerHeader: {
      overflow: "hidden",
      backgroundColor: "rgb(236, 238, 248)",
    },
    actionContainer: {
      float: "right",
      paddingRight: 20,
      paddingTop: 10,
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
    },
  })
);

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
  type: "doctor" | "user";
  setIsSiderOpen?: (isSiderOpen: boolean) => void;
}

export const AppHeader = (props: Props) => {
  const { viewer, setViewer, type } = props;
  const history = useHistory();

  const [width, setWidth] = React.useState(window.innerWidth);

  const updateWidth = () => {
    if (window.innerWidth !== width) setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const [logOut] = useMutation<DoctorLogOut>(DOCTOR_LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.doctorLogOut.didRequest) {
        setViewer(data.doctorLogOut);
        sessionStorage.removeItem("token");
        console.log("log out successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      console.log("log out failed");
    },
  });
  const [patientLogOut] = useMutation<PatientLogOut>(PATIENT_LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.patientLogOut) {
        setViewer(data.patientLogOut);
        console.log("log out successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      console.log("log out failed");
    },
  });
  const handleLogout = async () => {
    if (type === "doctor") {
      await logOut();
      history.push("/doctor");
    } else {
      await patientLogOut();
      history.push("/user");
    }
  };
  const classes = useStyles();
  const isSiderPermanent = type !== "doctor" || window.innerWidth > 1150;

  return (
    <Switch>
      <Route path="/user/form" exact />
      <Route path="/">
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.header}>
            <Toolbar>
              {!isSiderPermanent && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() =>
                    props.setIsSiderOpen && props.setIsSiderOpen(true)
                  }
                >
                  <MenuIcon />
                </IconButton>
              )}
              <img src={logo} alt="中大医院" className={classes.logo} />
              <div className={classes.title}>
                {window.innerWidth >= 650
                  ? "东南大学附属中大医院心理健康评估系统"
                  : window.innerWidth >= 500
                  ? "心理健康评估系统"
                  : ""}
              </div>

              <Switch>
                <Route path={["/doctor", "/user"]}>
                  {viewer && viewer.userName && (
                    <Button
                      color="inherit"
                      startIcon={<ExitToAppIcon />}
                      onClick={handleLogout}
                    >
                      {type === "doctor" ? "退出医生登录" : "退出系统"}
                    </Button>
                  )}
                </Route>
              </Switch>
            </Toolbar>
          </AppBar>
        </div>
      </Route>
    </Switch>
  );
};
