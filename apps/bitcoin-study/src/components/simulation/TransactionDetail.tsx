import { useState } from 'react'
import type { SimTransaction } from './types'
import { shortHash } from './utils'

interface Props {
  tx: SimTransaction
  index: number
}

export default function TransactionDetail({ tx, index }: Props) {
  const [expanded, setExpanded] = useState(false)

  const inputTotal = tx.inputs.reduce((s, i) => s + i.amount, 0)
  const outputTotal = tx.outputs.reduce((s, o) => s + o.amount, 0)

  const walletColor = (label: string) => {
    if (label === 'Alice') return 'text-blue-600'
    if (label === 'Bob') return 'text-emerald-600'
    if (label === 'Miner' || label === 'Coinbase') return 'text-amber-600'
    return 'text-gray-600'
  }

  return (
    <div className={`rounded-xl border transition-all ${expanded ? 'border-gray-300 shadow-md' : 'border-gray-200'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
            ${tx.isCoinbase ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
            {tx.isCoinbase ? '⛏' : index}
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {tx.isCoinbase ? 'Coinbase Transaction' : `Transaction #${index}`}
            </p>
            <p className="text-[10px] font-mono text-gray-400 truncate">{shortHash(tx.txid, 12)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {!tx.isCoinbase && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              {tx.feeRate} sat/vB
            </span>
          )}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-3">
          {/* Inputs */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Inputs ({tx.inputs.length})
            </p>
            <div className="space-y-2">
              {tx.inputs.map((inp, i) => (
                <div key={i} className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${walletColor(inp.walletLabel)}`}>
                      {inp.walletLabel}
                    </span>
                    {!tx.isCoinbase && (
                      <span className="font-bold text-gray-800">{inp.amount.toFixed(8)} BTC</span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                    <p>
                      <span className="text-gray-500">prev_txid:</span>{' '}
                      {tx.isCoinbase ? '00000...00000' : shortHash(inp.prevTxid, 10)}
                      {!tx.isCoinbase && <span className="text-gray-500">:{inp.vout}</span>}
                    </p>
                    <p>
                      <span className="text-gray-500">scriptSig:</span>{' '}
                      <span className="text-indigo-400">{inp.scriptSig}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5-5h3V5h4v5h3l-5 5z" />
            </svg>
          </div>

          {/* Outputs */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Outputs ({tx.outputs.length})
            </p>
            <div className="space-y-2">
              {tx.outputs.map((out, i) => (
                <div key={i} className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${walletColor(out.walletLabel)}`}>
                      → {out.walletLabel}
                    </span>
                    <span className="font-bold text-gray-800">{out.amount.toFixed(8)} BTC</span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                    <p>
                      <span className="text-gray-500">vout:</span> {i}
                    </p>
                    <p>
                      <span className="text-gray-500">scriptPubKey:</span>{' '}
                      <span className="text-emerald-500">{out.scriptPubKey}</span>
                    </p>
                    <p>
                      <span className="text-gray-500">address:</span>{' '}
                      {shortHash(out.address, 10)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee summary */}
          {!tx.isCoinbase && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-amber-700 font-medium">Fee</span>
                <span className="font-bold text-amber-800">{tx.fee.toFixed(8)} BTC</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-amber-600">
                <span>Inputs: {inputTotal.toFixed(8)} — Outputs: {outputTotal.toFixed(8)}</span>
                <span>{tx.feeRate} sat/vB · {tx.size} vB</span>
              </div>
            </div>
          )}

          {tx.isCoinbase && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-center">
              <p className="text-amber-700">
                Block reward: <strong>{outputTotal.toFixed(8)} BTC</strong> (subsidy + fees)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
