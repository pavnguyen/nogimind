export const storageKeys = {
  language: 'nogi_language',
  gameTree: 'nogi_game_tree',
  settings: 'nogi_settings',
  search: 'nogi_search',
} as const

export const readJson = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export const writeJson = <T>(key: string, value: T): T => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return value
}

export const removeStorageKeys = (keys: string[]) => {
  if (typeof window === 'undefined') return
  keys.forEach((key) => window.localStorage.removeItem(key))
}
