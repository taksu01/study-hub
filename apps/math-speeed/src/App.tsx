import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameConfig, PersistedStats } from './types'
import { ALL_OPS } from './types'
import { useGame } from './hooks/useGame'
import { useTheme } from './hooks/useTheme'
import { useLocalStorage } from './hooks/useLocalStorage'
import { emptyStats, loadStats, recordSession, resetStats } from './lib/stats'
import MainMenu from './components/MainMenu'
import GameScreen from './components/GameScreen'
import ReviewScreen from './components/ReviewScreen'

type Screen = 'menu' | 'game' | 'review'

const DEFAULT_CONFIG: GameConfig = {
  mode: 'timed',
  difficulty: 'easy',
  ops: ALL_OPS.filter(op => ['add', 'sub', 'mul', 'div'].includes(op)),
}

export default function App() {
  // Initializes theme (dark/light class on <html>).
  useTheme()

  const [screen, setScreen] = useState<Screen>('menu')
  const [config, setConfig] = useLocalStorage<GameConfig>('math-speeed:config', DEFAULT_CONFIG)
  const [calmMode, setCalmMode] = useLocalStorage<boolean>('math-speeed:calm', false)
  const [stats, setStats] = useState<PersistedStats>(() => (typeof window === 'undefined' ? emptyStats() : loadStats()))

  const { state, start, answer, skip, end, reset, summary, perOpDelta } = useGame()
  const recordedSessionIdRef = useRef<number>(0)
  const [lastRecord, setLastRecord] = useState<{ isNewBest: boolean; previousBest: number }>({ isNewBest: false, previousBest: 0 })

  useEffect(() => {
    if (screen !== 'game') return
    if (state.phase !== 'ended') return
    if (recordedSessionIdRef.current === state.history.length + state.score) return
    recordedSessionIdRef.current = state.history.length + state.score
    if (!summary || state.history.length === 0) {
      setScreen('review')
      return
    }
    if (state.config.mode === 'practice') {
      setScreen('review')
      setLastRecord({ isNewBest: false, previousBest: 0 })
      return
    }
    const result = recordSession(stats, { summary, perOpDelta })
    setStats(result.stats)
    setLastRecord({ isNewBest: result.isNewBest, previousBest: result.previousBest })
    setScreen('review')
  }, [state.phase, state.history.length, state.score, summary, perOpDelta, stats, state.config.mode, screen])

  const handleStart = useCallback(() => {
    start(config)
    setScreen('game')
  }, [start, config])

  const handlePlayAgain = useCallback(() => {
    start(config)
    setScreen('game')
  }, [start, config])

  const handleQuit = useCallback(() => {
    end()
  }, [end])

  const handleMenu = useCallback(() => {
    reset()
    setScreen('menu')
  }, [reset])

  const handleResetStats = useCallback(() => {
    if (typeof window !== 'undefined' && !window.confirm('Reset all local stats and records?')) return
    setStats(resetStats())
  }, [])

  return (
    <main className="min-h-[100dvh]">
      {screen === 'menu' && (
        <MainMenu
          config={config}
          onChange={setConfig}
          onStart={handleStart}
          stats={stats}
          onResetStats={handleResetStats}
          calmMode={calmMode}
          onToggleCalm={() => setCalmMode(v => !v)}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          state={state}
          onAnswer={answer}
          onSkip={skip}
          onQuit={handleQuit}
          calmMode={calmMode}
        />
      )}

      {screen === 'review' && summary && (
        <ReviewScreen
          summary={summary}
          history={state.history}
          isNewBest={lastRecord.isNewBest}
          previousBest={lastRecord.previousBest}
          onPlayAgain={handlePlayAgain}
          onMenu={handleMenu}
          calmMode={calmMode}
        />
      )}
    </main>
  )
}
