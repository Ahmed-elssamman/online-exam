import { BaseResponse } from "./base.model";

export interface Result<T> extends BaseResponse {
    payload: T;
}