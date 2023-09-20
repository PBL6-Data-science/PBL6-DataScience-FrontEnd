import AuthService from "@/service/Service/Authentication/AuthService";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const publicPaths = ["/", "/login"];

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = AuthService(); // Assuming AuthService is a function

  useEffect(() => {
    const authCheck = async () => {
      setLoading(true);

      if (!auth.getToken() && !publicPaths.includes(pathname ?? "")) {
        setAuthorized(false);
        void router.push("/login");
      } else {
        setAuthorized(true);
      }

      setLoading(false);
    };
    authCheck();
  }, [router, auth, pathname]);

  return (
    <>
      {authorized && !loading ? (
        <>{children}</>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
        >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <CircularProgress size={80} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography color="textSecondary" gutterBottom variant="h6">
                  You are not logged in or there was a login error. Please log
                  in again.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default RouteGuard;
