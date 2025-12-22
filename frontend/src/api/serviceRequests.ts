import { api } from "./client";
import { CreateServiceRequest, PagedResult, ServiceRequest } from "../types/serviceRequest";

export function listRequests(params: {
  page: number;
  pageSize: number;
  status?: number;
  category?: number;
  q?: string;
}) {
  const qs = new URLSearchParams();
  qs.set("page", String(params.page));
  qs.set("pageSize", String(params.pageSize));
  if (params.status !== undefined) qs.set("status", String(params.status));
  if (params.category !== undefined) qs.set("category", String(params.category));
  if (params.q) qs.set("q", params.q);

  return api<PagedResult<ServiceRequest>>(`/api/service-requests?${qs.toString()}`);
}

export function createRequest(payload: CreateServiceRequest) {
  return api<ServiceRequest>("/api/service-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateStatus(id: string, status: number) {
  return api<void>(`/api/service-requests/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}
