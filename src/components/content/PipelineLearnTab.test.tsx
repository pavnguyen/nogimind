import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PipelineLearnTab } from './PipelineLearnTab'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import type { SkillDetail } from '../../content-runtime/skills'

const WHY_IT_WORKS =
  'Vì họ không thể theo kịp hướng xoay nên đầu của họ luôn ở sai phía, và móc hông xa chặn được cú post trước khi họ ngồi dậy.'
const CORRECTION = 'Nếu họ không theo Matrix, bạn sẽ mất đà - duy trì tốc độ trong suốt quá trình quay.'

const detail = {
  id: 'k-guard-matrix',
  domain: 'guard_offense',
  level: 'advanced',
  locale: 'vi',
  name: 'K-Guard to Matrix',
  description: 'desc',
  summary: 'summary',
  tags: ['family:guard'],
  aliases: [],
  keywords: [],
  status: 'published',
  searchBoost: 1,
  shortInstruction: 'Đối thủ lùi lại hoặc trụ → xoay hông qua vai → vào Matrix.',
  whyItWorks: [WHY_IT_WORKS, 'Vì móc hông xa chặn được cú post.'],
  systemLogic: {
    corePrinciple: 'K-Guard đã thiết lập: xoay hông qua vai rồi móc hông xa.',
    decisionTree: [{ condition: 'Họ lùi lại', action: 'Xoay hông và vào Matrix.' }],
    exitStrategies: ['Backstep', 'Leg Drag ngược'],
  },
  keyCorrections: [CORRECTION],
  moneyDetails: ['Matrix là đường lấy lưng nhanh nhất từ K-Guard.'],
  coachingCues: ['Xoay qua vai, không qua đầu'],
  commonMistakes: ['Xoay chậm khiến họ kịp ngồi dậy.'],
  fixItFast: [],
  safetySummary: [],
  nextStep: 'Học tiếp Backstep từ K-Guard.',
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
} as unknown as SkillDetail

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

describe('PipelineLearnTab', () => {
  it('opens only the system logic section and previews the rest', () => {
    render(<PipelineLearnTab detail={detail} />)

    // Open by default: core principle plus its If/Then branch.
    expect(screen.getByText('K-Guard đã thiết lập: xoay hông qua vai rồi móc hông xa.')).toBeInTheDocument()
    expect(screen.getByText('Họ lùi lại')).toBeInTheDocument()
    expect(screen.getByText('Backstep')).toBeInTheDocument()

    // Collapsed sections keep their own content out of the DOM but still show a
    // one-line preview, so the reader can scan without opening everything.
    expect(screen.queryByText(WHY_IT_WORKS)).not.toBeInTheDocument()
    expect(screen.getByText(/Vì họ không thể theo kịp hướng xoay/)).toBeInTheDocument()
  })

  it('turns an arrow-chained cue into numbered steps', () => {
    render(<PipelineLearnTab detail={detail} />)

    // The hero shows the three chained cues side by side instead of one block.
    expect(screen.getByText('Đối thủ lùi lại hoặc trụ')).toBeInTheDocument()
    expect(screen.getByText('xoay hông qua vai')).toBeInTheDocument()
    expect(screen.getByText('vào Matrix.')).toBeInTheDocument()
  })

  it('pairs a Vietnamese correction into trigger and answer', async () => {
    render(<PipelineLearnTab detail={detail} />)
    expect(screen.queryByText('Nếu họ không theo Matrix, bạn sẽ mất đà')).not.toBeInTheDocument()

    // The rail chip and the accordion header both carry the section title.
    await userEvent.click(screen.getAllByRole('button', { name: /cardOS\.topDetails/ })[0])

    expect(screen.getByText('Nếu họ không theo Matrix, bạn sẽ mất đà')).toBeInTheDocument()
    expect(screen.getByText('duy trì tốc độ trong suốt quá trình quay.')).toBeInTheDocument()
  })

  it('navigates from the section rail and expands or collapses everything', async () => {
    render(<PipelineLearnTab detail={detail} />)

    // The rail lists every section with its title (caption shared by rail).
    expect(screen.getByText('cardOS.jumpToSection')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'cardOS.expandAll' }))
    expect(screen.getByText(WHY_IT_WORKS)).toBeInTheDocument()
    expect(screen.getByText('Xoay qua vai, không qua đầu')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'cardOS.collapseAll' }))
    expect(screen.queryByText(WHY_IT_WORKS)).not.toBeInTheDocument()
    // Section anchors stay mounted while collapsed, so deep links still resolve.
    expect(document.getElementById(SKILL_SECTIONS.systemLogic)).toBeInTheDocument()
    expect(document.getElementById(SKILL_SECTIONS.whyItWorks)).toBeInTheDocument()

    // Choosing a section from the rail opens it and scrolls it into view.
    await userEvent.click(screen.getAllByRole('button', { name: /whyItWorks|Why It Works/i })[0])
    expect(screen.getByText(WHY_IT_WORKS)).toBeInTheDocument()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
