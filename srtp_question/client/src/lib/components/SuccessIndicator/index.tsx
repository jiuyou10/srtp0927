import { Snackbar } from "@material-ui/core";
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

interface Props {
  showSuccess: boolean;
  setShowSuccess: (showError: boolean) => void;
  successMessage: string;
}

export const SuccessIndicator = (props: Props) => {
  const { showSuccess, setShowSuccess, successMessage } = props;
  return (
    <Snackbar
      open={showSuccess}
      onClose={() => setShowSuccess(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="success"
        onClose={() => setShowSuccess(false)}
      >
        {successMessage}
      </MuiAlert>
    </Snackbar>
  );
};
