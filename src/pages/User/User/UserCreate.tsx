import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Avatar,
  CardMedia,
} from "@mui/material";

import { useEffect, useState, useMemo, useRef } from "react";
import UserService from "@/service/Service/User/UserService";
import AuthService from "@/service/Service/Authentication/AuthService";
import {
  mapObjectProperties,
  convertJsonToList,
  getDatetimeNow,
} from "@/service/Helper/helper";
import dayjs from "dayjs";
import { storage } from "@/service/Helper/fibase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useParams, usePathname, useRouter } from "next/navigation";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import BaseCard from "@/customize/components/shared/BaseCard";
import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";
import CustomSelect from "@/customize/components/customer/CustomSelect";
import CustomDatePicker from "@/customize/components/customer/CustomDatePicker";
import NotificationCard from "@/customize/components/customer/Notification";
import CustomizedDialog from "@/customize/components/customer/CustomizedDialog";

const mapToAppRole = (item: any) => {
  return {
    appRoleNo: item.arId,
    appRoleName: item.arName,
  };
};

interface User {
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
}

interface AppRole {
  appRoleNo: number;
  appRoleName: string;
}

const UserCreatePage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [user, setUser] = useState<User>({
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
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [ConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const userService = useMemo(() => UserService(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userNo = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isUserCreatePage = pathname === "/user/userCreate";

  useEffect(() => {
    if (!hasEffectRun) {
      const fetchNews = async () => {
        try {
          let promise;

          if (isUserCreatePage) {
            await userService
              .getUserNoMax()
              .then((res) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  userNo: res.response.data,
                }));
              })
              .catch((error) => {
                console.error("Error fetching menu items:", error);
              });
          } else if (userNo) {
            await userService
              .getUserByNo(userNo.userNo)
              .then((res) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  ...mapObjectProperties(res.response.data, prevUser),
                }));
              })
              .catch((error) => {
                console.error("Error fetching menu items:", error);
              });
          }
          await userService
            .getAllRole()
            .then((res) => {
              setappRole(convertJsonToList(res.response.data, mapToAppRole));
            })
            .catch((error) => {
              console.error("Error fetching menu items:", error);
            });
        } catch (error: any) {
          if (error.status === 401) {
            console.log(error);
          }
        } finally {
          setHasEffectRun(true);
        }
      };
      fetchNews();
    }
  }, [hasEffectRun, isUserCreatePage, userNo, userService]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectedFile = async (files: FileList | null) => {
    try {
      if (!files || files.length === 0) {
        throw new Error("No file selected");
      }

      const imageFile = files[0];

      if (imageFile.size > 100000000000) {
        throw new Error("File size too large");
      }

      const name = imageFile.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      });

      await uploadTask;

      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setNotification({
        open: true,
        success: true,
        title: "Upload Image Successful",
      });
      handleFieldChange("userImageUrl", url);
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        success: false,
        title: "Upload failed",
      });
    }
  };

  const handleFieldChange = (
    fieldName: string,
    value: string | dayjs.Dayjs | null | number
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value === null ? "" : value,
    }));
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
        msg: "Please enter the user role app .",
        sucess_flg: false,
      };
    }

    return {
      sucess_flg: true,
    };
  };

  const handleSubmit = async () => {
    let validation = checkRequire(user);
    if (!validation.sucess_flg) {
      console.log(validation.msg ? validation.msg : "");
      return;
    } else {
      handleOpenConfirmationDialog();
      const userData = {
        userNo: user.userNo,
        userName: user.userName,
        userPassword: user.userPassword,
        userSex: user.userSex,
        userPhoneNum: user.userPhoneNum,
        userEmail: user.userEmail,
        userBirthday: user.userBirthday,
        userAddress: user.userAddress,
        userImageUrl: user.userImageUrl,
        userFBUrl: user.userFBUrl,
        userInStaUrl: user.userInStaUrl,
        userTWUrl: user.userTWUrl,
        userStatus: user.userStatus,
        userRoleApp: user.userRoleApp,
        userCreateDate: user.userCreateDate,
        userLastUpdateDate: user.userLastUpdateDate,
        userDelFlg: false,
      };
      if (isUserCreatePage) {
        const userData = {
          ...user,
          userCreateDate: getDatetimeNow(),
          userLastUpdateDate: getDatetimeNow(),
          userDelFlg: false,
        };
        await userService
          .createUser(userData)
          .then((res) => {
            setNotification({
              open: true,
              success: true,
              title: "Create Successfull",
            });
          })
          .catch((error) => {
            setNotification({
              open: true,
              success: false,
              title: "Create Fail",
            });
          });
      } else {
        const userData = {
          ...user,
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
        <Box sx={{ marginBottom: 8 }}>
          <CardMedia
            component="img"
            alt="Cover Photo"
            height="500"
            width="100"
            image={`${basePath}/assets/image/users/coverImage.png`}
            sx={{
              borderRadius: "16px",
            }}
          />
          <Avatar
            alt="Profile Picture"
            src={user.userImageUrl ?? `${basePath}/assets/image/users/user.jpg`}
            sx={{
              marginTop: "-60px",
              marginLeft: "60px",
              justifyContent: "left",
              border: "linear-gradient(#e66465, #9198e5)",
              alignItems: "left",
              width: 140,
              height: 140,
            }}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => handleSelectedFile(e.target.files)}
            id="account-settings-upload-image"
          />
        </Box>
        <BaseCard title="Information">
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  label="No"
                  id="no"
                  value={user.userNo}
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
                  value={user.userName}
                  placeholder="Enter your username"
                  onChange={(e) =>
                    handleFieldChange("userName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextFieldWithLabel
                  type="password"
                  label="Password"
                  id="password"
                  value={user.userPassword}
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
                  value={user.userPhoneNum}
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
                  value={user.userSex}
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
                  value={user.userStatus}
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
                <CustomTextFieldWithLabel
                  type="email"
                  label="Email"
                  id="email"
                  value={user.userEmail}
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
                  value={user.userAddress}
                  placeholder="Enter your address"
                  onChange={(e) =>
                    handleFieldChange("userAddress", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  id="birthday"
                  label="Date of Birth"
                  value={user.userBirthday ? dayjs(user.userBirthday) : null}
                  onChange={(newValue) =>
                    handleFieldChange("userBirthday", newValue)
                  }
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  id="role"
                  label="Role"
                  value={
                    appRole.find(
                      (appRole) => appRole.appRoleNo === user.userRoleApp
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
              <Grid item xs={12} sm={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="fb"
                      label="FaceBook"
                      value={user.userFBUrl}
                      onChange={(e) =>
                        handleFieldChange("userFBUrl", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="ins"
                      label="Instagram"
                      value={user.userInStaUrl}
                      onChange={(e) =>
                        handleFieldChange("userInStaUrl", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <CustomTextFieldWithLabel
                      id="tw"
                      label="Twitter"
                      value={user.userTWUrl}
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
                  variant="contained"
                  color="success"
                  onClick={handleOpenConfirmationDialog}
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
            router.back();
          }}
          success={notification.success}
          title={notification.title}
        />
      </>
    </DashboardCard>
  );
};

export default UserCreatePage;
