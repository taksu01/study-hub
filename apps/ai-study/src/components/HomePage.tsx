import { ArrowRight, Check, Clock, Zap, Compass } from 'lucide-react'
import { SECTIONS, TOTAL_MINUTES } from '../data/sections'

interface HomePageProps {
  onNavigate: (id: string) => void
  isDone: (id: string) => boolean
  doneCount: number
}

const SHORTCUTS = [
  { q: 'The jargon is losing me', to: 'section-2', label: 'Core Vocabulary' },
  { q: 'The AI keeps giving me mush', to: 'section-3', label: 'Prompting Mastery' },
  { q: 'I want to run this offline', to: 'section-6', label: 'Local AI Setup' },
  { q: 'I want to build something today', to: 'section-8', label: 'Project Blueprints' },
]

export function HomePage({ onNavigate, isDone, doneCount }: HomePageProps) {
  const next = SECTIONS.find(s => !isDone(s.id)) ?? SECTIONS[0]
  const remaining = SECTIONS.filter(s => !isDone(s.id)).reduce((a, s) => a + s.minutes, 0)

  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          AI Mastery Guide
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Nine sections that take you from "what even is a token" to running local models
          and shipping AI features — built around things you poke at, not paragraphs you skim.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            onClick={() => onNavigate(next.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors cursor-pointer"
          >
            {doneCount === 0 ? 'Start section 1' : `Continue — ${next.num}. ${next.title}`}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </button>
          <span className="flex items-center gap-1.5 text-sm text-slate-400">
            <Clock className="w-3.5 h-3.5" aria-hidden />
            {doneCount === 0
              ? `~${TOTAL_MINUTES} min total`
              : `~${remaining} min left of ${TOTAL_MINUTES}`}
          </span>
        </div>
      </header>

      {/* Jump-to shortcuts — most people arrive with a specific problem. */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
          <Compass className="w-4 h-4 text-violet-500" aria-hidden />
          Arrived with a specific problem?
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {SHORTCUTS.map(s => (
            <button
              key={s.to}
              onClick={() => onNavigate(s.to)}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-left hover:border-violet-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="text-sm text-slate-600">"{s.q}"</span>
              <span className="flex items-center gap-1 text-xs font-medium text-violet-600 shrink-0">
                {s.label}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">All sections</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map(s => {
            const Icon = s.icon
            const done = isDone(s.id)
            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`text-left p-4 rounded-xl border bg-white transition-all cursor-pointer hover:shadow-md group
                  ${done ? 'border-emerald-200' : 'border-slate-200 hover:border-violet-300'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                      ${done ? 'bg-emerald-100' : 'bg-violet-50'}`}>
                      {done
                        ? <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
                        : <Icon className="w-3.5 h-3.5 text-violet-500" aria-hidden />}
                    </span>
                    <h3 className="font-semibold text-slate-800 text-sm truncate">
                      {s.num}. {s.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 tabular-nums">{s.minutes}m</span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">{s.blurb}</p>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  <span className="font-medium text-slate-500">After this you can:</span> {s.outcome}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.labs.map(l => (
                    <span key={l} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-medium">
                      <Zap className="w-2.5 h-2.5" aria-hidden />{l}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <div className="mt-10 p-4 rounded-xl bg-violet-50 border border-violet-100">
        <p className="text-sm text-violet-800 leading-relaxed">
          <strong>You do not need to build an LLM to master AI.</strong> The leverage is at the
          application layer — where models meet tools, data and real workflows. Every section here
          points at that layer.
        </p>
      </div>
    </div>
  )
}
