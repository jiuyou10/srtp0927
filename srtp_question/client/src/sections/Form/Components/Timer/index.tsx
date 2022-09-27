import React, { useEffect, useState } from "react";
import { Timer as TimerIcon } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    timeNumber: {
      marginLeft: 10,
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
    },
  })
);
export const Timer = () => {
  const classes = useStyles();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [seconds]);
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  return (
    <div className={classes.root}>
      <TimerIcon />
      <span className={classes.timeNumber}>{`${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }:${second < 10 ? "0" + second : second}`}</span>
    </div>
  );
};
