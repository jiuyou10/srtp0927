"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePsssReport = void 0;
const generatePsssReport = (result, dateString, formName, gender) => {
    let prompt = "";
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    if (resultObject.userGender) {
        gender = resultObject.userGender;
    }
    if (gender === undefined) {
        throw new Error("Gender is not defined!");
    }
    const total = resultObject.psssTotal;
    if (gender === "男" && total >= 10) {
        prompt = "可能存在心身相关障碍";
    }
    else if (gender === "女" && total >= 11) {
        prompt = "可能存在心身相关障碍";
    }
    else {
        prompt = "可能无";
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
              <td width="50%" style="padding-bottom: 6px">心理（P）因子分数：${resultObject.psssP}</td>
              <td width="50%"> 躯体（S）因子分数：${resultObject.psssS}</td>
            </tr>
            <tr>
              <td width="50%">总分：${resultObject.psssTotal}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generatePsssReport = generatePsssReport;
