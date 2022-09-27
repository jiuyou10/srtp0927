import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  Theme,
  Link,
  Fab,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ErrorIndicator, LoadingIndicator } from "../../lib/components";
import {
  SAVE_PARTIAL_ANSWER,
  SAVE_USER_ANSWER,
} from "../../lib/graphql/mutations";
import {
  SaveUserAnswer as SaveUserAnswerData,
  SaveUserAnswerVariables,
} from "../../lib/graphql/mutations/SaveUserAnswer/__generated__/SaveUserAnswer";
import { QUESTIONNAIRE_CONTENT } from "../../lib/graphql/queries";
import {
  QuestionnaireContent as QuestionnaireContentData,
  QuestionnaireContentVariables,
} from "../../lib/graphql/queries/QuestionnaireContent/__generated__/QuestionnaireContent";
import { ProgressBar, QuestionIndexText } from "./Components";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import {
  SavePartialAnswer as SavePartialAnswerData,
  SavePartialAnswerVariables,
} from "../../lib/graphql/mutations/SavePartialAnswer/__generated__/SavePartialAnswer";
import { Timer } from "./Components";
import {
  EMBU_FORM_KEY,
  PSQI_FORM_KEY,
  YAML_BROWN_FORM_KEY,
} from "../../lib/utils/constants";
import {
  yaleBrownCustomization,
  yaleBrownSkipQuestions,
  yaleBrownInitialLoad,
  embuRadioButtonOnClick,
  embuLoadPartialAnswers,
  embuShouldDisableNextButton,
  embuValidationAll,
} from "./Customization";
import { PRIMARY_COLOR } from "../..";
import { psqiValidation } from "./Customization/psqi";
import { Patient } from "../../lib/type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      height: "100%",
      width: "100%",
      backgroundColor: "#e8f1fd",
    },
    form: {
      width: 768,
      maxWidth: "90vw",
      margin: "auto",
      paddingTop: 10,
    },
    titleCard: {
      borderRadius: 8,
      paddingBottom: 5,
    },
    titleCardColor: {
      height: 10,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: PRIMARY_COLOR,
    },
    titleCardContent: {
      paddingTop: 5,
      marginLeft: 5,
      marginRight: 5,
    },
    titleCardMainText: {
      fontSize: "2rem",
      fontWeight: 400,
      marginTop: 10,
      marginBottom: 10,
    },
    questionCard: {
      marginTop: 10,
      borderRadius: 8,
      marginBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
    },
    questionText: {
      fontSize: "1rem",
      fontWeight: 400,
      marginBottom: 16,
      marginTop: 10,
      lineHeight: "1.4rem",
    },
    questionOptionText: {
      fontSize: "0.9rem",
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
    },
    button: {
      backgroundColor: "#fff",
      color: PRIMARY_COLOR,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    buttonWithRightMargin: {
      marginRight: 10,
    },
    finishedText: {
      fontSize: "0.875rem",
      marginTop: 26,
      marginBottom: 26,
    },
    homeLink: {
      fontSize: "0.875rem",
    },
    exitButton: {
      position: "static",
      right: 20,
      bottom: 20,
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    timerContaner: {
      position: "static",
      left: 20,
      bottom: 20,
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressWrapper: {
      display: "flex",
      alignItems: "center",
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
    },
    progressWrapperForSmallScreen: {
      marginTop: 20,
    },
    questionParent: {
      lineHeight: "1.4rem",
      color: "#757575",
    },
    answerInput: {
      marginRight: 10,
      marginLeft: 10,
    },
    embuRadioContainer: {
      width: "50%",
    },
  })
);

interface Props {
  patient: Patient;
}

