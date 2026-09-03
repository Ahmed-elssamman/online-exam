import { EntitySortField, SortOrder } from '@core/enums/main-service.enum';

export interface BaseResponse {
  status: boolean;
  code: number;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiParams {
  page?: number;
  limit?: number;
  sortBy?: EntitySortField;
  sortOrder?: SortOrder;
  immutable?: boolean;
  search?: string;
}
