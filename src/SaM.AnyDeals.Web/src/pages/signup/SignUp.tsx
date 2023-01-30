import React, { useEffect } from "react";
import { signoutRedirectCallback } from "../../features/api/auth/userService";

export default function SignUp() {
  useEffect(() => {
    const signoutAsync = async () => {
      await signoutRedirectCallback();
    };

    signoutAsync();
  }, []);

  return <div>Redirecting...</div>;
}
