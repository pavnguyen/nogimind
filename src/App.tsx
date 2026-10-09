import { ErrorBoundary } from './components/common/ErrorBoundary'
import { useThemeSync } from './hooks/useThemeSync'
import { AppRouter } from './router/AppRouter'

export default function App() {
  useThemeSync()

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}
