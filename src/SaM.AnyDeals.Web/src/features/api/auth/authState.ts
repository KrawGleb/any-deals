import { User } from "oidc-client";

export interface AuthState {
  user: {
    id_token: string;
    access_token: string;
    profile: {
      sub: string;
      preferred_username: string;
    };
  } | null;
  isLoadingUser: boolean;
}
