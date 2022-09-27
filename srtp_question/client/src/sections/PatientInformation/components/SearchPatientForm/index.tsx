import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Checkbox,
  Chip,
  createStyles,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import "moment/locale/zh-cn";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SearchIcon from "@material-ui/icons/Search";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import cnLocale from "date-fns/locale/zh-CN";
import { ErrorIndicator } from "../../../../lib/components";
import { QueryUserVariables } from "../../../../lib/graphql/queries/QueryUser/__generated__/QueryUser";
import { UsersFilter } from "../../../../lib/graphql/globalTypes";
import { INITAL_ONLY_MY_PATIENT } from "../..";
import TuneIcon from "@material-ui/icons/Tune";
import {
  AdditionalFieldsModal,
  ADDITIONAL_FIELD_KEYS,
  ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES,
  removeElementFromArray,
} from "../AdditionalFieldsModal";
import InfoIcon from "@material-ui/icons/Info";
import { PRIMARY_COLOR } from "../../../..";

const AGE_RANGE_ERROR_MESSAGE_TEXT = "最小年龄应小于最大年龄！";
const AGE_NEGATIVE_ERROR_MESSAGE = "年龄不能为负数！";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    promptText: {
      color: "#5f6368",
      fontSize: "0.8em",
      paddingBottom: 5,
      paddingTop: 5,
    },
    input: {
      width: "30%",
      paddingRight: 10,
      paddingBottom: 5,
    },
    rangeWrapper: {
      display: "inline-block",
    },
    ageRangeInput: {
      width: "40%",
    },
    dateRangeWrapper: {
      width: "60%",
    },
    ageRangeWrapper: {
      width: "30%",
      paddingRight: 10,
    },
    dateRangeInput: {
      width: "50%",
      paddingRight: 10,
    },
    ageInputIconWrapper: {
      width: "20%",
      display: "inline-flex",
      justifyContent: "center",
      paddingTop: 20,
    },
    buttonWrapper: {
      paddingTop: 10,
    },
    extraFieldsWrapper: {
      paddingTop: 10,
    },
    searchButton: {
      marginRight: 10,
    },
    whiteButton: {
      backgroundColor: "#fff",
      color: PRIMARY_COLOR,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    rangeFormWrapper: {
      width: "100%",
      alignItems: "flex-start",
      display: "flex",
    },
    ageInputIcon: {
      width: 16,
      height: 16,
      color: "rgba(0, 0, 0, 0.54)",
    },
    chip: {
      marginRight: 5,
    },
    additionalFieldButton: {
      marginRight: 5,
    },
  })
);

const datePickerProps = {
  format: "yyyy/MM/dd",
  okLabel: "确定",
  cancelLabel: "取消",
  invalidLabel: "输入的日期有误！",
  maxDateMessage: "输入的日期太大！",
  minDateMessage: "输入的日期太小！",
  invalidDateMessage: "输入的日期有误！",
  size: "small" as const,
};

interface Props {
  searchPatients: (searchParams: QueryUserVariables) => void;
  limit: number;
  currentPageIndex: number;
  setCurrentPageIndex: (currentPageIndex: number) => void;
  filter: UsersFilter;
  searchMyPatients: (onlyMyPatient: boolean) => void;
  handleAdditionalFieldsSearch: (additionalFields: string[]) => void;
}

export interface SearchPatientFormHandle {
  search: () => void;
}

