import { useLazyQuery } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { ReportPdf } from "../../lib/components";
import { UsersFilter } from "../../lib/graphql/globalTypes";
import { QUERY_USER } from "../../lib/graphql/queries/QueryUser";
import {
  QueryUser,
  QueryUserVariables,
} from "../../lib/graphql/queries/QueryUser/__generated__/QueryUser";
import {
  Header,
  PatientTable,
  SearchPatientForm,
  withReportPdfDataForAdmin,
} from "./components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: "5px 10px",
    },
    hiddenContent: {
      display: "none",
    },
  })
);
const PdfViewer = withReportPdfDataForAdmin(ReportPdf);

export const INITIAL_LIMIT = 10;
export const INITIAL_CURRENT_PAGE_INDEX = 0;
export const INITAL_ONLY_MY_PATIENT = false;

export const PatientInformation = () => {
  const [getQueryResult, { loading, data: userListData, error }] = useLazyQuery<
    QueryUser,
    QueryUserVariables
  >(QUERY_USER, {
    fetchPolicy: "no-cache",
  });

  const searchFormRef = useRef<ElementRef<typeof SearchPatientForm>>(null);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [currentPageIndex, setCurrentPageIndex] = useState(
    INITIAL_CURRENT_PAGE_INDEX
  );
  const [filter, setFilter] = useState<UsersFilter>(UsersFilter.DATE_LATEST);
  const classes = useStyles();
  const [selectedUserAnswerIds, setSelectedUserAnswerIds] = useState<
    string[] | null
  >(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isReportShown, setIsReportShown] = useState(false);
  const closeReport = () => {
    setIsReportShown(false);
  };
  const searchPatients = (params: QueryUserVariables) => {
    getQueryResult({ variables: params });
    setSearchParams(params);
  };
  const getQueryResultRef = useRef(getQueryResult);
  const [searchParams, setSearchParams] = useState<QueryUserVariables>({
    limit: INITIAL_LIMIT,
    currentPageIndex: INITIAL_CURRENT_PAGE_INDEX,
  });
  const handleLimitChange = (limit: number): void => {
    setLimit(limit);
    setCurrentPageIndex(0);
    getQueryResult({
      variables: { ...searchParams, limit, currentPageIndex: 0, filter },
    });
  };
  const handleCurrentPageIndexChange = (currentPageIndex: number): void => {
    setCurrentPageIndex(currentPageIndex);
    getQueryResult({
      variables: { ...searchParams, limit, currentPageIndex, filter },
    });
  };
  const refetch = () => {
    getQueryResult({
      variables: { ...searchParams, limit, currentPageIndex, filter },
    });
  };
  const handleSortChange = () => {
    const newFilter =
      filter === UsersFilter.DATE_LATEST
        ? UsersFilter.DATE_OLDEST
        : UsersFilter.DATE_LATEST;
    setFilter(newFilter);
    setCurrentPageIndex(0);
    getQueryResult({
      variables: {
        ...searchParams,
        limit,
        currentPageIndex: 0,
        filter: newFilter,
      },
    });
  };
  const searchMyPatients = (onlyMyPatient: boolean) => {
    setCurrentPageIndex(0);
    getQueryResult({
      variables: {
        ...searchParams,
        onlyMyPatient,
        currentPageIndex: 0,
        limit,
        filter,
      },
    });
  };
  const handleAdditionalFieldsSearch = (additionalFields: string[]) => {
    setCurrentPageIndex(0);
    getQueryResult({
      variables: {
        ...searchParams,
        additionalFields: additionalFields,
        currentPageIndex: 0,
        limit,
        filter,
      },
    });
  };
  useEffect(() => {
    getQueryResultRef.current({
      variables: {
        limit: INITIAL_LIMIT,
        currentPageIndex: INITIAL_CURRENT_PAGE_INDEX,
        filter: UsersFilter.DATE_LATEST,
        onlyMyPatient: INITAL_ONLY_MY_PATIENT,
      },
    });
  }, []);
  const isPdfViewerShown = Boolean(
    isReportShown && selectedUserId && selectedUserAnswerIds
  );
  const [printPageSize, setPrintPageSize] = useState("a5");
  const [printPatientName, setPrintPatientName] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <div className={isPdfViewerShown ? classes.hiddenContent : ""}>
        <Header text={"搜索病人信息"} />
        <div className={classes.content}>
          <SearchPatientForm
            searchPatients={searchPatients}
            limit={limit}
            currentPageIndex={currentPageIndex}
            ref={searchFormRef}
            setCurrentPageIndex={setCurrentPageIndex}
            filter={filter}
            searchMyPatients={searchMyPatients}
            handleAdditionalFieldsSearch={handleAdditionalFieldsSearch}
          />
          <PatientTable
            loading={loading}
            patientList={userListData}
            selectedUserAnswerIds={selectedUserAnswerIds}
            setSelectedUserId={setSelectedUserId}
            setSelectedUserAnswerIds={setSelectedUserAnswerIds}
            setIsReportShown={setIsReportShown}
            limit={limit}
            currentPageIndex={currentPageIndex}
            handleLimitChange={handleLimitChange}
            handleCurrentPageIndexChange={handleCurrentPageIndexChange}
            filter={filter}
            setFilter={setFilter}
            handleSortChange={handleSortChange}
            refetch={refetch}
            setPrintPageSize={setPrintPageSize}
            setPrintPatientName={setPrintPatientName}
          />
        </div>
      </div>
      {isReportShown && selectedUserId && selectedUserAnswerIds && (
        <PdfViewer
          userId={selectedUserId}
          userAnswerIds={selectedUserAnswerIds}
          closeReport={closeReport}
          pageSize={printPageSize}
          patientName={printPatientName}
        />
      )}
    </>
  );
};
