import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import type { GameConfig, OpKind, QuestionRecord, SessionSummary } from '../types'
import { ALL_OPS, TIMED_SECONDS } from '../types'
import { generateQuestion } from '../lib/questionGenerator'

export type GamePhase = 'idle' | 'running' | 'ended'

export interface GameState {
  phase: GamePhase
  config: GameConfig
  score: number
  streak: number
  longestStreak: number
  timeLeftMs: number
  current: { op: OpKind; prompt: string; answer: number } | null
  currentId: number
  currentStart: number
  history: QuestionRecord[]
  lastResult: 'correct' | 'wrong' | null
  lastResultId: number
}

type Action =
  | { type: 'START'; config: GameConfig; now: number }
  | { type: 'ANSWER'; value: number; now: number }
  | { type: 'SKIP'; now: number }
  | { type: 'TICK'; deltaMs: number; now: number }
  | { type: 'END' }
  | { type: 'RESET' }

function initialTime(mode: GameConfig['mode']): number {
  return mode === 'timed' ? TIMED_SECONDS * 1000 : Infinity
}

function makeInitial(config: GameConfig): GameState {
  return {
    phase: 'idle',
    config,
    score: 0,
    streak: 0,
    longestStreak: 0,
    timeLeftMs: initialTime(config.mode),
    current: null,
    currentId: 0,
    currentStart: 0,
    history: [],
    lastResult: null,
    lastResultId: 0,
  }
}

function nextQuestion(config: GameConfig, now: number, id: number): Pick<GameState, 'current' | 'currentId' | 'currentStart'> {
  const q = generateQuestion(config.ops, config.difficulty)
  return { current: q, currentId: id, currentStart: now }
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START': {
      const base = makeInitial(action.config)
      return {
        ...base,
        phase: 'running',
        ...nextQuestion(action.config, action.now, 1),
      }
    }
    case 'ANSWER': {
      if (state.phase !== 'running' || !state.current) return state
      const correct = action.value === state.current.answer
      const timeMs = action.now - state.currentStart
      const record: QuestionRecord = {
        id: state.currentId,
        op: state.current.op,
        prompt: state.current.prompt,
        answer: state.current.answer,
        userAnswer: action.value,
        correct,
        timeMs,
      }
      const streak = correct ? state.streak + 1 : 0
      const longestStreak = Math.max(state.longestStreak, streak)
      const score = correct ? state.score + 1 : state.score
      const shouldEnd = state.config.mode === 'streak' && !correct
      const after = {
        ...state,
        score,
        streak,
        longestStreak,
        history: [...state.history, record],
        lastResult: (correct ? 'correct' : 'wrong') as 'correct' | 'wrong',
        lastResultId: state.lastResultId + 1,
      }
      if (shouldEnd) {
        return { ...after, phase: 'ended', current: null }
      }
      return {
        ...after,
        ...nextQuestion(state.config, action.now, state.currentId + 1),
      }
    }
    case 'SKIP': {
      if (state.phase !== 'running' || !state.current) return state
      const record: QuestionRecord = {
        id: state.currentId,
        op: state.current.op,
        prompt: state.current.prompt,
        answer: state.current.answer,
        userAnswer: null,
        correct: false,
        timeMs: action.now - state.currentStart,
      }
      return {
        ...state,
        streak: 0,
        history: [...state.history, record],
        lastResult: 'wrong',
        lastResultId: state.lastResultId + 1,
        ...nextQuestion(state.config, action.now, state.currentId + 1),
      }
    }
    case 'TICK': {
      if (state.phase !== 'running' || state.config.mode !== 'timed') return state
      const remaining = Math.max(0, state.timeLeftMs - action.deltaMs)
      if (remaining <= 0) {
        return { ...state, timeLeftMs: 0, phase: 'ended', current: null }
      }
      return { ...state, timeLeftMs: remaining }
    }
    case 'END': {
      return { ...state, phase: 'ended', current: null }
    }
    case 'RESET': {
      return makeInitial(state.config)
    }
  }
}

const DEFAULT_CONFIG: GameConfig = {
  mode: 'timed',
  difficulty: 'easy',
  ops: ALL_OPS.filter(op => ['add', 'sub', 'mul', 'div'].includes(op)),
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_CONFIG, makeInitial)
  const rafRef = useRef<number | null>(null)
  const prevTsRef = useRef<number>(0)

  const start = useCallback((config: GameConfig) => {
    dispatch({ type: 'START', config, now: performance.now() })
  }, [])
  const answer = useCallback((value: number) => {
    dispatch({ type: 'ANSWER', value, now: performance.now() })
  }, [])
  const skip = useCallback(() => {
    dispatch({ type: 'SKIP', now: performance.now() })
  }, [])
  const end = useCallback(() => {
    dispatch({ type: 'END' })
  }, [])
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  useEffect(() => {
    if (state.phase !== 'running' || state.config.mode !== 'timed') return
    prevTsRef.current = performance.now()
    const loop = (ts: number) => {
      const delta = ts - prevTsRef.current
      prevTsRef.current = ts
      dispatch({ type: 'TICK', deltaMs: delta, now: ts })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [state.phase, state.config.mode])

  const summary = useMemo<SessionSummary | null>(() => {
    if (state.phase !== 'ended') return null
    const total = state.history.length
    const score = state.score
    const accuracy = total === 0 ? 0 : (score / total) * 100
    const avgTimeMs = total === 0
      ? 0
      : Math.round(state.history.reduce((acc, r) => acc + r.timeMs, 0) / total)
    return {
      mode: state.config.mode,
      difficulty: state.config.difficulty,
      score,
      total,
      accuracy: Math.round(accuracy * 10) / 10,
      longestStreak: state.longestStreak,
      avgTimeMs,
      endedAt: Date.now(),
    }
  }, [state.phase, state.history, state.score, state.longestStreak, state.config.mode, state.config.difficulty])

  const perOpDelta = useMemo<Partial<Record<OpKind, { answered: number; correct: number }>>>(() => {
    const delta: Partial<Record<OpKind, { answered: number; correct: number }>> = {}
    for (const rec of state.history) {
      const cur = delta[rec.op] ?? { answered: 0, correct: 0 }
      cur.answered += 1
      if (rec.correct) cur.correct += 1
      delta[rec.op] = cur
    }
    return delta
  }, [state.history])

  return { state, start, answer, skip, end, reset, summary, perOpDelta }
}
