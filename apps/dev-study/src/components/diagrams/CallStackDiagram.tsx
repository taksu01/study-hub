import { useState } from 'react'

interface StackFrame {
  name: string
  detail?: string
  color: string
}

interface StackStep {
  desc: string
  stack: StackFrame[]
  highlight?: string
  isError?: boolean
}

const EXAMPLES = {
  normal: {
    label: 'Normal Call',
    code: `function greet(name) {
  return sayHello(name)
}

function sayHello(name) {
  return \`Hello, \${name}!\`
}

greet('Alice')`,
    steps: [
      {
        desc: "Before execution. Call stack is empty.",
        stack: [],
      },
      {
        desc: "greet('Alice') is called. A new frame is pushed onto the stack.",
        stack: [
          { name: "greet('Alice')", detail: 'line 9', color: 'sky' },
        ],
      },
      {
        desc: "Inside greet, sayHello('Alice') is called. Another frame is pushed on top.",
        stack: [
          { name: "greet('Alice')", detail: 'line 9', color: 'sky' },
          { name: "sayHello('Alice')", detail: 'line 2 → called from greet', color: 'violet' },
        ],
        highlight: "sayHello('Alice')",
      },
      {
        desc: "sayHello returns 'Hello, Alice!'. Its frame is popped.",
        stack: [
          { name: "greet('Alice')", detail: 'line 9', color: 'sky' },
        ],
      },
      {
        desc: "greet returns the result. Its frame is popped. Stack is empty again.",
        stack: [],
      },
    ] as StackStep[],
  },
  overflow: {
    label: 'Stack Overflow',
    code: `// ❌ Infinite recursion
function recurse() {
  return recurse() // calls itself forever
}

recurse()
// RangeError: Maximum call stack size exceeded`,
    steps: [
      {
        desc: "recurse() is called.",
        stack: [{ name: 'recurse()', detail: 'call 1', color: 'sky' }],
      },
      {
        desc: "recurse() calls itself. Stack grows.",
        stack: [
          { name: 'recurse()', detail: 'call 1', color: 'sky' },
          { name: 'recurse()', detail: 'call 2', color: 'violet' },
        ],
        highlight: 'recurse()',
      },
      {
        desc: "And again... and again... The stack keeps growing with no base case.",
        stack: [
          { name: 'recurse()', detail: 'call 1', color: 'sky' },
          { name: 'recurse()', detail: 'call 2', color: 'violet' },
          { name: 'recurse()', detail: 'call 3', color: 'amber' },
          { name: 'recurse()', detail: 'call 4', color: 'rose' },
          { name: 'recurse()', detail: 'call ...', color: 'slate' },
        ],
        highlight: 'recurse()',
      },
      {
        desc: "💥 Stack overflow! The engine throws a RangeError. Always have a base case in recursive functions.",
        stack: [
          { name: 'recurse()', detail: 'call 1', color: 'sky' },
          { name: 'recurse()', detail: 'call 2', color: 'violet' },
          { name: 'recurse()', detail: 'call 3', color: 'amber' },
          { name: 'recurse()', detail: 'call 4', color: 'rose' },
          { name: 'recurse()', detail: 'call ...', color: 'slate' },
          { name: '💥 RangeError', detail: 'Maximum call stack size exceeded', color: 'rose' },
        ],
        isError: true,
      },
    ] as StackStep[],
  },
  async: {
    label: 'Async Context',
    code: `async function fetchData() {
  const data = await fetch('/api')  // ← stack clears here!
  return data.json()
}

fetchData()
console.log('This runs before await resolves')`,
    steps: [
      {
        desc: "fetchData() is called and pushed onto the stack.",
        stack: [{ name: 'fetchData()', detail: 'async function', color: 'sky' }],
      },
      {
        desc: "fetch('/api') is called. Pushed on the stack, then handed off to Web APIs.",
        stack: [
          { name: 'fetchData()', detail: 'async function', color: 'sky' },
          { name: "fetch('/api')", detail: 'Web API call', color: 'emerald' },
        ],
        highlight: "fetch('/api')",
      },
      {
        desc: "await suspends fetchData(). Its frame is REMOVED from the stack. The function will resume later.",
        stack: [],
        highlight: '',
      },
      {
        desc: "console.log runs synchronously — the stack is free! This is why async functions don't block.",
        stack: [{ name: "console.log('This runs...')", detail: 'synchronous', color: 'amber' }],
        highlight: "console.log('This runs...')",
      },
      {
        desc: "console.log completes. Stack empties. fetch resolves later, fetchData() resumes.",
        stack: [],
      },
    ] as StackStep[],
  },
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  sky: { bg: 'bg-sky-950/30', border: 'border-sky-500/40', text: 'text-sky-200' },
  violet: { bg: 'bg-violet-950/30', border: 'border-violet-500/40', text: 'text-violet-200' },
  amber: { bg: 'bg-amber-950/30', border: 'border-amber-500/40', text: 'text-amber-200' },
  rose: { bg: 'bg-rose-950/30', border: 'border-rose-500/40', text: 'text-rose-200' },
  emerald: { bg: 'bg-emerald-950/30', border: 'border-emerald-500/40', text: 'text-emerald-200' },
  slate: { bg: 'bg-slate-800/30', border: 'border-slate-600/40', text: 'text-slate-300' },
}

