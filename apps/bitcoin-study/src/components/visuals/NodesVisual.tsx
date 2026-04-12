import { useState, useEffect, useCallback } from 'react'

type Tab = 'topology' | 'types'

interface NodeState {
  id: string
  x: number
  y: number
  lit: boolean
  label: string
}

const initialNodes: NodeState[] = [
  { id: 'A', x: 50, y: 15, lit: false, label: 'Node A' },
  { id: 'B', x: 20, y: 40, lit: false, label: 'Node B' },
  { id: 'C', x: 80, y: 40, lit: false, label: 'Node C' },
  { id: 'D', x: 10, y: 70, lit: false, label: 'Node D' },
  { id: 'E', x: 50, y: 70, lit: false, label: 'Node E' },
  { id: 'F', x: 90, y: 70, lit: false, label: 'Node F' },
  { id: 'G', x: 35, y: 90, lit: false, label: 'Node G' },
]

const edges: [string, string][] = [
  ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'E'], ['C', 'F'], ['D', 'G'], ['E', 'G'],
]

const propagationOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const nodeTypes = [
  {
    type: 'Full Node',
    icon: '🖥',
    downloads: 'All blocks + all transactions',
    trust: 'Trusts no one — verifies every rule independently',
    color: 'border-emerald-300 bg-emerald-50',
    textColor: 'text-emerald-800',
  },
  {
    type: 'Pruned Node',
    icon: '💾',
    downloads: 'All blocks (discards old ones)',
    trust: 'Same verification — deletes old blocks to save disk',
    color: 'border-blue-300 bg-blue-50',
    textColor: 'text-blue-800',
  },
  {
    type: 'SPV / Light Client',
    icon: '📱',
    downloads: 'Headers only + Merkle proofs',
    trust: 'Trusts miners for validity — checks inclusion only',
    color: 'border-amber-300 bg-amber-50',
    textColor: 'text-amber-800',
  },
  {
    type: 'Miner',
    icon: '⛏',
    downloads: 'Full node + PoW search',
    trust: 'Full verification + creates new blocks',
    color: 'border-purple-300 bg-purple-50',
    textColor: 'text-purple-800',
  },
]

export default function NodesVisual() {
  const [tab, setTab] = useState<Tab>('topology')
  const [nodes, setNodes] = useState(initialNodes)
  const [propagating, setPropagating] = useState(false)
  const [activeType, setActiveType] = useState<number | null>(null)

  const resetNodes = useCallback(() => {
    setNodes(initialNodes.map(n => ({ ...n, lit: false })))
    setPropagating(false)
  }, [])

  const broadcast = useCallback(() => {
    resetNodes()
    setPropagating(true)
    propagationOrder.forEach((nodeId, i) => {
      setTimeout(() => {
        setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, lit: true } : n))
        if (i === propagationOrder.length - 1) {
          setTimeout(() => setPropagating(false), 600)
        }
      }, i * 400)
    })
  }, [resetNodes])

  useEffect(() => {
    return () => resetNodes()
  }, [tab, resetNodes])

  const tabList: { key: Tab; label: string }[] = [
    { key: 'topology', label: 'Network & Gossip' },
    { key: 'types', label: 'Node Types' },
  ]

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Network Explorer
        </p>
        <div className="flex gap-1">
          {tabList.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${tab === t.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {tab === 'topology' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-gray-500">Click "Broadcast" to see a transaction propagate via gossip</p>

            {/* Network visualization */}
            <div className="relative w-full max-w-md h-64 bg-gray-50 rounded-xl border border-gray-200">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {edges.map(([a, b]) => {
                  const na = nodes.find(n => n.id === a)!
                  const nb = nodes.find(n => n.id === b)!
                  const bothLit = na.lit && nb.lit
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke={bothLit ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={bothLit ? 0.8 : 0.4}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>
              {nodes.map(n => (
                <div
                  key={n.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300
                    ${n.lit ? 'scale-110' : ''}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300
                    ${n.lit ? 'bg-amber-400 border-amber-500 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-500'}`}>
                    {n.id}
                  </div>
                  <span className="text-[8px] text-gray-400 mt-0.5">{n.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={broadcast}
              disabled={propagating}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              {propagating ? 'Propagating...' : 'Broadcast Transaction'}
            </button>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 max-w-sm text-center">
              <p className="text-xs text-gray-600">
                Each node: <strong>validate</strong> → <strong>add to mempool</strong> → <strong>relay to peers</strong><br />
                <span className="text-gray-400">No central server. No master node. ~8-125 peer connections each.</span>
              </p>
            </div>
          </div>
        )}

        {tab === 'types' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {nodeTypes.map((nt, i) => (
              <button
                key={nt.type}
                onClick={() => setActiveType(activeType === i ? null : i)}
                className={`rounded-xl border-2 p-4 text-left transition-all cursor-pointer
                  ${activeType === i ? `${nt.color} shadow-md` : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{nt.icon}</span>
                  <p className={`text-sm font-bold ${activeType === i ? nt.textColor : 'text-gray-800'}`}>{nt.type}</p>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">Downloads:</span> {nt.downloads}
                </p>
                {activeType === i && (
                  <p className={`text-xs ${nt.textColor} mt-2 p-2 rounded-lg bg-white/60 leading-relaxed`}>
                    {nt.trust}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
