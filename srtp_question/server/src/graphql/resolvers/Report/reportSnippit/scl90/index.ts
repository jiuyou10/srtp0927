import { Scl90Result } from "../../../UserAnswer/types";

export const generateScl90Report = (
  result: string | number,
  dateString: string
) => {
  if (typeof result !== "string") {
    throw new Error("Type of result should be string!");
  }
  const getPromptText = (itemValue: string) => {
    const itemValueNumber = Number(itemValue);
    if (itemValueNumber >= 5) {
      return "极重度";
    } else if (itemValueNumber >= 4) {
      return "重度";
    } else if (itemValueNumber >= 3) {
      return "中度";
    } else if (itemValueNumber >= 2) {
      return "轻度";
    } else {
      return "无";
    }
  };
  const scl90Result: Scl90Result = JSON.parse(result);
  return `
  <h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">90项症状清单（SCL-90）</h2>
  <table
  width="100%"
  style="font-family: 'STSong'; font-size: 14px"
  cellpadding="4"
>
  <tbody>
    <tr></tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">总分：${
        scl90Result.total
      }</td>
      <td width="20%"></td>
      <td width="30%">总均分：${scl90Result.generalSymptomaticIndex}</td>
      <td width="20%"></td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">阳性项目数：${
        scl90Result.numberOfItemsGreaterThanOrEqualToTwo
      }</td>
      <td width="20%"></td>
      <td width="30%">阴性项目数：${scl90Result.numberOfItemsLessThanTwo}</td>
      <td width="20%"></td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">阳性症状痛苦水平：${
        scl90Result.positiveSymptomDistressLevel
      }</td>
      <td width="20%"></td>
      <td width="30%">阳性症状均分：${scl90Result.positiveSymptomAverage}</td>
      <td width="20%"></td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">F1（躯体化）：${
        scl90Result.f1
      }</td>
      <td width="20%">${getPromptText(scl90Result.f1)}</td>
      <td width="30%">F2（强迫）：${scl90Result.f2}</td>
      <td width="20%">${getPromptText(scl90Result.f2)}</td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">F3（人际关系敏感）：${
        scl90Result.f3
      }</td>
      <td width="20%">${getPromptText(scl90Result.f3)}</td>
      <td width="30%">F4（抑郁）：${scl90Result.f4}</td>
      <td width="20%">${getPromptText(scl90Result.f4)}</td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">F5（焦虑）：${
        scl90Result.f5
      }</td>
      <td width="20%">${getPromptText(scl90Result.f5)}</td>
      <td width="30%">F6（敌对）：${scl90Result.f6}</td>
      <td width="20%">${getPromptText(scl90Result.f6)}</td>
    </tr>
    <tr>
      <td width="30%" style="padding-bottom:  8px;">F7（恐怖）：${
        scl90Result.f7
      }</td>
      <td width="20%">${getPromptText(scl90Result.f7)}</td>
      <td width="30%">F8（偏执）：${scl90Result.f8}</td>
      <td width="20%">${getPromptText(scl90Result.f8)}</td>
    </tr>
    <tr>
      <td width="30%">F9（精神病性）：${scl90Result.f9}</td>
      <td width="20%">${getPromptText(scl90Result.f9)}</td>
      <td width="30%">F10（其他）：${scl90Result.f10}</td>
      <td width="20%">${getPromptText(scl90Result.f10)}</td>
    </tr>
  </tbody>
</table>
<hr style="width:80% align:center" />
    `;
};
