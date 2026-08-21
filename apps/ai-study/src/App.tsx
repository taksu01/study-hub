import { useCallback, useEffect, useState, type ComponentType } from 'react'
import { ArrowLeft, ArrowRight, Check, Menu } from 'lucide-react'
import { SECTIONS } from './data/sections'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './components/HomePage'

import Section01 from './sections/Section01_BigPicture'
import Section02 from './sections/Section02_Vocabulary'
import Section03 from './sections/Section03_Prompting'
import Section04 from './sections/Section04_Agents'
import Section05 from './sections/Section05_Tooling'
import Section06 from './sections/Section06_LocalAI'
import Section07 from './sections/Section07_Integration'
import Section08 from './sections/Section08_Projects'
import Section09 from './sections/Section09_YourStack'

const VIEWS: Record<string, ComponentType> = {
  'section-1': Section01,
  'section-2': Section02,
  'section-3': Section03,
  'section-4': Section04,
  'section-5': Section05,
  'section-6': Section06,
  'section-7': Section07,
  'section-8': Section08,
  'section-9': Section09,
}

/** `#/section-3` → `section-3`; anything unknown → home. */
function parseHash(): string | null {
  const raw = window.location.hash.replace(/^#\/?/, '')
  return raw && VIEWS[raw] ? raw : null
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(parseHash)
  const { isDone, toggle, reset, doneCount } = useProgress()

  useEffect(() => {
    const onHash = () => setActiveId(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((id: string | null) => {
    window.location.hash = id ? `#/${id}` : '#/'
    setActiveId(id)
    // Rendering one section at a time only helps if you land at its top.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const idx = activeId ? SECTIONS.findIndex(s => s.id === activeId) : -1
  const meta = idx >= 0 ? SECTIONS[idx] : null
  const prev = idx > 0 ? SECTIONS[idx - 1] : null
  const nextSection = idx >= 0 && idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null
  const View = activeId ? VIEWS[activeId] : null

  return (
    <div className="min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeId={activeId}
        onNavigate={navigate}
        isDone={isDone}
        doneCount={doneCount}
        onReset={reset}
      />

      <main className="lg:ml-72 min-h-screen">
        <div className="lg:hidden sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-800 cursor-pointer"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-700 truncate">
            {meta ? `${meta.num}. ${meta.title}` : 'AI Mastery Guide'}
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {View && meta ? (
            <div key={activeId}>
              <button
                onClick={() => navigate(null)}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-600 mb-6 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden />All sections
              </button>

              <View />

              {/* Completion + next */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <button
                  onClick={() => toggle(meta.id)}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer
                    ${isDone(meta.id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'}`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
                    ${isDone(meta.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                    {isDone(meta.id) && <Check className="w-2.5 h-2.5 text-white" aria-hidden />}
                  </span>
                  {isDone(meta.id) ? 'Marked as done' : 'Mark section as done'}
                </button>

                <nav className="flex flex-col sm:flex-row gap-2 mt-4">
                  {prev && (
                    <button
                      onClick={() => navigate(prev.id)}
                      className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-left hover:border-violet-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-[11px] text-slate-400">Previous</span>
                        <span className="block text-sm font-medium text-slate-700 truncate">
                          {prev.num}. {prev.title}
                        </span>
                      </span>
                    </button>
                  )}
                  {nextSection && (
                    <button
                      onClick={() => navigate(nextSection.id)}
                      className="flex-1 flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-violet-200 bg-violet-50 text-left hover:border-violet-400 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <span className="min-w-0">
                        <span className="block text-[11px] text-violet-500">Next up</span>
                        <span className="block text-sm font-medium text-violet-800 truncate">
                          {nextSection.num}. {nextSection.title}
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-violet-500 shrink-0" aria-hidden />
                    </button>
                  )}
                </nav>
              </div>
            </div>
          ) : (
            <HomePage onNavigate={navigate} isDone={isDone} doneCount={doneCount} />
          )}

          <footer className="mt-16 pt-8 border-t border-slate-200 pb-12">
            <p className="text-sm text-slate-400 text-center">
              AI Mastery Guide — Interactive Study Dashboard
            </p>
            <p className="text-xs text-slate-300 text-center mt-2 max-w-lg mx-auto leading-relaxed">
              Educational content only. Model capabilities and API pricing move fast — verify both
              against the provider's own docs before you build on them.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
