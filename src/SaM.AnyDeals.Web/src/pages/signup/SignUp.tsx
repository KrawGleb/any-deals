import "./SignUp.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterRequest } from "../../models/api/auth/registerRequest";
import { loginUser, registerUser } from "../../features/api/auth/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { LoginRequest } from "../../models/api/auth/loginRequest";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^([^0-9]*)$/, "Name should not contain numbers")
    .required("Name is a required field"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),

  password: yup.string().required("Password is a required field"),

  repeatPassword: yup
    .string()
    .required("Repeat password is a required field")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(registerUser(data as RegisterRequest)).then((response: any) => {
      if (response.payload.succeeded) {
        dispatch(loginUser(data as LoginRequest)).then((response: any) => {
          if (response.payload.succeeded) navigate("/");
        });
      }
    });
  };

  return (
    <div className="signup">
      <div className="back-line">
        <div className="line" onClick={() => navigate("/")}>
          <div className="row">
            <ArrowBackIcon />
          </div>
          <p className="row nav-text prevent-select">Back</p>
        </div>
      </div>
      <div className="signup__content">
        <form
          noValidate
          className="signup__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="signup__title">Registration</div>
          <div className="signup__subtitle">
            Please, fill in your information
          </div>

          <div className="form-field form__name">
            <Input
              {...register("username", { required: true })}
              label="Name"
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
          </div>

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

          <div className="form-field form__repeat-password">
            <Input
              {...register("repeatPassword", { required: true })}
              label="Repeat password"
              type="password"
              error={!!errors.repeatPassword}
              helperText={errors?.repeatPassword?.message}
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
