import React from "react";
import { DatePicker } from "@mui/x-date-pickers"; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { styled } from "@mui/material";

const CustomDatePickerStyle = styled(DatePicker)(({ theme }) => ({
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
    color: theme.palette.text.secondary,
  },
}));
interface CustomDatePickerProps {
  label: string;
  id: string;
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  id,
  value,
  onChange,
  fullWidth = false,
  readOnly = false,
  disabled = false,
  ...rest
}) => {
  const handleChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      onChange(newValue);
    } else {
      onChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePickerStyle
        {...rest}
        value={value ? dayjs(value) : null}
        onChange={(newValue: any) => handleChange(newValue)}
        openTo="year"
        views={["year", "month", "day"]}
        sx={
          fullWidth
            ? {
                width: "100%",
                pointerEvents: readOnly ? "none" : undefined,
              }
            : undefined
        }
        readOnly={readOnly}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
