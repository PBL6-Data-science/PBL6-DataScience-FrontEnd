import AuthService from "./Authentication/AuthService";
import request from "../Share/request";

const addHeader = () => {
  const Auth = AuthService();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (Auth.loggedIn()) {
    headers["Authorization"] = "Bearer " + Auth.getToken();
  }
  return headers;
};

/**
 *
 * @param {string} url // Ex: '/api/employees'
 * @param {object} params // Ex: params = {id : 1}
 */
const get = (url: any, params: any) => {
  const headers = addHeader();
  return request({
    url: url,
    params: params,
    method: "GET",
    headers,
  });
};

/**
 *
 * @param {string} url // Ex: '/api/employees'
 * @param {object} data // Ex :{Name: 'James', Age: 18}
 * @param {object} header // post fomrdata = { Content-Type: 'multipart/form-data' }
 */
const create = (
  url: string,
  data: Record<string, any>,
  headers?: Record<string, any>
) => {
  const Auth = AuthService();
  if (!headers) headers = {};
  if (Auth.loggedIn()) {
    headers["Authorization"] = "Bearer " + Auth.getToken();
  }
  return request({
    url: url,
    method: "POST",
    data: data,
    headers,
  });
};

const onDelete = (url: any) => {
  const headers = addHeader();
  return request({
    url: url,
    method: "DELETE",
    headers,
  });
};

/**
 *
 * @param {string} url // Ex: '/api/employees'
 * @param {object} data // Ex :{Name: 'James', Age: 18}
 * @param {object} header // post fomrdata = { Content-Type: 'multipart/form-data' }
 */
const update = (
  url: string,
  data: object,
  headers: { [key: string]: string }
) => {
  const Auth = AuthService();
  if (!headers) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  if (Auth.loggedIn()) {
    headers["Authorization"] = "Bearer " + Auth.getToken();
  }
  return request({
    url: url,
    method: "PUT",
    data: data,
    headers: headers,
  });
};

const Api = {
  get,
  create,
  onDelete,
  update,
};

export default Api;
