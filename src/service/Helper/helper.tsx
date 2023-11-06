import moment from "moment";

// Date time format
const dateFormat = (date: string) => {
  return date ? new Date(date.slice(0, date.lastIndexOf("T"))) : "";
};

const datetimeConvertExport = (date: string | null): string => {
  const format = "YYYY-MM-DD HH:mm";
  return date ? moment(date).format(format) : "";
};

const dateConvertExport = (date: string) => {
  const format = "YYYY-MM-DD";
  return date ? moment(date).format(format) : "";
};

const getDatetimeNow = () => {
  const currentDate = new Date();
  const formattedDateTimeVN = moment(currentDate).format(
    "YYYY-MM-DDTHH:mm:ss.SSS"
  );
  return formattedDateTimeVN;
};

// Convert Jonson to array or object
const mapObjectProperties = (sourceObject: any, mappingConfig: any) => {
  const mappedObject: any = { ...mappingConfig(sourceObject) };

  return mappedObject;
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

// Helper News
const mapToNews = (item: any) => {
  const formatDateString = (dateString: string) => {
    return datetimeConvertExport(dateString);
  };
  return {
    id: item.nnId.toString(),
    title: item.nnTitle.toString(),
    content: item.nnContent.toString(),
    decript: item.nnDecript.toString(),
    postDate: formatDateString(item.nnPostDate),
    typeName: item.nTypeName.toString(),
    statusName: item.nStatusName.toString(),
    backgroundUrl: item.nnUrl,
    createDate: formatDateString(item.nnCreateDate),
    createBy: item.nnCreateBy,
    lastUpdateDate: formatDateString(item.nnLastUpdateDate),
    lastUpdateby: item.nnLastUpdateBy,
    countView: item.nnCountView,
    delFlg: item.nnDelFlg,
  };
};

const mapToUser = (item: any) => {
  const formatDateString = (dateString: string) => {
    return datetimeConvertExport(dateString);
  };
  return {
    userNo: item.userNo.toString(),
    userName: item.userName.toString(),
    userPassword: item.userPassword.toString(),
    userSex: item.userSex.toString(),
    userPhoneNum: item.userPhoneNum.toString(),
    userEmail: item.userEmail.toString(),
    userBirthday: formatDateString(item.userBirthday),
    userAddress: item.userAddress.toString(),
    userImageUrl: item.userImageUrl,
    userFBUrl: item.userFBUrl,
    userInStaUrl: item.userInStaUrl,
    userTWUrl: item.userTWUrl,
    userStatus: item.userStatus,
    userRoleApp: item.userRoleApp,
    userCreateDate: formatDateString(item.userCreateDate),
    userLastUpdateDate: formatDateString(item.userLastUpdateDate),
    usercountNews: item.usercountNews,
    userCountNewsFake: item.userCountNewsFake,
    userCountNewsReal: item.userCountNewsReal,
  };
};

export {
  dateFormat,
  datetimeConvertExport,
  dateConvertExport,
  mapObjectProperties,
  convertJsonToList,
  getDatetimeNow,
  mapToNews,
  mapToUser,
};
