import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { CopyButton } from '../CodeBlock'
import { estimateTokens } from '../../lib/tokenize'

interface Slot {
  id: keyof typeof DEFAULTS
  label: string
  why: string
  colour: string
  options: { label: string; text: string }[]
}

const DEFAULTS = {
  role: 0, context: 0, task: 0, constraints: 0, format: 0, examples: 0,
}

const SLOTS: Slot[] = [
  {
    id: 'role', label: 'Role', colour: 'bg-violet-100 border-violet-300 text-violet-900',
    why: 'Sets the vocabulary and the standards the model judges its own answer against.',
    options: [
      { label: 'none', text: '' },
      { label: 'generic', text: 'You are a helpful assistant.' },
      { label: 'specific', text: 'You are a senior backend engineer who has spent ten years on high-traffic payment systems.' },
    ],
  },
  {
    id: 'context', label: 'Context', colour: 'bg-blue-100 border-blue-300 text-blue-900',
    why: 'The situation the model cannot infer. Most bad answers are missing context, not missing intelligence.',
    options: [
      { label: 'none', text: '' },
      { label: 'brief', text: 'This is for a Node.js API.' },
      { label: 'rich', text: 'This is a Node.js/Express API serving 2,000 requests per second. We are on Postgres 15 and cannot add new infrastructure this quarter.' },
    ],
  },
  {
    id: 'task', label: 'Task', colour: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    why: 'One clear verb. Ambiguous tasks produce hedged, unusable answers.',
    options: [
      { label: 'vague', text: 'Help me with my slow endpoint.' },
      { label: 'clear', text: 'Review the endpoint below and identify the three most likely causes of its p99 latency.' },
    ],
  },
  {
    id: 'constraints', label: 'Constraints', colour: 'bg-amber-100 border-amber-300 text-amber-900',
    why: 'What is off the table. Without these you get advice you cannot act on.',
    options: [
      { label: 'none', text: '' },
      { label: 'stated', text: 'Do not suggest adding a caching layer or changing the database — neither is possible right now.' },
    ],
  },
  {
    id: 'format', label: 'Output format', colour: 'bg-teal-100 border-teal-300 text-teal-900',
    why: 'Ask for the shape you want or you will get prose you have to reformat by hand.',
    options: [
      { label: 'none', text: '' },
      { label: 'structured', text: 'Answer as a numbered list. For each cause give: the symptom I would observe, the fix, and the effort in hours.' },
    ],
  },
  {
    id: 'examples', label: 'Examples', colour: 'bg-pink-100 border-pink-300 text-pink-900',
    why: 'One worked example is worth a paragraph of instruction — this is what "few-shot" means.',
    options: [
      { label: 'none', text: '' },
      { label: 'one-shot', text: 'Example of the style I want:\n1. N+1 query — symptom: request count scales with rows returned. Fix: batch with a JOIN. Effort: 2h.' },
    ],
  },
]

export function PromptBuilder() {
  const [picks, setPicks] = useState(DEFAULTS)

  const prompt = useMemo(() => (
    SLOTS
      .map(s => s.options[picks[s.id]].text)
      .filter(Boolean)
      .join('\n\n')
  ), [picks])

  const filled = SLOTS.filter(s => s.options[picks[s.id]].text).length
  const tokens = estimateTokens(prompt)

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-violet-500" aria-hidden />Prompt builder
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Toggle each ingredient and watch the prompt assemble. Start at the weakest setting, then upgrade one slot at a time.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-slate-200">
        <div className="p-4 space-y-3">
          {SLOTS.map(slot => (
            <div key={slot.id}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-sm font-medium text-slate-700">{slot.label}</span>
                <div className="flex gap-1">
                  {slot.options.map((o, i) => (
                    <button
                      key={o.label}
                      onClick={() => setPicks(p => ({ ...p, [slot.id]: i }))}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer
                        ${picks[slot.id] === i
                          ? 'bg-violet-500 border-violet-500 text-white'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-violet-300'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{slot.why}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50/60">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Assembled prompt
            </span>
            <CopyButton value={prompt} tone="light" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 min-h-[220px] space-y-2.5">
            {SLOTS.map(slot => {
              const text = slot.options[picks[slot.id]].text
              if (!text) return null
              return (
                <div key={slot.id} className={`rounded-lg border px-2.5 py-2 ${slot.colour}`}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mb-0.5">
                    {slot.label}
                  </div>
                  <p className="text-[13px] leading-relaxed whitespace-pre-line">{text}</p>
                </div>
              )
            })}
            {!prompt && (
              <p className="text-sm text-slate-400 italic text-center py-16">
                Every slot is empty — this is the prompt most people actually send.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-3 text-xs text-slate-500">
            <span>{filled} of {SLOTS.length} ingredients</span>
            <span className="tabular-nums">~{tokens} tokens</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 mt-1.5 overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-[width] duration-200"
              style={{ width: `${(filled / SLOTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
