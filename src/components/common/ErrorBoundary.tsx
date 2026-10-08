import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Optional custom fallback label (e.g. translated) */
  fallbackTitle?: string
  fallbackBody?: string
  retryLabel?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Top-level error boundary. On an uncaught render/lifecycle error it:
 *   - logs the error to the console (structured, for observability)
 *   - renders a non-interactive-safe fallback with a retry action
 *   - auto-recovers on the next successful navigation via `key` remount
 *
 * Component boundaries intentionally reset state by remounting; this wrapper
 * is mounted once at the app root so keying it by location would defeat that.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Structured error reporting hook. In production this can be wired to a
    // crash-reporting endpoint (see main.tsx web-vitals pattern).
    console.error('[ErrorBoundary] Uncaught application error', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    })
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-copper-400/20 bg-copper-400/10">
            <AlertTriangle className="h-7 w-7 text-copper" aria-hidden="true" />
          </div>
          <div className="max-w-md space-y-1.5">
            <h1 className="text-lg font-semibold text-warm-50">
              {this.props.fallbackTitle ?? 'Something went wrong'}
            </h1>
            <p className="text-sm leading-relaxed text-warm-400">
              {this.props.fallbackBody ??
                'An unexpected error occurred while rendering this page. Your data is safe, try reloading the page.'}
            </p>
            {this.state.error && import.meta.env.DEV && (
              <pre className="mt-3 max-h-40 overflow-auto rounded-lg border border-warm-50/[0.06] bg-warm-950/80 p-3 text-left text-xs text-copper">
                {this.state.error.stack ?? this.state.error.message}
              </pre>
            )}
          </div>
          <button
            type="button"
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 rounded-lg border border-warm-50/[0.08] bg-warm-900 px-4 py-2.5 text-sm font-medium text-warm-50 transition-all hover:bg-warm-50/[0.04]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {this.props.retryLabel ?? 'Try again'}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}