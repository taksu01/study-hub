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
    border: 'border-gray-200 dark:border-gray-700',
    bg: 'bg-white dark:bg-gray-900',
    headerBg: 'hover:bg-gray-50 dark:hover:bg-gray-800',
    iconColor: 'text-gray-400 dark:text-gray-500',
    titleColor: 'text-gray-700 dark:text-gray-300',
  },
  warning: {
    border: 'border-orange-200 dark:border-orange-800',
    bg: 'bg-orange-50/40 dark:bg-orange-900/20',
    headerBg: 'hover:bg-orange-50/60 dark:hover:bg-orange-900/30',
    iconColor: 'text-orange-400 dark:text-orange-500',
    titleColor: 'text-orange-800 dark:text-orange-300',
  },
  info: {
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50/40 dark:bg-blue-900/20',
    headerBg: 'hover:bg-blue-50/60 dark:hover:bg-blue-900/30',
    iconColor: 'text-blue-400 dark:text-blue-500',
    titleColor: 'text-blue-800 dark:text-blue-300',
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
        <span className="text-gray-400 dark:text-gray-500 text-xs">{open ? '▼' : '▶'}</span>
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  )
}
