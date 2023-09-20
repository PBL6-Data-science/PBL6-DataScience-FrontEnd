import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  position: "relative",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
  "&:before": {
    position: "absolute",
    bottom: "-2px",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: theme.palette.grey[300],
  },
  "& .MuiInputLabel-root": {
    position: "absolute",
    left: "-4px",
    backgroundColor: theme.palette.background.paper,
    padding: "0 4px",
  },
}));

interface CustomSelectProps {
  id: string;
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  fullWidth = false,
  readOnly = false,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <CustomFormControl fullWidth={fullWidth}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
};

export default CustomSelect;
