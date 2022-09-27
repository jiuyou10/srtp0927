import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { QueryUser_queryUser_users_finishedForms as FinishedForms } from "../../../../lib/graphql/queries/QueryUser/__generated__/QueryUser";
import { FormResult } from "../../..";
import { LineChartPopOver } from "../../../../lib/components";

interface Props {
  finishedForms: FinishedForms[] | null;
}

export const LineChartsButton = ({ finishedForms }: Props) => {
  const isButtonDisabled =
    finishedForms === null || finishedForms.length === 0 ? true : false;
  const listData: {
    uniqueFormList: FinishedForms[];
    resultList: FormResult[][];
  } = useMemo(() => {
    if (!finishedForms)
      return { uniqueFormList: [], resultList: [] as FormResult[][] };
    const formList: FinishedForms[] = [];
    const resultList: FormResult[][] = [];
    const formSet: Set<string> = new Set();
    finishedForms.forEach((questionnaire) => {
      if (!formSet.has(questionnaire.id)) {
        formSet.add(questionnaire.id);
        formList.push(questionnaire);
        if (questionnaire.result && questionnaire.displayedFillInDate) {
          resultList.push([
            {
              result: questionnaire.result,
              fillInDate: questionnaire.displayedFillInDate,
            },
          ]);
        } else {
          resultList.push([] as FormResult[]);
        }
      } else if (questionnaire.result && questionnaire.displayedFillInDate) {
        let index = 0;
        while (index <= formList.length) {
          if (formList[index].id === questionnaire.id) {
            resultList[index].push({
              result: questionnaire.result,
              fillInDate: questionnaire.displayedFillInDate,
            });
            break;
          }
          index += 1;
        }
      }
    });
    const newResultList = resultList.map((result) => [...result].reverse());
    return { uniqueFormList: formList, resultList: newResultList };
  }, [finishedForms]);
  const { uniqueFormList, resultList } = listData;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        startIcon={<EqualizerIcon />}
        color="primary"
        disabled={isButtonDisabled}
        onClick={openModal}
        size="small"
      >
        趋势
      </Button>
      <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>查看趋势</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>量表</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueFormList.map((form, index) => (
                  <TableRow key={`questionnaire-${index}`}>
                    <TableCell>{form.name}</TableCell>
                    <TableCell>
                      <LineChartPopOver
                        formResultList={resultList[index]}
                        formName={form.name}
                        formKey={form.key}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
