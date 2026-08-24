// ErrorButton.jsx
import * as Sentry from "@sentry/react";

export function ErrorButton() {
  return (
    <button
      onClick={() => {
        // Explicitly capture to bypass any event handler swallowing
        Sentry.captureException(new Error("This is your first Sentry error!"));
      }}
    >
      Break the world
    </button>
  );
}