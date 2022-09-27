import { useQuery } from "@apollo/client";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import CardIcon from "./assets/cardIcon.png";
import {
  QuestionnaireList as QuestionnaireListData,
  QuestionnaireListVariables,
  QuestionnaireList_questionnaireList as QuestionnaireData,
} from "../../lib/graphql/queries/QuestionnaireList/__generated__/QuestionnaireList";
import { QUESTIONNAIRE_LIST } from "../../lib/graphql/queries";
import { LineChartPopOver, LoadingIndicator } from "../../lib/components";
import { Patient } from "../../lib/type";
import {
  EYSCENCK_CHILDREN_FORM_NAME,
  EYSCENCK_FORM_NAME,
  PHCSS_FORM_KEY,
  PSSS_FORM_KEY,
} from "../../lib/utils/constants";
import {
  EnterGenderAndAgeDialog,
  PhcssGenderAndAgeDialog,
  PsssGenderDialog,
} from "./components";
import { ChildrenEnterGenderAndAgeDialog } from "./components/ChildrenEnterGenderAndAgeDialog";
import RefreshIcon from "@material-ui/icons/Refresh";
import { SuccessIndicator } from "../../lib/components/SuccessIndicator";

const CARD_WIDTH = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: "5px 10px",
    },
    listName: {
      fontSize: "1rem",
      color: "rgba(0, 0, 0, .654)",
      marginTop: 20,
      marginBottom: 20,
    },
    root: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, ${CARD_WIDTH}px)`,
      rowGap: "20px",
      columnGap: "8px",
    },
    card: {
      height: 212,
    },
    cardActionArea: {
      width: CARD_WIDTH,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: indigo[50],
      },
      height: 160,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    cardIcon: {
      width: 40,
      height: 40,
    },
    unfinishedText: {
      fontSize: "0.8125rem",
      color: "rgba(0, 0, 0, .54)",
      margin: "5px 0",
    },
    finishedText: {
      fontSize: "0.8125rem",
      color: "#4caf50",
      margin: "5px 0",
    },
    questionnaireName: {
      fontSize: "1rem",
      color: "#111",
      lineHeight: "1.5rem",
    },
    cardActionContainer: {
      paddingLeft: 20,
      height: 50,
    },
    noOverflow: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    pageHeader: {
      display: "flex",
      alignItems: "center",
    },
    refreshButtonContainer: {
      marginLeft: 15,
    },
    cardContent: {
      padding: 15,
    },
  })
);

export type FormResult = { result: string; fillInDate: string };

interface Props {
  patient: Patient;
}

export const Home = ({ patient }: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const { loading, data, error: questionnaireListError, refetch } = useQuery<
    QuestionnaireListData,
    QuestionnaireListVariables
  >(QUESTIONNAIRE_LIST, {
    fetchPolicy: "no-cache",
    variables: { isReport: false },
  });
  const listData: {
    uniqueFormList: QuestionnaireData[];
    resultList: FormResult[][];
  } = useMemo(() => {
    if (!data) return { uniqueFormList: [], resultList: [] as FormResult[][] };
    const formList: QuestionnaireData[] = [];
    const resultList: FormResult[][] = [];
    const formSet: Set<string> = new Set();
    data.questionnaireList.forEach((questionnaire) => {
      if (!formSet.has(questionnaire.id)) {
        formSet.add(questionnaire.id);
        formList.push(questionnaire);
        if (questionnaire.result && questionnaire.displayedFillInDate) {
          resultList.push([
            {
              result: questionnaire.result,
              fillInDate: questionnaire.displayedFillInDate,
            },
          ]);
        } else {
          resultList.push([] as FormResult[]);
        }
      } else if (questionnaire.result && questionnaire.displayedFillInDate) {
        let index = 0;
        while (index <= formList.length) {
          if (formList[index].id === questionnaire.id) {
            resultList[index].push({
              result: questionnaire.result,
              fillInDate: questionnaire.displayedFillInDate,
            });
            break;
          }
          index += 1;
        }
      }
    });
    return { uniqueFormList: formList, resultList };
  }, [data]);
  const { uniqueFormList, resultList } = listData;
  const [isGenderAndAgeDialogOpen, setIsGenderAndAgeDialogOpen] = useState(
    false
  );
  const [
    isChildrenGenderAndAgeDialogOpen,
    setIsChildrenGenderAndAgeDialogOpen,
  ] = useState(false);
  const [isPhcssDialogOpen, setIsPhcssDialogOpen] = useState(false);
  const [isPsssDialogOpen, setIsPsssDialogOpen] = useState(false);
  const closeGenderAndAgeDialog = () => {
    setIsGenderAndAgeDialogOpen(false);
  };
  const closeChildrenGenderAndAgeDialog = () => {
    setIsChildrenGenderAndAgeDialogOpen(false);
  };
  const closePhcssDialog = () => {
    setIsPhcssDialogOpen(false);
  };
  const closePsssDialog = () => {
    setIsPsssDialogOpen(false);
  };
  const goToLogInPage = () => {
    history.push(`/user/login?userName=${patient.userName}`);
  };
  const [isSuccessShown, setIsSuccessShown] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const reloadButtonOnClick = async () => {
    await refetch();
    setSuccessMessage("成功更新列表");
    setIsSuccessShown(true);
  };
  if (loading) {
    return <LoadingIndicator />;
  }
  if (data) {
    const questionnaireName = (questionnaire: QuestionnaireData) => {
      const defaultReturn = (
        <span className={classes.questionnaireName}>{questionnaire.name}</span>
      );
      // Note that this is Chinese parentheses!
      if (!/^.*（.*）$/.test(questionnaire.name)) {
        return defaultReturn;
      } else {
        const nameMatchFormResult = questionnaire.name.match(/^.*（/);
        const abbreviationMatchFormResult = questionnaire.name.match(/（.*）/);
        if (nameMatchFormResult && abbreviationMatchFormResult) {
          const name = nameMatchFormResult[0].substring(
            0,
            nameMatchFormResult[0].length - 1
          );
          const abbreviation = abbreviationMatchFormResult[0];
          return (
            <span
              className={classes.questionnaireName + " " + classes.noOverflow}
            >
              <span className={classes.noOverflow}>{name}</span>
              <br />
              {abbreviation.replace("（", "(").replace("）", ")")}
            </span>
          );
        }
        return defaultReturn;
      }
    };
    const goToFormPage = (
      formId: string,
      formName: string,
      formKey: string
    ) => {
      if (formName === EYSCENCK_FORM_NAME) {
        if (!patient.gender || !patient.age || patient.age < 16) {
          setIsGenderAndAgeDialogOpen(true);
          return;
        }
      } else if (formName === EYSCENCK_CHILDREN_FORM_NAME) {
        if (
          !patient.gender ||
          !patient.age ||
          patient.age >= 16 ||
          patient.age <= 6
        ) {
          setIsChildrenGenderAndAgeDialogOpen(true);
          return;
        }
      } else if (formKey === PHCSS_FORM_KEY) {
        if (
          !patient.gender ||
          !patient.age ||
          patient.age >= 17 || // Age should be a number between 8 - 16.
          patient.age <= 7
        ) {
          setIsPhcssDialogOpen(true);
          return;
        }
      } else if (formKey === PSSS_FORM_KEY) {
        if (!patient.gender) {
          setIsPsssDialogOpen(true);
          return;
        }
      }
      history.push(`/user/form?id=${formId}`);
    };
    const finishStatus = (questionnaire: QuestionnaireData) => (
      <span
        className={
          questionnaire.done ? classes.finishedText : classes.unfinishedText
        }
      >
        {questionnaire.done ? "已完成" : "未完成"}
      </span>
    );
    if (isSmallScreen) {
      return (
        <>
          <List subheader={<ListSubheader>量表</ListSubheader>}>
            {uniqueFormList.map((questionnaire, index) => (
              <ListItem
                button
                onClick={() =>
                  goToFormPage(
                    questionnaire.id,
                    questionnaire.name,
                    questionnaire.key
                  )
                }
                key={questionnaire.id}
              >
                <ListItemAvatar>
                  <img
                    src={CardIcon}
                    alt="量表图标"
                    className={classes.cardIcon}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div className={classes.questionnaireName}>
                      {questionnaire.name}
                    </div>
                  }
                  secondary={finishStatus(questionnaire)}
                />
              </ListItem>
            ))}
          </List>
          <EnterGenderAndAgeDialog
            isOpen={isGenderAndAgeDialogOpen}
            handleClose={closeGenderAndAgeDialog}
            goToLogInPage={goToLogInPage}
            age={patient.age}
            gender={patient.gender}
          />
          <ChildrenEnterGenderAndAgeDialog
            isOpen={isChildrenGenderAndAgeDialogOpen}
            handleClose={closeChildrenGenderAndAgeDialog}
            goToLogInPage={goToLogInPage}
            age={patient.age}
            gender={patient.gender}
          />
          <PhcssGenderAndAgeDialog
            isOpen={isPhcssDialogOpen}
            handleClose={closePhcssDialog}
            goToLogInPage={goToLogInPage}
            age={patient.age}
            gender={patient.gender}
          />
        </>
      );
    }
    return (
      <>
        <div className={classes.content}>
          <div className={classes.pageHeader}>
            <p className={classes.listName}>量表</p>
            <span className={classes.refreshButtonContainer}>
              <IconButton
                size="small"
                color="primary"
                onClick={reloadButtonOnClick}
              >
                <RefreshIcon />
              </IconButton>
            </span>
          </div>
          <div className={classes.root}>
            {uniqueFormList.map((questionnaire, index) => (
              <Card
                variant="outlined"
                className={classes.card + " " + classes.noOverflow}
                key={questionnaire.id}
              >
                <CardActionArea
                  className={classes.cardActionArea}
                  onClick={() =>
                    goToFormPage(
                      questionnaire.id,
                      questionnaire.name,
                      questionnaire.key
                    )
                  }
                >
                  <CardContent
                    className={classes.noOverflow + " " + classes.cardContent}
                  >
                    <div>
                      <img
                        src={CardIcon}
                        alt="量表图标"
                        className={classes.cardIcon}
                      />
                    </div>
                    <div className={classes.noOverflow}>
                      {questionnaireName(questionnaire)}
                    </div>
                    {finishStatus(questionnaire)}
                  </CardContent>
                </CardActionArea>

                <Divider />

                <CardActions className={classes.cardActionContainer}>
                  <LineChartPopOver
                    formResultList={resultList[index]}
                    formName={questionnaire.name}
                    formKey={questionnaire.key}
                  />
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
        <EnterGenderAndAgeDialog
          isOpen={isGenderAndAgeDialogOpen}
          handleClose={closeGenderAndAgeDialog}
          goToLogInPage={goToLogInPage}
          age={patient.age}
          gender={patient.gender}
        />
        <ChildrenEnterGenderAndAgeDialog
          isOpen={isChildrenGenderAndAgeDialogOpen}
          handleClose={closeChildrenGenderAndAgeDialog}
          goToLogInPage={goToLogInPage}
          age={patient.age}
          gender={patient.gender}
        />
        <PhcssGenderAndAgeDialog
          isOpen={isPhcssDialogOpen}
          handleClose={closePhcssDialog}
          goToLogInPage={goToLogInPage}
          age={patient.age}
          gender={patient.gender}
        />
        <PsssGenderDialog
          isOpen={isPsssDialogOpen}
          handleClose={closePsssDialog}
          goToLogInPage={goToLogInPage}
          gender={patient.gender}
        />
        <SuccessIndicator
          showSuccess={isSuccessShown}
          setShowSuccess={setIsSuccessShown}
          successMessage={successMessage}
        />
      </>
    );
  }
  return null;
};
