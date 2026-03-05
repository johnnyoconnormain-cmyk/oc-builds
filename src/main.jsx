import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

const convexUrl = import.meta.env.VITE_CONVEX_URL || 'https://polished-ant-300.convex.cloud'
const convex = new ConvexReactClient(convexUrl)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ConvexProvider client={convex}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ConvexProvider>
    </ErrorBoundary>
  </StrictMode>,
)
