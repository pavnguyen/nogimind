import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/layout/Layout'
import {
  AboutPage,
  ArchetypeDetailPage,
  ArchetypesPage,
  ConceptDetailPage,
  ConceptsPage,
  DashboardPage,
  DefenseDetailPage,
  DefensePage,
  EscapeMapDetailPage,
  EscapeMapsPage,
  GameTreePage,
  GlossaryPage,
  MasteryMapPage,
  MicroDetailsPage,
  LearnPage,
  NotFoundPage,
  PositionDetailPage,
  PositionsPage,
  SearchPage,
  SharedKnowledgePage,
  SettingsPage,
  FixPage,
  ReferencePage,
  SkillDetailPage,
  SkillMapPage,
  StudyPage,
  SystemMapPage,
  SubmissionTroubleshooterDetailPage,
  SubmissionTroubleshootersPage,
  TechniqueChainsPage,
} from './routes'

const Fallback = () => {
  const { t } = useTranslation()
  return <div className="p-6 text-sm text-slate-400">{t('common.loading')}</div>
}

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/fix" element={<FixPage />} />
          <Route path="/map" element={<SystemMapPage />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/skills" element={<SkillMapPage />} />
          <Route path="/skills/:skillId" element={<SkillDetailPage />} />
          <Route path="/micro-details" element={<MicroDetailsPage />} />
          <Route path="/chains" element={<TechniqueChainsPage />} />
          <Route path="/troubleshooters" element={<SubmissionTroubleshootersPage />} />
          <Route path="/troubleshooters/:skillId" element={<SubmissionTroubleshooterDetailPage />} />
          <Route path="/escape-maps" element={<EscapeMapsPage />} />
          <Route path="/escape-maps/:skillId" element={<EscapeMapDetailPage />} />
          <Route path="/concepts" element={<ConceptsPage />} />
          <Route path="/concepts/:conceptId" element={<ConceptDetailPage />} />
          <Route path="/positions" element={<PositionsPage />} />
          <Route path="/positions/:positionId" element={<PositionDetailPage />} />
          <Route path="/defense" element={<DefensePage />} />
          <Route path="/defense/:layerId" element={<DefenseDetailPage />} />
          <Route path="/archetypes" element={<ArchetypesPage />} />
          <Route path="/archetypes/:archetypeId" element={<ArchetypeDetailPage />} />
          <Route path="/game-tree" element={<GameTreePage />} />
          <Route path="/mastery" element={<MasteryMapPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/knowledge/:knowledgeId" element={<SharedKnowledgePage />} />
          <Route path="/philosophy" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
)
