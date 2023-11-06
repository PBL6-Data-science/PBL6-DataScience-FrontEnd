import type { Metadata } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { styled, Box } from "@mui/material";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import NetworkErrorBoundary from "@/app/error";
import RouteGuard from "./Shared/RouteGuard";
import {
  TablerIconsProps,
  IconLayoutDashboard,
  IconTypography,
  IconCopy,
  IconLogin,
  IconMoodHappy,
  IconUserPlus,
  IconUserCircle,
  IconAperture,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import AuthService from "@/service/Service/Authentication/AuthService";
import MenuService from "@/service/Service/Menu/MenuService";
import { usePathname } from "next/navigation";
import Page404 from "./Shared/NotFound";

export const metadata: Metadata = {
  title: "DUT-Blog aaaa",
  description: "DUT Blog App",
};

const MainWrapper = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled(Box)(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "20px",
  flexDirection: "column",
  width: "100%",
  maxWidth: "100%",
  zIndex: 1,
  backgroundColor: "transparent",
  overflowX: "hidden",
}));
const ContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  borderRadius: "16px",
  width: "99%",
  maxWidth: "100%",
  margin: "8px auto",
}));

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const auth = useMemo(() => AuthService(), []);
  const menu = useMemo(() => MenuService(), []);
  const fetchMenuItems = useCallback(
    async (appRole: string) => {
      try {
        await menu
          .getMenuByRole(appRole)
          .then((res) => {
            setMenuItems((prevUser) => ({
              ...prevUser,
              ...transformJsonToMenuitems(res.response.data),
            }));
          })
          .catch((error) => {
            console.error("Error fetching menu items:", error);
          });
      } catch (error) {
        console.error("Error fetching menu items:", error);
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

  return (
    <NetworkErrorBoundary>
      <RouteGuard>
        <MainWrapper className="mainwrapper">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
            menuItems={menuItems}
          />
          <PageWrapper className="page-wrapper">
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            <ContentWrapper>
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ padding: "1px", minHeight: "calc(100vh - 170px)" }}>
                {children}
              </Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </ContentWrapper>
            <Footer />
          </PageWrapper>
        </MainWrapper>
      </RouteGuard>
    </NetworkErrorBoundary>
  );
}
