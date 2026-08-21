import { useState } from 'react'
import { FileText, Scissors, Binary, Database, Search, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react'

interface Stage {
  id: string
  label: string
  icon: typeof FileText
  when: 'ingest' | 'query'
  what: string
  gotcha: string
  demo: React.ReactNode
}

const chunk = (t: string, c: string) => (
  <span className={`inline-block px-1.5 py-0.5 rounded border text-[13px] font-mono mr-1 mb-1 ${c}`}>{t}</span>
)

const STAGES: Stage[] = [
  {
    id: 'load', label: 'Load', icon: FileText, when: 'ingest',
    what: 'Pull the raw text out of your sources — PDFs, Markdown, Notion pages, a database dump.',
    gotcha: 'PDF extraction is where most RAG projects quietly break. Tables and multi-column layouts come out scrambled.',
    demo: (
      <div className="text-[13px] font-mono text-slate-600 bg-white rounded-lg border border-slate-200 p-2.5 leading-relaxed">
        handbook.pdf → "Employees accrue 1.5 days of leave per month. Unused leave carries over up to 10 days. Requests need 2 weeks notice."
      </div>
    ),
  },
  {
    id: 'chunk', label: 'Chunk', icon: Scissors, when: 'ingest',
    what: 'Split the text into passages small enough to embed but large enough to still make sense alone. 300–800 tokens with a little overlap is the usual starting point.',
    gotcha: 'Chunk too small and a sentence loses its subject. Too big and the embedding averages several topics into mush.',
    demo: (
      <div className="bg-white rounded-lg border border-slate-200 p-2.5">
        {chunk('Employees accrue 1.5 days of leave per month.', 'bg-teal-50 border-teal-200 text-teal-800')}
        {chunk('Unused leave carries over up to 10 days.', 'bg-blue-50 border-blue-200 text-blue-800')}
        {chunk('Requests need 2 weeks notice.', 'bg-violet-50 border-violet-200 text-violet-800')}
      </div>
    ),
  },
  {
    id: 'embed', label: 'Embed', icon: Binary, when: 'ingest',
    what: 'Turn each chunk into a vector — a list of numbers where similar meanings land near each other in space.',
    gotcha: 'You must use the same embedding model at query time. Mixing models produces vectors that are not comparable, and search silently returns nonsense.',
    demo: (
      <div className="text-[13px] font-mono text-slate-600 bg-white rounded-lg border border-slate-200 p-2.5 space-y-1">
        <div>"…1.5 days per month" → <span className="text-violet-600">[0.021, −0.443, 0.187, … ]</span></div>
        <div className="text-slate-400 text-xs">1,536 numbers per chunk</div>
      </div>
    ),
  },
  {
    id: 'store', label: 'Store', icon: Database, when: 'ingest',
    what: 'Save the vectors plus their original text in a vector database — Chroma, Qdrant, pgvector, or just a file for small sets.',
    gotcha: 'Store the source text alongside the vector. A vector alone cannot be turned back into words.',
    demo: (
      <div className="text-[13px] font-mono text-slate-600 bg-white rounded-lg border border-slate-200 p-2.5">
        chroma.add(ids, embeddings, documents, metadata)
        <div className="text-slate-400 text-xs mt-1">3 chunks indexed · handbook.pdf</div>
      </div>
    ),
  },
  {
    id: 'retrieve', label: 'Retrieve', icon: Search, when: 'query',
    what: 'Embed the user question with the same model, then find the nearest chunks by vector distance. Usually the top 3–5.',
    gotcha: 'Nearest is not the same as relevant. If the answer is not in your top-k, the model will confidently make one up.',
    demo: (
      <div className="bg-white rounded-lg border border-slate-200 p-2.5 space-y-1.5">
        <div className="text-[13px] font-mono text-slate-600">"how much leave do I get?" → search</div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 font-mono">chunk 1</span>
          <span className="text-slate-400 text-xs tabular-nums">similarity 0.89</span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-mono">chunk 2</span>
          <span className="text-slate-400 text-xs tabular-nums">similarity 0.71</span>
        </div>
      </div>
    ),
  },
  {
    id: 'generate', label: 'Generate', icon: MessageSquare, when: 'query',
    what: 'Paste the retrieved chunks into the prompt above the question, and tell the model to answer only from them.',
    gotcha: 'Without an explicit "say you do not know if it is not in the context" instruction, the model falls back on training data and hallucinates.',
    demo: (
      <div className="text-[13px] bg-white rounded-lg border border-slate-200 p-2.5 space-y-1.5 font-mono">
        <div className="text-slate-400">Context:</div>
        <div className="text-slate-600 pl-2">1.5 days/month · carries over up to 10 days</div>
        <div className="text-slate-400 mt-1">Question: how much leave do I get?</div>
        <div className="text-emerald-700 mt-1">→ "18 days a year, and up to 10 unused days roll over."</div>
      </div>
    ),
  },
]

export function RagPipelineLab() {
  const [idx, setIdx] = useState(0)
  const stage = STAGES[idx]
  const Icon = stage.icon

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">RAG pipeline, stage by stage</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Blue stages run once when you index. Violet stages run on every question.
        </p>
      </div>

      <div className="p-4">
        {/* Stage rail — horizontally scrollable on mobile rather than wrapping */}
        <div className="overflow-x-auto -mx-1 px-1 pb-2 mb-4">
          <div className="flex items-center gap-1.5 min-w-max">
            {STAGES.map((s, i) => {
              const SIcon = s.icon
              const on = i === idx
              const ingest = s.when === 'ingest'
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIdx(i)}
                    aria-pressed={on}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap
                      ${on
                        ? ingest
                          ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                          : 'bg-violet-500 border-violet-500 text-white shadow-sm'
                        : ingest
                          ? 'bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300'
                          : 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-300'}`}
                  >
                    <SIcon className="w-3.5 h-3.5" aria-hidden />{s.label}
                  </button>
                  {i < STAGES.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" aria-hidden />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 ${stage.when === 'ingest' ? 'text-blue-500' : 'text-violet-500'}`} aria-hidden />
            <h5 className="text-sm font-semibold text-slate-800">
              {idx + 1}. {stage.label}
            </h5>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded
              ${stage.when === 'ingest' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
              {stage.when === 'ingest' ? 'index time' : 'query time'}
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-3">{stage.what}</p>
          {stage.demo}
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3 leading-relaxed">
            <strong className="font-semibold">Where it goes wrong:</strong> {stage.gotcha}
          </p>
        </div>

        <div className="flex justify-between gap-2 mt-3">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden />Previous
          </button>
          <button
            onClick={() => setIdx(i => Math.min(STAGES.length - 1, i + 1))}
            disabled={idx === STAGES.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Next<ChevronRight className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
