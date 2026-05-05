import { useTranslation } from 'react-i18next'
import type { SkillDomain } from '../../types/skill'
import { Badge } from '../common/Badge'

export const DomainBadge = ({ domain }: { domain: SkillDomain }) => {
  const { t } = useTranslation()
  return <Badge tone="cyan">{t(`domains.${domain}`)}</Badge>
}
