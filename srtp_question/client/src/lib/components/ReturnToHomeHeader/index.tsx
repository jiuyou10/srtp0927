import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
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
  })
);
export const ReturnToHomeHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <span className={classes.actionContainer}>
        <Link to="/">
          <Button color="secondary" startIcon={<HomeIcon />}>
            返回主页
          </Button>
        </Link>
      </span>
    </div>
  );
};
