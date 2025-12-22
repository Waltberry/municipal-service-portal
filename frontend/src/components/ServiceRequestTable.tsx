import { ServiceRequest } from "../types/serviceRequest";

type Props = {
  items: ServiceRequest[];
  onUpdateStatus: (id: string, status: number) => Promise<void>;
};

export function ServiceRequestTable({ items, onUpdateStatus }: Props) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Category</th>
          <th align="left">Status</th>
          <th align="left">Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map((x) => (
          <tr key={x.id} style={{ borderTop: "1px solid #eee" }}>
            <td>{x.title}</td>
            <td>{x.category}</td>
            <td>{x.status}</td>
            <td>{new Date(x.createdAt).toLocaleString()}</td>
            <td>
              <button onClick={() => onUpdateStatus(x.id, 1)}>Set InProgress</button>{" "}
              <button onClick={() => onUpdateStatus(x.id, 2)}>Set Resolved</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
