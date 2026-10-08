import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AboutPage from './AboutPage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  )

describe('AboutPage', () => {
  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: 'about.heading' })).toBeInTheDocument()
  })

  it('renders the three principle pillars with their titles', () => {
    renderPage()
    expect(screen.getByText('about.philosophyTitle')).toBeInTheDocument()
    expect(screen.getByText('about.systemTitle')).toBeInTheDocument()
    expect(screen.getByText('about.safetyTitle')).toBeInTheDocument()
  })

  it('renders each pillar body', () => {
    renderPage()
    expect(screen.getByText('about.philosophy')).toBeInTheDocument()
    expect(screen.getByText('about.system')).toBeInTheDocument()
    expect(screen.getByText('about.safety')).toBeInTheDocument()
  })

  it('links to Guardian HCMC on Facebook and Instagram', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /Guardian HCMC · Facebook/ })).toHaveAttribute(
      'href',
      'https://www.facebook.com/profile.php?id=100087911966054',
    )
    expect(screen.getByRole('link', { name: /Guardian HCMC · Instagram/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/guardianhcmc/',
    )
  })

  it('does not render the removed core themes section', () => {
    renderPage()
    expect(screen.queryByText('about.themesTitle')).not.toBeInTheDocument()
  })
})
