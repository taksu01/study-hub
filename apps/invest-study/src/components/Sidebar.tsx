import { useState } from 'react'
import { Home, ChevronDown, ChevronRight, Moon, Sun, Search, X, Menu, TrendingUp } from 'lucide-react'
import { MODULES } from '../data/curriculum'
import type { AppRoute, ProgressStatus } from '../types'
import { useProgress } from '../hooks/useProgress'

const COLOR_TEXT: Record<string, string> = {
  indigo: 'text-indigo-600 dark:text-indigo-400',
  sky: 'text-sky-600 dark:text-sky-400',
  amber: 'text-amber-600 dark:text-amber-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  rose: 'text-rose-600 dark:text-rose-400',
}

const COLOR_BG: Record<string, string> = {
  indigo: 'bg-indigo-100 dark:bg-indigo-900/40',
  sky: 'bg-sky-100 dark:bg-sky-900/40',
  amber: 'bg-amber-100 dark:bg-amber-900/40',
  emerald: 'bg-emerald-100 dark:bg-emerald-900/40',
  rose: 'bg-rose-100 dark:bg-rose-900/40',
}

const COLOR_BAR: Record<string, string> = {
  indigo: 'bg-indigo-500',
  sky: 'bg-sky-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
}

function StatusDot({ status }: { status: ProgressStatus }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
        status === 'completed'
          ? 'bg-emerald-500'
          : status === 'in-progress'
            ? 'bg-amber-500'
            : 'bg-slate-300 dark:bg-slate-700'
      }`}
    />
  )
}

interface SidebarProps {
  currentRoute: AppRoute
  onNavigate: (route: AppRoute) => void
  dark: boolean
  onToggleDark: () => void
}

export function Sidebar({ currentRoute, onNavigate, dark, onToggleDark }: SidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (currentRoute.type === 'lesson') return new Set([currentRoute.moduleId])
    return new Set(['m1'])
  })
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { getStatus, getModuleProgress, completedCount } = useProgress()

  const currentLesson = currentRoute.type === 'lesson' ? currentRoute : null
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0)

  const toggleModule = (moduleId: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  const go = (route: AppRoute) => {
    onNavigate(route)
    setMobileOpen(false)
    setSearch('')
  }

  const searchResults = search.trim()
    ? MODULES.flatMap(mod =>
        mod.lessons
          .filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
          .map(l => ({ module: mod, lesson: l })),
      )
    : []

  const content = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => go({ type: 'home' })} className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-sm">
            <TrendingUp size={15} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">Invest Study</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">{completedCount}/{totalLessons} lessons done</p>
          </div>
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleDark}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => go({ type: 'home' })}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Home"
          >
            <Home size={14} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-400 dark:focus:border-indigo-600 rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
              <X size={11} />
            </button>
          )}
        </div>
        {search && (
          <div className="mt-2 space-y-0.5 max-h-48 overflow-y-auto">
            {searchResults.length === 0 ? (
              <p className="text-xs text-slate-400 px-2 py-1">No results</p>
            ) : (
              searchResults.map(({ module: mod, lesson }) => (
                <button
                  key={`${mod.id}/${lesson.id}`}
                  onClick={() => go({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })}
                  className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className={`text-[10px] font-bold w-6 shrink-0 ${COLOR_TEXT[mod.color]}`}>M{mod.number}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{lesson.title}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modules */}
      <nav className="flex-1 overflow-y-auto py-2 sidebar-scroll">
        {MODULES.map(mod => {
          const isExpanded = expanded.has(mod.id)
          const progress = getModuleProgress(mod.id, mod.lessons.length)
          const isCurrentModule = currentLesson?.moduleId === mod.id
          return (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                  isCurrentModule ? 'bg-slate-50 dark:bg-slate-800/40' : ''
                }`}
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${COLOR_BG[mod.color]} ${COLOR_TEXT[mod.color]}`}>
                  {mod.number}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{mod.title}</span>
                  <span className="mt-1 flex items-center gap-1.5">
                    <span className="flex-1 h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <span
                        className={`block h-full rounded-full transition-all duration-300 ${COLOR_BAR[mod.color]}`}
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">{progress}%</span>
                  </span>
                </span>
                {isExpanded ? (
                  <ChevronDown size={12} className="text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-slate-400 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-2.5 pb-1 mr-2">
                  {mod.lessons.map(lesson => {
                    const isActive = currentLesson?.moduleId === mod.id && currentLesson?.lessonId === lesson.id
                    const status = getStatus(mod.id, lesson.id)
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => go({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-indigo-50 dark:bg-indigo-900/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <StatusDot status={status} />
                        <span
                          className={`text-xs leading-snug truncate ${
                            isActive
                              ? 'text-indigo-800 dark:text-indigo-300 font-semibold'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {lesson.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Educational content only — not financial advice.
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-40 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-lg cursor-pointer"
        aria-label="Open navigation"
      >
        <Menu size={16} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 z-10 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          aria-label="Close navigation"
        >
          <X size={16} />
        </button>
        {content}
      </div>

      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0">
        {content}
      </aside>
    </>
  )
}
