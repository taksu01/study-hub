import { useState } from 'react'
import type { RecallPrompt } from '../types'

interface RecallPromptsProps {
  prompts: RecallPrompt[]
}

export default function RecallPrompts({ prompts }: RecallPromptsProps) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})

  const toggle = (i: number) => {
    setRevealed(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="my-6">
      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-indigo-500">?</span> Mini Recall
      </h4>
      <div className="space-y-3">
        {prompts.map((p, i) => (
          <div
            key={i}
            className="rounded-xl border border-indigo-100 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/20 p-4"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{p.question}</p>
            <button
              onClick={() => toggle(i)}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
            >
              {revealed[i] ? 'Hide hint' : 'Show hint'}
            </button>
            {revealed[i] && (
              <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-100/60 dark:bg-indigo-900/40 rounded-lg px-3 py-2 italic">
                💡 {p.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
