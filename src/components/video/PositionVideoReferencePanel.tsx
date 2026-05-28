import { useTranslation } from 'react-i18next'

export const PositionVideoReferencePanel = () => {
  const { t } = useTranslation()
  return (
    <p className="text-sm text-slate-500">{t('common.none')}</p>
  )
}
