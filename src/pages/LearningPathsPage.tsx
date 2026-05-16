import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Target, Users, PlayCircle, Layers, ArrowRight } from 'lucide-react'
import { noGiLearningPaths } from '../data/noGiLearningPaths'
import { PageShell } from '../components/common/PageShell'
import { PageHeader } from '../components/common/PageHeader'
import { Badge } from '../components/common/Badge'

export default function LearningPathsPage() {
  const { t } = useTranslation()

  return (
    <PageShell>
      <PageHeader
        title="Learning Paths"
        description="Curated progressions connecting skills into a coherent game plan."
        icon={BookOpen}
      />

      <div className="grid gap-6">
        {noGiLearningPaths.map((path) => (
          <div key={path.id} className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-800/50">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              
              <div className="space-y-6 lg:w-2/3">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-100">{path.title}</h3>
                    <Badge variant={path.targetLevel === 'advanced' ? 'danger' : path.targetLevel === 'intermediate' ? 'warning' : 'success'}>
                      {path.targetLevel.charAt(0).toUpperCase() + path.targetLevel.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-lg text-slate-400">{path.shortDescription}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 rounded-lg border border-slate-800/60 bg-slate-900/30 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-400">
                      <Users className="h-4 w-4" />
                      <span>RECOMMENDED FOR</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      {path.recommendedFor.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2 rounded-lg border border-slate-800/60 bg-slate-900/30 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-400">
                      <Target className="h-4 w-4" />
                      <span>SUCCESS CRITERIA</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      {path.successCriteria.slice(0, 4).map((crit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/50" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-5 rounded-lg border border-slate-800 bg-slate-950/50 p-5 lg:w-1/3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-slate-300">{path.skillSequence.length} Skills</span>
                  </div>
                  {path.estimatedWeeks && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="font-medium text-slate-300">{path.estimatedWeeks} Weeks</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Path Sequence</div>
                  <div className="flex flex-col gap-2">
                    {path.skillSequence.map((skillId, i) => (
                      <Link
                        key={skillId}
                        to={`/skills/${skillId}`}
                        className="group/link flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm transition-colors hover:border-slate-700 hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-800 text-xs font-medium text-slate-500 group-hover/link:bg-slate-700 group-hover/link:text-slate-300">
                            {i + 1}
                          </span>
                          <span className="truncate font-medium text-slate-300 group-hover/link:text-white">
                            {skillId.replace(/-/g, ' ')}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600 opacity-0 transition-all group-hover/link:-translate-x-1 group-hover/link:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>

                {path.primaryVideoIds.length > 0 && (
                  <div className="flex items-center justify-between rounded-md bg-indigo-500/10 px-3 py-2 text-sm">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <PlayCircle className="h-4 w-4" />
                      <span className="font-medium">Curated Videos</span>
                    </div>
                    <span className="font-semibold text-indigo-300">{path.primaryVideoIds.length}</span>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
