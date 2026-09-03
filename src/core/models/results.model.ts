import { BaseResponse, PaginationMetadata } from './base.model';

export interface Results<T> extends BaseResponse {
  payload: {
    data: T[];
    metadata: PaginationMetadata;
  };
}
