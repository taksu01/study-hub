import { ArrowRight, BookOpen, CheckCircle, Clock, Lock, RotateCcw, Zap } from 'lucide-react'
import { MODULES, getLesson } from '../data/curriculum'
import type { NavigateFn } from '../types'
import { useProgress } from '../hooks/useProgress'

const moduleColorText: Record<string, string> = {
  amber: 'text-amber-400',
  sky: 'text-sky-400',
  violet: 'text-violet-400',
  cyan: 'text-cyan-400',
  green: 'text-green-400',
  rose: 'text-rose-400',
  orange: 'text-orange-400',
  emerald: 'text-emerald-400',
  indigo: 'text-indigo-400',
}

const moduleColorBorder: Record<string, string> = {
  amber: 'border-amber-500/20 hover:border-amber-500/50',
  sky: 'border-sky-500/20 hover:border-sky-500/50',
  violet: 'border-violet-500/20 hover:border-violet-500/50',
  cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
  green: 'border-green-500/20 hover:border-green-500/50',
  rose: 'border-rose-500/20 hover:border-rose-500/50',
  orange: 'border-orange-500/20 hover:border-orange-500/50',
  emerald: 'border-emerald-500/20 hover:border-emerald-500/50',
  indigo: 'border-indigo-500/20',
}

const moduleColorBarBg: Record<string, string> = {
  amber: 'bg-amber-400',
  sky: 'bg-sky-400',
  violet: 'bg-violet-400',
  cyan: 'bg-cyan-400',
  green: 'bg-green-400',
  rose: 'bg-rose-400',
  orange: 'bg-orange-400',
  emerald: 'bg-emerald-400',
  indigo: 'bg-indigo-400',
}

interface Props {
  onNavigate: NavigateFn
}

