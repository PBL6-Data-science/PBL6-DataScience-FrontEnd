import DashboardCard from "@/customize/components/shared/DashboardCard";
import { Grid, Stack, ButtonProps, styled, Button } from "@mui/material";
import { IconPoint, IconArticle, IconEye } from "@tabler/icons-react";
import NewsItem from "./NewsItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import NewsService from "@/service/Service/News/NewsService";
import {
  convertJsonToList,
  dateConvertExport,
  dateFormat,
  mapObjectProperties,
} from "@/service/Helper/helper";
import { useRouter } from "next/navigation";

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const mapToNews = (item: any) => {
  return {
    id: item.nnId.toString(),
    title: item.nnTitle.toString(),
    content: item.nnContent,
    postDate: item.nnPostDate,
    author: item.nnAuthorId,
    typeID: item.nTypeId.toString(),
    backgroundUrl: item.nnUrl,
    createDate: item.nnCreateDate,
    lastUpdatedate: item.nnLastUpdateDate,
    lastUpdateby: item.nnLastUpdateBy,
    countView: item.nnCountView.toString(),
  };
};

interface NewsItem {
  id: string;
  title: any;
  content: string;
  postDate: string;
  author: string;
  typeID: string;
  backgroundUrl: string;
  createDate: string;
  lastUpdatedate: string;
  lastUpdateby: string;
  countView: string;
}

const NewsList = () => {
  const [menuItems, setMenuItems] = useState<NewsItem[]>([]);
  const newsService = useMemo(() => NewsService(), []);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const fetchNewsItems = useCallback(async () => {
    try {
      await newsService
        .getAllNews()
        .then((res) => {
          console.log(res);
          setMenuItems(convertJsonToList(res.response.data, mapToNews));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    } catch (error: any) {
      if (error.status === 401) {
        setShowAlert(true);
      }
    }
  }, [newsService]);

  useEffect(() => {
    fetchNewsItems();
  }, [fetchNewsItems]);

  return (
    <DashboardCard title="News List">
      <>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          mt={-8}
          mr={1}
          mb={2}
        >
          <ResetButtonStyled
            color="success"
            variant="contained"
            component="label"
            sx={{ ml: "auto" }}
            onClick={() => {
              router.push("/news/newsPost");
            }}
          >
            Post News
          </ResetButtonStyled>
        </Stack>
        <Grid container spacing={2}>
          {menuItems.map((news, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <NewsItem
                News={{
                  backGroundUrl: null,
                  userImageUrl: news.backgroundUrl,
                  countView: news.countView,
                  title: news.title,
                  content: news.content,
                  datePost: dateConvertExport(news.postDate).toLocaleString(),
                  totalCommnet: news.countView,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </>
    </DashboardCard>
  );
};
export default NewsList;
