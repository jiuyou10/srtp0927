import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  doctorName: string;
  handleDoctorLogIn: (password: string) => void;
  hideErrorIndicator: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    passwordInput: {
      minWidth: 300,
    },
  })
);

export interface DoctorLogInDialogHandle {
  showError: () => void;
  hideError: () => void;
}

export const DoctorLogInDialog = forwardRef<DoctorLogInDialogHandle, Props>(
  (props: Props, ref) => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleClickLogIn();
      }
    };
    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    });
    const classes = useStyles();
    const {
      isDialogOpen,
      setIsDialogOpen,
      doctorName,
      handleDoctorLogIn,
      hideErrorIndicator,
    } = props;
    const [password, setPassword] = useState("");
    const [isErrorShown, setIsErrorShown] = useState(false);

    useImperativeHandle(ref, () => ({
      showError: () => {
        setIsErrorShown(true);
      },
      hideError: () => {
        setIsErrorShown(false);
      },
    }));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      hideErrorIndicator();
      setPassword(e.target.value);
    };
    const handleClickLogIn = () => {
      handleDoctorLogIn(password);
    };
    const handleClickCancel = () => {
      setIsDialogOpen(false);
    };
    return (
      <Dialog open={isDialogOpen} onClose={handleClickCancel}>
        <DialogTitle>请确认您的密码</DialogTitle>
        <DialogContent>
          <DialogContentText>当前登入的医生为{doctorName}</DialogContentText>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                className={classes.passwordInput}
                label="密码"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                helperText={
                  isErrorShown && !password ? "请输入您的密码" : undefined
                }
                error={isErrorShown && !password ? true : undefined}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel} color="primary">
            取消
          </Button>
          <Button onClick={handleClickLogIn} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
