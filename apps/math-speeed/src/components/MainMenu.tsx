import { useMemo } from 'react'
import type { Difficulty, GameConfig, GameMode, OpKind, PersistedStats } from '../types'
import { ALL_OPS, DIFF_LABEL, MODE_LABEL, OP_LABEL, OP_NAME, bestKey } from '../types'
import Mascot from './Mascot'
import SpeechBubble from './SpeechBubble'
import StatsPanel from './StatsPanel'
import ThemeToggle from './ThemeToggle'
import { pickMascotLine } from '../lib/mascotLines'

interface Props {
  config: GameConfig
  onChange: (config: GameConfig) => void
  onStart: () => void
  stats: PersistedStats
  onResetStats: () => void
  calmMode: boolean
  onToggleCalm: () => void
}

const MODES: { id: GameMode; desc: string }[] = [
  { id: 'timed',    desc: '60 seconds. Max your score.' },
  { id: 'endless',  desc: 'No timer. Play freely.' },
  { id: 'streak',   desc: 'One wrong answer ends the run.' },
  { id: 'practice', desc: 'No timer, no score. Just drill.' },
]

const DIFFS: { id: Difficulty; desc: string }[] = [
  { id: 'easy',    desc: '1–10' },
  { id: 'medium',  desc: '2–50' },
  { id: 'hard',    desc: '5–100' },
  { id: 'extreme', desc: '2-digit × 2-digit' },
]

export default function MainMenu({
  config,
  onChange,
  onStart,
  stats,
  onResetStats,
  calmMode,
  onToggleCalm,
}: Props) {
  const menuLine = useMemo(() => pickMascotLine('menu'), [])
  const canStart = config.ops.length > 0
  const currentBest = stats.bestScores[bestKey(config.mode, config.difficulty)] ?? 0

  const setMode = (mode: GameMode) => onChange({ ...config, mode })
  const setDifficulty = (difficulty: Difficulty) => onChange({ ...config, difficulty })
  const toggleOp = (op: OpKind) => {
    const has = config.ops.includes(op)
    const next = has ? config.ops.filter(o => o !== op) : [...config.ops, op]
    onChange({ ...config, ops: next })
  }
  const setAllOps = () => onChange({ ...config, ops: [...ALL_OPS] })
  const setBasicOps = () => onChange({ ...config, ops: ['add', 'sub', 'mul', 'div'] })

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-4 sm:py-8">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-kawaii-300/80">Study Hub</div>
          <h1 className="font-display text-3xl font-bold text-shadow-glow sm:text-4xl">
            Math Speeed
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCalm}
            className="btn-ghost px-3 py-2 text-xs"
            title={calmMode ? 'Mascot is quiet' : 'Mascot is chatty'}
          >
            {calmMode ? 'Calm mode' : 'Chatty mode'}
          </button>
          <ThemeToggle />
        </div>
      </header>

      <section className="panel relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 shrink-0 self-center anim-float sm:h-36 sm:w-36">
          <Mascot mood="idle" className="h-full w-full" />
        </div>
        <div className="flex-1 space-y-2">
          {!calmMode && <SpeechBubble text={menuLine} />}
          <p className="text-sm leading-relaxed text-kawaii-100/80">
            Refresh and sharpen your mental math — pick a mode, dial in the difficulty,
            and choose which operations to drill. Progress is saved to your browser.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <SectionTitle>Mode</SectionTitle>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MODES.map(m => (
            <OptionCard
              key={m.id}
              active={config.mode === m.id}
              title={MODE_LABEL[m.id]}
              desc={m.desc}
              onClick={() => setMode(m.id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <SectionTitle>Difficulty</SectionTitle>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {DIFFS.map(d => (
            <OptionCard
              key={d.id}
              active={config.difficulty === d.id}
              title={DIFF_LABEL[d.id]}
              desc={d.desc}
              onClick={() => setDifficulty(d.id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionTitle>Operations</SectionTitle>
          <div className="flex gap-1.5">
            <button type="button" onClick={setBasicOps} className="btn-ghost px-2.5 py-1 text-xs">
              Basic
            </button>
            <button type="button" onClick={setAllOps} className="btn-ghost px-2.5 py-1 text-xs">
              All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALL_OPS.map(op => {
            const on = config.ops.includes(op)
            return (
              <button
                key={op}
                type="button"
                onClick={() => toggleOp(op)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition ${
                  on
                    ? 'border-kawaii-400/60 bg-kawaii-500/15 text-kawaii-50'
                    : 'border-white/10 bg-white/5 text-kawaii-100/80 hover:bg-white/10'
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg font-mono text-lg ${
                    on ? 'bg-kawaii-400/30' : 'bg-white/10'
                  }`}
                >
                  {OP_LABEL[op]}
                </span>
                <span className="text-sm font-medium">{OP_NAME[op]}</span>
              </button>
            )
          })}
        </div>
        {config.ops.length === 0 && (
          <div className="text-xs text-rose-300">Pick at least one operation to start.</div>
        )}
      </section>

      <section>
        <StatsPanel stats={stats} onReset={onResetStats} />
      </section>

      <div className="safe-pad-b sticky bottom-0 left-0 right-0 -mx-4 mt-2 bg-gradient-to-t from-ink-950 via-ink-950/90 to-transparent px-4 pt-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart}
          className="btn-primary w-full py-4 text-lg"
        >
          Start · {MODE_LABEL[config.mode]} · {DIFF_LABEL[config.difficulty]}
          {currentBest > 0 && (
            <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">
              best {currentBest}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">{children}</h2>
}

function OptionCard({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean
  title: string
  desc: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border p-3 text-left transition ${
        active
          ? 'border-kawaii-400/60 bg-gradient-to-br from-kawaii-500/20 to-violet-500/15 text-kawaii-50 ring-1 ring-kawaii-400/40'
          : 'border-white/10 bg-white/5 text-kawaii-100/80 hover:bg-white/10'
      }`}
    >
      <div className="font-display text-sm font-semibold">{title}</div>
      <div className="mt-0.5 text-[11px] opacity-70">{desc}</div>
    </button>
  )
}
