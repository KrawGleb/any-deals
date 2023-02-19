import {
  Control,
  FieldErrorsImpl,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export interface AreaProps {
  control: Control<any, any>;
  errors: Partial<FieldErrorsImpl<any>>;
  register?: UseFormRegister<any>;
  watch?: UseFormWatch<any>;
}
