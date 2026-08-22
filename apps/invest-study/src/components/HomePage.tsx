import { ArrowRight, PlayCircle } from 'lucide-react'
import { MODULES, TOTAL_LESSONS, findLessonMeta } from '../data/curriculum'
import type { NavigateFn } from '../types'
import { useProgress } from '../hooks/useProgress'

const COLOR_TEXT: Record<string, string> = {
  indigo: 'text-indigo-600 dark:text-indigo-400',
  sky: 'text-sky-600 dark:text-sky-400',
  amber: 'text-amber-600 dark:text-amber-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  rose: 'text-rose-600 dark:text-rose-400',
}

const COLOR_BAR: Record<string, string> = {
  indigo: 'bg-indigo-500',
  sky: 'bg-sky-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
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
      <header className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 mb-8 mt-8 lg:mt-0">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500 flex items-center justify-center font-bold text-lg shadow-lg">📈</div>
          <span className="text-[11px] font-bold tracking-widest text-indigo-300 uppercase">Investor's Mental Model</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
          Learn to think like a<br />
          <span className="text-indigo-400">rational allocator of capital</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
          {TOTAL_LESSONS} visual, interactive lessons across 5 modules — from cash flow and compounding to
          valuation, portfolio construction, and the psychology that makes or breaks it all. Quizzes with instant
          feedback, interactive calculators, and progress tracking.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {resume && (
            <button
              onClick={() => onNavigate({ type: 'lesson', moduleId: resume.moduleId, lessonId: resume.lessonId })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <PlayCircle size={16} />
              {completedCount > 0 ? `Continue: ${resume.title}` : 'Start learning'}
            </button>
          )}
        </div>
        {completedCount > 0 && (
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-400 transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
            <span className="text-xs text-slate-400 tabular-nums">{completedCount}/{TOTAL_LESSONS} lessons · {overallPct}%</span>
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
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${COLOR_TEXT[mod.color]}`}>
                  {mod.icon} Module {mod.number}
                </p>
                <span className="text-[10px] text-slate-400 tabular-nums">{pct}%</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{mod.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">{mod.tagline}</p>

              <div className="space-y-1 mb-4 flex-1">
                {mod.lessons.map(lesson => {
                  const status = getStatus(mod.id, lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })}
                      className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors cursor-pointer group"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          status === 'completed'
                            ? 'bg-emerald-500'
                            : status === 'in-progress'
                              ? 'bg-amber-500'
                              : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 truncate flex-1">{lesson.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{lesson.duration}</span>
                      <ArrowRight size={11} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 shrink-0 transition-colors" />
                    </button>
                  )
                })}
              </div>

              <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${COLOR_BAR[mod.color]}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
          Educational content only. Not financial advice. Always consult a qualified financial advisor for personal investment decisions.
        </p>
      </footer>
    </div>
  )
}
