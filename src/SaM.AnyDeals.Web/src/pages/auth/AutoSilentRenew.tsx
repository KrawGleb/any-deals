import React, { useEffect } from "react";
import userManager from "../../features/api/auth/userService";

export default function AutoSilentRenew() {
  useEffect(() => {
    async function renewTokens() {
      try {
        const user = await userManager.getUser();
        if (user && user.expires_in < 60) {
          await userManager.signinSilent();
        }
      } catch (err) {
        console.error("Error while renewing tokens:", err);
      }
    }

    renewTokens();

    const renewInterval = setInterval(renewTokens, 60 * 1000);

    return () => clearInterval(renewInterval);
  }, []);

  return null;
}
