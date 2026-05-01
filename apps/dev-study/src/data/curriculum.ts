import type { Module } from '../types'

export const MODULES: Module[] = [
  {
    id: 'm1',
    number: 1,
    title: 'JS Engine & Runtime',
    tagline: 'Understand what JavaScript actually does under the hood',
    color: 'amber',
    lessons: [
      { id: 'js-engine', title: 'How JavaScript Engines Work', duration: '12 min', implemented: true },
      { id: 'memory-model', title: 'Memory Model: Stack vs Heap', duration: '10 min', implemented: false },
      { id: 'execution-context', title: 'Execution Context & Scope Chain', duration: '14 min', implemented: true },
      { id: 'call-stack', title: 'The Call Stack', duration: '10 min', implemented: true },
      { id: 'lexical-scope', title: 'Lexical Environment', duration: '8 min', implemented: false },
      { id: 'hoisting', title: 'Hoisting & Temporal Dead Zone', duration: '10 min', implemented: false },
      { id: 'event-loop', title: 'The Event Loop', duration: '18 min', implemented: true },
      { id: 'microtasks', title: 'Microtasks vs Macrotasks', duration: '12 min', implemented: false },
      { id: 'garbage-collection', title: 'Garbage Collection Basics', duration: '8 min', implemented: false },
    ],
  },
  {
    id: 'm2',
    number: 2,
    title: 'JS Core Concepts',
    tagline: 'Intermediate JavaScript — the patterns that trip up working engineers',
    color: 'sky',
    lessons: [
      { id: 'closures', title: 'Closures', duration: '16 min', implemented: true },
      { id: 'scope', title: 'Scope: var / let / const', duration: '10 min', implemented: false },
      { id: 'this-keyword', title: 'The `this` Keyword', duration: '14 min', implemented: false },
      { id: 'prototype-chain', title: 'Prototype Chain', duration: '12 min', implemented: false },
      { id: 'classes', title: 'Classes (Syntactic Sugar)', duration: '10 min', implemented: false },
      { id: 'promises', title: 'Promises', duration: '16 min', implemented: true },
      { id: 'async-await', title: 'async / await', duration: '14 min', implemented: true },
      { id: 'error-handling', title: 'Error Handling in Async Code', duration: '10 min', implemented: false },
      { id: 'generators', title: 'Generators & Iterators', duration: '10 min', implemented: false },
      { id: 'weakmap', title: 'WeakMap & WeakRef', duration: '8 min', implemented: false },
      { id: 'abort-controller', title: 'AbortController & AbortSignal', duration: '12 min', implemented: false },
    ],
  },
  {
    id: 'm3',
    number: 3,
    title: 'React Internals',
    tagline: 'Why React behaves the way it does — from fiber to concurrent mode',
    color: 'violet',
    lessons: [
      { id: 'rendering-model', title: 'React Rendering Model', duration: '14 min', implemented: false },
      { id: 'reconciliation', title: 'Reconciliation & Fiber', duration: '16 min', implemented: false },
      { id: 'strict-mode', title: 'React Strict Mode', duration: '10 min', implemented: false },
      { id: 'virtual-dom', title: 'Virtual DOM — What It Actually Is', duration: '10 min', implemented: false },
      { id: 'preventing-rerenders', title: 'Preventing Re-renders', duration: '16 min', implemented: false },
      { id: 'manual-memoization', title: 'Memoization Without memo', duration: '10 min', implemented: false },
      { id: 'useref', title: 'useRef Deep Dive', duration: '12 min', implemented: false },
      { id: 'useeffect', title: 'useEffect vs Alternatives', duration: '16 min', implemented: false },
      { id: 'custom-hooks', title: 'Custom Hooks', duration: '14 min', implemented: false },
      { id: 'suspense', title: 'Suspense', duration: '12 min', implemented: false },
      { id: 'context-api', title: 'Context API & Perf Traps', duration: '12 min', implemented: false },
      { id: 'error-boundaries', title: 'Error Boundaries', duration: '8 min', implemented: false },
      { id: 'react-query', title: 'React Query / TanStack Query', duration: '20 min', implemented: false },
      { id: 'react-18', title: 'React 18 — Concurrent Features', duration: '16 min', implemented: false },
      { id: 'react-19', title: 'React 19 Overview', duration: '14 min', implemented: false },
      { id: 'react-compiler', title: 'React Compiler', duration: '10 min', implemented: false },
    ],
  },
  {
    id: 'm4',
    number: 4,
    title: 'Modern Hooks',
    tagline: 'Every core hook explained precisely — when to use, why, and traps',
    color: 'cyan',
    lessons: [
      { id: 'use-state', title: 'useState Deep Dive', duration: '12 min', implemented: false },
      { id: 'use-reducer', title: 'useReducer — When useState Isn\'t Enough', duration: '14 min', implemented: false },
      { id: 'use-ref', title: 'useRef for Non-Render State', duration: '10 min', implemented: false },
      { id: 'custom-hooks-patterns', title: 'Building Custom Hooks', duration: '14 min', implemented: false },
      { id: 'data-fetching', title: 'Data Fetching Patterns', duration: '12 min', implemented: false },
      { id: 'zustand', title: 'Zustand — When to Reach For It', duration: '10 min', implemented: false },
    ],
  },
  {
    id: 'm5',
    number: 5,
    title: 'Node.js Backend',
    tagline: 'Server-side JavaScript — architecture, streams, HTTP, and Express',
    color: 'green',
    lessons: [
      { id: 'node-architecture', title: 'Node.js Architecture & libuv', duration: '14 min', implemented: false },
      { id: 'module-system', title: 'CommonJS vs ESM', duration: '10 min', implemented: false },
      { id: 'streams', title: 'Streams & Backpressure', duration: '14 min', implemented: false },
      { id: 'http-module', title: 'HTTP Module Fundamentals', duration: '10 min', implemented: false },
      { id: 'express', title: 'Express.js — Routing & Middleware', duration: '16 min', implemented: false },
      { id: 'rest-design', title: 'REST API Design', duration: '12 min', implemented: false },
    ],
  },
  {
    id: 'm6',
    number: 6,
    title: 'NestJS',
    tagline: 'Enterprise Node — DI, guards, pipes, and clean architecture',
    color: 'rose',
    lessons: [
      { id: 'nest-architecture', title: 'Architecture Overview', duration: '14 min', implemented: false },
      { id: 'nest-lifecycle', title: 'Guards, Interceptors, Pipes, Filters', duration: '16 min', implemented: false },
      { id: 'nest-comparison', title: 'Middleware vs Guards vs Interceptors', duration: '10 min', implemented: false },
      { id: 'dtos', title: 'DTOs & Validation', duration: '12 min', implemented: false },
      { id: 'database', title: 'Database Integration (TypeORM/Prisma)', duration: '16 min', implemented: false },
      { id: 'auth', title: 'Authentication — JWT & Guards', duration: '14 min', implemented: false },
    ],
  },
  {
    id: 'm7',
    number: 7,
    title: 'React Native',
    tagline: 'Mobile React — what changes, what doesn\'t, and how the bridge works',
    color: 'orange',
    lessons: [
      { id: 'rn-vs-web', title: 'React Native vs React Web', duration: '10 min', implemented: false },
      { id: 'bridge-jsi', title: 'Bridge vs JSI Architecture', duration: '12 min', implemented: false },
      { id: 'core-components', title: 'Core Components', duration: '10 min', implemented: false },
      { id: 'navigation', title: 'React Navigation', duration: '12 min', implemented: false },
      { id: 'styling-rn', title: 'Styling — No CSS, StyleSheet API', duration: '8 min', implemented: false },
      { id: 'platform-code', title: 'Platform-Specific Code', duration: '8 min', implemented: false },
    ],
  },
  {
    id: 'm8',
    number: 8,
    title: 'Nuxt.js',
    tagline: 'Vue SSR/SSG done right — routing, composables, and the ecosystem',
    color: 'emerald',
    lessons: [
      { id: 'nuxt-overview', title: 'What Nuxt Adds Over Vue', duration: '10 min', implemented: false },
      { id: 'file-routing', title: 'File-Based Routing', duration: '8 min', implemented: false },
      { id: 'rendering-modes', title: 'SSR vs SSG vs Hybrid', duration: '12 min', implemented: false },
      { id: 'composables', title: 'useFetch & useAsyncData', duration: '10 min', implemented: false },
      { id: 'nuxt-modules', title: 'Nuxt Modules Ecosystem', duration: '8 min', implemented: false },
    ],
  },
  {
    id: 'm9',
    number: 9,
    title: 'Web3 & Blockchain',
    tagline: 'Smart contracts, ethers.js, wagmi, and DeFi patterns',
    color: 'indigo',
    locked: true,
    lessons: [
      { id: 'blockchain', title: 'How Blockchain Works', duration: '~', implemented: false },
      { id: 'ethereum', title: 'Ethereum & Smart Contracts', duration: '~', implemented: false },
      { id: 'solidity', title: 'Solidity Basics', duration: '~', implemented: false },
      { id: 'ethersjs', title: 'ethers.js / wagmi', duration: '~', implemented: false },
      { id: 'wallet', title: 'Web3 Wallet Integration', duration: '~', implemented: false },
      { id: 'defi', title: 'DeFi Patterns', duration: '~', implemented: false },
    ],
  },
]

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find(m => m.id === moduleId)
}

