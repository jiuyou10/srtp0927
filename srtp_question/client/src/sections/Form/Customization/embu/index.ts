import {
  QuestionnaireContent,
  QuestionnaireContent_partialAnswer,
  QuestionnaireContent_questionnaire,
} from "../../../../lib/graphql/queries/QuestionnaireContent/__generated__/QuestionnaireContent";

export const embuRadioButtonOnClick = (
  e: React.MouseEvent<HTMLLabelElement>,
  index: number,
  currentQuestionIndex: number,
  selectChoiceLockRef: React.MutableRefObject<boolean>,
  choiceDisabled: boolean[][] | null | undefined,
  answers: {
    [x: number]: number;
  },
  setAnswers: (answers: { [x: number]: number }) => void,
  questionnaire: QuestionnaireContent_questionnaire,
  setIsNextButtonDisabled: (isNextButtonDisabled: boolean) => void,
  setCurrentQuestionIndex: (currentQuestionIndex: number) => void,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  setIsAllowedToSubmit: (isAllowedToSubmit: boolean) => void,
  needAddOne: boolean
) => {
  if (
    selectChoiceLockRef.current ||
    (choiceDisabled && choiceDisabled[currentQuestionIndex][index])
  ) {
    return;
  }
  const newAnswers = { ...answers };
  if (needAddOne) newAnswers[currentQuestionIndex * 2 + 1] = index;
  else newAnswers[currentQuestionIndex * 2] = index;

  setAnswers(newAnswers);
  if (currentQuestionIndex !== questionnaire.questions.length - 1) {
    if (
      newAnswers[currentQuestionIndex * 2] !== undefined &&
      newAnswers[currentQuestionIndex * 2 + 1] !== undefined
    ) {
      // Go to the next question.
      setIsNextButtonDisabled(true);
      selectChoiceLockRef.current = true;
      const timeout = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsNextButtonDisabled(false);
        selectChoiceLockRef.current = false;
      }, 190);
      timeoutRef.current = timeout;
    }
  } else {
    setIsAllowedToSubmit(true);
  }
};

export const embuLoadPartialAnswers = (
  partialAnswer: { answers: number[] } | null,
  data: QuestionnaireContent,
  setIsAllowedToSubmit: (isAllowedToSubmit: boolean) => void,
  setAnswers: (answers: { [x: number]: number }) => void,
  setCurrentQuestionIndex: (currentQuestionIndex: number) => void
) => {
  if (partialAnswer?.answers?.length) {
    const newAnswers = {} as { [index: number]: number };
    let unfinishedQuestionIndex: number | undefined = undefined;
    partialAnswer.answers.forEach((answer, index) => {
      if (answer !== -1) newAnswers[index] = answer;
      else if (unfinishedQuestionIndex === undefined)
        unfinishedQuestionIndex = index;
    });
    if (
      partialAnswer.answers.length ===
        data.questionnaire.questions.length * 2 &&
      unfinishedQuestionIndex === undefined
    ) {
      setIsAllowedToSubmit(true);
    } else {
      if (
        embuValidationAll(
          newAnswers,
          data.questionnaire.questions.length,
          undefined,
          undefined,
          undefined,
          false
        )
      ) {
        setIsAllowedToSubmit(true);
      }
    }
    setAnswers(newAnswers);
    if (unfinishedQuestionIndex === undefined)
      setCurrentQuestionIndex(
        Math.min(
          partialAnswer.answers.length,
          data.questionnaire.questions.length - 1
        )
      );
    else setCurrentQuestionIndex(Math.floor(unfinishedQuestionIndex / 2));
  }
};

export const embuShouldDisableNextButton = (
  answers: {
    [x: number]: number;
  },
  currentQuestionIndex: number,
  questionNumber: number,
  isNextButtonDisabled: boolean
) => {
  return (currentQuestionIndex === questionNumber - 1 || // Last question.
    (answers[currentQuestionIndex * 2] === undefined &&
      answers[currentQuestionIndex * 2 + 1] === undefined) || // Current question is not answered.
    isNextButtonDisabled) && // A variable in state to try to disable the button.
    !(
      // If the button is disabled, then current question is not answered and next question is not answered.
      (
        (answers[currentQuestionIndex * 2] !== undefined ||
          answers[currentQuestionIndex * 2 + 1] !== undefined) &&
        (answers[(currentQuestionIndex + 1) * 2] !== undefined ||
          answers[(currentQuestionIndex + 1) * 2 + 1] !== undefined)
      )
    )
    ? true
    : false;
};

export const embuValidationAll = (
  answers: {
    [x: number]: number;
  },
  questionNumber: number,
  setIsErrorDialogShown?: (isErrorDialogShown: boolean) => void,
  setErrorDialogMessage?: (errorMessage: string) => void,
  setErrorDialogQuestionIndex?: (index: number) => void,
  showError = true
): boolean => {
  let isAllEvenQuestionAnswered = true;
  let isAllOddQuestionAnswered = true;
  let isAllEvenQuestionNotAnswered = true;
  let isAllOddQuestionNotAnswered = true;
  let firstUndefinedIndex = -1;
  for (let i = 0; i < questionNumber; i++) {
    if (answers[i * 2] === undefined) {
      isAllEvenQuestionAnswered = false;
      if (firstUndefinedIndex === -1) {
        firstUndefinedIndex = i * 2;
      }
    } else {
      isAllEvenQuestionNotAnswered = false;
    }
    if (answers[i * 2 + 1] === undefined) {
      isAllOddQuestionAnswered = false;
      if (firstUndefinedIndex === -1) {
        firstUndefinedIndex = i * 2 + 1;
      }
    } else {
      isAllOddQuestionNotAnswered = false;
    }
  }
  // If all even questions and odd questions is answered, return true.
  if (isAllEvenQuestionAnswered === true && isAllOddQuestionAnswered === true) {
    return true;
  }
  if (isAllEvenQuestionAnswered && isAllOddQuestionNotAnswered) {
    return true;
  }
  if (isAllOddQuestionAnswered && isAllEvenQuestionNotAnswered) {
    return true;
  }
  // Open a dialog to tell the user to answer a specific question.
  if (firstUndefinedIndex !== -1) {
    if (
      showError &&
      setIsErrorDialogShown &&
      setErrorDialogQuestionIndex &&
      setErrorDialogMessage
    ) {
      setErrorDialogQuestionIndex(Math.floor(firstUndefinedIndex / 2));
      if (firstUndefinedIndex % 2 === 0) {
        setErrorDialogMessage(
          `您未填写第${Math.floor(firstUndefinedIndex / 2) + 1}题的父亲部分。`
        );
      } else {
        setErrorDialogMessage(
          `您未填写第${Math.floor(firstUndefinedIndex / 2) + 1}题的母亲部分。`
        );
      }
      setIsErrorDialogShown(true);
    }
    return false;
  }
  return true;
};
