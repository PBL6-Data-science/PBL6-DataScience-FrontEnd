import BlankCard from "@/customize/components/shared/BlankCard";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import {
  Box,
  CardMedia,
  Avatar,
  Typography,
  Grid,
  CardContent,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
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

const cardData = [
  {
    image: "/assets/image/users/coverImage1.png",
    avatar: "/assets/image/users/user1.jpg",
    title: "Card 1",
    content: "Content for Card 1",
  },
  {
    image: "/assets/image/users/coverImage2.png",
    avatar: "/assets/image/users/user2.jpg",
    title: "Card 2",
    content: "Content for Card 2",
  },
  // Add more card data as needed
];

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
    <>
      <DashboardCard title="News List">
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
      </DashboardCard>
    </>
  );
};
export default NewsList;
