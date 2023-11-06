import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import BaseCard from "@/customize/components/shared/BaseCard";
import {
  IconMail,
  IconPhoneCall,
  IconBrandGoogleMaps,
  IconCake,
  IconGenderTransgender,
} from "@tabler/icons-react";
import dayjs from "dayjs";

interface IntroductionCardProps {
  title?: string;
  userProfile: {
    userName: string | null;
    userEmail: string | null;
    userPhoneNum: string;
    userAddress: string;
    userBirthday: string | null;
    userSex: number;
  };
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({
  title,
  userProfile,
}) => {
  return (
    <>
      <BaseCard title={title}>
        <>
          <Typography gutterBottom variant={"subtitle1"} mb={3}>
            {userProfile?.userName}
          </Typography>
          <Box ml={3}>
            <Stack
              alignItems="center"
              justifyContent="left"
              spacing={3}
              direction="row"
              mb={3}
            >
              <IconMail style={{ flexShrink: 0, width: "20px" }} />
              <Typography gutterBottom variant={"h6"}>
                {userProfile?.userEmail}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="left"
              spacing={3}
              direction="row"
              mb={3}
            >
              <IconPhoneCall style={{ flexShrink: 0, width: "20px" }} />
              <Typography gutterBottom variant={"h6"}>
                {userProfile?.userPhoneNum}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="left"
              spacing={3}
              direction="row"
              mb={3}
            >
              <IconBrandGoogleMaps style={{ flexShrink: 0, width: "20px" }} />
              <Typography gutterBottom variant={"h6"}>
                {userProfile?.userAddress}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="left"
              spacing={3}
              direction="row"
              mb={3}
            >
              <IconCake style={{ flexShrink: 0, width: "20px" }} />
              <Typography gutterBottom variant={"h6"}>
                {userProfile?.userBirthday
                  ? dayjs(userProfile?.userBirthday).format("MMMM D, YYYY")
                  : null}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="left"
              spacing={3}
              direction="row"
            >
              <IconGenderTransgender style={{ flexShrink: 0, width: "20px" }} />
              <Typography gutterBottom variant="h6">
                {userProfile?.userSex === 0 ? "Male" : "Female"}
              </Typography>
            </Stack>
          </Box>
        </>
      </BaseCard>
    </>
  );
};

export default IntroductionCard;
