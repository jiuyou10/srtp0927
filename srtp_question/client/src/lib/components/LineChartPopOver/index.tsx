import {
  Button,
  // createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  // makeStyles,
  // Theme,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {
  EysenckFormResult,
  MdqResult,
  PsqiResult,
  PsssResult,
  YamlBrownResult,
  PhcssResult,
  EmbuResult,
} from "./type";
import { ChartDataSets } from "chart.js";
import {
  EMBU_FORM_KEY,
  EYSCENCK_CHILDREN_FORM_NAME,
  EYSCENCK_FORM_NAME,
  MDQ_FORM_KEY,
  PHCSS_FORM_KEY,
  PSQI_FORM_KEY,
  PSSS_FORM_KEY,
  SCL_90_NAME,
  YAML_BROWN_FORM_KEY,
} from "../../utils/constants";
import { FormResult } from "../../../sections";
import { LineChart } from "..";

// const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  formResultList: FormResult[];
  formName: string;
  formKey: string;
}

const HIDE_LABEL_FORMS = [EYSCENCK_FORM_NAME, EYSCENCK_CHILDREN_FORM_NAME];
const HIDE_LABEL_KEYS: string[] = [EMBU_FORM_KEY];

export const LineChartPopOver = (props: Props) => {
  const { formResultList, formName, formKey } = props;
  const fillInDateList = useMemo(
    () => formResultList.map((formResult) => formResult.fillInDate),
    [formResultList]
  );
  const resultList = useMemo(() => {
    if (formName === SCL_90_NAME) {
      return formResultList.map((formResult) =>
        Number(JSON.parse(formResult.result).total)
      );
    }
    return formResultList.map((formResult) => Number(formResult.result));
  }, [formResultList, formName]);
  const multipleDataList: undefined | ChartDataSets[] = useMemo(() => {
    if (
      formName === EYSCENCK_FORM_NAME ||
      formName === EYSCENCK_CHILDREN_FORM_NAME
    ) {
      const eArray = formResultList.map((formResult) => {
        const resultObject: EysenckFormResult = JSON.parse(formResult.result);
        return Number(resultObject.eTScore);
      });
      const pArray = formResultList.map((formResult) => {
        const resultObject: EysenckFormResult = JSON.parse(formResult.result);
        return Number(resultObject.pTScore);
      });
      const nArray = formResultList.map((formResult) => {
        const resultObject: EysenckFormResult = JSON.parse(formResult.result);
        return Number(resultObject.nTScore);
      });
      const lArray = formResultList.map((formResult) => {
        const resultObject: EysenckFormResult = JSON.parse(formResult.result);
        return Number(resultObject.lTScore);
      });
      return [
        {
          label: "E量表得分",
          data: eArray,
          borderColor: "#0d47a1",
          backgroundColor: "#0d47a1",
          lineTension: 0,
          fill: false,
        },
        {
          label: "P量表得分",
          data: pArray,
          borderColor: "#4caf50",
          backgroundColor: "#4caf50",
          fill: false,
          lineTension: 0,
        },
        {
          label: "N量表得分",
          data: nArray,
          borderColor: "#ffeb3b",
          backgroundColor: "#ffeb3b",
          fill: false,
          lineTension: 0,
        },
        {
          label: "L量表得分",
          data: lArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
      ];
    } else if (formKey === YAML_BROWN_FORM_KEY) {
      const mindArray = formResultList.map((formResult) => {
        const resultObject: YamlBrownResult = JSON.parse(formResult.result);
        return resultObject.yaleBrownMind;
      });
      const behaviorArray = formResultList.map((formResult) => {
        const resultObject: YamlBrownResult = JSON.parse(formResult.result);
        return resultObject.yaleBrownBehavior;
      });
      const totalArray = formResultList.map((formResult) => {
        const resultObject: YamlBrownResult = JSON.parse(formResult.result);
        return resultObject.yaleBrownTotal;
      });
      return [
        {
          label: "强迫思维部分分数",
          data: mindArray,
          borderColor: "#0d47a1",
          backgroundColor: "#0d47a1",
          lineTension: 0,
          fill: false,
        },
        {
          label: "强迫行为部分分数",
          data: behaviorArray,
          borderColor: "#4caf50",
          backgroundColor: "#4caf50",
          fill: false,
          lineTension: 0,
        },
        {
          label: "两部分总分",
          data: totalArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
      ];
    } else if (formKey === PSSS_FORM_KEY) {
      const pArray = formResultList.map((formResult) => {
        const resultObject: PsssResult = JSON.parse(formResult.result);
        return resultObject.psssP;
      });
      const sArray = formResultList.map((formResult) => {
        const resultObject: PsssResult = JSON.parse(formResult.result);
        return resultObject.psssS;
      });
      const totalArray = formResultList.map((formResult) => {
        const resultObject: PsssResult = JSON.parse(formResult.result);
        return resultObject.psssTotal;
      });
      return [
        {
          label: "心理（P）因子分数",
          data: pArray,
          borderColor: "#0d47a1",
          backgroundColor: "#0d47a1",
          lineTension: 0,
          fill: false,
        },
        {
          label: "躯体（S）因子分数",
          data: sArray,
          borderColor: "#4caf50",
          backgroundColor: "#4caf50",
          fill: false,
          lineTension: 0,
        },
        {
          label: "总分",
          data: totalArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
      ];
    } else if (formKey === MDQ_FORM_KEY) {
      const totalArray = formResultList.map((formResult) => {
        const resultObject: MdqResult = JSON.parse(formResult.result);
        return resultObject.mdqTotal;
      });
      return [
        {
          label: "总分",
          data: totalArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
      ];
    } else if (formKey === PSQI_FORM_KEY) {
      const totalArray = formResultList.map((formResult) => {
        const resultObject: PsqiResult = JSON.parse(formResult.result);
        return resultObject.psqiTotal;
      });
      // const aArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiA;
      // });
      // const bArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiB;
      // });
      // const cArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiC;
      // });
      // const dArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiD;
      // });
      // const eArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiE;
      // });
      // const fArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiF;
      // });
      // const gArray = formResultList.map((formResult) => {
      //   const resultObject: PsqiResult = JSON.parse(formResult.result);
      //   return resultObject.psqiG;
      // });
      return [
        {
          label: "总分",
          data: totalArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
        // {
        //   label: "因子A（主观睡眠质量）",
        //   data: aArray,
        //   borderColor: "#ffeb3b",
        //   backgroundColor: "#ffeb3b",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子B（睡眠潜伏期）",
        //   data: bArray,
        //   borderColor: "#4caf50",
        //   backgroundColor: "#4caf50",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子C（睡眠持续性）",
        //   data: cArray,
        //   borderColor: "#0d47a1",
        //   backgroundColor: "#0d47a1",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子D（习惯性睡眠效率）",
        //   data: dArray,
        //   borderColor: "#9E9E9E",
        //   backgroundColor: "#9E9E9E",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子E（睡眠紊乱",
        //   data: eArray,
        //   borderColor: "#FF5722",
        //   backgroundColor: "#FF5722",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子F（使用睡眠药物）",
        //   data: fArray,
        //   borderColor: "#26A69A",
        //   backgroundColor: "#26A69A",
        //   fill: false,
        //   lineTension: 0,
        // },
        // {
        //   label: "因子G（白天功能紊乱）",
        //   data: gArray,
        //   borderColor: "#4DD0E1",
        //   backgroundColor: "#4DD0E1",
        //   fill: false,
        //   lineTension: 0,
        // },
      ];
    } else if (formKey === PHCSS_FORM_KEY) {
      const totalArray = formResultList.map((formResult) => {
        const resultObject: PhcssResult = JSON.parse(formResult.result);
        return resultObject.phcssTotal;
      });
      return [
        {
          label: "总分",
          data: totalArray,
          borderColor: "#d32f2f",
          backgroundColor: "#d32f2f",
          fill: false,
          lineTension: 0,
        },
      ];
    } else if (formKey === EMBU_FORM_KEY) {
      const listToReturn = [];

      // const fatherLabels = [
      //   "父亲 因子I（情感温暖、理解）",
      //   "父亲 因子II（惩罚、严厉）",
      //   "父亲 因子III（过分干涉）",
      //   "父亲 因子IV（偏爱被试）",
      //   "父亲 因子V（拒绝、否认）",
      //   "父亲 因子VI（过度保护）",
      // ];
      const fatherLabels = [
        "父亲 因子I",
        "父亲 因子II",
        "父亲 因子III",
        "父亲 因子IV",
        "父亲 因子V",
        "父亲 因子VI",
      ];
      const fatherColors = [
        "#B71C1C",
        "#880E4F",
        "#4A148C",
        "#757575",
        "#FF8F00",
        "#0D47A1",
      ];
      const fatherFactorsData = formResultList.map((formResult) => {
        const resultObject: EmbuResult = JSON.parse(formResult.result);
        if (resultObject.embuIsFatherAnswerCompleted)
          return resultObject.embuFatherComponents;
        else return [];
      });

      for (let i = 0; i < fatherLabels.length; i++) {
        listToReturn.push({
          label: fatherLabels[i],
          data: fatherFactorsData.map((data) => data[i]),
          backgroundColor: fatherColors[i],
          borderColor: fatherColors[i],
          fill: false,
          lineTension: 0,
        });
      }
      // const motherLabel = [
      //   "母亲 因子I（情感温暖、理解）",
      //   "母亲 因子II（过干涉、过保护）",
      //   "母亲 因子III（拒绝、否认）",
      //   "母亲 因子IV（惩罚、严厉）",
      //   "母亲 因子V（偏爱被试）",
      // ];
      const motherLabel = [
        "母亲 因子I",
        "母亲 因子II",
        "母亲 因子III",
        "母亲 因子IV",
        "母亲 因子V",
      ];
      const motherColors = [
        "#B3E5FC",
        "#B2EBF2",
        "#B2DFDB",
        "#C8E6C9",
        "#FFCC80",
      ];
      const motherFactorsData = formResultList.map((formResult) => {
        const resultObject: EmbuResult = JSON.parse(formResult.result);
        if (resultObject.embuIsMotherAnswerCompleted)
          return resultObject.embuMotherComponents;
        else return [];
      });

      for (let i = 0; i < motherLabel.length; i++) {
        listToReturn.push({
          label: motherLabel[i],
          data: motherFactorsData.map((data) => data[i]),
          backgroundColor: motherColors[i],
          borderColor: motherColors[i],
          fill: false,
          lineTension: 0,
        });
      }
      return listToReturn;
    }
    return undefined;
  }, [formKey, formName, formResultList]);
  let showLabel = true;
  if (
    HIDE_LABEL_FORMS.includes(formName) ||
    HIDE_LABEL_KEYS.includes(formKey)
  ) {
    showLabel = false;
  }
  // const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  return (
    <div>
      <div>
        <Button
          startIcon={<EqualizerIcon />}
          size="small"
          color="primary"
          disabled={formResultList.length <= 1}
          onClick={openDialog}
        >
          趋势
        </Button>
      </div>
      <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
        <DialogTitle>{formName}分数趋势</DialogTitle>
        <DialogContent>
          <LineChart
            labelList={fillInDateList}
            dataList={resultList}
            multipleDataList={multipleDataList}
            showLabel={showLabel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
