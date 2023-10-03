import Api from "../api";

const NewsService = () => {
  const getAllNews = async () => {
    return await Api.get(`/News`, {})
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getNewsByUserNo = async (userNo: any) => {
    const params = {
      userNo: userNo,
    };
    return await Api.get(`/News/getNewsByUserNo`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    getAllNews,
    getNewsByUserNo,
  };
};
export default NewsService;
