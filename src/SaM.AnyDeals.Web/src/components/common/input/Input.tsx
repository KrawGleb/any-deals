import { styled, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { InputProps } from "./InputProps";

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

export const Input = forwardRef(
  ({ children, helperMessage, ...props }: InputProps, ref) => {
    return (
      <CustomTextField
        variant="outlined"
        margin="none"
        inputRef={ref}
        fullWidth
        helperText={helperMessage as ReactNode}
        {...props}
      >
        {children}
      </CustomTextField>
    );
  }
);

export default Input;
