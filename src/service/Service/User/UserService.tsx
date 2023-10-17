import Api from "../api";

const UserService = () => {
  const getUserByNo = async (userNo: any) => {
    const params = {
      userNo: userNo,
    };
    return await Api.get(`/User/Detail`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getAllUser = async () => {
    return await Api.get(`/User`, {})
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

  const getUserNoMax = async () => {
    return await Api.get(`/User/GetUserNoMax`, {})
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const createUser = async (user: any) => {
    return await Api.create(`/User`, user, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateUser = async (user: any) => {
    return await Api.update(`/User`, user, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteUser = async (userNo: any) => {
    return await Api.onDelete(`/User/${userNo}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    getUserByNo,
    getAllRole,
    getAllUser,
    getUserNoMax,
    createUser,
    updateUser,
    deleteUser,
  };
};
export default UserService;
