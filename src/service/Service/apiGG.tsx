import requestGG from "../Share/requestGG";

const create = (url: string, data: Record<string, any>) => {
  return requestGG({
    url: url,
    method: "POST",
    data: data,
  });
};

const ApiGG = {
  create,
};

export default ApiGG;
