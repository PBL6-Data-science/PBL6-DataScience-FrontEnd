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

const RegisterForm = () => {
  const [no, setNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const validateField = (field: string, message: any) =>
    !field || field === "" ? { msg: message, success_flg: false } : null;

  const handleValidation = () => {
    let No = no;
    let Password = password;
    let ConfirmPassword = confirmPassword;

    const usernameError = validateField(No, "Please enter username.");
    const passwordError = validateField(Password, "Please enter password.");
    const confirmPasswordError = validateField(
      ConfirmPassword,
      "Please confirm password."
    );

    if (usernameError || passwordError || confirmPasswordError) {
      return usernameError || passwordError || confirmPasswordError;
    }

    if (Password !== ConfirmPassword) {
      return {
        msg: "Password and Confirm Password do not match.",
        success_flg: false,
      };
    }

    return {
      success_flg: true,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation: { msg?: any; success_flg: boolean } | null =
      handleValidation();

    if (validation && !validation.success_flg) {
      setAlertMessage(validation.msg ? validation.msg : "");
      setShowAlert(true);
      return;
    } else {
      await auth
        .register(no, name, password, confirmPassword)
        .then((res) => {
          router.push("/login");
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
              label="Name"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
          </Box>
          <Box>
            <CustomTextFieldWithLabel
              type="password"
              label="Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </Box>
          <Box>
            <CustomTextFieldWithLabel
              type="password"
              label="Confirm Password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
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
                marginRight: "22px",
                textDecoration: "none",
              }}
            >
              Already have an Account?
            </Typography>
            <Typography
              onClick={() => {
                router.push("/login");
              }}
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              Sign In?
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterForm;
