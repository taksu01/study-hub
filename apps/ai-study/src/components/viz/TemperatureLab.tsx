import { useMemo, useState } from 'react'

/* The model has just written "The weather today is". These are plausible
   next tokens with their raw scores (logits). Temperature reshapes how
   sharply those scores turn into probabilities. */
const CANDIDATES: { token: string; logit: number }[] = [
  { token: ' sunny', logit: 3.2 },
  { token: ' cloudy', logit: 2.6 },
  { token: ' cold', logit: 2.1 },
  { token: ' beautiful', logit: 1.4 },
  { token: ' unpredictable', logit: 0.5 },
  { token: ' a', logit: 0.1 },
  { token: ' surprisingly', logit: -0.4 },
]

/** softmax(logits / T) — the actual formula temperature controls. */
function softmax(logits: number[], t: number): number[] {
  const temp = Math.max(t, 0.01)
  const scaled = logits.map(l => l / temp)
  const max = Math.max(...scaled)
  const exps = scaled.map(s => Math.exp(s - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map(e => e / sum)
}

const BANDS = [
  { max: 0.3, label: 'Near-deterministic', use: 'Extraction, classification, structured JSON, code fixes', colour: 'text-blue-700 bg-blue-50 border-blue-200' },
  { max: 0.8, label: 'Balanced', use: 'General chat, explanation, summarising, most agent work', colour: 'text-violet-700 bg-violet-50 border-violet-200' },
  { max: 1.2, label: 'Creative', use: 'Brainstorming, copywriting, naming, varied phrasing', colour: 'text-amber-700 bg-amber-50 border-amber-200' },
  { max: 2.0, label: 'Chaotic', use: 'Rarely useful — output starts to lose coherence', colour: 'text-rose-700 bg-rose-50 border-rose-200' },
]

export function TemperatureLab() {
  const [temp, setTemp] = useState(0.7)

  const probs = useMemo(() => softmax(CANDIDATES.map(c => c.logit), temp), [temp])
  const band = BANDS.find(b => temp <= b.max) ?? BANDS[BANDS.length - 1]
  const top = probs[0]

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">Temperature lab</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          The model always has a ranked list of next tokens. Temperature only changes how likely it is
          to pick something other than the top one.
        </p>
      </div>

      <div className="p-4">
        <div className="rounded-xl bg-slate-900 px-3.5 py-3 mb-4 font-mono text-sm">
          <span className="text-slate-400">Prompt so far: </span>
          <span className="text-slate-100">The weather today is</span>
          <span className="inline-block w-2 h-4 bg-violet-400 ml-0.5 align-middle animate-pulse" aria-hidden />
        </div>

        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <label htmlFor="temp-slider" className="text-sm font-medium text-slate-700">Temperature</label>
          <span className="text-lg font-bold text-violet-600 tabular-nums font-mono">{temp.toFixed(2)}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${band.colour}`}>
            {band.label}
          </span>
        </div>
        <input
          id="temp-slider"
          type="range"
          min={0}
          max={2}
          step={0.05}
          value={temp}
          onChange={e => setTemp(Number(e.target.value))}
          className="w-full accent-violet-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mb-4 px-0.5">
          <span>0 — always the top token</span>
          <span>2 — near-random</span>
        </div>

        <div className="space-y-1.5">
          {CANDIDATES.map((c, i) => {
            const p = probs[i]
            return (
              <div key={c.token} className="flex items-center gap-2.5">
                <span className="w-24 sm:w-32 shrink-0 text-[13px] font-mono text-slate-600 truncate text-right">
                  "{c.token.trim()}"
                </span>
                <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden">
                  <div
                    className={`h-full rounded-md transition-[width] duration-200 ${i === 0 ? 'bg-violet-500' : 'bg-violet-300'}`}
                    style={{ width: `${p * 100}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-xs text-slate-500 tabular-nums text-right">
                  {(p * 100).toFixed(1)}%
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3">
            <div className="text-xs text-slate-500">Chance of the top token</div>
            <div className="text-2xl font-bold text-slate-800 tabular-nums mt-0.5">
              {(top * 100).toFixed(1)}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {top > 0.9
                ? 'Same prompt → same answer, effectively every time.'
                : top > 0.5
                  ? 'Mostly consistent, with occasional variation in phrasing.'
                  : 'Meaningfully different answer on each run.'}
            </p>
          </div>
          <div className={`rounded-xl border px-3.5 py-3 ${band.colour}`}>
            <div className="text-xs opacity-70">Use this range for</div>
            <p className="text-sm font-medium mt-1 leading-relaxed">{band.use}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
