import React, { useEffect } from "react";
import { signinRedirectCallback } from "../../features/api/auth/userService";

export default function SignIn() {
  useEffect(() => {
    const signinAsync = async () => {
      await signinRedirectCallback();
    };

    signinAsync();
  }, []);
  return <div>Redirecting....</div>;
}
