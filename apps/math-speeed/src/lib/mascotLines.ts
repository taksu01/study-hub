import type { MascotMood } from '../types'

export type MascotEvent =
  | 'menu'
  | 'start'
  | 'correct'
  | 'wrong'
  | 'streak'
  | 'bigStreak'
  | 'timeLow'
  | 'end'
  | 'newBest'

const LINES: Record<MascotEvent, string[]> = {
  menu: [
    'Ready for some math, Senpai~?',
    'Ufufu… pick a mode, I\'ll go easy on you.',
    'Let\'s sharpen that brain of yours!',
    'Back for more? How brave of you~',
  ],
  start: [
    'Ganbatte, Senpai!',
    'Three, two, one… go!',
    'Show me what you\'ve got~',
  ],
  correct: [
    'Ufufu~ too easy!',
    'Sugoi!',
    'That\'s my Senpai~',
    'Nice nice nice!',
    'Ehehe, keep going!',
  ],
  wrong: [
    'Eh?! Focus, Senpai~',
    'Mou~ that was an easy one!',
    'Did you forget already?',
    'Don\'t worry, try again!',
    'Hmph, I let that one slide.',
  ],
  streak: [
    'Combo~!',
    'You\'re on fire!',
    'Don\'t stop, Senpai!',
  ],
  bigStreak: [
    'Chouzetsu! You\'re unstoppable!',
    'Saikou da yo, Senpai!',
    'My heart can\'t take it~',
  ],
  timeLow: [
    'Hurry hurry hurry!',
    'Time\'s almost up, Senpai!',
    'Don\'t choke now~',
  ],
  end: [
    'Nnnh… let\'s go again?',
    'Good game, Senpai~',
    'Otsukaresama!',
  ],
  newBest: [
    'A new record! I\'m so proud~',
    'Best ever, Senpai!',
    'You leveled up! Ufufu~',
  ],
}

let lastLineByEvent: Partial<Record<MascotEvent, string>> = {}

export function pickMascotLine(event: MascotEvent): string {
  const pool = LINES[event]
  if (pool.length === 1) return pool[0]!
  const prev = lastLineByEvent[event]
  let pick = pool[Math.floor(Math.random() * pool.length)]!
  if (pool.length > 1 && pick === prev) {
    pick = pool[(pool.indexOf(pick) + 1) % pool.length]!
  }
  lastLineByEvent[event] = pick
  return pick
}

export function moodForEvent(event: MascotEvent): MascotMood {
  switch (event) {
    case 'correct':   return 'happy'
    case 'wrong':     return 'surprised'
    case 'streak':    return 'happy'
    case 'bigStreak': return 'hype'
    case 'timeLow':   return 'surprised'
    case 'end':       return 'sleepy'
    case 'newBest':   return 'hype'
    case 'start':     return 'happy'
    case 'menu':
    default:          return 'idle'
  }
}
