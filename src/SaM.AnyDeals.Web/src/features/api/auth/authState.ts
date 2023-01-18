export interface AuthState {
    userInfo: {
        username?: string;
        isAdmin?: boolean;
        token?: string;
    };
    userToken: string | null;
    error: any;
    succeeded: boolean;
}