export function HomePage({ onNavigate }: Props) {
  const { getModuleProgress, getStatus, lastVisited, resetAll, progress } = useProgress()

  const lastVisitedInfo = lastVisited ? getLesson(
    lastVisited.split('/')[0],
    lastVisited.split('/')[1],
  ) : null

  const totalCompleted = Object.values(progress.lessons).filter(l => l.status === 'completed').length
  const totalAvailable = MODULES.reduce(
    (sum, m) => sum + (m.locked ? 0 : m.lessons.filter(l => l.implemented).length),
    0,
  )

  const implementedLessons = MODULES.flatMap(m =>
    m.locked ? [] : m.lessons.filter(l => l.implemented).map(l => ({ module: m, lesson: l })),
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 lg:pl-8 pl-16 space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <span className="text-sky-400 font-code text-sm font-bold">{'</>'}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">DevStudy</h1>
            <p className="text-sm text-slate-500">JavaScript & React — deep dives, not surface tutorials</p>
          </div>
        </div>

        <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
          Interactive study material for engineers who write code every day but have gaps in how things
          <em className="text-slate-300"> actually work</em> — closures, the event loop, React's reconciler, async patterns.
          Every concept has a visual, not just an explanation.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <BookOpen size={12} />
            {MODULES.reduce((s, m) => s + m.lessons.length, 0)} lessons across 9 modules
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle size={12} />
            {totalCompleted} completed
          </div>
          <div className="flex items-center gap-1.5 text-xs text-sky-400">
            <Zap size={12} />
            {totalAvailable} lessons available now
          </div>
        </div>
      </div>

      {/* Continue learning card */}
      {lastVisitedInfo && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Continue Learning</h2>
          <button
            onClick={() =>
              onNavigate({
                type: 'lesson',
                moduleId: lastVisitedInfo.module.id,
                lessonId: lastVisitedInfo.lesson.id,
              })
            }
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-sky-500/30 bg-sky-950/20 hover:border-sky-500/50 hover:bg-sky-950/30 transition-all text-left group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold font-code shrink-0 ${moduleColorText[lastVisitedInfo.module.color] ?? 'text-sky-400'} bg-sky-500/20`}
            >
              M{lastVisitedInfo.module.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-200 truncate">
                {lastVisitedInfo.lesson.title}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {lastVisitedInfo.module.title}
                {' · '}
                <span className="flex items-center gap-1 inline-flex">
                  <Clock size={10} />
                  {lastVisitedInfo.lesson.duration}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-sky-400 group-hover:translate-x-0.5 transition-transform">
              Resume <ArrowRight size={14} />
            </div>
          </button>
        </div>
      )}

      {/* Start here recommendation */}
      {!lastVisited && (
        <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-3">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span className="text-sm font-semibold text-amber-200">Start here</span>
          </div>
          <p className="text-sm text-amber-100/70 leading-relaxed">
            Start with <strong>Module 1: JS Engine & Runtime</strong>. The Event Loop lesson has a fully interactive
            step-through diagram — it'll make every async question click into place.
          </p>
          <button
            onClick={() => onNavigate({ type: 'lesson', moduleId: 'm1', lessonId: 'event-loop' })}
            className="flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition-colors"
          >
            Jump to Event Loop <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Module grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">All Modules</h2>
          {totalCompleted > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all progress?')) resetAll()
              }}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              <RotateCcw size={11} />
              Reset progress
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {MODULES.map(mod => {
            const progress = getModuleProgress(mod.id, mod.lessons.length)
            const colorText = moduleColorText[mod.color] ?? 'text-sky-400'
            const colorBorder = moduleColorBorder[mod.color] ?? 'border-sky-500/20 hover:border-sky-500/50'
            const colorBar = moduleColorBarBg[mod.color] ?? 'bg-sky-400'
            const implementedCount = mod.lessons.filter(l => l.implemented).length

            return (
              <div
                key={mod.id}
                className={`group p-4 rounded-xl border bg-surface transition-all ${colorBorder} ${
                  mod.locked ? 'opacity-60 cursor-default' : 'cursor-pointer hover:bg-surface2'
                }`}
                onClick={() => {
                  if (mod.locked) return
                  const firstLesson = mod.lessons[0]
                  onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: firstLesson.id })
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-code ${colorText} bg-surface2 border border-rim`}
                  >
                    {mod.locked ? <Lock size={12} className="text-slate-600" /> : mod.number}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-600">{mod.lessons.length} lessons</span>
                    {!mod.locked && (
                      <ArrowRight
                        size={12}
                        className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className={`text-sm font-semibold ${colorText}`}>{mod.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">{mod.tagline}</div>
                </div>

                {!mod.locked && (
                  <>
                    <div className="h-1 rounded-full bg-surface2 overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full progress-bar ${colorBar}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{progress}% complete</span>
                      <span className="text-sky-500/70">
                        {implementedCount} available
                      </span>
                    </div>
                  </>
                )}

                {mod.locked && (
                  <div className="text-xs text-indigo-400/60 border border-indigo-500/20 rounded px-2 py-1 text-center">
                    Coming Soon
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Available lessons quick-access */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Available Now — {implementedLessons.length} Lessons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {implementedLessons.map(({ module: mod, lesson }) => {
            const status = getStatus(mod.id, lesson.id)
            const colorText = moduleColorText[mod.color] ?? 'text-sky-400'
            return (
              <button
                key={`${mod.id}/${lesson.id}`}
                onClick={() => onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })}
                className="flex items-center gap-3 p-3 rounded-lg border border-rim hover:border-sky-500/30 bg-surface hover:bg-surface2 transition-all text-left group"
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-code shrink-0 ${colorText} bg-surface2 border border-rim`}
                >
                  {mod.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-300 truncate">{lesson.title}</div>
                  <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                    <Clock size={9} />
                    {lesson.duration}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {status === 'completed' && <CheckCircle size={12} className="text-emerald-400" />}
                  {status === 'in-progress' && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  <ArrowRight size={12} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  )
}
