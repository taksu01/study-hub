import { useState, type ReactNode } from 'react'
import { Clock, Gauge, Layers, ArrowRight, ChevronDown } from 'lucide-react'
import type { CodeTab } from '../../types'
import { CodeBlock } from '../CodeBlock'

export interface Blueprint {
  id: string
  name: string
  pitch: string
  difficulty: 'Low' | 'Medium' | 'High'
  time: string
  concepts: string
  sections: string
  /** Cause → effect steps that make up the architecture. */
  flow: { step: string; result: string }[]
  code: CodeTab[]
  /** The thing that actually bites people building this. */
  watchOut: ReactNode
}

const DIFFICULTY_STYLE: Record<Blueprint['difficulty'], string> = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
}

type Tab = 'architecture' | 'code'

/**
 * One project, collapsed to a card until opened. Five expanded blueprints on
 * one page was the single largest wall of text in the old guide.
 */
export function ProjectBlueprint({ bp, defaultOpen = false }: { bp: Blueprint; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [tab, setTab] = useState<Tab>('architecture')

  return (
    <div className={`mb-4 rounded-2xl border bg-white overflow-hidden transition-shadow
      ${open ? 'border-violet-300 shadow-md' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="w-full text-left p-4 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-semibold text-slate-800">{bp.name}</h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{bp.pitch}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLE[bp.difficulty]}`}>
            <Gauge className="w-2.5 h-2.5" aria-hidden />{bp.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
            <Clock className="w-2.5 h-2.5" aria-hidden />{bp.time}
          </span>
          <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-violet-50 text-violet-600">
            <Layers className="w-2.5 h-2.5" aria-hidden />{bp.sections}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 animate-fade-in">
          <div className="flex gap-1 px-4 pt-3" role="tablist">
            {([
              ['architecture', 'How it works'],
              ['code', 'Code'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer
                  ${tab === id
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'architecture' && (
              <>
                <p className="text-xs text-slate-500 mb-3">
                  <span className="font-medium text-slate-600">Concepts used:</span> {bp.concepts}
                </p>
                <ol className="space-y-1.5">
                  {bp.flow.map((f, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                      <span className="flex items-center gap-2 sm:w-[46%] sm:shrink-0">
                        <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-700">{f.step}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden sm:block" aria-hidden />
                      <span className="text-sm text-slate-500 pl-7 sm:pl-0 sm:flex-1">{f.result}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                    Where this bites
                  </span>
                  <p className="text-sm text-amber-900 mt-1 leading-relaxed">{bp.watchOut}</p>
                </div>
              </>
            )}

            {tab === 'code' && <CodeBlock tabs={bp.code} maxLines={20} />}
          </div>
        </div>
      )}
    </div>
  )
}
