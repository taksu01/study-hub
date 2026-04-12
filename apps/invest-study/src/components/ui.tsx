import { type ReactNode, useState } from 'react'
import {
  ChevronDown, ChevronRight, AlertTriangle, Lightbulb,
  BookOpen, CheckCircle2, ArrowRight, HelpCircle, Info, X
} from 'lucide-react'
import type {
  Term, Confusion, RecallQuestion, CheatSheetItem,
  FlowNode, CompareRow, ExpandableCard as ExpandableCardType,
  CauseEffect, MistakeEntry
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
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500">Section {number}</span>
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
                  ? `${flowColors[node.color || 'blue']} ring-2 ring-offset-1 ring-indigo-300 shadow-md scale-105`
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
        <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto animate-in fade-in">
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
        <div className="mt-3 pt-3 border-t border-current/10 text-sm opacity-75">
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
          <span className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-800">{item.cause}</span>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm font-medium text-amber-800">{item.effect}</span>
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
            <BookOpen className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-sm text-slate-800">{t.term}</span>
              {revealed.has(i) ? (
                <p className="text-sm text-slate-500 mt-1">{t.definition}</p>
              ) : (
                <p className="text-xs text-indigo-400 mt-1 italic">tap to reveal</p>
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
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-all cursor-pointer"
      >
        <CheckCircle2 className="w-4 h-4" />
        {title || 'Quick Cheat Sheet'}
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && (
        <div className="mt-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
          <div className="grid gap-2">
            {items.map((item, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="font-semibold text-indigo-700 shrink-0 min-w-[120px]">{item.label}</span>
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

/* ── Mistake Card ─────────────────────────────────── */
export function MistakeCard({ mistake }: { mistake: MistakeEntry }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/30 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 text-left cursor-pointer flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-semibold text-sm text-rose-800">{mistake.title}</span>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-rose-400" /> : <ChevronRight className="w-4 h-4 text-rose-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm">
          <div>
            <span className="font-medium text-slate-700">Why it happens: </span>
            <span className="text-slate-600">{mistake.whyItHappens}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">What it looks like: </span>
            <span className="text-slate-600">{mistake.whatItLooksLike}</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="font-medium text-emerald-800">Instead: </span>
            <span className="text-emerald-700">{mistake.whatToDoInstead}</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Scenario Widget ──────────────────────────────── */
export function ScenarioWidget({ title, scenarios }: { title: string; scenarios: { label: string; description: string; details: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="mb-6 p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${selected === i ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm font-medium text-slate-700 mb-1">{scenarios[selected].description}</p>
          <p className="text-sm text-slate-500">{scenarios[selected].details}</p>
        </div>
      )}
    </div>
  )
}

/* ── Portfolio Bucket Map ─────────────────────────── */
export function PortfolioBucketMap({ buckets }: {
  buckets: { name: string; allocation: string; description: string; color: string; assets: string[] }[]
}) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="mb-6">
      <div className="flex rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        {buckets.map((b, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{ flex: b.allocation.replace('%', '') }}
            className={`p-3 text-center transition-all cursor-pointer border-r last:border-r-0 border-slate-200
              ${active === i ? `${flowColors[b.color]} ring-2 ring-inset ring-indigo-300` : flowColors[b.color]}`}
          >
            <div className="text-xs font-bold">{b.allocation}</div>
            <div className="text-xs font-medium mt-0.5">{b.name}</div>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-semibold text-sm text-slate-800 mb-1">{buckets[active].name} — {buckets[active].allocation}</h4>
          <p className="text-sm text-slate-600 mb-2">{buckets[active].description}</p>
          <div className="flex flex-wrap gap-1.5">
            {buckets[active].assets.map(a => (
              <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{a}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Tabbed Content ───────────────────────────────── */
export function TabbedContent({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="mb-6">
      <div className="flex gap-1 border-b border-slate-200 mb-4">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium transition-all cursor-pointer rounded-t-lg
              ${active === i ? 'bg-white border border-b-white border-slate-200 text-indigo-600 -mb-px' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  )
}

/* ── Compounding Calculator ───────────────────────── */
export function CompoundingVisualizer() {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)

  const data: { year: number; invested: number; total: number }[] = []
  let total = principal
  let invested = principal
  for (let y = 1; y <= years; y++) {
    total = total * (1 + rate / 100) + monthly * 12
    invested += monthly * 12
    data.push({ year: y, invested, total: Math.round(total) })
  }

  const maxVal = data.length > 0 ? data[data.length - 1].total : 1

  return (
    <div className="mb-6 p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-4">Compounding Explorer</h4>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-xs text-slate-500 font-medium">Starting Amount</label>
          <input type="range" min={1000} max={100000} step={1000} value={principal} onChange={e => setPrincipal(+e.target.value)} className="w-full" />
          <span className="text-sm font-semibold text-slate-700">${principal.toLocaleString()}</span>
        </div>
        <div>
          <label className="text-xs text-slate-500 font-medium">Monthly Addition</label>
          <input type="range" min={0} max={5000} step={100} value={monthly} onChange={e => setMonthly(+e.target.value)} className="w-full" />
          <span className="text-sm font-semibold text-slate-700">${monthly.toLocaleString()}</span>
        </div>
        <div>
          <label className="text-xs text-slate-500 font-medium">Annual Return</label>
          <input type="range" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
          <span className="text-sm font-semibold text-slate-700">{rate}%</span>
        </div>
        <div>
          <label className="text-xs text-slate-500 font-medium">Years</label>
          <input type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(+e.target.value)} className="w-full" />
          <span className="text-sm font-semibold text-slate-700">{years} yrs</span>
        </div>
      </div>

      <div className="flex items-end gap-0.5 h-48 mb-2">
        {data.filter((_, i) => i % Math.max(1, Math.floor(years / 30)) === 0 || i === data.length - 1).map((d) => {
          const totalH = (d.total / maxVal) * 100
          const investedH = (d.invested / maxVal) * 100
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-0" title={`Year ${d.year}`}>
              <div className="w-full relative" style={{ height: '192px' }}>
                <div className="absolute bottom-0 w-full bg-indigo-200 rounded-t" style={{ height: `${totalH}%` }} />
                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t" style={{ height: `${investedH}%` }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded" /> Invested</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-200 rounded" /> Growth</span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-xl">
          <div className="text-xs text-slate-500">Total Invested</div>
          <div className="text-lg font-bold text-slate-800">${data.length > 0 ? data[data.length - 1].invested.toLocaleString() : '0'}</div>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl">
          <div className="text-xs text-indigo-500">Final Value</div>
          <div className="text-lg font-bold text-indigo-700">${data.length > 0 ? data[data.length - 1].total.toLocaleString() : '0'}</div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl">
          <div className="text-xs text-emerald-500">Growth</div>
          <div className="text-lg font-bold text-emerald-700">${data.length > 0 ? (data[data.length - 1].total - data[data.length - 1].invested).toLocaleString() : '0'}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Asset Role Card ──────────────────────────────── */
export function AssetRoleCards({ assets }: {
  assets: { name: string; role: string; strengths: string[]; weaknesses: string[]; color: string }[]
}) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      {assets.map((a, i) => (
        <button
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer
            ${active === i ? `${flowColors[a.color]} shadow-md ring-2 ring-offset-1 ring-indigo-200` : `${flowColors[a.color]} hover:shadow-md`}`}
        >
          <h4 className="font-bold text-sm mb-1">{a.name}</h4>
          <p className="text-sm opacity-80 mb-2">{a.role}</p>
          {active === i && (
            <div className="space-y-2 mt-3 pt-3 border-t border-current/10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-60">Strengths</span>
                <ul className="mt-1 space-y-0.5">
                  {a.strengths.map(s => <li key={s} className="text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {s}</li>)}
                </ul>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-60">Weaknesses</span>
                <ul className="mt-1 space-y-0.5">
                  {a.weaknesses.map(w => <li key={w} className="text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {w}</li>)}
                </ul>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
