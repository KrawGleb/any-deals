import { StandardTextFieldProps } from "@mui/material";
import { Control, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface ControlledInputProps extends StandardTextFieldProps {
  control: Control<any, any>;
  name: string;
  label: string;
  helperMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
