import { type ReactNode, useState } from 'react'
import {
  ChevronDown, ChevronRight, AlertTriangle, Lightbulb,
  CheckCircle2, ArrowRight, ArrowDown, HelpCircle, Info, X,
  Zap, Brain, Cloud, Cpu, Eye, EyeOff, MoveHorizontal, Check,
} from 'lucide-react'
import { CopyButton } from './CodeBlock'
import type {
  Term, Confusion, RecallQuestion, CheatSheetItem,
  FlowNode, CompareRow, ExpandableCard as ExpandableCardType,
  CauseEffect, TaxonomyNode, ModelCard, ColorKey,
} from '../types'

/* ── Colour system ────────────────────────────────── */

export const tone: Record<ColorKey, { soft: string; ring: string; dot: string; text: string }> = {
  slate:  { soft: 'bg-slate-100 border-slate-300 text-slate-700',     ring: 'ring-slate-400',   dot: 'bg-slate-400',   text: 'text-slate-600' },
  blue:   { soft: 'bg-blue-50 border-blue-300 text-blue-800',         ring: 'ring-blue-400',    dot: 'bg-blue-500',    text: 'text-blue-600' },
  indigo: { soft: 'bg-indigo-50 border-indigo-300 text-indigo-800',   ring: 'ring-indigo-400',  dot: 'bg-indigo-500',  text: 'text-indigo-600' },
  violet: { soft: 'bg-violet-50 border-violet-300 text-violet-800',   ring: 'ring-violet-400',  dot: 'bg-violet-500',  text: 'text-violet-600' },
  purple: { soft: 'bg-purple-50 border-purple-300 text-purple-800',   ring: 'ring-purple-400',  dot: 'bg-purple-500',  text: 'text-purple-600' },
  pink:   { soft: 'bg-pink-50 border-pink-300 text-pink-800',         ring: 'ring-pink-400',    dot: 'bg-pink-500',    text: 'text-pink-600' },
  orange: { soft: 'bg-amber-50 border-amber-300 text-amber-800',      ring: 'ring-amber-400',   dot: 'bg-amber-500',   text: 'text-amber-600' },
  teal:   { soft: 'bg-teal-50 border-teal-300 text-teal-800',         ring: 'ring-teal-400',    dot: 'bg-teal-500',    text: 'text-teal-600' },
  green:  { soft: 'bg-emerald-50 border-emerald-300 text-emerald-800', ring: 'ring-emerald-400', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  red:    { soft: 'bg-rose-50 border-rose-300 text-rose-800',         ring: 'ring-rose-400',    dot: 'bg-rose-500',    text: 'text-rose-600' },
  cyan:   { soft: 'bg-cyan-50 border-cyan-300 text-cyan-800',         ring: 'ring-cyan-400',    dot: 'bg-cyan-500',    text: 'text-cyan-600' },
}

/* ── Section shell ────────────────────────────────── */

export function SectionShell({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-24 mb-20">{children}</section>
}

export function SectionHeader({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <header className="mb-8 pb-6 border-b border-slate-200">
      <span className="text-xs font-semibold tracking-widest uppercase text-violet-500">
        Section {number}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-2 tracking-tight">{title}</h2>
      <p className="text-base text-slate-500 max-w-2xl leading-relaxed">{subtitle}</p>
    </header>
  )
}

export function Subsection({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-12">
      {/* items-start + nudge keeps the icon on the first line when the title wraps */}
      <h3 className="flex items-start gap-2 text-lg font-semibold text-slate-800 mb-4">
        {icon && <span className="shrink-0 mt-1">{icon}</span>}
        <span>{title}</span>
      </h3>
      {children}
    </div>
  )
}

/* ── Text ─────────────────────────────────────────── */

export function Prose({ children }: { children: ReactNode }) {
  return <div className="text-slate-600 leading-relaxed space-y-3 max-w-2xl text-[15px] mb-5">{children}</div>
}

/** The single sentence a reader should leave a subsection with. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 pl-4 border-l-[3px] border-violet-400 text-[15px] text-slate-700 leading-relaxed max-w-2xl">
      {children}
    </p>
  )
}

/** Scannable points — use instead of a paragraph whenever the content is a list. */
export function Points({ items, color = 'violet' }: { items: (string | ReactNode)[]; color?: ColorKey }) {
  return (
    <ul className="space-y-2 mb-5 max-w-2xl">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] text-slate-600 leading-relaxed">
          <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${tone[color].dot}`} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** A labelled concrete instance. The antidote to abstract prose. */
export function Example({ label = 'Example', children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-5 rounded-lg border border-slate-200 bg-white overflow-hidden max-w-2xl">
      <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
      </div>
      <div className="px-3 py-2.5 text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  )
}

/* ── Flow map ─────────────────────────────────────── */
/* Stacks vertically below `sm` so arrows never point into a line break. */

export function InteractiveFlowMap({ nodes, vertical }: { nodes: FlowNode[]; vertical?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = nodes.find(n => n.id === active)

  const layout = vertical
    ? 'flex-col items-stretch sm:items-center'
    : 'flex-col items-stretch sm:flex-row sm:flex-wrap sm:justify-center sm:items-center'

  return (
    <div className="mb-6">
      <div className={`flex gap-2 ${layout}`}>
        {nodes.map((node, i) => {
          const t = tone[node.color ?? 'slate']
          const isActive = active === node.id
          return (
            <div key={node.id} className={`flex gap-2 ${vertical ? 'flex-col items-stretch sm:items-center' : 'flex-col sm:flex-row items-stretch sm:items-center'}`}>
              <button
                onClick={() => setActive(isActive ? null : node.id)}
                aria-expanded={isActive}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer w-full sm:w-auto
                  ${t.soft}
                  ${isActive ? `ring-2 ring-offset-1 ${t.ring} shadow-md` : 'hover:shadow-sm'}`}
              >
                {node.label}
              </button>
              {i < nodes.length - 1 && (
                <>
                  <ArrowDown className={`w-4 h-4 text-slate-300 shrink-0 mx-auto ${vertical ? '' : 'sm:hidden'}`} aria-hidden />
                  {!vertical && <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" aria-hidden />}
                </>
              )}
            </div>
          )
        })}
      </div>

      {activeNode && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto animate-fade-in">
          <div className="flex justify-between items-start gap-3">
            <h4 className="font-semibold text-slate-800 mb-1">{activeNode.label}</h4>
            <button
              onClick={() => setActive(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{activeNode.description}</p>
        </div>
      )}
    </div>
  )
}

