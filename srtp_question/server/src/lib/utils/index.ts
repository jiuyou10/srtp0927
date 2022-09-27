export const dateToString = (date?: Date): string => {
  if (!date) {
    return "";
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

export const questionnaireSorter = (dir: 1 | -1) => (
  questionnaire1: { fillInDate?: Date },
  questionnaire2: { fillInDate?: Date },
  direction = dir
) => {
  let returnedValue = 0;
  const fillInDate1 = questionnaire1.fillInDate;
  const fillInDate2 = questionnaire2.fillInDate;
  if (!fillInDate1 || !fillInDate2) {
    if (!fillInDate1 && !fillInDate2) {
      returnedValue = 0;
    } else if (fillInDate1 && !fillInDate2) {
      returnedValue = -1;
    } else {
      returnedValue = 1;
    }
  } else if (fillInDate1 < fillInDate2) {
    returnedValue = -1;
  } else {
    returnedValue = 1;
  }
  return returnedValue * direction;
};
