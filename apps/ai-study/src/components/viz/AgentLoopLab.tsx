import { useEffect, useRef, useState } from 'react'
import { Brain, Wrench, Eye, Flag, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react'

type Phase = 'think' | 'act' | 'observe' | 'done'

interface Step {
  phase: Phase
  text: string
  payload?: string
}

/* One concrete task, traced end to end. Abstract "Think → Act → Observe"
   diagrams teach nothing; a real trace shows why the loop exists. */
const TASK = 'Is BTC above its 50-day moving average right now?'

const STEPS: Step[] = [
  { phase: 'think', text: 'I need the current price and the 50-day average. I have a price tool. Call it first.' },
  { phase: 'act', text: 'Calling tool', payload: 'get_price(symbol="BTC")' },
  { phase: 'observe', text: 'Tool returned', payload: '{ "price": 64210.55, "currency": "USD" }' },
  { phase: 'think', text: 'Good. Now I need the 50-day moving average to compare against.' },
  { phase: 'act', text: 'Calling tool', payload: 'get_sma(symbol="BTC", days=50)' },
  { phase: 'observe', text: 'Tool returned', payload: '{ "sma_50": 61840.12 }' },
  { phase: 'think', text: '64210.55 > 61840.12. That is above, by about 3.8%. I have everything I need — stop looping.' },
  { phase: 'done', text: 'Yes. BTC is at $64,210, roughly 3.8% above its 50-day average of $61,840.' },
]

const PHASE_META: Record<Phase, { label: string; icon: typeof Brain; ring: string; chip: string }> = {
  think: { label: 'Think', icon: Brain, ring: 'border-violet-300 bg-violet-50', chip: 'bg-violet-500' },
  act: { label: 'Act', icon: Wrench, ring: 'border-blue-300 bg-blue-50', chip: 'bg-blue-500' },
  observe: { label: 'Observe', icon: Eye, ring: 'border-teal-300 bg-teal-50', chip: 'bg-teal-500' },
  done: { label: 'Answer', icon: Flag, ring: 'border-emerald-300 bg-emerald-50', chip: 'bg-emerald-500' },
}

export function AgentLoopLab() {
  const [cursor, setCursor] = useState(0)   // steps revealed so far
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const finished = cursor >= STEPS.length
  const currentPhase = cursor > 0 ? STEPS[cursor - 1].phase : null

  useEffect(() => {
    if (!playing) return
    if (finished) { setPlaying(false); return }
    timer.current = window.setTimeout(() => setCursor(c => c + 1), 1300)
    return () => window.clearTimeout(timer.current)
  }, [playing, cursor, finished])

  function reset() {
    setPlaying(false)
    setCursor(0)
  }

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-800">The agent loop, traced</h4>
          <p className="text-xs text-slate-500 mt-0.5">A real task, one step at a time</p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => finished ? reset() : setPlaying(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors cursor-pointer"
          >
            {finished
              ? <><RotateCcw className="w-3.5 h-3.5" aria-hidden />Replay</>
              : playing
                ? <><Pause className="w-3.5 h-3.5" aria-hidden />Pause</>
                : <><Play className="w-3.5 h-3.5" aria-hidden />Play</>}
          </button>
          <button
            onClick={() => setCursor(c => Math.min(c + 1, STEPS.length))}
            disabled={finished}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Step<ChevronRight className="w-3.5 h-3.5" aria-hidden />
          </button>
          <button
            onClick={reset}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Goal</span>
          <p className="text-sm text-slate-700 mt-0.5">{TASK}</p>
        </div>

        {/* Cycle indicator — lights up as the trace moves through phases */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-5 flex-wrap">
          {(['think', 'act', 'observe'] as Phase[]).map((p, i) => {
            const meta = PHASE_META[p]
            const Icon = meta.icon
            const on = currentPhase === p
            return (
              <div key={p} className="flex items-center gap-1.5 sm:gap-3">
                <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
                  ${on ? `${meta.ring} shadow-sm scale-105` : 'border-slate-200 bg-white text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" aria-hidden />{meta.label}
                </div>
                {i < 2 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" aria-hidden />}
              </div>
            )
          })}
          <span className="text-slate-300 text-xs mx-1" aria-hidden>↻</span>
          <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
            ${currentPhase === 'done' ? `${PHASE_META.done.ring} shadow-sm scale-105` : 'border-slate-200 bg-white text-slate-400'}`}>
            <Flag className="w-3.5 h-3.5" aria-hidden />Answer
          </div>
        </div>

        {/* Trace */}
        <ol className="space-y-2 min-h-[140px]">
          {STEPS.slice(0, cursor).map((s, i) => {
            const meta = PHASE_META[s.phase]
            const Icon = meta.icon
            return (
              <li key={i} className={`flex gap-2.5 rounded-xl border px-3 py-2.5 animate-fade-in ${meta.ring}`}>
                <Icon className="w-4 h-4 mt-0.5 shrink-0 opacity-70" aria-hidden />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60">{meta.label}</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{s.text}</p>
                  {s.payload && (
                    <code className="block mt-1.5 text-[13px] font-mono bg-white/70 rounded-md px-2 py-1 text-slate-700 overflow-x-auto whitespace-pre">
                      {s.payload}
                    </code>
                  )}
                </div>
              </li>
            )
          })}
          {cursor === 0 && (
            <li className="text-sm text-slate-400 italic px-1 py-6 text-center">
              Press Play or Step to run the loop
            </li>
          )}
        </ol>

        {finished && (
          <p className="mt-4 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">The point:</strong> nobody scripted "call get_price, then
            get_sma, then compare." The model chose each tool, read the result, and decided when it had
            enough. That decision loop is the entire difference between a chatbot and an agent.
          </p>
        )}
      </div>
    </div>
  )
}
