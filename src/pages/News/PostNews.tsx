import CustomDatePicker from "@/customize/components/customer/CustomDatePicker";
import CustomSelect from "@/customize/components/customer/CustomSelect";
import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";
import TinyMCEEditor from "@/customize/components/customer/TinyMCEEditor";
import BaseCard from "@/customize/components/shared/BaseCard";
import {
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  Typography,
  Avatar,
  CardMedia,
  Box,
} from "@mui/material";
import { useState } from "react";

const NewsPostPage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [newsPost, setnewsPost] = useState({
    id: "",
    title: "",
    content: "",
    postDate: null,
    author: "",
    typeID: "",
    backgroundUrl: null,
    createDate: null,
    lastUpdatedate: null,
    lastUpdateby: "",
    countView: 0,
  });

  const handleFieldChange = (fieldName: string, value: string | null) => {
    setnewsPost((prevUser) => ({
      ...prevUser,
      [fieldName]: value === null ? "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <BaseCard title="Information">
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 12 }}>
            <CardMedia
              component="img"
              alt="Cover Photo"
              height="500"
              width="100"
              image={`${basePath}/assets/image/users/coverImage.png`}
              sx={{
                borderRadius: "16px",
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
                readOnly
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TinyMCEEditor
                id="content"
                label="Content"
                initialValue={newsPost.content}
                onChange={(e) => handleFieldChange("content", e)}
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
              <Button type="submit" variant="contained" color="success">
                Post News
              </Button>
            </Grid>
          </Grid>
          {/* <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              <Typography variant="body1">
                {snackbarMessage.split("\n").map((message, index) => (
                  <Box key={index}>{message}</Box>
                ))}
              </Typography>
            </MuiAlert>
          </Snackbar> */}
        </form>
      </BaseCard>
    </>
  );
};

export default NewsPostPage;
