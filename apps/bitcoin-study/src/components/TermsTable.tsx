import type { KeyTerm } from '../types'

interface TermsTableProps {
  terms: KeyTerm[]
}

export default function TermsTable({ terms }: TermsTableProps) {
  return (
    <div className="my-6">
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-amber-500">◈</span> Key Terms
      </h4>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-700 w-1/4">Term</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Definition</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((t, i) => (
              <tr
                key={t.term}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <td className="px-5 py-3 font-medium text-gray-900 align-top whitespace-nowrap">
                  {t.term}
                </td>
                <td className="px-5 py-3 text-gray-600 leading-relaxed">
                  {t.definition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
