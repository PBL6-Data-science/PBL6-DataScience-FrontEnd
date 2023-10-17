import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconFileDescription,
  IconUserCheck,
  IconUserCircle,
} from "@tabler/icons-react";

import { usePathname } from "next/navigation";
import { storage } from "@/service/Helper/fibase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import BlankCard from "@/customize/components/shared/BlankCard";
import theme from "@/ultils/theme";

const StyledGrid = styled(Grid)`
  margin-top: ${theme.spacing(-12)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: ${theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }
`;

interface ProfileCardProps {
  basePath: string;
  userProfile: {
    userName: string;
    userImageUrl: string | null;
    userFBUrl: string | null;
    userInStaUrl: string | null;
    userTWUrl: string | null;
    userRoleApp: string;
    userCountNews: number;
    userCountNewsFake: number;
    userCountNewsReal: number;
  };
  onFieldChange?: (fieldName: string, value: string | null) => void;
}

const Media: React.FC<ProfileCardProps> = ({
  basePath,
  userProfile,
  onFieldChange,
}) => {
  const pathname = usePathname();
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState<number>(0);
  const isSettingPage = pathname === "/user/userSettingProfile";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSelectedFile = (files: FileList | null) => {
    console.log("aa");
    if (files && files.length > 0 && files[0].size < 1000000000000000000000) {
      const imageFile = files[0];
      if (files[0]) {
        const name = imageFile.name;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        setIsUploading(true);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUpload(progress);
          },
          (error) => {
            setIsUploading(false);
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              if (onFieldChange) {
                onFieldChange("userImageUrl", url);
              } else {
                alert("Can't upload image to update avatar");
              }
            });
          }
        );
        uploadTask.then(() => {
          setIsUploading(false);
          setProgressUpload(0);
        });
      } else {
      }
      setImageFile(files[0]);
    } else {
      alert("File size too large or no file selected");
    }
  };
  return (
    <BlankCard>
      <>
        <Box>
          <CardMedia
            component="img"
            alt="Cover Photo"
            height="470"
            image={`${basePath}/assets/image/users/coverImage.png`}
            sx={{
              borderRadius: "16px",
              border: "4px solid #adadad",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "-60px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(#e66465, #9198e5)",
                borderRadius: "50%",
                width: 160,
                height: 160,
                padding: 6,
                cursor: isSettingPage ? "pointer" : "default",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={
                  userProfile?.userImageUrl ??
                  `${basePath}/assets/image/users/user.jpg`
                }
                sx={{
                  width: 150,
                  height: 150,
                }}
                onClick={handleAvatarClick}
              />
            </Box>
            <Typography variant="h4" gutterBottom mt={2}>
              {userProfile?.userName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {userProfile?.userRoleApp}
            </Typography>
          </Box>
          {isSettingPage && (
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => handleSelectedFile(e.target.files)}
              id="account-settings-upload-image"
            />
          )}
        </Box>

        <Grid
          container
          spacing={8}
          sx={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Grid item xs={12} md={6}>
            <StyledGrid container pr={[0, 8]} pl={[0, 4]}>
              <Grid item xs={4}>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={1}
                  direction="column"
                >
                  <IconFileDescription width={20} />
                  <Typography gutterBottom variant={"h6"}>
                    {userProfile?.userCountNews}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={"center"}
                  >
                    Count post
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  direction="column"
                >
                  <IconUserCircle width={20} />
                  <Typography gutterBottom variant={"h6"}>
                    {userProfile?.userCountNewsFake}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={"center"}
                    sx={{
                      overflowWrap: "break-word", // Add this line to handle overflow
                    }}
                  >
                    Count Fake News
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  direction="column"
                >
                  <IconUserCheck width={20} />
                  <Typography gutterBottom variant={"h6"}>
                    {userProfile?.userCountNewsReal}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={"center"}
                    sx={{
                      overflowWrap: "break-word", // Add this line to handle overflow
                    }}
                  >
                    Count Real News
                  </Typography>
                </Stack>
              </Grid>
            </StyledGrid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                alignItems="center"
                justifyContent="center"
                mt={-12}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "auto",
                    padding: "16px",
                    flexDirection: "row",
                    gap: "16px",
                  }}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      window.open(
                        userProfile.userFBUrl ? userProfile.userFBUrl : "#",
                        "_blank"
                      );
                    }}
                  >
                    <IconBrandFacebook width={40} height={30} />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      window.open(
                        userProfile.userInStaUrl
                          ? userProfile.userInStaUrl
                          : "#",
                        "_blank"
                      );
                    }}
                  >
                    <IconBrandInstagram width={40} height={30} />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      window.open(
                        userProfile.userTWUrl ? userProfile.userTWUrl : "#",
                        "_blank"
                      );
                    }}
                  >
                    <IconBrandTwitter width={40} height={30} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    </BlankCard>
  );
};

export default Media;
