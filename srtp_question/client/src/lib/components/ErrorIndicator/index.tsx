import { Snackbar } from "@material-ui/core";
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

interface Props {
  showError: boolean;
  setShowError: (showError: boolean) => void;
  errorMessage: string;
}

export const ErrorIndicator = (props: Props) => {
  const { showError, setShowError, errorMessage } = props;
  return (
    <Snackbar open={showError} onClose={() => setShowError(false)}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="error"
        onClose={() => setShowError(false)}
      >
        {errorMessage}
      </MuiAlert>
    </Snackbar>
  );
};
