"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEpdsReport = void 0;
const generateEpdsReport = (result, dateString, formName) => {
    let prompt = "";
    if (typeof result !== "number") {
        throw new Error("Type of result should be number!");
    }
    if (result < 10) {
        prompt = "可能无";
    }
    else if (result >= 10 && result <= 12) {
        prompt = "可能为高危者";
    }
    else if (result >= 13) {
        prompt = "可能为产后抑郁症";
    }
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">${formName}</h2>
        <table
          width="100%"
          style="font-family: 'STSong'; font-size: 14px"
          cellpadding="4"
        >
          <tbody>
            <tr></tr>
            <tr>
              <td width="50%" style="padding-bottom:  0px;">总分：${result}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generateEpdsReport = generateEpdsReport;
