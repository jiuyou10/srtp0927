import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Theme,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { ErrorIndicator, LoadingIndicator } from "../../../../lib/components";
import {
  QueryUser,
  QueryUser_queryUser_users_finishedForms as QuestionnaireData,
} from "../../../../lib/graphql/queries/QueryUser/__generated__/QueryUser";
import NoteIcon from "@material-ui/icons/Note";
// import { HelpPopover } from "../HelpPopover";
import {
  ADDITIONAL_FIELD_KEYS,
  ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES,
  ChooseFormModal,
} from "..";
import { UsersFilter } from "../../../../lib/graphql/globalTypes";
import { LineChartsButton } from "../LineChartsButton";
import EditIcon from "@material-ui/icons/Edit";
import { AddDiagnosisModal } from "../AddDiagnosisModal";
import { PRIMARY_COLOR } from "../../../..";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      width: "min(calc(100% - 20px), calc(100vw - 20px))",
      maxWidth: "100vw",
      fontSize: "0.8rem",
    },
    loadingIndicatorWrapper: {
      width: "100%",
      height: 200,
    },
    reportButton: {
      backgroundColor: "#fff",
      color: PRIMARY_COLOR,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    lineChartsButtonContainer: {
      marginRight: 5,
    },
    tableCell: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    iconMargin: {
      marginRight: 5,
    },
  })
);
const tableColumnTexts = [
  "门诊号",
  "姓名",
  "性别",
  "年龄",
  "教育",
  "职业",
  "婚姻",
  "注册时间",
  "医生",
  "诊断",
];
const tableColumns = [
  "userName",
  "name",
  "gender",
  "age",
  "education",
  "jobStatus",
  "marriageStatus",
  "signUpDate",
  "doctorName",
  "diagnosis",
] as const;

const tableMinWidth = [70, 80, 60, 60, 100, 70, 60, 150, 80, 150] as const;
const tableMaxWidth = [140, 80, 60, 60, 100, 70, 60, 150, 80, 150] as const;

