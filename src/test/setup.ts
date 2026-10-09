import '@testing-library/jest-dom'

// ── Mock react-i18next ─────────────────────────────────────────────────────
// `t` returns the key, which keeps assertions locale-independent. The rest of
// the module is kept real: src/i18n/i18n.ts calls `initReactI18next`, and tests
// that exercise the real settings store pull that module in.
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>()
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string, options?: string | Record<string, unknown>) => {
        if (typeof options === 'string') return options
        if (options && typeof options === 'object' && 'defaultValue' in options) {
          return (options as Record<string, unknown>).defaultValue as string
        }
        return key
      },
      i18n: { language: 'en', changeLanguage: vi.fn() },
    }),
  }
})

// ── Mock @tanstack/react-query ─────────────────────────────────────────────
// Individual tests should override this mock as needed
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useQueries: vi.fn(),
    useQuery: vi.fn(),
  }
})

// ── Mock window.matchMedia ─────────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// ── Mock IntersectionObserver ──────────────────────────────────────────────
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})
