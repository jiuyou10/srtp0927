import {
  Card,
  CardContent,
  Chip,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import React from "react";
import { Viewer } from "../../lib/type";
import { Link, useLocation } from "react-router-dom";
import { PersonalInformation } from "./components";
import PeopleIcon from "@material-ui/icons/People";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import NoteIcon from "@material-ui/icons/Note";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    patientDrawer: {
      "@media (max-width:600px)": {
        display: "none",
      },
    },
    personalInfoCard: {
      margin: 5,
      overflow: "auto",
    },
    personalInfoCardContent: {
      "&:last-child": {
        paddingBottom: 16,
      },
    },
    personalInfoText: {
      fontWeight: 400,
      fontSize: "1.25rem",
      marginBottom: 10,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    idChip: {
      marginTop: 3,
      marginBottom: 3,
    },
    adminMenu: {
      padding: 0,
    },
    adminMenuHeader: {
      height: 48,
      display: "flex",
      alignItems: "center",
      fontWeight: 500,
      fontSize: "1.125rem",
      paddingLeft: 10,
    },
    link: {
      color: "#111",
    },
  })
);

interface Props {
  viewer: Viewer;
  type: "doctor" | "user";
  open?: boolean;
  onClose?: () => void;
}

export const Sider = (props: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const { viewer, type } = props;

  const [width, setWidth] = React.useState(window.innerWidth);

  const updateWidth = () => {
    if (window.innerWidth !== width) setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const isPermanent = type !== "doctor" || window.innerWidth > 1150;
  return (
    <Drawer
      className={`${classes.drawer} ${
        type !== "doctor" ? classes.patientDrawer : ""
      }`}
      variant={isPermanent ? "permanent" : undefined}
      open={isPermanent ? true : props.open}
      classes={{ paper: classes.drawerPaper }}
      onClose={props.onClose}
      // style={{
      //   display:
      //     type === "doctor" && window.innerWidth <= 1150 ? "none" : undefined,
      // }}
    >
      {isPermanent ? <Toolbar /> : null}
      {type === "doctor" ? (
        <>
          <div className={classes.adminMenuHeader}>{viewer.name}医生已登入</div>
          <Divider />
          <List className={classes.adminMenu}>
            <Link to={`/doctor/${viewer.userName}`} className={classes.link}>
              <ListItem button key="patientInfo" onClick={props.onClose}>
                <ListItemIcon>
                  <PeopleIcon
                    color={
                      location.pathname === `/doctor/${viewer.userName}`
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"病人信息"} />
              </ListItem>
            </Link>
            <Divider />
            <Link
              to={`/doctor/${viewer.userName}/manage`}
              className={classes.link}
            >
              <ListItem button key="doctorInfo" onClick={props.onClose}>
                <ListItemIcon>
                  <LocalHospitalIcon
                    color={
                      location.pathname === `/doctor/${viewer.userName}/manage`
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"医生信息"} />
              </ListItem>
            </Link>
            <Divider />
            <Link
              to={`/doctor/${viewer.userName}/config`}
              className={classes.link}
            >
              <ListItem button key="doctorInfo" onClick={props.onClose}>
                <ListItemIcon>
                  <SettingsApplicationsIcon
                    color={
                      location.pathname === `/doctor/${viewer.userName}/config`
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"患者端"} />
              </ListItem>
            </Link>
            <Divider />
          </List>
        </>
      ) : (
        <>
          <Card variant="outlined" className={classes.personalInfoCard}>
            <CardContent className={classes.personalInfoCardContent}>
              <div className={classes.personalInfoText}>个人信息</div>
              <div className={classes.idChip}>
                <Chip
                  size="small"
                  icon={<AssignmentIndIcon />}
                  color="primary"
                  label={`门诊号：${viewer.userName}`}
                  variant="outlined"
                />
              </div>
              <PersonalInformation viewer={viewer} />
            </CardContent>
          </Card>
          <List>
            <Link to="/user/home" className={classes.link}>
              <ListItem button key="form">
                <ListItemIcon>
                  <DescriptionIcon
                    color={
                      location.pathname === "/user/home" ? "primary" : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"量表"} />
              </ListItem>
            </Link>
            <Link to="/user/report" className={classes.link}>
              <ListItem button key="report">
                <ListItemIcon>
                  <NoteIcon
                    color={
                      location.pathname === "/user/report"
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"报告"} />
              </ListItem>
            </Link>
          </List>
        </>
      )}
    </Drawer>
  );
};
