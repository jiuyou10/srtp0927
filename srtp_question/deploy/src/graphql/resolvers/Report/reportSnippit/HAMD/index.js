"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHAMDReport = void 0;
const generateHAMDReport = (result, dateString) => {
    let prompt = "";
    if (typeof +result === "number") {
        if (result >= 0 && result < 8) {
            prompt = "无抑郁症状";
        }
        else if (result >= 8 && result < 21) {
            prompt = "可能有抑郁症状";
        }
        else if (result >= 21 && result < 36) {
            prompt = "肯定有抑郁症状";
        }
        else if (result >= 36) {
            prompt = "可能为严重抑郁症状";
        }
        if (prompt === "") {
            throw new Error("Failed to generate prompt");
        }
    }
    else {
        throw new Error("Result is not a number");
    }
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">汉密尔顿抑郁量表（HAMD-24）</h2>
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
exports.generateHAMDReport = generateHAMDReport;
