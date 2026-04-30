import { moneyProperties } from '../../../data/marketData'


const COLS = [
  { key: 'bitcoin', label: '₿ Bitcoin', color: '#f59e0b' },
  { key: 'gold', label: '⬡ Gold', color: '#ca8a04' },
  { key: 'usd', label: '$ USD', color: '#6b7280' },
  { key: 'ethereum', label: 'Ξ ETH', color: '#818cf8' },
] as const

export default function MoneyPropertiesTable() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
          Money Properties Scorecard
        </h4>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          ● ● ● ● ● = Excellent &nbsp; ● ○ ○ ○ ○ = Poor
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-40">
                Property
              </th>
              {COLS.map(col => (
                <th key={col.key} className="text-center px-3 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: col.color }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {moneyProperties.map((prop, idx) => (
              <tr
                key={prop.property}
                className={`border-b border-gray-100 dark:border-gray-800 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors ${
                  idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-900/50'
                }`}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{prop.property}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{prop.description}</p>
                </td>
                {COLS.map(col => {
                  const score = prop[col.key] as number
                  const note = prop[`${col.key}Note`]
                  return (
                    <td key={col.key} className="px-3 py-3 text-center">
                      <div className="flex justify-center mb-1">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full border ${
                                i <= score
                                  ? 'border-transparent'
                                  : 'border-gray-200 dark:border-gray-700 bg-transparent'
                              }`}
                              style={i <= score ? { backgroundColor: col.color } : {}}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight max-w-[120px] mx-auto hidden sm:block">
                        {note}
                      </p>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-400 dark:text-gray-500 italic">
        Scoring reflects properties of the base protocols as of 2024. Bitcoin fungibility scores lower due to UTXO traceability; improvements are active research areas.
      </p>
    </div>
  )
}
