import { BookOpen } from 'lucide-react'
import type { NavigateFn } from '../types'
import { getModule, getLesson, getAdjacentLessons } from '../data/curriculum'
import { LessonLayout } from '../components/LessonLayout'
import { useProgress } from '../hooks/useProgress'
import { useEffect } from 'react'

interface Props {
  moduleId: string
  lessonId: string
  onNavigate: NavigateFn
}

export function ComingSoon({ moduleId, lessonId, onNavigate }: Props) {
  const { getStatus, markVisited, markComplete } = useProgress()
  const info = getLesson(moduleId, lessonId)
  const mod = getModule(moduleId)
  const adjacent = getAdjacentLessons(moduleId, lessonId)

  useEffect(() => {
    markVisited(moduleId, lessonId)
  }, [moduleId, lessonId])

  if (!info || !mod) return null

  const status = getStatus(moduleId, lessonId)

  return (
    <LessonLayout
      meta={{
        moduleId,
        moduleTitle: `Module ${mod.number}: ${mod.title}`,
        moduleColor: mod.color,
        lessonId,
        title: info.lesson.title,
        subtitle: 'Full lesson content coming soon',
        duration: info.lesson.duration,
        status,
        onMarkComplete: () => markComplete(moduleId, lessonId),
        onNavigate,
        prev: adjacent.prev,
        next: adjacent.next,
      }}
    >
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface2 border border-rim flex items-center justify-center">
          <BookOpen size={28} className="text-slate-500" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-xl font-semibold text-slate-200">Lesson in progress</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            This lesson is being written. Check back soon — the curriculum is being built out in priority order,
            starting with JS Engine internals and React core concepts.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-600">Priority build order:</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-sm">
            {['Event Loop', 'Closures', 'Promises', 'async/await', 'React Rendering', 'Reconciliation'].map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-surface2 border border-rim text-slate-500">
                {t}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="px-4 py-2 rounded-lg border border-rim text-sm text-slate-400 hover:text-slate-200 hover:border-sky-500/40 transition-all"
        >
          ← Back to modules
        </button>
      </div>
    </LessonLayout>
  )
}
