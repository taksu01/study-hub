import { useState, useEffect } from 'react'

const STORAGE_KEY = 'invest-dark-mode'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) return stored === 'true'
    } catch {
      // ignore
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(STORAGE_KEY, String(dark))
    } catch {
      // ignore
    }
  }, [dark])

  return { dark, toggleDark: () => setDark(d => !d) }
}
