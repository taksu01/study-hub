import type { GameMode } from '../types'
import { TIMED_SECONDS } from '../types'

interface Props {
  mode: GameMode
  score: number
  streak: number
  longestStreak: number
  timeLeftMs: number
  total: number
}

function formatSeconds(ms: number): string {
  if (!isFinite(ms)) return '∞'
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${s}s`
}

export default function HUD({ mode, score, streak, longestStreak, timeLeftMs, total }: Props) {
  const timerPct = mode === 'timed'
    ? Math.max(0, Math.min(100, (timeLeftMs / (TIMED_SECONDS * 1000)) * 100))
    : 100
  const timerLow = mode === 'timed' && timeLeftMs <= 10_000

  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat label="Score" value={score} tone="primary" />
        <Stat label="Streak" value={streak} tone="accent" sub={longestStreak > 0 ? `best ${longestStreak}` : undefined} />
        <Stat
          label={mode === 'timed' ? 'Time' : 'Answered'}
          value={mode === 'timed' ? formatSeconds(timeLeftMs) : total}
          tone={timerLow ? 'warn' : 'neutral'}
        />
      </div>
      {mode === 'timed' && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-[width] duration-150 ${
              timerLow
                ? 'bg-gradient-to-r from-rose-500 to-amber-400'
                : 'bg-gradient-to-r from-kawaii-400 via-fuchsia-400 to-violet-400'
            }`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  sub?: string
  tone?: 'neutral' | 'primary' | 'accent' | 'warn'
}) {
  const toneClass =
    tone === 'primary'
      ? 'text-kawaii-300'
      : tone === 'accent'
        ? 'text-violet-300'
        : tone === 'warn'
          ? 'text-rose-300'
          : 'text-kawaii-100'
  return (
    <div className="panel px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest opacity-70">{label}</div>
      <div className={`mt-0.5 font-display text-2xl font-bold leading-none tabular-nums ${toneClass}`}>{value}</div>
      {sub && <div className="mt-0.5 text-[10px] opacity-60">{sub}</div>}
    </div>
  )
}
