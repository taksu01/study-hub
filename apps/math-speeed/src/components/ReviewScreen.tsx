import { useMemo } from 'react'
import type { QuestionRecord, SessionSummary } from '../types'
import { DIFF_LABEL, MODE_LABEL, OP_LABEL } from '../types'
import Mascot from './Mascot'
import SpeechBubble from './SpeechBubble'
import { moodForEvent, pickMascotLine } from '../lib/mascotLines'

interface Props {
  summary: SessionSummary
  history: QuestionRecord[]
  isNewBest: boolean
  previousBest: number
  onPlayAgain: () => void
  onMenu: () => void
  calmMode: boolean
}

export default function ReviewScreen({
  summary,
  history,
  isNewBest,
  previousBest,
  onPlayAgain,
  onMenu,
  calmMode,
}: Props) {
  const { line, mood } = useMemo(() => {
    if (isNewBest) {
      return { line: pickMascotLine('newBest'), mood: moodForEvent('newBest') }
    }
    return { line: pickMascotLine('end'), mood: moodForEvent('end') }
  }, [isNewBest])

  const wrongCount = summary.total - summary.score

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-4 sm:py-8">
      <header className="flex items-center justify-between">
        <button type="button" onClick={onMenu} className="btn-ghost px-3 py-2 text-xs">
          ← Menu
        </button>
        <div className="text-[11px] uppercase tracking-[0.25em] opacity-70">
          {MODE_LABEL[summary.mode]} · {DIFF_LABEL[summary.difficulty]}
        </div>
        <button type="button" onClick={onPlayAgain} className="btn-primary px-3 py-2 text-xs">
          Play again
        </button>
      </header>

      <section className={`panel relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${isNewBest ? 'anim-pulse-glow' : ''}`}>
        <div className="relative h-32 w-32 shrink-0 self-center sm:h-36 sm:w-36">
          <Mascot mood={mood} className="h-full w-full" />
        </div>
        <div className="flex-1 space-y-3">
          {!calmMode && <SpeechBubble text={line} />}
          {isNewBest ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-3 py-1 text-xs font-bold text-ink-950">
              ★ New best! Previous: {previousBest}
            </div>
          ) : previousBest > 0 ? (
            <div className="text-xs opacity-70">Best for this mode: <span className="font-mono">{previousBest}</span></div>
          ) : null}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Score" value={summary.score} />
            <Stat label="Accuracy" value={`${summary.accuracy}%`} />
            <Stat label="Longest streak" value={summary.longestStreak} />
            <Stat label="Avg time" value={`${(summary.avgTimeMs / 1000).toFixed(1)}s`} />
          </div>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
            Question review
          </h2>
          <div className="text-xs opacity-60">
            {summary.score} correct · {wrongCount} missed
          </div>
        </div>
        {history.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm opacity-60">
            No questions answered.
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {history.map((r, idx) => (
              <li
                key={r.id}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                  r.correct ? '' : 'bg-rose-500/5'
                }`}
              >
                <span className="w-6 text-right text-xs opacity-50 tabular-nums">{idx + 1}</span>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    r.correct ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                  aria-hidden
                >
                  {r.correct ? '✓' : '✗'}
                </span>
                <span className="inline-flex min-w-6 items-center justify-center rounded-md bg-white/5 px-1.5 py-0.5 text-[11px] font-mono opacity-80">
                  {OP_LABEL[r.op]}
                </span>
                <span className="font-mono text-base">{r.prompt}</span>
                <span className="mx-1 opacity-40">=</span>
                {r.correct ? (
                  <span className="font-mono text-base text-emerald-200">{r.answer}</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span className="font-mono text-base text-rose-300 line-through">
                      {r.userAnswer ?? '—'}
                    </span>
                    <span className="font-mono text-base text-emerald-200">{r.answer}</span>
                  </span>
                )}
                <span className="ml-auto font-mono text-[11px] opacity-60 tabular-nums">
                  {(r.timeMs / 1000).toFixed(1)}s
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="safe-pad-b sticky bottom-0 -mx-4 grid grid-cols-2 gap-2 bg-gradient-to-t from-ink-950 via-ink-950/90 to-transparent px-4 pt-4 backdrop-blur-sm">
        <button type="button" onClick={onMenu} className="btn-ghost h-12">
          Menu
        </button>
        <button type="button" onClick={onPlayAgain} className="btn-primary h-12">
          Play again
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2 text-center">
      <div className="text-[10px] uppercase tracking-widest opacity-60">{label}</div>
      <div className="mt-0.5 font-display text-xl font-bold tabular-nums text-kawaii-200">{value}</div>
    </div>
  )
}
