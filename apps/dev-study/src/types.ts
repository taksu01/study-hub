export interface Lesson {
  id: string
  title: string
  duration: string
  implemented: boolean
}

export interface Module {
  id: string
  number: number
  title: string
  tagline: string
  color: ModuleColor
  locked?: boolean
  lessons: Lesson[]
}

export type ModuleColor =
  | 'amber'
  | 'sky'
  | 'violet'
  | 'cyan'
  | 'green'
  | 'rose'
  | 'orange'
  | 'emerald'
  | 'indigo'

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

export interface NavigateFn {
  (route: AppRoute): void
}
