import { useState, useEffect } from 'react'
import type { AppRoute } from './types'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './components/HomePage'
import { ComingSoon } from './lessons/ComingSoon'

// Implemented lessons
import { JSEngineLesson } from './lessons/m1/JSEngine'
import { ExecutionContextLesson } from './lessons/m1/ExecutionContext'
import { CallStackLesson } from './lessons/m1/CallStack'
import { EventLoopLesson } from './lessons/m1/EventLoop'
import { ClosuresLesson } from './lessons/m2/Closures'
import { PromisesLesson } from './lessons/m2/Promises'
import { AsyncAwaitLesson } from './lessons/m2/AsyncAwait'

function parseRoute(hash: string): AppRoute {
  const h = hash.replace(/^#\/?/, '')
  if (!h || h === '/') return { type: 'home' }
  const match = h.match(/^lesson\/([^/]+)\/([^/]+)$/)
  if (match) {
    return { type: 'lesson', moduleId: match[1], lessonId: match[2] }
  }
  return { type: 'home' }
}

function routeToHash(route: AppRoute): string {
  if (route.type === 'home') return '#/'
  return `#/lesson/${route.moduleId}/${route.lessonId}`
}

type LessonProps = { onNavigate: (route: AppRoute) => void }
type LessonComponent = React.ComponentType<LessonProps>

const LESSON_REGISTRY: Record<string, Record<string, LessonComponent>> = {
  m1: {
    'js-engine': JSEngineLesson,
    'execution-context': ExecutionContextLesson,
    'call-stack': CallStackLesson,
    'event-loop': EventLoopLesson,
  },
  m2: {
    closures: ClosuresLesson,
    promises: PromisesLesson,
    'async-await': AsyncAwaitLesson,
  },
}

function getLessonComponent(moduleId: string, lessonId: string): LessonComponent | null {
  return LESSON_REGISTRY[moduleId]?.[lessonId] ?? null
}

interface LessonRouterProps {
  moduleId: string
  lessonId: string
  onNavigate: (route: AppRoute) => void
}

function LessonRouter({ moduleId, lessonId, onNavigate }: LessonRouterProps) {
  const Component = getLessonComponent(moduleId, lessonId)
  if (Component) {
    return <Component onNavigate={onNavigate} />
  }
  return <ComingSoon moduleId={moduleId} lessonId={lessonId} onNavigate={onNavigate} />
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { markVisited } = useProgress()
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute(window.location.hash))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (to: AppRoute) => {
    const hash = routeToHash(to)
    window.history.pushState(null, '', hash)
    setRoute(to)
    if (to.type === 'lesson') {
      markVisited(to.moduleId, to.lessonId)
    }
  }

  return (
    <div className={`flex min-h-screen bg-canvas ${theme === 'light' ? 'light' : ''}`}>
      <Sidebar
        currentRoute={route}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {route.type === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : (
          <LessonRouter
            moduleId={route.moduleId}
            lessonId={route.lessonId}
            onNavigate={navigate}
          />
        )}
      </main>
    </div>
  )
}
