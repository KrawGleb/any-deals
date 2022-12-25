import { styled, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    ".MuiInputBase-input": {
      padding: "8.5px 14px",
    },
  },
  "& .MuiFormLabel-root": {
    transform: "translate(14px, 9px) scale(1)",
  },
}));

export const FiltersTextField = forwardRef((props: any, ref) => {
  return (
    <CustomTextField
      variant="outlined"
      margin="none"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});
