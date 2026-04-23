import { useState, useEffect } from 'react'
import {
  Layers, BookOpen, MessageSquare, Bot, Wrench,
  Monitor, Plug, Hammer, Sparkles,
  Menu, X, ChevronRight, Zap, RefreshCw
} from 'lucide-react'
import Section01 from './sections/Section01_BigPicture'
import Section02 from './sections/Section02_Vocabulary'
import Section03 from './sections/Section03_Prompting'
import Section04 from './sections/Section04_Agents'
import Section05 from './sections/Section05_Tooling'
import Section06 from './sections/Section06_LocalAI'
import Section07 from './sections/Section07_Integration'
import Section08 from './sections/Section08_Projects'
import Section09 from './sections/Section09_YourStack'

const sections = [
  { id: 'section-1', num: 1, title: 'The Big Picture', icon: Layers },
  { id: 'section-2', num: 2, title: 'Core Vocabulary', icon: BookOpen },
  { id: 'section-3', num: 3, title: 'Prompting Mastery', icon: MessageSquare },
  { id: 'section-4', num: 4, title: 'The Agent Paradigm', icon: Bot },
  { id: 'section-5', num: 5, title: 'The Tooling Ecosystem', icon: Wrench },
  { id: 'section-6', num: 6, title: 'Local AI Setup', icon: Monitor },
  { id: 'section-7', num: 7, title: 'Integration Patterns', icon: Plug },
  { id: 'section-8', num: 8, title: 'Project Blueprints', icon: Hammer },
  { id: 'section-9', num: 9, title: 'Your AI Stack', icon: Sparkles },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('section-1')

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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
              <h1 className="text-base font-bold text-slate-900 tracking-tight">AI Mastery Guide</h1>
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
                      ? 'bg-violet-50 text-violet-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-500' : 'text-slate-400'}`} />
                  <span className="truncate">{s.num}. {s.title}</span>
                </button>
              )
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed">
            A practical guide for developers who want to use, integrate, and build with AI — without needing to be an AI specialist.
          </p>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="lg:hidden sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-800 cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-700 truncate">AI Mastery Guide</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Hero */}
          <div className="mb-16">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                AI Mastery Guide
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                A practical study dashboard for developers who want to understand, configure, and build with AI — from demystifying jargon to running your own local models and building real AI-powered projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold text-slate-800">How to Use This Guide</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span>Go in order the first time — each section builds on the last</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span>Click every interactive element — flow maps, cards, and term blocks teach through interaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span>Use the green "Try This Now" boxes — open Claude in another tab and test the prompts live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span>Section 9 is your personal reference — bookmark it for quick lookups</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold text-slate-800">Quick Navigation</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Confused by terms?</strong> → Section 2 (vocabulary)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Want better AI results?</strong> → Section 3 (prompting)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Want to run AI locally?</strong> → Section 6 (Ollama setup)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Want to build something?</strong> → Section 8 (project blueprints)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                <p className="text-sm text-violet-700 leading-relaxed">
                  <strong>You don't need to build an LLM to master AI.</strong> The most powerful position for a developer is understanding the full stack conceptually, then focusing energy at the application layer — where models connect to tools, data, and real workflows. That's exactly what this guide teaches.
                </p>
              </div>
            </div>
          </div>

          <Section01 />
          <Section02 />
          <Section03 />
          <Section04 />
          <Section05 />
          <Section06 />
          <Section07 />
          <Section08 />
          <Section09 />

          <footer className="mt-16 pt-8 border-t border-slate-200 pb-12">
            <p className="text-sm text-slate-400 text-center">
              AI Mastery Guide — Interactive Study Dashboard
            </p>
            <p className="text-xs text-slate-300 text-center mt-2">
              Educational content only. AI capabilities and tools evolve rapidly — verify current model capabilities and API pricing before building.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
