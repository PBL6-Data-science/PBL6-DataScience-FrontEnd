import React, { ElementType, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Stack,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import BaseCard from "@/customize/components/shared/BaseCard";
import { IconArticle, IconFolderSearch } from "@tabler/icons-react";
import TinyMCEEditor from "@/customize/components/customer/TinyMCEEditor";

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

interface IntroductionCardProps {
  title: string;
}

const PostCard: React.FC<IntroductionCardProps> = ({ title }) => {
  const [content, setContent] = useState("");
  const prevContentRef = useRef("");

  const handleEditorChange = (newContent: any) => {
    prevContentRef.current = content;
    setContent(newContent);
  };

  return (
    <>
      <BaseCard title={title}>
        <>
          <TinyMCEEditor initialValue={content} onChange={handleEditorChange} />
          <Stack
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
            direction="row"
            mt={3}
          >
            <Box>
              <IconButton size="large" aria-label="menu" color="inherit">
                <IconFolderSearch width={20} />
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ ml: 1 }}
                >
                  Upload Photo
                </Typography>
              </IconButton>
              <IconButton size="large" aria-label="menu" color="inherit">
                <IconArticle width={20} />
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ ml: 1 }}
                >
                  Article
                </Typography>
              </IconButton>
            </Box>

            <ButtonStyled
              component="label"
              variant="contained"
              htmlFor="account-settings-upload-image"
              sx={{ ml: "auto" }}
            >
              Post
            </ButtonStyled>
          </Stack>
        </>
      </BaseCard>
    </>
  );
};

export default PostCard;
