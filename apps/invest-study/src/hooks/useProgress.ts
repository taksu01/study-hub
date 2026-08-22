import { useSyncExternalStore, useCallback } from 'react'
import type { AppProgress, ProgressStatus } from '../types'

const STORAGE_KEY = 'investstudy:progress'

let cache: AppProgress = load()
const listeners = new Set<() => void>()

function load(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AppProgress
  } catch {
    // ignore
  }
  return { lessons: {} }
}

function commit(next: AppProgress) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
  listeners.forEach(fn => fn())
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/**
 * Progress store shared across all components (sidebar, home, lessons)
 * so completing a lesson updates every view immediately.
 */
export function useProgress() {
  const progress = useSyncExternalStore(subscribe, () => cache)

  const getStatus = useCallback(
    (moduleId: string, lessonId: string): ProgressStatus =>
      progress.lessons[`${moduleId}/${lessonId}`]?.status ?? 'not-started',
    [progress],
  )

  const markVisited = useCallback((moduleId: string, lessonId: string) => {
    const key = `${moduleId}/${lessonId}`
    const current = cache.lessons[key]
    commit({
      ...cache,
      lessons: {
        ...cache.lessons,
        [key]: {
          status: current?.status === 'completed' ? 'completed' : 'in-progress',
          lastVisited: new Date().toISOString(),
        },
      },
      lastVisited: key,
    })
  }, [])

  const markComplete = useCallback((moduleId: string, lessonId: string) => {
    const key = `${moduleId}/${lessonId}`
    commit({
      ...cache,
      lessons: {
        ...cache.lessons,
        [key]: { status: 'completed', lastVisited: new Date().toISOString() },
      },
    })
  }, [])

  const getModuleProgress = useCallback(
    (moduleId: string, lessonCount: number): number => {
      const completed = Object.entries(progress.lessons).filter(
        ([key, val]) => key.startsWith(moduleId + '/') && val.status === 'completed',
      ).length
      return lessonCount > 0 ? Math.round((completed / lessonCount) * 100) : 0
    },
    [progress],
  )

  const completedCount = Object.values(progress.lessons).filter(l => l.status === 'completed').length

  return {
    progress,
    getStatus,
    markVisited,
    markComplete,
    getModuleProgress,
    completedCount,
    lastVisited: progress.lastVisited,
  }
}
