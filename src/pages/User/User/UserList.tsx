import CustomTable from "@/customize/components/customer/CustomTable";
import NotificationCard from "@/customize/components/customer/Notification";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import { convertJsonToList, dateConvertExport } from "@/service/Helper/helper";
import UserService from "@/service/Service/User/UserService";
import { Button, ButtonProps, Stack, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const mapToUser = (item: any) => {
  const formatDateString = (dateString: string) => {
    return dateString ? dateConvertExport(dateString).toLocaleString() : null;
  };
  return {
    userNo: item.userNo || "",
    userName: item.userName || "",
    userPassword: item.userPassword || "",
    userSex:
      item.userSex === 1 ? "Male" : item.userSex === 2 ? "Female" : "None",
    userPhoneNum: item.userPhoneNum || "",
    userEmail: item.userEmail || "",
    userBirthday: item.userBirthday ? new Date(item.userBirthday) : null,
    userAddress: item.userAddress || "",
    userImageUrl: item.userImageUrl || null,
    userFBUrl: item.userFBUrl || null,
    userInStaUrl: item.userInStaUrl || null,
    userTWUrl: item.userTWUrl || null,
    userStatus: item.userStatus || 0,
    userRoleApp: item.userRoleApp || 0,
    userCreateDate: item.userCreateDate ? new Date(item.userCreateDate) : null,
    userLastUpdateDate: item.userLastUpdateDate
      ? new Date(item.userLastUpdateDate)
      : null,
    usercountNews: item.usercountNews || 0,
    userCountNewsFake: item.userCountNewsFake || 0,
    userCountNewsReal: item.userCountNewsReal || 0,
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
  userFBUrl: string | null;
  userInStaUrl: string | null;
  userTWUrl: string | null;
  userStatus: number;
  userRoleApp: number;
  userCreateDate: Date | null;
  userLastUpdateDate: Date | null;
  usercountNews: number;
  userCountNewsFake: number;
  userCountNewsReal: number;
}

const UserListPage = () => {
  const [userItems, setUserItems] = useState<User[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const userService = useMemo(() => UserService(), []);
  const router = useRouter();
  const UserHeaders = [
    { label: "No", field: "userNo", width: "130px", centered: true },
    { label: "User Name", field: "userName", width: "130px", centered: true },
    {
      label: "User Sex",
      field: "userSex",
      width: "170px",
      centered: true,
    },
    {
      label: "Phone Number",
      field: "userPhoneNum",
      width: "170px",
      centered: true,
    },
    {
      label: "Address",
      field: "userAddress",
      width: "170px",
      centered: true,
    },
    {
      label: "Email",
      field: "userEmail",
      width: "170px",
      centered: true,
    },
    {
      label: "Status",
      field: "userStatus",
      width: "170px",
      centered: true,
    },
    {
      label: "Role App",
      field: "userRoleApp",
      width: "170px",
      centered: true,
    },
  ];
  const fetchNewsItems = useCallback(async () => {
    try {
      await userService
        .getAllUser()
        .then((res) => {
          setUserItems(convertJsonToList(res.response.data, mapToUser));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    } catch (error: any) {
      if (error.status === 401) {
      }
    }
  }, [userService]);

  useEffect(() => {
    fetchNewsItems();
  }, [fetchNewsItems]);

  const handleItemSelected = (itemId: any) => {
    setSelectedItemId(itemId);
  };

  const handleItemUpdate = () => {
    router.push(`/user/userEdit/${selectedItemId}`);
  };

  const handleItemDelete = async () => {
    try {
      await userService
        .deleteUser(selectedItemId)
        .then((res) => {
          setNotification({
            open: true,
            success: true,
            title: "Delete Successfull",
          });
        })
        .catch((error) => {
          setNotification({ open: true, success: false, title: "Delete Fail" });
        });
    } catch (error: any) {
      if (error.status === 401) {
      }
    }
  };

  console.log(selectedItemId);
  return (
    <DashboardCard title="User Management">
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
            color="success"
            variant="outlined"
            component="label"
            sx={{ ml: "auto" }}
            onClick={() => {
              router.push("/user/userCreate");
            }}
          >
            Create User
          </ResetButtonStyled>
        </Stack>
        <CustomTable
          data={userItems}
          tableHeaders={UserHeaders}
          title="Data User"
          identifierField="userNo"
          onItemSelected={handleItemSelected}
          onDelete={handleItemDelete}
          onUpdate={handleItemUpdate}
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
export default UserListPage;
