import React from "react";

interface Props {
  index: number;
  totalSize: number;
}

const CHINESE_INDEXES = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
];

export const QuestionIndexText = ({ index, totalSize }: Props) => {
  let text: string;
  if (totalSize <= 10) {
    text = CHINESE_INDEXES[index] + "、";
  } else {
    text = String(index + 1) + ". ";
  }
  return <>{text}</>;
};
