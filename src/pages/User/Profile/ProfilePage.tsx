import {
  Box,
  Button,
  ButtonProps,
  Grid,
  Typography,
  styled,
  IconButton,
  Stack,
  TextareaAutosize,
} from "@mui/material";

import {
  IconBrandOffice,
  IconArticle,
  IconCake,
  IconBrandGoogleMaps,
  IconPhoneCall,
  IconMail,
  IconFolderSearch,
  IconBriefcase,
  IconGenderTransgender,
} from "@tabler/icons-react";

import { ElementType, useEffect, useState, useMemo } from "react";
import UserService from "@/service/Service/User/UserService";
import AuthService from "@/service/Service/Authentication/AuthService";
import {
  mapObjectProperties,
  convertJsonToList,
} from "@/service/Helper/helper";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";
import IntroductionCard from "../Share/Introduction";
import Media from "../Share/Media";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import PostCard from "../Share/Post";

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const mapToAppRole = (item: any) => {
  return {
    appRoleNo: item.arId.toString(),
    appRoleName: item.arName,
  };
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    userNo: "",
    userName: "",
    userPassword: "",
    userSex: 0,
    userPhoneNum: "",
    userEmail: "",
    userBirthday: null,
    userAddress: "",
    userImageUrl: null,
    userFBUrl: null,
    userInStaUrl: null,
    userTWUrl: null,
    userStatus: 0,
    userRoleApp: 0,
    userCreateDate: null,
    userLastUpdateDate: null,
    usercountNews: 0,
    userCountNewsFake: 0,
    userCountNewsReal: 0,
  });
  const [appRole, setappRole] = useState([
    {
      appRoleNo: "",
      appRoleName: "",
    },
  ]);
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const userService = useMemo(() => UserService(), []);
  const auth = useMemo(() => AuthService(), []);

  useEffect(() => {
    const fetchUserData = async () => {
      await userService
        .getUserByRole(auth.getUserNo())
        .then((res) => {
          console.log(res);
          setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            ...mapObjectProperties(res.response.data, prevUserProfile),
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

  return (
    <DashboardCard title="User Profile">
      <>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          mt={-6}
          mr={1}
          mb={2}
        >
          <ResetButtonStyled
            color="primary"
            variant="outlined"
            component="label"
            sx={{ ml: "auto" }}
            onClick={() => {
              router.push("/user/userSetting");
            }}
          >
            Setting Profile
          </ResetButtonStyled>
        </Stack>

        <Media
          basePath={basePath}
          userProfile={{
            userName: userProfile.userName,
            userImageUrl: userProfile.userImageUrl,
            userFBUrl: userProfile.userFBUrl,
            userInStaUrl: userProfile.userInStaUrl,
            userTWUrl: userProfile.userTWUrl,
            userRoleApp:
              appRole.find(
                (role) => role.appRoleNo === String(userProfile.userRoleApp)
              )?.appRoleName || "",
            userCountNews: userProfile.usercountNews,
            userCountNewsFake: userProfile.userCountNewsFake,
            userCountNewsReal: userProfile.userCountNewsReal,
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <IntroductionCard
              title="Introduction"
              userProfile={{
                userName: userProfile.userName,
                userEmail: userProfile.userEmail,
                userPhoneNum: userProfile.userPhoneNum,
                userAddress: userProfile.userAddress,
                userBirthday: userProfile.userBirthday
                  ? dayjs(userProfile.userBirthday).format("D MMMM, YYYY")
                  : null,
                userSex: userProfile.userSex,
              }}
            ></IntroductionCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <PostCard title="Post News"></PostCard>
          </Grid>
        </Grid>
      </>
    </DashboardCard>
  );
};

export default ProfilePage;
