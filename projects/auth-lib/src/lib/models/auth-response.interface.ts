export interface IAuthResponseInterface<T = any> {
    status: boolean | number;
    code: number;
    message?: string;
    payload?: T;
    [key: string]: any;
}