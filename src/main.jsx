import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './App.jsx'

console.log(
  'Sentry DSN configured:',
  Boolean(import.meta.env.VITE_SENTRY_DSN)
)

console.log(
  'Production:',
  import.meta.env.PROD
)

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,

  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  tracesSampleRate: 1.0,

  sendDefaultPii: false,

  environment: 'production',
})

const container =
  document.getElementById('app') ||
  document.getElementById('root')

const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
)