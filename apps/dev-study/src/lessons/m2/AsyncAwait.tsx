import { useEffect } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm2'
const LESSON_ID = 'async-await'

interface Props { onNavigate: NavigateFn }

export function AsyncAwaitLesson({ onNavigate }: Props) {
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
        subtitle: 'Syntactic sugar over Promises that makes async code look synchronous — and the subtle mechanics underneath',
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
          <code className="font-code text-sky-300">async/await</code> is syntactic sugar over Promises.
          An <code className="font-code text-sky-300">async</code> function always returns a Promise.
          <code className="font-code text-sky-300"> await</code> pauses execution of the async function until the awaited Promise settles,
          then resumes with the resolved value (or throws on rejection).
        </p>
        <p>
          Under the hood, <code className="font-code text-sky-300">await</code> is <code className="font-code text-violet-300">.then()</code>.
          The async function is transformed into a state machine by the JS engine that resumes at each await point.
          Nothing new was added to the runtime — just a nicer way to write Promise chains.
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { heading: 'Readable async code', desc: 'Sequential async operations look like synchronous code — easier to read, write, and reason about.' },
            { heading: 'Error handling with try/catch', desc: 'Instead of chaining .catch(), you can use familiar try/catch blocks. Same result, more intuitive.' },
            { heading: 'Debugging', desc: 'Stack traces are more useful. You can set breakpoints inside async functions at await points.' },
            { heading: 'Loops and conditionals', desc: 'async/await works naturally with if, for, while loops. Promise chains don\'t.' },
          ].map(item => (
            <div key={item.heading} className="p-3 rounded-lg bg-surface2 border border-rim">
              <div className="text-sm font-semibold text-slate-200 mb-1">{item.heading}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>How async/await maps to Promises:</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-950/10">
            <div className="text-xs font-semibold text-sky-300 mb-3 font-code">async/await</div>
            <pre className="text-xs font-code text-slate-300 leading-relaxed">{`async function loadUser(id) {
  try {
    const res = await fetch(\`/api/\${id}\`)
    const user = await res.json()
    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}`}</pre>
          </div>
          <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/10">
            <div className="text-xs font-semibold text-violet-300 mb-3 font-code">Equivalent Promise chain</div>
            <pre className="text-xs font-code text-slate-300 leading-relaxed">{`function loadUser(id) {
  return fetch(\`/api/\${id}\`)
    .then(res => res.json())
    .then(user => user)
    .catch(err => {
      console.error(err)
      throw err
    })
}`}</pre>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">They compile to the same thing. Use whichever is more readable for the situation.</p>
      </LessonSection>

      <LessonSection id="how" title="How it works under the hood" icon="⚙">
        <p className="text-sm">
          When the engine sees <code className="font-code text-sky-300">async function foo()</code>, it wraps the function body in a Promise.
          Every <code className="font-code text-sky-300">await</code> becomes a <code className="font-code text-violet-300">.then()</code> boundary — the function is split into a generator-like state machine:
        </p>
        <CodeBlock
          className="mt-3"
          title="mental-model.js — what the engine roughly does"
          code={`// What you write:
async function example() {
  const a = await step1()
  const b = await step2(a)
  return b
}

// Roughly equivalent to (conceptual, not actual output):
function example() {
  return Promise.resolve()
    .then(() => step1())
    .then(a => step2(a))
    .then(b => b)
}

// The "suspension" mechanism:
// When 'await step1()' is reached:
// 1. The function's execution is paused
// 2. The call stack frame is removed (stack is freed!)
// 3. A microtask is queued to resume the function when step1 resolves
// 4. The event loop continues with other work
// 5. When step1 resolves, a microtask resumes the function with the value`}
        />

        <CalloutBox type="tip">
          <strong>await releases the call stack.</strong> This is why async functions don't block — they yield control back to the event loop while waiting. Other synchronous code and microtasks can run in the meantime.
        </CalloutBox>
      </LessonSection>

      <LessonSection id="code" title="Real code examples" icon="💻">
        <p className="text-sm text-slate-400 mb-3">Sequential vs parallel execution — a critical distinction:</p>
        <CodeBlock
          title="sequential-vs-parallel.ts"
          code={`// ❌ Accidentally sequential — each fetch waits for the previous
async function slowVersion() {
  const user = await fetchUser(1)      // starts, waits 300ms
  const posts = await fetchPosts(1)    // starts AFTER user resolves
  const comments = await fetchComments(1) // starts AFTER posts resolves
  // Total: ~900ms

  return { user, posts, comments }
}

// ✅ Parallel — all three start simultaneously
async function fastVersion() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),      // starts immediately
    fetchPosts(1),     // starts immediately
    fetchComments(1),  // starts immediately
  ])
  // Total: ~300ms (longest individual request)

  return { user, posts, comments }
}

// ✅ Also correct: start Promises before awaiting
async function alsoFast() {
  const userPromise = fetchUser(1)     // starts immediately
  const postsPromise = fetchPosts(1)   // starts immediately

  const user = await userPromise       // waits for first
  const posts = await postsPromise     // already running, less wait
  return { user, posts }
}`}
        />

        <div className="mt-5">
          <p className="text-sm text-slate-400 mb-3">Error handling patterns — try/catch and alternatives:</p>
          <CodeBlock
            title="error-handling.ts"
            code={`// ✅ try/catch — most readable for complex flows
async function loadData(id: string) {
  try {
    const data = await fetchData(id)
    const processed = await processData(data)
    return processed
  } catch (err) {
    if (err instanceof NetworkError) {
      return fallbackData()   // specific recovery
    }
    throw err  // re-throw unknown errors
  } finally {
    setLoading(false)  // always runs
  }
}

// ✅ Go-style error pattern — explicit error-as-value
async function safeAsync<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    return [await promise, null]
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))]
  }
}

// Usage:
const [data, err] = await safeAsync(fetchUser(id))
if (err) {
  // handle error
} else {
  // use data — TypeScript knows data is T here
}`}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm text-slate-400 mb-3">Common async patterns in React:</p>
          <CodeBlock
            title="react-async-patterns.tsx"
            code={`// Pattern 1: useEffect with async (correct way)
useEffect(() => {
  let cancelled = false

  async function load() {
    try {
      const data = await fetchData(id)
      if (!cancelled) setData(data)  // prevent setting state after unmount
    } catch (err) {
      if (!cancelled) setError(err)
    }
  }

  load()
  return () => { cancelled = true }  // cleanup on unmount/re-run
}, [id])

// ❌ Don't do this — async effect callback
useEffect(async () => {  // async here returns a Promise, not a cleanup fn!
  await fetchData()
}, [])

// Pattern 2: Event handler (async is fine here)
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  try {
    await submitForm(formData)
    router.push('/success')
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}`}
          />
        </div>
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            { term: 'async function', meaning: 'A function that always returns a Promise. return 42 becomes Promise.resolve(42). Errors become Promise.reject(err).', confusedWith: 'A function that runs asynchronously — an async function still starts synchronously, it just can suspend.' },
            { term: 'await', meaning: 'Pauses the async function until the Promise resolves. Returns the resolved value. Throws on rejection.', confusedWith: 'A blocking operation — await frees the call stack. Other code can run while awaiting.' },
            { term: 'Top-level await', meaning: 'Using await outside an async function. Supported in ES modules. Blocks module evaluation until resolved.', confusedWith: 'Regular await — top-level await only works in ES module files (.mjs or type: module).' },
            { term: 'Async IIFE', meaning: '(async () => { await ... })() — used to run async code at the top level in CommonJS (which doesn\'t support top-level await).', confusedWith: 'Top-level await — IIFE is a workaround; top-level await is the native solution in ES modules.' },
            { term: 'Promise.all with await', meaning: 'const [a, b] = await Promise.all([p1, p2]) — runs Promises in parallel, awaits all results.', confusedWith: 'Two sequential awaits — await p1; await p2 is sequential (slower)..' },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Sequential awaits when parallel is possible',
              desc: 'The most common async/await performance mistake. If two operations don\'t depend on each other, don\'t await them sequentially. Use Promise.all(). Sequential awwaits waste time proportional to the number of operations.',
            },
            {
              title: 'Async useEffect callback',
              desc: 'useEffect(() => async () => {}) — the async function returns a Promise, but useEffect expects a cleanup function (or nothing). React ignores the Promise and may log a warning. Fix: define an async function inside the effect and call it.',
            },
            {
              title: 'Not awaiting async functions that matter',
              desc: 'Calling an async function without await means you don\'t know when it finishes and unhandled rejections will go silently (in some contexts). If you don\'t need the result, at least add .catch() on the returned Promise.',
            },
            {
              title: 'try/catch not catching network errors in fetch',
              desc: 'fetch() only rejects for network failures. A 404 or 500 HTTP response is a fulfilled Promise — response.ok is false. You need to check response.ok and throw manually, or use a wrapper library like ky or axios.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="async / await"
          items={[
            { label: 'async function returns', value: 'Always a Promise. return 42 → Promise.resolve(42)' },
            { label: 'await behavior', value: 'Suspends function, frees stack, resumes when Promise settles' },
            { label: 'Parallel pattern', value: 'await Promise.all([p1, p2]) — start both, await together' },
            { label: 'Error catching', value: 'try { await ... } catch (err) { ... }' },
            { label: 'async useEffect', value: 'Define inner async fn inside effect, call it — don\'t mark effect async' },
            { label: 'fetch 404 handling', value: 'fetch resolves on 404 — check response.ok and throw manually' },
            { label: 'Top-level await', value: 'Works in ES modules (.mjs / type: "module") only' },
            { label: 'Stale closure risk', value: 'await inside useEffect/useCallback — include deps correctly' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
