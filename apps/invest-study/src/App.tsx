import { useState, useEffect } from 'react'
import type { AppRoute, NavigateFn } from './types'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './components/HomePage'

// M1 — Foundations
import BigPicture from './lessons/m1/BigPicture'
import CashFlow from './lessons/m1/CashFlow'
import Compounding from './lessons/m1/Compounding'
// M2 — Risk & Assets
import RiskAndReturn from './lessons/m2/RiskAndReturn'
import AssetClasses from './lessons/m2/AssetClasses'
import Instruments from './lessons/m2/Instruments'
// M3 — Analysis
import CompanyAnalysis from './lessons/m3/CompanyAnalysis'
import Valuation from './lessons/m3/Valuation'
import Macro from './lessons/m3/Macro'
// M4 — Portfolio
import PortfolioRoles from './lessons/m4/PortfolioRoles'
import PortfolioConstruction from './lessons/m4/PortfolioConstruction'
// M5 — Behavior & Mastery
import Behavioral from './lessons/m5/Behavioral'
import Mistakes from './lessons/m5/Mistakes'
import FinalModel from './lessons/m5/FinalModel'

export type LessonProps = { onNavigate: NavigateFn }
type LessonComponent = React.ComponentType<LessonProps>

const LESSON_REGISTRY: Record<string, Record<string, LessonComponent>> = {
  m1: { 'big-picture': BigPicture, 'cash-flow': CashFlow, compounding: Compounding },
  m2: { 'risk-and-return': RiskAndReturn, 'asset-classes': AssetClasses, instruments: Instruments },
  m3: { 'company-analysis': CompanyAnalysis, valuation: Valuation, macro: Macro },
  m4: { 'portfolio-roles': PortfolioRoles, 'portfolio-construction': PortfolioConstruction },
  m5: { behavioral: Behavioral, mistakes: Mistakes, 'final-model': FinalModel },
}

function parseRoute(hash: string): AppRoute {
  const h = hash.replace(/^#\/?/, '')
  if (!h || h === '/') return { type: 'home' }
  const match = h.match(/^lesson\/([^/]+)\/([^/]+)$/)
  if (match && LESSON_REGISTRY[match[1]]?.[match[2]]) {
    return { type: 'lesson', moduleId: match[1], lessonId: match[2] }
  }
  return { type: 'home' }
}

function routeToHash(route: AppRoute): string {
  if (route.type === 'home') return '#/'
  return `#/lesson/${route.moduleId}/${route.lessonId}`
}

export default function App() {
  const { dark, toggleDark } = useTheme()
  const { markVisited } = useProgress()
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate: NavigateFn = to => {
    window.history.pushState(null, '', routeToHash(to))
    setRoute(to)
    if (to.type === 'lesson') markVisited(to.moduleId, to.lessonId)
  }

  const Lesson = route.type === 'lesson' ? LESSON_REGISTRY[route.moduleId]?.[route.lessonId] : null

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar currentRoute={route} onNavigate={navigate} dark={dark} onToggleDark={toggleDark} />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {route.type === 'home' && <HomePage onNavigate={navigate} />}
        {route.type === 'lesson' && Lesson && <Lesson onNavigate={navigate} />}
      </main>
    </div>
  )
}
