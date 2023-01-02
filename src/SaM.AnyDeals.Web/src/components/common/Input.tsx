import { styled, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    padding: "0px",
  },
  ".MuiFormLabel-root": {
    top: "-7px",
  },
  ".Mui-focused, .MuiInputLabel-shrink": {
    top: "0px",
  },
  "& .MuiInputBase-input": {
    padding: "10px",
  },
}));

export const Input = forwardRef(({ children, ...props }: any, ref) => {
  return (
    <CustomTextField
      variant="outlined"
      margin="none"
      inputRef={ref}
      fullWidth
      {...props}
    >
      {children}
    </CustomTextField>
  );
});

export default Input;
