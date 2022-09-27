"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMdqReport = void 0;
const generateMdqReport = (result, dateString, formName) => {
    // // This code is based on some web pdf I found. Since Dr. You provide a correct version
    // // ,this code is deprecated and outdated.
    // let prompt = "可能没有双相障碍";
    // if (typeof result !== "string") {
    //   throw new Error("Type of result should be string!");
    // }
    // const resultObject = JSON.parse(result) as MdqResult;
    // let influence = "";
    // switch (resultObject.mdqInfluence) {
    //   case 0:
    //     influence = "没影响";
    //     break;
    //   case 1:
    //     influence = "轻微影响";
    //     break;
    //   case 2:
    //     influence = "中度影响";
    //     break;
    //   case 3:
    //     influence = "重度影响";
    //     break;
    // }
    // if (
    //   resultObject.mdqTotal >= 7 &&
    //   resultObject.isMdqTwoSituationsHappenAtSameTime &&
    //   resultObject.mdqInfluence >= 2
    // ) {
    //   prompt = "可能有双相障碍";
    // }
    // return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 20px 0 10px 0;">${formName}</h2>
    //     ${dateString}
    //       <table
    //         width="100%"
    //         style="font-family: 'STSong'; font-size: 14px"
    //         cellpadding="4"
    //       >
    //         <tbody>
    //           <tr></tr>
    //           <tr>
    //             <td width="50%" style="padding-bottom: 10px">总分：${
    //               resultObject.mdqTotal
    //             }</td>
    //             <td width="50%">是否有两种情况同时发生过：${
    //               resultObject.isMdqTwoSituationsHappenAtSameTime ? "是" : "否"
    //             }</td>
    //           </tr>
    //           <tr>
    //             <td width="50%">对您的影响：${influence}</td>
    //             <td width="50%">提示：${prompt}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       <hr style="width:80% align:center" />`;
    let prompt = "不考虑双相";
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    if (resultObject.mdqTotal >= 8) {
        prompt = "存在双相I型可能";
    }
    else if (resultObject.mdqTotal >= 5 && resultObject.mdqTotal < 8) {
        prompt = "存在双相II型可能";
    }
    else {
        prompt = "不考虑双相";
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
              <td width="50%" style="padding-bottom:  0px;">总分：${resultObject.mdqTotal}</td>
              <td width="50%">提示：${prompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generateMdqReport = generateMdqReport;
