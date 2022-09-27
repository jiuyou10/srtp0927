"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePhcssReport = void 0;
const generatePhcssReport = (result, dateString, formName, age, gender) => {
    const prompts = [];
    let totalPrompt = "";
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    if (resultObject.userAge !== undefined) {
        age = resultObject.userAge;
    }
    if (resultObject.userGender !== undefined) {
        gender = resultObject.userGender;
    }
    if (age === undefined) {
        throw new Error("Age is unknown!");
    }
    if (gender === undefined) {
        throw new Error("Gender is unknown!");
    }
    if (age >= 13 && age <= 7) {
        throw new Error("Age is not in the range!");
    }
    if (age >= 8 && age <= 12) {
        // Male.
        if (gender === "男") {
            if (resultObject.phcssTotal >= 49) {
                totalPrompt = "可能自我意识水平正常";
            }
            else {
                totalPrompt = "可能自我意识水平偏低";
            }
            if (resultObject.phcss1 >= 11) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss2 >= 9) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss3 >= 6) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss4 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss5 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss6 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
        }
        else {
            // Female.
            if (resultObject.phcssTotal >= 52) {
                totalPrompt = "可能自我意识水平正常";
            }
            else {
                totalPrompt = "可能自我意识水平偏低";
            }
            if (resultObject.phcss1 >= 12) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss2 >= 9) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss3 >= 6) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss4 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss5 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss6 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
        }
    }
    else if (age >= 13 && age <= 16) {
        // Male.
        if (gender === "男") {
            if (resultObject.phcssTotal >= 51) {
                totalPrompt = "可能自我意识水平正常";
            }
            else {
                totalPrompt = "可能自我意识水平偏低";
            }
            if (resultObject.phcss1 >= 11) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss2 >= 9) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss3 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss4 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss5 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss6 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
        }
        else {
            // Female.
            if (resultObject.phcssTotal >= 53) {
                totalPrompt = "可能自我意识水平正常";
            }
            else {
                totalPrompt = "可能自我意识水平偏低";
            }
            if (resultObject.phcss1 >= 12) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss2 >= 9) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss3 >= 6) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss4 >= 8) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss5 >= 9) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
            if (resultObject.phcss6 >= 7) {
                prompts.push("可能正常");
            }
            else {
                prompts.push("可能偏低");
            }
        }
    }
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">${formName}</h2>
        <table
          width="100%"
          style="font-family: 'STSong'; font-size: 14px"
          cellpadding="4"
        >
          <tbody>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">行为：${resultObject.phcss1}</td>
              <td width="50%">提示：${prompts[0]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">智力与学校情况：${resultObject.phcss2}</td>
              <td width="50%">提示：${prompts[1]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">躯体外貌与属性：${resultObject.phcss3}</td>
              <td width="50%">提示：${prompts[2]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">焦虑：${resultObject.phcss4}</td>
              <td width="50%">提示：${prompts[3]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">合群：${resultObject.phcss5}</td>
              <td width="50%">提示：${prompts[4]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  8px;">幸福与满足：${resultObject.phcss6}</td>
              <td width="50%">提示：${prompts[5]}</td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:  0px;">总分：${resultObject.phcssTotal}</td>
              <td width="50%">提示：${totalPrompt}</td>
            </tr>
          </tbody>
        </table>
        <hr style="width:80% align:center" />`;
};
exports.generatePhcssReport = generatePhcssReport;
