import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SkillDetailPage from './SkillDetailPage'
import { SKILL_SECTIONS } from '../utils/skillAnchors'

vi.mock('../stores/useSettingsStore', () => ({
  useSettingsStore: vi.fn((selector: (state: { language: string }) => unknown) => selector({ language: 'en' })),
}))

const recordView = vi.fn()
vi.mock('../stores/useRecentlyViewedStore', () => ({
  useRecentlyViewedStore: (selector: (state: { recordView: typeof recordView }) => unknown) =>
    selector({ recordView }),
}))

vi.mock('../queries/skillQueries', () => ({
  useSkillQuery: () => ({ data: undefined, isLoading: false }),
}))

const detail = {
  id: 'anchor-probe',
  domain: 'submissions',
  level: 'intermediate',
  locale: 'en',
  name: 'Anchor Probe',
  description: 'probe skill',
  summary: 'probe skill',
  tags: ['armbar'],
  aliases: [],
  keywords: [],
  status: 'published',
  searchBoost: 1,
  whyItWorks: ['Core principle text'],
  systemLogic: { corePrinciple: 'Keep the elbow line.', decisionTree: [], exitStrategies: [] },
  keyCorrections: [],
  moneyDetails: [],
  coachingCues: [],
  commonMistakes: [],
  fixItFast: ['If they grip: strip the grip'],
  safetySummary: ['Tap early on the ankle'],
  featureFlags: { hasMicroDetails: false, hasChecklist: false, hasVideos: false, hasStateMachine: false },
  contentRefs: { videos: '', qualityChecklist: '' },
  prerequisiteSkillIds: [],
  nextSkillIds: [],
  relatedSkillIds: [],
  relatedSkills: [],
  relatedPositionIds: [],
  relatedPositions: [],
  relatedConceptIds: [],
  relatedConcepts: [],
  archetypeIds: [],
  relatedArchetypeIds: [],
  trainingMethodIds: [],
}

vi.mock('../queries/contentQueries', () => ({
  useContentSkillDetailQuery: () => ({ data: { source: 'generated', detail }, isLoading: false }),
  useSkillVideosQuery: () => ({ data: undefined, isLoading: false }),
}))

const scrolledIds: string[] = []

beforeEach(() => {
  vi.clearAllMocks()
  scrolledIds.length = 0
  Element.prototype.scrollIntoView = vi.fn(function (this: HTMLElement) {
    scrolledIds.push(this.id)
  }) as unknown as typeof Element.prototype.scrollIntoView
})

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/skills/:skillId" element={<SkillDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('SkillDetailPage deep links', () => {
  it('opens the tab that renders the linked section and scrolls to it', async () => {
    renderAt(`/skills/anchor-probe#${SKILL_SECTIONS.systemLogic}`)

    // Learn tab rendered because the anchor points into it. The section title
    // also appears in the in-page section rail, so the tab is asserted through
    // the selected tab and the rendered section anchor instead of unique text.
    expect(await screen.findByRole('tab', { name: /common\.learn/ })).toHaveAttribute('aria-selected', 'true')
    await waitFor(() => expect(scrolledIds).toContain(SKILL_SECTIONS.systemLogic))
    expect(document.getElementById(SKILL_SECTIONS.systemLogic)).toBeInTheDocument()
  })

  it('opens the Fix tab for a safety anchor', async () => {
    renderAt(`/skills/anchor-probe#${SKILL_SECTIONS.safety}`)

    expect(await screen.findByText('cardOS.safety')).toBeInTheDocument()
    await waitFor(() => expect(scrolledIds).toContain(SKILL_SECTIONS.safety))
  })

  it('stays on the default tab and does not scroll for an unknown anchor', async () => {
    renderAt('/skills/anchor-probe#pipeline-not-real')

    expect(await screen.findByText('Anchor Probe')).toBeInTheDocument()
    expect(screen.queryByText('cardOS.systemLogic')).not.toBeInTheDocument()
    expect(scrolledIds).toEqual([])
  })
})
