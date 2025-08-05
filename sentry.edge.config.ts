import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e79d9e1c58a1411956f34dfb47f9e2eb@o4509790687985664.ingest.de.sentry.io/4509791002427472",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
