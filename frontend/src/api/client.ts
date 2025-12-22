const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5050";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  // 204 support
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
