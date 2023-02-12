import React from "react";
import { Controller } from "react-hook-form";
import Input from "../input/Input";
import { ControlledInputProps } from "./ControlledInputProps";

export default function ControlledInput({
  control,
  name,
  children,
  ...props
}: ControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input {...props} {...field}>
          {children}
        </Input>
      )}
    />
  );
}
