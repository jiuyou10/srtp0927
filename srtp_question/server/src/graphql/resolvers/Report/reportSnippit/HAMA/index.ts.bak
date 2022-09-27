export const generatePSS10Report = (
  result: number | string,
  dateString: string
) => {
  let prompt = "";
  
  if (typeof +result === "number") {
    if (result >= 0 && result <= 10) {
      prompt = "可能没有压力";
    } else if (result >= 11 && result <= 20) {
      prompt = "可能轻度压力";
    } else if (result >= 21 && result <= 30) {
      prompt = "可能中度压力";
    } else if (result >= 31 && result <= 40) {
      prompt = "可能严重压力";
    }
    if (prompt === "") {
      throw new Error("Failed to generate prompt");
    }
  } else {
	  `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">压力感受量表（PSS-10）</h2>
        <table
          width="100%"
          style="font-family: 'STSong'; font-size: 14px"
          cellpadding="4"
        >
          <tbody>
            <tr></tr>
            <tr>
              <td width="50%">11总分：${result}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
    //throw new Error("Result is not a number");
  }
  return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">压力感受量表（PSS-10）</h2>
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
