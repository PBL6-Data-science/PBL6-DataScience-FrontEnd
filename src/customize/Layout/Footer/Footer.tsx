"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ pt: 1, textAlign: "center" }}>
      <Typography>
        © {new Date().getFullYear()} All rights reserved by{" "}
        <Link href="https://www.facebook.com/profile.php?id=100012824806286">
          Hung-DUT
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
