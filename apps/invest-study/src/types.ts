export interface Lesson {
  id: string
  title: string
  duration: string
}

export type ModuleColor = 'indigo' | 'sky' | 'amber' | 'emerald' | 'rose'

export interface Module {
  id: string
  number: number
  title: string
  tagline: string
  icon: string
  color: ModuleColor
  lessons: Lesson[]
}

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

export interface LessonProgress {
  status: ProgressStatus
  lastVisited?: string
}

export interface AppProgress {
  lessons: Record<string, LessonProgress>
  lastVisited?: string
}

export type AppRoute =
  | { type: 'home' }
  | { type: 'lesson'; moduleId: string; lessonId: string }

export type NavigateFn = (route: AppRoute) => void

/* ── Widget prop shapes used by components/ui.tsx ── */

export interface Term {
  term: string
  definition: string
}

export interface Confusion {
  itemA: string
  itemB: string
  explanation: string
}

export interface RecallQuestion {
  question: string
  answer: string
}

export interface CheatSheetItem {
  label: string
  value: string
}

export interface FlowNode {
  id: string
  label: string
  description: string
  color?: string
}

export interface CompareRow {
  attribute: string
  values: string[]
}

export interface ExpandableCard {
  title: string
  subtitle?: string
  content: string
  details?: string
  tags?: string[]
  color?: string
}

export interface CauseEffect {
  cause: string
  effect: string
}

export interface MistakeEntry {
  title: string
  whyItHappens: string
  whatItLooksLike: string
  whatToDoInstead: string
}
