import { IResolvers } from "apollo-server-express";
import { Database, UserWithId } from "../../../lib/type";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { ReportArgs, ReportForAdminArgs } from "./type";
import { CSS_RESET } from "./cssReset";
import { dateToString } from "../../../lib/utils";
import {
  generateEmbuReport,
  generateEpdsReport,
  generateEpqChildrenReport,
  generateEpqReport,
  generateGad7Report,
  generateHcl32Report,
  generateMdqReport,
  generatePhcssReport,
  generatePhq9Report,
  generatePsqiReport,
  generatePsssReport,
  generateScl90Report,
  generateYaleBrownReport,
  generatePSS10Report,
  generateHAMAReport,
  generateASRSReport,
  generateHAMDReport,
  generateHAMSReport,
  generateCPSSReport,
  generateCPOReport,
  generatePTEDReport,
  generateNTTReport,
  generateMADRSReport
} from "./reportSnippit";

const generateReport = (
  questionnaireName: string,
  questionnaireKey: string,
  answers: number[],
  result: string | number,
  fillInDate: Date,
  userInfo: UserWithId
) => {
  const dateString = `<div align="center" style="margin-bottom: 10px;">${dateToString(
    fillInDate
  )}</div>`;
  let content = "";
  switch (questionnaireKey) {
    case "phq-9": {
      content = generatePhq9Report(result, dateString);
      break;
    }
    case "gad-7": {
      content = generateGad7Report(result, dateString);
      break;
    }
    case "scl-90": {
      content = generateScl90Report(result, dateString);
      break;
    }
    case "epq": {
      content = generateEpqReport(result, dateString);
      break;
    }
    case "children-epq": {
      content = generateEpqChildrenReport(result, dateString);
      break;
    }
    case "yale-brown": {
      content = generateYaleBrownReport(result, dateString, questionnaireName);
      break;
    }
    case "hcl-32": {
      content = generateHcl32Report(result, dateString, questionnaireName);
      break;
    }
    case "epds": {
      content = generateEpdsReport(result, dateString, questionnaireName);
      break;
    }
    case "psss": {
      content = generatePsssReport(
        result,
        dateString,
        questionnaireName,
        userInfo.gender
      );
      break;
    }
    case "mdq": {
      content = generateMdqReport(result, dateString, questionnaireName);
      break;
    }
    case "psqi": {
      content = generatePsqiReport(result, dateString, questionnaireName);
      break;
    }
    case "phcss": {
      content = generatePhcssReport(
        result,
        dateString,
        questionnaireName,
        userInfo.age,
        userInfo.gender
      );
      break;
    }
    case "embu": {
      content = generateEmbuReport(result, dateString, questionnaireName);
      break;
    }
	case "PSS-10": {
      content = generatePSS10Report(result, dateString);
      break;
    }
	case "HAMA": {
      content = generateHAMAReport(result, dateString);
      break;
    }
	case "ASRS": {
      content = generateASRSReport(result, dateString);
      break;
    }
	case "HAMD": {
      content = generateHAMDReport(result, dateString);
      break;
    }
	case "HAMS": {
      content = generateHAMSReport(result, dateString);
      break;
    }
	case "CPSS": {
      content = generateCPSSReport(result, dateString);
      break;
    }
	case "CPO": {
      content = generateCPOReport(result, dateString);
      break;
    }
	case "PTED": {
      content = generatePTEDReport(result, dateString);
      break;
    }
    case "madrs": {
      content = generateMADRSReport(result, dateString);
      break;
    }
	case "NTT": {
      content = generateNTTReport(result, dateString);
      break;
    }
  }
  return content;
};

