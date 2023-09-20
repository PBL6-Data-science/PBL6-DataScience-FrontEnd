import PageContainer from "@/customize/components/container/PageContainer";
import LoginForm from "./LoginForm";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Image from "next/image";
import Logo from "@/customize/Layout/Shared/Logo";
const LoginPage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
            top: 0, // Dịch ảnh lên trên
            left: 0,
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh", position: "relative", left: "-5%" }}
        >
          <Grid item display="flex" justifyContent="center" alignItems="center">
            <Image
              src={`${basePath}/assets/background/login.svg`}
              alt="Your Image"
              width={765}
              height={482}
              layout="responsive"
              style={{
                borderRadius: "16px",
              }}
              priority
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "100%",
                borderRadius: "16px",
                marginLeft: "32px",
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  marginTop={"16px"}
                >
                  <Grid item>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Typography
                        color={"Highlight"}
                        gutterBottom
                        variant={"h6"}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign={"center"}
                      >
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <LoginForm />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default LoginPage;
