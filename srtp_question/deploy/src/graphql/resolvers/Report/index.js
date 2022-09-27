"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportResolvers = void 0;
const mongodb_1 = require("mongodb");
const cssReset_1 = require("./cssReset");
const utils_1 = require("../../../lib/utils");
const reportSnippit_1 = require("./reportSnippit");
const generateReport = (questionnaireName, questionnaireKey, answers, result, fillInDate, userInfo) => {
    const dateString = `<div align="center" style="margin-bottom: 10px;">${utils_1.dateToString(fillInDate)}</div>`;
    let content = "";
    switch (questionnaireKey) {
        case "phq-9": {
            content = reportSnippit_1.generatePhq9Report(result, dateString);
            break;
        }
        case "gad-7": {
            content = reportSnippit_1.generateGad7Report(result, dateString);
            break;
        }
        case "scl-90": {
            content = reportSnippit_1.generateScl90Report(result, dateString);
            break;
        }
        case "epq": {
            content = reportSnippit_1.generateEpqReport(result, dateString);
            break;
        }
        case "children-epq": {
            content = reportSnippit_1.generateEpqChildrenReport(result, dateString);
            break;
        }
        case "yale-brown": {
            content = reportSnippit_1.generateYaleBrownReport(result, dateString, questionnaireName);
            break;
        }
        case "hcl-32": {
            content = reportSnippit_1.generateHcl32Report(result, dateString, questionnaireName);
            break;
        }
        case "epds": {
            content = reportSnippit_1.generateEpdsReport(result, dateString, questionnaireName);
            break;
        }
        case "psss": {
            content = reportSnippit_1.generatePsssReport(result, dateString, questionnaireName, userInfo.gender);
            break;
        }
        case "mdq": {
            content = reportSnippit_1.generateMdqReport(result, dateString, questionnaireName);
            break;
        }
        case "psqi": {
            content = reportSnippit_1.generatePsqiReport(result, dateString, questionnaireName);
            break;
        }
        case "phcss": {
            content = reportSnippit_1.generatePhcssReport(result, dateString, questionnaireName, userInfo.age, userInfo.gender);
            break;
        }
        case "embu": {
            content = reportSnippit_1.generateEmbuReport(result, dateString, questionnaireName);
            break;
        }
        case "PSS-10": {
            content = reportSnippit_1.generatePSS10Report(result, dateString);
            break;
        }
        case "HAMA": {
            content = reportSnippit_1.generateHAMAReport(result, dateString);
            break;
        }
        case "ASRS": {
            content = reportSnippit_1.generateASRSReport(result, dateString);
            break;
        }
        case "HAMD": {
            content = reportSnippit_1.generateHAMDReport(result, dateString);
            break;
        }
        case "HAMS": {
            content = reportSnippit_1.generateHAMSReport(result, dateString);
            break;
        }
        case "CPSS": {
            content = reportSnippit_1.generateCPSSReport(result, dateString);
            break;
        }
        case "CPO": {
            content = reportSnippit_1.generateCPOReport(result, dateString);
            break;
        }
        case "PTED": {
            content = reportSnippit_1.generatePTEDReport(result, dateString);
            break;
        }
        case "NTT": {
            content = reportSnippit_1.generateNTTReport(result, dateString);
            break;
        }
    }
    return content;
};
const getPdfReport = async (userInfo, userAnswerIds, db, pageSize) => {
    const isA4 = pageSize === "a4";
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const htmlToPdf = require("html-pdf-node");
    let contents = [];
    const questionnaireKeys = [];
    for (const userAnswerId of userAnswerIds) {
        const userAnswer = await db.userAnswers.findOne({
            _id: new mongodb_1.ObjectId(userAnswerId),
        });
        if (!userAnswer)
            throw new Error("User answer is not found!");
        const questionnaireId = userAnswer.questionnaireId;
        const questionnaire = await db.questionnaireContents.findOne({
            questionnaireId: new mongodb_1.ObjectId(questionnaireId),
        });
        if (questionnaire) {
            questionnaireKeys.push(questionnaire.key);
            contents.push(generateReport(questionnaire.name, questionnaire.key, userAnswer.answers, userAnswer.result, userAnswer.fillInDate, userInfo));
        }
    }
    const snippetArray = contents.map((content, index) => ({
        content,
        questionnaireKey: questionnaireKeys[index],
    }));
    snippetArray.sort((a, b) => {
        const getCompareValue = (a) => {
            if (a.questionnaireKey === "gad-7") {
                return 0;
            }
            else if (a.questionnaireKey === "phq-9") {
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
  ${cssReset_1.CSS_RESET}
  </style>
  ${process.env.NODE_ENV === "offline"
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
        : ""}
  <body style="font-family: STSong;font-size: 16px">
    <p style="font-family: 'STKaiti'; font-size: 22px; margin-top: 0px;" align="center">
      东南大学附属中大医院
    </p>
    <p style="font-family: STSong; font-size: 22px; margin-top: 10px; margin-bottom: 10px;" align="center">
      心理评估报告单
    </p>
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px;"
      cellpadding="4"
    >
      <tbody>
        <tr">
          <td width="25%" style="padding-bottom:  8px;">姓名： ${userInfo.name || ""}</td>
          <td width="25%">年龄： ${userInfo.age || ""}</td>
          <td width="25%">性别： ${userInfo.gender || ""}</td>
          <td width="25%">门诊/住院号： ${userInfo.userName || ""}</td>
        </tr>
        <tr>
          <td width="25%">文化程度： ${userInfo.education || ""}</td>
          <td width="25%">婚姻： ${userInfo.marriageStatus || ""}</td>
          <td width="25%">职业：${userInfo.jobStatus || ""}</td>
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
          <td style="padding-bottom: 20px">评定者意见:</td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
    <hr style="width:80% align:center" />
    <p style="font-family: 'STSong'; font-size: 14px">
      注：以上结论仅供医生参考，不作诊断依据
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
          <td width="30%" style="padding-bottom: 10px; padding-top: 5px;">评定者签名：</td>
        </tr>
        <tr></tr>
        <tr>
          <td width="70%"></td>
          <td width="30%">
            <span style="margin-left: 40px">&nbsp;&nbsp;&nbsp;年</span>
            <span style="margin-left: 25px">&nbsp;&nbsp;&nbsp;月</span>
            <span style="margin-left: 25px">&nbsp;&nbsp;&nbsp;日</span>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
    const pdfBuffer = await htmlToPdf.generatePdf({
        content: htmlString,
        name: "report.pdf",
    }, {
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
            "--single-process",
            "--disable-gpu",
        ],
    });
    return {
        pdf: pdfBuffer.toString("base64"),
    };
};
exports.reportResolvers = {
    Query: {
        report: async (_root, { userAnswerIds, pageSize }, { db, req }) => {
            const userInfo = await db.users.findOne({
                _id: new mongodb_1.ObjectId(req.signedCookies.patient),
            });
            if (!userInfo) {
                throw new Error("User not found");
            }
            return await getPdfReport(userInfo, userAnswerIds, db, pageSize);
        },
        reportForAdmin: async (_root, { userId, userAnswerIds, pageSize }, { db }) => {
            // Use cookie to test if this is an admin.
            const userInfo = await db.users.findOne({
                _id: new mongodb_1.ObjectId(userId),
            });
            if (!userInfo) {
                throw new Error("User not found");
            }
            return await getPdfReport(userInfo, userAnswerIds, db, pageSize);
        },
    },
};
