import React from "react";
import "./SignIn.scss";
import * as yup from "yup";
import Input from "../../components/common/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequest } from "../../models/api/auth/login-request";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/api/auth/authActions";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),

  password: yup.string().required("Password is a required field"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) =>
    dispatch(loginUser(data as LoginRequest)).then((response) => {
      if (response.payload.succeeded) navigate("/");
    });

  return (
    <div className="signin">
      <div className="back-line">
        <div className="line" onClick={() => navigate("/")}>
          <div className="row">
            <ArrowBackIcon />
          </div>
          <p className="row nav-text prevent-select">Back</p>
        </div>
      </div>
      <div className="signin__content">
        <form
          noValidate
          className="signin__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="signin__title">Authorization</div>

          <div className="form-field form__email">
            <Input
              {...register("email", { required: true })}
              label="Email"
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </div>

          <div className="form-field form__password">
            <Input
              {...register("password", { required: true })}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </div>

          <PrimaryButton type="submit" disabled={!isDirty || !isValid}>
            Login
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
