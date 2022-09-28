export function generateMADRSReport(
    result:number|string,
    dateString:string
){
    let prompt="";
    if(typeof +result === "number"){
        console.log("是数字"+result)
        if(result >= 0 &&result < 12)
        {
            prompt="缓解期";
        }else if(result >= 12 && result < 22){
            prompt="轻度";

        }else if(result >= 22 && result < 30){
            prompt="中度";
        }else if(result >= 30 && result < 35){
            prompt="重度";
        }else if(result >= 35)
        {
            prompt="极重度";
        }
        if(prompt===""){
            throw new Error("Failed to generate prompt");
        }
    }
    else{
        console.log("不是数字"+result)
        throw new Error("Result is not a number");
    }
    return `
    <p style="font-family: STSong; font-size: 18px; margin-top: 10px; margin-bottom: 10px;" align="center">
    蒙哥马利抑郁评定量表(MADRS）
    </p>
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

