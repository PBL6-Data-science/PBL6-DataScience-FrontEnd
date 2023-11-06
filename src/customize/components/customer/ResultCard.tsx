import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Avatar,
  Box,
  Stack,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import SentimentDissatisfiedSharpIcon from "@mui/icons-material/SentimentDissatisfiedSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import BlankCard from "../shared/BlankCard";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  success: boolean;
  predict_message: string;
  onSatisfiedClick: () => void;
  onDissatisfiedClick: () => void;
}

const ResultCard: React.FC<NotificationProps> = ({
  open,
  onClose,
  success,
  predict_message,
  onSatisfiedClick,
  onDissatisfiedClick,
}) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "90%",
          maxWidth: "xl",
          height: "90%",
          maxHeight: "lg",
          position: "relative",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={`${basePath}/assets/image/icon/predict.jpg`}
              alt="Your Image"
              width={550}
              height={550}
              layout="responsive"
              style={{
                borderRadius: "16px",
              }}
              priority
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container alignItems="center" justifyContent="center" ml={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={`${basePath}/assets/image/logo/logo.jpg`}
                    alt="logo"
                    width={230 * 1.5}
                    height={110 * 1.5}
                    layout="intrinsic"
                    priority
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <BlankCard>
                  <>
                    <Divider textAlign="left" sx={{ marginTop: 2 }}>
                      <Chip
                        variant="outlined"
                        color="info"
                        label="Predict result"
                        style={{
                          fontSize: "1.2rem",
                          height: "45px",
                          padding: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </Divider>
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
                              ? `${basePath}/assets/image/icon/great.gif`
                              : `${basePath}/assets/image/icon/warning.gif`
                          }
                          sx={{
                            width: 300,
                            height: 300,
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Typography variant="h2">{predict_message}</Typography>
                      </Grid>
                    </Grid>

                    <Divider
                      textAlign="left"
                      sx={{ marginTop: 3, marginBottom: 3 }}
                    >
                      <Chip
                        variant="outlined"
                        color="info"
                        label="Survey predict result"
                        style={{
                          fontSize: "1.2rem",
                          height: "50px",
                          padding: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </Divider>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Typography variant="caption" fontSize="18px" m={2}>
                        Please let us know if you are satisfied with the
                        results?
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "auto",
                          padding: "16px",
                          flexDirection: "row",
                          gap: 4,
                        }}
                      >
                        <Chip
                          variant="outlined"
                          color="success"
                          icon={
                            <SentimentSatisfiedAltSharpIcon
                              sx={{ fontSize: 30 }}
                            />
                          }
                          label="Satisfied"
                          onClick={onSatisfiedClick}
                          style={{
                            fontSize: "1.3rem",
                            height: "50px",
                            width: "180px",
                            padding: "4px",
                            cursor: "pointer",
                          }}
                        />

                        <Chip
                          variant="outlined"
                          color="error"
                          icon={
                            <SentimentDissatisfiedSharpIcon
                              sx={{ fontSize: 30 }}
                            />
                          }
                          label="Dissatisfied"
                          onClick={onDissatisfiedClick}
                          style={{
                            fontSize: "1.3rem",
                            height: "50px",
                            width: "180px",
                            padding: "4px",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </Stack>
                  </>
                </BlankCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ResultCard;
