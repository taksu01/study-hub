import { useCallback, useState } from 'react'

const STORAGE_KEY = 'aistudy:progress'

type Store = { done: string[] }

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return new Set((JSON.parse(raw) as Store).done ?? [])
  } catch {
    // ignore — private mode / corrupt value
  }
  return new Set()
}

function save(done: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ done: [...done] }))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(load)

  const isDone = useCallback((id: string) => done.has(id), [done])

  const toggle = useCallback((id: string) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const empty = new Set<string>()
    save(empty)
    setDone(empty)
  }, [])

  return { done, isDone, toggle, reset, doneCount: done.size }
}
