// components/withAuthorization.tsx
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthService from "@/service/Service/Authentication/AuthService";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  navlabel?: boolean;
  subheader?: string;
}

interface WithAuthorizationProps {
  menuItems: MenuItem[];
}

const withAuthorization = (
  WrappedComponent: FC,
  { menuItems }: WithAuthorizationProps
): FC => {
  const WithAuthorization: FC = (props) => {
    const router = useRouter();
    const [userPermissions, setUserPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if permissions have been loaded and filter menu items based on user permissions
      if (!loading) {
        const allowedMenuItems = menuItems.filter((item) =>
          userPermissions.includes(item.id)
        );

        // Check if the current route is allowed
        const currentRouteAllowed = allowedMenuItems.some(
          (item) => router.pathname === item.href
        );

        // If the user doesn't have access to the current route, redirect
        if (!currentRouteAllowed) {
          router.replace("/restricted");
        }
      }
    }, [userPermissions, loading, router]);

    return <>{loading ? "Loading..." : <WrappedComponent {...props} />}</>;
  };

  return WithAuthorization;
};

export default withAuthorization;
