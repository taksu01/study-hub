import { useState } from 'react'
import { MapPin } from 'lucide-react'

interface Layer {
  id: string
  label: string
  who: string
  cost: string
  detail: string
  yours: boolean
}

const LAYERS: Layer[] = [
  {
    id: 'app', label: 'Your app / agent', who: 'You',
    cost: 'Your time',
    detail: 'A prompt template, a control loop, a set of tools, a UI. This is where a model becomes a product — and it is the only layer where your judgement is the scarce input.',
    yours: true,
  },
  {
    id: 'api', label: 'API', who: 'Anthropic, OpenAI, Google — or your own Ollama',
    cost: '$0.25–$75 per million tokens',
    detail: 'An HTTP endpoint wrapping the model. You POST a prompt, you get tokens back. Everything below this line is somebody else\'s operational problem.',
    yours: false,
  },
  {
    id: 'model', label: 'Model', who: 'Frontier labs',
    cost: 'Already paid for',
    detail: 'A file of billions of floating-point weights. Llama 3.1 70B is ~140 GB of numbers. Inert on its own — it needs a runtime to do anything.',
    yours: false,
  },
  {
    id: 'training', label: 'Training', who: 'Frontier labs',
    cost: '$100M+ in compute',
    detail: 'Feeding data through a network and nudging billions of weights until predictions improve. Months of thousands of GPUs.',
    yours: false,
  },
  {
    id: 'data', label: 'Data', who: 'Frontier labs',
    cost: 'Multi-year infrastructure',
    detail: 'Billions of web pages, books, code and conversations, scraped and cleaned. What the model read before you ever typed at it.',
    yours: false,
  },
]

export function StackDiagram() {
  const [open, setOpen] = useState<string>('app')
  const active = LAYERS.find(l => l.id === open)

  return (
    <div className="mb-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            The AI stack, top down
          </span>
          <span className="text-[11px] text-slate-400">Tap a layer</span>
        </div>

        <div className="space-y-1.5">
          {LAYERS.map(layer => {
            const isOpen = open === layer.id
            return (
              <button
                key={layer.id}
                onClick={() => setOpen(layer.id)}
                aria-pressed={isOpen}
                className={`w-full text-left rounded-xl border px-3.5 py-3 transition-all cursor-pointer
                  ${layer.yours
                    ? 'bg-violet-50 border-violet-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'}
                  ${isOpen ? 'ring-2 ring-offset-1 ring-violet-300 shadow-sm' : ''}`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`text-sm font-semibold flex items-center gap-1.5
                    ${layer.yours ? 'text-violet-800' : 'text-slate-700'}`}>
                    {layer.yours && <MapPin className="w-3.5 h-3.5 text-violet-500" aria-hidden />}
                    {layer.label}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap
                    ${layer.yours ? 'bg-violet-200 text-violet-800' : 'bg-slate-200 text-slate-600'}`}>
                    {layer.yours ? 'You build here' : layer.cost}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{layer.who}</p>
              </button>
            )
          })}
        </div>

        {/* The line that matters: everything under it is bought, not built. */}
        <div className="relative my-4" aria-hidden>
          <div className="border-t-2 border-dashed border-violet-300" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 px-2 bg-white text-[10px] font-semibold uppercase tracking-wider text-violet-500">
            Everything below is rented, not built
          </span>
        </div>

        {active && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 animate-fade-in">
            <h4 className="text-sm font-semibold text-slate-800">{active.label}</h4>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{active.detail}</p>
          </div>
        )}
      </div>
    </div>
  )
}
