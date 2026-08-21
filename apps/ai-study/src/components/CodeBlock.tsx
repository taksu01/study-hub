import { useMemo, useState, type ReactNode } from 'react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import type { CodeTab } from '../types'

/* ── Minimal syntax highlighter ───────────────────────
   A full grammar engine (Prism/Shiki) is ~40kB+ for a study app that shows a
   dozen snippets. This regex pass covers the four languages we actually use
   and degrades to plain text for anything else.                            */

const KEYWORDS: Record<string, string[]> = {
  python: ['import', 'from', 'def', 'class', 'return', 'if', 'elif', 'else', 'for',
    'while', 'in', 'not', 'and', 'or', 'with', 'as', 'try', 'except', 'finally',
    'raise', 'lambda', 'None', 'True', 'False', 'async', 'await', 'yield', 'pass'],
  javascript: ['import', 'from', 'export', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'of', 'in', 'new', 'class', 'extends',
    'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'null',
    'undefined', 'true', 'false'],
  typescript: ['import', 'from', 'export', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'of', 'in', 'new', 'class', 'extends',
    'interface', 'type', 'async', 'await', 'try', 'catch', 'throw', 'typeof',
    'null', 'undefined', 'true', 'false'],
  bash: ['curl', 'npm', 'npx', 'pip', 'ollama', 'docker', 'cd', 'export', 'echo',
    'git', 'node', 'python', 'python3', 'sudo', 'brew', 'winget', 'set'],
  json: ['true', 'false', 'null'],
  text: [],
}

type Piece = { t: string; c?: string }

function highlight(code: string, lang: string): Piece[][] {
  const kw = new Set(KEYWORDS[lang] ?? [])
  const commentStart = lang === 'python' || lang === 'bash' ? '#' : '//'

  return code.split('\n').map(line => {
    const trimmed = line.trimStart()
    if (trimmed.startsWith(commentStart)) return [{ t: line, c: 'text-slate-500 italic' }]

    const pieces: Piece[] = []
    // strings | numbers | called identifiers | identifiers | whitespace | symbols
    const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d"']+)/g

    for (const m of line.matchAll(re)) {
      const [full, str, num, call, ident, ws, sym] = m
      if (str) pieces.push({ t: full, c: 'text-emerald-300' })
      else if (num) pieces.push({ t: full, c: 'text-amber-300' })
      else if (call) pieces.push({ t: full, c: kw.has(call) ? 'text-violet-300 font-medium' : 'text-sky-300' })
      else if (ident) pieces.push({ t: full, c: kw.has(ident) ? 'text-violet-300 font-medium' : undefined })
      else if (ws) pieces.push({ t: full })
      else if (sym) pieces.push({ t: full, c: 'text-slate-400' })
    }
    return pieces.length ? pieces : [{ t: line }]
  })
}

/* ── Copy button ──────────────────────────────────── */
export function CopyButton({ value, tone = 'dark' }: { value: string; tone?: 'dark' | 'light' }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard API needs a secure context — fall back to a hidden textarea
      // so this still works when the app is opened over plain http on the LAN.
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* give up silently */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const base = 'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0'
  const skin = tone === 'dark'
    ? 'bg-slate-700/60 hover:bg-slate-600 text-slate-200'
    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'

  return (
    <button onClick={copy} className={`${base} ${skin}`} aria-label="Copy to clipboard">
      {copied
        ? <><Check className="w-3.5 h-3.5" aria-hidden />Copied</>
        : <><Copy className="w-3.5 h-3.5" aria-hidden />Copy</>}
    </button>
  )
}

/* ── CodeBlock ────────────────────────────────────── */

interface CodeBlockProps {
  tabs: CodeTab[]
  title?: string
  /** Lines to show before clamping. Longer blocks collapse behind a toggle. */
  maxLines?: number
}

export function CodeBlock({ tabs, title, maxLines = 18 }: CodeBlockProps) {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const tab = tabs[active]
  const lines = useMemo(() => highlight(tab.code, tab.language), [tab])
  const clamped = lines.length > maxLines && !expanded
  const shown = clamped ? lines.slice(0, maxLines) : lines

  return (
    <div className="mb-5 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 border-b border-slate-700/60">
        {tabs.length > 1 ? (
          <div className="flex gap-1 overflow-x-auto flex-1 min-w-0" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => { setActive(i); setExpanded(false) }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer
                  ${i === active
                    ? 'bg-slate-700 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs font-medium text-slate-400 flex-1 min-w-0 truncate">
            {title ?? tab.label}
          </span>
        )}
        <CopyButton value={tab.code} />
      </div>

      {tab.note && (
        <p className="px-4 py-2 text-xs text-slate-400 bg-slate-800/40 border-b border-slate-700/40">
          {tab.note}
        </p>
      )}

      <div className="relative">
        <pre className="overflow-x-auto text-[13px] leading-relaxed py-3 font-mono">
          <code className="block min-w-max">
            {shown.map((pieces, i) => (
              <div key={i} className="px-4 hover:bg-slate-800/40">
                <span className="inline-block w-7 select-none text-right mr-3 text-slate-600 text-[11px] align-top">
                  {i + 1}
                </span>
                <span className="text-slate-200">
                  {pieces.map((p, j) => (
                    <span key={j} className={p.c}>{p.t}</span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
        {clamped && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        )}
      </div>

      {lines.length > maxLines && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 border-t border-slate-700/60 cursor-pointer transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden />
          {expanded ? 'Collapse' : `Show all ${lines.length} lines`}
        </button>
      )}
    </div>
  )
}

/* ── Inline code ──────────────────────────────────── */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[0.9em] break-words">
      {children}
    </code>
  )
}
