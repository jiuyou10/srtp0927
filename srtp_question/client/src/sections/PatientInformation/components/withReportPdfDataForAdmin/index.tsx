import { useQuery } from "@apollo/client";
import React, { ComponentType, PropsWithChildren } from "react";
import { LoadingIndicator } from "../../../../lib/components";
import { REPORT_FOR_ADMIN } from "../../../../lib/graphql/queries";
import {
  ReportForAdmin as ReportData,
  ReportForAdminVariables,
} from "../../../../lib/graphql/queries/ReportForAdmin/__generated__/ReportForAdmin";

export const withReportPdfDataForAdmin = (
  WrappedComponent: ComponentType<
    PropsWithChildren<{
      pdfData: string;
      closeReport: () => void;
      patientName?: string;
    }>
  >
) => {
  return ({
    children,
    userAnswerIds,
    closeReport,
    userId,
    pageSize,
    patientName,
  }: PropsWithChildren<{
    userAnswerIds: string[];
    closeReport: () => void;
    userId: string;
    pageSize: string;
    patientName?: string;
  }>) => {
    // Get PDF data.
    const { data, loading } = useQuery<ReportData, ReportForAdminVariables>(
      REPORT_FOR_ADMIN,
      {
        variables: {
          userAnswerIds,
          userId,
          pageSize,
        },
        fetchPolicy: "no-cache",
      }
    );

    if (loading || !data) {
      return <LoadingIndicator />;
    }

    if (data.reportForAdmin && data.reportForAdmin.pdf) {
      return (
        <WrappedComponent
          pdfData={data.reportForAdmin.pdf}
          closeReport={closeReport}
          patientName={patientName}
        >
          {children}
        </WrappedComponent>
      );
    }

    return null;
  };
};
