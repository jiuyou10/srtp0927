import { useQuery } from "@apollo/client";
import React, { ComponentType, PropsWithChildren } from "react";
import { LoadingIndicator } from "../../../../lib/components";
import { REPORT } from "../../../../lib/graphql/queries";
import {
  Report as ReportData,
  ReportVariables,
} from "../../../../lib/graphql/queries/Report/__generated__/Report";

export const withReportPdfData = (
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
    pageSize,
    patientName,
  }: PropsWithChildren<{
    userAnswerIds: string[];
    closeReport: () => void;
    pageSize: string;
    patientName?: string;
  }>) => {
    // Get PDF data.
    const { data, loading } = useQuery<ReportData, ReportVariables>(REPORT, {
      variables: {
        userAnswerIds,
        pageSize,
      },
      fetchPolicy: "no-cache",
    });

    if (loading || !data) {
      return <LoadingIndicator />;
    }

    if (data.report && data.report.pdf) {
      return (
        <WrappedComponent
          pdfData={data.report.pdf}
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
