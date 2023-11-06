import BaseCard from "@/customize/components/shared/BaseCard";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import { mapObjectProperties, mapToNews } from "@/service/Helper/helper";
import NewsService from "@/service/Service/News/NewsService";
import {
  Box,
  CardMedia,
  Avatar,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NewsDetailPage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const newsID = useParams();
  const newsService = useMemo(() => NewsService(), []);
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [newsPost, setnewsPost] = useState<BaseNewsProps>({
    id: "",
    title: "",
    content: "",
    decript: "",
    postDate: null,
    typeName: "UNDEFINED",
    statusName: "PENDING",
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
          await newsService
            .getNewsDetail(newsID?.newsID)
            .then((res) => {
              setnewsPost((prevNewPost) => ({
                ...prevNewPost,
                ...mapObjectProperties(res.response.data, mapToNews),
              }));
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
      fetchNews();
    }
  }, [hasEffectRun, newsID, newsPost, newsService]);

  return (
    <>
      <DashboardCard title="Post News">
        <>
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
                border: "4px solid #adadad",
              }}
            />
          </Box>
          <BaseCard title="Content News">
            <>
              <Typography
                variant="h3"
                component="div"
                sx={{ textAlign: "left", mt: 2 }}
              >
                {newsPost.decript}
              </Typography>
              <Divider textAlign="left" sx={{ marginTop: 3, marginBottom: 3 }}>
                <Chip variant="outlined" color="info" label="Content" />
              </Divider>
              <Box
                component="div"
                sx={{ textAlign: "left", mt: 2 }}
                dangerouslySetInnerHTML={{ __html: newsPost?.content }}
              ></Box>
            </>
          </BaseCard>
        </>
      </DashboardCard>
    </>
  );
};
export default NewsDetailPage;
