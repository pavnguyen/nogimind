import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DashboardPage from './DashboardPage'
import type { ManifestEntry } from '../content-runtime/manifests'

// ── Mocks ─────────────────────────────────────────────────────────────────

vi.mock('../stores/useSettingsStore', () => ({
  useSettingsStore: vi.fn((selector: (state: { language: string }) => unknown) => {
    const state = { language: 'en' as const }
    return selector(state)
  }),
}))

vi.mock('../utils/version', () => ({
  getBuildDate: () => '2025-06-15',
}))

// Helper to build a manifest entry
const makeManifestEntry = (
  id: string,
  overrides: Partial<ManifestEntry> = {},
): ManifestEntry => ({
  id,
  domain: 'guard_retention',
  level: 'beginner',
  name: `Skill ${id}`,
  tags: [],
  summary: `Summary for ${id}`,
  hasVideos: false,
  hasMicroDetails: false,
  hasChecklist: false,
  ...overrides,
})

beforeEach(() => {
  vi.clearAllMocks()
})

const renderPage = () =>
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  )

describe('DashboardPage', () => {
  // ── Loading state ──────────────────────────────────────────────────────

  it('renders skeleton UI when manifest is loading', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
    })

    const { container } = renderPage()

    // Skeleton shimmer blocks should be present
    const skeletons = container.querySelectorAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)

    // Refresh icon should spin while loading
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()

    // No skill card link yet
    expect(screen.queryByRole('link', { name: /skill/i })).not.toBeInTheDocument()

    // No empty state
    expect(screen.queryByText('common.empty')).not.toBeInTheDocument()
  })

  // ── Loaded with data ───────────────────────────────────────────────────

  it('renders daily skill card with title and description', () => {
    const mockManifest = [
      makeManifestEntry('skill-01', {
        name: 'Armbar from Guard',
        summary: 'A fundamental submission from closed guard.',
      }),
    ]

    vi.mocked(useQuery).mockReturnValue({
      data: mockManifest,
      isLoading: false,
    })

    renderPage()

    // Card title renders as a link to the skill detail page
    const cardLink = screen.getByRole('link', { name: /armbar from guard/i })
    expect(cardLink).toBeInTheDocument()
    expect(cardLink).toHaveAttribute('href', '/skills/skill-01')

    // Description renders
    expect(screen.getByText('A fundamental submission from closed guard.')).toBeInTheDocument()

    // Open link renders in the card footer
    expect(screen.getAllByText('common.open').length).toBeGreaterThanOrEqual(1)
  })

  it('renders stats strip with pipelineSkillCount and pipelineSafetyCount', () => {
    const mockManifest = [
      makeManifestEntry('skill-01'),
      makeManifestEntry('skill-02', { tags: ['safety', 'neck'] }),
      makeManifestEntry('skill-03', { tags: ['spine'] }),
      makeManifestEntry('skill-04'),
    ]

    vi.mocked(useQuery).mockReturnValue({
      data: mockManifest,
      isLoading: false,
    })

    renderPage()

    // Total skills count (4) renders next to "dashboard.totalSkills" label
    expect(screen.getByText('4')).toBeInTheDocument()

    // Safety-critical count (2 skills with safety/neck/spine tags) renders
    expect(screen.getByText('2')).toBeInTheDocument()

    // Build date renders from mocked version util
    expect(screen.getByText('2025-06-15')).toBeInTheDocument()
  })

  it('renders all five hub explorer links', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [makeManifestEntry('skill-01')],
      isLoading: false,
    })

    renderPage()

    expect(screen.getByText('nav.learn')).toBeInTheDocument()
    expect(screen.getByText('nav.study')).toBeInTheDocument()
    expect(screen.getByText('nav.fix')).toBeInTheDocument()
    expect(screen.getByText('nav.build')).toBeInTheDocument()
    expect(screen.getByText('nav.reference')).toBeInTheDocument()
  })

  it('renders What\'s New section with all three update items', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [makeManifestEntry('skill-01')],
      isLoading: false,
    })

    renderPage()

    expect(screen.getByText('dashboard.newUpdates.heading')).toBeInTheDocument()
    expect(screen.getByText('dashboard.newUpdates.item1')).toBeInTheDocument()
    expect(screen.getByText('dashboard.newUpdates.item2')).toBeInTheDocument()
    expect(screen.getByText('dashboard.newUpdates.item3')).toBeInTheDocument()
  })

  it('renders fix/problem section with troubleshooters and defense links', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [makeManifestEntry('skill-01')],
      isLoading: false,
    })

    renderPage()

    expect(screen.getByText('modeUx.fix.heading')).toBeInTheDocument()
    expect(screen.getByText('modeUx.reference.items.troubleshooters.title')).toBeInTheDocument()
    expect(screen.getByText('modeUx.reference.items.defense.title')).toBeInTheDocument()
  })

  it('uses daily refresh button that is accessible via aria-label', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [makeManifestEntry('skill-01')],
      isLoading: false,
    })

    renderPage()

    const refreshBtn = screen.getByRole('button', { name: 'dashboard.rotation.refresh' })
    expect(refreshBtn).toBeInTheDocument()
  })

  // ── Empty state ────────────────────────────────────────────────────────

  it('renders empty state when manifest is an empty array', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [],
      isLoading: false,
    })

    const { container } = renderPage()

    // Empty state message
    expect(screen.getByText('common.empty')).toBeInTheDocument()

    // No skeleton blocks
    const skeletons = container.querySelectorAll('.skeleton-shimmer')
    expect(skeletons.length).toBe(0)
  })

  it('renders empty state when manifest data is null/undefined (loaded but empty)', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
    })

    const { container } = renderPage()

    // Should show empty state
    expect(screen.getByText('common.empty')).toBeInTheDocument()

    // No skeleton blocks
    const skeletons = container.querySelectorAll('.skeleton-shimmer')
    expect(skeletons.length).toBe(0)
  })
})
