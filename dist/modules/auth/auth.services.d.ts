export declare const authServices: {
    sendSignupUserIntoDB: (Payload: Record<string, unknown>) => Promise<any>;
    sendSigninUserIntoDB: (email: string, password: string) => Promise<{
        token: string;
        user: any;
    }>;
};
//# sourceMappingURL=auth.services.d.ts.map