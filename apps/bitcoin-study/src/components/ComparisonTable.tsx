import type { ComparisonRow } from '../types'

interface ComparisonTableProps {
  title: string
  colAHeader: string
  colBHeader: string
  rows: ComparisonRow[]
}

export default function ComparisonTable({ title, colAHeader, colBHeader, rows }: ComparisonTableProps) {
  return (
    <div className="my-6">
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-emerald-500">⚖</span> {title}
      </h4>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-500 w-1/5">Aspect</th>
              <th className="text-left px-5 py-3 font-semibold text-amber-700 w-2/5">{colAHeader}</th>
              <th className="text-left px-5 py-3 font-semibold text-indigo-700 w-2/5">{colBHeader}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.aspect}
                className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="px-5 py-3 font-medium text-gray-700 align-top">{row.aspect}</td>
                <td className="px-5 py-3 text-gray-600 leading-relaxed">{row.colA}</td>
                <td className="px-5 py-3 text-gray-600 leading-relaxed">{row.colB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
