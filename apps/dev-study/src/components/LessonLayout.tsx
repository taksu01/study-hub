import { useEffect } from 'react'
import { CheckCircle, Circle, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import type { NavigateFn, ProgressStatus } from '../types'

export interface KeyTerm {
  term: string
  meaning: string
  confusedWith?: string
}

export interface CheatSheetItem {
  label: string
  value: string
}

export interface LessonMeta {
  moduleId: string
  moduleTitle: string
  moduleColor: string
  lessonId: string
  title: string
  subtitle: string
  duration: string
  status: ProgressStatus
  onMarkComplete: () => void
  onNavigate: NavigateFn
  prev: { moduleId: string; lessonId: string; title: string } | null
  next: { moduleId: string; lessonId: string; title: string } | null
}

export function LessonLayout({
  meta,
  children,
}: {
  meta: LessonMeta
  children: React.ReactNode
}) {
  const { moduleTitle, moduleColor, title, subtitle, duration, status, onMarkComplete, onNavigate, prev, next } = meta

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [meta.lessonId])

  const accentClass = moduleColorToClass(moduleColor, 'text')
  const accentBg = moduleColorToClass(moduleColor, 'bg')
  const accentBorder = moduleColorToClass(moduleColor, 'border')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold font-code uppercase tracking-wider px-2 py-0.5 rounded ${accentBg} ${accentClass} border ${accentBorder}`}>
            {moduleTitle}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={10} />
            {duration}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-100 leading-tight">{title}</h1>
        <p className="text-slate-400 text-lg leading-relaxed">{subtitle}</p>

        {/* Progress + Complete button */}
        <div className="flex items-center gap-3 pt-2">
          {status === 'completed' ? (
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
              <CheckCircle size={16} />
              Completed
            </div>
          ) : (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-sm transition-all"
            >
              <Circle size={14} />
              Mark Complete
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'completed'
                  ? 'bg-emerald-400'
                  : status === 'in-progress'
                  ? 'bg-amber-400'
                  : 'bg-slate-600'
              }`}
            />
            {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In progress' : 'Not started'}
          </div>
        </div>
      </div>

      <div className="border-t border-rim" />

      {/* Lesson content */}
      {children}

      {/* Navigation */}
      <div className="border-t border-rim pt-6 flex items-center justify-between gap-4">
        {prev ? (
          <button
            onClick={() => onNavigate({ type: 'lesson', moduleId: prev.moduleId, lessonId: prev.lessonId })}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-slate-600">Previous</div>
              <div>{prev.title}</div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {next ? (
          <button
            onClick={() => onNavigate({ type: 'lesson', moduleId: next.moduleId, lessonId: next.lessonId })}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group text-right"
          >
            <div>
              <div className="text-xs text-slate-600">Next</div>
              <div>{next.title}</div>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export function LessonSection({
  id,
  title,
  icon,
  children,
  accent,
}: {
  id: string
  title: string
  icon: string
  children: React.ReactNode
  accent?: string
}) {
  return (
    <section id={id} className="space-y-4 scroll-mt-8">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <h2 className={`text-lg font-semibold ${accent ?? 'text-slate-200'}`}>{title}</h2>
      </div>
      <div className="space-y-3 text-slate-300 leading-relaxed">{children}</div>
    </section>
  )
}

export function KeyTermsTable({ terms }: { terms: KeyTerm[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rim">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-rim bg-surface2">
            <th className="text-left p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Term</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">What it means</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Confused with</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((term, i) => (
            <tr key={i} className="border-b border-rim last:border-0 hover:bg-surface2/50 transition-colors">
              <td className="p-3 font-code text-sky-300 font-medium whitespace-nowrap">{term.term}</td>
              <td className="p-3 text-slate-300 text-xs leading-relaxed">{term.meaning}</td>
              <td className="p-3 text-slate-500 text-xs leading-relaxed">{term.confusedWith ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MistakesBox({ mistakes }: { mistakes: { title: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {mistakes.map((m, i) => (
        <div key={i} className="flex gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-950/10">
          <span className="text-rose-400 text-lg shrink-0">⚠</span>
          <div>
            <div className="text-sm font-semibold text-rose-200 mb-1">{m.title}</div>
            <div className="text-xs text-slate-400 leading-relaxed">{m.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CheatSheet({ title, items }: { title: string; items: CheatSheetItem[] }) {
  return (
    <div className="rounded-xl border border-rim2 bg-surface2 overflow-hidden print:border-slate-300">
      <div className="px-4 py-3 border-b border-rim flex items-center gap-2 bg-surface">
        <span>📋</span>
        <span className="text-sm font-semibold text-slate-200">Cheat Sheet — {title}</span>
        <span className="text-xs text-slate-500 ml-auto">quick reference</span>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-lg bg-surface border border-rim">
            <div className="shrink-0">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-xs text-slate-300 font-code leading-relaxed">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CalloutBox({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  children: React.ReactNode
}) {
  const styles = {
    info: { icon: 'ℹ', border: 'border-sky-500/30', bg: 'bg-sky-950/20', text: 'text-sky-200' },
    warning: { icon: '⚡', border: 'border-amber-500/30', bg: 'bg-amber-950/20', text: 'text-amber-200' },
    tip: { icon: '💡', border: 'border-emerald-500/30', bg: 'bg-emerald-950/20', text: 'text-emerald-200' },
    danger: { icon: '🔥', border: 'border-rose-500/30', bg: 'bg-rose-950/20', text: 'text-rose-200' },
  }
  const s = styles[type]
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${s.border} ${s.bg}`}>
      <span className="shrink-0">{s.icon}</span>
      <div className={`text-sm leading-relaxed ${s.text}`}>{children}</div>
    </div>
  )
}

function moduleColorToClass(color: string, type: 'text' | 'bg' | 'border'): string {
  const map: Record<string, Record<string, string>> = {
    amber: { text: 'text-amber-400', bg: 'bg-amber-950/30', border: 'border-amber-500/30' },
    sky: { text: 'text-sky-400', bg: 'bg-sky-950/30', border: 'border-sky-500/30' },
    violet: { text: 'text-violet-400', bg: 'bg-violet-950/30', border: 'border-violet-500/30' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-950/30', border: 'border-cyan-500/30' },
    green: { text: 'text-green-400', bg: 'bg-green-950/30', border: 'border-green-500/30' },
    rose: { text: 'text-rose-400', bg: 'bg-rose-950/30', border: 'border-rose-500/30' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-950/30', border: 'border-orange-500/30' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-950/30', border: 'border-emerald-500/30' },
    indigo: { text: 'text-indigo-400', bg: 'bg-indigo-950/30', border: 'border-indigo-500/30' },
  }
  return map[color]?.[type] ?? (type === 'text' ? 'text-sky-400' : type === 'bg' ? 'bg-sky-950/30' : 'border-sky-500/30')
}
