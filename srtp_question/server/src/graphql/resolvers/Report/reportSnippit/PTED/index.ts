export const generatePTEDReport = (
  result: number | string,
  dateString: string
) => {
  let prompt = "";
  if (typeof +result === "number") {
    if (result >= 33) {
      prompt = "是PTED";
    } else {
      prompt = "不是PTED";
    }
    if (prompt === "") {
      throw new Error("Failed to generate prompt");
    }
  } else {
    throw new Error("Result is not a number");
  }
  return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">创伤后愤懑21-自评量表</h2>
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
