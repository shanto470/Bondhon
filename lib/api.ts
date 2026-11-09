export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Options = RequestInit & { auth?: boolean };

// Small fetch wrapper. With { auth: true } it attaches the Better Auth JWT as a Bearer token.
export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const { auth = false, headers, ...rest } = options;
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    // imported lazily so server components can use api() without loading the client SDK
    const { authClient } = await import("./auth-client");
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Please log in to continue.");
    h.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...rest, headers: h, cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.msg || "Something went wrong. Please try again.");
  return body as T;
}
