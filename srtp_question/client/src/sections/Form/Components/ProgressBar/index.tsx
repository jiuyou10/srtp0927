import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {
  totalNumber: number;
  currentIndex: number;
}
const PROGRESS_BAR_WIDTH = 100;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: PROGRESS_BAR_WIDTH,
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      display: "flex",
      marginRight: 10,
      height: 12,
      borderRadius: 6,
    },
    finished: {
      width: 0,
      height: 12,
      borderRadius: "6px 0 0 6px",
      backgroundColor: "#5eb8ff",
      maxWidth: PROGRESS_BAR_WIDTH - 6,
    },
    leftCircle: {
      borderRadius: "6px 0 0 6px",
    },
    circle: {
      height: 12,
      width: 12,
      backgroundColor: "#5eb8ff",
    },
    circlewrapper: {
      overflow: "hidden",
    },
    rightCircle: {
      borderRadius: 6,
      backgroundColor: "#5eb8ff",
    },
    rightCircleWrapper: {
      marginLeft: -6,
    },
  })
);

export const ProgressBar = ({ totalNumber, currentIndex }: Props) => {
  const classes = useStyles();
  const widthOfFinishedPart =
    (PROGRESS_BAR_WIDTH * (currentIndex + 1)) / totalNumber;
  return (
    <div className={classes.root}>
      {widthOfFinishedPart > 12 ? (
        <>
          <div
            className={classes.finished}
            style={{
              width: widthOfFinishedPart,
            }}
          />
          {PROGRESS_BAR_WIDTH - widthOfFinishedPart <= 6 ? (
            <div
              className={
                classes.rightCircleWrapper + " " + classes.circlewrapper
              }
              style={{ width: 12 - (PROGRESS_BAR_WIDTH - widthOfFinishedPart) }}
            >
              <div className={classes.rightCircle + " " + classes.circle} />
            </div>
          ) : null}
        </>
      ) : (
        <div
          className={classes.circlewrapper}
          style={{
            width: widthOfFinishedPart,
          }}
        >
          <div className={classes.leftCircle + " " + classes.circle} />
        </div>
      )}
    </div>
  );
};
