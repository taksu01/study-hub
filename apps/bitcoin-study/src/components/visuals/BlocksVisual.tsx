import { useState } from 'react'

type Tab = 'structure' | 'chain' | 'merkle'

const headerFields = [
  { label: 'Version', value: '0x20000000', desc: 'Protocol version — signals which rules this block follows.' },
  { label: 'Prev Block Hash', value: '000000000...a3f8', desc: 'SHA-256d hash of the previous block header. This is what links blocks into a chain.' },
  { label: 'Merkle Root', value: 'e3b0c4429...8db7', desc: 'Root of a binary hash tree committing to every transaction in the block body.' },
  { label: 'Timestamp', value: '2024-04-20 14:32', desc: 'Approximate time the block was mined. Doesn\'t need to be exact.' },
  { label: 'Target (nBits)', value: '0x17034219', desc: 'Encodes the difficulty threshold. The block hash must be numerically less than this target.' },
  { label: 'Nonce', value: '2,839,107,221', desc: 'The value miners vary during the hash search. Changed billions of times per second.' },
]

const chainBlocks = [
  { id: 0, label: 'Block 0', sub: 'Genesis', hash: '000000000019d6...', prev: '0000000000000000...' },
  { id: 1, label: 'Block 1', sub: 'Height 1', hash: '00000000839a8e...', prev: '000000000019d6...' },
  { id: 2, label: 'Block 2', sub: 'Height 2', hash: '000000006a625f...', prev: '00000000839a8e...' },
  { id: 3, label: 'Block 3', sub: 'Height 3', hash: '0000000082b507...', prev: '000000006a625f...' },
]

