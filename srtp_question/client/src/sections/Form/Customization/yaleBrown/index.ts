import { QuestionnaireContent } from "../../../../lib/graphql/queries/QuestionnaireContent/__generated__/QuestionnaireContent";

export const yaleBrownCustomization = (
  setAnswers: (
    value: React.SetStateAction<{
      [index: number]: number;
    }>
  ) => void,
  setChoiceDisabled: (
    value: React.SetStateAction<boolean[][] | null | undefined>
  ) => void,
  choiceDisabled: boolean[][] | null | undefined,
  newAnswers: {
    [x: number]: number;
  },
  currentQuestionIndex: number
) => {
  if (currentQuestionIndex === 0) {
    const autoChooseChoices = [1, 2, 3, 4];
    if (newAnswers[currentQuestionIndex] === 0) {
      for (const autoChooseChoiceIndex of autoChooseChoices) {
        newAnswers[autoChooseChoiceIndex] = 0;
      }
      setAnswers(newAnswers);
      if (choiceDisabled) {
        const newChoiceDisabled = choiceDisabled.map((choices) => [...choices]);
        for (const autoChooseChoiceIndex of autoChooseChoices) {
          for (
            let i = 0;
            i < newChoiceDisabled[autoChooseChoiceIndex].length;
            i++
          ) {
            if (i !== 0) {
              newChoiceDisabled[autoChooseChoiceIndex][i] = true;
            }
          }
        }
        setChoiceDisabled(newChoiceDisabled);
      }
    } else {
      setAnswers(newAnswers);
      if (choiceDisabled) {
        const newChoiceDisabled = choiceDisabled.map((choices) => [...choices]);
        for (const autoChooseChoiceIndex of autoChooseChoices) {
          for (
            let i = 0;
            i < newChoiceDisabled[autoChooseChoiceIndex].length;
            i++
          ) {
            if (i !== 0) {
              newChoiceDisabled[autoChooseChoiceIndex][i] = false;
            }
          }
        }
        setChoiceDisabled(newChoiceDisabled);
      }
    }
  } else if (currentQuestionIndex === 5) {
    const autoChooseChoices = [6, 7, 8, 9];
    if (newAnswers[currentQuestionIndex] === 0) {
      for (const autoChooseChoiceIndex of autoChooseChoices) {
        newAnswers[autoChooseChoiceIndex] = 0;
      }
      setAnswers(newAnswers);
      if (choiceDisabled) {
        const newChoiceDisabled = choiceDisabled.map((choices) => [...choices]);
        for (const autoChooseChoiceIndex of autoChooseChoices) {
          for (
            let i = 0;
            i < newChoiceDisabled[autoChooseChoiceIndex].length;
            i++
          ) {
            if (i !== 0) {
              newChoiceDisabled[autoChooseChoiceIndex][i] = true;
            }
          }
        }
        setChoiceDisabled(newChoiceDisabled);
      }
    } else {
      setAnswers(newAnswers);
      if (choiceDisabled) {
        const newChoiceDisabled = choiceDisabled.map((choices) => [...choices]);
        for (const autoChooseChoiceIndex of autoChooseChoices) {
          for (
            let i = 0;
            i < newChoiceDisabled[autoChooseChoiceIndex].length;
            i++
          ) {
            if (i !== 0) {
              newChoiceDisabled[autoChooseChoiceIndex][i] = false;
            }
          }
        }
        setChoiceDisabled(newChoiceDisabled);
      }
    }
  } else {
    setAnswers(newAnswers);
  }
};

export const yaleBrownSkipQuestions = (
  currentQuestionnIndex: number,
  setCurrentQuestionIndex: (value: React.SetStateAction<number>) => void,
  choice: number,
  setIsAllowedToSubmit: (value: React.SetStateAction<boolean>) => void
) => {
  if (currentQuestionnIndex === 0 && choice === 0) {
    setCurrentQuestionIndex(5);
  } else if (currentQuestionnIndex === 5 && choice === 0) {
    setCurrentQuestionIndex(9);
    setIsAllowedToSubmit(true);
  } else {
    setCurrentQuestionIndex(currentQuestionnIndex + 1);
  }
};

export const yaleBrownInitialLoad = (
  data: QuestionnaireContent,
  choiceDisabled: boolean[][],
  setChoiceDisabled: (choiceDisabled: null | boolean[][]) => void
) => {
  const newChoiceDisabled = choiceDisabled.map((choices) => [...choices]);
  if (
    data.partialAnswer &&
    data.partialAnswer.answers &&
    data.partialAnswer.answers[0] === 0
  ) {
    const autoChooseChoices = [1, 2, 3, 4];
    for (const autoChooseChoiceIndex of autoChooseChoices) {
      for (
        let i = 0;
        i < newChoiceDisabled[autoChooseChoiceIndex].length;
        i++
      ) {
        if (i !== 0) {
          newChoiceDisabled[autoChooseChoiceIndex][i] = true;
        }
      }
    }
  }
  if (
    data.partialAnswer &&
    data.partialAnswer.answers &&
    data.partialAnswer.answers[5] === 0
  ) {
    const autoChooseChoices = [6, 7, 8, 9];
    for (const autoChooseChoiceIndex of autoChooseChoices) {
      for (
        let i = 0;
        i < newChoiceDisabled[autoChooseChoiceIndex].length;
        i++
      ) {
        if (i !== 0) {
          newChoiceDisabled[autoChooseChoiceIndex][i] = true;
        }
      }
    }
  }
  setChoiceDisabled(newChoiceDisabled);
};
