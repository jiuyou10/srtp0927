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
  age?: null | number;
  gender?: null | string;
}

export const ChildrenEnterGenderAndAgeDialog = ({
  isOpen,
  handleClose,
  goToLogInPage,
  age,
  gender,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {!age || (age < 16 && age > 7 && !gender)
          ? "请您完善信息"
          : age >= 16
          ? "请使用成人版量表"
          : "年龄不符合条件"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {(!age || !gender) && "请您填写性别和年龄信息。"}
          {age !== undefined && age !== null && (age >= 16 || age < 7)
            ? "填写该量表年龄应在7岁到15岁之间。"
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={
            !age || !(age >= 16 || age < 7) ? goToLogInPage : handleClose
          }
          color="primary"
          autoFocus
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
