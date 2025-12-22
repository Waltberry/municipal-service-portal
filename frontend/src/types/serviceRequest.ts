export type RequestStatus = 0 | 1 | 2 | 3; // align to backend enum values
export type RequestCategory = 0 | 1 | 2 | 3 | 4; // align to backend enum values

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  address?: string | null;
  status: RequestStatus;
  category: RequestCategory;
  createdAt: string;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  address?: string | null;
  category: RequestCategory;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
