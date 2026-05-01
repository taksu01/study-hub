import { useEffect } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm1'
const LESSON_ID = 'js-engine'

interface Props { onNavigate: NavigateFn }

function V8PipelineDiagram() {
  const stages = [
    { name: 'Source Code', desc: 'Your .js file', icon: '📄', color: 'sky' },
    { name: 'Parser', desc: 'Builds AST', icon: '🔍', color: 'sky' },
    { name: 'AST', desc: 'Abstract Syntax Tree', icon: '🌳', color: 'sky' },
    { name: 'Ignition', desc: 'Bytecode interpreter', icon: '🔥', color: 'amber' },
    { name: 'Bytecode', desc: 'Compact instructions', icon: '⚡', color: 'amber' },
    { name: 'TurboFan', desc: 'Optimizing JIT compiler', icon: '🚀', color: 'emerald' },
    { name: 'Machine Code', desc: 'Native CPU instructions', icon: '🖥', color: 'emerald' },
  ]

  const colorMap: Record<string, string> = {
    sky: 'border-sky-500/40 bg-sky-950/20 text-sky-300',
    amber: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
    emerald: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
  }

  return (
    <div className="rounded-xl border border-rim bg-surface p-4">
      <div className="text-xs text-slate-500 mb-3 font-code">V8 COMPILATION PIPELINE</div>
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2">
            <div className={`flex flex-col items-center p-2.5 rounded-lg border text-center min-w-[80px] ${colorMap[stage.color]}`}>
              <span className="text-lg mb-1">{stage.icon}</span>
              <div className="text-xs font-semibold font-code">{stage.name}</div>
              <div className="text-xs opacity-70 mt-0.5 leading-tight">{stage.desc}</div>
            </div>
            {i < stages.length - 1 && (
              <span className="text-slate-600 text-lg">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-950/10 text-xs text-amber-200/80">
        💡 V8 starts running bytecode immediately (fast startup). TurboFan compiles "hot" functions to native code on the fly (peak performance). This is JIT — Just-In-Time compilation.
      </div>
    </div>
  )
}

export function JSEngineLesson({ onNavigate }: Props) {
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
        subtitle: 'What happens between writing code and the CPU executing it',
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
          A JavaScript engine is a program that reads, understands, and executes JavaScript code.
          The most widely used engine is <strong className="text-slate-200">V8</strong> — built by Google, used in Chrome and Node.js.
          Other notable engines: SpiderMonkey (Firefox), JavaScriptCore (Safari/Bun).
        </p>
        <p>
          V8 doesn't just interpret JavaScript line-by-line. It compiles it — first to bytecode,
          then (for frequently run code) to optimized machine code via a process called
          <strong className="text-slate-200"> JIT compilation</strong>.
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { heading: 'Performance intuition', desc: 'Understanding JIT explains why "hot" code is fast, why type-changing variables are slow, and why object shape matters.' },
            { heading: 'V8 optimizations', desc: 'Hidden classes, inline caching — knowing these helps you write code that V8 can optimize aggressively.' },
            { heading: 'Compilation pipeline', desc: 'Parsing → AST → bytecode → machine code. Every source file goes through this. Slower parse = slower startup.' },
            { heading: 'Engine-specific behavior', desc: 'Some JS behavior (e.g. deoptimization, string interning) is engine-specific. This matters for performance-critical code.' },
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
          The JS engine is one component of a larger runtime. In a browser:
        </p>
        <div className="mt-4 p-4 rounded-xl border border-rim bg-surface space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-24 shrink-0 text-xs text-right text-slate-500 pt-0.5">Browser Runtime</div>
            <div className="flex-1 space-y-2">
              <div className="p-2.5 rounded-lg border border-sky-500/30 bg-sky-950/20">
                <div className="text-xs font-semibold text-sky-300 mb-1">V8 Engine (Chrome)</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Call Stack', desc: 'Execution context' },
                    { name: 'Heap', desc: 'Memory allocation' },
                  ].map(c => (
                    <div key={c.name} className="p-2 rounded bg-sky-950/30 border border-sky-500/20 text-xs">
                      <span className="text-sky-200 font-medium">{c.name}</span>
                      <span className="text-slate-500 ml-1">— {c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                <div className="text-xs font-semibold text-emerald-300 mb-1">Web APIs</div>
                <div className="flex flex-wrap gap-1">
                  {['DOM', 'setTimeout', 'fetch', 'WebSocket', 'WebWorkers', 'localStorage'].map(api => (
                    <span key={api} className="text-xs px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 font-code">{api}</span>
                  ))}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20">
                <div className="text-xs font-semibold text-amber-300 mb-1">Event Loop + Task Queues</div>
                <div className="text-xs text-slate-400">Coordinates when callbacks run</div>
              </div>
            </div>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="diagram" title="V8 Pipeline" icon="⚡" accent="text-amber-400">
        <V8PipelineDiagram />
      </LessonSection>

      <LessonSection id="how" title="How it works — V8 pipeline" icon="⚙">
        <div className="space-y-4">
          {[
            {
              step: '1. Parsing',
              color: 'sky',
              desc: 'V8\'s parser reads source code and builds an Abstract Syntax Tree (AST). The AST is a tree representation of your code\'s structure. Syntax errors are caught here.',
              detail: 'Two phases: scanner (tokenizes) then parser (builds AST). V8 uses lazy parsing — it parses function bodies on demand rather than all at startup.',
            },
            {
              step: '2. Ignition — Bytecode',
              color: 'amber',
              desc: 'Ignition (V8\'s interpreter) walks the AST and generates bytecode — a compact, platform-independent instruction set. Bytecode starts executing immediately.',
              detail: 'Starting execution from bytecode (not machine code) enables fast startup. For code that only runs once (startup code), bytecode is fine.',
            },
            {
              step: '3. TurboFan — JIT Compilation',
              color: 'emerald',
              desc: 'For "hot" functions (called many times), TurboFan compiles bytecode to optimized machine code. This is JIT (Just-In-Time) compilation.',
              detail: 'TurboFan makes assumptions about types. If a function always receives numbers, it generates specialized number code. If you later call it with a string — deoptimization happens, slow path runs.',
            },
          ].map(item => (
            <div
              key={item.step}
              className={`p-4 rounded-xl border ${
                item.color === 'sky' ? 'border-sky-500/30 bg-sky-950/10' :
                item.color === 'amber' ? 'border-amber-500/30 bg-amber-950/10' :
                'border-emerald-500/30 bg-emerald-950/10'
              }`}
            >
              <div className={`font-semibold text-sm mb-2 ${
                item.color === 'sky' ? 'text-sky-300' :
                item.color === 'amber' ? 'text-amber-300' : 'text-emerald-300'
              }`}>{item.step}</div>
              <p className="text-sm text-slate-300 mb-2">{item.desc}</p>
              <p className="text-xs text-slate-500 italic">{item.detail}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="code" title="Real code example" icon="💻">
        <p className="text-sm text-slate-400 mb-3">Writing V8-friendly code — help the JIT optimizer:</p>
        <CodeBlock
          title="v8-optimization.js"
          code={`// ❌ Polymorphic — V8 can't optimize well
//    addNumbers is called with different types
function addNumbers(a, b) {
  return a + b
}
addNumbers(1, 2)          // number + number
addNumbers('hello', ' !')  // string + string  ← deoptimizes!

// ✅ Monomorphic — consistent types, V8 inlines + optimizes
function addInts(a, b) { return a + b }
function concatStrings(a, b) { return a + b }

// ❌ Changing object shape mid-flight (hidden class changes)
const obj = {}
obj.x = 1    // V8 creates hidden class 1
obj.y = 2    // V8 creates hidden class 2 — new allocation!
obj.z = 3    // V8 creates hidden class 3 — deoptimization risk

// ✅ Initialize all properties upfront (consistent hidden class)
const obj2 = { x: 1, y: 2, z: 3 }  // one hidden class, stable

// ✅ V8 DevTools: check what V8 thinks
// Run Node with --allow-natives-syntax
function monomorphic(a, b) { return a + b }
monomorphic(1, 2)
monomorphic(3, 4)
// %OptimizeFunctionOnNextCall(monomorphic)
// monomorphic(5, 6)
// console.log(%GetOptimizationStatus(monomorphic))
// 1 = optimized, 2 = not optimized, 65 = always optimized`}
        />

        <CalloutBox type="warning">
          In practice, don't micro-optimize for V8 in application code — the engine is extremely smart.
          These patterns matter in library/framework-level hot paths, or when you're seeing unexpected perf cliffs.
        </CalloutBox>
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            { term: 'V8', meaning: 'Google\'s JS engine. Used in Chrome and Node.js. Open source, written in C++.', confusedWith: 'Node.js — Node.js is a runtime that includes V8, plus I/O APIs (libuv).' },
            { term: 'AST', meaning: 'Abstract Syntax Tree. Tree structure representing code. Created by the parser. Not executable.', confusedWith: 'Bytecode — AST is intermediate parsing output, bytecode is executable instructions.' },
            { term: 'Bytecode', meaning: 'Compact, platform-independent instructions. What Ignition interprets. Faster to generate than machine code.', confusedWith: 'Machine code — bytecode is still interpreted; machine code runs directly on the CPU.' },
            { term: 'JIT', meaning: 'Just-In-Time compilation. Compiles to native machine code at runtime, for "hot" code.', confusedWith: 'AOT (Ahead-of-Time) compilation like TypeScript — JIT happens while the program runs.' },
            { term: 'TurboFan', meaning: 'V8\'s optimizing JIT compiler. Generates fast native code for frequently-called functions.', confusedWith: 'Ignition — Ignition is the bytecode interpreter; TurboFan optimizes hot functions.' },
            { term: 'Deoptimization', meaning: 'When TurboFan\'s type assumptions prove wrong (e.g., you pass a string to a number-optimized function), V8 falls back to bytecode.', confusedWith: 'A bug — deoptimization is a safety mechanism, not a failure.' },
            { term: 'Hidden class', meaning: 'V8\'s internal representation of object shapes. Objects with the same property order share a hidden class, enabling fast property access.', confusedWith: 'JS classes — these are engine internals, not user-facing.' },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Confusing "interpreted" vs "compiled"',
              desc: 'JS is not purely interpreted anymore. V8 compiles hot code to machine code via JIT. The correct answer: "JS is compiled, but JIT-compiled at runtime." TypeScript adds a separate compile step to JS, which is AOT.',
            },
            {
              title: 'Not knowing what V8 is',
              desc: 'In interviews: "What JS engine does Chrome use?" → V8. "What about Node?" → Also V8. "Safari?" → JavaScriptCore (JSC). "Firefox?" → SpiderMonkey.',
            },
            {
              title: 'Changing object property order after initialization',
              desc: 'V8 creates a hidden class based on the order properties are added. Adding properties in different orders creates different hidden classes, preventing optimizations. Always initialize objects with all properties upfront.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="JS Engine & V8"
          items={[
            { label: 'Chrome/Node engine', value: 'V8 (Google, C++, open source)' },
            { label: 'Firefox engine', value: 'SpiderMonkey' },
            { label: 'Safari/Bun engine', value: 'JavaScriptCore (JSC)' },
            { label: 'V8 pipeline', value: 'Source → Parser → AST → Ignition (bytecode) → TurboFan (JIT)' },
            { label: 'JIT', value: 'Just-In-Time: compiles hot code to native machine code at runtime' },
            { label: 'Deoptimization', value: 'TurboFan reverts to bytecode when type assumptions break' },
            { label: 'Hidden classes', value: 'V8 internal: same property order → same class → fast access' },
            { label: 'Practical tip', value: 'Init all object props upfront; keep function argument types consistent' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
