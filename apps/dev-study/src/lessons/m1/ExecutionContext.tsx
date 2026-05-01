import { useEffect, useState } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm1'
const LESSON_ID = 'execution-context'

interface Props { onNavigate: NavigateFn }

function ExecutionContextDiagram() {
  const [active, setActive] = useState<'global' | 'function' | 'block'>('global')

  const contexts = {
    global: {
      label: 'Global Execution Context',
      color: 'sky',
      desc: 'Created once when your script starts. Holds global variables and the global object (window/globalThis).',
      items: [
        { label: 'Variable Environment', value: 'globalThis, var declarations (hoisted)', icon: '📦' },
        { label: 'Lexical Environment', value: 'let/const at global scope', icon: '🔒' },
        { label: 'this binding', value: 'window (browser) / globalThis (Node)', icon: '👆' },
      ],
    },
    function: {
      label: 'Function Execution Context',
      color: 'violet',
      desc: 'Created each time a function is called. Own scope, own this, own arguments.',
      items: [
        { label: 'Variable Environment', value: 'Function args + var declarations', icon: '📦' },
        { label: 'Lexical Environment', value: 'let/const + outer scope reference', icon: '🔒' },
        { label: 'this binding', value: 'Depends on how function was called', icon: '👆' },
        { label: 'Outer environment', value: 'Reference to parent scope (lexical)', icon: '↑' },
      ],
    },
    block: {
      label: 'Block Scope (not its own EC)',
      color: 'amber',
      desc: 'Blocks (if, for, {}) create a new lexical environment for let/const, but NOT a new execution context. var ignores block scope.',
      items: [
        { label: 'Block Lexical Env', value: 'let/const declared in this block', icon: '🔒' },
        { label: 'var behavior', value: 'Hoisted to enclosing function (ignores block)', icon: '⚠' },
        { label: 'Outer env', value: 'References the enclosing EC\'s env', icon: '↑' },
      ],
    },
  }

  const colorMap: Record<string, string> = {
    sky: 'border-sky-500/40 bg-sky-950/20',
    violet: 'border-violet-500/40 bg-violet-950/20',
    amber: 'border-amber-500/40 bg-amber-950/20',
  }

  const ctx = contexts[active]

  return (
    <div className="rounded-xl border border-rim bg-surface overflow-hidden">
      <div className="flex items-center gap-1 px-4 py-3 border-b border-rim bg-surface2">
        <span className="text-sm font-semibold text-slate-200 mr-2">Execution Context Types</span>
        {(Object.entries(contexts) as [keyof typeof contexts, typeof contexts[keyof typeof contexts]][]).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              key === active
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-rim'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-4">
        <div className={`rounded-lg border p-4 ${colorMap[ctx.color]}`}>
          <div className={`font-semibold text-sm mb-2 ${
            ctx.color === 'sky' ? 'text-sky-300' :
            ctx.color === 'violet' ? 'text-violet-300' : 'text-amber-300'
          }`}>{ctx.label}</div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">{ctx.desc}</p>
          <div className="space-y-2">
            {ctx.items.map(item => (
              <div key={item.label} className="flex items-start gap-2 p-2 rounded bg-surface2 border border-rim text-xs">
                <span>{item.icon}</span>
                <div>
                  <span className="text-slate-300 font-medium font-code">{item.label}</span>
                  <span className="text-slate-500 ml-2">→ {item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExecutionContextLesson({ onNavigate }: Props) {
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
        subtitle: 'The container that holds variables, scope, and "this" for every running piece of code',
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
          An execution context is the <strong className="text-slate-200">environment in which JavaScript code is evaluated and executed</strong>.
          Every time a function is called (or a script starts), a new execution context is created and pushed onto the call stack.
        </p>
        <p>
          It bundles together three things: the variable environment (what variables exist), the lexical environment (scope chain), and the <code className="font-code text-sky-300">this</code> binding.
          Understanding execution contexts is the foundation for understanding closures, scope, and <code className="font-code text-sky-300">this</code>.
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <p>
          Every question about <strong className="text-slate-200">scope, closures, and this</strong> comes back to execution contexts.
          If you understand ECs, you can answer:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            '"Why can an inner function access outer variables?" — It holds a reference to the outer EC\'s lexical env',
            '"Why does this change inside callbacks?" — A new EC is created with a different this binding',
            '"Why does var hoist to function scope, not block?" — var lives in the variable environment, not block lexical env',
            '"What\'s the scope chain?" — The chain of lexical environments from current EC to global',
          ].map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-violet-400 shrink-0 mt-0.5">→</span>
              <span className="text-slate-300">{q}</span>
            </li>
          ))}
        </ul>
      </LessonSection>

      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>
          The relationship between execution contexts, the call stack, and scope:
        </p>
        <div className="mt-4 space-y-2">
          <div className="p-3 rounded-lg border border-sky-500/30 bg-sky-950/20">
            <div className="text-xs font-semibold text-sky-300 mb-1 font-code">Call Stack (runtime)</div>
            <div className="text-xs text-slate-400">An ordered list of execution contexts. Current EC is at the top.</div>
          </div>
          <div className="flex items-center justify-center text-slate-600">↕ each EC has</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: 'Variable Env', desc: 'var declarations, function declarations (hoisted)', color: 'amber' },
              { name: 'Lexical Env', desc: 'let/const + outer env reference (scope chain)', color: 'violet' },
              { name: 'this Binding', desc: 'Set at call time (default, implicit, explicit, arrow)', color: 'emerald' },
            ].map(c => (
              <div
                key={c.name}
                className={`p-2.5 rounded-lg border text-xs text-center ${
                  c.color === 'amber' ? 'border-amber-500/30 bg-amber-950/20 text-amber-300' :
                  c.color === 'violet' ? 'border-violet-500/30 bg-violet-950/20 text-violet-300' :
                  'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                }`}
              >
                <div className="font-semibold mb-1 font-code">{c.name}</div>
                <div className="text-slate-500">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </LessonSection>

      <LessonSection id="diagram" title="Execution Context Types" icon="⚡" accent="text-amber-400">
        <ExecutionContextDiagram />
      </LessonSection>

      <LessonSection id="how" title="How it works" icon="⚙">
        <p className="font-semibold text-slate-200">Two phases for every execution context:</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-950/10">
            <div className="font-semibold text-sky-300 text-sm mb-2">Phase 1: Creation</div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Scan for <code className="font-code text-amber-300">var</code> declarations → initialize to <code className="font-code">undefined</code></li>
              <li>• Scan for <code className="font-code text-amber-300">function</code> declarations → store full function</li>
              <li>• <code className="font-code text-violet-300">let</code>/<code className="font-code text-violet-300">const</code> declared but NOT initialized (TDZ)</li>
              <li>• Set up <code className="font-code text-sky-300">this</code> binding</li>
              <li>• Set outer environment reference (scope chain)</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/10">
            <div className="font-semibold text-violet-300 text-sm mb-2">Phase 2: Execution</div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Code runs line by line</li>
              <li>• Variable assignments happen at runtime</li>
              <li>• Function calls create new ECs (pushed to stack)</li>
              <li>• <code className="font-code text-violet-300">let</code>/<code className="font-code text-violet-300">const</code> become initialized when their line is reached</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          title="hoisting-explained.js — the creation phase in action"
          className="mt-4"
          code={`// What you write:
console.log(x)        // undefined (not ReferenceError)
console.log(foo)      // [Function: foo]
console.log(y)        // ReferenceError! (TDZ)

var x = 10
function foo() { return 42 }
let y = 20

// What V8 effectively sees after the creation phase:
// var x = undefined     ← hoisted and initialized to undefined
// function foo = fn     ← hoisted and fully available
// let y = <TDZ>         ← hoisted but NOT initialized until line is reached`}
        />
      </LessonSection>

      <LessonSection id="code" title="Real code example" icon="💻">
        <CodeBlock
          title="scope-chain.js — how the scope chain uses outer env references"
          code={`const globalVar = 'global'

function outer() {
  const outerVar = 'outer'

  function inner() {
    const innerVar = 'inner'

    // inner's lexical env has a reference to outer's env
    // outer's env has a reference to global env
    console.log(innerVar)    // 'inner'    — own EC
    console.log(outerVar)    // 'outer'    — outer EC via scope chain
    console.log(globalVar)   // 'global'   — global EC via scope chain
    console.log(notExist)    // ReferenceError — not found in any EC
  }

  inner()
}

outer()

// Scope chain lookup order:
// inner EC → outer EC → global EC → undefined (→ ReferenceError if strict)`}
        />
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            { term: 'Execution Context (EC)', meaning: 'The environment created for each piece of running code. Has a variable env, lexical env, and this binding.', confusedWith: 'Scope — scope is a concept; EC is the runtime structure.' },
            { term: 'Variable Environment', meaning: 'Stores var declarations and function declarations. Subject to hoisting.', confusedWith: 'Lexical Environment — var lives here; let/const live in the lexical env.' },
            { term: 'Lexical Environment', meaning: 'Stores let/const bindings AND a reference to the outer environment (enabling the scope chain).', confusedWith: 'Execution context — the lexical env is just one component of an EC.' },
            { term: 'Scope Chain', meaning: 'The chain of outer environment references from the current EC up to the global EC. Used for variable lookup.', confusedWith: 'Prototype chain — prototype chain is for object property lookup, scope chain is for variable lookup.' },
            { term: 'Temporal Dead Zone (TDZ)', meaning: 'The period from the start of a block until a let/const declaration is reached. Accessing the variable in TDZ throws ReferenceError.', confusedWith: 'Hoisting — let/const ARE hoisted (they exist in the env), but not initialized until their declaration line.' },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Saying var is "not hoisted" for function-scoped vars',
              desc: 'var IS hoisted — to the top of its enclosing function. It\'s initialized to undefined during the creation phase, not the execution phase. That\'s why accessing var before its declaration returns undefined (not ReferenceError).',
            },
            {
              title: 'Saying let/const are "not hoisted"',
              desc: 'let/const ARE hoisted — they\'re registered in the lexical environment during the creation phase. But they\'re not initialized (TDZ). This is why accessing them before their line throws ReferenceError, not undefined.',
            },
            {
              title: 'Confusing when new execution contexts are created',
              desc: 'A new EC is created for: (1) global script start, (2) every function call, (3) eval(). Blocks ({ }) do NOT create new ECs — they create new lexical environments for let/const, but the EC is the same.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="Execution Context"
          items={[
            { label: 'Created when', value: 'Script starts (global), function is called, eval() runs' },
            { label: 'Contains', value: 'Variable env, lexical env, this binding' },
            { label: 'var hoisting', value: 'Moved to top of function EC, initialized to undefined' },
            { label: 'function hoisting', value: 'Moved to top of EC, fully available immediately' },
            { label: 'let/const hoisting', value: 'Registered in lexical env but NOT initialized (TDZ)' },
            { label: 'Scope chain', value: 'Chain of outer env refs, from current EC to global' },
            { label: 'Scope chain vs prototype', value: 'Scope = variable lookup; prototype = object property lookup' },
            { label: 'Block scope', value: 'New lexical env for let/const, but same EC — no new stack frame' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
