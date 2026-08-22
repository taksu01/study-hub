import { ArrowRight, FlaskConical, PlayCircle } from 'lucide-react'
import { MODULES, TOTAL_LESSONS, findLessonMeta } from '../data/curriculum'
import type { NavigateFn } from '../types'
import { useProgress } from '../hooks/useProgress'

const COLOR_TEXT: Record<string, string> = {
  amber: 'text-amber-600 dark:text-amber-400',
  sky: 'text-sky-600 dark:text-sky-400',
  orange: 'text-orange-600 dark:text-orange-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  violet: 'text-violet-600 dark:text-violet-400',
  green: 'text-green-600 dark:text-green-400',
}

const COLOR_BAR: Record<string, string> = {
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  orange: 'bg-orange-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  green: 'bg-green-500',
}

export function HomePage({ onNavigate }: { onNavigate: NavigateFn }) {
  const { getStatus, getModuleProgress, completedCount, lastVisited } = useProgress()

  // Resume target: last visited lesson, else first not-completed lesson.
  let resume: { moduleId: string; lessonId: string; title: string } | null = null
  if (lastVisited) {
    const [moduleId, lessonId] = lastVisited.split('/')
    const meta = findLessonMeta(moduleId, lessonId)
    if (meta) resume = { moduleId, lessonId, title: meta.lesson.title }
  }
  if (!resume) {
    outer: for (const mod of MODULES) {
      for (const lesson of mod.lessons) {
        if (getStatus(mod.id, lesson.id) !== 'completed') {
          resume = { moduleId: mod.id, lessonId: lesson.id, title: lesson.title }
          break outer
        }
      }
    }
  }

  const overallPct = Math.round((completedCount / TOTAL_LESSONS) * 100)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <header className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white p-6 sm:p-10 mb-8 mt-8 lg:mt-0">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center font-bold text-lg shadow-lg">₿</div>
          <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">Interactive Study Guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
          Bitcoin, from first principles<br />
          <span className="text-amber-400">to the investment thesis</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
          {TOTAL_LESSONS} visual, interactive lessons across 6 modules — how Bitcoin works under the hood,
          and why it has value. Learn by doing: step-through diagrams, a live mining simulation, and quizzes with instant feedback.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {resume && (
            <button
              onClick={() => onNavigate({ type: 'lesson', moduleId: resume.moduleId, lessonId: resume.lessonId })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <PlayCircle size={16} />
              {completedCount > 0 ? `Continue: ${resume.title}` : 'Start learning'}
            </button>
          )}
          <button
            onClick={() => onNavigate({ type: 'lab' })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold transition-colors cursor-pointer"
          >
            <FlaskConical size={15} className="text-indigo-300" />
            Simulation Lab
          </button>
        </div>
        {completedCount > 0 && (
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{completedCount}/{TOTAL_LESSONS} lessons · {overallPct}%</span>
          </div>
        )}
      </header>

      {/* Module grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map(mod => {
          const pct = getModuleProgress(mod.id, mod.lessons.length)
          return (
            <div
              key={mod.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${COLOR_TEXT[mod.color]}`}>
                  {mod.icon} Module {mod.number}
                </p>
                <span className="text-[10px] text-gray-400 tabular-nums">{pct}%</span>
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{mod.title}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4 leading-relaxed">{mod.tagline}</p>

              <div className="space-y-1 mb-4 flex-1">
                {mod.lessons.map(lesson => {
                  const status = getStatus(mod.id, lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })}
                      className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/70 text-left transition-colors cursor-pointer group"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          status === 'completed'
                            ? 'bg-emerald-500'
                            : status === 'in-progress'
                              ? 'bg-amber-500'
                              : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1">{lesson.title}</span>
                      <span className="text-[10px] text-gray-400 shrink-0">{lesson.duration}</span>
                      <ArrowRight size={11} className="text-gray-300 dark:text-gray-600 group-hover:text-amber-500 shrink-0 transition-colors" />
                    </button>
                  )
                })}
              </div>

              <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${COLOR_BAR[mod.color]}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}

        {/* Lab card */}
        <button
          onClick={() => onNavigate({ type: 'lab' })}
          className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/30 p-5 text-left hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer md:col-span-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shrink-0">
              <FlaskConical size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Live Simulation Lab</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                Create transactions, watch them enter the mempool, mine blocks with real Proof of Work, and inspect the Merkle tree — the whole system, hands-on.
              </p>
            </div>
            <ArrowRight size={16} className="text-indigo-400 ml-auto shrink-0" />
          </div>
        </button>
      </div>
    </div>
  )
}
