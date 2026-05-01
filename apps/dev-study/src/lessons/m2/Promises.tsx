import { useEffect, useState } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm2'
const LESSON_ID = 'promises'

interface Props { onNavigate: NavigateFn }

function PromiseStateDiagram() {
  const [state, setState] = useState<'pending' | 'fulfilled' | 'rejected'>('pending')

  return (
    <div className="rounded-xl border border-rim bg-surface p-4">
      <div className="text-xs text-slate-500 mb-4 font-code">PROMISE STATE MACHINE — click to explore</div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Pending */}
        <button
          onClick={() => setState('pending')}
          className={`flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer ${
            state === 'pending'
              ? 'border-amber-500/60 bg-amber-950/30 glow-amber'
              : 'border-rim bg-surface2 hover:border-amber-500/30'
          }`}
        >
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mb-2" />
          <div className="text-sm font-semibold text-amber-300 font-code">pending</div>
          <div className="text-xs text-slate-500 mt-1">initial state</div>
        </button>

        {/* Arrows */}
        <div className="flex flex-col gap-3 items-center text-slate-600">
          <div className="flex items-center gap-1">
            <span className="text-xs text-emerald-500">resolve(val)</span>
            <span>→</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-rose-500">reject(err)</span>
            <span>→</span>
          </div>
        </div>

        {/* Fulfilled */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setState('fulfilled')}
            className={`flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer ${
              state === 'fulfilled'
                ? 'border-emerald-500/60 bg-emerald-950/30 glow-emerald'
                : 'border-rim bg-surface2 hover:border-emerald-500/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-2">
              <span className="text-emerald-300 text-lg">✓</span>
            </div>
            <div className="text-sm font-semibold text-emerald-300 font-code">fulfilled</div>
            <div className="text-xs text-slate-500 mt-1">has a value</div>
          </button>
          <button
            onClick={() => setState('rejected')}
            className={`flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer ${
              state === 'rejected'
                ? 'border-rose-500/60 bg-rose-950/30 glow-rose'
                : 'border-rim bg-surface2 hover:border-rose-500/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center mb-2">
              <span className="text-rose-300 text-lg">✕</span>
            </div>
            <div className="text-sm font-semibold text-rose-300 font-code">rejected</div>
            <div className="text-xs text-slate-500 mt-1">has a reason</div>
          </button>
        </div>
      </div>

      {/* State description */}
      <div className="mt-4 p-3 rounded-lg border border-rim2 bg-surface2 text-sm">
        {state === 'pending' && (
          <div className="text-amber-200/80">
            <strong className="text-amber-300">Pending:</strong> The initial state. The async operation hasn't completed yet.
            A pending Promise can transition to fulfilled or rejected — but never back to pending, and never between fulfilled/rejected.
          </div>
        )}
        {state === 'fulfilled' && (
          <div className="text-emerald-200/80">
            <strong className="text-emerald-300">Fulfilled:</strong> The operation completed successfully. The Promise has a value.
            <code className="font-code mx-1 text-emerald-300">.then(onFulfilled)</code> handlers are queued in the microtask queue.
            This state is permanent — once fulfilled, always fulfilled with the same value.
          </div>
        )}
        {state === 'rejected' && (
          <div className="text-rose-200/80">
            <strong className="text-rose-300">Rejected:</strong> The operation failed. The Promise has a reason (usually an Error).
            <code className="font-code mx-1 text-rose-300">.catch(onRejected)</code> or <code className="font-code text-rose-300">.then(null, onRejected)</code> handlers run.
            An unhandled rejection will throw in Node.js and warn in browsers.
          </div>
        )}
      </div>
    </div>
  )
}

export function PromisesLesson({ onNavigate }: Props) {
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
        subtitle: 'The building block of all async JavaScript — how async operations return their eventual result',
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
          A Promise is an object representing the <strong className="text-slate-200">eventual completion (or failure) of an async operation</strong>.
          It's a proxy for a value that isn't available yet, but will be at some point in the future.
        </p>
        <p>
          A Promise can be in one of three mutually exclusive states: <strong className="text-amber-300">pending</strong>,
          <strong className="text-emerald-300"> fulfilled</strong>, or <strong className="text-rose-300"> rejected</strong>.
          Once settled (fulfilled or rejected), it's permanent — that state never changes.
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <p>
          Before Promises, async code used callbacks — which led to "callback hell" (deeply nested code that's hard to read and error-prone).
          Promises solve this with a chainable API and composable error handling.
        </p>
        <p className="mt-2">
          Promises are the foundation of <code className="font-code text-sky-300">async/await</code> —
          <code className="font-code text-sky-300"> await</code> is literally just syntactic sugar over <code className="font-code text-sky-300">.then()</code>.
          Understanding Promises means understanding async/await under the hood.
        </p>
      </LessonSection>

      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>Promises in the async ecosystem:</p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Promise', desc: 'Core primitive. All async APIs return them.', color: 'sky' },
            { name: 'async/await', desc: 'Syntactic sugar over Promise .then/.catch.', color: 'violet' },
            { name: 'fetch, fs.promises', desc: 'APIs that return Promises.', color: 'amber' },
          ].map(c => (
            <div key={c.name} className={`p-3 rounded-lg border text-xs ${
              c.color === 'sky' ? 'border-sky-500/30 bg-sky-950/20 text-sky-300' :
              c.color === 'violet' ? 'border-violet-500/30 bg-violet-950/20 text-violet-300' :
              'border-amber-500/30 bg-amber-950/20 text-amber-300'
            }`}>
              <div className="font-code font-semibold mb-1">{c.name}</div>
              <div className="text-slate-400">{c.desc}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="diagram" title="Promise States" icon="⚡" accent="text-sky-400">
        <PromiseStateDiagram />
      </LessonSection>

      <LessonSection id="how" title="How it works" icon="⚙">
        <p className="text-sm">
          A Promise is created with the <code className="font-code text-sky-300">Promise</code> constructor, which takes an
          <strong className="text-slate-200"> executor function</strong> that receives <code className="font-code text-emerald-300">resolve</code> and
          <code className="font-code text-rose-300"> reject</code>:
        </p>
        <CodeBlock
          className="mt-3"
          code={`const promise = new Promise((resolve, reject) => {
  // Executor runs synchronously (!)
  // Call resolve(value) to fulfill
  // Call reject(error) to reject
  // Only the first call matters — subsequent calls are ignored

  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success!')    // → fulfilled
    } else {
      reject(new Error('failed'))  // → rejected
    }
  }, 1000)
})`}
        />

        <p className="mt-4 text-sm">
          <strong className="text-slate-200">.then() chaining:</strong> Each .then() returns a new Promise.
          The resolved value of each .then() is passed as the argument to the next.
        </p>
        <CodeBlock
          className="mt-2"
          code={`fetch('/api/user/1')
  .then(res => res.json())          // transforms Response → parsed JSON
  .then(user => user.profileId)     // extracts a field
  .then(id => fetch(\`/api/profile/\${id}\`))  // makes another request
  .then(res => res.json())
  .catch(err => {
    // catches ANY rejection in the chain above
    console.error('Something failed:', err)
  })
  .finally(() => {
    // always runs, regardless of success or failure
    setLoading(false)
  })`}
        />
      </LessonSection>

      <LessonSection id="code" title="Real code examples" icon="💻">
        <p className="text-sm text-slate-400 mb-3">Promise.all, Promise.race, and friends:</p>
        <CodeBlock
          title="promise-combinators.ts"
          code={`// Promise.all — all succeed or fail fast
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id),
])
// If ANY rejects → entire Promise.all rejects immediately

// Promise.allSettled — all complete, regardless of outcome
const results = await Promise.allSettled([
  fetchUser(id),
  fetchPosts(id),   // even if this rejects...
  fetchComments(id) // ...this still runs
])
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value)
  else console.error(r.reason) // r.status === 'rejected'
})

// Promise.race — first to settle wins (fulfil OR reject)
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 3000)
  )
])

// Promise.any — first to FULFILL wins (ignores rejections)
const fastestSource = await Promise.any([
  fetchFromPrimary(),
  fetchFromFallback(),
  fetchFromCache(),
])
// Only throws AggregateError if ALL reject`}
        />

        <div className="mt-5">
          <p className="text-sm text-slate-400 mb-3">Promise constructor patterns — promisifying a callback API:</p>
          <CodeBlock
            title="promisify.ts"
            code={`import { readFile } from 'fs'

// Convert callback-based API to Promise
function readFileAsync(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// Usage
const content = await readFileAsync('./config.json')

// Node.js has util.promisify for this exact pattern:
import { promisify } from 'util'
const readFileP = promisify(readFile)
const content2 = await readFileP('./config.json', 'utf-8')`}
          />
        </div>

        <CalloutBox type="warning">
          <strong>Unhandled rejections crash Node.js</strong> (and show warnings in browsers). Always add a .catch() or use a try/catch around await. Even if you "don't need" to handle the error, add <code className="font-code">.catch(console.error)</code> at minimum.
        </CalloutBox>
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            { term: 'Promise', meaning: 'An object representing the eventual result of an async operation. Has states: pending, fulfilled, rejected.', confusedWith: 'A callback — Promises replace callbacks but serve a similar purpose.' },
            { term: 'Executor', meaning: 'The function passed to new Promise(executor). Runs synchronously. Receives resolve and reject.', confusedWith: 'The callback passed to .then() — that\'s a handler, not the executor.' },
            { term: 'resolve / reject', meaning: 'Functions passed to the executor. Calling resolve(val) fulfills the Promise; calling reject(err) rejects it.', confusedWith: 'Return values — calling resolve doesn\'t return anything; it settles the Promise as a side effect.' },
            { term: '.then()', meaning: 'Registers a handler for fulfillment. Returns a new Promise. Chains.', confusedWith: '.catch() — .catch(fn) is shorthand for .then(null, fn).' },
            { term: 'Promise.all()', meaning: 'Takes an array of Promises. Resolves with all values if all succeed. Rejects immediately if any reject (fail-fast).', confusedWith: 'Promise.allSettled() — .allSettled() waits for all, regardless of outcome.' },
            { term: 'Thenable', meaning: 'Any object with a .then() method. Promise.resolve() wraps them. This is why async functions can return any thenable.', confusedWith: 'A Promise — a thenable isn\'t necessarily a native Promise.' },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Returning inside .then() vs not returning',
              desc: 'If you return a value from .then(), the next .then() receives it. If you return a Promise, the chain waits for it. If you forget to return (or return undefined), the next .then() gets undefined — a silent bug.',
            },
            {
              title: 'Creating a new Promise unnecessarily (Promise constructor anti-pattern)',
              desc: 'Don\'t wrap an existing Promise in new Promise(). This is the "explicit Promise construction anti-pattern". Just return the existing Promise, or use .then() to transform it.',
            },
            {
              title: 'Promise.all failing fast without cleanup',
              desc: 'Promise.all rejects the moment ONE Promise rejects — but the other Promises don\'t stop running. Any side effects (DB writes, API calls) from the other Promises may still happen. Use AbortController for cancellation.',
            },
            {
              title: 'Not knowing async/await is Promise sugar',
              desc: 'An async function always returns a Promise. await is just .then() with nicer syntax. async function { return 42 } is equivalent to Promise.resolve(42). In interviews: "async/await compiles to Promise chains at the transpiler level."',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="Promises"
          items={[
            { label: 'States', value: 'pending → fulfilled (has value) or rejected (has reason)' },
            { label: 'Settlement', value: 'Permanent — once settled, never changes state' },
            { label: '.then(fn)', value: 'Runs fn on fulfillment. Returns new Promise.' },
            { label: '.catch(fn)', value: 'Shorthand for .then(null, fn). Catches any rejection in chain.' },
            { label: '.finally(fn)', value: 'Runs fn always (no args). Returns original Promise.' },
            { label: 'Promise.all()', value: 'All succeed → all values. Any fail → immediate rejection.' },
            { label: 'Promise.allSettled()', value: 'All complete → array of {status, value/reason}' },
            { label: 'Promise.race()', value: 'First to settle (success or fail) wins' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
