import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PipelineFixTab } from './PipelineFixTab'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import type { SkillDetail } from '../../content-runtime/skills'

const baseDetail = {
  id: 'knee-line-escape',
  domain: 'escapes',
  level: 'intermediate',
  locale: 'vi',
  name: 'Knee Line Escape',
  description: 'desc',
  summary: 'summary',
  tags: ['family:leg-lock'],
  aliases: [],
  keywords: [],
  status: 'published',
  searchBoost: 1,
  whyItWorks: [],
  keyCorrections: [],
  moneyDetails: [],
  coachingCues: [],
  commonMistakes: [],
  fixItFast: [
    'Không thể duỗi thẳng chân của họ? Dùng chân kẹp khuỷu tay vào hông và sử dụng điều khiển cổ tay hai đối một.',
    'Bị flatten: underhook quá nông',
  ],
  safetySummary: ['Heel Hook bị khóa hoàn toàn có thể làm hỏng dây chằng trước khi bạn cảm thấy đau.'],
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

const asSafetyCritical = {
  ...baseDetail,
  tags: ['family:leg-lock', 'risk:safety-critical'],
} as unknown as SkillDetail

describe('PipelineFixTab', () => {
  it('splits fix entries into trigger and answer in every locale', () => {
    render(<PipelineFixTab detail={baseDetail} />)

    expect(screen.getByText('Không thể duỗi thẳng chân của họ?')).toBeInTheDocument()
    expect(screen.getByText('Dùng chân kẹp khuỷu tay vào hông và sử dụng điều khiển cổ tay hai đối một.')).toBeInTheDocument()
    expect(screen.getByText('Bị flatten')).toBeInTheDocument()
    expect(screen.getByText('underhook quá nông')).toBeInTheDocument()
  })

  it('keeps the fix list before safety for a regular skill', () => {
    render(<PipelineFixTab detail={baseDetail} />)

    const fix = document.getElementById(SKILL_SECTIONS.fixItFast)!
    const safety = document.getElementById(SKILL_SECTIONS.safety)!
    expect(fix.compareDocumentPosition(safety) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('leads with safety for a safety-critical skill', () => {
    render(<PipelineFixTab detail={asSafetyCritical} />)

    const fix = document.getElementById(SKILL_SECTIONS.fixItFast)!
    const safety = document.getElementById(SKILL_SECTIONS.safety)!
    expect(safety.compareDocumentPosition(fix) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('renders nothing when a skill has no fix or safety content', () => {
    const empty = { ...baseDetail, fixItFast: [], safetySummary: [] } as unknown as SkillDetail
    const { container } = render(<PipelineFixTab detail={empty} />)

    expect(container).toBeEmptyDOMElement()
  })
})
