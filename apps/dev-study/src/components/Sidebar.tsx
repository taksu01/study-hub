import { useState } from 'react'
import {
  Home,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  Search,
  Lock,
  X,
  Menu,
} from 'lucide-react'
import { MODULES } from '../data/curriculum'
import type { AppRoute, Module, ProgressStatus } from '../types'
import { useProgress } from '../hooks/useProgress'

const moduleColorText: Record<string, string> = {
  amber: 'text-amber-400',
  sky: 'text-sky-400',
  violet: 'text-violet-400',
  cyan: 'text-cyan-400',
  green: 'text-green-400',
  rose: 'text-rose-400',
  orange: 'text-orange-400',
  emerald: 'text-emerald-400',
  indigo: 'text-indigo-400',
}

const moduleColorBg: Record<string, string> = {
  amber: 'bg-amber-500/20',
  sky: 'bg-sky-500/20',
  violet: 'bg-violet-500/20',
  cyan: 'bg-cyan-500/20',
  green: 'bg-green-500/20',
  rose: 'bg-rose-500/20',
  orange: 'bg-orange-500/20',
  emerald: 'bg-emerald-500/20',
  indigo: 'bg-indigo-500/20',
}

function StatusDot({ status }: { status: ProgressStatus }) {
  return (
    <div
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
        status === 'completed'
          ? 'bg-emerald-400'
          : status === 'in-progress'
          ? 'bg-amber-400'
          : 'bg-slate-700'
      }`}
    />
  )
}

interface SidebarProps {
  currentRoute: AppRoute
  onNavigate: (route: AppRoute) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Sidebar({ currentRoute, onNavigate, theme, onToggleTheme }: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['m1']))
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { getStatus, getModuleProgress } = useProgress()

  const currentLesson =
    currentRoute.type === 'lesson'
      ? { moduleId: currentRoute.moduleId, lessonId: currentRoute.lessonId }
      : null

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  const searchResults = search.trim()
    ? MODULES.flatMap(mod =>
        mod.lessons
          .filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
          .map(l => ({ module: mod, lesson: l })),
      )
    : []

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-rim">
        <button
          onClick={() => { onNavigate({ type: 'home' }); setMobileOpen(false) }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <span className="text-sky-400 font-code text-xs font-bold">{'</>'}</span>
          </div>
          <span className="font-semibold text-slate-100 text-sm">DevStudy</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg hover:bg-surface2 text-slate-400 hover:text-slate-200 transition-all"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="p-1.5 rounded-lg hover:bg-surface2 text-slate-400 hover:text-slate-200 transition-all"
            title="Home"
          >
            <Home size={14} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-rim">
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className="w-full bg-surface2 border border-rim rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={11} />
            </button>
          )}
        </div>
        {search && (
          <div className="mt-2 space-y-0.5 max-h-48 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="text-xs text-slate-600 px-2 py-1">No results</div>
            ) : (
              searchResults.map(({ module: mod, lesson }) => (
                <button
                  key={`${mod.id}/${lesson.id}`}
                  onClick={() => {
                    onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })
                    setSearch('')
                    setMobileOpen(false)
                  }}
                  className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface2 transition-colors"
                >
                  <span className={`text-xs w-5 shrink-0 ${moduleColorText[mod.color]}`}>
                    M{mod.number}
                  </span>
                  <span className="text-xs text-slate-300 truncate">{lesson.title}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-2 sidebar-scroll">
        {MODULES.map(mod => {
          const isExpanded = expandedModules.has(mod.id)
          const progress = getModuleProgress(mod.id, mod.lessons.length)
          const isCurrentModule = currentLesson?.moduleId === mod.id
          const colorText = moduleColorText[mod.color] ?? 'text-sky-400'
          const colorBg = moduleColorBg[mod.color] ?? 'bg-sky-500/20'

          return (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 hover:bg-surface2 transition-colors text-left ${
                  isCurrentModule ? 'bg-surface2/50' : ''
                } ${mod.locked ? 'opacity-50' : ''}`}
              >
                {/* Module number badge */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-code shrink-0 ${colorBg} ${colorText}`}
                >
                  {mod.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-300 truncate flex items-center gap-1">
                    {mod.title}
                    {mod.locked && <Lock size={9} className="text-slate-600 shrink-0" />}
                  </div>
                  {!mod.locked && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <div className="flex-1 h-0.5 rounded-full bg-surface2 overflow-hidden">
                        <div
                          className={`h-full rounded-full progress-bar ${colorBg.replace('/20', '/60')}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">{progress}%</span>
                    </div>
                  )}
                </div>

                {mod.locked ? (
                  <Lock size={12} className="text-slate-600 shrink-0" />
                ) : isExpanded ? (
                  <ChevronDown size={12} className="text-slate-500 shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-slate-500 shrink-0" />
                )}
              </button>

              {/* Lesson list */}
              {isExpanded && !mod.locked && (
                <div className="ml-3 border-l border-rim pl-3 pb-1">
                  {mod.lessons.map(lesson => {
                    const isActive =
                      currentLesson?.moduleId === mod.id && currentLesson?.lessonId === lesson.id
                    const status = getStatus(mod.id, lesson.id)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onNavigate({ type: 'lesson', moduleId: mod.id, lessonId: lesson.id })
                          setMobileOpen(false)
                        }}
                        className={`relative w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all ${
                          isActive
                            ? 'bg-sky-500/15 lesson-active'
                            : 'hover:bg-surface2'
                        }`}
                      >
                        <StatusDot status={status} />
                        <span
                          className={`text-xs leading-snug truncate ${
                            isActive
                              ? 'text-sky-300 font-medium'
                              : 'text-slate-400 hover:text-slate-300'
                          }`}
                        >
                          {lesson.title}
                        </span>
                        {lesson.implemented && status === 'not-started' && (
                          <span className="shrink-0 ml-auto text-xs px-1 py-0.5 rounded bg-sky-950/50 text-sky-500 font-code">
                            new
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Locked preview */}
              {isExpanded && mod.locked && (
                <div className="ml-3 border-l border-rim pl-3 pb-2">
                  {mod.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 px-2 py-1.5 opacity-40"
                    >
                      <Lock size={9} className="text-slate-600 shrink-0" />
                      <span className="text-xs text-slate-600 truncate">{lesson.title}</span>
                    </div>
                  ))}
                  <div className="mt-2 px-2">
                    <div className="text-xs text-indigo-400/60 border border-indigo-500/20 rounded px-2 py-1 text-center">
                      Coming Soon
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-rim">
        <div className="text-xs text-slate-600">
          {MODULES.reduce((sum, m) => sum + m.lessons.filter(l => l.implemented).length, 0)} of{' '}
          {MODULES.reduce((sum, m) => sum + m.lessons.length, 0)} lessons available
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-surface border border-rim text-slate-400 hover:text-slate-200 shadow-lg"
      >
        <Menu size={16} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-rim transform transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-200"
        >
          <X size={16} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-surface border-r border-rim h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  )
}
