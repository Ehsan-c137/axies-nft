const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (message: string, error?: unknown) => {
    if (isDevelopment) {
      console.error(message, error);
    }
  },
};
