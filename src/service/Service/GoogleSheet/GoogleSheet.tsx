import ApiGG from "../apiGG";

const GGService = () => {
  const writeSheet = async (data: any) => {
    return await ApiGG.create(`/d3d705cd-0808-437a-b157-4bbb073c28d3`, data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return {
    writeSheet,
  };
};
export default GGService;
