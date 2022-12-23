import { styled, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
}));

export const Input = forwardRef((props: any, ref) => {
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

export default Input;