export function CallStackDiagram() {
  const [exKey, setExKey] = useState<keyof typeof EXAMPLES>('normal')
  const [stepIdx, setStepIdx] = useState(0)
  const example = EXAMPLES[exKey]
  const step = example.steps[stepIdx]

  const changeExample = (key: keyof typeof EXAMPLES) => {
    setExKey(key)
    setStepIdx(0)
  }

  return (
    <div className="rounded-xl border border-rim bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-rim bg-surface2">
        <span className="text-sm font-semibold text-slate-200">Call Stack Visualizer</span>
        <div className="flex gap-1">
          {Object.entries(EXAMPLES).map(([key, ex]) => (
            <button
              key={key}
              onClick={() => changeExample(key as keyof typeof EXAMPLES)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                key === exKey
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-rim'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code */}
        <div className="rounded-lg border border-rim bg-[#0d1117] overflow-hidden">
          <pre className="p-4 text-xs font-code leading-relaxed text-slate-300 overflow-x-auto">
            {example.code}
          </pre>
        </div>

        {/* Stack visualization */}
        <div className="flex flex-col gap-3">
          {/* Stack display */}
          <div
            className={`rounded-lg border p-3 min-h-[160px] flex flex-col justify-end gap-1.5 transition-all ${
              step.isError ? 'border-rose-500/40 bg-rose-950/10 glow-rose' : 'border-rim bg-surface'
            }`}
          >
            <div className="text-xs font-code text-slate-500 mb-2">CALL STACK (top = executing)</div>
            {step.stack.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-slate-600 italic">— empty —</span>
              </div>
            ) : (
              [...step.stack].reverse().map((frame, i) => {
                const c = colorMap[frame.color] ?? colorMap.slate
                const isTop = i === 0
                return (
                  <div
                    key={`${frame.name}-${i}`}
                    className={`animate-slide-in px-3 py-2 rounded border text-xs font-code ${c.bg} ${c.border} ${c.text} ${
                      isTop ? 'ring-1 ring-offset-1 ring-offset-surface ' + c.border : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{frame.name}</span>
                      {isTop && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-surface2 text-slate-500 ml-2">
                          executing
                        </span>
                      )}
                    </div>
                    {frame.detail && (
                      <div className="text-xs opacity-60 mt-0.5">{frame.detail}</div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Step description */}
          <div className="rounded-lg border border-rim2 bg-surface2 p-3">
            <div className="flex items-start gap-2">
              <span className="text-xs text-slate-500 font-code shrink-0">
                {stepIdx + 1}/{example.steps.length}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setStepIdx(i => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="flex-1 py-2 rounded-lg border border-rim text-xs text-slate-400 hover:text-slate-200 hover:border-sky-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            <button
              onClick={() => setStepIdx(i => Math.min(example.steps.length - 1, i + 1))}
              disabled={stepIdx === example.steps.length - 1}
              className="flex-1 py-2 rounded-lg border border-sky-500/40 bg-sky-500/10 text-xs text-sky-300 hover:bg-sky-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
