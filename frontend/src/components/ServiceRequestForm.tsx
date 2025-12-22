import { useState } from "react";
import { CreateServiceRequest } from "../types/serviceRequest";

type Props = {
  onSubmit: (payload: CreateServiceRequest) => Promise<void>;
};

export function ServiceRequestForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const validate = () => {
    if (title.trim().length < 5) return "Title must be at least 5 characters.";
    if (description.trim().length < 10) return "Description must be at least 10 characters.";
    return null;
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null);
        const v = validate();
        if (v) return setErr(v);

        setBusy(true);
        try {
          await onSubmit({
            title: title.trim(),
            description: description.trim(),
            address: address.trim() || null,
            category: category as any,
          });
          setTitle("");
          setDescription("");
          setAddress("");
          setCategory(0);
        } catch (ex: any) {
          setErr(ex.message ?? "Failed to submit.");
        } finally {
          setBusy(false);
        }
      }}
      style={{ display: "grid", gap: 8, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
    >
      <h3>Create Service Request</h3>

      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </label>

      <label>
        Address (optional)
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(Number(e.target.value))}>
          <option value={0}>General</option>
          <option value={1}>Road</option>
          <option value={2}>Waste</option>
          <option value={3}>Water</option>
          <option value={4}>Parks</option>
        </select>
      </label>

      {err && <div style={{ color: "crimson" }}>{err}</div>}

      <button disabled={busy} type="submit">
        {busy ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
