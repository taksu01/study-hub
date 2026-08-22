import { useState } from 'react'
import { ChevronDown, Lightbulb, Info, AlertTriangle, Flame, CalendarClock } from 'lucide-react'

/* ────────────────────────────────────────────────────────────────
   Shared lesson building blocks.
   Styling idiom: light-first Tailwind classes with `dark:` variants,
   matching the existing visuals. Everything must work at 360px.
   ──────────────────────────────────────────────────────────────── */

export function LessonSection({
  title,
  icon,
  children,
}: {
  title: string
  icon?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{children}</p>
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>
}

/* ── Callout ───────────────────────────────────────────────────── */

const CALLOUT_STYLES = {
  info: {
    Icon: Info,
    box: 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40',
    icon: 'text-sky-500',
    text: 'text-sky-900 dark:text-sky-200',
  },
  tip: {
    Icon: Lightbulb,
    box: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40',
    icon: 'text-emerald-500',
    text: 'text-emerald-900 dark:text-emerald-200',
  },
  warning: {
    Icon: AlertTriangle,
    box: 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40',
    icon: 'text-indigo-500',
    text: 'text-indigo-900 dark:text-indigo-200',
  },
  danger: {
    Icon: Flame,
    box: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40',
    icon: 'text-rose-500',
    text: 'text-rose-900 dark:text-rose-200',
  },
} as const

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES
  title?: string
  children: React.ReactNode
}) {
  const s = CALLOUT_STYLES[type]
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${s.box}`}>
      <s.Icon size={16} className={`shrink-0 mt-0.5 ${s.icon}`} />
      <div className={`text-sm leading-relaxed ${s.text}`}>
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  )
}

/* ── NowBox: clearly-dated recent context, separate from evergreen content ── */

export function NowBox({ asOf, children }: { asOf: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/40 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-violet-100/70 dark:bg-violet-900/40 border-b border-violet-200 dark:border-violet-800">
        <CalendarClock size={13} className="text-violet-500 dark:text-violet-400 shrink-0" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
          Snapshot — as of {asOf}
        </span>
      </div>
      <div className="p-4 text-sm leading-relaxed text-violet-950 dark:text-violet-100 space-y-2">
        {children}
      </div>
    </div>
  )
}

/* ── StepFlow: numbered step diagram (replaces ASCII flows) ───── */

export function StepFlow({ steps }: { steps: { label: string; detail?: string }[] }) {
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && <div className="w-px flex-1 min-h-4 bg-indigo-200 dark:bg-indigo-800" />}
          </div>
          <div className="pb-4 pt-0.5 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{step.label}</p>
            {step.detail && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{step.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ── Key terms: table on desktop, cards on mobile ─────────────── */

export interface KeyTerm {
  term: string
  definition: string
}

export function KeyTermsGrid({ terms }: { terms: KeyTerm[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {terms.map((t, i) => (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">{t.term}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t.definition}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Common confusion: A vs B cards ───────────────────────────── */

export function ConfusionBlock({
  items,
}: {
  items: { a: string; b: string; explanation: string }[]
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {item.a}
            </span>
            <span className="text-xs text-slate-400 font-bold">vs</span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-xs font-semibold text-sky-700 dark:text-sky-300">
              {item.b}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.explanation}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Recall: active-recall prompts with reveal ────────────────── */

export function RecallBlock({ prompts }: { prompts: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-2.5">
      {prompts.map((p, i) => (
        <RecallCard key={i} question={p.question} answer={p.answer} />
      ))}
    </div>
  )
}

function RecallCard({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
      >
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{question}</span>
        <ChevronDown size={15} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-3.5 pt-1 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

/* ── Cheat sheet ──────────────────────────────────────────────── */

export function CheatSheet({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          📋 Cheat Sheet — quick refresher
        </p>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
        {items.map((item, i) => (
          <div key={i} className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 sm:w-40 shrink-0">{item.label}</span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
