export interface AuthState {
    userInfo: {
        username?: string;
    };
    userToken: string | null;
    error: any;
    succeeded: boolean;
}