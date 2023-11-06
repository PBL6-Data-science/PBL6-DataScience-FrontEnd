import ApprovedCard from "@/customize/components/customer/ApprovedCard";
import CustomTable from "@/customize/components/customer/CustomTable";
import NotificationCard from "@/customize/components/customer/Notification";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import { convertJsonToList, mapToNews } from "@/service/Helper/helper";
import NewsService from "@/service/Service/News/NewsService";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";

const defaultNewsItem: BaseNewsProps = {
  id: "",
  title: "Default Title",
  content: "Default Content",
  decript: "Default Description",
  postDate: null,
  typeName: "Default Type",
  statusName: "Default Status",
  backgroundUrl: null,
  createBy: null,
  createDate: null,
  lastUpdateDate: null,
  lastUpdateby: null,
  countView: 0,
  delFlg: false,
};

const NewsManagerPage = () => {
  const [newsItems, setNewsItems] = useState<BaseNewsProps[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const [approved, setApproved] = useState<{
    open: boolean;
    news: BaseNewsProps;
  }>({
    open: false,
    news: {
      ...defaultNewsItem,
    },
  });
  const newsService = useMemo(() => NewsService(), []);
  const router = useRouter();
  const newsHeaders = [
    { label: "ID", field: "id", width: "120px", centered: true },
    { label: "Decription", field: "decript", width: "500px" },
    {
      label: "Create By",
      field: "createBy",
      width: "170px",
      centered: true,
    },
    {
      label: "Create Date",
      field: "createDate",
      width: "170px",
      centered: true,
    },
    { label: "Post Date", field: "postDate", width: "170px", centered: true },

    {
      label: "Last Update Date",
      field: "lastUpdateDate",
      width: "170px",
      centered: true,
    },
    { label: "Count View", field: "countView", width: "120px", centered: true },
    {
      label: "Status",
      field: "statusName",
      width: "150px",
      centered: true,
      type: "chip",
      clickable: true,
    },
    {
      label: "Type",
      field: "typeName",
      width: "100px",
      centered: true,
      type: "chip",
    },
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

  const handleItemUpdate = (itemId: any) => {
    router.push(`/news/newsEdit/${itemId}`);
  };

  const handleItemDelete = async (itemId: any) => {
    try {
      await newsService
        .deleteNews(itemId)
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

  const handleApproveItem = (itemId: any) => {
    setApproved({
      open: true,
      news: newsItems.find((item) => item.id === itemId) ?? defaultNewsItem,
    });
  };

  return (
    <DashboardCard title="News Management">
      <>
        <CustomTable
          data={newsItems}
          tableHeaders={newsHeaders}
          title="Data Performance"
          identifierField="id"
          onDelete={handleItemDelete}
          onUpdate={handleItemUpdate}
          onApprove={handleApproveItem}
        />
        <ApprovedCard
          open={approved.open}
          news={approved.news}
          onClose={() => {
            setApproved({ open: false, news: defaultNewsItem });
            fetchNewsItems();
          }}
        />
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
