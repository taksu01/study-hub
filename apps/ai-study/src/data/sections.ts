import {
  Layers, BookOpen, MessageSquare, Bot, Wrench,
  Monitor, Plug, Hammer, Sparkles,
} from 'lucide-react'

export interface SectionEntry {
  id: string
  num: number
  title: string
  blurb: string
  icon: typeof Layers
  /** What the reader can do afterwards — concrete, not "understand X". */
  outcome: string
  minutes: number
  /** Interactive pieces in this section, surfaced on the home grid. */
  labs: string[]
}

export const SECTIONS: SectionEntry[] = [
  {
    id: 'section-1', num: 1, title: 'The Big Picture', icon: Layers,
    blurb: 'AI is a stack. You only need to master one layer of it.',
    outcome: 'Place any AI term you hear onto the right layer, and know which layers you can ignore.',
    minutes: 8,
    labs: ['Stack explorer', 'Taxonomy tree'],
  },
  {
    id: 'section-2', num: 2, title: 'Core Vocabulary', icon: BookOpen,
    blurb: 'Tokens, context, temperature — the knobs behind every AI tool.',
    outcome: 'Predict what changing temperature or context length will do before you change it.',
    minutes: 15,
    labs: ['Tokenizer lab', 'Context budget', 'Temperature lab'],
  },
  {
    id: 'section-3', num: 3, title: 'Prompting Mastery', icon: MessageSquare,
    blurb: 'The six techniques that separate usable output from noise.',
    outcome: 'Diagnose why a prompt failed and fix it with a named technique.',
    minutes: 15,
    labs: ['Prompt builder', 'Before / after'],
  },
  {
    id: 'section-4', num: 4, title: 'The Agent Paradigm', icon: Bot,
    blurb: 'From models that answer to systems that act.',
    outcome: 'Decide whether a problem needs an agent or just a good prompt.',
    minutes: 12,
    labs: ['Agent loop trace'],
  },
  {
    id: 'section-5', num: 5, title: 'The Tooling Ecosystem', icon: Wrench,
    blurb: 'MCP, SDKs, skills and orchestration frameworks.',
    outcome: 'Pick the right layer of tooling instead of reaching for a framework by default.',
    minutes: 12,
    labs: ['MCP diagram'],
  },
  {
    id: 'section-6', num: 6, title: 'Local AI Setup', icon: Monitor,
    blurb: 'Run capable models on your own machine, free and offline.',
    outcome: 'Have Ollama running with a model that actually fits your hardware.',
    minutes: 12,
    labs: ['Hardware fit lab'],
  },
  {
    id: 'section-7', num: 7, title: 'Integration Patterns', icon: Plug,
    blurb: 'Four patterns that cover almost every AI feature you will build.',
    outcome: 'Wire a model into an app with the simplest pattern that works.',
    minutes: 18,
    labs: ['RAG pipeline'],
  },
  {
    id: 'section-8', num: 8, title: 'Project Blueprints', icon: Hammer,
    blurb: 'Five buildable projects with architecture and working code.',
    outcome: 'Ship one end-to-end AI project this week.',
    minutes: 25,
    labs: ['Runnable code'],
  },
  {
    id: 'section-9', num: 9, title: 'Your AI Stack', icon: Sparkles,
    blurb: 'Route the right task to the right model, at the right cost.',
    outcome: 'Have a personal routing rule and a monthly cost you are comfortable with.',
    minutes: 10,
    labs: ['Model chooser', 'Cost lab'],
  },
]

export const TOTAL_MINUTES = SECTIONS.reduce((a, s) => a + s.minutes, 0)
