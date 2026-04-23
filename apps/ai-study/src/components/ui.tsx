import { type ReactNode, useState } from 'react'
import {
  ChevronDown, ChevronRight, AlertTriangle, Lightbulb,
  BookOpen, CheckCircle2, ArrowRight, HelpCircle, Info, X,
  Zap, Copy, Check
} from 'lucide-react'
import type {
  Term, Confusion, RecallQuestion, CheatSheetItem,
  FlowNode, CompareRow, ExpandableCard as ExpandableCardType,
  CauseEffect
} from '../types'

/* ── Section Shell ────────────────────────────────── */
export function SectionShell({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-20">
      {children}
    </section>
  )
}

export function SectionHeader({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-violet-500">Section {number}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-base text-slate-500 max-w-2xl">{subtitle}</p>
    </div>
  )
}

/* ── Subsection ───────────────────────────────────── */
export function Subsection({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}

/* ── Prose Block ──────────────────────────────────── */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="text-slate-600 leading-relaxed space-y-3 max-w-3xl text-[15px]">{children}</div>
}

/* ── Interactive Flow Map ─────────────────────────── */
const flowColors: Record<string, string> = {
  green: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  purple: 'bg-violet-50 border-violet-200 text-violet-800',
  orange: 'bg-amber-50 border-amber-200 text-amber-800',
  red: 'bg-rose-50 border-rose-200 text-rose-800',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  teal: 'bg-teal-50 border-teal-200 text-teal-800',
  slate: 'bg-slate-100 border-slate-200 text-slate-700',
  pink: 'bg-pink-50 border-pink-200 text-pink-800',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-800',
}

