import React, { useEffect, useRef } from "react";
import { User, UserManager } from "oidc-client";
import { useDispatch } from "react-redux";
import {
  userExpired,
  userExpiring,
  userFound,
  userSignedOut,
} from "../../store/slices/authSlice";

type AuthProviderProps = {
  userManager: UserManager;
  children: any;
};

export default function AuthProvider({
  children,
  userManager: manager,
}: AuthProviderProps) {
  const dispatch = useDispatch();
  let userManager = useRef<UserManager>();

  useEffect(() => {
    userManager.current = manager;
    const onUserLoaded = (user: User) => {
      console.log("User loaded: ", user);
      dispatch(userFound({ ...user } as any));
      localStorage.setItem("userToken", user?.access_token ?? "");
    };
    const onUserUnloaded = () => {
      localStorage.setItem("userToken", "");
      console.log("User unloaded");
    };
    const onAccessTokenExpiring = () => {
      dispatch(userExpiring());
      console.log("User token expiring");
    };
    const onAccessTokenExpired = () => {
      //dispatch(userExpired());
      console.log("User token expired");
    };
    const onUserSignedOut = () => {
      dispatch(userSignedOut());
      console.log("User signed out");
    };

    userManager.current?.events.addUserLoaded(onUserLoaded);
    userManager.current?.events.addUserUnloaded(onUserUnloaded);
    userManager.current?.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.current?.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.current?.events.addUserSignedOut(onUserSignedOut);

    return () => {
      if (userManager && userManager.current) {
        userManager.current.events.removeUserLoaded(onUserLoaded);
        userManager.current.events.removeUserUnloaded(onUserUnloaded);
        userManager.current.events.removeAccessTokenExpiring(
          onAccessTokenExpiring
        );
        userManager.current.events.removeAccessTokenExpired(
          onAccessTokenExpired
        );
        userManager.current.events.removeUserSignedOut(onUserSignedOut);
      }
    };
  }, [manager]);

  return React.Children.only(children);
}
