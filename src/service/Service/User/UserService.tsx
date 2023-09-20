import Api from "../api";

const UserService = () => {
  const getUserByRole = async (userNo: any) => {
    const params = {
      userNo: userNo,
    };
    return await Api.get(`/User/userNo`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getAllRole = async () => {
    return await Api.get(`/User/appRole`, null)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateUser = async (userNo: any, bodyFormData: object) => {
    return await Api.update(`/User/${userNo}`, bodyFormData, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    getUserByRole,
    getAllRole,
    updateUser,
  };
};
export default UserService;
