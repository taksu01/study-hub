import { useState } from 'react'

type Tab = 'lifecycle' | 'routing' | 'compare'

const channelSteps = [
  {
    label: 'Open Channel',
    tag: 'ON-CHAIN',
    tagColor: 'bg-blue-500',
    desc: 'Alice and Bob create a funding transaction: 2-of-2 multisig on the Bitcoin base layer.',
    aliceBal: '0.10',
    bobBal: '0.00',
  },
  {
    label: 'Payment 1',
    tag: 'OFF-CHAIN',
    tagColor: 'bg-emerald-500',
    desc: 'Alice sends 0.03 BTC to Bob. They exchange signed commitment transactions.',
    aliceBal: '0.07',
    bobBal: '0.03',
  },
  {
    label: 'Payment 2',
    tag: 'OFF-CHAIN',
    tagColor: 'bg-emerald-500',
    desc: 'Alice sends another 0.02 BTC to Bob. Instant, free, private.',
    aliceBal: '0.05',
    bobBal: '0.05',
  },
  {
    label: 'Payment 3',
    tag: 'OFF-CHAIN',
    tagColor: 'bg-emerald-500',
    desc: 'Bob sends 0.01 BTC back to Alice. Channels are bidirectional.',
    aliceBal: '0.06',
    bobBal: '0.04',
  },
  {
    label: 'Close Channel',
    tag: 'ON-CHAIN',
    tagColor: 'bg-blue-500',
    desc: 'Cooperative close: both sign the final state. One on-chain transaction settles the balance.',
    aliceBal: '0.06',
    bobBal: '0.04',
  },
]

const routingSteps = [
  { label: 'Dave generates secret R, sends hash(R) to Alice', nodes: [false, false, false, true] },
  { label: 'Alice → Bob: "Pay you if you show R" (HTLC)', nodes: [true, true, false, false] },
  { label: 'Bob → Carol: "Pay you if you show R" (HTLC)', nodes: [false, true, true, false] },
  { label: 'Carol → Dave: "Pay you if you show R" (HTLC)', nodes: [false, false, true, true] },
  { label: 'Dave reveals R to Carol → Carol pays Dave', nodes: [false, false, true, true] },
  { label: 'Carol reveals R to Bob → Bob pays Carol', nodes: [false, true, true, false] },
  { label: 'Bob reveals R to Alice → Alice pays Bob', nodes: [true, true, false, false] },
  { label: 'Done! Alice paid Dave atomically through the route.', nodes: [true, true, true, true] },
]

const compareData = [
  { aspect: 'Speed', base: '~10 min blocks', lightning: 'Milliseconds' },
  { aspect: 'Throughput', base: '~7 tx/sec', lightning: 'Millions tx/sec' },
  { aspect: 'Fees', base: 'Variable, can be high', lightning: 'Near-zero' },
  { aspect: 'Settlement', base: 'Final on-chain', lightning: 'Off-chain until close' },
  { aspect: 'Privacy', base: 'Pseudonymous, traceable', lightning: 'Better (onion routing)' },
  { aspect: 'Best for', base: 'Large transfers, settlement', lightning: 'Small, frequent payments' },
  { aspect: 'Security', base: 'Full Proof of Work', lightning: 'Anchored to base layer' },
]

