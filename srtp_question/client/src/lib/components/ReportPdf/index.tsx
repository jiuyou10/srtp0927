import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import {
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import printJS from "print-js";
import PrintIcon from "@material-ui/icons/Print";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    },
    paper: {
      marginBottom: 10,
    },
    pdfViewer: {},
    topbar: {
      height: 48,
      display: "flex",
      justifyContent: "space-between",
    },
    returnButton: {
      marginLeft: 5,
    },
    downloadButton: {
      marginRight: 5,
    },
    printIcon: {},
    page: {
      padding: 3,
    },
  })
);

interface Props {
  pdfData: string;
  closeReport: () => void;
  patientName?: string;
}

export const ReportPdf = ({ pdfData, closeReport, patientName }: Props) => {
  const classes = useStyles();

  const [width, setWidth] = React.useState(window.innerWidth);

  const updateWidth = () => {
    if (window.innerWidth !== width) setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });
  const printReport = () => {
    printJS({
      printable: `${pdfData}`,
      type: "pdf",
      base64: true,
    });
  };
  const [numPages, setNumPages] = useState<number>(0);
  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    setNumPages(nextNumPages);
  };

  return (
    <>
      <div>
        <div className={classes.topbar}>
          <IconButton onClick={closeReport} className={classes.returnButton}>
            <ArrowBackIcon />
          </IconButton>
          <div>
            <IconButton className={classes.printIcon} onClick={printReport}>
              <PrintIcon />
            </IconButton>
            <IconButton
              className={classes.downloadButton}
              onClick={() => {
                const b64toBlob = (
                  b64Data: string,
                  contentType = "",
                  sliceSize = 512
                ) => {
                  const byteCharacters = atob(b64Data);
                  const byteArrays = [];

                  for (
                    let offset = 0;
                    offset < byteCharacters.length;
                    offset += sliceSize
                  ) {
                    const slice = byteCharacters.slice(
                      offset,
                      offset + sliceSize
                    );

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                      byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                  }

                  const blob = new Blob(byteArrays, { type: contentType });
                  return blob;
                };
                const out = b64toBlob(pdfData, "application/pdf");
                const a = document.createElement("a");
                const url = window.URL.createObjectURL(out);
                a.href = url;
                a.download = patientName
                  ? `${patientName}-心理评估报告单.pdf`
                  : "心理评估报告单.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
      </div>
      <div className={classes.root}>
        <Document
          file={`data:application/pdf;base64,${pdfData}`}
          loading={<div></div>}
          className={classes.pdfViewer}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Paper elevation={3} className={classes.paper} key={index}>
              <Page
                pageNumber={index + 1}
                loading={<></>}
                renderMode="svg"
                width={
                  document.getElementById("root")
                    ? (document.getElementById("root")!.offsetWidth > 750
                        ? document.getElementById("root")!.offsetWidth - 240
                        : document.getElementById("root")!.offsetWidth) * 0.8
                    : 1000
                }
              />
            </Paper>
          ))}
        </Document>
      </div>
    </>
  );
};
