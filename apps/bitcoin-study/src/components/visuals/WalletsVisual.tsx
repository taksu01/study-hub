import { useState } from 'react'

type Tab = 'keyflow' | 'hdtree' | 'custody'

const derivationNodes = [
  { id: 'seed', label: 'Seed Phrase', sub: '12/24 words', depth: 0, color: 'bg-amber-500', open: true },
  { id: 'master', label: 'Master Key (m)', sub: 'BIP-39 derivation', depth: 1, color: 'bg-amber-400', open: true },
  { id: 'p44', label: "m/44'", sub: 'Legacy', depth: 2, color: 'bg-gray-400', open: false },
  { id: 'p49', label: "m/49'", sub: 'SegWit-compat', depth: 2, color: 'bg-gray-400', open: false },
  { id: 'p84', label: "m/84'", sub: 'Native SegWit', depth: 2, color: 'bg-blue-500', open: true },
  { id: 'coin', label: "m/84'/0'", sub: 'Bitcoin', depth: 3, color: 'bg-blue-400', open: true },
  { id: 'acct', label: "m/84'/0'/0'", sub: 'Account 0', depth: 4, color: 'bg-indigo-400', open: true },
  { id: 'recv', label: 'Receive Addresses', sub: '0/0, 0/1, 0/2 ...', depth: 5, color: 'bg-emerald-500', open: true },
  { id: 'change', label: 'Change Addresses', sub: '1/0, 1/1, 1/2 ...', depth: 5, color: 'bg-purple-500', open: true },
]

export default function WalletsVisual() {
  const [tab, setTab] = useState<Tab>('keyflow')
  const [keyStep, setKeyStep] = useState(0)
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set(['p84']))

  const tabs: { key: Tab; label: string }[] = [
    { key: 'keyflow', label: 'Key → Address' },
    { key: 'hdtree', label: 'HD Wallet Tree' },
    { key: 'custody', label: 'Custody Models' },
  ]

  const keySteps = [
    { label: 'Private Key', detail: '256-bit random number. YOU must keep this secret.', icon: '🔒', color: 'border-red-300 bg-red-50 text-red-800', arrow: 'Elliptic curve multiplication (one-way)' },
    { label: 'Public Key', detail: 'Derived from the private key. Can be safely shared.', icon: '🔓', color: 'border-blue-300 bg-blue-50 text-blue-800', arrow: 'HASH160 (SHA-256 then RIPEMD-160) + encoding' },
    { label: 'Address', detail: 'What you share with others to receive bitcoin (bc1q...).', icon: '📬', color: 'border-emerald-300 bg-emerald-50 text-emerald-800', arrow: '' },
  ]

  const toggleBranch = (id: string) => {
    setExpandedBranches(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Wallet & Key Explorer
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
        {/* Key → Address flow */}
        {tab === 'keyflow' && (
          <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
            <p className="text-xs text-gray-500 mb-4">Click each step to see details. Derivation is one-way — you cannot reverse it.</p>
            {keySteps.map((s, i) => (
              <div key={s.label} className="w-full flex flex-col items-center">
                <button
                  onClick={() => setKeyStep(keyStep === i ? -1 : i)}
                  className={`w-full rounded-xl border-2 p-4 text-center transition-all cursor-pointer
                    ${keyStep === i ? `${s.color} shadow-md` : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <p className="text-sm font-bold text-gray-800 mt-1">{s.label}</p>
                  {keyStep === i && (
                    <p className="text-xs mt-2 leading-relaxed opacity-80">{s.detail}</p>
                  )}
                </button>
                {s.arrow && (
                  <div className="flex flex-col items-center py-2">
                    <div className="w-0.5 h-4 bg-gray-300" />
                    <span className="text-[9px] text-gray-400 px-2 py-1 bg-gray-50 rounded border border-gray-200 my-1">{s.arrow}</span>
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="currentColor"><path d="M6 12L0 4h12z"/></svg>
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 max-w-xs text-center">
              <p className="text-xs text-red-700">
                Private Key → Public Key → Address<br />
                <strong>CANNOT reverse:</strong> Address ✗→ Public Key ✗→ Private Key
              </p>
            </div>
          </div>
        )}

        {/* HD Tree */}
        {tab === 'hdtree' && (
          <div className="max-w-md mx-auto">
            <p className="text-xs text-gray-500 mb-4 text-center">One seed phrase → unlimited addresses. Click purpose branches to toggle.</p>
            <div className="space-y-1">
              {derivationNodes.map(node => {
                const isExpandable = node.id === 'p44' || node.id === 'p49' || node.id === 'p84'
                const isExpanded = !isExpandable || expandedBranches.has(node.id)
                const showNode = node.depth <= 2 ||
                  (node.depth === 3 && expandedBranches.has('p84')) ||
                  (node.depth === 4 && expandedBranches.has('p84')) ||
                  (node.depth === 5 && expandedBranches.has('p84'))

                if (!showNode) return null

                return (
                  <div key={node.id} style={{ marginLeft: node.depth * 24 }}>
                    {isExpandable ? (
                      <button
                        onClick={() => toggleBranch(node.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer
                          ${isExpanded && node.id === 'p84' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
                      >
                        <div className={`w-5 h-5 rounded-full ${node.color} shrink-0`} />
                        <div className="text-left">
                          <p className="text-xs font-bold text-gray-800">{node.label}</p>
                          <p className="text-[10px] text-gray-400">{node.sub}</p>
                        </div>
                        <span className="text-[10px] text-gray-300 ml-auto">{isExpanded ? '▼' : '▶'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2">
                        <div className={`w-5 h-5 rounded-full ${node.color} shrink-0`} />
                        <div>
                          <p className="text-xs font-bold text-gray-800">{node.label}</p>
                          <p className="text-[10px] text-gray-400">{node.sub}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Custody */}
        {tab === 'custody' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <p className="text-lg text-center mb-2">🔑</p>
              <p className="text-sm font-bold text-emerald-800 text-center mb-3">Self-Custody</p>
              <ul className="space-y-2 text-xs text-emerald-700">
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You hold private keys</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> You sign transactions</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> No one can freeze your funds</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Lose keys = lose coins forever</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-emerald-200 text-center">
                <p className="text-xs font-bold text-emerald-700">"Your keys, your coins"</p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
              <p className="text-lg text-center mb-2">🏦</p>
              <p className="text-sm font-bold text-red-800 text-center mb-3">Custodial</p>
              <ul className="space-y-2 text-xs text-red-700">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Exchange holds your keys</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> They sign for you</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> They can freeze your account</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Hack/bankruptcy = you may lose coins</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-red-200 text-center">
                <p className="text-xs font-bold text-red-700">"Not your keys, not your coins"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
