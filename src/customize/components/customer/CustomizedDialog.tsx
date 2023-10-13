import React, { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Card, CardContent, CardHeader } from "@mui/material";

interface CustomizedDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomizedDialog: React.FC<CustomizedDialogProps> = ({
  open,
  onClose,
  title,
  content,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    aria-describedby="custom-dialog-description"
    PaperProps={{
      sx: {
        borderRadius: "16px", 
      },
    }}
  >
    <Card
      sx={{
        p: 2,
        position: "relative",
        width: "500px",
        "& .MuiDialogTitle-root": {
          borderBottom: "4px solid #05b2bd",
        },
      }}
      elevation={9}
      variant={undefined}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </DialogTitle>
      <CardContent>
        <DialogContentText sx={{ fontWeight: "bold", textAlign: "left" }}>
          {content}
        </DialogContentText>
      </CardContent>
      <DialogActions sx={{ justifyContent: "flex-end", marginTop: "auto" }}>
        <Button variant="text" color="error" onClick={onSecondaryButtonClick}>
          {secondaryButtonText}
        </Button>
        <Button variant="text" color="primary" onClick={onPrimaryButtonClick}>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Card>
  </Dialog>
);

export default CustomizedDialog;
