import { useState, useEffect, useRef } from 'react'
import {
  LayoutDashboard, Banknote, TrendingUp, ShieldAlert, Layers,
  BarChart3, Target, Building2, Calculator, Globe,
  Briefcase, Brain, AlertOctagon, Map, Menu, X,
  ChevronRight, BookOpen, RefreshCw
} from 'lucide-react'
import Section01 from './sections/Section01_BigPicture'
import Section02 from './sections/Section02_CashFlow'
import Section03 from './sections/Section03_Compounding'
import Section04 from './sections/Section04_Risk'
import Section05 from './sections/Section05_AssetClasses'
import Section06 from './sections/Section06_Instruments'
import Section07 from './sections/Section07_PortfolioRoles'
import Section08 from './sections/Section08_CompanyAnalysis'
import Section09 from './sections/Section09_Valuation'
import Section10 from './sections/Section10_Macro'
import Section11 from './sections/Section11_PortfolioConstruction'
import Section12 from './sections/Section12_Behavioral'
import Section13 from './sections/Section13_Mistakes'
import Section14 from './sections/Section14_FinalModel'

const sections = [
  { id: 'section-1', num: 1, title: 'The Big Picture', icon: LayoutDashboard },
  { id: 'section-2', num: 2, title: 'Cash Flow & Liquidity', icon: Banknote },
  { id: 'section-3', num: 3, title: 'Compounding & Time', icon: TrendingUp },
  { id: 'section-4', num: 4, title: 'Risk & Return', icon: ShieldAlert },
  { id: 'section-5', num: 5, title: 'Asset Classes', icon: Layers },
  { id: 'section-6', num: 6, title: 'Instruments', icon: BarChart3 },
  { id: 'section-7', num: 7, title: 'Portfolio Roles', icon: Target },
  { id: 'section-8', num: 8, title: 'Company Analysis', icon: Building2 },
  { id: 'section-9', num: 9, title: 'Valuation', icon: Calculator },
  { id: 'section-10', num: 10, title: 'Macro for Investors', icon: Globe },
  { id: 'section-11', num: 11, title: 'Portfolio Construction', icon: Briefcase },
  { id: 'section-12', num: 12, title: 'Behavioral Finance', icon: Brain },
  { id: 'section-13', num: 13, title: 'Common Mistakes', icon: AlertOctagon },
  { id: 'section-14', num: 14, title: 'Final Mental Model', icon: Map },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('section-1')
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-40
        transform transition-transform duration-200 ease-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">Investor's Mental Model</h1>
              <p className="text-xs text-slate-400 mt-0.5">Interactive Study Dashboard</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto sidebar-scroll p-3">
          <div className="space-y-0.5">
            {sections.map(s => {
              const Icon = s.icon
              const isActive = activeSection === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer text-sm
                    ${isActive
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                  <span className="truncate">{s.num}. {s.title}</span>
                </button>
              )
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed">
            An interactive study tool for systems-oriented investors building a coherent mental framework.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 lg:ml-72 min-h-screen">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-800 cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-700 truncate">Investor's Mental Model</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Hero */}
          <div className="mb-16">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                Investor's Mental Model
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                An interactive study dashboard that teaches finance, investing, markets, and portfolio thinking as one connected system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-800">How to Study This App</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>Go through sections in order on your first pass — they build on each other</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>Click interactive elements — flow maps, cards, and scenarios teach through interaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>Use the Key Terms and Mini Recall blocks to test your retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>Return to Section 14 whenever things feel fragmented — it reconnects everything</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold text-slate-800">What to Revisit When Rusty</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Feeling scattered?</strong> → Section 1 (big picture) and Section 14 (system map)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Confusing terms?</strong> → Section 6 (instruments) and any section's Key Terms block</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Tempted by FOMO?</strong> → Section 12 (behavioral) and Section 13 (mistakes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Markets feel scary?</strong> → Section 4 (risk) and Section 10 (macro context)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
              <p className="text-sm text-indigo-700 leading-relaxed">
                <strong>This app teaches you to think like a rational allocator of capital.</strong> Not a trader. Not a gambler. Not someone who copies headlines. A person who understands the full system — from income to net worth — and makes decisions based on structure, evidence, and discipline.
              </p>
            </div>
          </div>

          {/* All Sections */}
          <Section01 />
          <Section02 />
          <Section03 />
          <Section04 />
          <Section05 />
          <Section06 />
          <Section07 />
          <Section08 />
          <Section09 />
          <Section10 />
          <Section11 />
          <Section12 />
          <Section13 />
          <Section14 />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 pb-12">
            <p className="text-sm text-slate-400 text-center">
              Investor's Mental Model — Interactive Study Dashboard
            </p>
            <p className="text-xs text-slate-300 text-center mt-2">
              Educational content only. Not financial advice. Always consult a qualified financial advisor for personal investment decisions.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
