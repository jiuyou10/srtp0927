"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEpqReport = void 0;
const generateEpqReport = (result, dateString) => {
    if (typeof result !== "string") {
        throw new Error("Type of result should be string!");
    }
    const resultObject = JSON.parse(result);
    const getCoordinates = (originX, originY, xValue, yValue, maxXValue = 85, maxYValue = 85, originXValue = 20, originYValue = 20) => {
        const MAX_X = 200;
        // const MAX_Y = 200;
        const distanceValueBetweenXAndOrigin = xValue - originXValue;
        const distanceValueBetweenYAndOrigin = yValue - originYValue;
        const xDistancePercentage = distanceValueBetweenXAndOrigin / (maxXValue - originXValue);
        const yDistancePercentage = distanceValueBetweenYAndOrigin / (maxYValue - originYValue);
        const xDistance = xDistancePercentage * (MAX_X - originX);
        const yDistance = yDistancePercentage * originY;
        return {
            x: originX + xDistance,
            y: originY - yDistance,
        };
    };
    const lowerDashStartCoordinates = getCoordinates(30, 170, 20, 38.5);
    const lowerDashEndCoordinates = getCoordinates(30, 170, 80, 38.5);
    const horizontalLineStartCoordinates = getCoordinates(30, 170, 20, 50);
    const horizontalLineEndCoordinates = getCoordinates(30, 170, 80, 50);
    const topDashStartCoordinates = getCoordinates(30, 170, 20, 61.5);
    const topDashEndCoordinates = getCoordinates(30, 170, 80, 61.5);
    const leftDashStartCoordinates = getCoordinates(30, 170, 38.5, 20);
    const leftDashEndCoordinates = getCoordinates(30, 170, 38.5, 80);
    const verticalLineStartCoordinates = getCoordinates(30, 170, 50, 20);
    const verticalLineEndCoordinates = getCoordinates(30, 170, 50, 80);
    const rightDashStartCoordinates = getCoordinates(30, 170, 61.5, 20);
    const rightDashEndCoordinates = getCoordinates(30, 170, 61.5, 80);
    const MAX_X_VALUE = 125;
    const fullLowerDashStartCoordinates = getCoordinates(30, 170, 0, 38.5, MAX_X_VALUE, 125, 0, 0);
    const fullLowerDashEndCoordinates = getCoordinates(30, 170, 120, 38.5, MAX_X_VALUE, 125, 0, 0);
    const fullMiddleLineStartCoordinates = getCoordinates(30, 170, 0, 50, MAX_X_VALUE, 125, 0, 0);
    const fullMiddleLineEndCoordinates = getCoordinates(30, 170, 120, 50, MAX_X_VALUE, 125, 0, 0);
    const fullTopDashStartCoordinates = getCoordinates(30, 170, 0, 61.5, MAX_X_VALUE, 125, 0, 0);
    const fullTopDashEndCoordinates = getCoordinates(30, 170, 120, 61.5, MAX_X_VALUE, 125, 0, 0);
    const eNCoordinates = getCoordinates(30, 170, Number(resultObject.eTScore), Number(resultObject.nTScore));
    const eCoordinates = getCoordinates(30, 170, (MAX_X_VALUE * 0.8) / 4, Number(resultObject.eTScore), 125, 125, 0, 0);
    const pCoordinates = getCoordinates(30, 170, (MAX_X_VALUE * 0.8) / 2, Number(resultObject.pTScore), 125, 125, 0, 0);
    const nCoordinates = getCoordinates(30, 170, ((MAX_X_VALUE * 0.8) / 4) * 3, Number(resultObject.nTScore), 125, 125, 0, 0);
    const lCoordinates = getCoordinates(30, 170, MAX_X_VALUE * 0.8, Number(resultObject.lTScore), 125, 125, 0, 0);
    const topTextCoordinates = getCoordinates(30, 170, 0, MAX_X_VALUE * 0.98, 125, 125, 0, 0);
    return `<h2 align="center" style="font-family: 'STSong'; font-size: 18px; font-weight: bold; margin: 10px 0 8px 0;">艾森克个性测试（EPQ）</h2>
    <div style="display: flex; justify-content: space-around; break-inside: avoid;">
      <svg height="200" width="200" style="margin-top:  8px; margin-left:  8px; ">
        <line x1="0" y1="170" x2="195" y2="170" style="stroke:black;stroke-width:1" />
        <polygon points="200,170 195,167 195,173" style="fill:black;" />
        <line x1="30" y1="5" x2="30" y2="200" style="stroke:black;stroke-width:1" />
        <polygon points="30,0 27,5 33,5" style="fill:black;" />
        <text x="5" y="180" fill="black" style="font-size: 8px">(20, 20)</text>
        <text 
          x=${lowerDashStartCoordinates.x - 20} 
          y=${lowerDashStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">38.5
        </text>
        <text 
          x=${horizontalLineStartCoordinates.x - 15} 
          y=${horizontalLineStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">50
        </text>
        <text 
          x=${topDashStartCoordinates.x - 20} 
          y=${topDashStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">61.5
        </text>
        <text 
          x=${topDashStartCoordinates.x - 9} 
          y=${topDashStartCoordinates.y - 50} 
          fill="black" 
          style="font-size: 8px">N
        </text>
        <text 
          x=${topDashStartCoordinates.x - 10} 
          y=${topDashStartCoordinates.y - 42} 
          fill="black" 
          style="font-size: 8px">因
        </text>
        <text 
          x=${topDashStartCoordinates.x - 10} 
          y=${topDashStartCoordinates.y - 34} 
          fill="black" 
          style="font-size: 8px">子
        </text>
        <text 
          x=${topDashStartCoordinates.x - 10} 
          y=${topDashStartCoordinates.y - 26} 
          fill="black" 
          style="font-size: 8px">分
        </text>
        <text 
          x=${leftDashStartCoordinates.x - 7} 
          y=${leftDashStartCoordinates.y + 10} 
          fill="black" 
          style="font-size: 8px">38.5
        </text>
        <text 
          x=${verticalLineStartCoordinates.x - 5} 
          y=${verticalLineStartCoordinates.y + 10} 
          fill="black" 
          style="font-size: 8px">50
        </text>
        <text 
          x=${rightDashStartCoordinates.x + 30} 
          y=${rightDashStartCoordinates.y + 10} 
          fill="black" 
          style="font-size: 8px">E因子分
        </text>
        <text 
          x=${rightDashStartCoordinates.x - 7} 
          y=${rightDashStartCoordinates.y + 10} 
          fill="black" 
          style="font-size: 8px">61.5
        </text>
        <text 
          x=${eNCoordinates.x - 7} 
          y=${eNCoordinates.y - 5} 
          fill="black" 
          style="font-size: 10px">(${resultObject.eTScore}, ${resultObject.nTScore})
        </text>
        <g fill="none" stroke="black" stroke-width="1">
          <path stroke-dasharray="5,5" 
            d="M${lowerDashStartCoordinates.x}
              ${lowerDashStartCoordinates.y}
              L${lowerDashEndCoordinates.x}
             ${lowerDashEndCoordinates.y}" />
          <path 
           d="M${horizontalLineStartCoordinates.x}
             ${horizontalLineStartCoordinates.y}
             L${horizontalLineEndCoordinates.x}
            ${horizontalLineEndCoordinates.y}" />
          <path stroke-dasharray="5,5" 
           d="M${topDashStartCoordinates.x}
             ${topDashStartCoordinates.y}
             L${topDashEndCoordinates.x}
            ${topDashEndCoordinates.y}" />
          <path stroke-dasharray="5,5" 
           d="M${leftDashStartCoordinates.x}
             ${leftDashStartCoordinates.y}
             L${leftDashEndCoordinates.x}
            ${leftDashEndCoordinates.y}" />
          <path 
            d="M${verticalLineStartCoordinates.x}
              ${verticalLineStartCoordinates.y}
              L${verticalLineEndCoordinates.x}
             ${verticalLineEndCoordinates.y}" />
          <path stroke-dasharray="5,5" 
             d="M${rightDashStartCoordinates.x}
               ${rightDashStartCoordinates.y}
               L${rightDashEndCoordinates.x}
              ${rightDashEndCoordinates.y}" />
        </g>
        <circle cx=${eNCoordinates.x} cy=${eNCoordinates.y} r="2" fill="black" />
      </svg>
      <svg height="200" width="200" style="margin-top: 10px; margin-left: 10px;">
        <line x1="0" y1="170" x2="195" y2="170" style="stroke:black;stroke-width:1" />
        <polygon points="200,170 195,167 195,173" style="fill:black;" />
        <line x1="30" y1="5" x2="30" y2="200" style="stroke:black;stroke-width:1" />
        <polygon points="30,0 27,5 33,5" style="fill:black;" />
        <g fill="none" stroke="black" stroke-width="1">
          <path stroke-dasharray="5,5" 
            d="M${fullLowerDashStartCoordinates.x}
              ${fullLowerDashStartCoordinates.y}
              L${fullLowerDashEndCoordinates.x}
             ${fullLowerDashEndCoordinates.y}" />
          <path
            d="M${fullMiddleLineStartCoordinates.x}
              ${fullMiddleLineStartCoordinates.y}
              L${fullMiddleLineEndCoordinates.x}
             ${fullMiddleLineEndCoordinates.y}" />
          <path stroke-dasharray="5,5" 
            d="M${fullTopDashStartCoordinates.x}
              ${fullTopDashStartCoordinates.y}
              L${fullTopDashEndCoordinates.x}
             ${fullTopDashEndCoordinates.y}" />
        </g>
        <text x="20" y="180" fill="black" style="font-size: 8px">0</text>
        <text 
          x=${fullLowerDashStartCoordinates.x - 20} 
          y=${fullLowerDashStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">38.5
        </text>
        <text 
          x=${fullMiddleLineStartCoordinates.x - 15} 
          y=${fullMiddleLineStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">50
        </text>
        <text 
          x=${fullTopDashStartCoordinates.x - 20} 
          y=${fullTopDashStartCoordinates.y + 3} 
          fill="black" 
          style="font-size: 8px">61.5
        </text>

        <circle cx=${eCoordinates.x} cy=${eCoordinates.y} r="2" fill="black" />
        <line x1=${eCoordinates.x} y1="170" x2=${eCoordinates.x} y2="165" style="stroke:black;stroke-width:1" />
        <text 
          x=${eCoordinates.x - 2} 
          y=${178} 
          fill="black" 
          style="font-size: 8px">E
        </text>

        <circle cx=${pCoordinates.x} cy=${pCoordinates.y} r="2" fill="black" />
        <line x1=${pCoordinates.x} y1="170" x2=${pCoordinates.x} y2="165" style="stroke:black;stroke-width:1" />
        <text 
          x=${pCoordinates.x - 2} 
          y=${178} 
          fill="black" 
          style="font-size: 8px">P
        </text>

        <circle cx=${nCoordinates.x} cy=${nCoordinates.y} r="2" fill="black" />
        <line x1=${nCoordinates.x} y1="170" x2=${nCoordinates.x} y2="165" style="stroke:black;stroke-width:1" />
        <text 
          x=${nCoordinates.x - 2} 
          y=${178} 
          fill="black" 
          style="font-size: 8px">N
        </text>

        <circle cx=${lCoordinates.x} cy=${lCoordinates.y} r="2" fill="black" />
        <line x1=${lCoordinates.x} y1="170" x2=${lCoordinates.x} y2="165" style="stroke:black;stroke-width:1" />
  <text 
  x=${lCoordinates.x - 2} 
  y=${178} 
  fill="black" 
  style="font-size: 8px">L
</text>

<line x1=${eCoordinates.x} y1=${eCoordinates.y} x2=${pCoordinates.x} y2=${pCoordinates.y} style="stroke:black;stroke-width:1" />
  <line x1=${pCoordinates.x} y1=${pCoordinates.y} x2=${nCoordinates.x} y2=${nCoordinates.y} style="stroke:black;stroke-width:1" />
  <line x1=${nCoordinates.x} y1=${nCoordinates.y} x2=${lCoordinates.x} y2=${lCoordinates.y} style="stroke:black;stroke-width:1" />

  <text 
          x=${eCoordinates.x - 7} 
          y=${eCoordinates.y - 5} 
          fill="black" 
          style="font-size: 10px">${resultObject.eTScore}
        </text>
        <text 
          x=${pCoordinates.x - 7} 
          y=${pCoordinates.y - 5} 
          fill="black" 
          style="font-size: 10px">${resultObject.pTScore}
        </text>
        <text 
          x=${nCoordinates.x - 7} 
          y=${nCoordinates.y - 5} 
          fill="black" 
          style="font-size: 10px">${resultObject.nTScore}
        </text>
        <text 
          x=${lCoordinates.x - 7} 
          y=${lCoordinates.y - 5} 
          fill="black" 
          style="font-size: 10px">${resultObject.lTScore}
        </text>
        <text 
          x=${lCoordinates.x + 15} 
          y=${170 + 10} 
          fill="black" 
          style="font-size: 8px">因子
        </text>
        <text 
          x=${topTextCoordinates.x - 10} 
          y=${topTextCoordinates.y + 10} 
          fill="black" 
          style="font-size: 8px">因
        </text>
        <text 
          x=${topTextCoordinates.x - 10} 
          y=${topTextCoordinates.y + 18} 
          fill="black" 
          style="font-size: 8px">子
        </text>
        <text 
          x=${topTextCoordinates.x - 10} 
          y=${topTextCoordinates.y + 26} 
          fill="black" 
          style="font-size: 8px">分
        </text>
      </svg>
    </div>
    <table
      width="100%"
      style="font-family: 'STSong'; font-size: 14px; margin-top: 6px"
      cellpadding="4"
    >
      <tbody>
        <tr></tr>
        <tr>
          <td width="25%" style="padding-bottom:  0px; text-align: left;">E因子分：${resultObject.eTScore}</td>
          <td width="25%" style="text-align: left;">P因子分：${resultObject.pTScore}</td>
          <td width="25%" style="text-align: left;">N因子分：${resultObject.nTScore}</td>
          <td width="25%" style="text-align: left;">L因子分：${resultObject.lTScore}</td>
        </tr>
      </tbody>
    </table>
    <hr style="width:80% align:center" />`;
};
exports.generateEpqReport = generateEpqReport;
