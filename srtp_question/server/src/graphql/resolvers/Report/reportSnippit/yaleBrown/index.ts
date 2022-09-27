import { YaleBrownResult } from "../../../UserAnswer/calculateFormAnswer";

export const generateYaleBrownReport = (
  result: number | string,
  dateString: string,
  formName: string
) => {
  let prompt = "";
  if (typeof result !== "string") {
    throw new Error("Type of result should be string!");
  }
  const resultObject = JSON.parse(result) as YaleBrownResult;
  const total = resultObject.yaleBrownTotal;
  if (total < 6) {
    prompt = "可能无";
  } else if (total >= 6 && total <= 15) {
    prompt = "可能轻度";
  } else if (total >= 16 && total <= 25) {
    prompt = "可能中度";
  } else if (total > 25) {
    prompt = "可能重度";
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
              <td width="50%" style="padding-bottom:  8px;">强迫思维部分分数：${resultObject.yaleBrownMind}</td>
              <td width="50%">强迫行为部分分数：${resultObject.yaleBrownBehavior}</td>
            </tr>
            <tr>
              <td width="50%">两部分总分：${resultObject.yaleBrownTotal}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
