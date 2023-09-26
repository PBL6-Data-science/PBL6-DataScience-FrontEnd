import Api from "../api";

const MenuService = () => {
  const getMenuByRole = async (idRole: any) => {
    const params = {
      idRole: idRole,
    };
    return await Api.get(`/Menu/Detail`, params)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    getMenuByRole,
  };
};
export default MenuService;
