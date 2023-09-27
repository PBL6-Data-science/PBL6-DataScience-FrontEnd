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

  return {
    getAllNews,
  };
};
export default NewsService;
