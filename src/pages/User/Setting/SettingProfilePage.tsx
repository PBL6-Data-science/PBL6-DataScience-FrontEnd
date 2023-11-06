import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useEffect, useState, useMemo } from "react";
import UserService from "@/service/Service/User/UserService";
import AuthService from "@/service/Service/Authentication/AuthService";
import {
  mapObjectProperties,
  convertJsonToList,
  getDatetimeNow,
  mapToUser,
} from "@/service/Helper/helper";
import dayjs from "dayjs";
import { storage } from "@/service/Helper/fibase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Media from "../Share/Media";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import BaseCard from "@/customize/components/shared/BaseCard";
import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";
import CustomSelect from "@/customize/components/customer/CustomSelect";
import CustomDatePicker from "@/customize/components/customer/CustomDatePicker";
import CustomizedDialog from "@/customize/components/customer/CustomizedDialog";
import NotificationCard from "@/customize/components/customer/Notification";

const mapToAppRole = (item: any) => {
  return {
    appRoleNo: item.arId,
    appRoleName: item.arName,
  };
};

interface UserProfile {
  userNo: string;
  userName: string;
  userPassword: string;
  userSex: string;
  userPhoneNum: string;
  userEmail: string;
  userBirthday: Date | null;
  userAddress: string;
  userImageUrl: string | null;
  userFBUrl: string;
  userInStaUrl: string;
  userTWUrl: string;
  userStatus: number;
  userRoleApp: number;
  userCreateDate: Date | null;
  userLastUpdateDate: Date | null;
  userCountNews: number;
  userCountNewsFake: number;
  userCountNewsReal: number;
}

interface AppRole {
  appRoleNo: number;
  appRoleName: string;
}

