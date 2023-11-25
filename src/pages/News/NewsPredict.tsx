import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";
import CustomizedDialog from "@/customize/components/customer/CustomizedDialog";
import QuillEditor from "@/customize/components/customer/QuillEditor";
import BaseCard from "@/customize/components/shared/BaseCard";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import NewsService from "@/service/Service/News/NewsService";
import { Grid, Button, Avatar, CardMedia, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import ResultCard from "@/customize/components/customer/ResultCard";
import GGService from "@/service/Service/GoogleSheet/GoogleSheet";

const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

const NewsPredictPage = () => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    predict_message: string;
  }>({ open: false, success: false, predict_message: "" });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const newsService = useMemo(() => NewsService(), []);
  const ggService = useMemo(() => GGService(), []);
  const router = useRouter();
  const randomId = generateRandomId();
  const [newsPost, setnewsPost] = useState<NewsPredictProps>({
    id: randomId,
    title: "",
    content: "",
    decript: "",
    typeName: "UNDEFINED",
    satisfied: 1,
  });

  const readAndUpdateFeedBack = async () => {
    try {
      await ggService
        .writeSheet(newsPost)
        .then((res) => {
          console.log("ads", res);
        })
        .catch((error) => {
          console.log("Error in reading the sheet", error);
        });
    } catch (error) {}
  };

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
    let validation = checkRequire(newsPost);
    if (!validation.sucess_flg) {
      console.log(validation.msg ? validation.msg : "");
      return;
    } else {
      handleOpenConfirmationDialog();
      const newsData = {
        NNId: newsPost.id,
        NNTitle: newsPost.title,
        NNContent: newsPost.content,
        NNDecript: newsPost.decript,
        NTypeId: newsPost.typeName,
      };
      await newsService
        .predictNews(newsData)
        .then((res) => {
          console.log(res);
          const { predict_code, predict_message } = res.response.data;
          setnewsPost((prevNewsPost) => ({
            ...prevNewsPost,
            typeName: predict_message,
          }));
          setNotification({
            open: true,
            success: predict_code === 0 ? true : false,
            predict_message: predict_message,
          });
        })
        .catch((error) => {
          setNotification({
            open: true,
            success: false,
            predict_message: error,
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
                <Grid item xs={12} sm={10}>
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
                <Grid item xs={12} sm={10}>
                  <CustomTextFieldWithLabel
                    label="Title"
                    id="title"
                    value={newsPost.title}
                    placeholder="Enter your no"
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
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
                <Grid item xs={12} sm={10}>
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
        </form>
      </DashboardCard>
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
      <ResultCard
        open={notification.open}
        onClose={() => {
          readAndUpdateFeedBack();
          setNotification({ open: false, success: false, predict_message: "" });
          router.refresh();
        }}
        success={notification.success}
        predict_message={notification.predict_message}
        onSatisfiedClick={() => {
          setnewsPost((prevNewsPost) => ({
            ...prevNewsPost,
            satisfied: 1,
          }));
        }}
        onDissatisfiedClick={() => {
          setnewsPost((prevNewsPost) => ({
            ...prevNewsPost,
            satisfied: 2,
          }));
        }}
      />
    </>
  );
};

export default NewsPredictPage;
