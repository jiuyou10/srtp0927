import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Doctor } from "../../../../lib/type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "hidden",
    },
    actionContainer: {
      float: "right",
      paddingRight: 10,
      paddingTop: 10,
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
    },
    welcomeMessage: {
      paddingRight: 10,
      paddingBottom: 1,
    },
  })
);

interface Props {
  handleDoctorLogOut: () => void;
  doctor: Doctor;
}

export const Header = ({ handleDoctorLogOut, doctor }: Props) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const logOutDoctor = () => {
    setIsDialogOpen(false);
    handleDoctorLogOut();
  };
  return (
    <div className={classes.root}>
      <span className={classes.actionContainer}>
        <span className={classes.welcomeMessage}>{doctor.name}医生已登入</span>
        <Button
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={openDialog}
        >
          退出
        </Button>
      </span>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"确认退出？"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            退出后需要输入医生的账号和密码才能重新登入
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={logOutDoctor} color="secondary">
            退出
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
