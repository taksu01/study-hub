import { useEffect, useState } from 'react'

interface Props {
  prompt: string
  input: string
  resultId: number
  lastResult: 'correct' | 'wrong' | null
}

export default function QuestionCard({ prompt, input, resultId, lastResult }: Props) {
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null)
  const [sparkKey, setSparkKey] = useState(0)

  useEffect(() => {
    if (resultId === 0) return
    setFlash(lastResult)
    if (lastResult === 'correct') setSparkKey(k => k + 1)
    const t = setTimeout(() => setFlash(null), 380)
    return () => clearTimeout(t)
  }, [resultId, lastResult])

  return (
    <div
      className={`panel relative flex flex-col items-center justify-center gap-4 overflow-hidden px-6 py-8 ring-glow transition-colors ${
        flash === 'wrong' ? 'anim-shake' : ''
      } ${flash === 'correct' ? '' : ''}`}
    >
      {flash === 'correct' && <Sparkles sparkKey={sparkKey} />}

      <div
        className={`text-[10px] uppercase tracking-[0.25em] ${
          flash === 'correct' ? 'text-emerald-300' : flash === 'wrong' ? 'text-rose-300' : 'text-kawaii-200/80'
        }`}
      >
        {flash === 'correct' ? 'Correct!' : flash === 'wrong' ? 'Oops!' : 'Solve it'}
      </div>

      <div
        key={prompt}
        className="font-display text-5xl font-bold leading-none text-shadow-glow sm:text-6xl anim-pop"
      >
        {prompt}
      </div>

      <div className="relative min-h-[3.25rem] min-w-[9rem] rounded-xl border border-white/15 bg-ink-950/40 px-5 py-3 text-center text-3xl font-semibold tabular-nums shadow-inner">
        <span className={input.length === 0 ? 'opacity-30' : ''}>{input || '?'}</span>
        {input.length > 0 && (
          <span className="pointer-events-none absolute bottom-1 left-1/2 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-kawaii-400 to-transparent" />
        )}
      </div>
    </div>
  )
}

function Sparkles({ sparkKey }: { sparkKey: number }) {
  const sparks = Array.from({ length: 10 }, (_, i) => i)
  return (
    <div key={sparkKey} className="pointer-events-none absolute inset-0" aria-hidden>
      {sparks.map(i => {
        const angle = (i / sparks.length) * Math.PI * 2 + Math.random() * 0.5
        const dist = 60 + Math.random() * 50
        const dx = Math.cos(angle) * dist
        const dy = Math.sin(angle) * dist - 20
        const rot = Math.floor(Math.random() * 360)
        const color = i % 3 === 0 ? '#fde68a' : i % 3 === 1 ? '#f9a8d4' : '#c4b5fd'
        return (
          <span
            key={i}
            className="anim-sparkle absolute left-1/2 top-1/2 block h-2 w-2"
            style={
              {
                background: color,
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                // CSS variables used by the sparkle keyframes
                ['--dx' as string]: `${dx}px`,
                ['--dy' as string]: `${dy}px`,
                ['--rot' as string]: `${rot}deg`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
