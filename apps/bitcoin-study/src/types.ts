export interface Lesson {
  id: string
  title: string
  duration: string
}

export type ModuleColor = 'amber' | 'sky' | 'orange' | 'emerald' | 'violet' | 'green'

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
  | { type: 'lab' }

export type NavigateFn = (route: AppRoute) => void
