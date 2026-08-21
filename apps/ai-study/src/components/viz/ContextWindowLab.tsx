import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const MODELS = [
  { name: 'Llama 3.1 8B (local)', window: 128_000 },
  { name: 'GPT-4o', window: 128_000 },
  { name: 'Claude Sonnet', window: 200_000 },
  { name: 'Gemini 2.5 Pro', window: 1_000_000 },
]

interface Part {
  id: string
  label: string
  colour: string
  min: number
  max: number
  step: number
  hint: string
}

const PARTS: Part[] = [
  { id: 'system', label: 'System prompt', colour: 'bg-violet-400', min: 0, max: 20_000, step: 250, hint: 'Your instructions — re-sent on every single call' },
  { id: 'history', label: 'Chat history', colour: 'bg-blue-400', min: 0, max: 400_000, step: 1_000, hint: 'Grows every turn. The silent budget killer' },
  { id: 'docs', label: 'Retrieved documents', colour: 'bg-teal-400', min: 0, max: 600_000, step: 5_000, hint: 'RAG chunks, pasted files, tool output' },
  { id: 'reply', label: 'Room for the reply', colour: 'bg-emerald-400', min: 500, max: 64_000, step: 500, hint: 'Output shares the window. Run out and it truncates mid-sentence' },
]

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}k` : String(n)

export function ContextWindowLab() {
  const [modelIdx, setModelIdx] = useState(2)
  const [values, setValues] = useState<Record<string, number>>({
    system: 2_000, history: 18_000, docs: 40_000, reply: 4_000,
  })

  const window = MODELS[modelIdx].window
  const used = Object.values(values).reduce((a, b) => a + b, 0)
  const pct = Math.min(100, (used / window) * 100)
  const over = used > window

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">Context window budget</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Everything shares one window — input, history and the reply. Drag to see what fits.
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {MODELS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setModelIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                ${modelIdx === i
                  ? 'bg-violet-500 border-violet-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Stacked bar */}
        <div className="mb-2">
          <div className="flex justify-between items-baseline mb-1.5 text-xs">
            <span className={`font-semibold tabular-nums ${over ? 'text-rose-600' : 'text-slate-700'}`}>
              {fmt(used)} used
            </span>
            <span className="text-slate-400 tabular-nums">{fmt(window)} window</span>
          </div>
          <div className={`h-8 rounded-lg overflow-hidden flex border ${over ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-slate-100'}`}>
            {PARTS.map(p => {
              const share = (values[p.id] / window) * 100
              if (share <= 0) return null
              return (
                <div
                  key={p.id}
                  className={`${p.colour} transition-[width] duration-200 first:rounded-l-md`}
                  style={{ width: `${Math.min(share, 100)}%` }}
                  title={`${p.label}: ${fmt(values[p.id])} tokens`}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
            <span>{pct.toFixed(1)}% full</span>
            <span>{over ? `${fmt(used - window)} over` : `${fmt(window - used)} free`}</span>
          </div>
        </div>

        {over && (
          <p className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5 my-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
            <span>
              Over the limit. In practice the API rejects the call, or your framework silently
              drops the oldest history — which is why long chats "forget" what you said at the start.
            </span>
          </p>
        )}

        <div className="space-y-3.5 mt-4">
          {PARTS.map(p => (
            <div key={p.id}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span className={`w-3 h-3 rounded ${p.colour}`} aria-hidden />
                  {p.label}
                </span>
                <span className="text-xs text-slate-500 tabular-nums font-mono">{fmt(values[p.id])}</span>
              </div>
              <input
                type="range"
                min={p.min}
                max={Math.min(p.max, window)}
                step={p.step}
                value={Math.min(values[p.id], window)}
                onChange={e => setValues(v => ({ ...v, [p.id]: Number(e.target.value) }))}
                aria-label={p.label}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-0.5">{p.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
