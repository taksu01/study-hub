import type { Module } from '../types'

export const MODULES: Module[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Foundations',
    tagline: 'The problem Bitcoin solves and the system that solves it',
    icon: '◈',
    color: 'amber',
    lessons: [
      { id: 'the-problem', title: 'The Double-Spend Problem', duration: '10 min' },
      { id: 'what-is-money', title: 'What Makes Money, Money?', duration: '10 min' },
      { id: 'blocks-and-chain', title: 'Blocks & the Chain', duration: '14 min' },
    ],
  },
  {
    id: 'm2',
    number: 2,
    title: 'Transactions',
    tagline: 'How value actually moves — UTXOs, fees, and the mempool',
    icon: '⇄',
    color: 'sky',
    lessons: [
      { id: 'utxo-model', title: 'The UTXO Model', duration: '12 min' },
      { id: 'tx-lifecycle', title: 'Life of a Transaction', duration: '12 min' },
      { id: 'fees-and-mempool', title: 'Fees & the Mempool', duration: '10 min' },
    ],
  },
  {
    id: 'm3',
    number: 3,
    title: 'Mining & Consensus',
    tagline: 'Proof of Work, difficulty, halvings, and how the network agrees',
    icon: '⛏',
    color: 'orange',
    lessons: [
      { id: 'proof-of-work', title: 'Proof of Work', duration: '14 min' },
      { id: 'difficulty-and-halving', title: 'Difficulty & the Halving', duration: '10 min' },
      { id: 'consensus-and-forks', title: 'Consensus, Forks & Reorgs', duration: '12 min' },
    ],
  },
  {
    id: 'm4',
    number: 4,
    title: 'Network & Ownership',
    tagline: 'Nodes, keys, wallets, and what can actually go wrong',
    icon: '🔑',
    color: 'emerald',
    lessons: [
      { id: 'nodes-and-network', title: 'Nodes & the P2P Network', duration: '12 min' },
      { id: 'keys-and-wallets', title: 'Keys, Wallets & Custody', duration: '14 min' },
      { id: 'security-threats', title: 'Security & Threat Models', duration: '12 min' },
    ],
  },
  {
    id: 'm5',
    number: 5,
    title: 'Scaling & Upgrades',
    tagline: 'SegWit, Taproot, Lightning, and how Bitcoin changes its rules',
    icon: '⚡',
    color: 'violet',
    lessons: [
      { id: 'segwit', title: 'SegWit', duration: '12 min' },
      { id: 'taproot', title: 'Taproot & Schnorr', duration: '12 min' },
      { id: 'lightning', title: 'The Lightning Network', duration: '14 min' },
      { id: 'governance', title: 'Governance & the Block Size Wars', duration: '12 min' },
    ],
  },
  {
    id: 'm6',
    number: 6,
    title: 'Value & Markets',
    tagline: 'Why Bitcoin has value — scarcity, adoption, macro, and the honest risks',
    icon: '📈',
    color: 'green',
    lessons: [
      { id: 'scarcity', title: 'Engineered Scarcity: the 21M Cap', duration: '10 min' },
      { id: 'digital-gold', title: 'Digital Gold & Asset Comparison', duration: '12 min' },
      { id: 'inflation', title: 'Inflation & the Cantillon Effect', duration: '10 min' },
      { id: 'adoption', title: 'Adoption: Network Effects to ETFs', duration: '12 min' },
      { id: 'macro', title: 'The Macro Case', duration: '12 min' },
      { id: 'risks', title: 'The Honest Bear Case', duration: '10 min' },
    ],
  },
]

export function findModule(moduleId: string): Module | undefined {
  return MODULES.find(m => m.id === moduleId)
}

export function findLessonMeta(moduleId: string, lessonId: string) {
  const mod = findModule(moduleId)
  if (!mod) return null
  const idx = mod.lessons.findIndex(l => l.id === lessonId)
  if (idx === -1) return null
  return { module: mod, lesson: mod.lessons[idx], index: idx }
}

/** Flat ordered list of all lessons for prev/next navigation. */
export const FLAT_LESSONS = MODULES.flatMap(mod =>
  mod.lessons.map(lesson => ({ moduleId: mod.id, lessonId: lesson.id, title: lesson.title })),
)

export function prevNext(moduleId: string, lessonId: string) {
  const i = FLAT_LESSONS.findIndex(l => l.moduleId === moduleId && l.lessonId === lessonId)
  return {
    prev: i > 0 ? FLAT_LESSONS[i - 1] : null,
    next: i >= 0 && i < FLAT_LESSONS.length - 1 ? FLAT_LESSONS[i + 1] : null,
  }
}

export const TOTAL_LESSONS = FLAT_LESSONS.length
