import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Backdrop, Box, Button, List } from "@mui/material";
import NavGroup from "./NavGroup/NavGroup";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUserCircle,
  TablerIconsProps,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import AuthService from "@/service/Service/Authentication/AuthService";
import MenuService from "@/service/Service/Menu/MenuService";
import NavItem from "./NavItem/index";

const getIcon = (
  iconName: keyof typeof iconMap
): ((props: TablerIconsProps) => JSX.Element) | null => {
  const iconMap = {
    IconLayoutDash: IconLayoutDashboard,
    IconTypography: IconTypography,
    IconCopy: IconCopy,
    IconLogin: IconLogin,
    IconMoodHappy: IconMoodHappy,
    IconUserPlus: IconUserPlus,
    IconUserCircle: IconUserCircle,
    IconAperture: IconAperture,
  };
  const IconComponent = iconMap[iconName];
  return IconComponent || null;
};

interface MenuItem {
  id: string;
  title: any;
  icon: ((props: TablerIconsProps) => JSX.Element) | null;
  href: string;
  navlabel?: boolean;
  subheader?: string;
}

const transformJsonToMenuitems = (jsonArray: any[]): MenuItem[] => {
  return jsonArray.map(
    (item: {
      mnuTitle: any;
      mnuIcon: any;
      mnuHref: string;
      mnuNavlabel: any;
      mnuSubheader: any;
    }) => {
      const menuItem: MenuItem = {
        id: uniqueId(),
        title: item.mnuTitle,
        icon: getIcon(item.mnuIcon),
        href: item.mnuHref ? item.mnuHref.trim() : "",
      };

      if (item.mnuNavlabel) {
        menuItem.navlabel = true;
        menuItem.subheader = item.mnuSubheader;
      }

      return menuItem;
    }
  );
};
interface AppRoleData {
  AppRole: string;
}

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: uniqueId(),
      title: "",
      icon: null,
      href: "",
      navlabel: true,
      subheader: "Home",
    },

    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/user",
    },
  ]);
  const auth = useMemo(() => AuthService(), []);
  const menu = useMemo(() => MenuService(), []);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const fetchMenuItems = useCallback(
    async (appRole: string) => {
      try {
        const apiResponse = await menu.getMenuByRole(appRole).then((res) => {
          const transformedMenuItems = transformJsonToMenuitems(
            res.response.data
          );
          setMenuItems(transformedMenuItems);
        });
      } catch (error: any) {
        if (error.status === 401) {
          setShowAlert(true);
        }
      }
    },
    [menu]
  );

  useEffect(() => {
    const profile = auth.getProfile() as AppRoleData;
    const appRole = profile ? profile.AppRole : "";
    if (appRole) {
      fetchMenuItems(appRole);
    }
  }, [auth, fetchMenuItems]);
  const router = useRouter();

  return (
    <>
      <Box sx={{ px: 3 }}>
        <List sx={{ pt: 0 }} className="sidebarNav" component="div">
          {menuItems.map((item) => {
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={router.toString()}
                  onClick={toggleMobileSidebar}
                />
              );
            }
          })}
        </List>
      </Box>
      <Backdrop open={showAlert} sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Alert severity="error">
            You are not logged in or there was a login error. Please log in
            again.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowAlert(false);
              auth.logout();
              router.push("/login");
            }}
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Backdrop>
    </>
  );
};
export default SidebarItems;
