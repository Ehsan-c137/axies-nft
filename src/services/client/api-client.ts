import { BASE_URL } from "../config";

let currentAccessToken: string | null = null;

const customFetch = async <TResponse>(
  endpoint: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (currentAccessToken) {
    headers.set("Authorization", `Bearer ${currentAccessToken}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as TResponse;
  }

  return response.json();
};

export const apiClient = {
  /**
   * Sets the authentication token for all subsequent API requests.
   * @param token The JWT access token.
   */
  setAuthToken: (token: string | null) => {
    currentAccessToken = token;
  },

  get: <TResponse>(endpoint: string, options?: RequestInit) =>
    customFetch<TResponse>(endpoint, { ...options, method: "GET" }),

  post: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: RequestInit,
  ) =>
    customFetch<TResponse>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: RequestInit,
  ) =>
    customFetch<TResponse>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <TResponse>(endpoint: string, options?: RequestInit) =>
    customFetch<TResponse>(endpoint, { ...options, method: "DELETE" }),
};
