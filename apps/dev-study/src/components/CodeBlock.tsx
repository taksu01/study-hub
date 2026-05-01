import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  highlightLines?: number[]
  className?: string
}

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'async', 'await', 'new',
  'this', 'class', 'extends', 'super', 'import', 'export', 'from', 'default',
  'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'throw',
  'try', 'catch', 'finally', 'typeof', 'instanceof', 'void', 'in', 'of',
  'null', 'undefined', 'true', 'false', 'static', 'get', 'set', 'type',
  'interface', 'enum', 'implements', 'abstract', 'readonly', 'private',
  'public', 'protected', 'yield', 'delete',
])

function tokenize(line: string): { text: string; type: string }[] {
  const tokens: { text: string; type: string }[] = []
  let i = 0

  while (i < line.length) {
    // Line comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), type: 'comment' })
      break
    }

    // String (single, double, template)
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i]
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') { j += 2; continue }
        if (line[j] === quote) { j++; break }
        j++
      }
      tokens.push({ text: line.slice(i, j), type: 'string' })
      i = j
      continue
    }

    // Number
    if (/\d/.test(line[i]) && (i === 0 || /\W/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.eExXA-Fa-f_n]/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), type: 'number' })
      i = j
      continue
    }

    // Identifier or keyword
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++
      const word = line.slice(i, j)
      const type = KEYWORDS.has(word)
        ? 'keyword'
        : /^[A-Z][a-zA-Z0-9]*$/.test(word)
        ? 'class'
        : 'identifier'
      tokens.push({ text: word, type })
      i = j
      continue
    }

    // Punctuation / operator chunk
    let j = i
    while (
      j < line.length &&
      !/[a-zA-Z0-9_$"'`\n]/.test(line[j]) &&
      !(line[j] === '/' && line[j + 1] === '/')
    ) {
      j++
    }
    if (j > i) {
      tokens.push({ text: line.slice(i, j), type: 'punctuation' })
      i = j
    } else {
      tokens.push({ text: line[i], type: 'text' })
      i++
    }
  }

  return tokens
}

const tokenColors: Record<string, string> = {
  keyword: 'text-violet-400',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  comment: 'text-slate-500 italic',
  class: 'text-sky-300',
  identifier: 'text-slate-200',
  punctuation: 'text-slate-400',
  text: 'text-slate-200',
}

export function CodeBlock({ code, title, highlightLines = [], className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = code.split('\n')

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`rounded-xl overflow-hidden border border-rim ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface2 border-b border-rim">
          <span className="text-xs text-slate-400 font-code">{title}</span>
          <button
            onClick={copy}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <button
            onClick={copy}
            className="absolute top-3 right-3 flex items-center gap-1 text-xs text-slate-600 hover:text-slate-300 transition-colors z-10"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </button>
        )}
        <pre className="p-4 overflow-x-auto text-sm font-code leading-relaxed bg-[#0d1117]">
          {lines.map((line, i) => {
            const lineNum = i + 1
            const isHighlighted = highlightLines.includes(lineNum)
            return (
              <div
                key={i}
                className={`${isHighlighted ? 'code-line-active bg-sky-950/40' : ''} px-1 rounded-sm`}
              >
                <span className="select-none text-slate-600 mr-4 text-xs w-5 inline-block text-right">
                  {lineNum}
                </span>
                {tokenize(line).map((tok, j) => (
                  <span key={j} className={tokenColors[tok.type] ?? 'text-slate-200'}>
                    {tok.text}
                  </span>
                ))}
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
