import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  position: "relative",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", // Adjust the value as per your requirement

    "&:before": {
      position: "absolute",
      bottom: "-8px", // Adjust the value to position the border
      left: 0,
      right: 0,
      height: "2px", // Adjust the height of the border
      backgroundColor: theme.palette.grey[300], // Match the border color
    },
    "& .MuiInputLabel-root": {
      position: "absolute",
      top: "-10px", // Adjust the value to position the label
      left: "16px", // Adjust the value to position the label
      backgroundColor: theme.palette.background.paper, // Match the background color
      padding: "0 4px", // Add some padding to the label
    },
  },
}));

interface CustomTextFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const CustomTextFieldWithLabel: React.FC<CustomTextFieldProps> = ({
  label,
  readOnly,
  disabled,
  ...props
}) => {
  const inputProps = {
    readOnly,
    disabled,
  };
  return (
    <div>
      <CustomTextField
        variant="outlined"
        fullWidth
        {...props}
        label={label}
        InputProps={inputProps}
      />
    </div>
  );
};

export default CustomTextFieldWithLabel;
