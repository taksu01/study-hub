import type { MascotMood } from '../types'
import idleSrc from '../assets/mascot/idle.webp'
import happySrc from '../assets/mascot/happy.webp'
import surprisedSrc from '../assets/mascot/surprised.webp'
import hypeSrc from '../assets/mascot/hype.webp'
import sleepySrc from '../assets/mascot/sleepy.webp'

interface Props {
  mood?: MascotMood
  className?: string
  /** When true, strips the circular avatar frame (useful for large hero treatments). */
  bare?: boolean
}

const SOURCES: Record<MascotMood, string> = {
  idle: idleSrc,
  happy: happySrc,
  surprised: surprisedSrc,
  hype: hypeSrc,
  sleepy: sleepySrc,
}

const ALT_TEXT: Record<MascotMood, string> = {
  idle: 'Mascot — waiting calmly',
  happy: 'Mascot — cheering for a correct answer',
  surprised: 'Mascot — startled by a wrong answer',
  hype: 'Mascot — hyped about a big streak',
  sleepy: 'Mascot — tired after the game',
}

export default function Mascot({ mood = 'idle', className = '', bare = false }: Props) {
  const img = (
    <img
      key={mood}
      src={SOURCES[mood]}
      alt={ALT_TEXT[mood]}
      draggable={false}
      className="h-full w-full select-none object-cover object-[center_22%] anim-pop"
    />
  )

  if (bare) {
    return <div className={`relative ${className}`}>{img}</div>
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-white shadow-xl shadow-kawaii-900/40 ring-2 ring-kawaii-400/70 ${className}`}
    >
      {img}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/0 via-white/0 to-kawaii-200/25"
      />
    </div>
  )
}
