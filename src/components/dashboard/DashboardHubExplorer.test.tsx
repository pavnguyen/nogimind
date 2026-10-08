import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardHubExplorer } from './DashboardHubExplorer'

const renderComponent = () =>
  render(
    <MemoryRouter>
      <DashboardHubExplorer />
    </MemoryRouter>,
  )

describe('DashboardHubExplorer', () => {
  it('renders the section heading', () => {
    renderComponent()
    expect(screen.getByText('dashboard.hubExplorer')).toBeInTheDocument()
  })

  it('renders all five hub links with correct nav labels', () => {
    renderComponent()

    expect(screen.getByText('nav.learn')).toBeInTheDocument()
    expect(screen.getByText('nav.study')).toBeInTheDocument()
    expect(screen.getByText('nav.defense')).toBeInTheDocument()
    expect(screen.getByText('nav.build')).toBeInTheDocument()
    expect(screen.getByText('nav.reference')).toBeInTheDocument()
  })

  it('renders links with correct route paths', () => {
    renderComponent()

    expect(screen.getByRole('link', { name: /nav\.learn/i })).toHaveAttribute('href', '/learn')
    expect(screen.getByRole('link', { name: /nav\.study/i })).toHaveAttribute('href', '/study')
    expect(screen.getByRole('link', { name: /nav\.defense/i })).toHaveAttribute('href', '/defense')
    expect(screen.getByRole('link', { name: /nav\.build/i })).toHaveAttribute('href', '/build')
    expect(screen.getByRole('link', { name: /nav\.reference/i })).toHaveAttribute('href', '/reference')
  })

  it('highlights the study card with an emerald ring', () => {
    renderComponent()

    const studyLink = screen.getByRole('link', { name: /nav\.study/i })
    expect(studyLink.className).toContain('ring-1')
    expect(studyLink.className).toContain('ring-emerald-400/20')
  })

  it('does not add highlight ring to non-study cards', () => {
    renderComponent()

    const learnLink = screen.getByRole('link', { name: /nav\.learn/i })
    const defenseLink = screen.getByRole('link', { name: /nav\.defense/i })
    const buildLink = screen.getByRole('link', { name: /nav\.build/i })
    const referenceLink = screen.getByRole('link', { name: /nav\.reference/i })

    expect(learnLink.className).not.toContain('ring-1')
    expect(defenseLink.className).not.toContain('ring-1')
    expect(buildLink.className).not.toContain('ring-1')
    expect(referenceLink.className).not.toContain('ring-1')
  })

  it('applies correct tone-specific border styles per link', () => {
    renderComponent()

    // Cyan tone → learn card
    const learnLink = screen.getByRole('link', { name: /nav\.learn/i })
    expect(learnLink.className).toContain('border-cyan-400/15')

    // Emerald tone → study card
    const studyLink = screen.getByRole('link', { name: /nav\.study/i })
    expect(studyLink.className).toContain('border-emerald-400/15')

    // Amber tone → defense card
    const defenseLink = screen.getByRole('link', { name: /nav\.defense/i })
    expect(defenseLink.className).toContain('border-amber-400/15')

    // Violet tone → build card
    const buildLink = screen.getByRole('link', { name: /nav\.build/i })
    expect(buildLink.className).toContain('border-violet-400/15')

    // Slate tone → reference card
    const referenceLink = screen.getByRole('link', { name: /nav\.reference/i })
    expect(referenceLink.className).toContain('border-slate-400/15')
  })

  it('renders exactly 5 link elements', () => {
    renderComponent()
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
  })
})
