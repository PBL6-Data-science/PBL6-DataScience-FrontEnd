import { uniqueId } from "lodash";
import moment from "moment";

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
    return { ...mappedItem };
  });
};

const getDatetimeNow = () => {
  const currentDate = new Date();
  const formattedDateTimeVN = moment(currentDate).format(
    "YYYY-MM-DDTHH:mm:ss.SSS"
  );
  return formattedDateTimeVN;
};

export {
  dateFormat,
  dateConvertExport,
  mapObjectProperties,
  convertJsonToList,
  getDatetimeNow,
};
