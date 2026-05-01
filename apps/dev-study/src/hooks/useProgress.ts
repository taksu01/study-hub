import { useState, useCallback } from 'react'
import type { AppProgress, ProgressStatus } from '../types'

const STORAGE_KEY = 'devstudy:progress'

function load(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AppProgress
  } catch {
    // ignore
  }
  return { lessons: {} }
}

function save(progress: AppProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress>(load)

  const getStatus = useCallback(
    (moduleId: string, lessonId: string): ProgressStatus => {
      return progress.lessons[`${moduleId}/${lessonId}`]?.status ?? 'not-started'
    },
    [progress],
  )

  const setStatus = useCallback(
    (moduleId: string, lessonId: string, status: ProgressStatus) => {
      setProgress(prev => {
        const next: AppProgress = {
          ...prev,
          lessons: {
            ...prev.lessons,
            [`${moduleId}/${lessonId}`]: {
              ...prev.lessons[`${moduleId}/${lessonId}`],
              status,
              lastVisited: new Date().toISOString(),
            },
          },
        }
        save(next)
        return next
      })
    },
    [],
  )

  const markVisited = useCallback(
    (moduleId: string, lessonId: string) => {
      const key = `${moduleId}/${lessonId}`
      const current = progress.lessons[key]?.status ?? 'not-started'
      if (current === 'not-started') {
        setProgress(prev => {
          const next: AppProgress = {
            ...prev,
            lessons: {
              ...prev.lessons,
              [key]: { status: 'in-progress', lastVisited: new Date().toISOString() },
            },
            lastVisited: key,
          }
          save(next)
          return next
        })
      } else {
        setProgress(prev => {
          const next: AppProgress = {
            ...prev,
            lessons: {
              ...prev.lessons,
              [key]: { ...prev.lessons[key], lastVisited: new Date().toISOString() },
            },
            lastVisited: key,
          }
          save(next)
          return next
        })
      }
    },
    [progress],
  )

  const markComplete = useCallback(
    (moduleId: string, lessonId: string) => {
      setStatus(moduleId, lessonId, 'completed')
    },
    [setStatus],
  )

  const getModuleProgress = useCallback(
    (moduleId: string, lessonCount: number): number => {
      const completed = Object.entries(progress.lessons).filter(
        ([key, val]) => key.startsWith(moduleId + '/') && val.status === 'completed',
      ).length
      return lessonCount > 0 ? Math.round((completed / lessonCount) * 100) : 0
    },
    [progress],
  )

  const resetAll = useCallback(() => {
    const empty: AppProgress = { lessons: {} }
    save(empty)
    setProgress(empty)
  }, [])

  return {
    progress,
    getStatus,
    setStatus,
    markVisited,
    markComplete,
    getModuleProgress,
    resetAll,
    lastVisited: progress.lastVisited,
  }
}
