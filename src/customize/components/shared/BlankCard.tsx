import { Card } from "@mui/material";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Card
      sx={{
        p: 1,
        position: "relative",
        m: 1,
        borderRadius: "16px",
        border: "3px solid #e6f0f7",
      }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
