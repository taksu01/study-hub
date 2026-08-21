/**
 * Approximate BPE-style tokenizer, for teaching only.
 *
 * Real tokenizers (tiktoken, Claude's) use learned merge tables we can't ship
 * in a static app. This splits on the same boundaries BPE tends to pick —
 * leading spaces stay attached to words, punctuation splits off, long or rare
 * words break into sub-word pieces — which is enough to make the *behaviour*
 * visible: why "unbelievable" costs more than "the", why code is token-hungry.
 */

export interface Tok {
  text: string
  kind: 'word' | 'subword' | 'punct' | 'number' | 'space' | 'newline'
}

/** Words a byte-pair vocabulary would almost certainly keep whole. */
const COMMON = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for',
  'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his',
  'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my',
  'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if',
  'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like',
  'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year',
  'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
  'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most',
  'us', 'is', 'are', 'was', 'were', 'has', 'had', 'model', 'text', 'data',
  'token', 'tokens', 'write', 'read', 'code', 'file', 'name', 'value',
])

const MAX_WHOLE = 7

function splitWord(word: string): string[] {
  const lower = word.toLowerCase()
  if (lower.length <= 4 || COMMON.has(lower)) return [word]

  // Peel off affixes a BPE vocab would hold as their own tokens.
  const suffixes = ['ability', 'ization', 'iveness', 'ational', 'ingly', 'ation',
    'ment', 'ness', 'able', 'ible', 'tion', 'sion', 'ical', 'ing', 'ers',
    'est', 'ies', 'ous', 'ive', 'ial', 'ly', 'ed', 'es', 's']
  const prefixes = ['un', 're', 'in', 'dis', 'pre', 'non', 'over', 'under', 'sub', 'inter']

  const parts: string[] = []
  let rest = word

  for (const p of prefixes) {
    if (rest.toLowerCase().startsWith(p) && rest.length - p.length >= 4) {
      parts.push(rest.slice(0, p.length))
      rest = rest.slice(p.length)
      break
    }
  }

  const tail: string[] = []
  for (const s of suffixes) {
    if (rest.toLowerCase().endsWith(s) && rest.length - s.length >= 3) {
      tail.unshift(rest.slice(rest.length - s.length))
      rest = rest.slice(0, rest.length - s.length)
      break
    }
  }

  // Anything still oversized gets chopped into vocabulary-sized chunks.
  while (rest.length > MAX_WHOLE) {
    parts.push(rest.slice(0, MAX_WHOLE))
    rest = rest.slice(MAX_WHOLE)
  }
  if (rest) parts.push(rest)

  return [...parts, ...tail]
}

export function tokenize(input: string): Tok[] {
  const out: Tok[] = []
  // Keep the leading space glued to its word, the way real BPE does.
  const re = /(\r?\n)|( ?[A-Za-z]+)|( ?\d+)|( +)|([^\sA-Za-z\d]+)/g

  for (const m of input.matchAll(re)) {
    const [full, nl, word, num, spaces, punct] = m

    if (nl) { out.push({ text: '\n', kind: 'newline' }); continue }
    if (spaces) { out.push({ text: full, kind: 'space' }); continue }
    if (num) { out.push({ text: full, kind: 'number' }); continue }
    if (punct) {
      for (const ch of punct) out.push({ text: ch, kind: 'punct' })
      continue
    }
    if (word) {
      const lead = word.startsWith(' ') ? ' ' : ''
      const bare = lead ? word.slice(1) : word
      const pieces = splitWord(bare)
      pieces.forEach((p, i) => {
        out.push({
          text: (i === 0 ? lead : '') + p,
          kind: pieces.length > 1 ? 'subword' : 'word',
        })
      })
    }
  }

  return out
}

export function estimateTokens(text: string): number {
  return tokenize(text).length
}

/** USD cost for a given token count at a per-million-tokens rate. */
export function costOf(tokens: number, perMillion: number): number {
  return (tokens / 1_000_000) * perMillion
}
