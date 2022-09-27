// Error dialog for EPQ (children version).
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  goToLogInPage: () => void;
  gender?: null | string;
}

export const PsssGenderDialog = ({
  isOpen,
  handleClose,
  goToLogInPage,
  gender,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>请您完善信息</DialogTitle>
      <DialogContent>
        <DialogContentText>请您填写性别信息。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goToLogInPage} color="primary" autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