interface Props {
  loading: boolean;
  patientList?: QueryUser;
  selectedUserAnswerIds: string[] | null;
  setSelectedUserId: (userId: string | null) => void;
  setSelectedUserAnswerIds: (selectedFormIds: string[] | null) => void;
  setIsReportShown: (isReportShown: boolean) => void;
  limit: number;
  currentPageIndex: number;
  handleLimitChange: (limit: number) => void;
  handleCurrentPageIndexChange: (currentPageIndex: number) => void;
  filter: UsersFilter;
  setFilter: (filter: UsersFilter) => void;
  handleSortChange: () => void;
  refetch: () => void;
  setPrintPageSize: (printPageSize: string) => void;
  setPrintPatientName: (printPatientName?: string) => void;
}
export const PatientTable = (props: Props) => {
  const classes = useStyles();
  const {
    loading,
    patientList,
    selectedUserAnswerIds,
    setSelectedUserId,
    setSelectedUserAnswerIds,
    setIsReportShown,
    limit,
    currentPageIndex,
    handleLimitChange,
    handleCurrentPageIndexChange,
    filter,
    handleSortChange,
    refetch,
    setPrintPageSize,
    setPrintPatientName,
  } = props;
  const [showError, setShowError] = useState(false);
  const [isChooseFormModalShown, setIsChooseFormModalShown] = useState(false);
  const [finishedFormList, setFinishedFormList] = useState<
    QuestionnaireData[] | null
  >(null);
  const handleReportButtonClick = (
    finishedForms: QuestionnaireData[],
    userId: string,
    patientName?: string
  ) => {
    setSelectedUserId(userId);
    setFinishedFormList(finishedForms);
    const selectedUserAnswerIds = finishedForms
      .map((finishedForm) => finishedForm.userAnswerId)
      .filter((finishedForm): finishedForm is string => finishedForm !== null);
    setSelectedUserAnswerIds(selectedUserAnswerIds);
    setIsChooseFormModalShown(true);
    setPrintPatientName(patientName);
  };
  const closeModal = () => {
    setIsChooseFormModalShown(false);
  };
  const onOkButtonClick = (pageSize: string) => {
    setIsReportShown(true);
    setPrintPageSize(pageSize);
  };
  const [isAddDiagnosisModalShown, setIsAddDiagnosisModalShown] = useState(
    false
  );
  const [addDiagnosisPatientId, setAddDiagnosisPatientId] = useState<
    string | null
  >(null);
  const handleAddDiagnosisModalClose = () => {
    setIsAddDiagnosisModalShown(false);
  };
  const openAddDiagnosisModal = () => {
    setIsAddDiagnosisModalShown(true);
  };
  const [addDiagnosisPatientName, setAddDiagnosisPatientName] = useState<
    string | null
  >(null);
  const handleEditDiagnosisButtonClick = (
    patientName: string,
    patientId: string
  ) => {
    setAddDiagnosisPatientName(patientName);
    setAddDiagnosisPatientId(patientId);
    openAddDiagnosisModal();
  };
  useEffect(() => {
    if (
      loading === false &&
      patientList !== undefined &&
      patientList.queryUser.users.length === 0
    ) {
      setShowError(true);
    }
  }, [loading, patientList]);
  if (loading) {
    return (
      <div className={classes.loadingIndicatorWrapper}>
        <LoadingIndicator />
      </div>
    );
  }
  if (patientList === undefined) {
    return null;
  }
  if (patientList.queryUser.users.length === 0) {
    return (
      <ErrorIndicator
        showError={showError}
        setShowError={setShowError}
        errorMessage="未找到符合条件的病人！"
      />
    );
  }

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleLimitChange(Number(event.target.value));
  };

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    handleCurrentPageIndexChange(page);
  };

  const labelDisplayedRows = ({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }): string => {
    return `共计${count}条数据，当前为第${Math.ceil(from / limit)}页`;
  };
  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <TablePagination
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          page={currentPageIndex}
          count={patientList.queryUser.total}
          onChangePage={handlePageChange}
          component="div"
          onChangeRowsPerPage={handleRowsPerPageChange}
          labelDisplayedRows={labelDisplayedRows}
        />
        <Table size="small" aria-label="病人列表">
          <TableHead>
            <TableRow>
              {tableColumnTexts.map((text, index) => (
                <TableCell
                  key={text}
                  style={{
                    minWidth: tableMinWidth[index],
                    maxWidth: tableMaxWidth[index],
                    padding: 5,
                    paddingLeft: index === 0 ? 10 : undefined,
                  }}
                  className={classes.tableCell}
                >
                  {tableColumns[index] === "signUpDate" ? (
                    <TableSortLabel
                      active={tableColumns[index] === "signUpDate"}
                      direction={
                        filter === UsersFilter.DATE_LATEST ? "desc" : "asc"
                      }
                      onClick={handleSortChange}
                    >
                      {text}
                    </TableSortLabel>
                  ) : (
                    text
                  )}
                </TableCell>
              ))}
              <TableCell
                style={{
                  padding: 5,
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList.queryUser.users.map((patientInformation) => {
              const isReportButtonDisabled =
                !patientInformation.finishedForms ||
                patientInformation.finishedForms.length === 0;

              return (
                <TableRow key={patientInformation.userName}>
                  {tableColumns.map((column, index) => {
                    const content =
                      index === tableColumns.length - 1
                        ? ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES[
                            ADDITIONAL_FIELD_KEYS.indexOf(
                              patientInformation[
                                column
                              ] as typeof ADDITIONAL_FIELD_KEYS[number]
                            )
                          ]
                        : patientInformation[column];
                    return (
                      <TableCell
                        key={column}
                        style={{
                          minWidth: tableMinWidth[index],
                          maxWidth: tableMaxWidth[index],
                          padding: 5,
                          paddingLeft: index === 0 ? 10 : undefined,
                        }}
                        className={classes.tableCell}
                        title={content || undefined}
                      >
                        {index === tableColumns.length - 1 ? (
                          <>
                            <IconButton
                              aria-label="delete"
                              className={classes.iconMargin}
                              size="small"
                              color="primary"
                              onClick={() =>
                                patientInformation.name &&
                                handleEditDiagnosisButtonClick(
                                  patientInformation.name,
                                  patientInformation.id
                                )
                              }
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                            {content}
                          </>
                        ) : (
                          content
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ minWidth: 180, padding: 0 }}>
                    <div style={{ display: "flex" }}>
                      <span className={classes.lineChartsButtonContainer}>
                        <LineChartsButton
                          finishedForms={patientInformation.finishedForms}
                        />
                      </span>
                      <Button
                        size="small"
                        // className={classes.reportButton}
                        color="primary"
                        startIcon={<NoteIcon />}
                        disabled={isReportButtonDisabled}
                        onClick={() =>
                          patientInformation.finishedForms &&
                          handleReportButtonClick(
                            patientInformation.finishedForms,
                            patientInformation.id,
                            patientInformation.name || undefined
                          )
                        }
                      >
                        报告
                      </Button>
                      {/* {isReportButtonDisabled && patientInformation.name && (
                        <HelpPopover name={patientInformation.name} />
                      )} */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {finishedFormList && selectedUserAnswerIds && (
        <ChooseFormModal
          isOpen={isChooseFormModalShown}
          closeModal={closeModal}
          finishedFormList={finishedFormList}
          selectedUserAnswerIds={selectedUserAnswerIds}
          setSelectedUserAnswerIds={setSelectedUserAnswerIds}
          onOkButtonClick={onOkButtonClick}
        />
      )}
      {addDiagnosisPatientName && addDiagnosisPatientId && (
        <AddDiagnosisModal
          isDialogOpen={isAddDiagnosisModalShown}
          handleDialogClose={handleAddDiagnosisModalClose}
          patientName={addDiagnosisPatientName}
          patientId={addDiagnosisPatientId}
          refetch={refetch}
        />
      )}
    </>
  );
};
