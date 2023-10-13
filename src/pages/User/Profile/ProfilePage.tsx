import { Button, ButtonProps, Grid, styled, Stack } from "@mui/material";

import { useEffect, useState, useMemo, useCallback } from "react";
import UserService from "@/service/Service/User/UserService";
import AuthService from "@/service/Service/Authentication/AuthService";
import {
  mapObjectProperties,
  convertJsonToList,
  dateConvertExport,
} from "@/service/Helper/helper";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";
import IntroductionCard from "../Share/Introduction";
import Media from "../Share/Media";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import NewsService from "@/service/Service/News/NewsService";
import NewsItem from "@/pages/News/NewsItem";

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

interface NewsItem {
  id: string;
  title: any;
  content: string;
  postDate: string;
  typeID: string;
  backgroundUrl: string;
  createDate: string;
  lastUpdatedate: string;
  lastUpdateby: string;
  countView: string;
}

const mapToNews = (item: any) => {
  return {
    id: item.nnId.toString(),
    title: item.nnTitle.toString(),
    content: item.nnContent,
    postDate: item.nnPostDate,
    typeID: item.nTypeId.toString(),
    backgroundUrl: item.nnUrl,
    createDate: item.nnCreateDate,
    lastUpdatedate: item.nnLastUpdateDate,
    lastUpdateby: item.nnLastUpdateBy,
    countView: item.nnCountView.toString(),
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
  const [menuItems, setMenuItems] = useState<NewsItem[]>([]);
  const newsService = useMemo(() => NewsService(), []);
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const userService = useMemo(() => UserService(), []);
  const auth = useMemo(() => AuthService(), []);

  useEffect(() => {
    const fetchUserData = async () => {
      await userService
        .getUserByNo(auth.getUserNo())
        .then((res) => {
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
      await newsService
        .getNewsByUserNo(auth.getUserNo())
        .then((res) => {
          console.log(res);
          setMenuItems(convertJsonToList(res.response.data, mapToNews));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    };

    fetchUserData();
  }, [auth, newsService, userService]);

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
              router.push("/user/userSettingProfile");
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
        <Grid container spacing={12}>
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
            <Grid container spacing={2}>
              {menuItems.map((news, index) => (
                <Grid item key={index} xs={12} sm={12} md={12}>
                  <NewsItem
                    News={{
                      backGroundUrl: null,
                      userImageUrl: news.backgroundUrl,
                      countView: news.countView,
                      title: news.title,
                      content: news.content,
                      datePost: dateConvertExport(
                        news.postDate
                      ).toLocaleString(),
                      totalCommnet: news.countView,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    </DashboardCard>
  );
};

export default ProfilePage;
