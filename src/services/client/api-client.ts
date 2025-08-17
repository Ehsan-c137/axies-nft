import { BASE_URL } from "../config";

/**
 * Creates a configured API client with methods for making HTTP requests.
 * It's designed to be used within a hook that provides the access token.
 * @param accessToken The JWT access token.
 * @returns An object with get, post, put, and delete methods.
 */
export const createApiClient = (accessToken: string | null) => {
  const customFetch = async <TResponse>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<TResponse> => {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
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

  return {
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
};
