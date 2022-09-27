import {
  createStyles,
  IconButton,
  makeStyles,
  Popover,
  Theme,
} from "@material-ui/core";
import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
    icon: {
      width: 22,
      height: 22,
    },
  })
);

interface Props {
  name: string;
}
export const HelpPopover = ({ name }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        color="primary"
        size="small"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <HelpOutlineIcon className={classes.icon} />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {name}未填写任何量表！
      </Popover>
    </>
  );
};
