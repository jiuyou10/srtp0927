export function generatePhq9Report(
  result: number | string,
  dateString: string
) {
  let prompt = "";
  if (typeof result === "number") {
    if (result >= 0 && result <= 4) {
      prompt = "可能没有抑郁";
    } else if (result >= 5 && result <= 9) {
      prompt = "可能轻度抑郁";
    } else if (result >= 10 && result <= 14) {
      prompt = "可能中度抑郁";
    } else if (result >= 15 && result <= 19) {
      prompt = "可能中重度抑郁";
    } else if (result >= 20 && result <= 27) {
      prompt = "可能重度抑郁";
    }
    if (prompt === "") {
      throw new Error("Failed to generate prompt");
    }
  } else {
    throw new Error("Result is not a number");
  }
  return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">抑郁自评量表（PHQ-9）</h2>
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
}
