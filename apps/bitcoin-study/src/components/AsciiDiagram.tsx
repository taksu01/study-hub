import { useState } from 'react'

interface AsciiDiagramProps {
  content: string
  title?: string
}

export default function AsciiDiagram({ content, title }: AsciiDiagramProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-900 shadow-sm overflow-hidden">
      {title && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-3 bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-750 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="text-amber-400">◆</span>
            {title}
          </span>
          <span className="text-gray-500 text-xs">{expanded ? '▼ collapse' : '▶ expand'}</span>
        </button>
      )}
      {expanded && (
        <div className="overflow-x-auto p-5">
          <pre className="text-sm leading-relaxed text-green-300 font-mono whitespace-pre">
            {content}
          </pre>
        </div>
      )}
    </div>
  )
}