export const Form = ({ patient }: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:780px)");
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const { loading, data } = useQuery<
    QuestionnaireContentData,
    QuestionnaireContentVariables
  >(QUESTIONNAIRE_CONTENT, {
    variables: {
      id: id || "",
    },
    onCompleted: (data: QuestionnaireContentData) => {
      const { partialAnswer } = data;
      const initChoiceDisabled = data.questionnaire.questions.map(
        (question) => {
          return question.choices.map((_choice) => false);
        }
      );
      if (data.questionnaire.key !== YAML_BROWN_FORM_KEY)
        setChoiceDisabled(initChoiceDisabled);
      else yaleBrownInitialLoad(data, initChoiceDisabled, setChoiceDisabled);

      const localPartialAnswer = localStorage.getItem(
        `${patient.userName}@${questionnaire.key}`
      );
      let answers: number[] = [];
      if (partialAnswer?.answers?.length) {
        answers = partialAnswer?.answers;
        if (localPartialAnswer) {
          const answerObject = JSON.parse(localPartialAnswer);
          if (new Date(partialAnswer.date) > new Date(answerObject.time)) {
            answers = partialAnswer?.answers;
          } else {
            answers = answerObject.answerArray;
          }
        }
      } else if (localPartialAnswer) {
        const answerObject = JSON.parse(localPartialAnswer);
        answers = answerObject.answerArray;
      }
      if (data.questionnaire.key === EMBU_FORM_KEY) {
        embuLoadPartialAnswers(
          { answers },
          data,
          setIsAllowedToSubmit,
          setAnswers,
          setCurrentQuestionIndex
        );
      } else if (
        partialAnswer?.answers?.length ||
        localStorage.getItem(`${patient.userName}@${questionnaire.key}`)
      ) {
        const newAnswers = {} as { [index: number]: number };
        let unfinishedQuestionIndex: number | undefined = undefined;
        answers.forEach((answer, index) => {
          if (answer !== -1) newAnswers[index] = answer;
          else if (unfinishedQuestionIndex === undefined)
            unfinishedQuestionIndex = index;
        });
        if (
          answers.length === data.questionnaire.questions.length &&
          unfinishedQuestionIndex === undefined
        ) {
          setIsAllowedToSubmit(true);
        }
        setAnswers(newAnswers);
        if (unfinishedQuestionIndex === undefined)
          setCurrentQuestionIndex(
            Math.min(answers.length, data.questionnaire.questions.length - 1)
          );
        else setCurrentQuestionIndex(unfinishedQuestionIndex);
      }
    },
    fetchPolicy: "no-cache",
  });

  const [saveUserAnswer, { loading: saveUserAnswerLoading }] = useMutation<
    SaveUserAnswerData,
    SaveUserAnswerVariables
  >(SAVE_USER_ANSWER, {
    onCompleted: (data) => {
      if (data.saveUserAnswer.didRequest) {
        setIsDone(true);
      }
    },
  });

  const [savePartialAnswer, { loading: savePartialAnswerLoading }] =
    useMutation<SavePartialAnswerData, SavePartialAnswerVariables>(
      SAVE_PARTIAL_ANSWER
    );

  const saveUserAnswerRef = useRef(saveUserAnswer);
  const savePartialAnswerRef = useRef(savePartialAnswer);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [choiceDisabled, setChoiceDisabled] = useState<null | boolean[][]>();
  const [answers, setAnswers] = useState<{ [index: number]: number }>({});
  const [isDone, setIsDone] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const history = useHistory();
  const selectChoiceLockRef = useRef(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const showError = () => {
    setIsErrorShown(true);
  };
  // Error dialog.
  const [isErrorDialogShown, setIsErrorDialogShown] = useState(false);
  const closeErrorDialog = () => {
    setIsErrorDialogShown(false);
  };
  const [errorDialogMessage, setErrorDialogMessage] = useState("");
  const [errorDialogQuestionIndex, setErrorDialogQuestionIndex] =
    useState<number | null>(null);
  const goToCertainQuestion = () => {
    if (errorDialogQuestionIndex !== null) {
      setCurrentQuestionIndex(errorDialogQuestionIndex);
    }
    setIsErrorDialogShown(false);
  };

  const getAnswerArray = useCallback((): number[] => {
    const questionnaire = data?.questionnaire;
    if (!questionnaire) {
      return [];
    }
    const answerArray = [];
    let numberOfQuestions = questionnaire.questions.length;
    if (questionnaire.key === EMBU_FORM_KEY) {
      numberOfQuestions *= 2;
    }
    for (let i = 0; i < numberOfQuestions; i++) {
      if (answers[i] !== undefined) answerArray.push(answers[i]);
      else answerArray.push(-1);
    }
    return answerArray;
  }, [answers, data?.questionnaire]);
  const savePartialAnswerToBackend = useCallback(() => {
    const answerArray = getAnswerArray();
    if (id && answerArray.length !== 0)
      return savePartialAnswerRef.current({
        variables: {
          input: { questionnaireId: id, answers: answerArray },
        },
      });
    return Promise.resolve();
  }, [getAnswerArray, id]);
  const savePartialAnswerToLocalStorage = useCallback(() => {
    if (data) {
      const answerArray = getAnswerArray();
      localStorage.setItem(
        `${patient.userName}@${data.questionnaire.key}`,
        JSON.stringify({
          time: new Date(),
          answerArray,
        })
      );
    }
  }, [getAnswerArray, patient.userName, data]);
  useEffect(() => {
    savePartialAnswerToLocalStorage();
  }, [savePartialAnswerToLocalStorage]);
  // // Don't send partial answers to backend automatically.
  // useEffect(() => {
  //   autoSaveTimeoutRef.current = setInterval(() => {
  //     savePartialAnswerToBackend();
  //   }, 10000);
  //   return () => {
  //     if (autoSaveTimeoutRef.current) {
  //       clearInterval(autoSaveTimeoutRef.current);
  //       autoSaveTimeoutRef.current = null;
  //     }
  //   };
  // }, [savePartialAnswerToBackend]);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (!data) {
    return <div>Error</div>;
  }

  const { questionnaire } = data;

  const closeConfirmDialog = () => {
    setConfirmed(true);
  };

  const validation = async (all = false) => {
    if (questionnaire.key === PSQI_FORM_KEY) {
      if (all === true) {
        for (let i = 0; i < questionnaire.questions.length; i++) {
          if (!psqiValidation(i, answers[i], setErrorMessage, showError)) {
            return false;
          }
        }
        return true;
      }
      return psqiValidation(
        currentQuestionIndex,
        answers[currentQuestionIndex],
        setErrorMessage,
        showError
      );
    } else if (questionnaire.key === EMBU_FORM_KEY) {
      if (all === true) {
        return embuValidationAll(
          answers,
          questionnaire.questions.length,
          setIsErrorDialogShown,
          setErrorDialogMessage,
          setErrorDialogQuestionIndex
        );
      }
    }
    return true;
  };
  const onNextButtonClick = async () => {
    const validationResult = await validation();
    if (validationResult === false) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const onSubmit = async () => {
    const validationResult = await validation(true);
    if (validationResult === false) {
      return;
    }
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }
    if (id) {
      const answerArray = getAnswerArray();
      await saveUserAnswerRef.current({
        variables: {
          input: { questionnaireId: id, answers: answerArray },
        },
      });
      localStorage.removeItem(`${patient.userName}@${questionnaire.key}`);
    }
  };

  const onBackButtonClick = async () => {
    // const validationResult = await validation();
    // if (validationResult === false) {
    //   return;
    // }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToHome = () => {
    history.push("/user/home");
  };

  const handleExitButtonClick = async () => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }
    await savePartialAnswerToBackend();
    goToHome();
  };

  const goToHomeLinkOnClick = (e: SyntheticEvent) => {
    e.preventDefault();
    goToHome();
  };
  const onAnswerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = { ...answers };
    if (
      e.target.value !== undefined &&
      e.target.value !== null &&
      e.target.value !== ""
    )
      newAnswers[currentQuestionIndex] = Number(e.target.value);
    else delete newAnswers[currentQuestionIndex];
    setAnswers(newAnswers);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedChoice = (event.target as HTMLInputElement).value;
    const index = currentQuestion.choices.indexOf(selectedChoice);
    if (
      selectChoiceLockRef.current ||
      (choiceDisabled && choiceDisabled[currentQuestionIndex][index])
    ) {
      return;
    }
    const newAnswers = { ...answers };
    newAnswers[currentQuestionIndex] = index;
    if (questionnaire.key === YAML_BROWN_FORM_KEY) {
      yaleBrownCustomization(
        setAnswers,
        setChoiceDisabled,
        choiceDisabled,
        newAnswers,
        currentQuestionIndex
      );
    } else {
      setAnswers(newAnswers);
    }
    if (currentQuestionIndex !== questionnaire.questions.length - 1) {
      setIsNextButtonDisabled(true);
      selectChoiceLockRef.current = true;
      const timeout = setTimeout(() => {
        if (questionnaire.key === YAML_BROWN_FORM_KEY) {
          yaleBrownSkipQuestions(
            currentQuestionIndex,
            setCurrentQuestionIndex,
            index,
            setIsAllowedToSubmit
          );
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
        setIsNextButtonDisabled(false);
        selectChoiceLockRef.current = false;
      }, 190);
      timeoutRef.current = timeout;
    } else {
      setIsAllowedToSubmit(true);
    }
  };

  const radioButtonOnClick = (
    e: React.MouseEvent<HTMLLabelElement>,
    index: number,
    questionIndex: number
  ) => {
    if (
      selectChoiceLockRef.current ||
      (choiceDisabled && choiceDisabled[currentQuestionIndex][index])
    ) {
      return;
    }
    const newAnswers = { ...answers };
    newAnswers[currentQuestionIndex] = index;
    if (questionnaire.key === YAML_BROWN_FORM_KEY) {
      yaleBrownCustomization(
        setAnswers,
        setChoiceDisabled,
        choiceDisabled,
        newAnswers,
        currentQuestionIndex
      );
    } else {
      setAnswers(newAnswers);
    }
    if (currentQuestionIndex !== questionnaire.questions.length - 1) {
      setIsNextButtonDisabled(true);
      selectChoiceLockRef.current = true;
      const timeout = setTimeout(() => {
        if (questionnaire.key === YAML_BROWN_FORM_KEY) {
          yaleBrownSkipQuestions(
            currentQuestionIndex,
            setCurrentQuestionIndex,
            index,
            setIsAllowedToSubmit
          );
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
        setIsNextButtonDisabled(false);
        selectChoiceLockRef.current = false;
      }, 190);
      timeoutRef.current = timeout;
    } else {
      setIsAllowedToSubmit(true);
    }
  };
  let checkNextButtonShouldDisable =
    (currentQuestionIndex === questionnaire.questions.length - 1 || // Last question.
      answers[currentQuestionIndex] === undefined || // Current question is not answered.
      isNextButtonDisabled) && // A variable in state to try to disable the button.
    !(
      // If the button is disabled, then current question is not answered and next question is not answered.
      (
        answers[currentQuestionIndex] !== undefined &&
        answers[currentQuestionIndex + 1] !== undefined
      )
    )
      ? true
      : false;
  if (questionnaire.key === EMBU_FORM_KEY) {
    checkNextButtonShouldDisable = embuShouldDisableNextButton(
      answers,
      currentQuestionIndex,
      questionnaire.questions.length,
      isNextButtonDisabled
    );
  }

  const currentQuestion = questionnaire.questions[currentQuestionIndex];
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <Card className={classes.titleCard} variant="outlined">
          <div className={classes.titleCardColor} />
          <CardContent className={classes.titleCardContent}>
            <div className={classes.titleCardMainText}>
              {questionnaire.name}
            </div>
            {isDone && (
              <>
                <div className={classes.finishedText}>
                  您已完成此量表的填写。
                </div>
                <Link
                  onClick={goToHomeLinkOnClick}
                  className={classes.homeLink}
                  href="/"
                >
                  回到主页
                </Link>
              </>
            )}
          </CardContent>
        </Card>
        {!isDone && (
          <>
            <Card className={classes.questionCard} variant="outlined">
              <CardContent>
                {currentQuestion.parent ? (
                  <div className={classes.questionParent}>
                    {currentQuestion.parent}
                  </div>
                ) : null}
                <div className={classes.questionText}>
                  <QuestionIndexText
                    index={currentQuestionIndex}
                    totalSize={questionnaire.questions.length}
                  />
                  {currentQuestion.choices.length === 0 &&
                  currentQuestion.content &&
                  currentQuestion.content.includes("{input}") ? (
                    <>
                      {currentQuestion.content.split("{input}")[0]}
                      <TextField
                        type="number"
                        className={classes.answerInput}
                        value={
                          answers[currentQuestionIndex] !== null &&
                          answers[currentQuestionIndex] !== undefined
                            ? answers[currentQuestionIndex]
                            : ""
                        }
                        onChange={onAnswerInputChange}
                      />
                      {currentQuestion.content.split("{input}")[1]}
                    </>
                  ) : (
                    currentQuestion.content
                  )}
                </div>
                {questionnaire.key !== EMBU_FORM_KEY ? (
                  <RadioGroup
                    value={
                      currentQuestion.choices[answers[currentQuestionIndex]] ||
                      ""
                    }
                    onChange={handleRadioChange}
                  >
                    <FormControl component="fieldset">
                      {currentQuestion.choices.map((choice, index) => (
                        <FormControlLabel
                          value={choice}
                          control={<Radio color="primary" />}
                          key={`choice-${index}`}
                          label={
                            <span className={classes.questionOptionText}>
                              {choice}
                            </span>
                          }
                          disabled={
                            choiceDisabled &&
                            choiceDisabled[currentQuestionIndex][index]
                              ? true
                              : undefined
                          }
                          // checked={answers[currentQuestionIndex] === index}
                          onClick={
                            answers[currentQuestionIndex] === index
                              ? (e: React.MouseEvent<HTMLLabelElement>) =>
                                  radioButtonOnClick(
                                    e,
                                    index,
                                    currentQuestionIndex
                                  )
                              : undefined
                          }
                        />
                      ))}
                    </FormControl>
                  </RadioGroup>
                ) : (
                  <>
                    <FormControl
                      component="fieldset"
                      className={classes.embuRadioContainer}
                    >
                      <FormLabel component="legend">父亲</FormLabel>
                      {currentQuestion.choices.map((choice, index) => (
                        <FormControlLabel
                          value={choice}
                          control={<Radio color="primary" />}
                          key={`choice-${index}`}
                          label={
                            <span className={classes.questionOptionText}>
                              {choice}
                            </span>
                          }
                          checked={answers[currentQuestionIndex * 2] === index}
                          onClick={(e) =>
                            embuRadioButtonOnClick(
                              e,
                              index,
                              currentQuestionIndex,
                              selectChoiceLockRef,
                              choiceDisabled,
                              answers,
                              setAnswers,
                              questionnaire,
                              setIsNextButtonDisabled,
                              setCurrentQuestionIndex,
                              timeoutRef,
                              setIsAllowedToSubmit,
                              false
                            )
                          }
                        />
                      ))}
                    </FormControl>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">母亲</FormLabel>
                      {currentQuestion.choices.map((choice, index) => (
                        <FormControlLabel
                          value={choice}
                          control={<Radio color="primary" />}
                          key={`choice-${index}`}
                          label={
                            <span className={classes.questionOptionText}>
                              {choice}
                            </span>
                          }
                          checked={
                            answers[currentQuestionIndex * 2 + 1] === index
                          }
                          onClick={(e) =>
                            embuRadioButtonOnClick(
                              e,
                              index,
                              currentQuestionIndex,
                              selectChoiceLockRef,
                              choiceDisabled,
                              answers,
                              setAnswers,
                              questionnaire,
                              setIsNextButtonDisabled,
                              setCurrentQuestionIndex,
                              timeoutRef,
                              setIsAllowedToSubmit,
                              true
                            )
                          }
                        />
                      ))}
                    </FormControl>
                  </>
                )}
              </CardContent>
            </Card>

            <div className={isSmallScreen ? "" : classes.footer}>
              <div>
                <Button
                  className={
                    classes.buttonWithRightMargin + " " + classes.button
                  }
                  variant="contained"
                  onClick={onBackButtonClick}
                  disabled={currentQuestionIndex !== 0 ? false : true}
                >
                  上一题
                </Button>
                <Button
                  className={
                    classes.buttonWithRightMargin + " " + classes.button
                  }
                  variant="contained"
                  onClick={onNextButtonClick}
                  disabled={checkNextButtonShouldDisable}
                >
                  下一题
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                  disabled={!isAllowedToSubmit || saveUserAnswerLoading}
                >
                  提交
                </Button>
              </div>
              <div
                className={
                  classes.progressWrapper +
                  " " +
                  (isSmallScreen ? classes.progressWrapperForSmallScreen : "")
                }
              >
                <ProgressBar
                  totalNumber={questionnaire.questions.length}
                  currentIndex={currentQuestionIndex}
                />
                {`第 ${currentQuestionIndex + 1} 题（共
                 ${questionnaire.questions.length} 题）`}
              </div>
            </div>
            <div className={classes.timerContaner}>
              <Timer />
            </div>
            <Fab
              className={classes.exitButton}
              onClick={handleExitButtonClick}
              variant="extended"
              disabled={savePartialAnswerLoading}
            >
              <DirectionsRunIcon color="primary" />
              暂存并退出
            </Fab>
          </>
        )}
      </div>
      <Dialog
        open={!confirmed && !!questionnaire.instruction}
        onClose={closeConfirmDialog}
      >
        <DialogTitle>指导语</DialogTitle>
        <DialogContent>
          <DialogContentText>{questionnaire.instruction}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary" autoFocus>
            继续
          </Button>
        </DialogActions>
      </Dialog>
      <ErrorIndicator
        showError={isErrorShown}
        setShowError={setIsErrorShown}
        errorMessage={errorMessage}
      />
      <Dialog open={isErrorDialogShown} onClose={closeErrorDialog}>
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorDialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={goToCertainQuestion} color="primary" autoFocus>
            前往该题
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
