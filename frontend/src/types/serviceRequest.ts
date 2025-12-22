export type RequestStatus = 0 | 1 | 2 | 3 | 4;
export type RequestCategory = 0 | 1 | 2 | 3 | 4 | 5;

export interface ServiceRequest {
  id: string;
  category: RequestCategory;
  status: RequestStatus;
  title: string;
  description: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
