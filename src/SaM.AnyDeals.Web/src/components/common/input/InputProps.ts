import { StandardTextFieldProps } from "@mui/material";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface InputProps extends StandardTextFieldProps {
  helperMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
