import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "110px",
  width: "230px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <LinkStyled href="/">
      <Image
        src={`${basePath}/assets/image/logo/logo.jpg`}
        alt="logo"
        width={230}
        height={110}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
