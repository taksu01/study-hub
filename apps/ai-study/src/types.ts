/* ── Content primitives ───────────────────────────── */

export interface Term {
  term: string
  short: string          // one-line definition — always visible
  example?: string       // concrete instance, code, or number
  detail?: string        // optional deeper note, revealed on demand
}

export interface Confusion {
  itemA: string
  itemB: string
  explanation: string
  fix?: string           // the one-line correction to remember
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
  color?: ColorKey
}

export interface CompareRow {
  attribute: string
  values: string[]
}

/** A card that leads with a takeaway, then optional structured points. */
export interface ExpandableCard {
  title: string
  subtitle?: string
  content: string
  points?: string[]      // replaces prose blobs with scannable bullets
  example?: string       // a concrete example / snippet
  details?: string       // legacy free-text escape hatch
  tags?: string[]
  color?: ColorKey
}

export interface CauseEffect {
  cause: string
  effect: string
}

export interface TaxonomyNode {
  id: string
  label: string
  subtitle?: string
  description: string
  examples?: string[]
  color?: ColorKey
  children?: TaxonomyNode[]
}

export interface ModelCard {
  name: string
  maker: string
  contextWindow: string
  access: 'cloud' | 'local'
  modelType: 'standard' | 'reasoning'
  multimodal: boolean
  strengths: string[]
  costTier: string
  bestFor: string
}

export type ColorKey =
  | 'slate' | 'blue' | 'indigo' | 'violet' | 'purple'
  | 'pink' | 'orange' | 'teal' | 'green' | 'red' | 'cyan'

/* ── Code ─────────────────────────────────────────── */

export interface CodeTab {
  label: string
  language: 'python' | 'javascript' | 'typescript' | 'bash' | 'json' | 'text'
  code: string
  note?: string
}

/* ── App shell ────────────────────────────────────── */

export interface SectionMeta {
  id: string
  num: number
  title: string
  blurb: string
}
