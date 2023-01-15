import "./FakeSelect.scss";
import React, { forwardRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "../Input";
import { TextFieldProps } from "@mui/material";

export const FakeSelect = forwardRef(
  ({ ...props }: TextFieldProps | any, ref) => {
    return (
      <div className="fake-select">
        <Input
          ref={ref}
          {...props}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment disableTypography position="end">
                <ArrowDropDownIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
);

export default FakeSelect;