export const SearchPatientForm = forwardRef<SearchPatientFormHandle, Props>(
  (
    {
      searchPatients,
      limit,
      currentPageIndex,
      setCurrentPageIndex,
      filter,
      searchMyPatients,
      handleAdditionalFieldsSearch,
    },
    ref
  ) => {
    const classes = useStyles();
    const [userName, setUserName] = useState("");
    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(e.target.value);
    };

    const [name, setName] = useState("");
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const [gender, setGender] = useState<"男" | "女" | "全部" | "">("");
    const onGenderChange = (
      e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      setGender(e.target.value as typeof gender);
    };

    const [ageRange, setAgeRange] = useState({
      min: "",
      max: "",
    });
    const onMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMinAge = Number(e.target.value);
      if (errorField === "ageRange") {
        if (newMinAge <= Number(ageRange.max) || newMinAge === 0) {
          setErrorField(null);
        }
      }
      if (errorField === "minAge") {
        if (newMinAge >= 0) {
          setErrorField(null);
        }
      }
      setAgeRange({ ...ageRange, min: e.target.value });
    };
    const onMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMaxAge = Number(e.target.value);
      if (errorField === "ageRange") {
        if (newMaxAge >= Number(ageRange.min) || newMaxAge === 0) {
          setErrorField(null);
        }
      }
      if (errorField === "maxAge") {
        if (newMaxAge >= 0) {
          setErrorField(null);
        }
      }
      setAgeRange({ ...ageRange, max: e.target.value });
    };

    const [dateRange, setDateRange] = useState<{
      min: Date | null;
      max: Date | null;
    }>({
      min: null,
      max: null,
    });
    const onMinDateChange = (date: Date | null, _value?: string | null) => {
      if (errorField === "dateRange") {
        if (date === null || (dateRange.max && +date <= +dateRange.max)) {
          setErrorField(null);
        }
      }
      setDateRange({
        ...dateRange,
        min: date,
      });
    };
    const onMaxDateChange = (date: Date | null, _value?: string | null) => {
      if (errorField === "dateRange") {
        if (date === null || (dateRange.min && +date >= +dateRange.min)) {
          setErrorField(null);
        }
      }
      setDateRange({
        ...dateRange,
        max: date,
      });
    };

    const [onlyMyPatient, setOnlyMyPatient] = useState(false);
    const handleOnlyMyPatientCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setOnlyMyPatient(event.target.checked);
      searchMyPatients(event.target.checked);
    };

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorField, setErrorField] = useState<null | string>(null);
    const [isAdditionalFieldsModalOpen, setIsAdditionalFieldsModalOpen] =
      useState(false);
    const [additionalFields, setAdditionalFields] = useState<string[]>([]);

    const handleAdditionalFieldsModalClose = () => {
      setIsAdditionalFieldsModalOpen(false);
    };

    const handleAdditionalFieldsModalOpen = () => {
      setIsAdditionalFieldsModalOpen(true);
    };

    const handleSearchButtonClick = () => {
      if (ageRange.min && Number(ageRange.min) < 0) {
        setErrorMessage(AGE_NEGATIVE_ERROR_MESSAGE);
        setShowError(true);
        setErrorField("minAge");
        return;
      }
      if (ageRange.max && Number(ageRange.max) < 0) {
        setErrorMessage(AGE_NEGATIVE_ERROR_MESSAGE);
        setShowError(true);
        setErrorField("maxAge");
        return;
      }
      if (
        ageRange.min &&
        ageRange.max &&
        Number(ageRange.min) > Number(ageRange.max)
      ) {
        setErrorMessage(AGE_RANGE_ERROR_MESSAGE_TEXT);
        setShowError(true);
        setErrorField("ageRange");
        return;
      }

      if (dateRange.min && dateRange.max && dateRange.min > dateRange.max) {
        setErrorMessage("起始日期应在截止日期之前！");
        setShowError(true);
        setErrorField("dateRange");
        return;
      }

      setCurrentPageIndex(0);
      searchPatients({
        userName,
        name,
        gender,
        ageRange: {
          min: ageRange.min ? Number(ageRange.min) : null,
          max: ageRange.max ? Number(ageRange.max) : null,
        },
        minSignUpDate: dateRange.min
          ? {
              year: dateRange.min.getFullYear(),
              month: dateRange.min.getMonth(),
              day: dateRange.min.getDate(),
            }
          : null,
        maxSignUpDate: dateRange.max
          ? {
              year: dateRange.max.getFullYear(),
              month: dateRange.max.getMonth(),
              day: dateRange.max.getDate(),
            }
          : null,
        limit,
        currentPageIndex: 0,
        onlyMyPatient,
        filter,
        additionalFields,
      });
    };

    useImperativeHandle(ref, () => ({
      search: () => {
        handleSearchButtonClick();
      },
    }));
    const handleResetButtonClick = () => {
      setUserName("");
      setName("");
      setGender("");
      setAgeRange({
        min: "",
        max: "",
      });
      setDateRange({
        min: null,
        max: null,
      });
      setErrorField(null);
      setCurrentPageIndex(0);
      setOnlyMyPatient(INITAL_ONLY_MY_PATIENT);
      searchPatients({
        limit,
        currentPageIndex: 0,
        filter,
        onlyMyPatient: INITAL_ONLY_MY_PATIENT,
      });
      setAdditionalFields([]);
    };
    return (
      <form noValidate autoComplete="off">
        <div className={classes.promptText}>个人信息</div>
        <div>
          <TextField
            label="门诊号"
            size="small"
            className={classes.input}
            value={userName}
            onChange={onUserNameChange}
          />
          <TextField
            label="姓名"
            size="small"
            className={classes.input}
            value={name}
            onChange={onNameChange}
          />
          <FormControl className={classes.input} size="small">
            <InputLabel>性别</InputLabel>
            <Select
              color="primary"
              label="性别"
              value={gender}
              onChange={onGenderChange}
            >
              <MenuItem value="男">男</MenuItem>
              <MenuItem value="女">女</MenuItem>
              <MenuItem value="全部">全部</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.rangeFormWrapper}>
            <div
              className={classes.ageRangeWrapper + " " + classes.rangeWrapper}
            >
              <div className={classes.promptText}>年龄</div>
              <div>
                <TextField
                  label="最小年龄"
                  size="small"
                  type="number"
                  className={classes.ageRangeInput}
                  value={ageRange.min}
                  onChange={onMinAgeChange}
                  error={
                    errorField === "ageRange" || errorField === "minAge"
                      ? true
                      : undefined
                  }
                />
                <span className={classes.ageInputIconWrapper}>
                  <ArrowForwardIcon className={classes.ageInputIcon} />
                </span>
                <TextField
                  label="最大年龄"
                  size="small"
                  type="number"
                  className={classes.ageRangeInput}
                  value={ageRange.max}
                  onChange={onMaxAgeChange}
                  error={
                    errorField === "ageRange" || errorField === "maxAge"
                      ? true
                      : undefined
                  }
                />
              </div>
            </div>
            <div
              className={classes.dateRangeWrapper + " " + classes.rangeWrapper}
            >
              <div className={classes.promptText}>注册时间</div>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cnLocale}>
                <DatePicker
                  value={dateRange.min}
                  onChange={onMinDateChange}
                  label={"起始日期"}
                  className={classes.dateRangeInput}
                  {...datePickerProps}
                  error={errorField === "dateRange" ? true : undefined}
                />
                <DatePicker
                  value={dateRange.max}
                  onChange={onMaxDateChange}
                  label={"截止日期"}
                  className={classes.dateRangeInput}
                  {...datePickerProps}
                  error={errorField === "dateRange" ? true : undefined}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
        <div className={classes.extraFieldsWrapper}>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyMyPatient}
                onChange={handleOnlyMyPatientCheckboxChange}
              />
            }
            label="只选择我的病人"
          />
          <Button
            startIcon={<TuneIcon />}
            onClick={handleAdditionalFieldsModalOpen}
            color="primary"
            className={classes.additionalFieldButton}
          >
            高级筛选
          </Button>
          {ADDITIONAL_FIELD_KEYS.map((fieldKey, index) => {
            if (additionalFields.includes(fieldKey)) {
              const onChipDelete = () => {
                const newAdditionalFields = removeElementFromArray(
                  additionalFields,
                  fieldKey
                );
                setAdditionalFields(newAdditionalFields);
                handleAdditionalFieldsSearch(newAdditionalFields);
              };
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  onDelete={onChipDelete}
                  icon={<InfoIcon />}
                  color="primary"
                  label={ADDITIONAL_FIELD_MODAL_DISPLAY_NAMES[index]}
                  key={fieldKey}
                  className={classes.chip}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            className={classes.searchButton}
            onClick={handleSearchButtonClick}
          >
            搜索
          </Button>
          <Button
            variant="contained"
            startIcon={<SettingsBackupRestoreIcon />}
            className={classes.whiteButton}
            onClick={handleResetButtonClick}
          >
            重置
          </Button>
        </div>
        <ErrorIndicator
          showError={showError}
          setShowError={setShowError}
          errorMessage={errorMessage}
        />
        <AdditionalFieldsModal
          isDialogOpen={isAdditionalFieldsModalOpen}
          handleDialogClose={handleAdditionalFieldsModalClose}
          additionalFields={additionalFields}
          setAdditionalFields={setAdditionalFields}
          handleAdditionalFieldsSearch={handleAdditionalFieldsSearch}
        />
      </form>
    );
  }
);
