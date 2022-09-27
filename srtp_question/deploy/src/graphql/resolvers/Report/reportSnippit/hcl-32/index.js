"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHcl32Report = void 0;
const generateHcl32Report = (result, dateString, formName) => {
    let prompt = "";
    if (typeof result === "number") {
        if (result >= 14) {
            prompt = "可能阳性";
        }
        else {
            prompt = "可能阴性";
        }
        if (prompt === "") {
            throw new Error("Failed to generate prompt");
        }
    }
    else {
        throw new Error("Result is not a number");
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
              <td width="50%">总分：${result}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generateHcl32Report = generateHcl32Report;
