import { useState } from 'react'
import { ArrowRight, ThumbsDown, ThumbsUp } from 'lucide-react'

export interface PromptPair {
  id: string
  situation: string
  weak: string
  weakResult: string
  strong: string
  strongResult: string
  lesson: string
}

/**
 * Side-by-side weak/strong prompts. Showing the *output difference* is what
 * makes prompting technique land — a rule on its own reads as arbitrary.
 */
export function PromptCompare({ pairs }: { pairs: PromptPair[] }) {
  const [idx, setIdx] = useState(0)
  const [side, setSide] = useState<'weak' | 'strong'>('weak')
  const p = pairs[idx]

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">Before / after</h4>
        <p className="text-xs text-slate-500 mt-0.5">Same goal, two prompts. Compare what comes back.</p>
      </div>

      {pairs.length > 1 && (
        <div className="flex gap-1.5 px-4 pt-3 flex-wrap">
          {pairs.map((pair, i) => (
            <button
              key={pair.id}
              onClick={() => setIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                ${idx === i
                  ? 'bg-violet-500 border-violet-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'}`}
            >
              {pair.id}
            </button>
          ))}
        </div>
      )}

      <div className="p-4">
        <p className="text-sm text-slate-600 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-2">Goal</span>
          {p.situation}
        </p>

        {/* Mobile: toggle between sides. Desktop: both at once. */}
        <div className="flex gap-1.5 mb-3 md:hidden">
          {(['weak', 'strong'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                ${side === s
                  ? s === 'weak' ? 'bg-rose-500 border-rose-500 text-white' : 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600'}`}
            >
              {s === 'weak' ? 'Weak prompt' : 'Strong prompt'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Panel
            kind="weak"
            visible={side === 'weak'}
            prompt={p.weak}
            result={p.weakResult}
          />
          <Panel
            kind="strong"
            visible={side === 'strong'}
            prompt={p.strong}
            result={p.strongResult}
          />
        </div>

        <p className="mt-3 pl-3 border-l-[3px] border-violet-400 text-sm text-slate-700 leading-relaxed">
          <ArrowRight className="w-3.5 h-3.5 inline mr-1 text-violet-500 align-[-2px]" aria-hidden />
          {p.lesson}
        </p>
      </div>
    </div>
  )
}

function Panel({
  kind, visible, prompt, result,
}: {
  kind: 'weak' | 'strong'; visible: boolean; prompt: string; result: string
}) {
  const weak = kind === 'weak'
  return (
    <div className={`${visible ? '' : 'hidden'} md:block rounded-xl border overflow-hidden
      ${weak ? 'border-rose-200' : 'border-emerald-200'}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2 border-b text-xs font-semibold
        ${weak
          ? 'bg-rose-50 border-rose-200 text-rose-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
        {weak
          ? <><ThumbsDown className="w-3.5 h-3.5" aria-hidden />Weak prompt</>
          : <><ThumbsUp className="w-3.5 h-3.5" aria-hidden />Strong prompt</>}
      </div>
      <pre className={`px-3 py-2.5 text-[13px] font-mono whitespace-pre-wrap leading-relaxed
        ${weak ? 'text-rose-900 bg-rose-50/40' : 'text-emerald-900 bg-emerald-50/40'}`}>
        {prompt}
      </pre>
      <div className="px-3 py-2.5 border-t border-slate-100 bg-white">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          What comes back
        </span>
        <p className="text-[13px] text-slate-600 mt-1 leading-relaxed whitespace-pre-line">{result}</p>
      </div>
    </div>
  )
}
