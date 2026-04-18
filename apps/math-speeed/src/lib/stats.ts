import type { OpKind, PersistedStats, SessionSummary } from '../types'
import { ALL_OPS, bestKey } from '../types'

const STORAGE_KEY = 'math-speeed:stats:v1'
const MAX_HISTORY = 10

function emptyPerOp(): PersistedStats['perOp'] {
  const out = {} as PersistedStats['perOp']
  for (const op of ALL_OPS) out[op] = { answered: 0, correct: 0 }
  return out
}

export function emptyStats(): PersistedStats {
  return {
    bestScores: {},
    longestStreak: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    perOp: emptyPerOp(),
    history: [],
  }
}

export function loadStats(): PersistedStats {
  if (typeof localStorage === 'undefined') return emptyStats()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStats()
    const parsed = JSON.parse(raw) as Partial<PersistedStats>
    const base = emptyStats()
    return {
      bestScores: { ...base.bestScores, ...(parsed.bestScores ?? {}) },
      longestStreak: parsed.longestStreak ?? 0,
      totalAnswered: parsed.totalAnswered ?? 0,
      totalCorrect: parsed.totalCorrect ?? 0,
      perOp: { ...base.perOp, ...(parsed.perOp ?? {}) },
      history: Array.isArray(parsed.history) ? parsed.history.slice(-MAX_HISTORY) : [],
    }
  } catch {
    return emptyStats()
  }
}

export function saveStats(stats: PersistedStats): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export interface RecordSessionInput {
  summary: SessionSummary
  perOpDelta: Partial<Record<OpKind, { answered: number; correct: number }>>
}

export interface RecordSessionResult {
  stats: PersistedStats
  isNewBest: boolean
  previousBest: number
}

export function recordSession(current: PersistedStats, input: RecordSessionInput): RecordSessionResult {
  const { summary, perOpDelta } = input
  const key = bestKey(summary.mode, summary.difficulty)
  const previousBest = current.bestScores[key] ?? 0
  const isNewBest = summary.score > previousBest

  const next: PersistedStats = {
    bestScores: { ...current.bestScores, [key]: Math.max(previousBest, summary.score) },
    longestStreak: Math.max(current.longestStreak, summary.longestStreak),
    totalAnswered: current.totalAnswered + summary.total,
    totalCorrect: current.totalCorrect + summary.score,
    perOp: { ...current.perOp },
    history: [summary, ...current.history].slice(0, MAX_HISTORY),
  }

  for (const op of ALL_OPS) {
    const delta = perOpDelta[op]
    if (!delta) continue
    const prev = next.perOp[op]
    next.perOp[op] = {
      answered: prev.answered + delta.answered,
      correct: prev.correct + delta.correct,
    }
  }

  saveStats(next)
  return { stats: next, isNewBest, previousBest }
}

export function resetStats(): PersistedStats {
  const fresh = emptyStats()
  saveStats(fresh)
  return fresh
}
