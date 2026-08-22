import { useState, useEffect } from 'react'
import type { AppRoute, NavigateFn } from './types'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './components/HomePage'
import { LabPage } from './components/LabPage'

// M1 — Foundations
import TheProblem from './lessons/m1/TheProblem'
import WhatIsMoney from './lessons/m1/WhatIsMoney'
import BlocksAndChain from './lessons/m1/BlocksAndChain'
// M2 — Transactions
import UtxoModel from './lessons/m2/UtxoModel'
import TxLifecycle from './lessons/m2/TxLifecycle'
import FeesAndMempool from './lessons/m2/FeesAndMempool'
// M3 — Mining & Consensus
import ProofOfWork from './lessons/m3/ProofOfWork'
import DifficultyAndHalving from './lessons/m3/DifficultyAndHalving'
import ConsensusAndForks from './lessons/m3/ConsensusAndForks'
// M4 — Network & Ownership
import NodesAndNetwork from './lessons/m4/NodesAndNetwork'
import KeysAndWallets from './lessons/m4/KeysAndWallets'
import SecurityThreats from './lessons/m4/SecurityThreats'
// M5 — Scaling & Upgrades
import Segwit from './lessons/m5/Segwit'
import Taproot from './lessons/m5/Taproot'
import Lightning from './lessons/m5/Lightning'
import Governance from './lessons/m5/Governance'
// M6 — Value & Markets
import Scarcity from './lessons/m6/Scarcity'
import DigitalGold from './lessons/m6/DigitalGold'
import Inflation from './lessons/m6/Inflation'
import Adoption from './lessons/m6/Adoption'
import Macro from './lessons/m6/Macro'
import Risks from './lessons/m6/Risks'

export type LessonProps = { onNavigate: NavigateFn }
type LessonComponent = React.ComponentType<LessonProps>

const LESSON_REGISTRY: Record<string, Record<string, LessonComponent>> = {
  m1: { 'the-problem': TheProblem, 'what-is-money': WhatIsMoney, 'blocks-and-chain': BlocksAndChain },
  m2: { 'utxo-model': UtxoModel, 'tx-lifecycle': TxLifecycle, 'fees-and-mempool': FeesAndMempool },
  m3: { 'proof-of-work': ProofOfWork, 'difficulty-and-halving': DifficultyAndHalving, 'consensus-and-forks': ConsensusAndForks },
  m4: { 'nodes-and-network': NodesAndNetwork, 'keys-and-wallets': KeysAndWallets, 'security-threats': SecurityThreats },
  m5: { segwit: Segwit, taproot: Taproot, lightning: Lightning, governance: Governance },
  m6: { scarcity: Scarcity, 'digital-gold': DigitalGold, inflation: Inflation, adoption: Adoption, macro: Macro, risks: Risks },
}

function parseRoute(hash: string): AppRoute {
  const h = hash.replace(/^#\/?/, '')
  if (!h || h === '/') return { type: 'home' }
  if (h === 'lab') return { type: 'lab' }
  const match = h.match(/^lesson\/([^/]+)\/([^/]+)$/)
  if (match && LESSON_REGISTRY[match[1]]?.[match[2]]) {
    return { type: 'lesson', moduleId: match[1], lessonId: match[2] }
  }
  return { type: 'home' }
}

function routeToHash(route: AppRoute): string {
  if (route.type === 'home') return '#/'
  if (route.type === 'lab') return '#/lab'
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar currentRoute={route} onNavigate={navigate} dark={dark} onToggleDark={toggleDark} />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {route.type === 'home' && <HomePage onNavigate={navigate} />}
        {route.type === 'lab' && <LabPage />}
        {route.type === 'lesson' && Lesson && <Lesson onNavigate={navigate} />}
      </main>
    </div>
  )
}
