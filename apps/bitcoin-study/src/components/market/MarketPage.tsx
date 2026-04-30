import { marketSections } from '../../data/marketSections'
import MarketSectionCard from './MarketSectionCard'

export default function MarketPage() {
  return (
    <div>
      {/* Market hero */}
      <header className="bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              ₿
            </div>
            <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">
              Value & Markets
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            Why Bitcoin Has Value<br />
            <span className="text-amber-400">The Investment Thesis</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            A rigorous, honest examination of why Bitcoin has value, why it is compared to digital gold,
            why institutional investors are allocating to it, and what the risks actually are.
            Written for skeptics, investors, and developers alike.
          </p>
          <div className="flex flex-wrap gap-3 text-xs mb-8">
            {[
              '10 Sections',
              'Inflation Analysis',
              'Asset Comparison Charts',
              'Supply Schedule',
              'Money Properties',
              'Risk Assessment',
              'Institutional Thesis',
            ].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-white/10 rounded-full text-gray-300 border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          {/* Audience guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: '🤔',
                label: 'Skeptic?',
                desc: 'Start with Section 1 — What Makes Money Valuable?',
                color: 'border-orange-500/40 bg-orange-500/10',
              },
              {
                icon: '💼',
                label: 'Investor?',
                desc: 'Start with Section 5 — Asset Class Comparison',
                color: 'border-blue-500/40 bg-blue-500/10',
              },
              {
                icon: '🖥',
                label: 'Developer?',
                desc: 'Start with Section 9 — Why Bitcoin Specifically',
                color: 'border-purple-500/40 bg-purple-500/10',
              },
            ].map(guide => (
              <div key={guide.label} className={`rounded-xl border p-4 ${guide.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{guide.icon}</span>
                  <span className="text-sm font-bold text-white">{guide.label}</span>
                </div>
                <p className="text-xs text-gray-300">{guide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
        {/* Knowledge Map */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm mb-12">
          <h2 className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-5">
            Market Sections — Learning Path
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {marketSections.map(s => {
              const audienceBadgeColors = {
                skeptic: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
                investor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                developer: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
                all: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
              }
              return (
                <a
                  key={s.id}
                  href={`#market-${s.id}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(`market-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-all text-left group cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Section {s.number}</p>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${audienceBadgeColors[s.audience]}`}>
                        {s.audience}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight truncate">{s.title}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {marketSections.map(s => (
            <MarketSectionCard key={s.id} section={s} />
          ))}
        </div>

        {/* Final Summary */}
        <div id="market-summary" className="scroll-mt-20 mt-12 mb-20">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚡</span>
                <span className="text-xs font-bold tracking-widest text-amber-100 uppercase">
                  The Complete Thesis
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">Why Bitcoin. In One Page.</h2>
            </div>

            <div className="px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'The Bull Case',
                    icon: '▲',
                    color: 'text-emerald-600 dark:text-emerald-400',
                    border: 'border-emerald-200 dark:border-emerald-800',
                    bg: 'bg-emerald-50/60 dark:bg-emerald-900/20',
                    points: [
                      'Only asset with a mathematically fixed, verifiable supply',
                      'Digital gold: superior portability, verifiability, and programmability',
                      'Institutional adoption accelerating: BlackRock, Fidelity, sovereign wealth funds',
                      'Network effects compound: hash rate, users, developer infrastructure',
                      'Hedge against fiat debasement — M2 money supply up 30x since 1971',
                      'Lindy Effect: 15 years of survival makes failure less likely each year',
                    ],
                  },
                  {
                    title: 'The Bear Case',
                    icon: '▼',
                    color: 'text-red-600 dark:text-red-400',
                    border: 'border-red-200 dark:border-red-800',
                    bg: 'bg-red-50/60 dark:bg-red-900/20',
                    points: [
                      '70-80% drawdowns are normal and psychologically brutal',
                      'Regulatory risk varies by jurisdiction; coordinated action possible',
                      'Quantum computing poses long-term cryptographic threat',
                      'Fee market sustainability post-2140 subsidy is unresolved',
                      'Concentration: ~2% of addresses control ~95% of supply',
                      'Not producing an earnings stream — pure monetary value thesis',
                    ],
                  },
                ].map(col => (
                  <div key={col.title} className={`rounded-xl border p-5 ${col.border} ${col.bg}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`font-bold ${col.color}`}>{col.icon}</span>
                      <h4 className={`text-sm font-bold ${col.color}`}>{col.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {col.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className={`${col.color} mt-1 shrink-0 text-xs`}>●</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* The one-sentence thesis */}
              <div className="rounded-xl bg-gray-900 dark:bg-black border border-amber-500/30 p-6 text-center">
                <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-3">The Thesis in One Sentence</p>
                <p className="text-white text-base leading-relaxed font-medium max-w-3xl mx-auto">
                  Bitcoin is the first monetary asset in human history with a mathematically verifiable fixed supply,
                  no issuing authority that can be pressured or captured, global instant transferability,
                  and a 15-year track record of surviving every attack thrown at it —
                  positioned as the apex store of value in a world of accelerating monetary debasement.
                </p>
              </div>

              {/* Data disclaimer */}
              <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-700 dark:text-gray-300">Data note:</strong> All market data, returns, and statistics referenced on this page are as of
                  approximately December 31, 2024. Past performance does not predict future returns.
                  This is educational content, not financial advice. Consult a qualified financial advisor
                  for investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
