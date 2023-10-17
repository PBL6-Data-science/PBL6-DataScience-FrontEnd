import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";
import CustomizedDialog from "@/customize/components/customer/CustomizedDialog";
import NotificationCard from "@/customize/components/customer/Notification";
import QuillEditor from "@/customize/components/customer/QuillEditor";
import BaseCard from "@/customize/components/shared/BaseCard";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import AuthService from "@/service/Service/Authentication/AuthService";
import NewsService from "@/service/Service/News/NewsService";
import { Grid, Button, Avatar, CardMedia, Box } from "@mui/material";
import dayjs from "dayjs";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  postDate: string | null;
  typeID: number;
  backgroundUrl: string | null;
  createBy: string;
  createDate: string | null;
  lastUpdatedate: string | null;
  lastUpdateby: string;
  countView: number;
  delFlg: boolean;
}

const NewsPostPage = () => {
  const newsID = useParams();
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const newsService = useMemo(() => NewsService(), []);
  const auth = useMemo(() => AuthService(), []);
  const pathname = usePathname();
  const router = useRouter();
  const isNewsPostPage = pathname === "/news/newsPost";
  const [newsPost, setnewsPost] = useState<NewsPost>({
    id: "",
    title: "",
    content: "",
    postDate: null,
    typeID: 3,
    backgroundUrl: null,
    createBy: "",
    createDate: null as string | null,
    lastUpdatedate: null,
    lastUpdateby: "",
    countView: 1,
    delFlg: false,
  });

  useEffect(() => {
    if (!hasEffectRun) {
      const fetchNews = async () => {
        try {
          let promise;
          if (isNewsPostPage) {
            promise = newsService.getIdNewsMax();
          } else if (newsID) {
            promise = newsService.getNewsDetail(newsID.newsID);
          }
          if (promise) {
            promise
              .then((res) => {
                setnewsPost((prevNewsPost) => ({
                  ...prevNewsPost,
                  id: isNewsPostPage
                    ? res.response.data
                    : res.response.data.nnId,
                  title: isNewsPostPage
                    ? ""
                    : res.response.data.nnTitle.toString(),
                  content: isNewsPostPage
                    ? ""
                    : res.response.data.nnContent.toString(),
                  postDate: isNewsPostPage
                    ? null
                    : res.response.data.nnPostDate,
                  typeID: isNewsPostPage
                    ? ""
                    : res.response.data.nTypeId.toString(),
                  backgroundUrl: isNewsPostPage
                    ? null
                    : res.response.data.nnUrl,
                  createBy: isNewsPostPage ? "" : res.response.data.nnCreateBy,
                  createDate: isNewsPostPage
                    ? null
                    : res.response.data.nnCreateDate,
                  lastUpdatedate: isNewsPostPage
                    ? null
                    : res.response.data.nnLastUpdateDate,
                  lastUpdateby: isNewsPostPage
                    ? ""
                    : res.response.data.nnLastUpdateBy,
                  countView: isNewsPostPage ? 1 : res.response.data.nnCountView,
                  delFlg: isNewsPostPage ? false : res.response.data.nnDelFlg,
                }));
              })
              .catch((error) => {
                console.error("Error fetching news:", error);
                if (error.status === 401) {
                  // Handle authentication error
                  console.log(error);
                }
              });
          }
        } catch (error: any) {
          if (error.status === 401) {
            console.log(error);
          }
        } finally {
          // Set hasEffectRun to true after the effect has run
          setHasEffectRun(true);
        }
      };
      fetchNews();
    }
  }, [hasEffectRun, isNewsPostPage, newsID, newsService]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setnewsPost((prevUser) => ({
      ...prevUser,
      [fieldName]: value === null ? "" : value,
    }));
  };

  const checkRequire = (newsPost: any) => {
    if (!newsPost.title || newsPost.title == "") {
      return {
        msg: "Please enter the news title.",
        sucess_flg: false,
      };
    }

    if (!newsPost.content || newsPost.content === "") {
      return {
        msg: "Please enter the news content.",
        sucess_flg: false,
      };
    }

    return {
      sucess_flg: true,
    };
  };

  const handleSubmit = async () => {
    const updatedNewsPost = {
      ...newsPost,
      typeID: newsPost.typeID || 3,
      createBy: newsPost.createBy || auth.getUserNo(),
      createDate:
        newsPost.createDate ||
        dayjs(new Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss"),
    };

    let validation = checkRequire(updatedNewsPost);
    if (!validation.sucess_flg) {
      console.log(validation.msg ? validation.msg : "");
      //setShowAlert(true);
      return;
    } else {
      handleOpenConfirmationDialog();
      const newsData = {
        NNId: updatedNewsPost.id,
        NNTitle: updatedNewsPost.title,
        NNContent: updatedNewsPost.content,
        NNPostDate: updatedNewsPost.postDate,
        NTypeId: updatedNewsPost.typeID,
        NNUrl: updatedNewsPost.backgroundUrl,
        NNCreateDate: updatedNewsPost.createDate,
        NNLastUpdateDate: updatedNewsPost.lastUpdatedate,
        NNCreateBy: updatedNewsPost.createBy,
        NNLastUpdateBy: updatedNewsPost.lastUpdateby,
        NNCountView: updatedNewsPost.countView,
        NNDelFlg: updatedNewsPost.delFlg,
      };
      if (isNewsPostPage) {
        await newsService
          .createNews(newsData)
          .then((res) => {
            setNotification({
              open: true,
              success: true,
              title: "Create Successfull",
            });
          })
          .catch((error) => {
            setNotification({
              open: true,
              success: false,
              title: "Create Successfull",
            });
          });
      } else {
        await newsService
          .updateNews(newsData)
          .then((res) => {
            setNotification({
              open: true,
              success: true,
              title: "Update Successfull",
            });
          })
          .catch((error) => {
            setNotification({
              open: true,
              success: false,
              title: "Update Successfull",
            });
          });
      }
    }
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    handleCloseConfirmationDialog();
  };

  const handleCancel = () => {
    handleCloseConfirmationDialog();
  };

  return (
    <>
      <DashboardCard title="Post News">
        <form onSubmit={(e) => e.preventDefault()}>
          <Box sx={{ marginBottom: 8 }}>
            <CardMedia
              component="img"
              alt="Cover Photo"
              height="500"
              width="100"
              image={`${basePath}/assets/image/users/coverImage.png`}
              sx={{
                borderRadius: "16px",
                border: "4px solid #adadad",
              }}
            />
            <Avatar
              alt="Profile Picture"
              src={`${basePath}/assets/image/users/user.jpg`}
              sx={{
                marginTop: "-60px",
                marginLeft: "60px",
                justifyContent: "left",
                alignItems: "left",
                width: 120,
                height: 120,
              }}
            />
          </Box>
          <BaseCard title="Content News">
            <>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={8}>
                  <CustomTextFieldWithLabel
                    label="No"
                    id="no"
                    value={newsPost.id}
                    placeholder="Enter your no"
                    onChange={(e) => handleFieldChange("id", e.target.value)}
                    readOnly
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CustomTextFieldWithLabel
                    label="Title"
                    id="title"
                    value={newsPost.title}
                    placeholder="Enter your no"
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <QuillEditor
                    id="content"
                    value={newsPost.content}
                    onChange={(e) => handleFieldChange("content", e)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
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
                    onClick={handleOpenConfirmationDialog}
                  >
                    Post News
                  </Button>
                </Grid>
              </Grid>
            </>
          </BaseCard>

          <CustomizedDialog
            open={isConfirmationDialogOpen}
            onClose={handleCloseConfirmationDialog}
            title="Confirm Submission"
            content="Are you sure you want to submit the form?"
            primaryButtonText="Submit"
            secondaryButtonText="Cancel"
            onPrimaryButtonClick={handleConfirm}
            onSecondaryButtonClick={handleCancel}
          />

          <NotificationCard
            open={notification.open}
            onClose={() => {
              setNotification({ open: false, success: false, title: "" });
              router.back();
            }}
            success={notification.success}
            title={notification.title}
          />
        </form>
      </DashboardCard>
    </>
  );
};

export default NewsPostPage;
