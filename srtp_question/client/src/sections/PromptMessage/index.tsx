import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReturnToHomeHeader } from "../../lib/components";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#e3f2fd",
      height: "100%",
      width: "100%",
    },
    titleWrapper: {
      height: "100%",
    },
    title: {
      fontSize: "1.5rem",
      textAlign: "center",
    },
    promptTextContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 50,
      background: "#e3f2fd",
    },
    promptText: {
      width: "50%",
      minWidth: "min(85%, 400px)",
      lineHeight: "1.5rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 50,
      background: "#e3f2fd",
      paddingBottom: 20,
    },
    titleContainer: {
      minHeight: 75,
      maxHeight: 290,
      height: "calc(100% - 610px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      background: "#e3f2fd",
    },
  })
);
export const PromptMessage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReturnToHomeHeader />
      <div className={classes.titleContainer}>
        <div className={classes.title}>指导语</div>
      </div>
      <div className={classes.promptTextContainer}>
        <div className={classes.promptText}>
          在接下来大约20分钟的时间里您将进行一系列的量表评估，目的是对您的心理状况及个性特征进行评估，下面的问题并不存在所谓正确或者错误的答案，您只需要按照自己真实的状况完成就可以了。也许您会觉得自己并不完全如题目所描述的那样，这时候您可以根据选项选择最接近您的状况。请记住，这里并没有正确或错误，您只要如实回答问题就可以了。
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Link to="/user/home">
          <Button
            variant="contained"
            color="primary"
            endIcon={<NavigateNextIcon />}
          >
            下一步
          </Button>
        </Link>
      </div>
    </div>
  );
};
