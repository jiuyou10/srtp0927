"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHAMAReport = void 0;
const generateHAMAReport = (result, dateString) => {
    let prompt = "";
    if (typeof +result === "number") {
        if (result >= 0 && result < 7) {
            prompt = "没有焦虑症状";
        }
        else if (result >= 7 && result < 14) {
            prompt = "可能有焦虑";
        }
        else if (result >= 14 && result < 21) {
            prompt = "肯定有焦虑";
        }
        else if (result >= 21 && result < 29) {
            prompt = "肯定有焦虑";
        }
        else if (result >= 29) {
            prompt = "可能为严重焦虑";
        }
        if (prompt === "") {
            throw new Error("Failed to generate prompt");
        }
    }
    else {
        throw new Error("Result is not a number");
    }
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">汉密尔顿焦虑量表（HAMA）</h2>
        <table
          width="100%"
          style="font-family: 'STSong'; font-size: 14px"
          cellpadding="4"
        >
          <tbody>
            <tr></tr>
            <tr>
              <td width="50%">总分：${result}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generateHAMAReport = generateHAMAReport;
