import AuthService from "./Authentication/AuthService";
import requestAI from "../Share/requestAI";

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
  return requestAI({
    url: url,
    method: "POST",
    data: data,
    headers,
  });
};

const ApiAI = {
  create,
};

export default ApiAI;
