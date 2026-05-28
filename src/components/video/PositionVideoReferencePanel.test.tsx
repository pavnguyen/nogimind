import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useQueries } from '@tanstack/react-query'
import { PositionVideoReferencePanel } from './PositionVideoReferencePanel'
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

describe('PositionVideoReferencePanel', () => {
  it('renders loading spinner when queries are loading', () => {
    vi.mocked(useQueries).mockReturnValue([
      { data: null, isLoading: true },
    ])

    const { container } = render(<PositionVideoReferencePanel skillIds={['skill-1']} />)

    // Should show the spinner (animate-spin element)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders empty state when there are no videos', () => {
    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos: [] }), isLoading: false },
    ])

    render(<PositionVideoReferencePanel skillIds={['skill-1']} />)

    expect(screen.getByText('common.none')).toBeInTheDocument()
  })

  it('renders all videos from all related skill queries', () => {
    const videos1 = [
      {
        youtubeId: 'vid-1',
        title: 'First Video',
        channel: 'Channel A',
        whyUseful: 'Great technique',
        relevance: 'primary',
        level: 'intermediate',
      },
    ]
    const videos2 = [
      {
        youtubeId: 'vid-2',
        title: 'Second Video',
        channel: 'Channel B',
        whyUseful: 'Nice details',
        relevance: 'supplemental',
        level: 'beginner',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos: videos1 }), isLoading: false },
      { data: makeSkillVideoMapping('skill-2', { videos: videos2 }), isLoading: false },
    ])

    render(<PositionVideoReferencePanel skillIds={['skill-1', 'skill-2']} />)

    // Both video titles should render
    expect(screen.getByText('First Video')).toBeInTheDocument()
    expect(screen.getByText('Second Video')).toBeInTheDocument()

    // Both channels should render
    expect(screen.getByText('Channel A')).toBeInTheDocument()
    expect(screen.getByText('Channel B')).toBeInTheDocument()

    // Both whyUseful texts should render
    expect(screen.getByText('Great technique')).toBeInTheDocument()
    expect(screen.getByText('Nice details')).toBeInTheDocument()
  })

  it('shows report success text for reported videos', () => {
    mockReportedIds.add('reported-vid')

    const videos = [
      {
        youtubeId: 'reported-vid',
        title: 'Reported Video',
        channel: 'Channel A',
        whyUseful: 'Still useful',
        relevance: 'primary',
        level: 'intermediate',
      },
      {
        youtubeId: 'unreported-vid',
        title: 'Good Video',
        channel: 'Channel B',
        whyUseful: 'Good details',
        relevance: 'supplemental',
        level: 'beginner',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<PositionVideoReferencePanel skillIds={['skill-1']} />)

    // Report success text should appear for reported video
    const reportSuccessElements = screen.getAllByText('video.reportSuccess')
    expect(reportSuccessElements).toHaveLength(1)

    // Unreported video should not show report success
    expect(screen.getByText('Good Video')).toBeInTheDocument()
  })

  it('renders primary vs supplemental badge text', () => {
    const videos = [
      {
        youtubeId: 'vid-a',
        title: 'Primary Video',
        channel: 'Channel A',
        whyUseful: 'Primary technique',
        relevance: 'primary',
        level: 'intermediate',
      },
      {
        youtubeId: 'vid-b',
        title: 'Supplemental Video',
        channel: 'Channel B',
        whyUseful: 'Extra details',
        relevance: 'supplemental',
        level: 'advanced',
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<PositionVideoReferencePanel skillIds={['skill-1']} />)

    // Primary badge - since t returns the key as fallback, check for fallback
    expect(screen.getByText('Primary')).toBeInTheDocument()
    expect(screen.getByText('Supplemental')).toBeInTheDocument()
  })

  it('renders timestamp link when timestampStart > 0', () => {
    const videos = [
      {
        youtubeId: 'with-ts',
        title: 'Timestamp Video',
        channel: 'Channel A',
        whyUseful: 'Has timestamp',
        relevance: 'primary',
        level: 'intermediate',
        timestampStart: 150,
      },
    ]

    vi.mocked(useQueries).mockReturnValue([
      { data: makeSkillVideoMapping('skill-1', { videos }), isLoading: false },
    ])

    render(<PositionVideoReferencePanel skillIds={['skill-1']} />)

    const link = screen.getByText('Start at {time}')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://youtu.be/with-ts?t=150',
    )
  })

  it('does not crash with empty skillIds array', () => {
    vi.mocked(useQueries).mockReturnValue([])

    render(<PositionVideoReferencePanel skillIds={[]} />)

    expect(screen.getByText('common.none')).toBeInTheDocument()
  })
})
