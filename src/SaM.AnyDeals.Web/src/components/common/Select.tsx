import { styled, Select, SelectProps } from "@mui/material";
import React, { forwardRef } from "react";

const CustomSelect = styled(Select)<SelectProps>(({ theme }) => ({}));

export const FormSelect = forwardRef(({ children, ...props }: any, ref) => {
  console.log(props);
  return (
    <CustomSelect
      label="Age"
      inputRef={ref}
    >
      {children}
    </CustomSelect>
  );
});

export default FormSelect;
