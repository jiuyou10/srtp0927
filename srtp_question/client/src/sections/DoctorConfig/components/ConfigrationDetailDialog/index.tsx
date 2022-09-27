import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@material-ui/core";
import React from "react";
import { DoctorConfigList_doctorConfigList_configs as DoctorConfigItem } from "../../../../lib/graphql/queries/DoctorConfigList/__generated__/DoctorConfigList";
import { QuestionnaireList } from "../../../../lib/graphql/queries/QuestionnaireList/__generated__/QuestionnaireList";

interface Props {
  config: DoctorConfigItem;
  isDialogOpen: boolean;
  formList: QuestionnaireList;
  closeDialog: () => void;
}
export const ConfirationDetailDialog = (props: Props) => {
  const { config, isDialogOpen, formList, closeDialog } = props;
  return (
    <Dialog fullWidth maxWidth="md" open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>配置名：{config.configName}</DialogTitle>
      <List>
        {formList.questionnaireList.map((form) => (
          <ListItem key={form.key}>
            <ListItemText primary={form.name} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                color="primary"
                checked={config.formIds.includes(form.id)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
