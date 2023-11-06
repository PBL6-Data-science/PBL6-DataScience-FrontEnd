import React, { useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  IconButton,
  ListItemIcon,
  MenuItem,
} from "@mui/material";

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const Language = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    value: "english",
    label: "English",
    flag: "English.png",
  });

  const languages: LanguageOption[] = [
    { value: "english", label: "English", flag: "English.png" },
    { value: "japanese", label: "Japanese", flag: "Japan.png" },
    { value: "vietnamese", label: "Vietnamese", flag: "Vietnam.png" },
  ];

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
    handleCloseMenu();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", border: "none" }}>
      <IconButton
        size="large"
        color="inherit"
        sx={{
          ...(typeof anchorEl === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleOpenMenu}
      >
        <Avatar
          src={`${basePath}/assets/image/languague/${
            selectedLanguage ? selectedLanguage.flag : "default.png"
          }`}
          alt="Language"
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "220px",
            p: 2,
            pb: 2,
            pt: 0,
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.value}
            onClick={() => handleLanguageSelect(language)}
          >
            <ListItemIcon>
              <Avatar
                src={`${basePath}/assets/image/languague/${language.flag}`}
                alt={`Flag-${language.label}`}
                sx={{
                  width: 30,
                  height: 30,
                  marginRight: 4,
                }}
              />
            </ListItemIcon>
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Language;
