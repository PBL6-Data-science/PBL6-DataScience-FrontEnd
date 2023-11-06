import ApiGG from "../apiGG";

const GGService = () => {
  const writeSheet = async (data: any) => {
    return await ApiGG.create(`/6a159ced-e893-402c-b91a-26823257d34d`, data)
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
