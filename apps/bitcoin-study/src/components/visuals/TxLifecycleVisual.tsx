import { useState } from 'react'

const stages = [
  {
    id: 'wallet',
    icon: '💳',
    label: 'Wallet',
    color: 'indigo',
    steps: ['Select UTXOs to spend', 'Build transaction (inputs + outputs)', 'Sign with private key(s)'],
  },
  {
    id: 'peers',
    icon: '🔗',
    label: 'Peers',
    color: 'blue',
    steps: ['Receive transaction', 'Validate: correct signatures? valid UTXOs?', 'Relay to other peers (gossip propagation)'],
  },
  {
    id: 'mempool',
    icon: '📋',
    label: 'Mempool',
    color: 'purple',
    steps: ['Transaction waits in each node\'s local mempool', 'NOT yet confirmed — just pending', 'Each node\'s mempool may differ slightly'],
  },
  {
    id: 'miner',
    icon: '⛏',
    label: 'Miner',
    color: 'amber',
    steps: ['Miner builds a candidate block', 'Includes this tx (if fee rate is attractive)', 'Mines the block (finds valid nonce)'],
  },
  {
    id: 'block',
    icon: '📦',
    label: 'Block',
    color: 'emerald',
    steps: ['Transaction is now in a mined block', '1 confirmation', 'Broadcast to the network'],
  },
  {
    id: 'confirms',
    icon: '✓',
    label: 'Confirmations',
    color: 'green',
    steps: ['Each new block = +1 confirmation', '6 confirmations ≈ strong finality (~1 hour)', 'More depth = exponentially harder to reverse'],
  },
]

const colorMap: Record<string, { ring: string; bg: string; border: string; text: string; dot: string; line: string }> = {
  indigo: { ring: 'ring-indigo-300', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', dot: 'bg-indigo-500', line: 'bg-indigo-300' },
  blue: { ring: 'ring-blue-300', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', dot: 'bg-blue-500', line: 'bg-blue-300' },
  purple: { ring: 'ring-purple-300', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', dot: 'bg-purple-500', line: 'bg-purple-300' },
  amber: { ring: 'ring-amber-300', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500', line: 'bg-amber-300' },
  emerald: { ring: 'ring-emerald-300', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500', line: 'bg-emerald-300' },
  green: { ring: 'ring-green-300', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', dot: 'bg-green-500', line: 'bg-green-300' },
}

const feeBarData = [
  { label: '50+ sat/vB', pct: 100, tier: 'Next block' },
  { label: '30-50 sat/vB', pct: 75, tier: '~1-2 blocks' },
  { label: '15-30 sat/vB', pct: 50, tier: '~3-6 blocks' },
  { label: '5-15 sat/vB', pct: 30, tier: 'Hours' },
  { label: '1-5 sat/vB', pct: 12, tier: 'May wait days' },
]

export default function TxLifecycleVisual() {
  const [activeStage, setActiveStage] = useState(0)
  const [hoveredFee, setHoveredFee] = useState<number | null>(null)

  const c = colorMap[stages[activeStage].color]

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Transaction Pipeline — Click each stage
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Pipeline */}
        <div className="flex flex-col gap-0 max-w-md mx-auto">
          {stages.map((s, i) => {
            const sc = colorMap[s.color]
            const isActive = i === activeStage
            const isPast = i < activeStage
            return (
              <div key={s.id}>
                <button
                  onClick={() => setActiveStage(i)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                    ${isActive ? `${sc.bg} border-2 ${sc.border} shadow-md ring-2 ${sc.ring} ring-offset-1` :
                      isPast ? 'bg-gray-50 border-2 border-gray-100' :
                      'bg-white border-2 border-transparent hover:bg-gray-50'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 transition-all
                    ${isActive ? `${sc.dot} text-white shadow-sm` : isPast ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                    {isPast ? '✓' : s.icon}
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-sm font-semibold ${isActive ? sc.text : isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                      {s.label}
                    </p>
                    {isActive && (
                      <ul className="mt-1.5 space-y-1">
                        {s.steps.map((step, j) => (
                          <li key={j} className={`text-xs ${sc.text} opacity-80 flex items-start gap-1.5`}>
                            <span className="mt-0.5 shrink-0">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={`text-xs font-mono ${isActive ? sc.text : 'text-gray-300'}`}>
                    {i + 1}/{stages.length}
                  </div>
                </button>
                {i < stages.length - 1 && (
                  <div className="flex justify-start ml-9 py-0.5">
                    <div className={`w-0.5 h-4 transition-colors duration-300 ${isPast ? sc.line : 'bg-gray-200'}`} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
            disabled={activeStage === 0}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveStage(Math.min(stages.length - 1, activeStage + 1))}
            disabled={activeStage === stages.length - 1}
            className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${c.dot} text-white hover:opacity-90`}
          >
            Next →
          </button>
        </div>

        {/* Fee Rate Priority */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Fee Rate Priority</p>
          <div className="space-y-2 max-w-sm mx-auto">
            {feeBarData.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center gap-3 group cursor-pointer"
                onMouseEnter={() => setHoveredFee(i)}
                onMouseLeave={() => setHoveredFee(null)}
              >
                <span className="text-[10px] text-gray-400 w-20 text-right shrink-0 font-mono">{f.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2
                      ${hoveredFee === i ? 'bg-amber-500' : 'bg-amber-400/70'}`}
                    style={{ width: `${f.pct}%` }}
                  >
                    {f.pct > 30 && <span className="text-[10px] text-white font-medium">{f.tier}</span>}
                  </div>
                </div>
                {f.pct <= 30 && <span className="text-[10px] text-gray-400 shrink-0">{f.tier}</span>}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3">
            Fee rate = fee ÷ tx size (sat/vB). Miners pick highest rate first to maximize revenue.
          </p>
        </div>
      </div>
    </div>
  )
}
