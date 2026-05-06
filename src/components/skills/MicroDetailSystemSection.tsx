import { useTranslation } from 'react-i18next'
import { SectionCard } from '../common/SectionCard'
import { MicroDetailCard } from './MicroDetailCard'
import { LeftRightGuideCard } from './LeftRightGuideCard'
import { FastFinishPathCard } from './FastFinishPathCard'
import { QuickTroubleshootingList } from './QuickTroubleshootingList'
import type { LanguageCode, MicroDetailSystem } from '../../types/skill'
import type { ViewMode } from '../../types/settings'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  system: MicroDetailSystem
  lang: LanguageCode
  viewMode?: ViewMode
}

export const MicroDetailSystemSection = ({ system, lang, viewMode = 'detailed' }: Props) => (
  <MicroDetailSystemSectionInner system={system} lang={lang} viewMode={viewMode} />
)

const MicroDetailSystemSectionInner = ({ system, lang, viewMode }: Props & { viewMode: ViewMode }) => {
  const { t } = useTranslation()
  const simple = viewMode === 'simple'
  const advanced = viewMode === 'advanced'

  return (
    <SectionCard title={t('microDetailSystem.heading')} description={getLocalizedText(system.overview, lang)}>
    <div className="space-y-5">
      <div className="grid gap-3 xl:grid-cols-2">
        {system.topFiveDetails.map((detail) => <MicroDetailCard key={detail.id} detail={detail} lang={lang} />)}
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        {system.fastFinishPaths.map((path) => <FastFinishPathCard key={path.id} path={path} lang={lang} />)}
      </div>
      {!simple ? <div className="grid gap-3 xl:grid-cols-2">{system.leftRightGuides.map((guide) => <LeftRightGuideCard key={guide.id} guide={guide} lang={lang} />)}</div> : null}
      {!simple ? (
        <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
          <p className="text-sm font-semibold text-white">{t('microDetailSystem.troubleshooting')}</p>
          <div className="mt-3">
            <QuickTroubleshootingList items={system.troubleshootingTips} lang={lang} />
          </div>
        </div>
      ) : null}
      {advanced ? (
        <>
          <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm font-semibold text-white">{t('microDetailSystem.doNotDo')}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 md:grid-cols-2">
              {system.doNotDo[lang].map((item) => <li key={item} className="rounded-md border border-white/10 bg-slate-950/60 p-3">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm font-semibold text-white">{t('microDetailSystem.safety')}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-100 md:grid-cols-2">
              {system.safetyNotes[lang].map((item) => <li key={item} className="rounded-md border border-amber-300/15 bg-amber-300/10 p-3">{item}</li>)}
            </ul>
          </div>
        </>
      ) : null}
    </div>
    </SectionCard>
  )
}