const SettingProfilePage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userNo: "",
    userName: "",
    userPassword: "",
    userSex: "",
    userPhoneNum: "",
    userEmail: "",
    userBirthday: null,
    userAddress: "",
    userImageUrl: null,
    userFBUrl: "",
    userInStaUrl: "",
    userTWUrl: "",
    userStatus: 0,
    userRoleApp: 0,
    userCreateDate: null,
    userLastUpdateDate: null,
    userCountNews: 0,
    userCountNewsFake: 0,
    userCountNewsReal: 0,
  });
  const [appRole, setappRole] = useState<AppRole[]>([
    {
      appRoleNo: 0,
      appRoleName: "",
    },
  ]);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const [ConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const userService = useMemo(() => UserService(), []);
  const auth = useMemo(() => AuthService(), []);

  useEffect(() => {
    const fetchUserData = async () => {
      await userService
        .getUserByNo(auth.getUserNo())
        .then((res) => {
          setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            ...mapObjectProperties(res.response.data, mapToUser),
          }));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
      await userService
        .getAllRole()
        .then((res) => {
          setappRole(convertJsonToList(res.response.data, mapToAppRole));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    };

    fetchUserData();
  }, [auth, userService]);

  const handleFieldChange = (
    fieldName: string,
    value: string | dayjs.Dayjs | null | number
  ) => {
    setUserProfile((prevUser) => ({
      ...prevUser,
      [fieldName]: value === null ? "" : value,
    }));
  };

  const validateDateField = (): {} => {
    const dateFormat = "YYYY-MM-DD";
    const arrDate = ["userCreateDate", "userBirthday"];
    const dateFieldErrors: { [key: string]: string } = {};
    for (let i = 0; i < arrDate.length; i++) {
      const fieldValue = userProfile[arrDate[i] as keyof typeof userProfile];

      if (fieldValue) {
        const toDateFormat = dayjs(fieldValue).format(dateFormat);
        if (!dayjs(toDateFormat, dateFormat, true).isValid()) {
          dateFieldErrors[arrDate[i]] = `Invalid date format for ${arrDate[i]}`;
        } else {
          dateFieldErrors[arrDate[i]] = toDateFormat;
        }
      } else {
        dateFieldErrors[arrDate[i]] = `Invalid date is null for ${arrDate[i]}`;
      }
    }

    return dateFieldErrors;
  };

  const checkRequire = (UserCreate: any) => {
    if (!UserCreate.userNo || UserCreate.userNo == "") {
      return {
        msg: "Please enter the user no.",
        sucess_flg: false,
      };
    }

    if (!UserCreate.userName || UserCreate.userName === "") {
      return {
        msg: "Please enter the user name.",
        sucess_flg: false,
      };
    }

    if (!UserCreate.userStatus || UserCreate.userStatus === "") {
      return {
        msg: "Please choose the user status.",
        sucess_flg: false,
      };
    }

    if (!UserCreate.userRoleApp || UserCreate.userRoleApp === "") {
      return {
        msg: "Please choose the user role app .",
        sucess_flg: false,
      };
    }

    return {
      sucess_flg: true,
    };
  };

  const handleSubmit = async () => {
    let required = checkRequire(userProfile);
    if (!required.sucess_flg) {
      console.log(required.msg ? required.msg : "");
      return;
    } else {
      const invalidDateFields: string[] = Object.entries(validateDateField())
        .filter(
          ([, error]) =>
            typeof error === "string" && error.startsWith("Invalid date")
        )
        .map(([fieldName, error]) => error as string);
      handleOpenConfirmationDialog();

      if (invalidDateFields.length > 0) {
        console.log(invalidDateFields);
      } else {
        const userData = {
          userNo: userProfile.userNo,
          userName: userProfile.userName,
          userPassword: userProfile.userPassword,
          userSex: userProfile.userSex,
          userPhoneNum: userProfile.userPhoneNum,
          userEmail: userProfile.userEmail,
          userBirthday: (validateDateField() as any)["userBirthday"],
          userAddress: userProfile.userAddress,
          userImageUrl: userProfile.userImageUrl,
          userFBUrl: userProfile.userFBUrl,
          userInStaUrl: userProfile.userInStaUrl,
          userTWUrl: userProfile.userTWUrl,
          userStatus: userProfile.userStatus,
          userRoleApp: userProfile.userRoleApp,
          userCreateDate: userProfile.userCreateDate,
          userLastUpdateDate: getDatetimeNow(),
          userDelFlg: false,
        };
        await userService
          .updateUser(userData)
          .then((res) => {
            setNotification({
              open: true,
              success: true,
              title: "Update Successfull",
            });
          })
          .catch((error) => {
            setNotification({
              open: true,
              success: false,
              title: "Update Fail",
            });
          });
      }
    }
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    handleCloseConfirmationDialog();
  };

  const handleCancel = () => {
    handleCloseConfirmationDialog();
  };

  return (
    <DashboardCard title="User Profile">
      <>
        <Media
          basePath={basePath}
          userProfile={{
            userName: userProfile.userName,
            userImageUrl: userProfile.userImageUrl,
            userFBUrl: userProfile.userFBUrl,
            userInStaUrl: userProfile.userInStaUrl,
            userTWUrl: userProfile.userTWUrl,
            userRoleApp:
              appRole.find((role) => role.appRoleNo === userProfile.userRoleApp)
                ?.appRoleName || "",
            userCountNews: userProfile.userCountNews,
            userCountNewsFake: userProfile.userCountNewsFake,
            userCountNewsReal: userProfile.userCountNewsReal,
          }}
          onFieldChange={handleFieldChange}
        />
        <BaseCard title="Information">
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  label="No"
                  id="no"
                  value={userProfile.userNo}
                  placeholder="Enter your no"
                  onChange={(e) => handleFieldChange("userNo", e.target.value)}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  label="Name"
                  id="name"
                  value={userProfile.userName}
                  placeholder="Enter your username"
                  onChange={(e) =>
                    handleFieldChange("userName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  type="email"
                  label="Email"
                  id="email"
                  value={userProfile.userEmail}
                  placeholder="abc@example.com"
                  onChange={(e) =>
                    handleFieldChange("userEmail", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  label="Address"
                  id="address"
                  value={userProfile.userAddress}
                  placeholder="Enter your address"
                  onChange={(e) =>
                    handleFieldChange("userAddress", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  type="password"
                  label="Password"
                  id="password"
                  value={userProfile.userPassword}
                  placeholder="Enter your username"
                  onChange={(e) =>
                    handleFieldChange("userPassword", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  label="Phone"
                  id="phone"
                  value={userProfile.userPhoneNum}
                  placeholder="0123456789"
                  onChange={(e) =>
                    handleFieldChange("userPhoneNum", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel component="legend" htmlFor="gender">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="userSex"
                  value={userProfile.userSex}
                  onChange={(e) => handleFieldChange("userSex", e.target.value)}
                >
                  <FormControlLabel
                    id="male"
                    value={1}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    id="female"
                    value={2}
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel component="legend" htmlFor="gender">
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  value={userProfile.userStatus}
                  onChange={(e) =>
                    handleFieldChange("userStatus", e.target.value)
                  }
                >
                  <FormControlLabel
                    id="active"
                    value={1}
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    id="inactive"
                    value={2}
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  id="role"
                  label="Role"
                  value={
                    appRole.find(
                      (appRole) => appRole.appRoleNo === userProfile.userRoleApp
                    )?.appRoleNo || ""
                  }
                  options={appRole.map((appRole) => ({
                    value: appRole.appRoleNo,
                    label: appRole.appRoleName,
                  }))}
                  onChange={(value) => handleFieldChange("userRoleApp", value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  id="birthday"
                  label="Date of Birth"
                  value={
                    userProfile.userBirthday
                      ? dayjs(userProfile.userBirthday)
                      : null
                  }
                  onChange={(newValue) =>
                    handleFieldChange("userBirthday", newValue)
                  }
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="fb"
                      label="FaceBook"
                      value={userProfile.userFBUrl}
                      onChange={(e) =>
                        handleFieldChange("userFBUrl", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="ins"
                      label="Instagram"
                      value={userProfile.userInStaUrl}
                      onChange={(e) =>
                        handleFieldChange("userInStaUrl", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="tw"
                      label="Twitter"
                      value={userProfile.userTWUrl}
                      onChange={(e) =>
                        handleFieldChange("userTWUrl", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
                mt={4}
              >
                <Button
                  type="reset"
                  variant="outlined"
                  color="warning"
                  sx={{ marginRight: 3.5 }}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleOpenConfirmationDialog}
                  variant="contained"
                  color="success"
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </BaseCard>
        <CustomizedDialog
          open={ConfirmationDialogOpen}
          onClose={handleCloseConfirmationDialog}
          title="Confirm Submission"
          content="Are you sure you want to submit the form?"
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onPrimaryButtonClick={handleConfirm}
          onSecondaryButtonClick={handleCancel}
        />
        <NotificationCard
          open={notification.open}
          onClose={() => {
            setNotification({ open: false, success: false, title: "" });
            window.location.reload();
          }}
          success={notification.success}
          title={notification.title}
        />
      </>
    </DashboardCard>
  );
};

export default SettingProfilePage;
