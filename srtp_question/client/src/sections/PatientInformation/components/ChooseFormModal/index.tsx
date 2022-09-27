/**
 * @author Qiuran Hu
 * @email qiuranh@gmail.com
 * @create date 2021-04-26 10:49:44
 * @modify date 2021-04-26 10:49:44
 * @desc [description]
 */
import {
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { QueryUser_queryUser_users_finishedForms as QuestionnaireData } from "../../../../lib/graphql/queries/QueryUser/__generated__/QueryUser";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  finishedFormList: QuestionnaireData[];
  selectedUserAnswerIds: string[];
  setSelectedUserAnswerIds: (selectedUserAnswerIds: string[]) => void;
  onOkButtonClick: (pageSize: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formName: {
      maxWidth: 300,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    pageSizeSelect: {
      minWidth: 100,
      marginRight: 10,
    },
  })
);

export const ChooseFormModal = ({
  isOpen,
  closeModal,
  finishedFormList,
  selectedUserAnswerIds,
  setSelectedUserAnswerIds,
  onOkButtonClick,
}: Props) => {
  const classes = useStyles();
  const handleSelectAllCheckBoxClick = () => {
    if (selectedUserAnswerIds.length < finishedFormList.length) {
      setSelectedUserAnswerIds(
        finishedFormList
          .map((form) => form.userAnswerId)
          .filter(
            (userAnswerId): userAnswerId is string => userAnswerId !== null
          )
      );
    } else {
      setSelectedUserAnswerIds([]);
    }
  };
  const handleSelectCheckBoxClick = (formId: string) => {
    if (selectedUserAnswerIds.indexOf(formId) !== -1) {
      setSelectedUserAnswerIds(
        selectedUserAnswerIds.filter(
          (currentUserAnswerId) => currentUserAnswerId !== formId
        )
      );
    } else {
      setSelectedUserAnswerIds([...selectedUserAnswerIds, formId]);
    }
  };
  const handleOkButtonClick = () => {
    onOkButtonClick(pageSize);
    closeModal();
  };
  const [pageSize, setPageSize] = useState("a5");
  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPageSize(event.target.value as string);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">请选择要生成报告的量表</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table size="small" aira-label="选择量表，生成报告">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedUserAnswerIds.length ===
                        finishedFormList.length &&
                      selectedUserAnswerIds.length !== 0
                    }
                    onChange={handleSelectAllCheckBoxClick}
                  />
                </TableCell>
                <TableCell>全部已完成量表</TableCell>
                <TableCell>完成时间</TableCell>
                <TableCell>医生</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finishedFormList.map((form, index) => (
                <TableRow key={`questionnaire-${index}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        !!form.userAnswerId &&
                        selectedUserAnswerIds.indexOf(form.userAnswerId) !== -1
                      }
                      onChange={() =>
                        form.userAnswerId &&
                        handleSelectCheckBoxClick(form.userAnswerId)
                      }
                    />
                  </TableCell>
                  <TableCell className={classes.formName}>
                    {form.name}
                  </TableCell>
                  <TableCell>{form.displayedFillInDate || null}</TableCell>
                  <TableCell>{form.doctorName || null}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <FormControl
          className={classes.pageSizeSelect}
          variant="outlined"
          size="small"
        >
          <InputLabel id="page-size-label">纸张大小</InputLabel>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            labelId="page-size-label"
            label="纸张大小"
            id="page-size-select"
          >
            <MenuItem value={"a4"}>A4</MenuItem>
            <MenuItem value={"a5"}>A5</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={closeModal}>取消</Button>
        <Button
          onClick={handleOkButtonClick}
          color="primary"
          autoFocus
          disabled={selectedUserAnswerIds.length === 0}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};
