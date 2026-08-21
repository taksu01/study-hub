import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { tokenize, type Tok } from '../../lib/tokenize'

const PRESETS = [
  { label: 'Plain English', text: 'The cat sat on the mat.' },
  { label: 'Rare words', text: 'Antidisestablishmentarianism is unbelievably long.' },
  { label: 'Code', text: 'const userIds = items.map(i => i.userId);' },
  { label: 'Numbers', text: 'Invoice 20250821 total $1,499.99 due in 30 days.' },
  { label: 'Emoji + unicode', text: 'Ship it 🚀 — naïve café façade' },
]

const KIND_STYLE: Record<Tok['kind'], string> = {
  word: 'bg-violet-100 text-violet-800 border-violet-200',
  subword: 'bg-amber-100 text-amber-800 border-amber-300',
  punct: 'bg-slate-200 text-slate-600 border-slate-300',
  number: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  space: 'bg-slate-100 text-slate-400 border-slate-200',
  newline: 'bg-slate-200 text-slate-500 border-slate-300',
}

export function TokenizerLab() {
  const [text, setText] = useState(PRESETS[0].text)

  const toks = useMemo(() => tokenize(text), [text])
  const subwordCount = toks.filter(t => t.kind === 'subword').length
  const ratio = toks.length ? (text.length / toks.length).toFixed(2) : '0'

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Tokenizer lab</h4>
          <p className="text-xs text-slate-500 mt-0.5">Type anything — watch it become the units the model actually sees</p>
        </div>
        <button
          onClick={() => setText(PRESETS[0].text)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" aria-hidden />Reset
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => setText(p.text)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                ${text === p.text
                  ? 'bg-violet-500 border-violet-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="sr-only">Text to tokenize</span>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={3}
            spellCheck={false}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-mono text-slate-700 resize-y focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
            placeholder="Type here…"
          />
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          <Stat label="Characters" value={text.length} />
          <Stat label="Tokens" value={toks.length} accent />
          <Stat label="Chars / token" value={ratio} />
          <Stat label="Split words" value={subwordCount} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 min-h-[64px]">
          <div className="flex flex-wrap gap-1">
            {toks.map((t, i) => (
              <span
                key={i}
                title={`${t.kind} · ${t.text.length} chars`}
                className={`px-1.5 py-1 rounded-md border text-[13px] font-mono whitespace-pre ${KIND_STYLE[t.kind]}`}
              >
                {t.text === ' ' ? '␣' : t.text}
              </span>
            ))}
            {!toks.length && <span className="text-sm text-slate-400 italic">Nothing to tokenize yet</span>}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-slate-500">
          <Legend className="bg-violet-100 border-violet-200" label="whole word" />
          <Legend className="bg-amber-100 border-amber-300" label="word split into pieces — costs more" />
          <Legend className="bg-emerald-100 border-emerald-200" label="number" />
          <Legend className="bg-slate-200 border-slate-300" label="punctuation" />
        </div>

        <p className="mt-4 text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
          Approximation for teaching. Real tokenizers use a learned merge table, so exact counts differ
          — but the pattern holds: common words are one token, rare words fragment, and code fragments hardest.
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${accent ? 'bg-violet-50 border-violet-200' : 'bg-white border-slate-200'}`}>
      <div className={`text-lg font-bold tabular-nums ${accent ? 'text-violet-700' : 'text-slate-800'}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded border ${className}`} aria-hidden />
      {label}
    </span>
  )
}