/* ── Taxonomy tree ────────────────────────────────── */
/* Indent shrinks on mobile (12px vs 24px) so 5 levels still fit at 360px. */

function TaxTreeNode({
  node, selected, onSelect,
}: {
  node: TaxonomyNode
  selected: string | null
  onSelect: (id: string | null) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const isSelected = selected === node.id
  const hasChildren = (node.children?.length ?? 0) > 0
  const t = tone[node.color ?? 'slate']

  return (
    <div>
      <div className="flex items-start gap-1">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            className="w-5 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 shrink-0 cursor-pointer transition-colors"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <div className="w-5 shrink-0" />
        )}

        <button
          onClick={() => onSelect(isSelected ? null : node.id)}
          className={`flex flex-wrap items-baseline gap-x-1.5 px-2.5 py-1.5 rounded-lg border text-sm font-medium text-left transition-all cursor-pointer min-w-0
            ${t.soft}
            ${isSelected ? `ring-2 ring-offset-1 ${t.ring} shadow-md` : 'hover:shadow-sm'}`}
        >
          <span>{node.label}</span>
          {node.subtitle && <span className="text-xs font-normal opacity-60">— {node.subtitle}</span>}
        </button>
      </div>

      {hasChildren && expanded && (
        <div className="ml-2.5 sm:ml-6 mt-2 border-l-2 border-slate-200 pl-2 sm:pl-4 space-y-2.5 pb-1">
          {node.children!.map(child => (
            <TaxTreeNode key={child.id} node={child} selected={selected} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export function TaxonomyTree({ nodes }: { nodes: TaxonomyNode[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  function findNode(list: TaxonomyNode[], id: string): TaxonomyNode | null {
    for (const n of list) {
      if (n.id === id) return n
      const found = n.children ? findNode(n.children, id) : null
      if (found) return found
    }
    return null
  }

  const selectedNode = selected ? findNode(nodes, selected) : null

  return (
    <div className="mb-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
          Each box contains the ones nested inside it — click any to define it
        </p>
        {nodes.map(n => (
          <TaxTreeNode key={n.id} node={n} selected={selected} onSelect={setSelected} />
        ))}
      </div>

      {selectedNode && (
        <div className="mt-3 p-4 bg-white rounded-xl border border-violet-200 shadow-sm animate-fade-in">
          <div className="flex justify-between items-start gap-3 mb-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-800">{selectedNode.label}</h4>
              {selectedNode.subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">{selectedNode.subtitle}</p>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{selectedNode.description}</p>
          {selectedNode.examples?.length ? (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Examples:</span>
              {selectedNode.examples.map(e => (
                <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {e}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

/* ── Model cards ──────────────────────────────────── */

function ModelCardItem({ model }: { model: ModelCard }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col
      ${model.access === 'local' ? 'border-emerald-200' : 'border-slate-200'}`}>
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 text-sm leading-tight">{model.name}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{model.maker}</p>
          </div>
          <div className="flex flex-col gap-1 items-end shrink-0">
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 whitespace-nowrap
              ${model.access === 'cloud' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {model.access === 'cloud'
                ? <><Cloud className="w-2.5 h-2.5" aria-hidden />Cloud</>
                : <><Cpu className="w-2.5 h-2.5" aria-hidden />Local</>}
            </span>
            {model.modelType === 'reasoning' && (
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700 flex items-center gap-1 whitespace-nowrap">
                <Brain className="w-2.5 h-2.5" aria-hidden />Reasoning
              </span>
            )}
            {model.multimodal && (
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-teal-100 text-teal-700 whitespace-nowrap">
                Multimodal
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-xs text-slate-500 font-medium">Context:</span>
          <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-md text-slate-700 font-mono">{model.contextWindow}</span>
        </div>

        <p className="text-xs text-slate-600 mb-3">
          <span className="font-medium text-slate-700">Best for:</span> {model.bestFor}
        </p>

        <button
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          className="text-xs text-violet-500 hover:text-violet-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
          {open ? 'Hide details' : 'Strengths & cost'}
        </button>

        {open && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-fade-in">
            <ul className="space-y-1">
              {model.strengths.map((s, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-violet-400 mt-0.5 shrink-0" aria-hidden>•</span>{s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span className="font-medium">Cost:</span> {model.costTier}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function ModelCardGrid({ models }: { models: ModelCard[] }) {
  const [filter, setFilter] = useState<'all' | 'cloud' | 'local' | 'reasoning'>('all')

  const shown = models.filter(m =>
    filter === 'all' ? true
      : filter === 'reasoning' ? m.modelType === 'reasoning'
        : m.access === filter)

  const filters = [
    { id: 'all', label: `All (${models.length})` },
    { id: 'cloud', label: `Cloud (${models.filter(m => m.access === 'cloud').length})` },
    { id: 'local', label: `Local & free (${models.filter(m => m.access === 'local').length})` },
    { id: 'reasoning', label: `Reasoning (${models.filter(m => m.modelType === 'reasoning').length})` },
  ] as const

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border
              ${filter === f.id
                ? 'bg-violet-500 border-violet-500 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m, i) => <ModelCardItem key={i} model={m} />)}
      </div>
    </div>
  )
}

/* ── Expandable cards ─────────────────────────────── */

function ExpandableCardItem({ card }: { card: ExpandableCardType }) {
  const [open, setOpen] = useState(false)
  const t = tone[card.color ?? 'slate']
  const hasMore = Boolean(card.points?.length || card.example || card.details)

  return (
    <div className={`rounded-xl border p-4 transition-shadow ${open ? 'shadow-md' : 'shadow-sm hover:shadow-md'} ${t.soft}`}>
      <button
        onClick={() => hasMore && setOpen(v => !v)}
        aria-expanded={hasMore ? open : undefined}
        className={`w-full text-left ${hasMore ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm">{card.title}</h4>
            {card.subtitle && <p className="text-xs mt-0.5 opacity-70">{card.subtitle}</p>}
          </div>
          {hasMore && (
            <ChevronDown className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
          )}
        </div>
        <p className="text-sm mt-2 opacity-80 leading-relaxed">{card.content}</p>
      </button>

      {open && (
        <div className="mt-3 pt-3 border-t border-current/15 space-y-3 animate-fade-in">
          {card.points?.length ? (
            <ul className="space-y-1.5">
              {card.points.map((p, i) => (
                <li key={i} className="text-sm opacity-80 flex items-start gap-2 leading-relaxed">
                  <span className="opacity-50 mt-0.5 shrink-0" aria-hidden>—</span>{p}
                </li>
              ))}
            </ul>
          ) : null}
          {card.example && (
            <div className="rounded-lg bg-white/70 px-3 py-2 text-[13px] font-mono text-slate-700 overflow-x-auto whitespace-pre-wrap break-words">
              {card.example}
            </div>
          )}
          {card.details && (
            <p className="text-sm opacity-75 whitespace-pre-line leading-relaxed">{card.details}</p>
          )}
        </div>
      )}

      {card.tags && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {card.tags.map(tag => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-white/60 font-medium">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export function ExpandableCardGrid({ cards, columns }: { cards: ExpandableCardType[]; columns?: number }) {
  const cols = columns === 2 ? 'sm:grid-cols-2'
    : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-3'
  return (
    <div className={`grid gap-4 mb-6 ${cols}`}>
      {cards.map((card, i) => <ExpandableCardItem key={i} card={card} />)}
    </div>
  )
}

/* ── Compare table ────────────────────────────────── */
/* Table on `sm`+, stacked cards below — a 5-column table is unreadable at 360px. */

export function CompareTable({ headers, rows }: { headers: string[]; rows: CompareRow[] }) {
  return (
    <div className="mb-6">
      {/* Mobile: one card per attribute */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-semibold text-sm text-slate-700">
              {row.attribute}
            </div>
            <dl className="divide-y divide-slate-100">
              {row.values.map((v, j) => (
                <div key={j} className="px-3 py-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{headers[j]}</dt>
                  <dd className="text-sm text-slate-600 mt-0.5">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: real table */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200" />
                {headers.map(h => (
                  <th key={h} className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-medium text-slate-700 align-top">{row.attribute}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="p-3 text-slate-600 align-top">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5 lg:hidden">
          <MoveHorizontal className="w-3 h-3" aria-hidden />Scroll the table sideways for more columns
        </p>
      </div>
    </div>
  )
}

/* ── Cause → effect ───────────────────────────────── */

export function CauseEffectChain({ chain }: { chain: CauseEffect[] }) {
  return (
    <div className="space-y-2 mb-6">
      {chain.map((item, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
          <span className="px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-lg text-sm font-medium text-violet-800 sm:shrink-0">
            {item.cause}
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-slate-300 ml-3 sm:hidden" aria-hidden />
          <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" aria-hidden />
          <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
            {item.effect}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Term deck ────────────────────────────────────── */
/* Definition is always visible — hiding it behind a tap made the glossary
   useless as a reference. Only the deeper note is progressive.             */

export function TermsMemoryBlock({ terms, quizzable = true }: { terms: Term[]; quizzable?: boolean }) {
  const [quiz, setQuiz] = useState(false)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [openDetail, setOpenDetail] = useState<Set<number>>(new Set())

  function toggleIn(set: Set<number>, i: number) {
    const next = new Set(set)
    if (next.has(i)) next.delete(i); else next.add(i)
    return next
  }

  return (
    <div className="mb-6">
      {quizzable && (
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <button
            onClick={() => { setQuiz(v => !v); setRevealed(new Set()) }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer
              ${quiz
                ? 'bg-violet-500 border-violet-500 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'}`}
          >
            {quiz ? <EyeOff className="w-3.5 h-3.5" aria-hidden /> : <Eye className="w-3.5 h-3.5" aria-hidden />}
            {quiz ? 'Quiz mode on — definitions hidden' : 'Quiz me'}
          </button>
          {quiz && (
            <span className="text-xs text-slate-400">
              {revealed.size} / {terms.length} revealed
            </span>
          )}
        </div>
      )}

      <div className="grid gap-2.5 md:grid-cols-2">
        {terms.map((t, i) => {
          const hidden = quiz && !revealed.has(i)
          return (
            <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-violet-200 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-sm text-slate-800">{t.term}</h4>
                {t.detail && !hidden && (
                  <button
                    onClick={() => setOpenDetail(s => toggleIn(s, i))}
                    aria-expanded={openDetail.has(i)}
                    aria-label={`More on ${t.term}`}
                    className="text-slate-300 hover:text-violet-500 cursor-pointer shrink-0 transition-colors"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDetail.has(i) ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {hidden ? (
                <button
                  onClick={() => setRevealed(s => toggleIn(s, i))}
                  className="mt-2 w-full py-2 rounded-lg border border-dashed border-violet-200 text-xs text-violet-500 hover:bg-violet-50 cursor-pointer transition-colors"
                >
                  Define it in your head, then tap to check
                </button>
              ) : (
                <>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{t.short}</p>
                  {t.example && (
                    <p className="mt-2 text-[13px] text-slate-500 font-mono bg-slate-50 rounded-md px-2 py-1.5 break-words">
                      {t.example}
                    </p>
                  )}
                  {t.detail && openDetail.has(i) && (
                    <p className="mt-2 pt-2 border-t border-slate-100 text-sm text-slate-500 leading-relaxed animate-fade-in">
                      {t.detail}
                    </p>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Confusions ───────────────────────────────────── */

export function CommonConfusionBlock({ confusions }: { confusions: Confusion[] }) {
  return (
    <div className="space-y-3 mb-6">
      {confusions.map((c, i) => (
        <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/60 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-amber-900 flex flex-wrap items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-[13px]">{c.itemA}</span>
                  <span className="font-normal opacity-70">is not</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-[13px]">{c.itemB}</span>
                </p>
                <p className="text-sm text-amber-800 mt-1.5 leading-relaxed">{c.explanation}</p>
              </div>
            </div>
          </div>
          {c.fix && (
            <p className="px-4 py-2 bg-amber-100/70 border-t border-amber-200 text-sm text-amber-900 flex items-start gap-2">
              <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="font-semibold">Remember:</strong> {c.fix}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Self-check ───────────────────────────────────── */
/* Reveal is a real toggle — the old version replaced the button with the
   answer, so it could never be hidden again.                               */

export function MiniRecallBlock({ questions }: { questions: RecallQuestion[] }) {
  const [shown, setShown] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setShown(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  const allOpen = shown.size === questions.length

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs text-slate-400 font-medium">
          {shown.size} of {questions.length} answered
        </span>
        <button
          onClick={() => setShown(allOpen ? new Set() : new Set(questions.map((_, i) => i)))}
          className="text-xs text-violet-500 hover:text-violet-700 font-medium cursor-pointer"
        >
          {allOpen ? 'Hide all' : 'Reveal all'}
        </button>
      </div>

      <div className="space-y-2.5">
        {questions.map((q, i) => {
          const open = shown.has(i)
          return (
            <div key={i} className="rounded-xl border border-violet-200 bg-violet-50/40 overflow-hidden">
              <button
                onClick={() => toggle(i)}
                aria-expanded={open}
                className="w-full flex items-start gap-2.5 p-4 text-left cursor-pointer hover:bg-violet-50 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" aria-hidden />
                <span className="flex-1 text-sm font-medium text-slate-700">{q.question}</span>
                <ChevronDown className={`w-4 h-4 text-violet-400 shrink-0 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {open && (
                <p className="px-4 pb-4 pl-11 text-sm text-violet-800 leading-relaxed animate-fade-in">
                  {q.answer}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Cheat sheet ──────────────────────────────────── */
/* Two-line stack on mobile instead of a 140px label column squeezing values. */

export function CheatSheetPanel({ items, title }: { items: CheatSheetItem[]; title?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors cursor-pointer"
      >
        <CheckCircle2 className="w-4 h-4" aria-hidden />
        {title ?? 'Quick cheat sheet'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <dl className="mt-3 rounded-xl border border-violet-100 bg-white divide-y divide-violet-50 overflow-hidden animate-fade-in">
          {items.map((item, i) => (
            <div key={i} className="px-4 py-2.5 sm:flex sm:gap-4">
              <dt className="font-semibold text-violet-700 text-sm sm:w-44 sm:shrink-0">{item.label}</dt>
              <dd className="text-sm text-slate-600 mt-0.5 sm:mt-0 sm:flex-1">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

/* ── Callouts ─────────────────────────────────────── */

export function InfoCallout({ children, type }: { children: ReactNode; type?: 'info' | 'tip' | 'warning' }) {
  const kind = type ?? 'info'
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  }
  const icons = {
    info: <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" aria-hidden />,
    tip: <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" aria-hidden />,
    warning: <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" aria-hidden />,
  }

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-2.5 mb-5 max-w-2xl ${styles[kind]}`}>
      {icons[kind]}
      <div className="text-sm leading-relaxed min-w-0">{children}</div>
    </div>
  )
}

/** A prompt to paste into a real chat. Prompts only — code goes in CodeBlock. */
export function TryThisCallout({ title, prompt }: { title?: string; prompt: string }) {
  return (
    <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-emerald-200/70">
        <div className="flex items-center gap-2 min-w-0">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden />
          <span className="text-sm font-semibold text-emerald-800 truncate">{title ?? 'Try this now'}</span>
        </div>
        <CopyButton value={prompt} tone="light" />
      </div>
      <pre className="text-sm text-emerald-900 whitespace-pre-wrap font-mono p-4 leading-relaxed overflow-x-auto">
        {prompt}
      </pre>
    </div>
  )
}

/* ── Steps ────────────────────────────────────────── */

export function NumberedSteps({ steps }: { steps: { title: string; description: string; code?: string }[] }) {
  return (
    <ol className="space-y-4 mb-6 max-w-2xl">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-sm font-bold text-violet-700">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-semibold text-slate-800">{step.title}</p>
            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
            {step.code && (
              <div className="mt-2 flex items-stretch gap-2">
                <code className="flex-1 min-w-0 text-xs font-mono bg-slate-900 text-emerald-300 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre">
                  {step.code}
                </code>
                <CopyButton value={step.code} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
