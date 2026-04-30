import { useState, useRef, useCallback } from 'react'

type Tab = 'flow' | 'difficulty' | 'halving'

const halvings = [
  { period: 'Blocks 0–209,999', subsidy: '50 BTC', year: '2009', pct: 100 },
  { period: 'Blocks 210k–419,999', subsidy: '25 BTC', year: '2012', pct: 50 },
  { period: 'Blocks 420k–629,999', subsidy: '12.5 BTC', year: '2016', pct: 25 },
  { period: 'Blocks 630k–839,999', subsidy: '6.25 BTC', year: '2020', pct: 12.5 },
  { period: 'Blocks 840k–1,049,999', subsidy: '3.125 BTC', year: '2024', pct: 6.25 },
  { period: '...', subsidy: '→ 0', year: '~2140', pct: 1 },
]

export default function MiningVisual() {
  const [tab, setTab] = useState<Tab>('flow')
  const [miningStep, setMiningStep] = useState(0)
  const [hashAttempts, setHashAttempts] = useState(0)
  const [found, setFound] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'flow', label: 'Mining Flow' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'halving', label: 'Halving Schedule' },
  ]

  const flowSteps = [
    { label: 'Assemble Candidate Block', desc: 'Pick transactions from mempool, create coinbase tx (reward), build Merkle tree, construct block header.', color: 'bg-indigo-500' },
    { label: 'Hash the Header', desc: 'SHA-256(SHA-256(version + prev_hash + merkle_root + timestamp + nBits + nonce))', color: 'bg-blue-500' },
    { label: 'Check: hash < target?', desc: 'If YES → broadcast block! If NO → change nonce, go back to step 2. Repeat billions of times.', color: 'bg-amber-500' },
  ]

  const fakeHash = () => {
    const chars = '0123456789abcdef'
    const leading = Math.random() > 0.97 ? '0000000' : ''
    const rest = Array.from({ length: 64 - leading.length }, () => chars[Math.floor(Math.random() * 16)]).join('')
    return leading + rest
  }

  const startMining = useCallback(() => {
    setHashAttempts(0)
    setFound(false)
    setCurrentHash('')
    const target = 10 + Math.floor(Math.random() * 30)
    let count = 0
    intervalRef.current = setInterval(() => {
      count++
      const h = fakeHash()
      setCurrentHash(h)
      setHashAttempts(count)
      if (count >= target) {
        setFound(true)
        setCurrentHash('0000000' + h.slice(7))
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 80)
  }, [])

  const stopMining = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Mining Explorer
        </p>
        <div className="flex gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); stopMining(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${tab === t.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Mining Flow */}
        {tab === 'flow' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md space-y-3">
              {flowSteps.map((s, i) => (
                <div key={i}>
                  <button
                    onClick={() => setMiningStep(miningStep === i ? -1 : i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer border-2
                      ${miningStep === i ? 'border-gray-800 dark:border-gray-400 bg-gray-50 dark:bg-gray-800 shadow-md' : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${s.color}`}>
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{s.label}</p>
                      {miningStep === i && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
                      )}
                    </div>
                  </button>
                  {i < flowSteps.length - 1 && (
                    <div className="flex justify-start ml-7 py-0.5">
                      <div className="w-0.5 h-3 bg-gray-200 dark:bg-gray-700" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mining simulator */}
            <div className="w-full max-w-md mt-4 rounded-xl bg-gray-900 p-5 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Hash Search Simulator</p>
              <div className="font-mono text-xs text-gray-500 mb-3 break-all h-5">
                {currentHash && (
                  <span>
                    <span className={found ? 'text-emerald-400 font-bold' : 'text-red-400'}>{currentHash.slice(0, 7)}</span>
                    <span className="text-gray-600">{currentHash.slice(7)}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-xs text-gray-500">Attempts: <span className="text-white font-bold">{hashAttempts}</span></span>
                {found && <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">FOUND!</span>}
              </div>
              <button
                onClick={found ? () => { setFound(false); setHashAttempts(0); setCurrentHash(''); } : startMining}
                className={`px-6 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all
                  ${found ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-amber-500 text-white hover:bg-amber-400 shadow-lg'}`}
              >
                {found ? 'Reset' : 'Try Mining'}
              </button>
              <p className="text-[10px] text-gray-600 mt-2">
                {found ? 'Hash starts with enough leading zeros (below target).' : 'Searching for a hash below the target threshold...'}
              </p>
            </div>
          </div>
        )}

        {/* Difficulty */}
        {tab === 'difficulty' && (
          <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
            <div className="w-full rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 text-center">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Difficulty Adjustment</p>
              <p className="text-xs text-blue-700 dark:text-blue-400">Every <strong>2,016 blocks</strong> (~2 weeks)</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-center">
                <p className="text-2xl mb-1">🔥</p>
                <p className="text-xs font-bold text-red-700 dark:text-red-300">Blocks found too FAST</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Target decreases</p>
                <p className="text-[10px] text-red-500 dark:text-red-500 mt-0.5">(harder to mine)</p>
              </div>
              <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                <p className="text-2xl mb-1">🐢</p>
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300">Blocks found too SLOW</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Target increases</p>
                <p className="text-[10px] text-blue-500 dark:text-blue-500 mt-0.5">(easier to mine)</p>
              </div>
            </div>
            <div className="w-full rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 text-center">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Goal: maintain ~10 minute average block interval</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">More hash power = more security, NOT faster blocks</p>
            </div>
          </div>
        )}

        {/* Halving Schedule */}
        {tab === 'halving' && (
          <div className="max-w-md mx-auto">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">Block reward = Subsidy + Transaction fees. Subsidy halves every 210,000 blocks.</p>
            <div className="space-y-2">
              {halvings.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-500 w-12 text-right shrink-0">{h.year}</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-8 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center px-3 transition-all duration-700"
                      style={{ width: `${Math.max(h.pct, 8)}%` }}
                    >
                      <span className="text-xs text-white font-bold whitespace-nowrap">{h.subsidy}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 w-32 shrink-0 truncate">{h.period}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-center">
              <p className="text-xs text-amber-800 dark:text-amber-300">Total supply cap: <strong>21,000,000 BTC</strong></p>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">~99% mined by ~2035. Last satoshi by ~2140.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
