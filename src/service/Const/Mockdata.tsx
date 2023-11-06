export const ACTION = {
  CAN_ACCESS: "CanAccess",
  CAN_DELETE: "CanDelete",
  CAN_EDIT: "CanEdit",
  CAN_ADD: "CanAdd",
} as const;

export const PATH_NAME = {
  // New
  NEW_LIST: "/news/newsList",
  NEW_ADD: "/news/newsPost",
  NEW_EDIT: "/news/newsEdit",

  // User
  USER_LIST: "/user/userList",
  USER_ADD: "/user/userCreate",
  USER_EDIT: "/user/userEdit",
  USER_PROFILE: "/user/profile",
  USER_CHANGEPASSWORD: "/user/changePassword",
  USER_FORGOTPASSWORD: "/user/forgotPassword",
  USER_RESETPASSWORD: "/user/resetPassword/:token?",
} as const;

export type ACTION = keyof typeof ACTION;
export type PATH_NAME = keyof typeof PATH_NAME;
