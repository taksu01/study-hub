export interface Term {
  term: string
  definition: string
}

export interface Confusion {
  itemA: string
  itemB: string
  explanation: string
}

export interface RecallQuestion {
  question: string
  answer: string
}

export interface CheatSheetItem {
  label: string
  value: string
}

export interface FlowNode {
  id: string
  label: string
  description: string
  color?: string
}

export interface CompareColumn {
  header: string
  values: string[]
}

export interface CompareRow {
  attribute: string
  values: string[]
}

export interface ExpandableCard {
  title: string
  subtitle?: string
  content: string
  details?: string
  tags?: string[]
  color?: string
}

export interface CauseEffect {
  cause: string
  arrow?: string
  effect: string
}

export interface ScenarioOption {
  label: string
  description: string
  outcome: string
}

export interface MistakeEntry {
  title: string
  whyItHappens: string
  whatItLooksLike: string
  whatToDoInstead: string
}

export interface SectionData {
  id: string
  number: number
  title: string
  subtitle: string
  icon: string
}
