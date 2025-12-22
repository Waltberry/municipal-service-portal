type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Prev</button>
      <span>Page {page} / {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
}
