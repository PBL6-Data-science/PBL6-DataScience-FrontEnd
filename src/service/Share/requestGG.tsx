import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVE_GG, // Replace with your API base URL
});

const requestGG = function (options: any) {
  const onSuccess = function (response: { data: any; status: any }) {
    return {
      response: { data: response.data, status: response.status },
    };
  };

  const onError = function (error: {
    response: { status: number; data: any; headers: any };
    message: any;
  }) {
    if (error.response) {
      if (error.response.status == 400) {
        let errorMessages: any[] = [];
        const arrErr = error.response.data;

        Object.keys(arrErr).forEach((key) => {
          const messages = arrErr[key];

          if (Array.isArray(messages)) {
            messages.forEach((val) => {
              errorMessages.push(val);
            });
          } else {
            errorMessages.push(messages);
          }
        });
        return Promise.reject({
          response: {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          },
          message: errorMessages,
        });
      } else {
        return Promise.reject({
          response: {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          },
          message: error.message,
        });
      }
    } else {
      return Promise.reject({
        response: error.response,
        message: error.message,
      });
    }
  };

  return api(options).then(onSuccess).catch(onError);
};

export default requestGG;
