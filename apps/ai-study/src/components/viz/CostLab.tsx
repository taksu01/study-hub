import { useMemo, useState } from 'react'
import { TrendingDown } from 'lucide-react'

/* Illustrative per-million-token rates. Providers reprice often — the point
   of this lab is the *shape* of the curve, not the exact invoice. */
const TIERS = [
  { id: 'local', label: 'Local (Ollama)', inRate: 0, outRate: 0, note: 'Free after hardware. Your electricity, your privacy.' },
  { id: 'small', label: 'Small cloud model', inRate: 0.25, outRate: 1.25, note: 'Haiku / GPT-4o-mini class. Handles most routine work.' },
  { id: 'mid', label: 'Mid cloud model', inRate: 3, outRate: 15, note: 'Sonnet / GPT-4o class. The default for real work.' },
  { id: 'large', label: 'Frontier / reasoning', inRate: 15, outRate: 75, note: 'Opus / o-series. Reserve for problems that actually need it.' },
]

export function CostLab() {
  const [callsPerDay, setCalls] = useState(200)
  const [inTokens, setIn] = useState(3_000)
  const [outTokens, setOut] = useState(600)
  const [cacheHit, setCacheHit] = useState(0)

  const rows = useMemo(() => TIERS.map(t => {
    // Cached input prefixes bill at roughly a tenth of the normal input rate.
    const effectiveIn = inTokens * (1 - cacheHit / 100) + inTokens * (cacheHit / 100) * 0.1
    const perCall = (effectiveIn / 1e6) * t.inRate + (outTokens / 1e6) * t.outRate
    return { ...t, perCall, perDay: perCall * callsPerDay, perMonth: perCall * callsPerDay * 30 }
  }), [callsPerDay, inTokens, outTokens, cacheHit])

  const max = Math.max(...rows.map(r => r.perMonth), 0.01)
  const money = (n: number) =>
    n === 0 ? '$0'
      : n < 0.01 ? '<$0.01'
        : n < 100 ? `$${n.toFixed(2)}`
          : `$${Math.round(n).toLocaleString()}`

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">Cost lab</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Model choice usually matters more than prompt length. Move the sliders and watch which one dominates.
        </p>
      </div>

      <div className="p-4">
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 mb-5">
          <Slider label="Calls per day" value={callsPerDay} min={10} max={5000} step={10} onChange={setCalls} fmt={v => v.toLocaleString()} />
          <Slider label="Input tokens per call" value={inTokens} min={200} max={100_000} step={200} onChange={setIn} fmt={v => v.toLocaleString()} />
          <Slider label="Output tokens per call" value={outTokens} min={50} max={8_000} step={50} onChange={setOut} fmt={v => v.toLocaleString()} />
          <Slider label="Prompt cache hit rate" value={cacheHit} min={0} max={95} step={5} onChange={setCacheHit} fmt={v => `${v}%`} />
        </div>

        <div className="space-y-2">
          {rows.map(r => (
            <div key={r.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-baseline justify-between gap-2 mb-1.5 flex-wrap">
                <span className="text-sm font-medium text-slate-700">{r.label}</span>
                <span className="text-lg font-bold text-slate-800 tabular-nums">
                  {money(r.perMonth)}<span className="text-xs font-normal text-slate-400"> / month</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-200 ${r.id === 'local' ? 'bg-emerald-400' : 'bg-violet-400'}`}
                  style={{ width: `${(r.perMonth / max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">{r.note}</p>
            </div>
          ))}
        </div>

        {cacheHit > 0 && (
          <p className="flex items-start gap-2 mt-3 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
            <TrendingDown className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
            <span>
              At a {cacheHit}% cache hit rate you are paying about a tenth of the input rate on that
              share. Caching pays off exactly when a long system prompt is reused across many calls.
            </span>
          </p>
        )}

        <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
          Illustrative rates for comparing orders of magnitude. Check the provider's pricing page before budgeting.
        </p>
      </div>
    </div>
  )
}

function Slider({
  label, value, min, max, step, onChange, fmt,
}: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; fmt: (v: number) => string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-xs text-slate-500 tabular-nums font-mono">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full accent-violet-500 cursor-pointer"
      />
    </div>
  )
}