export function getLesson(moduleId: string, lessonId: string) {
  const mod = getModule(moduleId)
  if (!mod) return undefined
  const lesson = mod.lessons.find(l => l.id === lessonId)
  if (!lesson) return undefined
  return { module: mod, lesson }
}

export function getAdjacentLessons(moduleId: string, lessonId: string) {
  const mod = getModule(moduleId)
  if (!mod) return { prev: null, next: null }
  const idx = mod.lessons.findIndex(l => l.id === lessonId)
  if (idx === -1) return { prev: null, next: null }

  const prevLesson = idx > 0 ? mod.lessons[idx - 1] : null
  const nextLesson = idx < mod.lessons.length - 1 ? mod.lessons[idx + 1] : null

  let prev = null
  let next = null

  if (prevLesson) {
    prev = { moduleId, lessonId: prevLesson.id, title: prevLesson.title }
  } else {
    const modIdx = MODULES.findIndex(m => m.id === moduleId)
    if (modIdx > 0) {
      const prevMod = MODULES[modIdx - 1]
      const lastLesson = prevMod.lessons[prevMod.lessons.length - 1]
      prev = { moduleId: prevMod.id, lessonId: lastLesson.id, title: lastLesson.title }
    }
  }

  if (nextLesson) {
    next = { moduleId, lessonId: nextLesson.id, title: nextLesson.title }
  } else {
    const modIdx = MODULES.findIndex(m => m.id === moduleId)
    if (modIdx < MODULES.length - 1) {
      const nextMod = MODULES[modIdx + 1]
      if (!nextMod.locked) {
        const firstLesson = nextMod.lessons[0]
        next = { moduleId: nextMod.id, lessonId: firstLesson.id, title: firstLesson.title }
      }
    }
  }

  return { prev, next }
}
