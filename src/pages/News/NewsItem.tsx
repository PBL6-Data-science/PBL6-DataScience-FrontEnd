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

const NewsItem: React.FC<NewsItemProps> = ({ News }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <>
      <BlankCard>
        <CardMedia
          component="img"
          alt="Cover Photo"
          height="300"
          width="100"
          image={`${basePath}/assets/image/users/coverImage.png`}
          sx={{
            borderRadius: "16px",
            borderBottom: "2px solid #e6f0f7",
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
              src={`${basePath}/assets/image/users/user.jpg`}
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
              label={News && News.typeName ? News.typeName : "UNDEFINED"}
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
            variant="h6"
            component="div"
            sx={{
              textAlign: "left",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {News && News.title ? News.title : ""}
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
                  {News?.countView}
                </Typography>
              </IconButton>
              <IconButton size="large" aria-label="menu" color="inherit">
                <IconArticle width={20} />
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                  sx={{ ml: 1, fontWeight: "bold" }}
                >
                  {News?.totalCommnet}
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
                {News?.postDate}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </BlankCard>
    </>
  );
};
export default NewsItem;
