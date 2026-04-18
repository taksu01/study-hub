interface Props {
  text: string
  tail?: 'left' | 'right'
  className?: string
}

export default function SpeechBubble({ text, tail = 'left', className = '' }: Props) {
  return (
    <div
      key={text}
      className={`relative inline-block max-w-[18rem] rounded-2xl bg-white/95 px-4 py-2 text-sm font-medium text-ink-900 shadow-xl shadow-kawaii-900/20 anim-fade-up ${className}`}
    >
      <span className="block leading-snug">{text}</span>
      <span
        className={`absolute top-1/2 -translate-y-1/2 h-0 w-0 border-y-[10px] border-y-transparent ${
          tail === 'left'
            ? '-left-2 border-r-[10px] border-r-white/95'
            : '-right-2 border-l-[10px] border-l-white/95'
        }`}
        aria-hidden
      />
    </div>
  )
}
