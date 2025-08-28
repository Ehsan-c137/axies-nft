import { logger } from "@/utils/logger";

let currentAccessToken: string | null = null;
let isRefreshing = false;
export class HttpError extends Error {
  response: Response;
  data: unknown;

  constructor(response: Response, data: unknown) {
    super(`HTTP error! status: ${response.status}`);
    this.name = "HttpError";
    this.response = response;
    this.data = data;
  }
}

export const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    // This check helps determine if the error is happening on the server or the client.
    const isServer = typeof window === "undefined";
    throw new Error(
      `NEXT_PUBLIC_API_URL is not defined. This error happened on the ${isServer ? "server" : "client"}.`,
    );
  }
  return url;
};

let failedRequestsQueue: Array<{
  resolve: () => void;
  reject: (reason?: unknown) => void;
}> = [];

const processFailedQueue = (error: unknown) => {
  failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedRequestsQueue = [];
};

const customFetch = async <TResponse>(
  endpoint: string,
  options: RequestInit = {},
): Promise<TResponse | null> => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (currentAccessToken) {
    headers.set("Authorization", `Bearer ${currentAccessToken}`);
  }

  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    ...options,
    headers,
    credentials: "same-origin",
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `Request failed with status ${response.status}` };
    }

    const error = new HttpError(response, errorData);
    logger.log(
      `HTTP Error on ${options.method || "GET"} ${endpoint}. See stack trace for origin.`,
      { error },
    );
    throw error;
  }

  const responseText = await response.text();
  if (!responseText) {
    return null;
  }

  return JSON.parse(responseText) as TResponse;
};

const handleTokenRefresh = async <TResponse>(
  endpoint: string,
  options: RequestInit,
): Promise<TResponse | null> => {
  try {
    const refreshResponse = await fetch(`${getBaseUrl()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });

    if (!refreshResponse.ok) {
      let refreshErrorData;
      try {
        refreshErrorData = await refreshResponse.json();
      } catch {
        refreshErrorData = {
          message: `Token refresh failed with status ${refreshResponse.status}`,
        };
      }
      const refreshError = new HttpError(refreshResponse, refreshErrorData);
      throw refreshError;
    }

    const { accessToken } = (await refreshResponse.json()) as {
      accessToken?: string;
    };

    if (!accessToken) {
      throw new Error("No access token in refresh response");
    }

    currentAccessToken = accessToken;
    processFailedQueue(null);
    return customFetch<TResponse>(endpoint, options);
  } catch (refreshError) {
    processFailedQueue(refreshError);
    apiClient.setAuthToken(null);
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
};

const requestWithAuthRetry = async <TResponse>(
  endpoint: string,
  options: RequestInit = {},
): Promise<TResponse | null> => {
  try {
    return await customFetch<TResponse>(endpoint, options);
  } catch (error) {
    if (
      !(error instanceof HttpError && error.response.status === 401) ||
      endpoint === "/auth/refresh"
    ) {
      throw error;
    }

    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        failedRequestsQueue.push({ resolve, reject });
      }).then(() => customFetch<TResponse>(endpoint, options));
    }

    isRefreshing = true;

    return handleTokenRefresh(endpoint, options);
  }
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
    requestWithAuthRetry<TResponse>(endpoint, { ...options, method: "GET" }),

  post: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: RequestInit,
  ) =>
    requestWithAuthRetry<TResponse>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: RequestInit,
  ) =>
    requestWithAuthRetry<TResponse>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <TResponse>(endpoint: string, options?: RequestInit) =>
    requestWithAuthRetry<TResponse>(endpoint, { ...options, method: "DELETE" }),
};
