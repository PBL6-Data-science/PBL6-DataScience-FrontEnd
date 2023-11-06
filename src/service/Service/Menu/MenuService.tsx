import Api from "../api";

const MenuService = () => {
  const getMenuByRole = async (idRole: any) => {
    const params = {
      idRole: idRole,
    };
    return await Api.get(`/Menu/ByRole`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getAllMenuRole = async () => {
    return await Api.get(`/Menu/MenuRole`, {})
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateMenuRole = async (menuRole: any) => {
    return await Api.update(`/Menu`, menuRole, {})
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    getMenuByRole,
    getAllMenuRole,
    updateMenuRole,
  };
};
export default MenuService;
