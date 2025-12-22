import { useEffect, useState } from "react";
import { createRequest, listRequests, updateStatus } from "../api/serviceRequests";
import { ServiceRequestForm } from "../components/ServiceRequestForm";
import { ServiceRequestTable } from "../components/ServiceRequestTable";
import { Pagination } from "../components/Pagination";
import { PagedResult, ServiceRequest } from "../types/serviceRequest";

export function ServiceRequestsPage() {
  const [data, setData] = useState<PagedResult<ServiceRequest> | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setErr(null);
    const res = await listRequests({ page, pageSize, status, category, q: q.trim() || undefined });
    setData(res);
  };

  useEffect(() => { load(); }, [page, pageSize, status, category]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, display: "grid", gap: 16 }}>
      <h2>Municipal Service Requests</h2>

      <ServiceRequestForm onSubmit={async (payload) => { await createRequest(payload); setPage(1); await load(); }} />

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          placeholder="Search title/description..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => { setPage(1); load(); }}>Search</button>

        <select value={status ?? ""} onChange={(e) => setStatus(e.target.value === "" ? undefined : Number(e.target.value))}>
          <option value="">All Status</option>
          <option value="0">New</option>
          <option value="1">InProgress</option>
          <option value="2">Resolved</option>
          <option value="3">Closed</option>
        </select>

        <select value={category ?? ""} onChange={(e) => setCategory(e.target.value === "" ? undefined : Number(e.target.value))}>
          <option value="">All Categories</option>
          <option value="0">General</option>
          <option value="1">Road</option>
          <option value="2">Waste</option>
          <option value="3">Water</option>
          <option value="4">Parks</option>
        </select>
      </div>

      {err && <div style={{ color: "crimson" }}>{err}</div>}

      {data && (
        <>
          <ServiceRequestTable
            items={data.items}
            onUpdateStatus={async (id, s) => { await updateStatus(id, s); await load(); }}
          />
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
