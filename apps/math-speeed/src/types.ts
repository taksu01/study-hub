export type GameMode = 'timed' | 'endless' | 'streak' | 'practice'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme'

export type OpKind =
  | 'add'
  | 'sub'
  | 'mul'
  | 'div'
  | 'sqr'
  | 'sqrt'
  | 'pct'

export type MascotMood = 'idle' | 'happy' | 'surprised' | 'hype' | 'sleepy'

export interface QuestionRecord {
  id: number
  op: OpKind
  prompt: string
  answer: number
  userAnswer: number | null
  correct: boolean
  timeMs: number
}

export interface GameConfig {
  mode: GameMode
  difficulty: Difficulty
  ops: OpKind[]
}

export interface SessionSummary {
  mode: GameMode
  difficulty: Difficulty
  score: number
  total: number
  accuracy: number
  longestStreak: number
  avgTimeMs: number
  endedAt: number
}

export interface PersistedStats {
  bestScores: Record<string, number>
  longestStreak: number
  totalAnswered: number
  totalCorrect: number
  perOp: Record<OpKind, { answered: number; correct: number }>
  history: SessionSummary[]
}

export const ALL_OPS: OpKind[] = ['add', 'sub', 'mul', 'div', 'sqr', 'sqrt', 'pct']

export const OP_LABEL: Record<OpKind, string> = {
  add: '+',
  sub: '−',
  mul: '×',
  div: '÷',
  sqr: 'x²',
  sqrt: '√',
  pct: '%',
}

export const OP_NAME: Record<OpKind, string> = {
  add: 'Addition',
  sub: 'Subtraction',
  mul: 'Multiplication',
  div: 'Division',
  sqr: 'Squares',
  sqrt: 'Square roots',
  pct: 'Percentages',
}

export const MODE_LABEL: Record<GameMode, string> = {
  timed: 'Timed',
  endless: 'Endless',
  streak: 'Streak',
  practice: 'Practice',
}

export const DIFF_LABEL: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  extreme: 'Extreme',
}

export const TIMED_SECONDS = 60

export function bestKey(mode: GameMode, difficulty: Difficulty): string {
  return `${mode}:${difficulty}`
}
