import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StudyPage from './StudyPage'
import type { ManifestEntry } from '../content-runtime/manifests'

vi.mock('../stores/useSettingsStore', () => ({
  useSettingsStore: vi.fn((selector: (state: { language: string }) => unknown) => selector({ language: 'en' })),
}))

const recordView = vi.fn()
vi.mock('../stores/useRecentlyViewedStore', () => ({
  useRecentlyViewedStore: () => ({ recentlyViewed: [], recordView }),
}))

const skills = [
  {
    id: 'triangle-system',
    title: { en: 'Triangle System', vi: 'Hệ thống Triangle', fr: 'Système Triangle' },
    domain: 'submission_systems',
    level: 'intermediate',
    tags: [],
    shortDescription: { en: 'Chain the triangle.', vi: 'Nối chuỗi triangle.', fr: 'Enchaîner le triangle.' },
  },
  {
    id: 'rear-naked-choke',
    title: { en: 'Rear Naked Choke', vi: 'Rear Naked Choke', fr: 'Rear Naked Choke' },
    domain: 'submission_systems',
    level: 'advanced',
    tags: [],
    shortDescription: { en: 'Finish from the back.', vi: 'Kết thúc từ sau lưng.', fr: 'Finir depuis le dos.' },
  },
]

vi.mock('../queries/skillQueries', () => ({
  useSkillsQuery: () => ({ data: skills, isLoading: false }),
}))

const manifest: ManifestEntry[] = [
  {
    id: 'triangle-system',
    domain: 'submission_systems',
    level: 'intermediate',
    name: 'Triangle System',
    tags: [],
    summary: 'Chain the triangle.',
    hasVideos: true,
    hasMicroDetails: true,
    hasChecklist: false,
  },
  {
    id: 'rear-naked-choke',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Rear Naked Choke',
    tags: [],
    summary: 'Finish from the back.',
    hasVideos: false,
    hasMicroDetails: false,
    hasChecklist: true,
  },
]

vi.mock('../queries/contentQueries', () => ({
  useManifestQuery: () => ({ data: manifest, isLoading: false }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <StudyPage />
    </MemoryRouter>,
  )

describe('StudyPage', () => {
  it('renders the selected domain heading and blurb for submission_systems', () => {
    renderAt('/study?domain=submission_systems')

    expect(screen.getByRole('heading', { name: 'modeUx.study.domains.submissions' })).toBeInTheDocument()
    expect(screen.getByText('modeUx.study.domainBlurbs.submissions')).toBeInTheDocument()
  })

  it('falls back to the first domain when the query value is unknown', () => {
    renderAt('/study?domain=not-a-real-domain')

    expect(screen.getByRole('heading', { name: 'modeUx.study.domains.guardRetention' })).toBeInTheDocument()
  })

  it('renders every skill of the selected domain', () => {
    renderAt('/study?domain=submission_systems')

    expect(screen.getByText('Triangle System')).toBeInTheDocument()
    expect(screen.getByText('Rear Naked Choke')).toBeInTheDocument()
  })

  it('derives content-depth indicators from the manifest flags', () => {
    const { container } = renderAt('/study?domain=submission_systems')

    // triangle-system → videos + micro-details (but no checklist) = 2/3
    // rear-naked-choke → checklist only = 1/3
    expect(screen.getByText('2/3')).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()
    expect(container.querySelectorAll('.bg-steel-400').length).toBeGreaterThan(0)
  })
})
