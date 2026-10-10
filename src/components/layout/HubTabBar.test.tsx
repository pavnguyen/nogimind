import { describe, expect, it } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { HubTabBar, type HubTab } from './HubTabBar'

// The tab bar drives the page through the `tab` search param, so these tests
// pin the contract: the first tab keeps a clean URL, any other tab writes its
// id, and the tab the user clicked last is the one that reads as active.

const LocationProbe = () => {
  const location = useLocation()
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>
}

const tabs: HubTab[] = [
  { id: 'path', labelKey: 'nav.learningPath' },
  { id: 'positions', labelKey: 'nav.positions' },
  { id: 'concepts', labelKey: 'nav.concepts' },
]

const setup = (initialEntry = '/learn') => {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LocationProbe />
      <HubTabBar tabs={tabs} />
    </MemoryRouter>,
  )
  // The i18n mock resolves t() to the key, so tab labels are their labelKey.
  return {
    location: () => screen.getByTestId('location').textContent,
    tab: (labelKey: string) => screen.getByRole('button', { name: labelKey }),
    activeTab: () => {
      const active = screen
        .getAllByRole('button')
        .find((button) => button.className.includes('hallmark-tab-active'))
      return active?.textContent
    },
  }
}

describe('HubTabBar', () => {
  it('marks the first tab active when the URL has no tab param', () => {
    const ui = setup()
    expect(ui.location()).toBe('/learn')
    expect(ui.activeTab()).toBe('nav.learningPath')
  })

  it('writes the clicked tab to the URL and marks it active', () => {
    const ui = setup()
    fireEvent.click(ui.tab('nav.positions'))
    expect(ui.location()).toBe('/learn?tab=positions')
    expect(ui.activeTab()).toBe('nav.positions')

    fireEvent.click(ui.tab('nav.concepts'))
    expect(ui.location()).toBe('/learn?tab=concepts')
    expect(ui.activeTab()).toBe('nav.concepts')
  })

  it('drops the param when the user returns to the first tab', () => {
    const ui = setup('/learn?tab=concepts')
    expect(ui.activeTab()).toBe('nav.concepts')

    fireEvent.click(ui.tab('nav.learningPath'))
    expect(ui.location()).toBe('/learn')
    expect(ui.activeTab()).toBe('nav.learningPath')
  })

  it('keeps a phone-sized label on tabs that provide one', () => {
    render(
      <MemoryRouter initialEntries={['/learn']}>
        <HubTabBar
          tabs={[
            { id: 'path', labelKey: 'nav.learningPath', shortLabelKey: 'nav.short.learningPath' },
            { id: 'positions', labelKey: 'nav.positions', shortLabelKey: 'nav.short.positions' },
          ]}
        />
      </MemoryRouter>,
    )

    // jsdom loads no stylesheet, so both variants stay in the DOM here; the
    // browser shows the short one below `sm` and the full one above it.
    const path = screen.getByRole('button', { name: /nav\.learningPath/ })
    expect(path).toHaveTextContent('nav.learningPath')
    expect(path).toHaveTextContent('nav.short.learningPath')
    expect(screen.getByRole('button', { name: /nav\.positions/ })).toHaveTextContent(
      'nav.short.positions',
    )
  })

  it('leaves the last clicked tab active when two tabs are clicked in one tick', () => {
    const ui = setup()
    act(() => {
      fireEvent.click(ui.tab('nav.positions'))
      fireEvent.click(ui.tab('nav.concepts'))
      fireEvent.click(ui.tab('nav.positions'))
    })
    expect(ui.activeTab()).toBe('nav.positions')
    expect(ui.location()).toBe('/learn?tab=positions')
  })
})
