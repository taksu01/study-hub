import type { Module } from '../types'

export const MODULES: Module[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Foundations',
    tagline: 'The money system — income, cash flow, and the engine of compounding',
    icon: '🧭',
    color: 'indigo',
    lessons: [
      { id: 'big-picture', title: 'The Big Picture', duration: '10 min' },
      { id: 'cash-flow', title: 'Cash Flow & Liquidity', duration: '10 min' },
      { id: 'compounding', title: 'Compounding & Time', duration: '12 min' },
    ],
  },
  {
    id: 'm2',
    number: 2,
    title: 'Risk & Assets',
    tagline: 'What risk really is, the asset-class menu, and the instruments that hold them',
    icon: '⚖️',
    color: 'sky',
    lessons: [
      { id: 'risk-and-return', title: 'Risk & Return', duration: '12 min' },
      { id: 'asset-classes', title: 'Asset Classes', duration: '12 min' },
      { id: 'instruments', title: 'Funds, ETFs & Instruments', duration: '12 min' },
    ],
  },
  {
    id: 'm3',
    number: 3,
    title: 'Analysis',
    tagline: 'Reading a business, valuing it, and placing it in the macro weather',
    icon: '🔬',
    color: 'amber',
    lessons: [
      { id: 'company-analysis', title: 'Company Analysis', duration: '14 min' },
      { id: 'valuation', title: 'Valuation', duration: '12 min' },
      { id: 'macro', title: 'Macro for Investors', duration: '12 min' },
    ],
  },
  {
    id: 'm4',
    number: 4,
    title: 'Portfolio',
    tagline: 'Assigning every holding a job and assembling them into one machine',
    icon: '🧱',
    color: 'emerald',
    lessons: [
      { id: 'portfolio-roles', title: 'Portfolio Roles', duration: '12 min' },
      { id: 'portfolio-construction', title: 'Portfolio Construction', duration: '12 min' },
    ],
  },
  {
    id: 'm5',
    number: 5,
    title: 'Behavior & Mastery',
    tagline: 'The psychology, the classic mistakes, and the complete mental model',
    icon: '🧠',
    color: 'rose',
    lessons: [
      { id: 'behavioral', title: 'Behavioral Finance', duration: '12 min' },
      { id: 'mistakes', title: 'Common Mistakes', duration: '10 min' },
      { id: 'final-model', title: 'The Final Mental Model', duration: '10 min' },
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
