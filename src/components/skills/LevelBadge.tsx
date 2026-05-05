import { useTranslation } from 'react-i18next'
import type { SkillLevel } from '../../types/skill'
import { Badge } from '../common/Badge'

export const LevelBadge = ({ level }: { level: SkillLevel }) => {
  const { t } = useTranslation()
  const tone = level === 'advanced' ? 'rose' : level === 'intermediate' ? 'amber' : 'emerald'
  return <Badge tone={tone}>{t(`levels.${level}`)}</Badge>
}
