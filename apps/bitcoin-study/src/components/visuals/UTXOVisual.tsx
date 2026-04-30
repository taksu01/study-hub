import { useState } from 'react'

type Step = 'before' | 'during' | 'after'

const steps: { key: Step; label: string }[] = [
  { key: 'before', label: 'Before' },
  { key: 'during', label: 'Transaction' },
  { key: 'after', label: 'After' },
]

export default function UTXOVisual() {
  const [step, setStep] = useState<Step>('before')
  const [showStructure, setShowStructure] = useState(false)

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> UTXO Flow — Step Through
        </p>
        <button
          onClick={() => setShowStructure(!showStructure)}
          className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
        >
          {showStructure ? 'Hide' : 'Show'} TX Structure
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {/* Step selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer
                  ${step === s.key
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 16 16"><path d="M4 2l8 6-8 6z"/></svg>
              )}
            </div>
          ))}
        </div>

        {/* Scenario label */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Alice pays Bob <strong className="text-gray-800 dark:text-gray-200">0.7 BTC</strong>
        </p>

        {/* Before */}
        {step === 'before' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Alice's Spendable UTXOs</p>
            <div className="flex flex-wrap justify-center gap-4">
              <UtxoCard label="UTXO A" amount="0.5 BTC" owner="Alice" color="blue" />
              <UtxoCard label="UTXO B" amount="0.4 BTC" owner="Alice" color="blue" />
            </div>
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 max-w-sm">
              <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
                Wallet balance = 0.5 + 0.4 = <strong>0.9 BTC</strong><br />
                <span className="text-blue-600 dark:text-blue-400">(sum of all UTXOs Alice's keys can spend)</span>
              </p>
            </div>
          </div>
        )}

        {/* During */}
        {step === 'during' && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
              {/* Inputs */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Inputs (consumed)</p>
                <UtxoCard label="UTXO A" amount="0.5 BTC" owner="Alice" color="red" fading />
                <UtxoCard label="UTXO B" amount="0.4 BTC" owner="Alice" color="red" fading />
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6z"/></svg>
                </div>
                <div className="sm:hidden">
                  <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10l6 6 6-6z"/></svg>
                </div>
                <div className="rounded-lg bg-gray-900 text-white px-3 py-1.5 text-xs font-bold">
                  TX
                </div>
              </div>

              {/* Outputs */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Outputs (created)</p>
                <UtxoCard label="Output 0" amount="0.7 BTC" owner="→ Bob" color="emerald" fresh />
                <UtxoCard label="Output 1" amount="0.19 BTC" owner="→ Alice (change)" color="amber" fresh />
              </div>
            </div>

            <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 max-w-sm">
              <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
                Inputs: 0.5 + 0.4 = <strong>0.9 BTC</strong><br />
                Outputs: 0.7 + 0.19 = <strong>0.89 BTC</strong><br />
                <span className="text-amber-700 dark:text-amber-400 font-semibold">Fee: 0.9 − 0.89 = 0.01 BTC</span> (goes to miner)
              </p>
            </div>
          </div>
        )}

        {/* After */}
        {step === 'after' && (
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Bob's New UTXO</p>
                <UtxoCard label="New UTXO" amount="0.7 BTC" owner="Bob" color="emerald" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Alice's Change UTXO</p>
                <UtxoCard label="Change UTXO" amount="0.19 BTC" owner="Alice" color="amber" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-md">
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2">
                <p className="text-xs text-red-700 dark:text-red-300"><strong>Destroyed:</strong> UTXO A (0.5) + UTXO B (0.4)</p>
              </div>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-2">
                <p className="text-xs text-emerald-700 dark:text-emerald-300"><strong>Created:</strong> 0.7 (Bob) + 0.19 (Alice)</p>
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-2">
                <p className="text-xs text-amber-700 dark:text-amber-300"><strong>Fee:</strong> 0.01 BTC → miner</p>
              </div>
            </div>
          </div>
        )}

        {/* TX Structure */}
        {showStructure && (
          <div className="mt-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden max-w-lg mx-auto">
            <div className="bg-gray-900 px-4 py-2">
              <p className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">Transaction Structure</p>
            </div>
            <div className="bg-gray-950 p-4 font-mono text-xs leading-relaxed">
              <p className="text-gray-500">{'{'}</p>
              <p className="text-indigo-400 ml-4">txid: <span className="text-gray-400">"sha256d(this tx)"</span></p>
              <p className="text-gray-500 ml-4 mt-2">inputs: [</p>
              <p className="text-emerald-400 ml-8">{'{ prev_txid: "...", index: 0, sig: "..." }'} <span className="text-gray-600">// UTXO A</span></p>
              <p className="text-emerald-400 ml-8">{'{ prev_txid: "...", index: 1, sig: "..." }'} <span className="text-gray-600">// UTXO B</span></p>
              <p className="text-gray-500 ml-4">]</p>
              <p className="text-gray-500 ml-4 mt-2">outputs: [</p>
              <p className="text-amber-400 ml-8">{'{ amount: 0.7,  lock: "Bob\'s pubkeyhash" }'}</p>
              <p className="text-amber-400 ml-8">{'{ amount: 0.19, lock: "Alice\'s change addr" }'}</p>
              <p className="text-gray-500 ml-4">]</p>
              <p className="text-red-400 ml-4 mt-2">fee: <span className="text-gray-400">0.01 BTC (implicit: inputs − outputs)</span></p>
              <p className="text-gray-500">{'}'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function UtxoCard({ label, amount, owner, color, fading, fresh }: {
  label: string; amount: string; owner: string; color: string; fading?: boolean; fresh?: boolean
}) {
  const colors: Record<string, string> = {
    blue: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
    red: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
    emerald: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20',
    amber: 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20',
  }
  return (
    <div className={`rounded-xl border-2 px-5 py-3 text-center min-w-[140px] transition-all duration-500
      ${colors[color] ?? colors.blue}
      ${fading ? 'opacity-50 line-through scale-95' : ''}
      ${fresh ? 'shadow-md ring-2 ring-offset-1 ring-emerald-200 dark:ring-emerald-800' : ''}`}
    >
      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">{label}</p>
      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{amount}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{owner}</p>
    </div>
  )
}
