import Api from "../api";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface UserToken {
  No: string;
  Name: string;
  AppRole: string;
}

const AuthService = () => {
  const login = async (no: any, password: any) => {
    const data: { [key: string]: any } = {
      no: no,
      password: password,
    };
    const formData = new URLSearchParams(data);

    return await Api.create("/Authentication/login", formData)
      .then((res) => {
        if (res.response.status === 200) {
          setToken(res.response.data);
          setProfile(res.response.data);
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const loggedIn = () => {
    const token = getToken();
    if (token) {
      return isTokenExpired(token);
    }
    return !!token;
  };

  const isTokenExpired = (token: any) => {
    const decodedToken = jwtDecode(token) as { [key: string]: any };

    var timestamp = Math.floor(Date.now() / 1000);

    if (timestamp < decodedToken.exp) {
      return true;
    }
    return false;
  };

  const setToken = (idToken: any) => {
    var today = new Date();
    var endDate = new Date();
    endDate.setDate(today.getDate() + 2);
    Cookies.set("id_token", idToken, { expires: endDate });
  };

  const removeToken = () => {
    Cookies.remove("id_token");
  };

  const getToken = () => {
    return Cookies.get("id_token");
  };

  const getProfile = () => {
    const token = Cookies.get("id_token");

    return token !== undefined ? jwtDecode(token) : null;
  };

  const setProfile = (profile: string) => {
    var decoded = jwtDecode(profile);

    // Saves profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(decoded));
  };

  const getUserNo = () => {
    const profile = getProfile() as UserToken;
    const userNo = profile ? profile.No : "";
    return userNo;
  };

  const getUserName = () => {
    const profile = getProfile() as UserToken;
    const userName = profile ? profile.Name : "";
    return userName;
  };

  const getUserAppRole = () => {
    const profile = getProfile() as UserToken;
    const userAppRole = profile ? profile.AppRole : "";
    return userAppRole;
  };

  const logout = () => {
    removeToken();
  };

  return {
    login,
    loggedIn,
    isTokenExpired,
    setToken,
    removeToken,
    getToken,
    getProfile,
    setProfile,
    getUserNo,
    getUserName,
    getUserAppRole,
    logout,
  };
};
export default AuthService;
