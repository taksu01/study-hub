import { useState, useEffect, useCallback } from 'react'
import { sections } from './data/sections'
import SectionCard from './components/SectionCard'
import SimulationSection from './components/simulation/SimulationSection'

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const offset = 120
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveSection(sections[i].id)
        return
      }
    }
    const simEl = document.getElementById('simulation')
    if (simEl && simEl.getBoundingClientRect().top <= offset) {
      setActiveSection('simulation')
      return
    }
    const mentalEl = document.getElementById('mental-model')
    if (mentalEl && mentalEl.getBoundingClientRect().top <= offset) {
      setActiveSection('mental-model')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setSidebarOpen(false)
    }
  }

  const navItems = [
    ...sections.map(s => ({ id: s.id, label: `${s.number}. ${s.title}`, icon: s.icon })),
    { id: 'simulation', label: 'Live Simulation', icon: '🔬' },
    { id: 'mental-model', label: 'Final Mental Model', icon: '🧠' },
    { id: 'study-tips', label: 'How to Study This', icon: '📖' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-gray-200 rounded-xl p-2.5 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {sidebarOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 transform transition-transform duration-200 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              ₿
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Bitcoin Study Guide</h1>
              <p className="text-xs text-gray-400">Interactive Knowledge Base</p>
            </div>
          </div>
        </div>

        <nav className="p-3">
          <p className="px-3 py-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Sections
          </p>
          <ul className="space-y-0.5">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-2.5
                    ${activeSection === item.id
                      ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="leading-tight">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mx-3 mb-6 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Tip:</strong> Use the sidebar to jump between sections.
            Each section follows: Big Picture → Visual → Example → Details → Terms → Recall → Cheat Sheet.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72">
        {/* Hero */}
        <header className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                ₿
              </div>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Interactive Study Guide
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              Bitcoin & Blockchain<br />
              <span className="text-amber-400">From First Principles</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
              A structured, visual, systems-oriented deep dive into how Bitcoin actually works.
              Built for developers who learn top-down, think in systems, and want real understanding — not surface-level buzzwords.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              {['10 Major Sections', 'Live Simulation', 'Interactive Visuals', 'Comparison Tables', 'Key Terms', 'Recall Prompts', 'Cheat Sheets'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/10 rounded-full text-gray-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Knowledge Map */}
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-12">
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
              Knowledge Map — Learning Path
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all text-left group cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-amber-600">Section {s.number}</p>
                    <p className="text-sm font-medium text-gray-800 leading-tight">{s.title}</p>
                  </div>
                </button>
              ))}
              <button
                onClick={() => scrollTo('simulation')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all text-left group cursor-pointer"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🔬</span>
                <div>
                  <p className="text-xs font-bold text-amber-600">Interactive</p>
                  <p className="text-sm font-medium text-gray-800 leading-tight">Live Simulation</p>
                </div>
              </button>
              <button
                onClick={() => scrollTo('mental-model')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all text-left group cursor-pointer"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🧠</span>
                <div>
                  <p className="text-xs font-bold text-amber-600">Summary</p>
                  <p className="text-sm font-medium text-gray-800 leading-tight">Final Mental Model</p>
                </div>
              </button>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map(s => (
              <SectionCard key={s.id} section={s} />
            ))}
          </div>

          {/* Live Simulation */}
          <div className="mt-12">
            <SimulationSection />
          </div>

          {/* Final Mental Model */}
          <div id="mental-model" className="scroll-mt-20 mt-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🧠</span>
                  <span className="text-xs font-bold tracking-widest text-amber-100 uppercase">
                    Final Summary
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">The Complete Mental Model</h2>
                <p className="text-amber-100 text-sm mt-1">Everything connects. Here's how.</p>
              </div>

              <div className="px-8 py-8">
                <div className="rounded-xl bg-gray-900 p-6 overflow-x-auto mb-8">
                  <pre className="text-sm leading-relaxed text-green-300 font-mono whitespace-pre">{`THE BITCOIN SYSTEM — ONE VIEW
═════════════════════════════

  KEYS & OWNERSHIP            TRANSACTIONS              BLOCKS & CHAIN
  ────────────────            ────────────              ──────────────
  Private key                 UTXOs consumed            Blocks link backward
    → Public key                → new UTXOs created     Merkle root commits
      → Address               Fee = in − out              to all txs
  Seed → HD tree              Signed with private key   Header gets hashed
  Wallet = key mgr                                       in PoW search
    + UTXO tracker              │
    + tx builder                ▼
                            
  NETWORK                     MEMPOOL → MINING          CONSENSUS
  ───────                     ────────────────          ─────────
  P2P gossip                  Tx waits in mempool       Nakamoto consensus:
  Full nodes verify all       Miner selects by            PoW + chain rule
  SPV trusts headers            fee rate (sat/vB)         + difficulty adj
  No central server           Finds hash < target         + incentives
                              Coinbase tx = reward      Most accumulated
                              Difficulty adjusts          work wins
                                every 2016 blocks

  LAYERS                      SECURITY                  SUPPLY
  ──────                      ────────                  ──────
  L1 = base chain             Protocol: 51%, eclipse    21 million cap
  L2 = Lightning              User: keys, phishing      Halving every 210k
  Settlement vs speed         Most losses = user-side     blocks
  Complement, not replace     PoW = Sybil resistance    ~2140: all mined`}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">Core Principle Chain</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong className="text-gray-900">1.</strong> Private keys grant spending authority</p>
                      <p><strong className="text-gray-900">2.</strong> Transactions consume UTXOs, create new ones</p>
                      <p><strong className="text-gray-900">3.</strong> Transactions enter mempools, await mining</p>
                      <p><strong className="text-gray-900">4.</strong> Miners bundle txs into blocks via PoW</p>
                      <p><strong className="text-gray-900">5.</strong> Blocks chain backward via hashes</p>
                      <p><strong className="text-gray-900">6.</strong> Full nodes verify everything independently</p>
                      <p><strong className="text-gray-900">7.</strong> Economic incentives keep miners honest</p>
                      <p><strong className="text-gray-900">8.</strong> Lightning extends capacity without breaking L1</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">What to Revisit When Rusty</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="text-amber-500">▸</span> Forgot UTXO model? → Section 3</p>
                      <p><span className="text-amber-500">▸</span> Confused about fees? → Section 4</p>
                      <p><span className="text-amber-500">▸</span> How does mining work? → Section 5</p>
                      <p><span className="text-amber-500">▸</span> Full node vs SPV? → Section 6</p>
                      <p><span className="text-amber-500">▸</span> Key derivation / HD? → Section 7</p>
                      <p><span className="text-amber-500">▸</span> What can 51% do? → Section 8</p>
                      <p><span className="text-amber-500">▸</span> Lightning channels? → Section 9</p>
                      <p><span className="text-amber-500">▸</span> BTC vs ETH model? → Section 10</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-5">
                  <h4 className="text-sm font-bold text-amber-700 mb-2">The One-Sentence Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Bitcoin is a peer-to-peer system that uses cryptographic signatures for ownership, 
                    a UTXO-based transaction model for value transfer, Proof of Work mining for block 
                    production and security, a difficulty-adjusted blockchain for tamper-evident history, 
                    full nodes for independent rule enforcement, and Lightning for scalable instant payments — 
                    all without requiring trust in any central authority.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Study Tips */}
          <div id="study-tips" className="scroll-mt-20 mt-12 mb-20">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-6">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">📖</span>
                  <h2 className="text-xl font-bold text-white">How to Study This Guide</h2>
                </div>
              </div>
              <div className="px-8 py-6 space-y-4 text-sm text-gray-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">1.</span>
                  <p><strong className="text-gray-900">First pass — Big Picture only.</strong> Read just the "Big Picture" and "Visual" for all 10 sections. Get the mental map before the details.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">2.</span>
                  <p><strong className="text-gray-900">Second pass — Examples and Details.</strong> Go through each section fully. Open "Important Details" and "Common Confusion" blocks.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">3.</span>
                  <p><strong className="text-gray-900">Test yourself — Recall Prompts.</strong> Try answering each recall question from memory before looking at the hint. If you can't, re-read that section.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">4.</span>
                  <p><strong className="text-gray-900">Quick review — Cheat Sheets.</strong> When revising, scan the cheat sheets. They're designed as fast refreshers.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">5.</span>
                  <p><strong className="text-gray-900">Connect the dots — Mental Model.</strong> Return to the final summary to see how everything interlocks. Bitcoin is a system; isolated facts don't stick.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
