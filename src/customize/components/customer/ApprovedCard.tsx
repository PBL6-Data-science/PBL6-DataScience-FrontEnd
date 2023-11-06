import React, { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { Grid, Box, IconButton, Chip, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlankCard from "../shared/BlankCard";
import CustomTextFieldWithLabel from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import dayjs from "dayjs";
import NewsService from "@/service/Service/News/NewsService";
import {
  convertJsonToList,
  datetimeConvertExport,
  getDatetimeNow,
} from "@/service/Helper/helper";
import NotificationCard from "./Notification";
import { useRouter } from "next/navigation";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  news: BaseNewsProps;
}

const mapToNewsStatus = (item: any) => {
  return {
    StatusID: item.nStatusID,
    StatusName: item.nStatusName,
    StatusDelFlg: item.StatusDelFlg,
  };
};

const ApprovedCard: React.FC<NotificationProps> = ({ open, onClose, news }) => {
  const [newsApproved, setNewsApproved] = useState<BaseNewsProps>(news);
  const newsService = useMemo(() => NewsService(), []);
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const router = useRouter();
  const [newsStatus, setnewsStatus] = useState<NewsStatusProps[]>([
    {
      StatusID: 0,
      StatusName: "",
      StatusDelFlg: false,
    },
  ]);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });

  useEffect(() => {
    setNewsApproved(news);
  }, [news]);

  useEffect(() => {
    if (!hasEffectRun) {
      const fetchNewsStatus = async () => {
        try {
          await newsService
            .getAllNewsStatus()
            .then((res) => {
              setnewsStatus(
                convertJsonToList(res.response.data, mapToNewsStatus)
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error: any) {
          if (error.status === 401) {
            console.log(error);
          }
        } finally {
          setHasEffectRun(true);
        }
      };
      fetchNewsStatus();
    }
  }, [hasEffectRun, newsService]);

  const handleStatusdChange = (value: string) => {
    if (value === "POSTED") {
      setNewsApproved((prevNewsApproved) => ({
        ...prevNewsApproved,
        statusName: value,
        postDate: getDatetimeNow(),
      }));
    } else {
      setNewsApproved((prevNewsApproved) => ({
        ...prevNewsApproved,
        statusName: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      console.log(newsApproved);
      const newsData = {
        NNId: newsApproved.id,
        NNTitle: newsApproved.title,
        NNContent: newsApproved.content,
        NNDecript: newsApproved.decript,
        NNPostDate: datetimeConvertExport(newsApproved.postDate),
        NTypeName: newsApproved.typeName,
        NStatusName: newsApproved.statusName,
        NNUrl: newsApproved.backgroundUrl,
        NNCreateDate: datetimeConvertExport(newsApproved.createDate),
        NNLastUpdateDate: newsApproved.lastUpdateDate,
        NNCreateBy: newsApproved.createBy,
        NNLastUpdateBy: newsApproved.lastUpdateby,
        NNCountView: newsApproved.countView,
        NNDelFlg: newsApproved.delFlg,
      };
      console.log(newsData);
      await newsService
        .updateNews(newsData)
        .then((res) => {
          setNotification({
            open: true,
            success: true,
            title: "Approved Successfull",
          });
        })
        .catch((error) => {
          console.log(error)
          setNotification({
            open: true,
            success: false,
            title: "Approved Fail",
          });
        });
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "100%",
          maxWidth: "xl",
          height: "100%",
          maxHeight: "xl",
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
          <Grid item xs={12}>
            <BlankCard>
              <>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ textAlign: "left", mt: 2 }}
                >
                  {newsApproved.decript}
                </Typography>
                <Divider
                  textAlign="left"
                  sx={{ marginTop: 3, marginBottom: 3 }}
                >
                  <Chip variant="outlined" color="info" label="Content" />
                </Divider>
                <Box
                  component="div"
                  sx={{
                    mt: 2,
                    maxHeight: "400px",
                    overflowY: "auto",
                    "@media (max-width: 600px)": {
                      maxHeight: "300px",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: newsApproved?.content }}
                ></Box>
              </>
            </BlankCard>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Grid item xs={12} sm={5}>
                <CustomTextFieldWithLabel
                  label="No"
                  id="no"
                  value={newsApproved.id}
                  placeholder="Enter your no"
                  onChange={() => {}}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <CustomTextFieldWithLabel
                  label="Author"
                  id="author"
                  value={newsApproved.createBy ? newsApproved.createBy : "N/A"}
                  placeholder="Enter your no"
                  onChange={() => {}}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <CustomTextFieldWithLabel
                  label="Type"
                  id="type"
                  value={newsApproved.typeName ? newsApproved.typeName : "N/A"}
                  placeholder="Enter your no"
                  onChange={() => {}}
                  readOnly
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <CustomDatePicker
                  id="birthday"
                  label="Date of Birth"
                  value={
                    newsApproved.createDate
                      ? dayjs(newsApproved.createDate)
                      : null
                  }
                  onChange={() => {}}
                  fullWidth={true}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <CustomSelect
                  id="status"
                  label="Status"
                  value={
                    newsStatus.find(
                      (newsStatus) =>
                        newsStatus.StatusName === newsApproved.statusName
                    )?.StatusName || "N/A"
                  }
                  options={newsStatus.map((newsStatus) => ({
                    value: newsStatus.StatusName,
                    label: newsStatus.StatusName,
                  }))}
                  onChange={(value) => handleStatusdChange(value.toString())}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="reset"
                  variant="outlined"
                  color="warning"
                  sx={{ marginRight: 3.5 }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <NotificationCard
          open={notification.open}
          onClose={() => {
            setNotification({ open: false, success: false, title: "" });
          }}
          success={notification.success}
          title={notification.title}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ApprovedCard;
