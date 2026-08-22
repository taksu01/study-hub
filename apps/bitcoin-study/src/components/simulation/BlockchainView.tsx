import { useRef, useEffect } from 'react'
import { useSimulation } from './context'
import { shortHash } from './utils'

export default function BlockchainView() {
  const { state, dispatch } = useSimulation()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [state.blockchain.length])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Blockchain — {state.blockchain.length} block{state.blockchain.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-gray-400">Click a block to inspect</p>
      </div>

      <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-2 px-2">
        <div className="flex items-center gap-0 min-w-max">
          {state.blockchain.map((block, idx) => {
            const isSelected = state.selectedBlockIndex === idx
            const isGenesis = idx === 0
            return (
              <div key={block.height} className="flex items-center shrink-0">
                {idx > 0 && (
                  <div className="flex items-center mx-1">
                    <div className="w-6 sm:w-10 h-0.5 bg-gray-300 dark:bg-gray-600" />
                    <svg className="w-2 h-2 text-gray-400" viewBox="0 0 8 8" fill="currentColor">
                      <path d="M0 0l8 4-8 4z" />
                    </svg>
                  </div>
                )}
                <button
                  onClick={() => dispatch(
                    isSelected
                      ? { type: 'DESELECT_BLOCK' }
                      : { type: 'SELECT_BLOCK', payload: { index: idx } }
                  )}
                  className={`rounded-xl border-2 px-4 py-3 text-center transition-all min-w-[120px] cursor-pointer
                    ${isSelected
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-lg scale-105 ring-2 ring-amber-200 dark:ring-amber-900'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                    }`}
                >
                  <p className={`text-sm font-bold ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {isGenesis ? 'Genesis' : `Block #${block.height}`}
                  </p>
                  <p className="text-[10px] font-mono text-gray-400 mt-0.5">
                    {shortHash(block.hash)}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {block.transactions.length} tx{block.transactions.length !== 1 ? 's' : ''}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{block.size} B</span>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {state.selectedBlockIndex !== null && state.blockchain[state.selectedBlockIndex] && (
        <BlockDetail
          block={state.blockchain[state.selectedBlockIndex]}
          onClose={() => dispatch({ type: 'DESELECT_BLOCK' })}
        />
      )}
    </div>
  )
}

import type { SimBlock } from './types'
import MerkleTreeView from './MerkleTreeView'
import TransactionDetail from './TransactionDetail'
import { useState } from 'react'

function BlockDetail({ block, onClose }: { block: SimBlock; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'header' | 'merkle' | 'txs'>('header')

  const headerFields = [
    { label: 'Version', value: block.header.version },
    { label: 'Prev Block Hash', value: shortHash(block.header.prevHash, 12) },
    { label: 'Merkle Root', value: shortHash(block.header.merkleRoot, 12) },
    { label: 'Timestamp', value: new Date(block.header.timestamp).toLocaleString() },
    { label: 'Target (nBits)', value: block.header.nBits },
    { label: 'Nonce', value: block.header.nonce.toLocaleString() },
  ]

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'header', label: 'Header' },
    { key: 'merkle', label: 'Merkle Tree' },
    { key: 'txs', label: `Transactions (${block.transactions.length})` },
  ]

  return (
    <div className="mt-4 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900 overflow-hidden shadow-lg animate-in">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 text-sm font-bold">
            Block #{block.height}
          </span>
          <span className="text-[10px] font-mono text-gray-500">
            {shortHash(block.hash, 16)}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 px-4 flex gap-1 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer -mb-px shrink-0 whitespace-nowrap
              ${activeTab === t.key
                ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-white dark:bg-gray-900'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        {activeTab === 'header' && (
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 overflow-hidden">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 border-b border-indigo-200 dark:border-indigo-800">
              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Block Header — 80 bytes</p>
            </div>
            <div className="divide-y divide-indigo-100 dark:divide-indigo-900/50">
              {headerFields.map(f => (
                <div key={f.label} className="px-4 py-2.5 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</span>
                  <span className="text-xs font-mono text-gray-400 truncate max-w-[160px] sm:max-w-[200px]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'merkle' && (
          <MerkleTreeView transactions={block.transactions} />
        )}

        {activeTab === 'txs' && (
          <div className="space-y-3">
            {block.transactions.map((tx, i) => (
              <TransactionDetail key={tx.txid} tx={tx} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