export function InteractiveFlowMap({ nodes, vertical }: { nodes: FlowNode[]; vertical?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = nodes.find(n => n.id === active)

  return (
    <div className="mb-6">
      <div className={`flex ${vertical ? 'flex-col items-center' : 'flex-wrap justify-center'} gap-2`}>
        {nodes.map((node, i) => (
          <div key={node.id} className={`flex ${vertical ? 'flex-col' : ''} items-center gap-2`}>
            <button
              onClick={() => setActive(active === node.id ? null : node.id)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer
                ${active === node.id
                  ? `${flowColors[node.color || 'blue']} ring-2 ring-offset-1 ring-violet-300 shadow-md scale-105`
                  : `${flowColors[node.color || 'slate']} hover:shadow-sm`
                }`}
            >
              {node.label}
            </button>
            {i < nodes.length - 1 && (
              <ArrowRight className={`w-4 h-4 text-slate-300 shrink-0 ${vertical ? 'rotate-90' : ''}`} />
            )}
          </div>
        ))}
      </div>
      {activeNode && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-slate-800 mb-1">{activeNode.label}</h4>
            <button onClick={() => setActive(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-sm text-slate-600">{activeNode.description}</p>
        </div>
      )}
    </div>
  )
}

/* ── Expandable Card Grid ─────────────────────────── */
export function ExpandableCardGrid({ cards, columns }: { cards: ExpandableCardType[]; columns?: number }) {
  return (
    <div className={`grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {cards.map((card, i) => (
        <ExpandableCardItem key={i} card={card} />
      ))}
    </div>
  )
}

function ExpandableCardItem({ card }: { card: ExpandableCardType }) {
  const [open, setOpen] = useState(false)
  const colorClass = flowColors[card.color || 'slate']

  return (
    <div className={`rounded-xl border p-4 transition-all ${open ? 'shadow-md' : 'shadow-sm hover:shadow-md'} ${colorClass}`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-sm">{card.title}</h4>
            {card.subtitle && <p className="text-xs mt-0.5 opacity-70">{card.subtitle}</p>}
          </div>
          {card.details && (
            open ? <ChevronDown className="w-4 h-4 shrink-0 mt-0.5" /> : <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
          )}
        </div>
        <p className="text-sm mt-2 opacity-80">{card.content}</p>
      </button>
      {open && card.details && (
        <div className="mt-3 pt-3 border-t border-current/10 text-sm opacity-75 whitespace-pre-line">
          {card.details}
        </div>
      )}
      {card.tags && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {card.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/60 font-medium">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Compare Table ────────────────────────────────── */
export function CompareTable({ headers, rows }: { headers: string[]; rows: CompareRow[] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 bg-slate-100 rounded-tl-xl font-semibold text-slate-700 border-b border-slate-200" />
            {headers.map(h => (
              <th key={h} className="text-left p-3 bg-slate-100 font-semibold text-slate-700 border-b border-slate-200 last:rounded-tr-xl">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
              <td className="p-3 font-medium text-slate-700">{row.attribute}</td>
              {row.values.map((v, j) => (
                <td key={j} className="p-3 text-slate-600">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Cause Effect Chain ───────────────────────────── */
export function CauseEffectChain({ chain }: { chain: CauseEffect[] }) {
  return (
    <div className="space-y-3 mb-6">
      {chain.map((item, i) => (
        <div key={i} className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-lg text-sm font-medium text-violet-800">{item.cause}</span>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.effect}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Terms Memory Block ───────────────────────────── */
export function TermsMemoryBlock({ terms }: { terms: Term[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  return (
    <div className="grid gap-2 md:grid-cols-2 mb-6">
      {terms.map((t, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-sm text-slate-800">{t.term}</span>
              {revealed.has(i) ? (
                <p className="text-sm text-slate-500 mt-1">{t.definition}</p>
              ) : (
                <p className="text-xs text-violet-400 mt-1 italic">tap to reveal</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

/* ── Common Confusion Alert ───────────────────────── */
export function CommonConfusionBlock({ confusions }: { confusions: Confusion[] }) {
  return (
    <div className="space-y-3 mb-6">
      {confusions.map((c, i) => (
        <div key={i} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Don't confuse <em>{c.itemA}</em> with <em>{c.itemB}</em>
              </p>
              <p className="text-sm text-amber-700 mt-1">{c.explanation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Mini Recall ──────────────────────────────────── */
export function MiniRecallBlock({ questions }: { questions: RecallQuestion[] }) {
  const [showAnswers, setShowAnswers] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setShowAnswers(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  return (
    <div className="space-y-3 mb-6">
      {questions.map((q, i) => (
        <div key={i} className="p-4 rounded-xl border border-violet-200 bg-violet-50/30">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">{q.question}</p>
              {showAnswers.has(i) ? (
                <p className="text-sm text-violet-700 mt-2 p-2 bg-violet-100/50 rounded-lg">{q.answer}</p>
              ) : (
                <button onClick={() => toggle(i)} className="text-xs text-violet-500 mt-1 hover:underline cursor-pointer">
                  Show answer
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Cheat Sheet ──────────────────────────────────── */
export function CheatSheetPanel({ items, title }: { items: CheatSheetItem[]; title?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-all cursor-pointer"
      >
        <CheckCircle2 className="w-4 h-4" />
        {title || 'Quick Cheat Sheet'}
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && (
        <div className="mt-3 p-4 rounded-xl border border-violet-100 bg-violet-50/30">
          <div className="grid gap-2">
            {items.map((item, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="font-semibold text-violet-700 shrink-0 min-w-[140px]">{item.label}</span>
                <span className="text-slate-600">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Info Callout ─────────────────────────────────── */
export function InfoCallout({ children, type }: { children: ReactNode; type?: 'info' | 'tip' | 'warning' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  }
  const icons = {
    info: <Info className="w-4 h-4 shrink-0 mt-0.5" />,
    tip: <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />,
  }

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-2.5 mb-4 ${styles[type || 'info']}`}>
      {icons[type || 'info']}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

/* ── Try This Callout ─────────────────────────────── */
export function TryThisCallout({ title, prompt }: { title?: string; prompt: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">{title || 'Try This Now'}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-medium transition-all cursor-pointer"
        >
          {copied
            ? <><Check className="w-3.5 h-3.5" /> Copied!</>
            : <><Copy className="w-3.5 h-3.5" /> Copy prompt</>
          }
        </button>
      </div>
      <pre className="text-sm text-emerald-700 whitespace-pre-wrap font-mono bg-emerald-100/60 rounded-lg p-3 leading-relaxed overflow-x-auto">{prompt}</pre>
    </div>
  )
}

/* ── Numbered Steps ───────────────────────────────── */
export function NumberedSteps({ steps }: { steps: { title: string; description: string; code?: string }[] }) {
  return (
    <div className="space-y-4 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-sm font-bold text-violet-700">
            {i + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-semibold text-slate-800">{step.title}</p>
            <p className="text-sm text-slate-500 mt-0.5">{step.description}</p>
            {step.code && (
              <code className="block mt-2 text-xs font-mono bg-slate-900 text-emerald-400 rounded-lg px-3 py-2">{step.code}</code>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
