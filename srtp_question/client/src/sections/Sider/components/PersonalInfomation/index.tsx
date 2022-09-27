import { createStyles, Divider, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Viewer } from "../../../../lib/type";

interface Props {
  viewer: Viewer;
}

const checkIsFieldValid = (field: string | number | undefined | null) => {
  return field !== undefined && field !== null && field !== "";
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    propertyName: {
      color: "#5f6368",
      fontSize: "0.75rem",
      margin: "8px 0",
    },
    propertyDivider: {
      marginTop: 5,
      marginBottom: 5,
    },
  })
);

const fields = [
  "name",
  "gender",
  "age",
  "education",
  "jobStatus",
  "marriageStatus",
] as const;
const displayNames = ["姓名", "性别", "年龄", "教育", "工作", "婚姻"];
export const PersonalInformation = (props: Props) => {
  const classes = useStyles();
  const { viewer } = props;
  const validIndexes: number[] = [];
  for (let i = 0; i < fields.length; i++) {
    if (checkIsFieldValid(viewer[fields[i]])) {
      validIndexes.push(i);
    }
  }
  return (
    <>
      {validIndexes.map((validIndex, index) => (
        <div key={`property-${index}`}>
          <div className={classes.propertyName}>{displayNames[validIndex]}</div>
          <div>{viewer[fields[validIndex]]}</div>
          {index !== validIndexes.length - 1 ? (
            <Divider className={classes.propertyDivider} />
          ) : null}
        </div>
      ))}
    </>
  );
};