export default function LightningVisual() {
  const [tab, setTab] = useState<Tab>('lifecycle')
  const [channelStep, setChannelStep] = useState(0)
  const [routeStep, setRouteStep] = useState(0)
  const [hoveredCompare, setHoveredCompare] = useState<number | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'lifecycle', label: 'Channel Lifecycle' },
    { key: 'routing', label: 'HTLC Routing' },
    { key: 'compare', label: 'L1 vs Lightning' },
  ]

  const cs = channelSteps[channelStep]
  const alicePct = parseFloat(cs.aliceBal) / 0.1 * 100
  const bobPct = parseFloat(cs.bobBal) / 0.1 * 100

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Lightning Network Explorer
        </p>
        <div className="flex gap-1">
          {tabs.map(t => (
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
        {/* Channel Lifecycle */}
        {tab === 'lifecycle' && (
          <div className="max-w-md mx-auto">
            {/* Step indicator */}
            <div className="flex justify-center gap-1 mb-6">
              {channelSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setChannelStep(i)}
                  className={`w-8 h-1.5 rounded-full transition-all cursor-pointer
                    ${i === channelStep ? 'bg-amber-500' : i < channelStep ? 'bg-amber-200' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Current step */}
            <div className="text-center mb-4">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${cs.tagColor}`}>
                {cs.tag}
              </span>
              <p className="text-sm font-bold text-gray-800 mt-2">{cs.label}</p>
              <p className="text-xs text-gray-500 mt-1">{cs.desc}</p>
            </div>

            {/* Channel balance bar */}
            <div className="rounded-xl border-2 border-gray-200 overflow-hidden mb-4">
              <div className="flex h-12">
                <div
                  className="bg-blue-400 flex items-center justify-center transition-all duration-500"
                  style={{ width: `${Math.max(alicePct, 5)}%` }}
                >
                  {alicePct > 15 && <span className="text-xs font-bold text-white">{cs.aliceBal}</span>}
                </div>
                <div
                  className="bg-emerald-400 flex items-center justify-center transition-all duration-500"
                  style={{ width: `${Math.max(bobPct, 5)}%` }}
                >
                  {bobPct > 15 && <span className="text-xs font-bold text-white">{cs.bobBal}</span>}
                </div>
              </div>
              <div className="flex justify-between px-3 py-1.5 bg-gray-50 text-xs">
                <span className="text-blue-600 font-medium">Alice: {cs.aliceBal} BTC</span>
                <span className="text-gray-400">Channel: 0.10 BTC</span>
                <span className="text-emerald-600 font-medium">Bob: {cs.bobBal} BTC</span>
              </div>
            </div>

            {/* Nav */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setChannelStep(Math.max(0, channelStep - 1))}
                disabled={channelStep === 0}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={() => setChannelStep(Math.min(channelSteps.length - 1, channelStep + 1))}
                disabled={channelStep === channelSteps.length - 1}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500 text-white hover:bg-amber-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* HTLC Routing */}
        {tab === 'routing' && (
          <div className="max-w-md mx-auto">
            <p className="text-xs text-gray-500 mb-4 text-center">Step through multi-hop payment: Alice → Bob → Carol → Dave</p>

            {/* Network nodes */}
            <div className="flex items-center justify-between mb-6 px-4">
              {['Alice', 'Bob', 'Carol', 'Dave'].map((name, i) => {
                const rs = routingSteps[routeStep]
                const active = rs.nodes[i]
                return (
                  <div key={name} className="flex flex-col items-center gap-1">
                    {i > 0 && i < 4 && (
                      <div className="absolute" style={{ display: 'none' }} />
                    )}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                      ${active ? 'bg-amber-100 border-amber-400 text-amber-700 shadow-md scale-110' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                      {name[0]}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{name}</span>
                  </div>
                )
              })}
            </div>

            {/* Connections */}
            <div className="flex items-center justify-center gap-0 mb-4 px-8">
              <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                <div className={`h-full bg-amber-400 transition-all duration-500 rounded-full ${routeStep >= 1 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                <div className={`h-full bg-amber-400 transition-all duration-500 rounded-full ${routeStep >= 2 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                <div className={`h-full bg-amber-400 transition-all duration-500 rounded-full ${routeStep >= 3 ? 'w-full' : 'w-0'}`} />
              </div>
            </div>

            {/* Current step */}
            <div className={`rounded-xl p-4 text-center mb-4 transition-all ${routeStep === routingSteps.length - 1 ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
              <p className="text-xs text-gray-400 mb-1">Step {routeStep + 1}/{routingSteps.length}</p>
              <p className="text-sm text-gray-800 font-medium">{routingSteps[routeStep].label}</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setRouteStep(Math.max(0, routeStep - 1))}
                disabled={routeStep === 0}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={() => setRouteStep(Math.min(routingSteps.length - 1, routeStep + 1))}
                disabled={routeStep === routingSteps.length - 1}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500 text-white hover:bg-amber-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* L1 vs Lightning comparison */}
        {tab === 'compare' && (
          <div className="max-w-lg mx-auto">
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-500 text-xs">Aspect</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-blue-600 text-xs">Base Layer (L1)</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-amber-600 text-xs">Lightning (L2)</th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.map((row, i) => (
                    <tr
                      key={row.aspect}
                      className={`border-b border-gray-100 transition-colors cursor-pointer
                        ${hoveredCompare === i ? 'bg-amber-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      onMouseEnter={() => setHoveredCompare(i)}
                      onMouseLeave={() => setHoveredCompare(null)}
                    >
                      <td className="px-4 py-2.5 font-medium text-gray-700 text-xs">{row.aspect}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{row.base}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{row.lightning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
