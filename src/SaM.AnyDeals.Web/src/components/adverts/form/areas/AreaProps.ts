import { Control, FieldErrorsImpl, UseFormRegister } from "react-hook-form";

export interface AreaProps {
  control: Control<any, any>;
  errors: Partial<FieldErrorsImpl<any>>;
  register?: UseFormRegister<any>;
}
