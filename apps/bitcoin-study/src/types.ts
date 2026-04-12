export interface KeyTerm {
  term: string
  definition: string
}

export interface RecallPrompt {
  question: string
  hint: string
}

export interface ComparisonRow {
  aspect: string
  colA: string
  colB: string
}

export interface Section {
  id: string
  number: number
  title: string
  subtitle: string
  icon: string
  bigPicture: string
  whyItMatters: string
  visual: string
  simpleExample?: string
  details: string[]
  keyTerms: KeyTerm[]
  commonConfusion: string[]
  recallPrompts: RecallPrompt[]
  cheatSheet: string[]
  comparisonTable?: {
    title: string
    colAHeader: string
    colBHeader: string
    rows: ComparisonRow[]
  }
}
