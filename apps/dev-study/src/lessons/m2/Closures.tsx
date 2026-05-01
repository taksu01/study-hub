import { useEffect } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { ClosureDiagram } from '../../components/diagrams/ClosureDiagram'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm2'
const LESSON_ID = 'closures'

interface Props { onNavigate: NavigateFn }

export function ClosuresLesson({ onNavigate }: Props) {
  const { getStatus, markVisited, markComplete } = useProgress()
  const mod = getModule(MODULE_ID)!
  const adjacent = getAdjacentLessons(MODULE_ID, LESSON_ID)
  const status = getStatus(MODULE_ID, LESSON_ID)
  const info = getLesson(MODULE_ID, LESSON_ID)!

  useEffect(() => { markVisited(MODULE_ID, LESSON_ID) }, [])

  return (
    <LessonLayout
      meta={{
        moduleId: MODULE_ID,
        moduleTitle: `Module ${mod.number}: ${mod.title}`,
        moduleColor: mod.color,
        lessonId: LESSON_ID,
        title: info.lesson.title,
        subtitle: 'Functions that remember the scope they were created in — the foundation of half of JavaScript patterns',
        duration: info.lesson.duration,
        status,
        onMarkComplete: () => markComplete(MODULE_ID, LESSON_ID),
        onNavigate,
        prev: adjacent.prev,
        next: adjacent.next,
      }}
    >
      <LessonSection id="what" title="What it is" icon="📌">
        <p>
          A closure is a function that <strong className="text-slate-200">retains access to variables from its outer scope</strong>, even after the outer function has returned.
          The function "closes over" those variables — it carries them with it.
        </p>
        <p>
          This isn't a special syntax or keyword. It's a natural consequence of how JavaScript's lexical scoping and execution contexts work.
          Every function in JavaScript is a closure (though the term is usually reserved for cases where the function outlives its creator).
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { heading: 'Data encapsulation', desc: 'Private state without classes. The closure pattern is how the module pattern works.' },
            { heading: 'Factory functions', desc: 'Create functions with baked-in configuration. The go-to pattern for callbacks and event handlers.' },
            { heading: 'Memoization', desc: 'Cache function results using a closure over a Map. The basis of useMemo and manual caching.' },
            { heading: 'Interview staple', desc: '"What is a closure?" is one of the most common JS interview questions. You need a crisp, correct answer.' },
          ].map(item => (
            <div key={item.heading} className="p-3 rounded-lg bg-surface2 border border-rim">
              <div className="text-sm font-semibold text-slate-200 mb-1">{item.heading}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>
          Closures exist because JavaScript uses <strong className="text-slate-200">lexical scoping</strong> — a function's scope is determined by where it's <em>written</em>, not where it's called.
          When a function is created, it gets a reference to its lexical environment. That reference lives as long as the function lives.
        </p>
        <p className="mt-2">
          Real-world closure usage:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'React hooks internals',
            'Event handlers with state',
            'Module pattern / IIFE',
            'Memoization caches',
            'setTimeout with loop vars',
            'Partial application / currying',
            'useCallback dependencies',
            'Private class fields (before #)',
          ].map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-950/20 text-sky-300">
              {tag}
            </span>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="diagram" title="Scope Visualizer" icon="⚡" accent="text-sky-400">
        <p className="text-slate-400 text-sm mb-4">
          Three examples showing what closures capture, why the loop gotcha happens, and how to use closures for private state.
        </p>
        <ClosureDiagram />
      </LessonSection>

      <LessonSection id="how" title="How it works" icon="⚙">
        <p>
          When a function is <strong className="text-slate-200">defined</strong> (not called), it stores a reference to its lexical environment.
          When the outer function returns, the execution context is removed from the stack — but the lexical environment is kept alive in memory as long as any closure references it.
        </p>
        <div className="mt-4 space-y-2">
          {[
            { step: '1', text: 'outer() is called → outer\'s EC + lexical env created. count = 0 in the env.' },
            { step: '2', text: 'inner() function is defined inside outer. It captures a reference to outer\'s lexical env.' },
            { step: '3', text: 'outer() returns inner (the function, not the result of calling it). outer\'s EC is popped from the call stack.' },
            { step: '4', text: 'outer\'s lexical env is NOT garbage collected — inner holds a reference to it.' },
            { step: '5', text: 'When inner() is called later, it can still read and modify count via the captured env reference.' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs flex items-center justify-center shrink-0 font-semibold">
                {step}
              </span>
              <span className="text-slate-300 pt-0.5">{text}</span>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="code" title="Real code examples" icon="💻">
        <p className="text-sm text-slate-400 mb-3">Memoization using a closure:</p>
        <CodeBlock
          title="memoize.ts"
          code={`function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()  // closed over!

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>
    }

    const result = fn(...args) as ReturnType<T>
    cache.set(key, result)
    return result
  }) as T
}

// cache lives inside the closure — hidden from outside
const expensiveFn = memoize((n: number) => {
  // heavy computation...
  return n * n
})

expensiveFn(5)  // computed — 25
expensiveFn(5)  // cached  — 25 (no re-computation)
expensiveFn(6)  // computed — 36`}
        />

        <div className="mt-5">
          <p className="text-sm text-slate-400 mb-3">React useCallback — what it's closing over:</p>
          <CodeBlock
            title="useCallback-closure.tsx"
            code={`function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  // Without useCallback: new function on every render
  // This closes over 'value' — stale closure risk if deps wrong
  const handleSubmit = useCallback(() => {
    onSearch(value)   // ← 'value' captured from render's scope
  }, [value, onSearch])
  //   ↑ Must include 'value' in deps!
  //   If deps were [], handleSubmit would always see value = ''

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
    />
  )
}

// The stale closure bug:
const handler = useCallback(() => {
  console.log(count) // ← will ALWAYS print 0 if count missing from deps!
}, [])               // ← missing 'count' in deps!`}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm text-slate-400 mb-3">Partial application — baking in arguments:</p>
          <CodeBlock
            title="partial-application.ts"
            code={`// Close over the first argument, return a function for the rest
function multiply(x: number) {
  return function (y: number) {
    return x * y   // x is captured from outer scope
  }
}

const double = multiply(2)  // x = 2 is captured
const triple = multiply(3)  // x = 3 is captured

double(5)  // 10  — (2 * 5)
triple(5)  // 15  — (3 * 5)

// Arrow function version
const add = (x: number) => (y: number) => x + y
const add10 = add(10)
add10(5)   // 15`}
          />
        </div>
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            {
              term: 'Closure',
              meaning: 'A function that retains access to variables from its enclosing scope after that scope has returned.',
              confusedWith: 'Scope — scope is a static concept (where variables are defined); closure is the runtime retention of that scope.',
            },
            {
              term: 'Lexical scoping',
              meaning: 'Scope is determined by where the function is written in source code, not where it\'s called.',
              confusedWith: 'Dynamic scoping — JS uses lexical (static) scoping. this is dynamic, variables are lexical.',
            },
            {
              term: 'Captured variable',
              meaning: 'A variable from an outer scope that is referenced by an inner function and therefore kept alive.',
              confusedWith: 'Copied variable — closures capture by REFERENCE, not by value. Mutations are visible.',
            },
            {
              term: 'Stale closure',
              meaning: 'When a closure captures a variable but the variable has since been updated and the closure holds the old reference.',
              confusedWith: 'A bug in the variable — the bug is in the dependency management, not the variable itself.',
            },
            {
              term: 'IIFE',
              meaning: 'Immediately Invoked Function Expression — (function() { })() — creates a new scope via a closure to avoid polluting global.',
              confusedWith: 'A module — IIFEs were the pre-module-era module pattern; ES modules replaced them.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'The loop var trap (classic interview question)',
              desc: 'Using var in a for loop — all callbacks share the same var binding. When they run, var has its final value. Fix: use let (creates a new binding per iteration) or wrap in an IIFE to capture the current value.',
            },
            {
              title: 'Stale closures in React (the #1 hooks gotcha)',
              desc: 'A callback inside useEffect or useCallback closes over values at render time. If deps array is missing a value, the closure is "stale" — it reads the old captured value, not the current one. Always include all referenced values in deps.',
            },
            {
              title: 'Believing closures copy variables',
              desc: 'Closures capture variables by REFERENCE, not by value. If the outer function modifies the variable after the closure is created, the closure sees the new value. This is why counters work — the inner function modifies and reads the same reference.',
            },
            {
              title: 'Memory leak via long-lived closures',
              desc: 'Every closure keeps its captured scope alive. If a closure is attached to a long-lived object (DOM element, global variable), it prevents all captured variables from being garbage collected — even ones you no longer need.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="Closures"
          items={[
            { label: 'Definition', value: 'Function + its captured lexical environment' },
            { label: 'Capture type', value: 'By reference (live link), not by value (copy)' },
            { label: 'Lifetime', value: 'Captured vars live as long as any closure references them' },
            { label: 'Loop var fix', value: 'Use let instead of var (new binding per iteration)' },
            { label: 'Stale closure fix', value: 'Include all referenced values in useCallback/useEffect deps' },
            { label: 'Private state pattern', value: 'Return object of functions that all close over same vars' },
            { label: 'Memoization', value: 'Close over a cache Map, check before computing' },
            { label: 'Interview one-liner', value: '"A closure is a function that retains access to its outer scope after the outer function returns."' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
