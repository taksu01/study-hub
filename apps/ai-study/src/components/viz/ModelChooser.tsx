import { useState } from 'react'
import { RotateCcw, Cpu, Cloud, Brain, Zap } from 'lucide-react'

type Answer = 'yes' | 'no'

interface Verdict {
  pick: string
  icon: typeof Cpu
  colour: string
  why: string
  examples: string
}

const VERDICTS: Record<string, Verdict> = {
  local: {
    pick: 'Run it locally',
    icon: Cpu, colour: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    why: 'The data must not leave your machine, and the task is routine enough that a small open model handles it. Zero marginal cost, full privacy.',
    examples: 'Ollama + Llama 3.1 8B or Qwen 2.5 14B',
  },
  localBig: {
    pick: 'Local, but you need real hardware',
    icon: Cpu, colour: 'border-amber-300 bg-amber-50 text-amber-900',
    why: 'Privacy rules out the cloud, but the task is hard. You need a 32B–70B model, which means 32 GB+ of memory and patience.',
    examples: 'Ollama + Qwen 2.5 32B, or redact the data and use the cloud',
  },
  cheap: {
    pick: 'Small cloud model',
    icon: Zap, colour: 'border-blue-300 bg-blue-50 text-blue-900',
    why: 'High volume, low difficulty. This is exactly what the cheap tier is for — do not pay frontier rates to classify support tickets.',
    examples: 'Claude Haiku, GPT-4o-mini, Gemini Flash',
  },
  mid: {
    pick: 'Mid-tier cloud model',
    icon: Cloud, colour: 'border-violet-300 bg-violet-50 text-violet-900',
    why: 'The workhorse. Handles coding, analysis, agent loops and long documents without frontier pricing. Start here and only escalate when it visibly fails.',
    examples: 'Claude Sonnet, GPT-4o, Gemini Pro',
  },
  reasoning: {
    pick: 'Reasoning model',
    icon: Brain, colour: 'border-purple-300 bg-purple-50 text-purple-900',
    why: 'Multi-step problems where a wrong answer is expensive — hard debugging, proofs, architecture trade-offs. Slower and pricier, so route only these here.',
    examples: 'Claude Opus with extended thinking, o-series, DeepSeek-R1',
  },
}

interface Q {
  id: string
  text: string
  hint: string
  next: (a: Answer) => string   // next question id or "verdict:<key>"
}

const QUESTIONS: Record<string, Q> = {
  privacy: {
    id: 'privacy',
    text: 'Would you be uncomfortable if this data appeared in a third party\'s logs?',
    hint: 'Personal records, client contracts, unreleased code, health or financial data.',
    next: a => (a === 'yes' ? 'hardLocal' : 'volume'),
  },
  hardLocal: {
    id: 'hardLocal',
    text: 'Does the task need genuine reasoning, or is it mostly summarise / extract / rewrite?',
    hint: 'Answer "yes" for real reasoning, "no" for routine text work.',
    next: a => (a === 'yes' ? 'verdict:localBig' : 'verdict:local'),
  },
  volume: {
    id: 'volume',
    text: 'Will you run this more than a few hundred times a day?',
    hint: 'Batch jobs, per-message classification, anything in a loop.',
    next: a => (a === 'yes' ? 'simple' : 'hard'),
  },
  simple: {
    id: 'simple',
    text: 'Is each individual call simple — classify, tag, extract, short reply?',
    hint: 'If a careful intern could do it in ten seconds, it is simple.',
    next: a => (a === 'yes' ? 'verdict:cheap' : 'verdict:mid'),
  },
  hard: {
    id: 'hard',
    text: 'Does it need multi-step reasoning where a wrong answer costs you real time or money?',
    hint: 'Debugging a subtle race condition, not writing a product description.',
    next: a => (a === 'yes' ? 'verdict:reasoning' : 'verdict:mid'),
  },
}

export function ModelChooser() {
  const [current, setCurrent] = useState('privacy')
  const [trail, setTrail] = useState<{ q: string; a: Answer }[]>([])

  const isVerdict = current.startsWith('verdict:')
  const verdict = isVerdict ? VERDICTS[current.slice(8)] : null
  const q = isVerdict ? null : QUESTIONS[current]

  function answer(a: Answer) {
    if (!q) return
    setTrail(t => [...t, { q: q.text, a }])
    setCurrent(q.next(a))
  }

  function reset() {
    setCurrent('privacy')
    setTrail([])
  }

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-800">Which model should I use?</h4>
          <p className="text-xs text-slate-500 mt-0.5">Four questions, in the order that actually matters</p>
        </div>
        {trail.length > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" aria-hidden />Start over
          </button>
        )}
      </div>

      <div className="p-4">
        {trail.length > 0 && (
          <ol className="space-y-1.5 mb-4">
            {trail.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                <span className={`px-1.5 py-0.5 rounded font-semibold shrink-0
                  ${t.a === 'yes' ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-600'}`}>
                  {t.a}
                </span>
                <span className="leading-relaxed">{t.q}</span>
              </li>
            ))}
          </ol>
        )}

        {q && (
          <div className="animate-fade-in">
            <p className="text-base font-medium text-slate-800 leading-relaxed">{q.text}</p>
            <p className="text-xs text-slate-400 mt-1.5 mb-4">{q.hint}</p>
            <div className="flex gap-2">
              <button
                onClick={() => answer('yes')}
                className="flex-1 px-4 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => answer('no')}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-violet-300 transition-colors cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        )}

        {verdict && (
          <div className={`rounded-xl border p-4 animate-fade-in ${verdict.colour}`}>
            <div className="flex items-center gap-2 mb-2">
              <verdict.icon className="w-4 h-4" aria-hidden />
              <h5 className="font-semibold text-sm">{verdict.pick}</h5>
            </div>
            <p className="text-sm leading-relaxed opacity-90">{verdict.why}</p>
            <p className="text-[13px] font-mono mt-2.5 pt-2.5 border-t border-current/15 opacity-80">
              {verdict.examples}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
