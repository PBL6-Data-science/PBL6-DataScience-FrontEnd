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
  const [newsPost, setnewsPost] = useState<BaseNewsProps>({
    id: "",
    title: "",
    content: "",
    decript: "",
    postDate: null,
    typeName: "",
    statusName: "",
    backgroundUrl: null,
    createBy: null,
    createDate: null as string | null,
    lastUpdateDate: null,
    lastUpdateby: null,
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
                  decript: isNewsPostPage
                    ? ""
                    : res.response.data.nnDecript.toString(),
                  postDate: isNewsPostPage
                    ? null
                    : res.response.data.nnPostDate,
                  typeName: isNewsPostPage
                    ? "UNDEFINED"
                    : res.response.data.nTypeName,
                  statusName: isNewsPostPage
                    ? "PENDING"
                    : res.response.data.nStatusName,
                  backgroundUrl: isNewsPostPage
                    ? null
                    : res.response.data.nnUrl,
                  createBy: isNewsPostPage
                    ? auth.getUserNo()
                    : res.response.data.nnCreateBy,
                  createDate: isNewsPostPage
                    ? null
                    : res.response.data.nnCreateDate,
                  lastUpdatedate: isNewsPostPage
                    ? null
                    : res.response.data.nnLastUpdateDate,
                  lastUpdateby: isNewsPostPage
                    ? res.response.data.nnLastUpdateBy
                    : auth.getUserNo(),
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
  }, [auth, hasEffectRun, isNewsPostPage, newsID, newsService]);

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
      createDate: isNewsPostPage
        ? dayjs(new Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss")
        : newsPost.createDate,
      lastUpdatedate: isNewsPostPage
        ? null
        : dayjs(new Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss"),
    };

    let validation = checkRequire(updatedNewsPost);
    if (!validation.sucess_flg) {
      console.log(validation.msg ? validation.msg : "");
      return;
    } else {
      handleOpenConfirmationDialog();
      const newsData = {
        NNId: updatedNewsPost.id,
        NNTitle: updatedNewsPost.title,
        NNContent: updatedNewsPost.content,
        NNDecript: updatedNewsPost.decript,
        NNPostDate: dayjs(updatedNewsPost.postDate?.toLocaleString()).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        NTypeName: updatedNewsPost.typeName,
        NStatusName: updatedNewsPost.statusName,
        NNUrl: updatedNewsPost.backgroundUrl,
        NNCreateDate: dayjs(
          updatedNewsPost.createDate?.toLocaleString()
        ).format("YYYY-MM-DD HH:mm:ss"),
        NNLastUpdateDate: dayjs(
          updatedNewsPost.lastUpdatedate?.toLocaleString()
        ).format("YYYY-MM-DD HH:mm:ss"),
        NNCreateBy: updatedNewsPost.createBy,
        NNLastUpdateBy: updatedNewsPost.lastUpdateby,
        NNCountView: updatedNewsPost.countView,
        NNDelFlg: updatedNewsPost.delFlg,
      };
      await newsService
        .predictNews(newsData, "BiLSTM")
        .then(async (res) => {
          const { predict_message } = res.response.data;
          newsData.NTypeName = predict_message;

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
        })
        .catch((error) => {
          setNotification({
            open: true,
            success: false,
            title: error,
          });
        });
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
                  <CustomTextFieldWithLabel
                    label="Decription"
                    id="decript"
                    value={newsPost.decript}
                    placeholder="Enter your no"
                    onChange={(e) =>
                      handleFieldChange("decript", e.target.value)
                    }
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
                    Save Change
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
              router.refresh();
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
