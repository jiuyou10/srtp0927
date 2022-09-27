import { createStyles, Divider, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 48,
      display: "flex",
      alignItems: "center",
      paddingLeft: 10,
      fontWeight: 500,
      fontSize: "1.125rem",
    },
  })
);

interface Props {
  text: string;
}

export const Header = ({ text }: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>{text}</div>
      <Divider />
    </>
  );
};
