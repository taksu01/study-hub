import { useState } from 'react'

const mechanisms = [
  {
    id: 'ledger',
    label: 'Shared Ledger',
    color: 'bg-blue-500',
    border: 'border-blue-300 dark:border-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-800 dark:text-blue-300',
    detail: 'A distributed append-only log of every transaction ever made. Replicated across thousands of nodes worldwide — no master copy, no central database.',
  },
  {
    id: 'rules',
    label: 'Consensus Rules',
    color: 'bg-emerald-500',
    border: 'border-emerald-300 dark:border-emerald-700',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-800 dark:text-emerald-300',
    detail: 'Software-enforced rules that every node independently checks. Transactions must have valid signatures, no double-spends, and outputs cannot exceed inputs.',
  },
  {
    id: 'pow',
    label: 'Proof of Work',
    color: 'bg-amber-500',
    border: 'border-amber-300 dark:border-amber-700',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-800 dark:text-amber-300',
    detail: 'Miners expend computational energy to propose new blocks. Rewriting history requires redoing all that work — making attacks prohibitively expensive.',
  },
]

const results = ['Scarce', 'Verifiable', 'Censorship-resistant', 'Trustless']

export default function FoundationVisual() {
  const [activeMech, setActiveMech] = useState<string | null>(null)
  const active = mechanisms.find(m => m.id === activeMech)

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> System Map — Click each mechanism to explore
        </p>
      </div>

      <div className="p-6 sm:p-8 flex flex-col items-center gap-0">
        {/* Problem */}
        <div className="w-full max-w-md text-center rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-6 py-4">
          <p className="text-[10px] font-bold tracking-widest text-red-400 dark:text-red-500 uppercase mb-1">Problem</p>
          <p className="text-sm font-semibold text-red-800 dark:text-red-300">Digital money can be copied</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">Without a central authority, who prevents double-spend?</p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center py-2">
          <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
          <svg className="w-3 h-3 text-gray-400 dark:text-gray-500" viewBox="0 0 12 12" fill="currentColor"><path d="M6 12L0 4h12z"/></svg>
        </div>

        {/* Mechanism label */}
        <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-3">Mechanism</p>

        {/* Three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
          {mechanisms.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMech(activeMech === m.id ? null : m.id)}
              className={`rounded-xl border-2 px-4 py-4 text-center transition-all duration-200 cursor-pointer
                ${activeMech === m.id
                  ? `${m.border} ${m.bg} shadow-md scale-[1.03]`
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                }`}
            >
              <div className={`w-3 h-3 rounded-full ${m.color} mx-auto mb-2`} />
              <p className={`text-sm font-semibold ${activeMech === m.id ? m.text : 'text-gray-800 dark:text-gray-200'}`}>
                {m.label}
              </p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className={`w-full max-w-lg overflow-hidden transition-all duration-300 ${active ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
          {active && (
            <div className={`rounded-xl ${active.bg} border ${active.border} p-4`}>
              <p className={`text-sm leading-relaxed ${active.text}`}>{active.detail}</p>
            </div>
          )}
        </div>

        {/* Converging arrows */}
        <div className="flex flex-col items-center py-2">
          <div className="flex items-end gap-8 sm:gap-16">
            <div className="w-0.5 h-5 bg-gray-300 dark:bg-gray-600 transform -rotate-30 origin-bottom" />
            <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
            <div className="w-0.5 h-5 bg-gray-300 dark:bg-gray-600 transform rotate-30 origin-bottom" />
          </div>
          <svg className="w-3 h-3 text-gray-400 dark:text-gray-500" viewBox="0 0 12 12" fill="currentColor"><path d="M6 12L0 4h12z"/></svg>
        </div>

        {/* Result */}
        <div className="w-full max-w-md text-center rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4">
          <p className="text-[10px] font-bold tracking-widest text-emerald-500 dark:text-emerald-400 uppercase mb-2">Result</p>
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-3">Digital money that is:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {results.map(r => (
              <span key={r} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
