import { useEffect, useRef, useState } from 'react'
import { Check, Home, Search, X, RotateCcw } from 'lucide-react'
import { SECTIONS } from '../data/sections'

interface SidebarProps {
  open: boolean
  onClose: () => void
  activeId: string | null
  onNavigate: (id: string | null) => void
  isDone: (id: string) => boolean
  doneCount: number
  onReset: () => void
}

export function Sidebar({
  open, onClose, activeId, onNavigate, isDone, doneCount, onReset,
}: SidebarProps) {
  const [query, setQuery] = useState('')
  const panelRef = useRef<HTMLElement>(null)

  // Escape closes the mobile drawer — expected of any overlay nav.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const q = query.trim().toLowerCase()
  const shown = q
    ? SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.blurb.toLowerCase().includes(q) ||
      s.outcome.toLowerCase().includes(q) ||
      s.labs.some(l => l.toLowerCase().includes(q)))
    : SECTIONS

  const pct = Math.round((doneCount / SECTIONS.length) * 100)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        ref={panelRef}
        aria-label="Sections"
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-40
          flex flex-col transform transition-transform duration-200 ease-out lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-start justify-between gap-2">
            <button
              onClick={() => { onNavigate(null); onClose() }}
              className="text-left cursor-pointer group min-w-0"
            >
              <h1 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-violet-600 transition-colors">
                AI Mastery Guide
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">Interactive study dashboard</p>
            </button>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between items-baseline text-[11px] mb-1">
              <span className="text-slate-500">{doneCount} of {SECTIONS.length} done</span>
              <span className="text-slate-400 tabular-nums">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter sections…"
              aria-label="Filter sections"
              className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto sidebar-scroll p-3">
          <button
            onClick={() => { onNavigate(null); onClose() }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm mb-1 transition-colors cursor-pointer
              ${activeId === null
                ? 'bg-violet-50 text-violet-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Home className={`w-4 h-4 shrink-0 ${activeId === null ? 'text-violet-500' : 'text-slate-400'}`} aria-hidden />
            Overview
          </button>

          <div className="space-y-0.5">
            {shown.map(s => {
              const Icon = s.icon
              const active = activeId === s.id
              const done = isDone(s.id)
              return (
                <button
                  key={s.id}
                  onClick={() => { onNavigate(s.id); onClose() }}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer text-sm
                    ${active
                      ? 'bg-violet-50 text-violet-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
                >
                  {done ? (
                    <span className="w-4 h-4 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" aria-hidden />
                    </span>
                  ) : (
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-violet-500' : 'text-slate-400'}`} aria-hidden />
                  )}
                  <span className="truncate">{s.num}. {s.title}</span>
                </button>
              )
            })}
            {!shown.length && (
              <p className="px-3 py-6 text-xs text-slate-400 text-center">
                Nothing matches "{query}"
              </p>
            )}
          </div>
        </nav>

        <div className="p-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <p className="text-[11px] text-slate-400 leading-snug">
            Progress is saved in this browser.
          </p>
          {doneCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" aria-hidden />Reset
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
