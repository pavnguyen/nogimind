import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useQueries } from '@tanstack/react-query'
import { ConceptVideoReferencePanel } from './ConceptVideoReferencePanel'
import type { SkillVideoMapping } from '../../content-runtime/videos'

// Mock the useVideoReport hook
const mockReportedIds = new Set<string>()
const mockHandleReport = vi.fn()

vi.mock('../../hooks/useVideoReport', () => ({
  useVideoReport: () => ({
    reportedIds: mockReportedIds,
    handleReport: mockHandleReport,
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  mockReportedIds.clear()
})

const makeSkillVideoMapping = (
  skillId: string,
  overrides: Partial<SkillVideoMapping> = {},
): SkillVideoMapping => ({
  skillId,
  videos: [],
  ...overrides,
})

describe('ConceptVideoReferencePanel', () => {
  it('renders loading spinner when queries are loading', () => {
    vi.mocked(useQueries).mockReturnValue([
      { data: null, isLoading: true },
    ])

    const { container } = render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders empty state when there are no videos', () => {
    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos: [] }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    expect(screen.getByText('common.none')).toBeInTheDocument()
  })

  it('renders videos from queries', () => {
    const videos = [
      {
        youtubeId: 'vid-1',
        title: 'Concept Video One',
        channel: 'Channel X',
        whyUseful: 'Explains the concept well',
        relevance: 'primary',
        level: 'intermediate',
      },
      {
        youtubeId: 'vid-2',
        title: 'Concept Video Two',
        channel: 'Channel Y',
        whyUseful: 'Good follow-up details',
        relevance: 'supplemental',
        level: 'advanced',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    expect(screen.getByText('Concept Video One')).toBeInTheDocument()
    expect(screen.getByText('Concept Video Two')).toBeInTheDocument()
    expect(screen.getByText('Channel X')).toBeInTheDocument()
    expect(screen.getByText('Channel Y')).toBeInTheDocument()
    expect(screen.getByText('Explains the concept well')).toBeInTheDocument()
    expect(screen.getByText('Good follow-up details')).toBeInTheDocument()
  })

  it('shows report success for reported videos', () => {
    mockReportedIds.add('vid-reported')

    const videos = [
      {
        youtubeId: 'vid-reported',
        title: 'Reported',
        channel: 'Ch A',
        whyUseful: 'Helpful',
        relevance: 'primary',
        level: 'beginner',
      },
      {
        youtubeId: 'vid-ok',
        title: 'OK',
        channel: 'Ch B',
        whyUseful: 'Fine',
        relevance: 'supplemental',
        level: 'intermediate',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    const successTexts = screen.getAllByText('video.reportSuccess')
    expect(successTexts).toHaveLength(1)
  })

  it('renders primary and supplemental badges', () => {
    const videos = [
      {
        youtubeId: 'vid-a',
        title: 'Primary Ref',
        channel: 'Ch A',
        whyUseful: 'Main reference technique for this concept',
        relevance: 'primary',
        level: 'intermediate',
      },
      {
        youtubeId: 'vid-b',
        title: 'Extra Ref',
        channel: 'Ch B',
        whyUseful: 'Additional perspective on the concept',
        relevance: 'supplemental',
        level: 'advanced',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    expect(screen.getByText('Primary')).toBeInTheDocument()
    expect(screen.getByText('Supplemental')).toBeInTheDocument()
  })

  it('renders timestamp link when applicable', () => {
    const videos = [
      {
        youtubeId: 'ts-vid',
        title: 'Timed Video',
        channel: 'Ch A',
        whyUseful: 'Has timestamp',
        relevance: 'primary',
        level: 'intermediate',
        timestampStart: 90,
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1']} />)

    const link = screen.getByText('video.startAt')
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://youtu.be/ts-vid?t=90',
    )
  })

  it('does not crash with empty skillIds', () => {
    vi.mocked(useQueries).mockReturnValue([])

    render(<ConceptVideoReferencePanel skillIds={[]} />)

    expect(screen.getByText('common.none')).toBeInTheDocument()
  })

  it('combines videos from multiple skills', () => {
    const skill1Videos = [
      {
        youtubeId: 's1-vid',
        title: 'From Skill 1',
        channel: 'Ch 1',
        whyUseful: 'First skill',
        relevance: 'primary',
        level: 'intermediate',
      },
    ]
    const skill2Videos = [
      {
        youtubeId: 's2-vid',
        title: 'From Skill 2',
        channel: 'Ch 2',
        whyUseful: 'Second skill',
        relevance: 'supplemental',
        level: 'advanced',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos: skill1Videos }), isLoading: false },
      { data: makeSkillVideoMapping('skill-2', { videos: skill2Videos }), isLoading: false },
    ])

    render(<ConceptVideoReferencePanel skillIds={['skill-1', 'skill-2']} />)

    expect(screen.getByText('From Skill 1')).toBeInTheDocument()
    expect(screen.getByText('From Skill 2')).toBeInTheDocument()
  })
})
