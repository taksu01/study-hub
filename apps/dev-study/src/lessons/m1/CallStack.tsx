import { useEffect } from 'react'
import type { NavigateFn } from '../../types'
import { getAdjacentLessons, getModule, getLesson } from '../../data/curriculum'
import { useProgress } from '../../hooks/useProgress'
import { LessonLayout, LessonSection, KeyTermsTable, MistakesBox, CheatSheet, CalloutBox } from '../../components/LessonLayout'
import { CallStackDiagram } from '../../components/diagrams/CallStackDiagram'
import { CodeBlock } from '../../components/CodeBlock'

const MODULE_ID = 'm1'
const LESSON_ID = 'call-stack'

interface Props { onNavigate: NavigateFn }

export function CallStackLesson({ onNavigate }: Props) {
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
        subtitle: 'The mechanism that tracks where JavaScript currently is in your code',
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
          The call stack is a <strong className="text-slate-200">LIFO (Last In, First Out)</strong> data structure that tracks function calls.
          When a function is called, a new <em>stack frame</em> is pushed onto the stack. When the function returns, its frame is popped off.
          The function currently executing is always at the top.
        </p>
        <p>
          It's how JavaScript knows where it is in your code, what the current scope is, and where to return to after a function finishes.
        </p>
      </LessonSection>

      <LessonSection id="why" title="Why it matters" icon="🎯">
        <p>
          The call stack explains:
        </p>
        <ul className="space-y-2 mt-2">
          {[
            'Why stack traces in errors are top-to-bottom (most recent call is listed first)',
            'Why recursion without a base case crashes with "Maximum call stack size exceeded"',
            'Why async functions free the stack while waiting (enabling other code to run)',
            'How the engine knows which scope\'s variables are accessible at any point',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-amber-400 mt-0.5 shrink-0">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </LessonSection>

      <LessonSection id="big-picture" title="Big picture" icon="🗺">
        <p>
          The call stack is part of the <strong className="text-slate-200">JavaScript engine</strong> (V8, SpiderMonkey, etc.).
          It works alongside the memory heap and is managed by the event loop:
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          {[
            { name: 'Call Stack', desc: 'Execution tracking. LIFO. Bounded in size.', color: 'sky' },
            { name: 'Memory Heap', desc: 'Unstructured region for object/closure storage.', color: 'violet' },
            { name: 'Event Loop', desc: 'Pushes callbacks onto stack when stack is empty.', color: 'amber' },
          ].map(item => (
            <div
              key={item.name}
              className={`p-3 rounded-lg border text-xs ${
                item.color === 'sky' ? 'border-sky-500/30 bg-sky-950/20 text-sky-300' :
                item.color === 'violet' ? 'border-violet-500/30 bg-violet-950/20 text-violet-300' :
                'border-amber-500/30 bg-amber-950/20 text-amber-300'
              }`}
            >
              <div className="font-semibold mb-1">{item.name}</div>
              <div className="text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="diagram" title="Interactive Diagram" icon="⚡" accent="text-amber-400">
        <p className="text-slate-400 text-sm mb-4">
          Step through three examples: a normal call, an infinite recursion (stack overflow), and an async function suspending.
        </p>
        <CallStackDiagram />
      </LessonSection>

      <LessonSection id="how" title="How it works" icon="⚙">
        <p>Each function call creates a <strong className="text-slate-200">stack frame</strong> that stores:</p>
        <ul className="mt-3 space-y-1.5">
          {[
            { item: 'Function arguments', desc: 'Values passed to the function' },
            { item: 'Local variables', desc: 'Declared with var/let/const inside the function' },
            { item: 'Return address', desc: 'Where execution should resume after this function returns' },
            { item: 'this binding', desc: 'The value of this for this call' },
          ].map(({ item, desc }) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-sky-400 font-code shrink-0">•</span>
              <span><strong className="text-slate-200">{item}</strong> — {desc}</span>
            </li>
          ))}
        </ul>

        <CodeBlock
          title="what-a-stack-trace-tells-you.js"
          className="mt-4"
          code={`function third() {
  throw new Error('Something broke')
}

function second() {
  third() // called from here
}

function first() {
  second() // called from here
}

first()

// Stack trace you'd see:
// Error: Something broke
//     at third (example.js:2:9)     ← most recent call (top of stack)
//     at second (example.js:6:3)
//     at first (example.js:10:3)
//     at example.js:13:1            ← oldest call (bottom of stack)
//
// Read bottom-up for call order, top-down for "where it broke"`}
        />

        <CalloutBox type="info" >
          Stack frames for the same function are independent. If <code className="font-code text-sky-300">foo()</code> calls <code className="font-code text-sky-300">foo()</code> recursively,
          each call gets its own frame with its own local variables. That's why recursion works — until you run out of stack space.
        </CalloutBox>
      </LessonSection>

      <LessonSection id="code" title="Real code example" icon="💻">
        <p className="text-sm text-slate-400 mb-3">Stack overflow and how to fix it:</p>
        <CodeBlock
          title="recursion.js"
          code={`// ❌ Stack overflow — no base case
function factorial(n) {
  return n * factorial(n - 1) // calls forever
}
factorial(5) // RangeError: Maximum call stack size exceeded

// ✅ Fixed with a base case
function factorial(n) {
  if (n <= 1) return 1      // base case: stops recursion
  return n * factorial(n - 1)
}
factorial(5) // 120  (5 * 4 * 3 * 2 * 1)

// ✅ Also fixed with tail call optimization (in strict mode)
// Modern engines optimize this to not grow the stack
function factorial(n, acc = 1) {
  'use strict'
  if (n <= 1) return acc
  return factorial(n - 1, n * acc) // tail call
}`}
        />

        <div className="mt-4">
          <p className="text-sm text-slate-400 mb-3">async/await clears the stack while waiting:</p>
          <CodeBlock
            title="async-stack.js"
            code={`async function fetchUser(id) {
  // Stack: [fetchUser]
  const res = await fetch(\`/api/users/\${id}\`)
  // After await: stack is EMPTY until fetch resolves.
  // Other code can run here (event loop is free).
  // Stack: [fetchUser] ← resumes with a new frame
  return res.json()
}

// This is why async functions don't block the UI.
// The engine suspends the function, frees the stack,
// and resumes it later via the microtask queue.`}
          />
        </div>
      </LessonSection>

      <LessonSection id="terms" title="Key terms" icon="📖">
        <KeyTermsTable
          terms={[
            {
              term: 'Call Stack',
              meaning: 'LIFO structure tracking active function calls. One frame per call. Bounded in size (usually ~10k frames).',
              confusedWith: 'The memory heap — heap stores data, stack tracks execution.',
            },
            {
              term: 'Stack Frame',
              meaning: 'A record pushed for each function call. Contains local vars, arguments, return address, this.',
              confusedWith: 'A scope — a scope is a concept; a frame is the physical runtime structure.',
            },
            {
              term: 'Stack Overflow',
              meaning: 'The call stack exceeds its maximum size. Usually infinite recursion. RangeError thrown.',
              confusedWith: 'Memory leak — a leak is about the heap, overflow is about the stack.',
            },
            {
              term: 'Stack Trace',
              meaning: 'A snapshot of the call stack at the point of an error. Shows exactly what called what.',
              confusedWith: 'Console logs — a trace is automatic on error; logs are manual.',
            },
            {
              term: 'LIFO',
              meaning: 'Last In, First Out. The last function pushed is the first to be popped (return executed).',
              confusedWith: 'FIFO (First In, First Out) — queues are FIFO, stacks are LIFO.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes & interview traps" icon="⚠">
        <MistakesBox
          mistakes={[
            {
              title: 'Reading stack traces bottom-up by mistake',
              desc: 'The top of a stack trace is the most recent function (where the error occurred). The bottom is where execution started. To understand "how did we get here", read from bottom to top.',
            },
            {
              title: 'Forgetting that async/await creates two stack frames',
              desc: 'An async function is suspended and resumed. The stack frame at the await point is essentially saved in a Promise. When it resumes, a fresh frame is created. Some debuggers show "async" frames separately.',
            },
            {
              title: 'Thinking infinite recursion crashes immediately',
              desc: 'Engines allow a certain stack depth (typically thousands of frames) before throwing. Deep recursion on large inputs may be slow before it crashes.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="cheatsheet" title="Cheat sheet" icon="📋">
        <CheatSheet
          title="The Call Stack"
          items={[
            { label: 'Data structure', value: 'LIFO stack — last in, first out' },
            { label: 'What\'s stored', value: 'Local vars, args, return address, this — per frame' },
            { label: 'Stack overflow', value: 'RangeError: Maximum call stack size exceeded' },
            { label: 'Cause of overflow', value: 'Usually infinite recursion (no base case)' },
            { label: 'async/await effect', value: 'Suspends frame, frees stack, resumes via microtask' },
            { label: 'Stack trace reading', value: 'Top = where error happened, bottom = where it started' },
            { label: 'Max depth', value: 'Engine-dependent, typically ~10,000–15,000 frames' },
            { label: 'Node.js flag', value: '--stack-size=N to change stack size (bytes)' },
          ]}
        />
      </LessonSection>
    </LessonLayout>
  )
}
