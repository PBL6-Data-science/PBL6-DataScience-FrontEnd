import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Grid, Avatar } from "@mui/material";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  success: boolean;
  title: string;
}

const NotificationCard: React.FC<NotificationProps> = ({
  open,
  onClose,
  success,
  title,
}) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "430px",
        },
      }}
    >
      <DialogContent>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={
                  success
                    ? `${basePath}/assets/image/icon/success.gif`
                    : `${basePath}/assets/image/icon/fail.gif`
                }
                sx={{
                  width: 300,
                  height: 300,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3">{title}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: "4px" }}>
              <Button variant="contained" color="success" onClick={onClose}>
                OK
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCard;
