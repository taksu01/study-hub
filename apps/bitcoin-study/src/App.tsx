import { useState, useEffect, useCallback } from 'react'
import { sections } from './data/sections'
import { marketSections } from './data/marketSections'
import SectionCard from './components/SectionCard'
import SimulationSection from './components/simulation/SimulationSection'
import MarketPage from './components/market/MarketPage'

type Mode = 'tech' | 'market'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('btc-dark-mode') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('btc-dark-mode', String(dark))
    } catch {}
  }, [dark])

  return [dark, setDark] as const
}

const techNavExtras = [
  { id: 'simulation', label: 'Live Simulation', icon: '🔬' },
  { id: 'mental-model', label: 'Final Mental Model', icon: '🧠' },
  { id: 'study-tips', label: 'How to Study This', icon: '📖' },
]

const marketNavExtras = [
  { id: 'market-summary', label: 'The Complete Thesis', icon: '⚡' },
]

export default function App() {
  const [mode, setMode] = useState<Mode>('tech')
  const [dark, setDark] = useDarkMode()
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [activeMarketSection, setActiveMarketSection] = useState(marketSections[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleTechScroll = useCallback(() => {
    const offset = 120
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveSection(sections[i].id)
        return
      }
    }
    for (const extra of techNavExtras) {
      const el = document.getElementById(extra.id)
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveSection(extra.id)
        return
      }
    }
  }, [])

  const handleMarketScroll = useCallback(() => {
    const offset = 120
    for (let i = marketSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(`market-${marketSections[i].id}`)
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveMarketSection(marketSections[i].id)
        return
      }
    }
  }, [])

  useEffect(() => {
    const handler = mode === 'tech' ? handleTechScroll : handleMarketScroll
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [mode, handleTechScroll, handleMarketScroll])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setSidebarOpen(false)
    }
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setSidebarOpen(false)
  }

  const techNavItems = [
    ...sections.map(s => ({ id: s.id, label: `${s.number}. ${s.title}`, icon: s.icon })),
    ...techNavExtras,
  ]

  const marketNavItems = [
    ...marketSections.map(s => ({ id: `market-${s.id}`, label: `${s.number}. ${s.title}`, icon: s.icon })),
    ...marketNavExtras,
  ]

  const currentNavItems = mode === 'tech' ? techNavItems : marketNavItems
  const currentActiveId = mode === 'tech' ? activeSection : `market-${activeMarketSection}`

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors`}>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {sidebarOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-200 ease-in-out overflow-y-auto flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                ₿
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">Bitcoin Study Guide</h1>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Interactive Knowledge Base</p>
              </div>
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mode switcher */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => switchMode('tech')}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'tech'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              ⛓ Technology
            </button>
            <button
              onClick={() => switchMode('market')}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'market'
                  ? 'bg-white dark:bg-gray-700 text-orange-700 dark:text-amber-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              📈 Value
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="p-3 flex-1">
          <p className="px-3 py-2 text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-600 uppercase">
            {mode === 'tech' ? 'Sections' : 'Market Sections'}
          </p>
          <ul className="space-y-0.5">
            {currentNavItems.map(item => {
              const isActive = currentActiveId === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-2.5
                      ${isActive
                        ? mode === 'tech'
                          ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-700'
                          : 'bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-700'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent'
                      }`}
                  >
                    <span className="text-sm shrink-0">{item.icon}</span>
                    <span className="leading-tight truncate">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar tip */}
        <div className="p-4 mx-3 mb-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shrink-0">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
            {mode === 'tech'
              ? <><strong className="text-gray-700 dark:text-gray-300">Tip:</strong> Each section follows: Big Picture → Visual → Example → Details → Terms → Recall → Cheat Sheet.</>
              : <><strong className="text-gray-700 dark:text-gray-300">Tip:</strong> Each section includes an Investor Takeaway and addresses common objections to the Bitcoin thesis.</>
            }
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72">
        {mode === 'tech' ? (
          <>
            {/* Tech Hero */}
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
                <div className="flex flex-wrap gap-3 text-xs mb-8">
                  {['13 Sections', 'Live Simulation', 'Interactive Visuals', 'SegWit & Taproot', 'Block Size Wars', 'Key Terms', 'Recall Prompts', 'Cheat Sheets'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white/10 rounded-full text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mode switcher CTA */}
                <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                  <span className="text-sm text-gray-300">Want the investment thesis instead?</span>
                  <button
                    onClick={() => switchMode('market')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Value & Markets →
                  </button>
                </div>
              </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
              {/* Knowledge Map */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm mb-12">
                <h2 className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-5">
                  Knowledge Map — Learning Path
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-all text-left group cursor-pointer"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Section {s.number}</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{s.title}</p>
                      </div>
                    </button>
                  ))}
                  {techNavExtras.slice(0, 2).map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-all text-left group cursor-pointer"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Interactive</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{item.label}</p>
                      </div>
                    </button>
                  ))}
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
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
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
                    <div className="rounded-xl bg-gray-900 dark:bg-black p-6 overflow-x-auto mb-8">
                      <pre className="text-sm leading-relaxed text-green-300 font-mono whitespace-pre">{`THE BITCOIN SYSTEM — ONE VIEW
=================================

  KEYS & OWNERSHIP            TRANSACTIONS              BLOCKS & CHAIN
  ----------------            ------------              --------------
  Private key                 UTXOs consumed            Blocks link backward
    -> Public key               -> new UTXOs created    Merkle root commits
      -> Address              Fee = in - out              to all txs
  Seed -> HD tree             Signed with private key   Header gets hashed
  Wallet = key mgr                                       in PoW search
    + UTXO tracker              |
    + tx builder                v

  NETWORK                     MEMPOOL -> MINING         CONSENSUS
  -------                     ----------------          ---------
  P2P gossip                  Tx waits in mempool       Nakamoto consensus:
  Full nodes verify all       Miner selects by            PoW + chain rule
  SPV trusts headers            fee rate (sat/vB)         + difficulty adj
  No central server           Finds hash < target         + incentives

  SEGWIT & TAPROOT            LIGHTNING                 SUPPLY & HALVINGS
  ----------------            ---------                 -----------------
  SegWit: malleability fix    L2 on Bitcoin             21M hard cap
  vBytes, witness discount    Payment channels          Halving every 210k
  Taproot: key aggregation    HTLCs + routing             blocks (~4 years)
  MAST: script privacy        Speed + privacy           Post-2024: 3.125
  bc1q/bc1p addresses         Complement, not           BTC per block
                               replacement`}</pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Core Principle Chain</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          {[
                            'Private keys grant spending authority',
                            'Transactions consume UTXOs, create new ones',
                            'Transactions enter mempools, await mining',
                            'Miners bundle txs into blocks via PoW',
                            'Blocks chain backward via hashes',
                            'Full nodes verify everything independently',
                            'Economic incentives keep miners honest',
                            'SegWit fixed malleability, enabled Lightning',
                            'Taproot: privacy + key aggregation',
                            'Block Size Wars: users — not miners — set rules',
                          ].map((p, i) => (
                            <p key={i}><strong className="text-gray-900 dark:text-gray-100">{i + 1}.</strong> {p}</p>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">What to Revisit When Rusty</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          {[
                            { ref: 'Section 3', topic: 'Forgot UTXO model?' },
                            { ref: 'Section 4', topic: 'Confused about fees?' },
                            { ref: 'Section 5', topic: 'How does mining work?' },
                            { ref: 'Section 6', topic: 'Full node vs SPV?' },
                            { ref: 'Section 7', topic: 'Key derivation / HD?' },
                            { ref: 'Section 8', topic: 'What can 51% do?' },
                            { ref: 'Section 9', topic: 'Lightning channels?' },
                            { ref: 'Section 10', topic: 'BTC vs ETH model?' },
                            { ref: 'Section 11', topic: 'SegWit & vBytes?' },
                            { ref: 'Section 12', topic: 'Taproot & Schnorr?' },
                            { ref: 'Section 13', topic: 'Bitcoin governance & UASF?' },
                          ].map(item => (
                            <p key={item.ref}><span className="text-amber-500 dark:text-amber-400">▸</span> {item.topic} → {item.ref}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-5">
                      <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">The One-Sentence Summary</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        Bitcoin is a peer-to-peer system that uses cryptographic signatures for ownership,
                        a UTXO-based transaction model for value transfer, Proof of Work mining for block
                        production and security, a difficulty-adjusted blockchain for tamper-evident history,
                        full nodes for independent rule enforcement, SegWit and Taproot for efficiency and privacy,
                        Lightning for scalable instant payments, and a governance model where users — not miners —
                        have the final say — all without requiring trust in any central authority.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Tips */}
              <div id="study-tips" className="scroll-mt-20 mt-12 mb-20">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-6">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">📖</span>
                      <h2 className="text-xl font-bold text-white">How to Study This Guide</h2>
                    </div>
                  </div>
                  <div className="px-8 py-6 space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {[
                      { n: '1', title: 'First pass — Big Picture only.', body: 'Read just the "Big Picture" and "Visual" for all 13 sections. Get the mental map before the details.' },
                      { n: '2', title: 'Second pass — Examples and Details.', body: 'Go through each section fully. Open "Important Details" and "Common Confusion" blocks.' },
                      { n: '3', title: 'Test yourself — Recall Prompts.', body: 'Try answering each recall question from memory before looking at the hint. If you can\'t, re-read that section.' },
                      { n: '4', title: 'Quick review — Cheat Sheets.', body: 'When revising, scan the cheat sheets. They\'re designed as fast refreshers.' },
                      { n: '5', title: 'Connect the dots — Mental Model.', body: 'Return to the final summary to see how everything interlocks. Bitcoin is a system; isolated facts don\'t stick.' },
                      { n: '6', title: 'The investment angle — Value & Markets.', body: 'Switch to the "Value" tab to understand why Bitcoin has value. The tech is the foundation; the market is the application.' },
                    ].map(step => (
                      <div key={step.n} className="flex items-start gap-3">
                        <span className="text-amber-500 font-bold mt-0.5">{step.n}.</span>
                        <p><strong className="text-gray-900 dark:text-gray-100">{step.title}</strong> {step.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <MarketPage />
        )}
      </main>
    </div>
  )
}
