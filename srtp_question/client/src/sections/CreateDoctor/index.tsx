import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import { LoadingIndicator } from "../../lib/components";
import { ADD_DOCTOR } from "../../lib/graphql/mutations/AddDoctor";
import {
  AddDoctor,
  AddDoctorVariables,
} from "../../lib/graphql/mutations/AddDoctor/__generated__/AddDoctor";
import { DOCTOR_LIST } from "../../lib/graphql/queries";
import { CHECK_IF_DOCTOR_USER_NAME_UNIQUE } from "../../lib/graphql/queries/CheckIfDoctorNameUnique";
import {
  CheckIfDoctorNameUnique,
  CheckIfDoctorNameUniqueVariables,
} from "../../lib/graphql/queries/CheckIfDoctorNameUnique/__generated__/CheckIfDoctorNameUnique";
import {
  DoctorList,
  DoctorListVariables,
} from "../../lib/graphql/queries/DoctorList/__generated__/DoctorList";
import { Header } from "../PatientInformation/components";
import { AddDoctorDialog } from "./components";
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";

const DEFAULT_LIMIT = 5;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: "20px 10px",
    },
    actionContainer: {
      margin: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    paginationContainer: {
      display: "flex",
      alignItems: "center",
    },
    totalNumberText: {
      marginRight: 5,
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  })
);
export const CreateDoctor = () => {
  const classes = useStyles();
  const { loading, data, refetch } = useQuery<DoctorList, DoctorListVariables>(
    DOCTOR_LIST,
    {
      variables: {
        limit: DEFAULT_LIMIT,
        currentPageIndex: 0,
      },
      fetchPolicy: "network-only",
    }
  );
  const [checkDoctorName, { data: checkNameData }] = useLazyQuery<
    CheckIfDoctorNameUnique,
    CheckIfDoctorNameUniqueVariables
  >(CHECK_IF_DOCTOR_USER_NAME_UNIQUE, {
    fetchPolicy: "no-cache",
  });
  const [addDoctor] = useMutation<AddDoctor, AddDoctorVariables>(ADD_DOCTOR);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAddDoctorDialogOpen, setIsAddDoctorDialogOpen] = useState(false);
  const closeDialog = () => {
    setIsAddDoctorDialogOpen(false);
  };
  const openDialog = () => {
    setIsAddDoctorDialogOpen(true);
  };
  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    pageIndex: number
  ) => {
    setCurrentPageIndex(pageIndex - 1);
    refetch({ limit: DEFAULT_LIMIT, currentPageIndex: pageIndex - 1 });
  };
  const refetchListData = () => {
    refetch({ limit: DEFAULT_LIMIT, currentPageIndex });
  };
  if (loading || !data) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Header text={"医生账号信息"} />
      <div className={classes.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          startIcon={<AddIcon />}
        >
          添加医生
        </Button>
        <div className={classes.paginationContainer}>
          <span className={classes.totalNumberText}>
            共计{data.doctorList.total}个账号
          </span>
          <Pagination
            count={Math.ceil(data.doctorList.total / DEFAULT_LIMIT)}
            variant="outlined"
            color="primary"
            page={currentPageIndex + 1}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
      <List component={Paper} className={classes.list}>
        {data.doctorList.admins.map((admin, index) => (
          <React.Fragment key={admin.userName}>
            <ListItem alignItems="flex-start" key={admin.userName}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`账号名：${admin.userName}`}
                secondary={`姓名：${admin.name}`}
              />
            </ListItem>
            {index !== data.doctorList.admins.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddDoctorDialog
        isOpen={isAddDoctorDialogOpen}
        closeDialog={closeDialog}
        checkDoctorUserName={checkDoctorName}
        checkResult={checkNameData}
        addDoctor={addDoctor}
        refetchListData={refetchListData}
      />
    </>
  );
};
