import { useEffect } from 'react'
import { CheckCircle, Circle, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import type { NavigateFn } from '../../types'
import { findLessonMeta, prevNext } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'

const MODULE_BADGE: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  sky: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  amber: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  rose: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
}

export function LessonLayout({
  moduleId,
  lessonId,
  subtitle,
  onNavigate,
  children,
}: {
  moduleId: string
  lessonId: string
  subtitle: string
  onNavigate: NavigateFn
  children: React.ReactNode
}) {
  const meta = findLessonMeta(moduleId, lessonId)
  const { getStatus, markComplete } = useProgress()
  const { prev, next } = prevNext(moduleId, lessonId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [moduleId, lessonId])

  if (!meta) return null
  const { module: mod, lesson } = meta
  const status = getStatus(moduleId, lessonId)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 pt-8 lg:pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${MODULE_BADGE[mod.color]}`}>
            {mod.icon} {mod.title}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={11} />
            {lesson.duration}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">{subtitle}</p>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800" />

      {children}

      {/* Complete + navigation footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-6">
        <div className="flex justify-center">
          {status === 'completed' ? (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
              <CheckCircle size={17} />
              Lesson completed
            </div>
          ) : (
            <button
              onClick={() => markComplete(moduleId, lessonId)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Circle size={15} />
              Mark lesson complete
            </button>
          )}
        </div>

        <div className="flex items-stretch justify-between gap-3">
          {prev ? (
            <button
              onClick={() => onNavigate({ type: 'lesson', moduleId: prev.moduleId, lessonId: prev.lessonId })}
              className="flex items-center gap-2 max-w-[48%] text-left px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group"
            >
              <ChevronLeft size={15} className="shrink-0 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-slate-400">Previous</span>
                <span className="block text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">{prev.title}</span>
              </span>
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              onClick={() => onNavigate({ type: 'lesson', moduleId: next.moduleId, lessonId: next.lessonId })}
              className="flex items-center gap-2 max-w-[48%] text-right ml-auto px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group"
            >
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-slate-400">Next</span>
                <span className="block text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">{next.title}</span>
              </span>
              <ChevronRight size={15} className="shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
