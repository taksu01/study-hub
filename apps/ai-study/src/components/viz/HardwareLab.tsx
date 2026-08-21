import { useMemo, useState } from 'react'
import { Check, X, AlertTriangle } from 'lucide-react'

/* Rule of thumb: VRAM ≈ params × bytes-per-weight × ~1.2 overhead.
   Q4 is roughly 0.5 bytes/param, Q8 ≈ 1, FP16 ≈ 2.                    */
const QUANTS = [
  { id: 'q4', label: 'Q4', bytes: 0.55, quality: 92, note: 'The default. Barely distinguishable from full precision for chat.' },
  { id: 'q5', label: 'Q5', bytes: 0.68, quality: 95, note: 'Slightly better on reasoning. Worth it if it still fits.' },
  { id: 'q8', label: 'Q8', bytes: 1.05, quality: 99, note: 'Near-lossless. Rarely worth double the memory.' },
  { id: 'f16', label: 'FP16', bytes: 2.0, quality: 100, note: 'Full precision. For fine-tuning, not for running.' },
]

const SIZES = [
  { params: 1, label: '1B', example: 'Llama 3.2 1B' },
  { params: 3, label: '3B', example: 'Llama 3.2 3B' },
  { params: 7, label: '7B', example: 'Mistral 7B' },
  { params: 8, label: '8B', example: 'Llama 3.1 8B' },
  { params: 14, label: '14B', example: 'Qwen 2.5 14B' },
  { params: 32, label: '32B', example: 'Qwen 2.5 32B' },
  { params: 70, label: '70B', example: 'Llama 3.1 70B' },
]

const RAM_OPTIONS = [8, 16, 24, 32, 64, 128]

export function HardwareLab() {
  const [ram, setRam] = useState(16)
  const [quantIdx, setQuantIdx] = useState(0)

  const quant = QUANTS[quantIdx]
  // Leave headroom for the OS, your browser, and the KV cache for context.
  const usable = ram * 0.7

  const rows = useMemo(() => SIZES.map(s => {
    const need = s.params * quant.bytes
    return {
      ...s,
      need,
      verdict: need <= usable * 0.75 ? 'fast' : need <= usable ? 'tight' : 'no',
    } as const
  }), [quant, usable])

  const best = [...rows].reverse().find(r => r.verdict !== 'no')

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">What will actually run on your machine?</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Set your RAM (or VRAM, if you have a discrete GPU) and see which models fit.
        </p>
      </div>

      <div className="p-4">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Memory available
            </label>
            <div className="flex flex-wrap gap-1.5">
              {RAM_OPTIONS.map(r => (
                <button
                  key={r}
                  onClick={() => setRam(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                    ${ram === r
                      ? 'bg-violet-500 border-violet-500 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'}`}
                >
                  {r} GB
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Quantization
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUANTS.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setQuantIdx(i)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                    ${quantIdx === i
                      ? 'bg-violet-500 border-violet-500 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'}`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Output quality at {quant.label}</span>
              <span className="font-semibold text-slate-700 tabular-nums">{quant.quality}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-[width] duration-200"
                style={{ width: `${quant.quality}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">{quant.note}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          {rows.map(r => {
            const width = Math.min(100, (r.need / usable) * 100)
            const style = r.verdict === 'fast'
              ? { bar: 'bg-emerald-400', chip: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Check, word: 'Comfortable' }
              : r.verdict === 'tight'
                ? { bar: 'bg-amber-400', chip: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle, word: 'Tight — will be slow' }
                : { bar: 'bg-rose-300', chip: 'text-rose-700 bg-rose-50 border-rose-200', icon: X, word: 'Will not fit' }
            const Icon = style.icon
            return (
              <div key={r.label} className="flex items-center gap-2.5">
                <div className="w-24 sm:w-36 shrink-0">
                  <div className="text-sm font-medium text-slate-700">{r.label}</div>
                  <div className="text-[11px] text-slate-400 truncate">{r.example}</div>
                </div>
                <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden min-w-0">
                  <div
                    className={`h-full ${style.bar} transition-[width] duration-200`}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-xs text-slate-500 tabular-nums text-right">
                  {r.need.toFixed(1)} GB
                </span>
                <span className={`hidden sm:flex items-center gap-1 w-40 shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full border ${style.chip}`}>
                  <Icon className="w-3 h-3" aria-hidden />{style.word}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-4 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
          {best
            ? <>On <strong className="text-slate-800">{ram} GB at {quant.label}</strong>, the largest model you can
              sensibly run is <strong className="text-slate-800">{best.label}</strong> ({best.example}).
              Start there — bigger is not better if it swaps to disk.</>
            : <>{ram} GB is not enough for any of these at {quant.label}. Drop to Q4, or use a cloud API.</>}
        </p>
        <p className="text-[11px] text-slate-400 mt-2">
          Estimates assume ~30% of memory stays reserved for the OS and the context cache.
          Apple Silicon shares one memory pool, so unified RAM counts as VRAM.
        </p>
      </div>
    </div>
  )
}
