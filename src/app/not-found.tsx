"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  ButtonProps,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const Error = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const router = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={`${basePath}/assets/background/404-error-idea.gif`}
          alt="404"
          width={500}
          height={500}
          style={{ width: "100%", height: "100", maxWidth: "500px" }}
        />
        <Typography align="center" variant="h1" mb={4}>
          Opps!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          This page you are looking for could not be found.
        </Typography>
        <ResetButtonStyled
          color="error"
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </ResetButtonStyled>
      </Container>
    </Box>
  );
};

export default Error;
