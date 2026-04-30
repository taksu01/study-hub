interface CheatSheetProps {
  items: string[]
}

export default function CheatSheet({ items }: CheatSheetProps) {
  return (
    <div className="my-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20 p-5">
      <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>📋</span> Cheat Sheet
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
