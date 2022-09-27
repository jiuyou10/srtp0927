"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbuReport = void 0;
const generateEmbuReport = (result, dateString, formName) => {
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    const getPrompt = (isFather, componentIndex) => {
        const fatherAverages = [51.54, 15.84, 20.92, 9.82, 8.27, 12.43];
        const motherAverages = [55.71, 36.42, 11.47, 11.13, 9.99];
        if (isFather) {
            if (resultObject.embuFatherComponents[componentIndex] >=
                fatherAverages[componentIndex]) {
                return "可能是";
            }
            else {
                return "可能否";
            }
        }
        else {
            if (resultObject.embuMotherComponents[componentIndex] >=
                motherAverages[componentIndex]) {
                return "可能是";
            }
            else {
                return "可能否";
            }
        }
    };
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">${formName}</h2>
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px"
      cellpadding="4"
    >
      <tbody>
        ${resultObject.embuIsFatherAnswerCompleted
        ? `<tr>
          <td width="50%" style="padding-bottom:  8px;">父亲 因子I（情感温暖、理解）：${resultObject.embuFatherComponents[0]}</td>
          <td width="50%">提示：${getPrompt(true, 0)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom:  8px;"><span style="visibility: hidden">父亲</span>&nbsp;因子II（惩罚、严厉）：${resultObject.embuFatherComponents[1]}</td>
          <td width="50%">提示：${getPrompt(true, 1)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom:  8px;"><span style="visibility: hidden">父亲</span>&nbsp;因子III（过分干涉）：${resultObject.embuFatherComponents[2]}</td>
          <td width="50%">提示：${getPrompt(true, 2)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom:  8px;"><span style="visibility: hidden">父亲</span>&nbsp;因子IV（偏爱被试）：${resultObject.embuFatherComponents[3]}</td>
          <td width="50%">提示：${getPrompt(true, 3)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom:  8px;"><span style="visibility: hidden">父亲</span>&nbsp;因子V（拒绝、否认）：${resultObject.embuFatherComponents[4]}</td>
          <td width="50%">提示：${getPrompt(true, 4)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom:  ${resultObject.embuIsMotherAnswerCompleted ? "8px;" : "0px;"};"><span style="visibility: hidden">父亲</span>&nbsp;因子VI（过度保护）：${resultObject.embuFatherComponents[5]}</td>
          <td width="50%">提示：${getPrompt(true, 5)}</td>
        </tr>`
        : ""}
        ${resultObject.embuIsMotherAnswerCompleted
        ? `<tr>
          <td width="50%" style="padding-bottom: 8px;">母亲 因子I（情感温暖、理解）：${resultObject.embuMotherComponents[0]}</td>
          <td width="50%">提示：${getPrompt(false, 0)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom: 8px;"><span style="visibility: hidden">母亲</span>&nbsp;因子II（过干涉、过保护）：${resultObject.embuMotherComponents[1]}</td>
          <td width="50%">提示：${getPrompt(false, 1)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom: 8px;"><span style="visibility: hidden">母亲</span>&nbsp;因子III（拒绝、否认）：${resultObject.embuMotherComponents[2]}</td>
          <td width="50%">提示：${getPrompt(false, 2)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom: 8px;"><span style="visibility: hidden">母亲</span>&nbsp;因子IV（惩罚、严厉）：${resultObject.embuMotherComponents[3]}</td>
          <td width="50%">提示：${getPrompt(false, 3)}</td>
        </tr>
        <tr>
          <td width="50%" style="padding-bottom: 0px;"><span style="visibility: hidden">母亲</span>&nbsp;因子V（偏爱被试）：${resultObject.embuMotherComponents[4]}</td>
          <td width="50%">提示：${getPrompt(false, 4)}</td>
        </tr>`
        : ""}
      </tbody>
    </table>
    <hr style="width:80% align:center" />`;
};
exports.generateEmbuReport = generateEmbuReport;
