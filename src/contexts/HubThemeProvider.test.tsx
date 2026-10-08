import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { HubThemeProvider } from './HubThemeProvider'
import { hubNavItems } from '../components/layout/navItems'

// Read as text so the check runs against the real stylesheet. (Vitest stubs CSS
// imports to an empty string, so `?raw` would not work here.)
const themeCss = readFileSync(resolve(process.cwd(), 'src/styles/hallmark-themes.css'), 'utf8')

/**
 * Regression guard for the hub id mismatch that shipped before this change:
 * `navItems` declared the hub as `defense` while the stylesheet only defined
 * `[data-hub="fix"]`, so the whole hub theme silently fell back to `:root`.
 * The type layer is now honest (`HubId` is the single source of truth) and this
 * test ties the runtime attribute to the CSS blocks that must match it.
 */

const renderAt = (path: string) => {
  const { container } = render(
    <MemoryRouter initialEntries={[path]}>
      <HubThemeProvider>
        <span>content</span>
      </HubThemeProvider>
    </MemoryRouter>,
  )
  return container.querySelector('[data-hub]')?.getAttribute('data-hub') ?? ''
}

describe('HubThemeProvider', () => {
  it.each([
    ['/learn', 'learn'],
    ['/study', 'study'],
    ['/defense', 'defense'],
    ['/build', 'build'],
    ['/reference', 'reference'],
  ])('maps %s to data-hub="%s"', (path, expected) => {
    expect(renderAt(path)).toBe(expected)
  })

  it('uses the same ids as the navigation config', () => {
    const navHubIds = hubNavItems.map((hub) => hub.hub).sort()
    expect(navHubIds).toEqual(['build', 'defense', 'learn', 'reference', 'study'])
  })

  it('sets no hub attribute on unmatched (dashboard) routes', () => {
    expect(renderAt('/')).toBe('')
  })

  it('has a stylesheet block for every hub id, so no hub silently falls back to :root', () => {
    for (const hub of hubNavItems) {
      expect(themeCss).toContain(`[data-hub="${hub.hub}"]`)
    }
    // The old id must be gone, not merely duplicated alongside the new one.
    expect(themeCss).not.toContain('[data-hub="fix"]')
  })
})
