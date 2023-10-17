import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  IconChevronDown,
  IconListCheck,
  IconMail,
  IconUser,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import AuthService from "@/service/Service/Authentication/AuthService";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [logged, setLogged] = useState(false);
  const isLoggedSetRef = useRef(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const auth = useMemo(() => AuthService(), []);
  const [open, setOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedSetRef.current && auth.getToken()) {
      setLogged((prevLogged) => !prevLogged);
      isLoggedSetRef.current = true;
      const userName = auth.getUserName();
      if (userName) {
        setuserName(userName);
      }
    }
  }, [auth]);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setOpen(false);

    auth.logout();
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/user/userProfile");
  };

  return (
    <>
      {logged ? (
        <Box>
          <IconButton
            size="large"
            aria-label="menu"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl2 === "object" && {
                borderRadius: "9px",
              }),
            }}
            onClick={handleClick2}
          >
            <Avatar
              src={`${basePath}/assets/image/users/user.jpg`}
              alt={"ProfileImg"}
              sx={{
                width: 30,
                height: 30,
              }}
            />
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                alignItems: "center",
                margin: "12px",
              }}
            >
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{ ml: 1 }}
              >
                Hi,
              </Typography>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  ml: 1,
                  marginRight: "12px",
                }}
              >
                {userName}
              </Typography>
              <IconChevronDown width="20" height="20" />
            </Box>
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Message Dropdown */}
          {/* ------------------------------------------- */}
          <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "220px",
                p: 2,
                pb: 2,
                pt: 0,
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <IconUser width={20} />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <IconMail width={20} />
              </ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <IconListCheck width={20} />
              </ListItemIcon>
              <ListItemText>My Tasks</ListItemText>
            </MenuItem>
            <Divider />
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
              >
                <IconLogout width={20} style={{ marginRight: "10px" }} />
                Logout
              </Button>
            </Box>
          </Menu>
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{"Confirm Logout"}</DialogTitle>
            <DialogContent>
              <Alert severity="warning">Are you sure you want to logout?</Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                autoFocus
                color="secondary"
                variant="contained"
              >
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              router.push("/login");
            }}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <IconLogin width={20} style={{ marginRight: "15px" }} />
            Login
          </Button>
        </Box>
      )}
    </>
  );
};

export default Profile;
