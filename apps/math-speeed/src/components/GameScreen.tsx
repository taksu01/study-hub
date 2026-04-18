import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState } from '../hooks/useGame'
import HUD from './HUD'
import Keypad from './Keypad'
import Mascot from './Mascot'
import QuestionCard from './QuestionCard'
import SpeechBubble from './SpeechBubble'
import { moodForEvent, pickMascotLine } from '../lib/mascotLines'
import type { MascotMood } from '../types'

interface Props {
  state: GameState
  onAnswer: (value: number) => void
  onSkip: () => void
  onQuit: () => void
  calmMode: boolean
}

export default function GameScreen({ state, onAnswer, onSkip, onQuit, calmMode }: Props) {
  const [input, setInput] = useState('')
  const [showKeypad, setShowKeypad] = useState<boolean>(() => isTouchDevice())
  const [mood, setMood] = useState<MascotMood>('happy')
  const [line, setLine] = useState<string>(() => pickMascotLine('start'))
  const lastResultIdRef = useRef(0)
  const lastStreakEventRef = useRef(0)
  const timeWarnedRef = useRef(false)

  const submit = useCallback(() => {
    if (input.length === 0) return
    const value = Number(input)
    if (Number.isNaN(value)) {
      setInput('')
      return
    }
    onAnswer(value)
    setInput('')
  }, [input, onAnswer])

  const skip = useCallback(() => {
    setInput('')
    onSkip()
  }, [onSkip])

  const negate = useCallback(() => {
    setInput(cur => {
      if (cur.length === 0) return '-'
      if (cur.startsWith('-')) return cur.slice(1)
      return `-${cur}`
    })
  }, [])

  const backspace = useCallback(() => setInput(cur => cur.slice(0, -1)), [])
  const pushDigit = useCallback((d: string) => {
    setInput(cur => {
      if (cur === '0') return d === '0' ? '0' : d
      return (cur + d).slice(0, 10)
    })
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (state.phase !== 'running') return
      if (e.key === 'Enter') {
        e.preventDefault()
        submit()
        return
      }
      if (e.key === 'Backspace') {
        e.preventDefault()
        backspace()
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        skip()
        return
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        negate()
        return
      }
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault()
        pushDigit(e.key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state.phase, submit, backspace, skip, negate, pushDigit])

  useEffect(() => {
    if (state.lastResultId === lastResultIdRef.current) return
    lastResultIdRef.current = state.lastResultId
    if (state.lastResult === 'correct') {
      if (state.streak >= 10 && state.streak !== lastStreakEventRef.current) {
        lastStreakEventRef.current = state.streak
        setMood(moodForEvent('bigStreak'))
        setLine(pickMascotLine('bigStreak'))
        return
      }
      if (state.streak >= 5 && state.streak % 5 === 0 && state.streak !== lastStreakEventRef.current) {
        lastStreakEventRef.current = state.streak
        setMood(moodForEvent('streak'))
        setLine(pickMascotLine('streak'))
        return
      }
      setMood(moodForEvent('correct'))
      setLine(pickMascotLine('correct'))
    } else if (state.lastResult === 'wrong') {
      setMood(moodForEvent('wrong'))
      setLine(pickMascotLine('wrong'))
    }
  }, [state.lastResultId, state.lastResult, state.streak])

  useEffect(() => {
    if (state.config.mode !== 'timed') return
    if (timeWarnedRef.current) return
    if (state.timeLeftMs > 0 && state.timeLeftMs <= 10_000) {
      timeWarnedRef.current = true
      setMood(moodForEvent('timeLow'))
      setLine(pickMascotLine('timeLow'))
    }
  }, [state.timeLeftMs, state.config.mode])

  const q = state.current
  if (!q) return null

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col gap-3 px-4 py-4">
      <header className="flex items-center justify-between">
        <button type="button" onClick={onQuit} className="btn-ghost px-3 py-2 text-xs">
          ← Quit
        </button>
        <div className="text-[11px] uppercase tracking-[0.25em] opacity-70">
          {state.config.mode} · {state.config.difficulty}
        </div>
        <button
          type="button"
          onClick={() => setShowKeypad(v => !v)}
          className="btn-ghost px-3 py-2 text-xs"
          title="Toggle on-screen keypad"
        >
          {showKeypad ? 'Hide keypad' : 'Keypad'}
        </button>
      </header>

      <HUD
        mode={state.config.mode}
        score={state.score}
        streak={state.streak}
        longestStreak={state.longestStreak}
        timeLeftMs={state.timeLeftMs}
        total={state.history.length}
      />

      <div className="relative flex items-end justify-center gap-2 pt-1 sm:gap-4">
        <div className={`h-24 w-24 sm:h-28 sm:w-28 ${mood === 'hype' ? 'anim-bounce' : 'anim-float'}`}>
          <Mascot mood={mood} className="h-full w-full" />
        </div>
        {!calmMode && (
          <div className="mb-2 max-w-[60%]">
            <SpeechBubble text={line} />
          </div>
        )}
      </div>

      <QuestionCard
        prompt={q.prompt}
        input={input}
        resultId={state.lastResultId}
        lastResult={state.lastResult}
      />

      {showKeypad ? (
        <div className="safe-pad-b mt-auto">
          <Keypad
            onDigit={pushDigit}
            onBackspace={backspace}
            onNegate={negate}
            onSubmit={submit}
            onSkip={skip}
            disabled={state.phase !== 'running'}
          />
        </div>
      ) : (
        <div className="safe-pad-b mt-auto grid grid-cols-[1fr_auto_auto] gap-2">
          <button type="button" onClick={submit} className="btn-primary h-12">
            Enter
          </button>
          <button type="button" onClick={backspace} className="btn-ghost h-12 px-4" aria-label="Backspace">
            ⌫
          </button>
          <button type="button" onClick={skip} className="btn-ghost h-12 px-4">
            Skip
          </button>
        </div>
      )}

      <p className="text-center text-[11px] opacity-50">
        Type digits · Enter to submit · Esc to skip · Backspace to delete
      </p>
    </div>
  )
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}
