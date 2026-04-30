interface MarkdownTextProps {
  text: string
  className?: string
}

export default function MarkdownText({ text, className = '' }: MarkdownTextProps) {
  const rendered = text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n- /g, '</p><li class="ml-4 mt-1 list-disc">')

  return (
    <div
      className={`text-sm leading-relaxed text-gray-600 dark:text-gray-400 ${className}`}
      dangerouslySetInnerHTML={{ __html: `<p>${rendered}</p>` }}
    />
  )
}
