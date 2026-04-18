interface Props {
  onDigit: (d: string) => void
  onBackspace: () => void
  onNegate: () => void
  onSubmit: () => void
  onSkip: () => void
  disabled?: boolean
}

const DIGITS: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Keypad({ onDigit, onBackspace, onNegate, onSubmit, onSkip, disabled }: Props) {
  return (
    <div className="grid w-full grid-cols-3 gap-2 select-none">
      {DIGITS.map(d => (
        <KeyBtn key={d} label={d} onClick={() => onDigit(d)} disabled={disabled} />
      ))}

      <KeyBtn label="+/−" onClick={onNegate} tone="ghost" disabled={disabled} />
      <KeyBtn label="0" onClick={() => onDigit('0')} disabled={disabled} />
      <KeyBtn
        label="⌫"
        onClick={onBackspace}
        tone="ghost"
        disabled={disabled}
        ariaLabel="Backspace"
      />

      <KeyBtn
        label="Skip"
        onClick={onSkip}
        tone="ghost"
        disabled={disabled}
      />
      <KeyBtn
        label="Enter"
        onClick={onSubmit}
        tone="primary"
        disabled={disabled}
        wide
      />
    </div>
  )
}

function KeyBtn({
  label,
  onClick,
  tone = 'digit',
  disabled,
  wide,
  ariaLabel,
}: {
  label: string
  onClick: () => void
  tone?: 'digit' | 'ghost' | 'primary'
  disabled?: boolean
  wide?: boolean
  ariaLabel?: string
}) {
  const base = 'h-14 rounded-xl font-display text-xl font-semibold transition active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed'
  const toneClass =
    tone === 'primary'
      ? 'text-white bg-gradient-to-br from-kawaii-500 via-fuchsia-500 to-violet-500 shadow-lg shadow-kawaii-900/40 hover:brightness-110'
      : tone === 'ghost'
        ? 'bg-white/5 text-kawaii-100 border border-white/10 hover:bg-white/10'
        : 'bg-white/10 text-kawaii-50 border border-white/10 hover:bg-white/15'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      className={`${base} ${toneClass} ${wide ? 'col-span-2' : ''}`}
    >
      {label}
    </button>
  )
}
