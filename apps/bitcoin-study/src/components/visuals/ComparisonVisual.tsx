import { useState } from 'react'

const comparisons = [
  { aspect: 'Purpose', bitcoin: 'Money-first', other: 'Platform-first', icon: '🎯' },
  { aspect: 'Scripting', bitcoin: 'Simple (Bitcoin Script)', other: 'Turing-complete (Solidity/EVM)', icon: '📜' },
  { aspect: 'Changes', bitcoin: 'Conservative (years)', other: 'Faster iteration / hard forks', icon: '🔄' },
  { aspect: 'Scaling', bitcoin: 'Layer 2 (Lightning)', other: 'Layer 1 scaling + L2', icon: '📈' },
  { aspect: 'State Model', bitcoin: 'UTXO (discrete outputs)', other: 'Account/balance model', icon: '💾' },
  { aspect: 'Base L1 TPS', bitcoin: '~7 tx/sec', other: 'Higher throughput', icon: '⚡' },
  { aspect: 'Consensus', bitcoin: 'Proof of Work (energy)', other: 'Proof of Stake (capital)', icon: '🔒' },
  { aspect: 'Supply', bitcoin: 'Fixed 21M', other: 'Variable/inflationary', icon: '💰' },
  { aspect: 'Philosophy', bitcoin: 'Minimize trust', other: 'Maximize programmability', icon: '🧠' },
]

export default function ComparisonVisual() {
  const [activeRow, setActiveRow] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Design Philosophy Comparison
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
              ${viewMode === 'cards' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
              ${viewMode === 'table' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Table
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div />
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
            <p className="text-xs font-bold text-amber-700">Bitcoin</p>
          </div>
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-2">
            <p className="text-xs font-bold text-indigo-700">Other Platforms</p>
            <p className="text-[10px] text-indigo-400">(e.g. Ethereum)</p>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="space-y-2">
            {comparisons.map((c, i) => (
              <button
                key={c.aspect}
                onClick={() => setActiveRow(activeRow === i ? null : i)}
                className={`w-full grid grid-cols-3 gap-4 items-center rounded-xl p-3 transition-all cursor-pointer border-2
                  ${activeRow === i ? 'border-gray-300 bg-gray-50 shadow-sm' : 'border-transparent hover:bg-gray-50/50'}`}
              >
                <div className="flex items-center gap-2 text-left">
                  <span className="text-base">{c.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{c.aspect}</span>
                </div>
                <div className={`rounded-lg px-3 py-2 text-xs text-center transition-all
                  ${activeRow === i ? 'bg-amber-100 text-amber-800 font-semibold' : 'bg-amber-50/50 text-gray-600'}`}>
                  {c.bitcoin}
                </div>
                <div className={`rounded-lg px-3 py-2 text-xs text-center transition-all
                  ${activeRow === i ? 'bg-indigo-100 text-indigo-800 font-semibold' : 'bg-indigo-50/50 text-gray-600'}`}>
                  {c.other}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">Aspect</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-amber-700">Bitcoin</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-indigo-700">Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr
                    key={c.aspect}
                    className={`border-b border-gray-100 transition-colors cursor-pointer
                      ${activeRow === i ? 'bg-amber-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                    onClick={() => setActiveRow(activeRow === i ? null : i)}
                  >
                    <td className="px-4 py-2.5 font-medium text-gray-700">
                      <span className="mr-1.5">{c.icon}</span>{c.aspect}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{c.bitcoin}</td>
                    <td className="px-4 py-2.5 text-gray-600">{c.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3 text-center">
          <p className="text-xs text-gray-500">
            These are <strong className="text-gray-700">design trade-offs</strong>, not rankings. Different goals → different choices.
          </p>
        </div>
      </div>
    </div>
  )
}
