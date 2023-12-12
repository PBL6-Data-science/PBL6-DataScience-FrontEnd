import Api from "../api";
import ApiAI from "../apiAI";

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

  const getNewsDetail = async (newsID: any) => {
    const params = {
      newsID: newsID,
    };
    return await Api.get(`/News/Detail`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const createNews = async (news: any) => {
    return await Api.create(`/News`, news, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateNews = async (news: any) => {
    return await Api.update(`/News`, news, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteNews = async (newsID: any) => {
    return await Api.onDelete(`/News/${newsID}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getIdNewsMax = async () => {
    return await Api.get(`/News/getNewsIDMax`, {})
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const predictNews = async (news: any) => {
    return await ApiAI.create(`/BiLSTM/predict-data`, news)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getAllNewsStatus = async () => {
    return await Api.get(`/News/NewsStatus`, {})
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
    getNewsDetail,
    getIdNewsMax,
    createNews,
    updateNews,
    deleteNews,
    predictNews,
    getAllNewsStatus,
  };
};
export default NewsService;
