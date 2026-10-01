// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d26dd5cb392384e8f0f8cfc802d2c66c@o4512124732243968.ingest.us.sentry.io/4512124740370432",

  // Disable performance tracing in development to avoid accumulating
  // close listeners on ServerResponse (MaxListenersExceededWarning).
  // In production, capture 100% of transactions.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 0,

  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: false,
      recordOutputs: false,
    }),
  ],

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
