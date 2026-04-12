import { useState } from 'react'
import { SimulationProvider, useSimulation } from './context'
import { getWalletBalance } from './utils'
import BlockchainView from './BlockchainView'
import MempoolView from './MempoolView'
import NetworkView from './NetworkView'
import MiningPanel from './MiningPanel'

type Tab = 'chain' | 'mempool' | 'network' | 'mining'

function SimulationContent() {
  const [tab, setTab] = useState<Tab>('chain')
  const { state, dispatch } = useSimulation()

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'chain', label: 'Blockchain', icon: '⛓' },
    { key: 'mempool', label: 'Mempool', icon: '📋' },
    { key: 'mining', label: 'Mining', icon: '⛏' },
    { key: 'network', label: 'Network', icon: '🌐' },
  ]

  return (
    <div className="px-8 py-8 space-y-6">
      {/* Wallet status bar */}
      <div className="flex flex-wrap items-center gap-3">
        {state.wallets.map(w => {
          const bal = getWalletBalance(state.utxoSet, w.name)
          const colorMap: Record<string, string> = {
            blue: 'border-blue-200 bg-blue-50 text-blue-800',
            emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800',
            amber: 'border-amber-200 bg-amber-50 text-amber-800',
          }
          return (
            <div
              key={w.name}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${colorMap[w.color] ?? 'border-gray-200 bg-gray-50 text-gray-700'}`}
            >
              {w.name}: <span className="font-bold">{bal.toFixed(4)} BTC</span>
            </div>
          )
        })}
        <div className="ml-auto">
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            Reset Simulation
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 -mx-8 px-8">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer -mb-px flex items-center gap-2
              ${tab === t.key
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.key === 'mempool' && state.mempool.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                {state.mempool.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="min-h-[400px]">
        {tab === 'chain' && <BlockchainView />}
        {tab === 'mempool' && <MempoolView />}
        {tab === 'mining' && <MiningPanel />}
        {tab === 'network' && <NetworkView />}
      </div>

      {/* Event log */}
      {state.eventLog.length > 0 && (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Event Log</p>
            <p className="text-[10px] text-gray-400">{state.eventLog.length} events</p>
          </div>
          <div className="max-h-32 overflow-y-auto p-3 space-y-1 bg-gray-950">
            {[...state.eventLog].reverse().slice(0, 20).map((evt, i) => (
              <p key={i} className="text-[10px] font-mono text-gray-400 leading-relaxed">
                <span className="text-gray-600 mr-2">{String(state.eventLog.length - i).padStart(3, '0')}</span>
                {evt}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SimulationSection() {
  return (
    <section id="simulation" className="scroll-mt-20">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Section header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-2xl">🔬</span>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Live Simulation
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bitcoin Network Simulator</h2>
          <p className="text-gray-400 text-sm">
            Interactive sandbox combining blockchain, transactions, mining, and network propagation.
            Create transactions, mine blocks, inspect Merkle trees, and watch gossip unfold.
          </p>
        </div>

        <SimulationProvider>
          <SimulationContent />
        </SimulationProvider>
      </div>
    </section>
  )
}
