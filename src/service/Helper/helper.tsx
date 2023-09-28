import { uniqueId } from "lodash";
const moment = require("moment");

const dateFormat = (date: string) => {
  return date ? new Date(date.slice(0, date.lastIndexOf("T"))) : "";
};

const dateConvertExport = (date: string) => {
  const format = "YYYY-MM-DD";
  return date ? moment(date).format(format) : "";
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
export {
  dateFormat,
  dateConvertExport,
  mapObjectProperties,
  convertJsonToList,
};
