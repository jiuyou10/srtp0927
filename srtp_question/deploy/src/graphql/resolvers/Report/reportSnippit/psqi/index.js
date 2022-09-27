"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePsqiReport = void 0;
const generatePsqiReport = (result, dateString, formName) => {
    let prompt = "";
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    const total = resultObject.psqiTotal;
    if (total < 6) {
        // 0 - 5
        prompt = "可能睡眠质量很好";
    }
    else if (total >= 6 && total <= 10) {
        // 6 - 10
        prompt = "可能睡眠质量还行";
    }
    else if (total >= 11 && total <= 15) {
        // 11 - 15
        prompt = "可能睡眠质量一般";
    }
    else if (total > 15) {
        // 16 - 21
        prompt = "可能睡眠质量很差";
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
              <td width="50%" style="padding-bottom:  8px;">因子A（主观睡眠质量）：${resultObject.psqiA}</td>
              <td width="50%">因子B（睡眠潜伏期）：${resultObject.psqiB}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">因子C（睡眠持续性）：${resultObject.psqiC}</td>
              <td width="50%">因子D（习惯性睡眠效率）：${resultObject.psqiD}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">因子E（睡眠紊乱）：${resultObject.psqiE}</td>
              <td width="50%">因子F（使用睡眠药物）：${resultObject.psqiF}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">因子G（白天功能紊乱）：${resultObject.psqiG}</td>
              <td width="50%">总分：${resultObject.psqiTotal}</td>
            </tr>
            <tr>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generatePsqiReport = generatePsqiReport;
