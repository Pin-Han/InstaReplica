declare const crypto: any;
declare const promisify: any;
declare const jwt: any;
declare const catchAsync: any;
declare const User: any;
interface InterfaceSignup {
    body: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
    };
}
declare const signToken: (id: string) => any;
declare const createSendToken: (user: any, statusCode: number, res: any) => void;
