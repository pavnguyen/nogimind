import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/layout/Layout'
import { HubThemeProvider } from '../contexts/HubThemeProvider'
import {
  AboutPage,
  ArchetypeDetailPage,
  ArchetypesPage,
  BuildHubPage,
  ConceptDetailPage,
  ConceptsPage,
  DashboardPage,
  DefenseDetailPage,
  DefensePage,
  GlossaryPage,
  LearnPage,
  NotFoundPage,
  PositionDetailPage,
  PositionsPage,
  SearchPage,
  SettingsPage,
  ReferencePage,
  SkillDetailPage,
  SkillMapPage,
  StudyPage,
} from './routes'

const Fallback = () => {
  const { t } = useTranslation()
  return <div className="p-6 text-sm text-warm-400">{t('common.loading')}</div>
}

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <HubThemeProvider>
      <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/build" element={<BuildHubPage />} />
          <Route path="/fix" element={<Navigate to="/defense" replace />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/skills" element={<SkillMapPage />} />
          <Route path="/skills/:skillId" element={<SkillDetailPage />} />
          <Route path="/troubleshooters/*" element={<Navigate to="/defense" replace />} />
          <Route path="/concepts" element={<ConceptsPage />} />
          <Route path="/concepts/:conceptId" element={<ConceptDetailPage />} />
          <Route path="/positions" element={<PositionsPage />} />
          <Route path="/positions/:positionId" element={<PositionDetailPage />} />
          <Route path="/defense" element={<DefensePage />} />
          <Route path="/defense/:layerId" element={<DefenseDetailPage />} />
          <Route path="/archetypes" element={<ArchetypesPage />} />
          <Route path="/archetypes/:archetypeId" element={<ArchetypeDetailPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/philosophy" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </HubThemeProvider>
  </BrowserRouter>
)
