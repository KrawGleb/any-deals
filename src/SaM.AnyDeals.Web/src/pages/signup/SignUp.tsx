import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signoutRedirectCallback } from "../../features/api/auth/userService";

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const signoutAsync = async () => {
      await signoutRedirectCallback();
    };

    signoutAsync();
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Redirecting...</div>;
}
