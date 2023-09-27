import BlankCard from "@/customize/components/shared/BlankCard";
import {
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Chip,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { IconEye, IconArticle, IconPoint } from "@tabler/icons-react";

interface NewsCardProps {
  News: {
    backGroundUrl: string | null;
    userImageUrl: string | null;
    title: string;
    content: string;
    countView: string;
    totalCommnet: string;
    datePost: string;
  };
}

const NewsItem: React.FC<NewsCardProps> = ({ News }) => {
  return (
    <>
      <BlankCard>
        <CardMedia
          component="img"
          alt="Cover Photo"
          height="200"
          width="100"
          image={`/assets/image/users/coverImage.png`}
          sx={{
            borderRadius: "16px",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt="Profile Picture"
              src={`/assets/image/users/user.jpg`}
              sx={{
                marginTop: "-35px",
                marginLeft: "15px",
                justifyContent: "left",
                alignItems: "left",
                width: 40,
                height: 40,
              }}
            />
            <Chip
              label="Example Chip"
              variant="filled"
              color="secondary"
              sx={{
                width: "fit-content",
                marginLeft: "auto",
                marginTop: "-5px",
                backgroundColor: "#e6e7e7",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            component="div"
            sx={{
              textAlign: "left",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {News.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ textAlign: "left", mt: 2 }}
          >
            {News.content}
          </Typography>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
            direction="row"
            mt={3}
          >
            <Box>
              <IconButton size="large" aria-label="menu" color="inherit">
                <IconEye width={20} />
                <Typography
                  color="textPrimary"
                  variant="body1"
                  sx={{ ml: 1, fontWeight: "bold" }}
                >
                  {News.countView}
                </Typography>
              </IconButton>
              <IconButton size="large" aria-label="menu" color="inherit">
                <IconArticle width={20} />
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                  sx={{ ml: 1, fontWeight: "bold" }}
                >
                  {News.totalCommnet}
                </Typography>
              </IconButton>
            </Box>
            <Stack direction="row">
              <IconPoint width={20} />
              <Typography
                color="textPrimary"
                variant="subtitle2"
                sx={{ ml: 1, fontWeight: "bold" }}
              >
                {News.datePost}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </BlankCard>
    </>
  );
};
export default NewsItem;
