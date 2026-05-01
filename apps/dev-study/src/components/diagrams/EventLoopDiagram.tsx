import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

type HighlightArea = 'callStack' | 'webApis' | 'microtask' | 'macrotask' | 'console' | 'eventLoop' | null

interface Step {
  n: number
  desc: string
  codeLine: number
  callStack: string[]
  webApis: string[]
  microtaskQueue: string[]
  macrotaskQueue: string[]
  consoleOutput: string[]
  highlight: HighlightArea
  note?: string
}

const CODE_LINES = [
  "console.log('1: start');",
  '',
  "setTimeout(() => {",
  "  console.log('4: timeout');",
  '}, 0);',
  '',
  "Promise.resolve().then(() => {",
  "  console.log('3: microtask');",
  '});',
  '',
  "console.log('2: end');",
]

const STEPS: Step[] = [
  {
    n: 0,
    desc: 'Program starts. All areas are empty — the slate is clean.',
    codeLine: -1,
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: [],
    highlight: null,
  },
  {
    n: 1,
    desc: "Line 1: console.log('1: start') is pushed onto the call stack.",
    codeLine: 0,
    callStack: ["console.log('1: start')"],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: [],
    highlight: 'callStack',
  },
  {
    n: 2,
    desc: "Executes synchronously. '1: start' is printed to console. Function pops off the stack.",
    codeLine: 0,
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'console',
  },
  {
    n: 3,
    desc: 'Line 3: setTimeout() is called — pushed onto the call stack.',
    codeLine: 2,
    callStack: ['setTimeout(cb, 0)'],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'callStack',
  },
  {
    n: 4,
    desc: "setTimeout hands off the callback to the browser's Web API. A 0ms timer starts. setTimeout() pops off — JS continues without waiting.",
    codeLine: 2,
    callStack: [],
    webApis: ['⏱ Timer (0ms) → cb'],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'webApis',
  },
  {
    n: 5,
    desc: 'Line 7: Promise.resolve().then() is called. Pushed onto the call stack.',
    codeLine: 6,
    callStack: ['Promise.resolve().then(cb)'],
    webApis: ['⏱ Timer (0ms) → cb'],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'callStack',
  },
  {
    n: 6,
    desc: "Promise.resolve() is already fulfilled, so the .then() callback is immediately queued in the Microtask Queue. Pops off the stack.",
    codeLine: 6,
    callStack: [],
    webApis: ['⏱ Timer (0ms) → cb'],
    microtaskQueue: ['Promise.then cb'],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'microtask',
    note: 'Microtasks are queued immediately when a Promise resolves — no Web API involved.',
  },
  {
    n: 7,
    desc: "Line 11: console.log('2: end') is pushed onto the call stack.",
    codeLine: 10,
    callStack: ["console.log('2: end')"],
    webApis: ['⏱ Timer (0ms) → cb'],
    microtaskQueue: ['Promise.then cb'],
    macrotaskQueue: [],
    consoleOutput: ['1: start'],
    highlight: 'callStack',
  },
  {
    n: 8,
    desc: "'2: end' is printed. Pops off the stack. The call stack is now completely empty — this is where the event loop kicks in.",
    codeLine: 10,
    callStack: [],
    webApis: ['⏱ Timer (0ms) → cb'],
    microtaskQueue: ['Promise.then cb'],
    macrotaskQueue: [],
    consoleOutput: ['1: start', '2: end'],
    highlight: 'console',
  },
  {
    n: 9,
    desc: "The 0ms timer fires. Web API moves the callback to the Macrotask Queue. (In browsers, this actually happens a tick after the main code finishes.)",
    codeLine: -1,
    callStack: [],
    webApis: [],
    microtaskQueue: ['Promise.then cb'],
    macrotaskQueue: ['setTimeout cb'],
    consoleOutput: ['1: start', '2: end'],
    highlight: 'macrotask',
  },
  {
    n: 10,
    desc: "EVENT LOOP: Call stack is empty. Rule → check microtask queue FIRST. The Promise callback is moved to the call stack.",
    codeLine: -1,
    callStack: ['Promise.then cb'],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: ['setTimeout cb'],
    consoleOutput: ['1: start', '2: end'],
    highlight: 'eventLoop',
    note: 'Critical rule: ALL microtasks drain before any macrotask runs. Not just one — all of them.',
  },
  {
    n: 11,
    desc: "'3: microtask' is logged. Promise callback pops off the stack.",
    codeLine: 7,
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: ['setTimeout cb'],
    consoleOutput: ['1: start', '2: end', '3: microtask'],
    highlight: 'console',
  },
  {
    n: 12,
    desc: "EVENT LOOP: Microtask queue is empty. Now picks ONE task from the Macrotask Queue. The setTimeout callback moves to the call stack.",
    codeLine: -1,
    callStack: ['setTimeout cb'],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start', '2: end', '3: microtask'],
    highlight: 'eventLoop',
  },
  {
    n: 13,
    desc: "'4: timeout' is logged. Pops off the stack. All queues empty.",
    codeLine: 3,
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start', '2: end', '3: microtask', '4: timeout'],
    highlight: 'console',
  },
  {
    n: 14,
    desc: "✅ Complete. The key insight: microtasks run BEFORE the next macrotask — that's why '3: microtask' came before '4: timeout', even though setTimeout was scheduled first.",
    codeLine: -1,
    callStack: [],
    webApis: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    consoleOutput: ['1: start', '2: end', '3: microtask', '4: timeout'],
    highlight: null,
    note: 'Order: Sync code → Microtasks (all) → Render (browser) → Macrotask → Microtasks (all) → Render → ...',
  },
]

