import { useState, useCallback } from 'react'
import { useSimulation } from './context'

export default function NetworkView() {
  const { state, dispatch } = useSimulation()
  const [propagating, setPropagating] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const broadcast = useCallback(() => {
    if (propagating || state.nodes.length === 0) return
    setPropagating(true)
    dispatch({ type: 'BROADCAST', payload: { message: 'Broadcasting to network...' } })

    const order = [...state.nodes].sort(() => Math.random() - 0.5)

    order.forEach((_node, i) => {
      setTimeout(() => {
        dispatch({
          type: 'SET_NODES',
          payload: state.nodes.map(n =>
            order.slice(0, i + 1).some(o => o.id === n.id)
              ? { ...n, lit: true }
              : { ...n, lit: false }
          ),
        })
        if (i === order.length - 1) {
          setTimeout(() => {
            dispatch({
              type: 'SET_NODES',
              payload: state.nodes.map(n => ({ ...n, lit: false })),
            })
            dispatch({ type: 'BROADCAST', payload: { message: 'All nodes received the message' } })
            setPropagating(false)
          }, 800)
        }
      }, i * 350)
    })
  }, [propagating, state.nodes, dispatch])

  const handleAddNode = () => {
    dispatch({ type: 'ADD_NODE' })
  }

  const handleRemoveNode = (id: string) => {
    if (propagating) return
    dispatch({ type: 'REMOVE_NODE', payload: { id } })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Network — {state.nodes.length} nodes
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAddNode}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-400 cursor-pointer transition-colors shadow-sm"
          >
            + Add Node
          </button>
          <button
            onClick={broadcast}
            disabled={propagating}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm"
          >
            {propagating ? 'Propagating...' : 'Broadcast'}
          </button>
        </div>
      </div>

      <p className="text-[10px] text-gray-400">Click a node to remove it. Click "Broadcast" to simulate gossip propagation.</p>

      {/* Network visualization */}
      <div className="relative w-full h-72 sm:h-80 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {state.edges.map(([a, b]) => {
            const na = state.nodes.find(n => n.id === a)
            const nb = state.nodes.find(n => n.id === b)
            if (!na || !nb) return null
            const bothLit = na.lit && nb.lit
            const eitherHovered = hoveredNode === a || hoveredNode === b
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={bothLit ? '#f59e0b' : eitherHovered ? '#9ca3af' : '#e5e7eb'}
                strokeWidth={bothLit ? 0.8 : 0.4}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>

        {state.nodes.map(n => (
          <button
            key={n.id}
            onClick={() => handleRemoveNode(n.id)}
            onMouseEnter={() => setHoveredNode(n.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            title={`${n.label} — click to remove`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300
              ${n.lit
                ? 'bg-amber-400 border-amber-500 text-white shadow-lg scale-110'
                : hoveredNode === n.id
                  ? 'bg-red-50 border-red-300 text-red-600 shadow-md scale-105'
                  : 'bg-white border-gray-300 text-gray-500 group-hover:border-gray-400'
              }`}
            >
              {n.id.replace('N', '')}
            </div>
            <span className="text-[8px] text-gray-400 mt-0.5 block text-center whitespace-nowrap">
              {n.label}
            </span>
          </button>
        ))}
      </div>

      {/* Node info */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 text-center">
        <p className="text-xs text-gray-600">
          Each node: <strong>validate</strong> → <strong>add to mempool</strong> → <strong>relay to peers</strong>
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          P2P gossip protocol. No central server. Nodes connect to ~8-125 peers each.
        </p>
      </div>
    </div>
  )
}
