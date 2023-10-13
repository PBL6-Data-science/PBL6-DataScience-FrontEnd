import CustomTable from "@/customize/components/customer/CustomTable";
import NotificationCard from "@/customize/components/customer/Notification";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import { convertJsonToList, dateConvertExport } from "@/service/Helper/helper";
import NewsService from "@/service/Service/News/NewsService";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";

const mapToNews = (item: any) => {
  const formatDateString = (dateString: string) => {
    return dateConvertExport(dateString).toLocaleString();
  };
  return {
    id: item.nnId,
    title: item.nnTitle.toString(),
    content: { __html: item.nnContent },
    postDate: formatDateString(item.nnPostDate),
    typeID: item.nTypeId.toString(),
    backgroundUrl: item.nnUrl,
    createDate: formatDateString(item.nnCreateDate),
    createBy: item.nnCreateBy,
    lastUpdateDate: formatDateString(item.nnLastUpdateDate),
    lastUpdateby: item.nnLastUpdateBy,
    countView: item.nnCountView.toString(),
  };
};

interface NewsItem {
  id: string;
  title: any;
  content: { __html: string };
  postDate: string;
  typeID: string;
  backgroundUrl: string;
  createBy: string;
  createDate: string;
  lastUpdateDate: string;
  lastUpdateby: string;
  countView: string;
}

const NewsManagerPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const newsService = useMemo(() => NewsService(), []);
  const router = useRouter();
  const newsHeaders = [
    { label: "ID", field: "id", width: "130px", centered: true },
    { label: "Title", field: "title" },
    {
      label: "Create Date",
      field: "createDate",
      width: "170px",
      centered: true,
    },
    { label: "Post Date", field: "postDate", width: "170px", centered: true },
    {
      label: "Create By",
      field: "createBy",
      width: "170px",
      centered: true,
    },
    {
      label: "Last Update Date",
      field: "lastUpdateDate",
      width: "170px",
      centered: true,
    },
    { label: "Count View", field: "countView", width: "90px", centered: true },
    { label: "Type ID", field: "typeID", width: "90px", centered: true },
  ];
  const fetchNewsItems = useCallback(async () => {
    try {
      await newsService
        .getAllNews()
        .then((res) => {
          setNewsItems(convertJsonToList(res.response.data, mapToNews));
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

  const handleItemSelected = (itemId: any) => {
    setSelectedItemId(itemId);
  };

  const handleItemUpdate = () => {
    router.push(`/news/newsEdit/${selectedItemId}`);
  };

  const handleItemDelete = async () => {
    try {
      await newsService
        .deleteNews(selectedItemId)
        .then((res) => {
          setNotification({
            open: true,
            success: true,
            title: "Delete Successfull",
          });
        })
        .catch((error) => {
          setNotification({ open: true, success: false, title: "Delete Fail" });
        });
    } catch (error: any) {
      if (error.status === 401) {
      }
    }
  };

  return (
    <DashboardCard title="News Management">
      <>
        <CustomTable
          data={newsItems}
          tableHeaders={newsHeaders}
          title="Data Performance"
          identifierField="id"
          onItemSelected={handleItemSelected}
          onDelete={handleItemDelete}
          onUpdate={handleItemUpdate}
        ></CustomTable>
        <NotificationCard
          open={notification.open}
          onClose={() => {
            setNotification({ open: false, success: false, title: "" });
            window.location.reload();
          }}
          success={notification.success}
          title={notification.title}
        />
      </>
    </DashboardCard>
  );
};
export default NewsManagerPage;