const getPdfReport = async (
  userInfo: UserWithId,
  userAnswerIds: string[],
  db: Database,
  pageSize: string
) => {
  const isA4 = pageSize === "a4";
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const htmlToPdf = require("html-pdf-node");
  let contents: string[] = [];
  const questionnaireKeys: string[] = [];
  for (const userAnswerId of userAnswerIds) {
    const userAnswer = await db.userAnswers.findOne({
      _id: new ObjectId(userAnswerId),
    });
    if (!userAnswer) throw new Error("User answer is not found!");
    const questionnaireId = userAnswer.questionnaireId;
    const questionnaire = await db.questionnaireContents.findOne({
      questionnaireId: new ObjectId(questionnaireId),
    });
    if (questionnaire) {
      questionnaireKeys.push(questionnaire.key);
      contents.push(
        generateReport(
          questionnaire.name,
          questionnaire.key,
          userAnswer.answers,
          userAnswer.result,
          userAnswer.fillInDate,
          userInfo
        )
      );
    }
  }
  const snippetArray = contents.map((content, index) => ({
    content,
    questionnaireKey: questionnaireKeys[index],
  }));
  snippetArray.sort((a, b) => {
    const getCompareValue = (a: typeof snippetArray[number]) => {
      if (a.questionnaireKey === "gad-7") {
        return 0;
      } else if (a.questionnaireKey === "phq-9") {
        return 1;
      }
      return 2;
    };
    return getCompareValue(a) - getCompareValue(b);
  });
  contents = snippetArray.map((snippet) => snippet.content);
  const htmlString = `
<html>
  <style>
  ${CSS_RESET}
  </style>
  ${
    process.env.NODE_ENV === "offline"
      ? `
  <style>
  @font-face {
    font-family: 'STSong';
    src: url(http://localhost:${process.env.PORT}/STSong.ttf) format('truetype');
  }
  @font-face {
    font-family: STKaiti;
    src: url(http://localhost:${process.env.PORT}/STKaiti.ttf) format('truetype');
  }
  </style>`
      : ""
  }
  <body style="font-family: STSong;font-size: 16px">
    <p style="font-family: 'STKaiti'; font-size: 22px; margin-top: 0px;" align="center">
      ??????????????????????????????
    </p>
    <p style="font-family: STSong; font-size: 22px; margin-top: 10px; margin-bottom: 10px;" align="center">
      ?????????????????????
    </p>
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px;"
      cellpadding="4"
    >
      <tbody>
        <tr">
          <td width="25%" style="padding-bottom:  8px;">????????? ${
            userInfo.name || ""
          }</td>
          <td width="25%">????????? ${userInfo.age || ""}</td>
          <td width="25%">????????? ${userInfo.gender || ""}</td>
          <td width="25%">??????/???????????? ${userInfo.userName || ""}</td>
        </tr>
        <tr>
          <td width="25%">??????????????? ${userInfo.education || ""}</td>
          <td width="25%">????????? ${userInfo.marriageStatus || ""}</td>
          <td width="25%">?????????${userInfo.jobStatus || ""}</td>
          <td width="25%">&nbsp;&nbsp;&nbsp;</td>
        </tr>
      </tbody>
    </table>
    <hr style="width:80% align:center" />
${contents.join("")}
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px"
      cellpadding="4"
    >
      <tbody>
        <tr>
          <td style="padding-bottom: 20px">???????????????:</td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
    <hr style="width:80% align:center" />
    <p style="font-family: 'STSong'; font-size: 14px">
      ?????????????????????????????????????????????????????????
    </p>
    <p></p>
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px"
      cellpadding="4"
    >
      <tbody>
        <tr>
          <td width="70%"></td>
          <td width="30%" style="padding-bottom: 10px; padding-top: 5px;">??????????????????</td>
        </tr>
        <tr></tr>
        <tr>
          <td width="70%"></td>
          <td width="30%">
            <span style="margin-left: 40px">&nbsp;&nbsp;&nbsp;???</span>
            <span style="margin-left: 25px">&nbsp;&nbsp;&nbsp;???</span>
            <span style="margin-left: 25px">&nbsp;&nbsp;&nbsp;???</span>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
  const pdfBuffer = await htmlToPdf.generatePdf(
    {
      content: htmlString,
      name: "report.pdf",
    },
    {
      format: isA4 ? "A4" : "A5",
      margin: {
        top: isA4 ? "10mm" : "6mm",
        left: "10mm",
        bottom: "10mm",
        right: isA4 ? "10mm" : "6mm",
      },
      scale: isA4 ? 1.0 : 0.7,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process", // <- this one doesn't works in Windows
        "--disable-gpu",
      ],
    }
  );
  return {
    pdf: pdfBuffer.toString("base64"),
  };
};

export const reportResolvers: IResolvers = {
  Query: {
    report: async (
      _root: undefined,
      { userAnswerIds, pageSize }: ReportArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      const userInfo = await db.users.findOne({
        _id: new ObjectId(req.signedCookies.patient),
      });

      if (!userInfo) {
        throw new Error("User not found");
      }
      return await getPdfReport(userInfo, userAnswerIds, db, pageSize);
    },
    reportForAdmin: async (
      _root: undefined,
      { userId, userAnswerIds, pageSize }: ReportForAdminArgs,
      { db }: { db: Database; req: Request }
    ) => {
      // Use cookie to test if this is an admin.
      const userInfo = await db.users.findOne({
        _id: new ObjectId(userId),
      });

      if (!userInfo) {
        throw new Error("User not found");
      }
      return await getPdfReport(userInfo, userAnswerIds, db, pageSize);
    },
  },
};
