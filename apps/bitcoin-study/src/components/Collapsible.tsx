import { useState, type ReactNode } from 'react'

interface CollapsibleProps {
  title: string
  icon?: string
  defaultOpen?: boolean
  variant?: 'default' | 'warning' | 'info'
  children: ReactNode
}

const variants = {
  default: {
    border: 'border-gray-200',
    bg: 'bg-white',
    headerBg: 'hover:bg-gray-50',
    iconColor: 'text-gray-400',
    titleColor: 'text-gray-700',
  },
  warning: {
    border: 'border-orange-200',
    bg: 'bg-orange-50/40',
    headerBg: 'hover:bg-orange-50/60',
    iconColor: 'text-orange-400',
    titleColor: 'text-orange-800',
  },
  info: {
    border: 'border-blue-200',
    bg: 'bg-blue-50/40',
    headerBg: 'hover:bg-blue-50/60',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-800',
  },
}

export default function Collapsible({
  title,
  icon,
  defaultOpen = false,
  variant = 'default',
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)
  const v = variants[variant]

  return (
    <div className={`my-4 rounded-xl border ${v.border} ${v.bg} overflow-hidden shadow-sm`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${v.headerBg} cursor-pointer`}
      >
        {icon && <span className={v.iconColor}>{icon}</span>}
        <span className={`text-sm font-semibold ${v.titleColor} flex-1`}>{title}</span>
        <span className="text-gray-400 text-xs">{open ? '▼' : '▶'}</span>
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  )
}
