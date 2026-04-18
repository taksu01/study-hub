import type { PersistedStats } from '../types'
import { ALL_OPS, DIFF_LABEL, MODE_LABEL, OP_LABEL, OP_NAME } from '../types'

interface Props {
  stats: PersistedStats
  onReset: () => void
}

export default function StatsPanel({ stats, onReset }: Props) {
  const accuracy = stats.totalAnswered === 0
    ? 0
    : Math.round((stats.totalCorrect / stats.totalAnswered) * 1000) / 10

  const bestEntries = Object.entries(stats.bestScores).sort((a, b) => b[1] - a[1])

  return (
    <details className="panel group" open={false}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <span aria-hidden>📊</span> Your stats
          <span className="chip">{stats.totalAnswered} answered</span>
        </span>
        <span className="text-xs opacity-60 transition-transform group-open:rotate-180">▾</span>
      </summary>

      <div className="border-t border-white/10 px-4 py-4 text-sm space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <SummaryStat label="Lifetime accuracy" value={`${accuracy}%`} />
          <SummaryStat label="Longest streak" value={stats.longestStreak} />
          <SummaryStat label="Total correct" value={stats.totalCorrect} />
        </div>

        <div>
          <div className="mb-2 text-xs uppercase tracking-widest opacity-60">Best scores</div>
          {bestEntries.length === 0 ? (
            <div className="text-xs opacity-60">No runs yet. Time to set a record!</div>
          ) : (
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {bestEntries.slice(0, 6).map(([key, score]) => {
                const [mode, diff] = key.split(':') as [keyof typeof MODE_LABEL, keyof typeof DIFF_LABEL]
                return (
                  <li key={key} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 text-xs">
                    <span className="opacity-80">{MODE_LABEL[mode]} · {DIFF_LABEL[diff]}</span>
                    <span className="font-mono font-bold text-kawaii-300">{score}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div>
          <div className="mb-2 text-xs uppercase tracking-widest opacity-60">Per-operation accuracy</div>
          <ul className="space-y-1.5">
            {ALL_OPS.map(op => {
              const { answered, correct } = stats.perOp[op]
              const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100)
              return (
                <li key={op} className="flex items-center gap-3 text-xs">
                  <span className="inline-flex w-8 items-center justify-center rounded-md bg-white/10 py-0.5 font-mono">
                    {OP_LABEL[op]}
                  </span>
                  <span className="w-28 opacity-80">{OP_NAME[op]}</span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-kawaii-400 to-violet-400"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-14 text-right font-mono tabular-nums opacity-80">
                    {answered === 0 ? '—' : `${pct}%`}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs opacity-60">Data is saved locally in your browser.</span>
          <button type="button" onClick={onReset} className="btn-ghost px-3 py-1 text-xs">
            Reset stats
          </button>
        </div>
      </div>
    </details>
  )
}

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/5 px-2 py-2">
      <div className="text-[10px] uppercase tracking-widest opacity-60">{label}</div>
      <div className="mt-0.5 font-display text-xl font-bold text-kawaii-200 tabular-nums">{value}</div>
    </div>
  )
}