const glowClass: Record<string, string> = {
  callStack: 'glow-sky',
  webApis: 'glow-emerald',
  microtask: 'glow-violet',
  macrotask: 'glow-amber',
  console: 'glow-rose',
  eventLoop: 'glow-sky',
}

const areaLabels: Record<string, { label: string; color: string }> = {
  callStack: { label: 'CALL STACK', color: 'text-sky-400' },
  webApis: { label: 'WEB APIS', color: 'text-emerald-400' },
  microtask: { label: 'MICROTASK QUEUE', color: 'text-violet-400' },
  macrotask: { label: 'MACROTASK QUEUE', color: 'text-amber-400' },
  console: { label: 'CONSOLE', color: 'text-rose-400' },
}

function AreaBox({
  label,
  color,
  items,
  isHighlighted,
  layout = 'vertical',
  emptyLabel = 'empty',
}: {
  label: string
  color: string
  items: string[]
  isHighlighted: boolean
  layout?: 'vertical' | 'horizontal'
  emptyLabel?: string
}) {
  return (
    <div
      className={`rounded-lg border transition-all duration-300 p-3 ${
        isHighlighted
          ? `border-transparent ${glowClass[label.toLowerCase().replace(/\s.*/,'')]}`
          : 'border-rim bg-surface'
      } bg-surface`}
    >
      <div className={`text-xs font-semibold font-code mb-2 tracking-wider ${color}`}>{label}</div>
      {layout === 'vertical' ? (
        <div className="flex flex-col gap-1.5 min-h-[60px]">
          {items.length === 0 ? (
            <span className="text-xs text-slate-600 italic mt-1">{emptyLabel}</span>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="animate-slide-in text-xs font-code px-2 py-1.5 rounded bg-surface2 border border-rim2 text-slate-300"
              >
                {item}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-1.5 flex-wrap min-h-[36px] items-center">
          {items.length === 0 ? (
            <span className="text-xs text-slate-600 italic">{emptyLabel}</span>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="animate-slide-in text-xs font-code px-2 py-1 rounded bg-surface2 border border-rim2 text-slate-300"
              >
                {item}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export function EventLoopDiagram() {
  const [stepIdx, setStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const step = STEPS[stepIdx]
  const isLast = stepIdx === STEPS.length - 1
  const isFirst = stepIdx === 0

  const goNext = () => setStepIdx(i => Math.min(i + 1, STEPS.length - 1))
  const goPrev = () => setStepIdx(i => Math.max(i - 1, 0))
  const reset = () => { setStepIdx(0); setIsPlaying(false) }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIdx(i => {
          if (i >= STEPS.length - 1) {
            setIsPlaying(false)
            return i
          }
          return i + 1
        })
      }, 1600)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying])

  useEffect(() => {
    if (isLast) setIsPlaying(false)
  }, [isLast])

  const h = step.highlight

  return (
    <div className="rounded-xl border border-rim bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-rim bg-surface2">
        <div>
          <span className="text-sm font-semibold text-slate-200">Event Loop Step-Through</span>
          <span className="ml-3 text-xs text-slate-500">visualize the execution order</span>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Code panel */}
        <div className="rounded-lg border border-rim bg-[#0d1117] overflow-hidden">
          <div className="px-3 py-1.5 border-b border-rim bg-surface2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs text-slate-500 font-code">example.js</span>
          </div>
          <pre className="p-3 text-xs font-code leading-relaxed">
            {CODE_LINES.map((line, i) => {
              const isActive = step.codeLine === i
              return (
                <div
                  key={i}
                  className={`px-2 rounded transition-colors duration-200 ${
                    isActive ? 'bg-sky-900/40 text-sky-200' : 'text-slate-400'
                  }`}
                >
                  <span className="select-none text-slate-600 mr-3 text-xs">{String(i + 1).padStart(2, ' ')}</span>
                  {isActive ? (
                    <span className="text-sky-200">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              )
            })}
          </pre>
        </div>

        {/* Diagram grid */}
        <div className="grid grid-cols-2 gap-3">
          <AreaBox
            label="CALL STACK"
            color="text-sky-400"
            items={[...step.callStack].reverse()}
            isHighlighted={h === 'callStack'}
            layout="vertical"
            emptyLabel="— empty —"
          />
          <AreaBox
            label="WEB APIS"
            color="text-emerald-400"
            items={step.webApis}
            isHighlighted={h === 'webApis'}
            layout="vertical"
            emptyLabel="— idle —"
          />
        </div>

        {/* Queues + Event Loop indicator */}
        <div className="grid grid-cols-2 gap-3">
          <AreaBox
            label="MICROTASK QUEUE"
            color="text-violet-400"
            items={step.microtaskQueue}
            isHighlighted={h === 'microtask'}
            layout="horizontal"
            emptyLabel="empty"
          />
          <AreaBox
            label="MACROTASK QUEUE"
            color="text-amber-400"
            items={step.macrotaskQueue}
            isHighlighted={h === 'macrotask'}
            layout="horizontal"
            emptyLabel="empty"
          />
        </div>

        {/* Event loop indicator */}
        {h === 'eventLoop' && (
          <div className="flex items-center justify-center gap-3 py-2 rounded-lg border border-sky-500/30 bg-sky-950/20 animate-pulse-ring">
            <div className="w-5 h-5 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
            <span className="text-xs text-sky-400 font-semibold font-code">EVENT LOOP — picking next task</span>
          </div>
        )}

        {/* Console */}
        <div
          className={`rounded-lg border transition-all duration-300 p-3 ${
            h === 'console' ? 'border-transparent glow-rose' : 'border-rim'
          } bg-[#0d1117]`}
        >
          <div className="text-xs font-semibold font-code mb-2 text-rose-400 tracking-wider">CONSOLE OUTPUT</div>
          <div className="min-h-[40px] space-y-1">
            {step.consoleOutput.length === 0 ? (
              <span className="text-xs text-slate-600 italic font-code">— no output yet —</span>
            ) : (
              step.consoleOutput.map((line, i) => (
                <div key={i} className="text-xs font-code text-emerald-300 animate-fade-in">
                  <span className="text-slate-600 mr-2">{'>'}</span>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step description */}
        <div className="rounded-lg border border-rim2 bg-surface2 p-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-xs font-code text-slate-500 shrink-0 mt-0.5">
              Step {step.n + 1}/{STEPS.length}
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">{step.desc}</p>
          </div>
          {step.note && (
            <div className="flex items-start gap-2 pt-2 border-t border-rim">
              <span className="text-amber-400 text-xs shrink-0">⚡</span>
              <p className="text-xs text-amber-200/80 leading-relaxed">{step.note}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              disabled={isFirst}
              className="p-2 rounded-lg border border-rim hover:border-sky-500/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Go to start"
            >
              <SkipBack size={14} />
            </button>
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-rim hover:border-sky-500/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs"
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <button
              onClick={() => setIsPlaying(p => !p)}
              disabled={isLast}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-sky-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={goNext}
              disabled={isLast}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-rim hover:border-sky-500/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs"
            >
              Next
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setStepIdx(STEPS.length - 1)}
              disabled={isLast}
              className="p-2 rounded-lg border border-rim hover:border-sky-500/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Go to end"
            >
              <SkipForward size={14} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStepIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === stepIdx
                    ? 'bg-sky-400 w-4'
                    : i < stepIdx
                    ? 'bg-sky-800'
                    : 'bg-surface2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
