import {
  Box,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from "@mui/material";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/service/Service/Authentication/AuthService";
import CustomTextFieldWithLabel from "@/customize/components/customer/CustomTextField";

const LoginForm = () => {
  const [no, setNo] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const auth = AuthService();
  const router = useRouter();

  const handleNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNo(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleValidation = () => {
    let No = no;
    let Password = password;

    if (!No || No == "") {
      return {
        msg: "Please enter username. ",
        sucess_flg: false,
      };
    }
    if (!Password || Password == "") {
      return {
        msg: "Please enter password. ",
        sucess_flg: false,
      };
    }
    return {
      sucess_flg: true,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation = handleValidation();

    if (!validation.sucess_flg) {
      setAlertMessage(validation.msg ? validation.msg : "");
      setShowAlert(true);
      return;
    } else {
      await auth
        .login(no, password)
        .then((res) => {
          router.push("/");
        })
        .catch((error) => {
          setAlertMessage(error.message);
          setShowAlert(true);
        });
    }
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "32px",
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction="column" spacing={2} style={{ width: "350px" }}>
          <Box>
            <CustomTextFieldWithLabel
              label="No"
              id="no"
              value={no}
              onChange={handleNoChange}
              placeholder="Enter your username"
            />
          </Box>
          <Box>
            <CustomTextFieldWithLabel
              type="password"
              label="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </Box>
          {showAlert && (
            <Alert
              variant="outlined"
              severity="error"
              onClose={handleAlertClose}
              sx={{ marginTop: "18px" }}
            >
              {alertMessage}
            </Alert>
          )}
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
          <Box>
            <Button
              color="primary"
              size="large"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <Typography
              fontWeight="500"
              sx={{
                textDecoration: "none",
              }}
            >
              New to DUT Blog?
            </Typography>
            <Typography
              onClick={() => {
                router.push("/register");
              }}
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              Create an account?
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default LoginForm;
