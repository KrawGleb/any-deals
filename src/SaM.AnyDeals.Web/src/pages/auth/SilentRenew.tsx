import React, { useEffect } from "react";
import userManager from "../../features/api/auth/userService";

export default function SilentRenew() {
  useEffect(() => {
    async function processSilentRenew() {
      await userManager.signinSilentCallback();
    }
    processSilentRenew();
  }, []);

  return <div>Renewing tokens...</div>;
}
