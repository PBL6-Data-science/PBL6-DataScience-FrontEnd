import DashboardCard from "@/customize/components/shared/DashboardCard";
import { Grid, Stack, ButtonProps, styled, Button } from "@mui/material";
import NewsItem from "./NewsItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import NewsService from "@/service/Service/News/NewsService";
import {
  convertJsonToList,
  dateConvertExport,
  mapToNews,
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

const NewsList = () => {
  const [menuItems, setMenuItems] = useState<BaseNewsProps[]>([]);
  const newsService = useMemo(() => NewsService(), []);
  const router = useRouter();
  const fetchNewsItems = useCallback(async () => {
    try {
      await newsService
        .getAllNews()
        .then((res) => {
          setMenuItems(convertJsonToList(res.response.data, mapToNews));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    } catch (error: any) {
      if (error.status === 401) {
      }
    }
  }, [newsService]);

  useEffect(() => {
    fetchNewsItems();
  }, [fetchNewsItems]);

  const handleNewsItemClick = (id: string) => {
    const newsDetailUrl = `/news/newsDetail/${id}`;
    router.push(newsDetailUrl);
  };

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
        <Grid container spacing={6}>
          {menuItems.map((news, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleNewsItemClick(news.id)}
              sx={{ cursor: "pointer" }}
            >
              <NewsItem
                News={{
                  backGroundUrl: null,
                  userImageUrl: news.backgroundUrl,
                  title: news.title,
                  typeName: news.typeName,
                  statusName: news.statusName,
                  countView: news.countView,
                  postDate: news.postDate ? news.postDate : "N/A",
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
