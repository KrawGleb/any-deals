import "./SignIn.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import PrimaryButton from "../../components/common/PrimaryButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),

  password: yup.string().required("Password is a required field"),
});

export default function SignIn() {
  const navigateToHome = () => (window.location.href = "/");
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post("/api/auth/login", data)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div className="signin">
      <div className="back-line">
        <div className="line" onClick={navigateToHome}>
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
