import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

export interface QuizQuestion {
  question: string
  options: string[]
  /** index into options */
  correct: number
  explanation: string
}

/**
 * Graded multiple-choice quiz with instant per-question feedback
 * and a score summary once every question is answered.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))

  const answeredCount = answers.filter(a => a !== null).length
  const correctCount = answers.filter((a, i) => a === questions[i].correct).length
  const done = answeredCount === questions.length

  const select = (qi: number, oi: number) => {
    if (answers[qi] !== null) return
    setAnswers(prev => prev.map((a, i) => (i === qi ? oi : a)))
  }

  const reset = () => setAnswers(questions.map(() => null))

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-4 sm:px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          ✅ Check Your Understanding
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {answeredCount}/{questions.length}
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[qi]
          return (
            <div key={qi}>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2.5">
                <span className="text-amber-600 dark:text-amber-400 mr-1.5">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isPicked = picked === oi
                  const isCorrect = oi === q.correct
                  const show = picked !== null
                  let cls = 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-900/10'
                  if (show && isCorrect) {
                    cls = 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                  } else if (show && isPicked && !isCorrect) {
                    cls = 'border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/40'
                  } else if (show) {
                    cls = 'border-gray-200 dark:border-gray-700 opacity-60'
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={picked !== null}
                      className={`w-full flex items-start gap-2.5 text-left rounded-xl border px-3.5 py-2.5 text-sm transition-all ${picked === null ? 'cursor-pointer' : 'cursor-default'} ${cls}`}
                    >
                      {show && isCorrect ? (
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                      ) : show && isPicked ? (
                        <XCircle size={16} className="shrink-0 mt-0.5 text-rose-500" />
                      ) : (
                        <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 leading-snug">{opt}</span>
                    </button>
                  )
                })}
              </div>
              {picked !== null && (
                <div
                  className={`mt-2 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
                    picked === q.correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  <strong>{picked === q.correct ? 'Correct. ' : 'Not quite. '}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}

        {done && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Score: {correctCount}/{questions.length}
              {correctCount === questions.length
                ? ' — perfect! 🎉'
                : correctCount >= questions.length / 2
                  ? ' — solid, review the misses above.'
                  : ' — worth a re-read before moving on.'}
            </p>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 cursor-pointer"
            >
              <RotateCcw size={12} />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
