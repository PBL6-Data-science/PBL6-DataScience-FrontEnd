import { uniqueId } from "lodash";

const dateFormat = (date: string) => {
  return date ? new Date(date.slice(0, date.lastIndexOf("T"))) : "";
};
const mapObjectProperties = (sourceObject: any, mappingConfig: any) => {
  const resultObject: any = {};
  for (const key in mappingConfig) {
    resultObject[key] = sourceObject[key] || mappingConfig[key];
  }
  return resultObject;
};

const convertJsonToList = (
  dataArray: any[],
  mappingFunction: (item: any) => any
) => {
  return dataArray.map((item, index) => {
    const mappedItem = mappingFunction(item);
    return { ...mappedItem, id: uniqueId() };
  });
};
export { dateFormat, mapObjectProperties, convertJsonToList };
