import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { Header } from "../PatientInformation/components";
import AddIcon from "@material-ui/icons/Add";
import { AddConfigurationDialog, ConfirationDetailDialog } from "./components";
import { useMutation, useQuery } from "@apollo/client";
import {
  DOCTOR_CONFIG_LIST,
  QUESTIONNAIRE_LIST,
} from "../../lib/graphql/queries";
import {
  QuestionnaireList,
  QuestionnaireListVariables,
} from "../../lib/graphql/queries/QuestionnaireList/__generated__/QuestionnaireList";
import { LoadingIndicator } from "../../lib/components";
import {
  DoctorConfigList,
  DoctorConfigList_doctorConfigList_configs as DoctorConfigItem,
} from "../../lib/graphql/queries/DoctorConfigList/__generated__/DoctorConfigList";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  SelectConfig,
  SelectConfigVariables,
} from "../../lib/graphql/mutations/SelectConfig/__generated__/SelectConfig";
import { SELECT_CONFIG } from "../../lib/graphql/mutations";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  DeleteConfig,
  DeleteConfigVariables,
} from "../../lib/graphql/mutations/DeleteConfig/__generated__/DeleteConfig";
import { DELETE_CONFIG } from "../../lib/graphql/mutations/DeleteConfig";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionsContainer: {
      margin: 10,
      display: "flex",
      justifyContent: "space-between",
    },
    configCard: {
      width: 270,
      margin: "10px 10px",
      display: "inline-block",
    },
    configNameContainer: {
      display: "flex",
      alignItems: "center",
    },
    settingIcon: {
      marginRight: 10,
      color: "#2196F3",
    },
    configPromptMessage: {
      margin: 10,
    },
    noOverflow: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    inUseText: {
      color: "#4caf50 !important",
    },
    resetButton: {
      marginLeft: 10,
    },
    cardDescription: {
      fontSize: "0.875rem",
      paddingTop: 15,
    },
    deleteButton: {
      marginLeft: "auto !important",
      "&:hover": {
        color: "#B71C1C",
      },
    },
  })
);

export const DoctorConfig = () => {
  const [isAddConfigDialogOpen, setIsAddConfigDialogOpen] = useState(false);
  const closeAddConfigDialog = () => {
    setIsAddConfigDialogOpen(false);
  };
  const openAddConfigDialog = () => {
    setIsAddConfigDialogOpen(true);
  };
  const [selectedConfig, setSelectedConfig] = useState<null | DoctorConfigItem>(
    null
  );
  const [
    isConfigrationDetailDialogOpen,
    setIsConfigrationDetailDialogOpen,
  ] = useState(false);
  const closeConfigDetailDialog = () => {
    setIsConfigrationDetailDialogOpen(false);
  };
  const openConfigDetailDialog = (configItem: DoctorConfigItem) => {
    setSelectedConfig(configItem);
    setIsConfigrationDetailDialogOpen(true);
  };
  const {
    data: configList,
    refetch,
    loading: configListLoading,
  } = useQuery<DoctorConfigList>(DOCTOR_CONFIG_LIST, {
    fetchPolicy: "no-cache",
  });
  const classes = useStyles();
  const {
    loading,
    data: formListData,
    error: questionnaireListError,
  } = useQuery<QuestionnaireList, QuestionnaireListVariables>(
    QUESTIONNAIRE_LIST,
    {
      variables: { isReport: false, showAll: true },
    }
  );
  const [selectConfig] = useMutation<SelectConfig, SelectConfigVariables>(
    SELECT_CONFIG
  );
  const [deleteConfig] = useMutation<DeleteConfig, DeleteConfigVariables>(
    DELETE_CONFIG
  );
  const handleSelectConfigButtonClick = (configId: string) => {
    selectConfig({ variables: { input: { configId } } }).then(() => refetch());
  };
  const handleDeleteConfigButtonClick = (configId: string) => {
    deleteConfig({ variables: { input: { configId } } }).then(() => refetch());
  };
  const handleResetButtonClick = () => {
    selectConfig({ variables: { input: {} } }).then(() => refetch());
  };

  if (loading || !formListData || !configList || configListLoading) {
    return <LoadingIndicator />;
  }
  let currentlyUsedConfig: null | DoctorConfigItem | false = null;
  // null: unknown
  // false: no currently used configuration
  // DoctorConfigItem: currently used configration
  const configInUseList = configList?.doctorConfigList.configs.filter(
    (config) => config.selected === true
  );
  if (configInUseList === undefined) {
    currentlyUsedConfig = null;
  } else if (configInUseList.length === 0) {
    currentlyUsedConfig = false;
  } else {
    currentlyUsedConfig = configInUseList[0];
  }
  return (
    <>
      <Header text={"配置患者端使用的量表"} />
      <div className={classes.actionsContainer}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={openAddConfigDialog}
        >
          添加配置
        </Button>
        <a href="/user" target="_blank">
          <Button startIcon={<OpenInNewIcon />}>启动用户端</Button>
        </a>
      </div>
      <div className={classes.configPromptMessage}>
        {/** Prompt message */}
        {currentlyUsedConfig === null ? null : currentlyUsedConfig === false ? (
          "当前无使用中的自定义配置，所有量表都可见。"
        ) : (
          <>
            {`当前使用的配置名称为：${currentlyUsedConfig.configName}`}
            <Button
              className={classes.resetButton}
              variant="outlined"
              size="small"
              onClick={handleResetButtonClick}
            >
              重置
            </Button>
          </>
        )}
      </div>
      <div>
        {configList?.doctorConfigList.configs.map((config) => (
          <Card className={classes.configCard} key={config.id}>
            <CardContent>
              <div className={classes.configNameContainer}>
                <SettingsIcon className={classes.settingIcon} />
                <span className={classes.noOverflow}>{config.configName}</span>
              </div>
              <div className={classes.cardDescription}>
                共{config.formIds.length}个量表
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => openConfigDetailDialog(config)}
              >
                查看详情
              </Button>
              {config.selected === false ? (
                <Button
                  size="small"
                  onClick={() => handleSelectConfigButtonClick(config.id)}
                >
                  使用此配置
                </Button>
              ) : (
                <Button
                  size="small"
                  className={classes.inUseText}
                  disableRipple
                  disabled
                >
                  使用中
                </Button>
              )}
              <IconButton
                size="small"
                className={classes.deleteButton}
                onClick={() => handleDeleteConfigButtonClick(config.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <AddConfigurationDialog
        isOpen={isAddConfigDialogOpen}
        closeDialog={closeAddConfigDialog}
        refetchListData={refetch}
        formList={formListData}
      />
      {selectedConfig && (
        <ConfirationDetailDialog
          isDialogOpen={isConfigrationDetailDialogOpen}
          closeDialog={closeConfigDetailDialog}
          formList={formListData}
          config={selectedConfig}
        />
      )}
    </>
  );
};
