import { useEffect } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { EventLoopDiagram } from '../../components/diagrams/EventLoopDiagram'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm1'
const LESSON_ID = 'event-loop'

interface Props { onNavigate: NavigateFn }

export function EventLoopLesson({ onNavigate }: Props) {
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
        subtitle: 'The mechanism that makes async JavaScript possible — and predictable',
        duration: info.lesson.duration,
        status,
        onMarkComplete: () => markComplete(MODULE_ID, LESSON_ID),
        onNavigate,
        prev: adjacent.prev,
        next: adjacent.next,
      }}
    >
      {/* What it is */}
      <LessonSection id="what" title="What it is" icon="📌">
        <p>
          The event loop is a continuous process that monitors two things: the <strong className="text-slate-200">call stack</strong> and the <strong className="text-slate-200">task queues</strong>.
          When the call stack is empty, it picks the next task from a queue and pushes it onto the stack to run.
        </p>
        <p>
          JavaScript is single-threaded — one thing runs at a time. The event loop is the reason async code (setTimeout, fetch, Promises) still works without blocking the main thread.
          It doesn't make JS multi-threaded. It makes JS non-blocking.
        </p>
      </LessonSection>

      {/* Why it matters */}
      <LessonSection id="why" title="Why it matters" icon="🎯">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { heading: 'Interview Questions', desc: '"What does this code print?" — 80% of JS async interview questions test event loop knowledge.' },
            { heading: 'Debugging async bugs', desc: 'Race conditions, stale state after await, callbacks running in wrong order — all event loop mechanics.' },
            { heading: 'Performance', desc: 'Long synchronous tasks block the render step. Understanding the loop tells you where to put yields.' },
            { heading: 'Promise vs setTimeout', desc: 'Knowing microtasks drain before macrotasks explains why Promise.resolve().then runs before setTimeout(fn, 0).' },
          ].map(item => (
            <div key={item.heading} className="p-3 rounded-lg bg-surface2 border border-rim">
              <div className="text-sm font-semibold text-slate-200 mb-1">{item.heading}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      {/* Big picture */}
      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>
          In a browser, the event loop orchestrates between:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            { name: 'JS Engine (V8)', desc: 'Runs your synchronous code. Has the call stack and memory heap.', color: 'text-sky-400' },
            { name: 'Web APIs', desc: 'Browser-provided APIs for timers, fetch, DOM events, etc. Runs outside the JS thread.', color: 'text-emerald-400' },
            { name: 'Microtask Queue', desc: 'Holds resolved Promise callbacks and queueMicrotask() callbacks. Highest priority.', color: 'text-violet-400' },
            { name: 'Macrotask Queue (Task Queue)', desc: 'Holds callbacks from setTimeout, setInterval, I/O, UI events. Runs one at a time.', color: 'text-amber-400' },
            { name: 'Render Step', desc: 'Browser paints the screen. Happens between macrotasks, after microtasks drain.', color: 'text-rose-400' },
          ].map(item => (
            <li key={item.name} className="flex items-start gap-2">
              <span className={`font-code font-medium text-sm shrink-0 ${item.color}`}>{item.name}</span>
              <span className="text-slate-400 text-sm">— {item.desc}</span>
            </li>
          ))}
        </ul>
        <CalloutBox type="tip">
          In Node.js the mechanism is the same but uses libuv instead of browser Web APIs. The queues work identically — microtasks before macrotasks.
        </CalloutBox>
      </LessonSection>

      {/* Diagram */}
      <LessonSection id="diagram" title="Interactive Diagram" icon="⚡" accent="text-sky-400">
        <p className="text-slate-400 text-sm mb-4">
          Step through the execution of this code to see exactly how each line flows through the event loop.
          Pay attention to when things end up in which queue.
        </p>
        <EventLoopDiagram />
      </LessonSection>

      {/* How it works */}
      <LessonSection id="how" title="How it works" icon="⚙">
        <p className="font-semibold text-slate-200">The algorithm (simplified):</p>
        <ol className="list-decimal list-inside space-y-3 mt-3 ml-2">
          {[
            'Run all synchronous code until the call stack is empty',
            'Process ALL microtasks (Promise callbacks, queueMicrotask) — repeat until microtask queue is empty',
            'Run ONE macrotask (setTimeout, setInterval, I/O callback)',
            'Process ALL microtasks again (any that were queued during the macrotask)',
            'Browser: render/paint if needed',
            'Go to step 3',
          ].map((step, i) => (
            <li key={i} className="text-sm text-slate-300 leading-relaxed pl-1">
              <span className="font-semibold text-slate-100">{i + 1}. </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-200 mb-2">Order of execution priorities:</p>
          <div className="flex flex-wrap items-center gap-2 font-code text-xs">
            <span className="px-2 py-1 rounded bg-sky-950/30 border border-sky-500/30 text-sky-300">Sync code</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-violet-950/30 border border-violet-500/30 text-violet-300">Microtasks (all)</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300">Render (browser)</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300">One Macrotask</span>
            <span className="text-slate-600">→ repeat</span>
          </div>
        </div>
      </LessonSection>

      {/* Code example */}
      <LessonSection id="code" title="Real code example" icon="💻">
        <p className="text-sm text-slate-400 mb-4">
          This is the canonical event loop interview question. Predict the output before looking at the answer.
        </p>
        <CodeBlock
          title="event-loop-order.js"
          code={`console.log('1: script start')

setTimeout(() => {
  console.log('4: macrotask 1')
}, 0)

Promise.resolve()
  .then(() => console.log('2: microtask 1'))
  .then(() => console.log('3: microtask 2'))

setTimeout(() => {
  console.log('5: macrotask 2')
}, 0)

console.log('6: script end')`}
        />
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-sky-400 hover:text-sky-300 transition-colors select-none">
            Show output (try first!)
          </summary>
          <CodeBlock
            code={`// Output:
// 1: script start
// 6: script end
// 2: microtask 1
// 3: microtask 2
// 4: macrotask 1
// 5: macrotask 2

// Why:
// - Sync code runs first (1, 6)
// - Then ALL microtasks drain (.then chains: 2, 3)
// - Note: .then().then() — second .then queues during first microtask run
// - Then macrotasks run one at a time (4, 5)`}
          />
        </details>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-200 mb-3">Nested microtasks in a loop — a real gotcha:</p>
          <CodeBlock
            title="starvation.js — why you don't do this"
            code={`function recursiveMicrotask() {
  // ❌ This STARVES the macrotask queue — render never happens!
  Promise.resolve().then(recursiveMicrotask)
}

// Microtasks keep queueing more microtasks.
// The event loop never gets to render or run macrotasks.
// This will hang the browser tab.

// ✅ For heavy background work, use:
// setTimeout(fn, 0)       — yields to render between chunks
// requestAnimationFrame   — synced to render cycle
// scheduler.yield()       — new API, yields cooperatively`}
          />
        </div>
      </LessonSection>

      {/* Key terms */}
      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            {
              term: 'Event Loop',
              meaning: 'The continuous process that moves tasks from queues to the call stack when the stack is empty.',
              confusedWith: 'A separate thread — it runs on the same JS thread, not separately.',
            },
            {
              term: 'Microtask Queue',
              meaning: 'Queue for Promise callbacks (.then, .catch, .finally) and queueMicrotask(). Drains completely before any macrotask.',
              confusedWith: 'Task Queue / Macrotask Queue — these are different queues with different priorities.',
            },
            {
              term: 'Macrotask Queue',
              meaning: 'Queue for setTimeout, setInterval, setImmediate (Node), I/O callbacks, UI event callbacks.',
              confusedWith: 'Microtask queue — macrotasks run ONE at a time, microtasks run ALL at once.',
            },
            {
              term: 'Task',
              meaning: 'A discrete piece of work scheduled in the macrotask queue.',
              confusedWith: 'Microtask — same concept but different queue and priority.',
            },
            {
              term: 'Tick',
              meaning: 'One full cycle of the event loop: drain microtasks → run one macrotask → drain microtasks.',
              confusedWith: 'A fixed time interval — a tick is not time-based, it\'s completion-based.',
            },
            {
              term: 'Render step',
              meaning: 'Browser paints the screen. Happens between macrotasks (roughly 60fps). Long sync code blocks it.',
              confusedWith: 'Part of the JS runtime — the render step is browser-specific, not in Node.js.',
            },
          ]}
        />
      </LessonSection>

      {/* Mistakes */}
      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Assuming setTimeout(fn, 0) runs immediately',
              desc: 'setTimeout(fn, 0) does NOT run next. It queues in the macrotask queue. All current sync code AND all queued microtasks run first. In an interview, this is almost always the trick.',
            },
            {
              title: 'Not knowing microtasks > macrotasks',
              desc: 'Promise.then() runs BEFORE setTimeout even if setTimeout was scheduled first. The entire microtask queue drains before a single macrotask runs.',
            },
            {
              title: 'Blocking the main thread with synchronous loops',
              desc: 'A long for-loop or while-loop holds the call stack. The event loop cannot pick up any tasks — including UI repaints — until the loop finishes. This freezes the browser.',
            },
            {
              title: 'Infinite microtask recursion (starvation)',
              desc: 'Queueing new microtasks inside a microtask handler creates an infinite loop at the microtask level. The macrotask queue (and render) never gets a turn. Use setTimeout to yield.',
            },
            {
              title: 'Confusing async/await with parallel execution',
              desc: 'await pauses the CURRENT async function, but the call stack is freed. Other sync code can run while you\'re awaiting. Two awaited Promises only run in parallel if started before either is awaited.',
            },
          ]}
        />
      </LessonSection>

      {/* Cheat sheet */}
      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="The Event Loop"
          items={[
            { label: 'Execution order', value: 'Sync → Microtasks (all) → Render → Macrotask → Microtasks (all) → Render → ...' },
            { label: 'Microtask sources', value: 'Promise .then/.catch/.finally, async/await, queueMicrotask()' },
            { label: 'Macrotask sources', value: 'setTimeout, setInterval, setImmediate, I/O, UI events' },
            { label: 'Key rule', value: 'ALL microtasks drain before ONE macrotask runs' },
            { label: 'Blocking the loop', value: 'Long sync code holds the stack — no tasks, no render, frozen UI' },
            { label: 'Yielding to render', value: 'Use setTimeout(fn, 0) or requestAnimationFrame to yield between chunks' },
            { label: 'Node.js difference', value: 'process.nextTick queues BEFORE other microtasks (micro-microtask)' },
            { label: 'Interview output question', value: '"Sync → .then chains → setTimeout" — always this order' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
