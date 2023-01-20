export interface AuthState {
    userInfo: {
        id?: string;
        username?: string;
        isAdmin?: boolean;
        token?: string;
    };
    userToken: string | null;
    error: any;
    succeeded: boolean;
}