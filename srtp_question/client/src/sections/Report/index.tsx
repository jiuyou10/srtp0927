import { useQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React, { useState } from "react";
import { LoadingIndicator } from "../../lib/components";
import { QUESTIONNAIRE_LIST } from "../../lib/graphql/queries";
import {
  QuestionnaireList as QuestionnaireListData,
  QuestionnaireListVariables,
} from "../../lib/graphql/queries/QuestionnaireList/__generated__/QuestionnaireList";
import { ReportPdf } from "../../lib/components";
import { withReportPdfData } from "./components";

const PdfViewer = withReportPdfData(ReportPdf);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: "5px 10px",
    },
    questionnaireTable: {
      marginTop: 20,
      marginBottom: 20,
      maxHeight: "calc(100vh - 200px)",
      overflow: "auto",
    },
    doneIcon: {
      color: "#4caf50",
    },
    pageSizeSelect: {
      minWidth: 100,
      marginRight: 10,
    },
  })
);

interface Props {
  patientName?: string;
}
export const Report = ({ patientName }: Props) => {
  const classes = useStyles();
  const { loading, data, error: questionnaireListError } = useQuery<
    QuestionnaireListData,
    QuestionnaireListVariables
  >(QUESTIONNAIRE_LIST, {
    variables: { isReport: true },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const questionnaireList = data.questionnaireList;
      let count = 0;
      for (const questionnaire of questionnaireList) {
        if (questionnaire.done) {
          count += 1;
        }
      }
      setNumberOfFinishedQuestionnaires(count);
      const newselectedUserAnswers = new Set<string>();
      for (const questionnaire of questionnaireList) {
        if (questionnaire.done && questionnaire.userAnswerId)
          newselectedUserAnswers.add(questionnaire.userAnswerId);
      }
      setSelectedUserAnswers(newselectedUserAnswers);
    },
  });
  const [selectedUserAnswers, setSelectedUserAnswers] = useState<Set<string>>(
    new Set<string>()
  );
  const [pageSize, setPageSize] = useState("a5");
  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPageSize(event.target.value as string);
  };
  const [
    numberOfFinishedQuestionnaires,
    setNumberOfFinishedQuestionnaires,
  ] = useState<number | null>(null);
  const [isReportVisible, setIsReportVisible] = useState(false);

  if (loading || !data || numberOfFinishedQuestionnaires === null) {
    return <LoadingIndicator />;
  }

  const questionnaireList = data.questionnaireList;

  const selectedQuestionnaireArray: string[] = [];
  questionnaireList.forEach((questionnaire) => {
    if (questionnaire.done && questionnaire.userAnswerId) {
      if (selectedUserAnswers.has(questionnaire.userAnswerId)) {
        selectedQuestionnaireArray.push(questionnaire.userAnswerId);
      }
    }
  });
  if (isReportVisible) {
    return (
      <PdfViewer
        userAnswerIds={selectedQuestionnaireArray}
        closeReport={() => setIsReportVisible(false)}
        pageSize={pageSize}
        patientName={patientName}
      />
    );
  }
  const selectQuestionnaire = (
    event: React.ChangeEvent<HTMLInputElement>,
    userAnswerId: string
  ) => {
    const checked = event.target.checked;
    const newselectedUserAnswers = new Set(selectedUserAnswers);
    if (checked) {
      newselectedUserAnswers.add(userAnswerId);
    } else {
      newselectedUserAnswers.delete(userAnswerId);
    }
    setSelectedUserAnswers(newselectedUserAnswers);
  };
  const selectAllQuestionnaires = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const newselectedUserAnswers = new Set<string>();
    if (checked) {
      for (const questionnaire of questionnaireList) {
        if (questionnaire.done && questionnaire.userAnswerId)
          newselectedUserAnswers.add(questionnaire.userAnswerId);
      }
    }
    setSelectedUserAnswers(newselectedUserAnswers);
  };
  const generateReport = () => {
    setIsReportVisible(true);
  };
  return (
    <div className={classes.content}>
      <TableContainer component={Paper} className={classes.questionnaireTable}>
        <Table size="small" aira-label="选择已完成的量表，生成报告">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selectedUserAnswers.size ===
                      numberOfFinishedQuestionnaires &&
                    selectedUserAnswers.size !== 0
                  }
                  disabled={numberOfFinishedQuestionnaires === 0}
                  onChange={selectAllQuestionnaires}
                />
              </TableCell>
              <TableCell>量表</TableCell>
              <TableCell>完成状态</TableCell>
              <TableCell>完成日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionnaireList.map((questionnaire, index) => (
              <TableRow key={`questionnaire-${index}`}>
                <TableCell padding="checkbox">
                  <Checkbox
                    disabled={!questionnaire.done}
                    checked={
                      !!questionnaire.userAnswerId &&
                      selectedUserAnswers.has(questionnaire.userAnswerId)
                    }
                    onChange={(e) =>
                      questionnaire.userAnswerId &&
                      selectQuestionnaire(e, questionnaire.userAnswerId)
                    }
                  />
                </TableCell>
                <TableCell>{questionnaire.name}</TableCell>
                <TableCell>
                  {questionnaire.done ? (
                    <CheckCircleOutline
                      className={classes.doneIcon}
                      fontSize="small"
                    />
                  ) : null}
                </TableCell>
                <TableCell>
                  {questionnaire.displayedFillInDate || null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormControl
        className={classes.pageSizeSelect}
        variant="outlined"
        size="small"
      >
        <InputLabel id="page-size-label">纸张大小</InputLabel>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          labelId="page-size-label"
          label="纸张大小"
          id="page-size-select"
        >
          <MenuItem value={"a4"}>A4</MenuItem>
          <MenuItem value={"a5"}>A5</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        disabled={selectedUserAnswers.size === 0}
        onClick={generateReport}
      >
        生成报告
      </Button>
    </div>
  );
};
