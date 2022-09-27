// Error dialog for EPQ (adult version).
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
  age?: null | number;
  gender?: null | string;
}

export const EnterGenderAndAgeDialog = ({
  isOpen,
  handleClose,
  goToLogInPage,
  age,
  gender,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {!age || (age >= 16 && !gender)
          ? "请您完善信息"
          : age >= 7 && age < 16
          ? "请使用儿童版量表"
          : "年龄不符合条件"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {(!age || !gender) && "请您填写性别和年龄信息。"}
          {age !== undefined && age !== null && age < 16
            ? "填写该量表最小年龄为16岁。"
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={!age || age >= 16 ? goToLogInPage : handleClose}
          color="primary"
          autoFocus
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
