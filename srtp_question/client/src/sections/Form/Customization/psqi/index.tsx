export const psqiValidation = (
  currentQuestionIndex: number,
  value: number | string,
  setErrorMessage: (errorMessage: string) => void,
  showError: () => void
) => {
  if (value === undefined || value === null || value === "") {
    setErrorMessage("未填写数值！");
    showError();
    return false;
  }
  if (currentQuestionIndex === 0) {
    if (value >= 25 || value < 0) {
      setErrorMessage("数值不符合要求！");
      showError();
      return false;
    }
  } else if (currentQuestionIndex === 1) {
    if (value >= 1440 || value < 0) {
      setErrorMessage("数值不符合要求！");
      showError();
      return false;
    }
  } else if (currentQuestionIndex === 2) {
    if (value >= 25 || value < 0) {
      setErrorMessage("数值不符合要求！");
      showError();
      return false;
    }
  } else if (currentQuestionIndex === 3) {
    if (value < 0 || value >= 25) {
      setErrorMessage("数值不符合要求！");
      showError();
      return false;
    }
  }
  return true;
};
