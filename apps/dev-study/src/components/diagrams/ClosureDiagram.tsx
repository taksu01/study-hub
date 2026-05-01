import { useState } from 'react'

interface ScopeVar {
  name: string
  value: string
  captured: boolean
}

interface ScopeBox {
  label: string
  color: string
  borderColor: string
  bgColor: string
  vars: ScopeVar[]
  desc: string
}

const EXAMPLES = [
  {
    name: 'Counter',
    code: `function makeCounter() {
  let count = 0       // outer scope

  return function() { // inner fn
    count++           // captured!
    return count
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2 — same count!`,
    scopes: [
      {
        label: 'makeCounter() — Outer Scope',
        color: 'text-sky-300',
        borderColor: 'border-sky-500/40',
        bgColor: 'bg-sky-950/20',
        vars: [
          { name: 'count', value: '0 → 1 → 2', captured: true },
        ],
        desc: 'Lives as long as a closure references it',
      },
      {
        label: 'anonymous fn — Inner Scope (closure)',
        color: 'text-violet-300',
        borderColor: 'border-violet-500/40',
        bgColor: 'bg-violet-950/20',
        vars: [
          { name: '(no own variables)', value: '', captured: false },
        ],
        desc: 'Closes over count from outer scope',
      },
    ],
    capturedVars: ['count'],
    explanation: 'Each call to makeCounter() creates a NEW closure with its own count. The inner function "closes over" the count variable — it holds a live reference, not a copy.',
  },
  {
    name: 'Private State',
    code: `function createWallet(initial) {
  let balance = initial // private!

  return {
    deposit(n) { balance += n },
    withdraw(n) {
      if (n > balance) throw new Error()
      balance -= n
    },
    getBalance() { return balance }
  }
}

const w = createWallet(100)
w.deposit(50)   // balance: 150
// w.balance    // undefined — private!`,
    scopes: [
      {
        label: 'createWallet() — Outer Scope',
        color: 'text-sky-300',
        borderColor: 'border-sky-500/40',
        bgColor: 'bg-sky-950/20',
        vars: [
          { name: 'balance', value: '100 → 150', captured: true },
          { name: 'initial', value: '100', captured: false },
        ],
        desc: 'balance is never directly accessible from outside',
      },
      {
        label: 'deposit / withdraw / getBalance — Closures',
        color: 'text-violet-300',
        borderColor: 'border-violet-500/40',
        bgColor: 'bg-violet-950/20',
        vars: [
          { name: 'n (parameter)', value: 'per-call', captured: false },
        ],
        desc: 'All three methods share the same balance via closure',
      },
    ],
    capturedVars: ['balance'],
    explanation: 'The three methods all close over the same balance variable. This is the module pattern — it simulates private state without classes.',
  },
  {
    name: 'Loop Gotcha',
    code: `// ❌ Bug: all callbacks share i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Prints: 3, 3, 3

// ✅ Fix: let creates block scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Prints: 0, 1, 2`,
    scopes: [
      {
        label: 'Loop with var — Single Scope',
        color: 'text-rose-300',
        borderColor: 'border-rose-500/40',
        bgColor: 'bg-rose-950/20',
        vars: [
          { name: 'i (var)', value: '3 by the time callbacks run', captured: true },
        ],
        desc: 'var is function-scoped — all 3 callbacks share the SAME i',
      },
      {
        label: 'Loop with let — New Scope Per Iteration',
        color: 'text-emerald-300',
        borderColor: 'border-emerald-500/40',
        bgColor: 'bg-emerald-950/20',
        vars: [
          { name: 'i (let, iter 0)', value: '0', captured: true },
          { name: 'i (let, iter 1)', value: '1', captured: true },
          { name: 'i (let, iter 2)', value: '2', captured: true },
        ],
        desc: 'let creates a new binding per iteration — each callback captures its own i',
      },
    ],
    capturedVars: ['i'],
    explanation: 'This is the most common closure interview trap. var hoists to function scope — one i shared by all. let creates a fresh binding per loop iteration — three separate closures.',
  },
]

export function ClosureDiagram() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const example = EXAMPLES[exampleIdx]

  return (
    <div className="rounded-xl border border-rim bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-rim bg-surface2">
        <span className="text-sm font-semibold text-slate-200">Closure Scope Visualizer</span>
        <div className="flex gap-1">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setExampleIdx(i)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                i === exampleIdx
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-rim'
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code */}
        <div className="rounded-lg border border-rim bg-[#0d1117] overflow-hidden">
          <div className="px-3 py-1.5 border-b border-rim bg-surface2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500/60" />
              <div className="w-2 h-2 rounded-full bg-amber-500/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs text-slate-500 font-code">example.js</span>
          </div>
          <pre className="p-4 text-xs font-code leading-relaxed text-slate-300 overflow-x-auto">
            {example.code.split('\n').map((line, i) => {
              const hasCaptured = example.capturedVars.some(v =>
                line.includes(v) && !line.trim().startsWith('//')
              )
              return (
                <div key={i} className={hasCaptured ? 'text-sky-300' : ''}>
                  {line}
                </div>
              )
            })}
          </pre>
        </div>

        {/* Scope diagram */}
        <div className="space-y-3">
          {example.scopes.map((scope, i) => (
            <div
              key={i}
              style={{ paddingLeft: i > 0 ? '1rem' : '0' }}
              className={`relative rounded-lg border p-3 transition-all ${scope.borderColor} ${scope.bgColor}`}
            >
              {i > 0 && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-3 h-px bg-sky-500/40" />
                  <div className="w-2 h-2 rounded-full bg-sky-500/40" />
                </div>
              )}
              <div className={`text-xs font-semibold font-code mb-2 ${scope.color}`}>
                {scope.label}
              </div>
              <div className="space-y-1.5 mb-2">
                {scope.vars.map((v, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-code border ${
                        v.captured
                          ? 'bg-sky-950/40 border-sky-500/40 text-sky-200'
                          : 'bg-surface2 border-rim text-slate-400'
                      }`}
                    >
                      {v.captured && (
                        <span className="text-sky-400" title="captured by closure">⟲</span>
                      )}
                      <span>{v.name}</span>
                      {v.value && <span className="text-slate-500">= {v.value}</span>}
                    </div>
                    {v.captured && (
                      <span className="text-xs text-sky-500 italic">captured</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic">{scope.desc}</p>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-sky-950/40 border border-sky-500/40 flex items-center justify-center">
                <span className="text-sky-400 text-xs">⟲</span>
              </div>
              <span className="text-xs text-slate-500">Captured variable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-surface2 border border-rim" />
              <span className="text-xs text-slate-500">Local variable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="px-4 pb-4">
        <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-3">
          <div className="flex items-start gap-2">
            <span className="text-amber-400 shrink-0">💡</span>
            <p className="text-xs text-amber-200/80 leading-relaxed">{example.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
