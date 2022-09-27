import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export const LoadingIndicator = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
};
