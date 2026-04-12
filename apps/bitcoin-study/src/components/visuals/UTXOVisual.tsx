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
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> UTXO Flow — Step Through
        </p>
        <button
          onClick={() => setShowStructure(!showStructure)}
          className="text-xs text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
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
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 16 16"><path d="M4 2l8 6-8 6z"/></svg>
              )}
            </div>
          ))}
        </div>

        {/* Scenario label */}
        <p className="text-center text-sm text-gray-500 mb-6">
          Alice pays Bob <strong className="text-gray-800">0.7 BTC</strong>
        </p>

        {/* Before */}
        {step === 'before' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alice's Spendable UTXOs</p>
            <div className="flex flex-wrap justify-center gap-4">
              <UtxoCard label="UTXO A" amount="0.5 BTC" owner="Alice" color="blue" />
              <UtxoCard label="UTXO B" amount="0.4 BTC" owner="Alice" color="blue" />
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 max-w-sm">
              <p className="text-xs text-blue-800 text-center">
                Wallet balance = 0.5 + 0.4 = <strong>0.9 BTC</strong><br />
                <span className="text-blue-600">(sum of all UTXOs Alice's keys can spend)</span>
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
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Inputs (consumed)</p>
                <UtxoCard label="UTXO A" amount="0.5 BTC" owner="Alice" color="red" fading />
                <UtxoCard label="UTXO B" amount="0.4 BTC" owner="Alice" color="red" fading />
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6z"/></svg>
                </div>
                <div className="sm:hidden">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10l6 6 6-6z"/></svg>
                </div>
                <div className="rounded-lg bg-gray-900 text-white px-3 py-1.5 text-xs font-bold">
                  TX
                </div>
              </div>

              {/* Outputs */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Outputs (created)</p>
                <UtxoCard label="Output 0" amount="0.7 BTC" owner="→ Bob" color="emerald" fresh />
                <UtxoCard label="Output 1" amount="0.19 BTC" owner="→ Alice (change)" color="amber" fresh />
              </div>
            </div>

            <div className="rounded-xl bg-gray-100 border border-gray-200 p-3 max-w-sm">
              <p className="text-xs text-gray-700 text-center">
                Inputs: 0.5 + 0.4 = <strong>0.9 BTC</strong><br />
                Outputs: 0.7 + 0.19 = <strong>0.89 BTC</strong><br />
                <span className="text-amber-700 font-semibold">Fee: 0.9 − 0.89 = 0.01 BTC</span> (goes to miner)
              </p>
            </div>
          </div>
        )}

        {/* After */}
        {step === 'after' && (
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bob's New UTXO</p>
                <UtxoCard label="New UTXO" amount="0.7 BTC" owner="Bob" color="emerald" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alice's Change UTXO</p>
                <UtxoCard label="Change UTXO" amount="0.19 BTC" owner="Alice" color="amber" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-md">
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-xs text-red-700"><strong>Destroyed:</strong> UTXO A (0.5) + UTXO B (0.4)</p>
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                <p className="text-xs text-emerald-700"><strong>Created:</strong> 0.7 (Bob) + 0.19 (Alice)</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                <p className="text-xs text-amber-700"><strong>Fee:</strong> 0.01 BTC → miner</p>
              </div>
            </div>
          </div>
        )}

        {/* TX Structure */}
        {showStructure && (
          <div className="mt-8 rounded-xl border-2 border-gray-200 overflow-hidden max-w-lg mx-auto">
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
    blue: 'border-blue-300 bg-blue-50',
    red: 'border-red-300 bg-red-50',
    emerald: 'border-emerald-300 bg-emerald-50',
    amber: 'border-amber-300 bg-amber-50',
  }
  return (
    <div className={`rounded-xl border-2 px-5 py-3 text-center min-w-[140px] transition-all duration-500
      ${colors[color] ?? colors.blue}
      ${fading ? 'opacity-50 line-through scale-95' : ''}
      ${fresh ? 'shadow-md ring-2 ring-offset-1 ring-emerald-200' : ''}`}
    >
      <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-lg font-bold text-gray-800">{amount}</p>
      <p className="text-xs text-gray-500">{owner}</p>
    </div>
  )
}
