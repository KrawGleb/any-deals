import { UserManager, UserManagerSettings } from "oidc-client";

const userManagerSettings: UserManagerSettings = {
  client_id: "AnyDealsWeb",
  redirect_uri: `${window.location.origin}/signin-oidc`,
  response_type: "code",
  response_mode: "query",
  scope: "openid profile AnyDealsAPI",
  authority: `${window.location.origin}/identity`,
  post_logout_redirect_uri: `${window.location.origin}/signout-oidc`,
};

const userManager = new UserManager(userManagerSettings);

export async function loadUser() {
  const user = await userManager.getUser();
  console.log("User: ", user);

  localStorage.setItem("userToken", user?.access_token ?? "");

  return user;
}

export const signinRedirect = () => userManager.signinRedirect();

export const signinRedirectCallback = () =>
  userManager.signinRedirectCallback().catch((err) => {
    console.log(err);
  });

export const signoutRedirect = (args?: any) => {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect(args);
};

export const signoutRedirectCallback = () => {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
};

export default userManager;
