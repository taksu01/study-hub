import type { Difficulty, OpKind } from '../types'

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

interface Range {
  lo: number
  hi: number
  mulHi: number
  sqrMax: number
  pctBase: number
}

const RANGES: Record<Difficulty, Range> = {
  easy:    { lo: 1,  hi: 10,  mulHi: 10, sqrMax: 10, pctBase: 100 },
  medium:  { lo: 2,  hi: 50,  mulHi: 12, sqrMax: 15, pctBase: 200 },
  hard:    { lo: 5,  hi: 100, mulHi: 15, sqrMax: 20, pctBase: 500 },
  extreme: { lo: 10, hi: 99,  mulHi: 25, sqrMax: 30, pctBase: 1000 },
}

export interface GeneratedQuestion {
  op: OpKind
  prompt: string
  answer: number
}

function makeAdd(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  const a = randInt(r.lo, r.hi)
  const b = randInt(r.lo, r.hi)
  return { op: 'add', prompt: `${a} + ${b}`, answer: a + b }
}

function makeSub(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  let a = randInt(r.lo, r.hi)
  let b = randInt(r.lo, r.hi)
  if (a < b) [a, b] = [b, a]
  return { op: 'sub', prompt: `${a} − ${b}`, answer: a - b }
}

function makeMul(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  const base = d === 'extreme' ? randInt(11, r.mulHi) : randInt(2, r.mulHi)
  const b = d === 'extreme' ? randInt(11, r.mulHi) : randInt(2, r.mulHi)
  const a = d === 'easy' ? randInt(2, 10) : base
  return { op: 'mul', prompt: `${a} × ${b}`, answer: a * b }
}

function makeDiv(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  const divisor = d === 'easy' ? randInt(2, 10) : randInt(2, Math.min(12, r.mulHi))
  const quotient = d === 'extreme' ? randInt(11, r.mulHi) : randInt(2, r.mulHi)
  const dividend = divisor * quotient
  return { op: 'div', prompt: `${dividend} ÷ ${divisor}`, answer: quotient }
}

function makeSqr(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  const n = randInt(2, r.sqrMax)
  return { op: 'sqr', prompt: `${n}²`, answer: n * n }
}

function makeSqrt(d: Difficulty): GeneratedQuestion {
  const r = RANGES[d]
  const n = randInt(2, r.sqrMax)
  return { op: 'sqrt', prompt: `√${n * n}`, answer: n }
}

function makePct(d: Difficulty): GeneratedQuestion {
  const percents = d === 'easy'
    ? [10, 25, 50, 75, 100]
    : d === 'medium'
      ? [5, 10, 15, 20, 25, 50, 75]
      : d === 'hard'
        ? [5, 10, 15, 20, 25, 30, 40, 60, 75, 80]
        : [3, 6, 8, 12, 15, 18, 24, 35, 45, 55, 65, 85]
  const p = pick(percents)
  const r = RANGES[d]
  const baseMultipleOf = d === 'extreme' ? 10 : 20
  const maxMultiplier = Math.max(1, Math.floor(r.pctBase / baseMultipleOf))
  const base = randInt(1, maxMultiplier) * baseMultipleOf
  const answer = (p / 100) * base
  const rounded = Math.round(answer * 100) / 100
  return {
    op: 'pct',
    prompt: `${p}% of ${base}`,
    answer: Number.isInteger(rounded) ? rounded : Math.round(answer),
  }
}

const MAKERS: Record<OpKind, (d: Difficulty) => GeneratedQuestion> = {
  add: makeAdd,
  sub: makeSub,
  mul: makeMul,
  div: makeDiv,
  sqr: makeSqr,
  sqrt: makeSqrt,
  pct: makePct,
}

export function generateQuestion(ops: OpKind[], difficulty: Difficulty): GeneratedQuestion {
  const pool = ops.length > 0 ? ops : (['add', 'sub', 'mul', 'div'] as OpKind[])
  const op = pick(pool)
  return MAKERS[op](difficulty)
}
