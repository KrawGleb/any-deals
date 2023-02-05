import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signinRedirectCallback } from "../../features/api/auth/userService";

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    const signinAsync = async () => {
      await signinRedirectCallback();

      navigate("/");
    };

    signinAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Redirecting....</div>;
}