export default function BlocksVisual() {
  const [tab, setTab] = useState<Tab>('structure')
  const [activeField, setActiveField] = useState<number | null>(null)
  const [tamperedBlock, setTamperedBlock] = useState<number | null>(null)
  const [merkleHighlight, setMerkleHighlight] = useState<string | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'structure', label: 'Block Structure' },
    { key: 'chain', label: 'Chain Linking' },
    { key: 'merkle', label: 'Merkle Tree' },
  ]

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Interactive Block Explorer
        </p>
        <div className="flex gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${tab === t.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Block Structure Tab */}
        {tab === 'structure' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Click any header field to learn more</p>
            <div className="w-full max-w-lg rounded-xl border-2 border-indigo-200 dark:border-indigo-800 overflow-hidden">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 border-b border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Block Header — 80 bytes</p>
              </div>
              <div className="divide-y divide-indigo-100 dark:divide-indigo-800/50">
                {headerFields.map((f, i) => (
                  <button
                    key={f.label}
                    onClick={() => setActiveField(activeField === i ? null : i)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-4 transition-all cursor-pointer
                      ${activeField === i ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10'}`}
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{f.label}</span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 truncate max-w-[160px]">{f.value}</span>
                  </button>
                ))}
              </div>
            </div>
            {activeField !== null && (
              <div className="w-full max-w-lg rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-4 transition-all">
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">{headerFields[activeField].label}</p>
                <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">{headerFields[activeField].desc}</p>
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
              <svg className="w-3 h-3 text-gray-400 dark:text-gray-500" viewBox="0 0 12 12" fill="currentColor"><path d="M6 12L0 4h12z"/></svg>
            </div>
            <div className="w-full max-w-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Block Body — Transactions</p>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="font-medium text-gray-700 dark:text-gray-300">Coinbase TX</span><span className="text-xs text-gray-400 dark:text-gray-500">(miner reward)</span></div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" /><span className="text-gray-600 dark:text-gray-400">Transaction {n}</span></div>
                ))}
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" /><span>... TX N</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Chain Linking Tab */}
        {tab === 'chain' && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">Click a block to "tamper" with it — see how it breaks the chain</p>
            <div className="flex items-stretch gap-0 overflow-x-auto pb-4 justify-center">
              {chainBlocks.map((b, i) => {
                const isBroken = tamperedBlock !== null && b.id >= tamperedBlock && b.id > 0
                const isTampered = tamperedBlock === b.id
                return (
                  <div key={b.id} className="flex items-center shrink-0">
                    {i > 0 && (
                      <div className="flex items-center mx-1">
                        <div className={`w-6 sm:w-10 h-0.5 transition-colors duration-300 ${isBroken ? 'bg-red-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        <svg className={`w-2 h-2 transition-colors duration-300 ${isBroken ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'}`} viewBox="0 0 8 8" fill="currentColor"><path d="M0 0l8 4-8 4z"/></svg>
                      </div>
                    )}
                    <button
                      onClick={() => setTamperedBlock(tamperedBlock === b.id ? null : b.id)}
                      className={`rounded-xl border-2 px-3 sm:px-4 py-3 text-center transition-all duration-300 min-w-[100px] cursor-pointer
                        ${isTampered ? 'border-red-400 bg-red-50 dark:bg-red-900/20 shadow-lg scale-105 ring-2 ring-red-200 dark:ring-red-800' :
                          isBroken ? 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10' :
                          'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'}`}
                    >
                      <p className={`text-sm font-bold ${isTampered ? 'text-red-700 dark:text-red-300' : isBroken ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>{b.label}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{b.sub}</p>
                      {isBroken && i > 0 && (
                        <p className="text-[10px] text-red-500 font-medium mt-1">
                          {isTampered ? 'TAMPERED' : 'BROKEN'}
                        </p>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
            {tamperedBlock !== null && (
              <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 max-w-lg mx-auto">
                <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                  {tamperedBlock === 0
                    ? "The genesis block is hardcoded — tampering with it would be rejected by every node. But if it could be changed, every subsequent block's prev hash would mismatch."
                    : `Changing Block ${tamperedBlock} changes its hash. Block ${tamperedBlock + 1}'s "prev block hash" field no longer matches → the chain is broken from Block ${tamperedBlock} onward. An attacker would need to redo all Proof of Work from here to the tip.`
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Merkle Tree Tab */}
        {tab === 'merkle' && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Hover a transaction to see its hash path to the Merkle Root</p>

            {/* Root */}
            <div className={`rounded-lg border-2 px-5 py-2.5 text-center transition-all duration-200
              ${merkleHighlight ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-md' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
              <p className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">Merkle Root</p>
              <p className="text-xs font-mono text-gray-600 dark:text-gray-400">H(H(AB) + H(CD))</p>
            </div>

            {/* Level 1 connectors */}
            <div className="flex items-start justify-center w-full max-w-sm">
              <div className="flex-1 flex justify-end pr-1"><div className={`w-0.5 h-6 ml-auto mr-[50%] transition-colors duration-200 ${merkleHighlight === 'A' || merkleHighlight === 'B' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} /></div>
              <div className="flex-1 flex justify-start pl-1"><div className={`w-0.5 h-6 mr-auto ml-[50%] transition-colors duration-200 ${merkleHighlight === 'C' || merkleHighlight === 'D' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} /></div>
            </div>

            {/* Level 1 nodes */}
            <div className="flex gap-8 sm:gap-16">
              <div className={`rounded-lg border-2 px-4 py-2 text-center transition-all duration-200
                ${merkleHighlight === 'A' || merkleHighlight === 'B' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400">H(AB)</p>
              </div>
              <div className={`rounded-lg border-2 px-4 py-2 text-center transition-all duration-200
                ${merkleHighlight === 'C' || merkleHighlight === 'D' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400">H(CD)</p>
              </div>
            </div>

            {/* Level 2 connectors */}
            <div className="flex gap-8 sm:gap-16 w-full max-w-xs justify-center">
              <div className="flex gap-4 sm:gap-8">
                <div className={`w-0.5 h-6 transition-colors duration-200 ${merkleHighlight === 'A' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                <div className={`w-0.5 h-6 transition-colors duration-200 ${merkleHighlight === 'B' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
              </div>
              <div className="flex gap-4 sm:gap-8">
                <div className={`w-0.5 h-6 transition-colors duration-200 ${merkleHighlight === 'C' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                <div className={`w-0.5 h-6 transition-colors duration-200 ${merkleHighlight === 'D' ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
              </div>
            </div>

            {/* Leaf hashes */}
            <div className="flex gap-2 sm:gap-4">
              {['A', 'B', 'C', 'D'].map(tx => (
                <div
                  key={tx}
                  className={`rounded-lg border-2 px-3 py-1.5 text-center transition-all duration-200
                    ${merkleHighlight === tx ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                >
                  <p className="text-xs font-mono text-gray-500 dark:text-gray-400">H({tx})</p>
                </div>
              ))}
            </div>

            {/* Connectors to TXs */}
            <div className="flex gap-2 sm:gap-4">
              {['A', 'B', 'C', 'D'].map(tx => (
                <div key={tx} className="flex justify-center w-[60px] sm:w-[68px]">
                  <div className={`w-0.5 h-4 transition-colors duration-200 ${merkleHighlight === tx ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                </div>
              ))}
            </div>

            {/* Transactions */}
            <div className="flex gap-2 sm:gap-4">
              {['A', 'B', 'C', 'D'].map(tx => (
                <button
                  key={tx}
                  onMouseEnter={() => setMerkleHighlight(tx)}
                  onMouseLeave={() => setMerkleHighlight(null)}
                  onClick={() => setMerkleHighlight(merkleHighlight === tx ? null : tx)}
                  className={`rounded-xl border-2 px-3 sm:px-4 py-2.5 text-center transition-all duration-200 cursor-pointer
                    ${merkleHighlight === tx
                      ? 'border-amber-400 bg-amber-100 dark:bg-amber-900/40 shadow-md scale-105'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
                >
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300">TX {tx}</p>
                </button>
              ))}
            </div>

            {merkleHighlight && (
              <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 max-w-sm text-center">
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  TX {merkleHighlight} → H({merkleHighlight}) → H({merkleHighlight === 'A' || merkleHighlight === 'B' ? 'AB' : 'CD'}) → <strong>Merkle Root</strong>
                </p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Change this TX and the root changes, breaking the block header hash.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
