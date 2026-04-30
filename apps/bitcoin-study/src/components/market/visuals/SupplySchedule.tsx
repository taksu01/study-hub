import { supplyEpochs } from '../../../data/marketData'

export default function SupplySchedule() {
  const maxBTC = 21_000_000

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
          Bitcoin Supply Schedule
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">Hard cap: 21,000,000 BTC</span>
      </div>

      {/* Supply curve bar chart */}
      <div className="space-y-2">
        {supplyEpochs.map((epoch, idx) => {
          const pct = (epoch.cumulativeBTC / maxBTC) * 100
          const isCurrentEra = epoch.era === 'Halving 4'
          return (
            <div key={epoch.era} className="group">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-24 shrink-0 text-right">
                  <span className={`font-mono text-xs ${isCurrentEra ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {epoch.year === 2140 ? '~2140' : epoch.year}
                  </span>
                </div>
                <div className="flex-1 relative h-7">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div
                    className={`absolute inset-y-0 left-0 rounded transition-all ${
                      isCurrentEra
                        ? 'bg-amber-500 dark:bg-amber-400'
                        : idx < 4
                        ? 'bg-amber-400/70 dark:bg-amber-500/70'
                        : 'bg-amber-200 dark:bg-amber-800'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                  {isCurrentEra && (
                    <div
                      className="absolute inset-y-0 flex items-center"
                      style={{ left: `${pct}%` }}
                    >
                      <div className="w-0.5 h-full bg-amber-600 dark:bg-amber-300 ml-[-1px]" />
                      <span className="ml-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 whitespace-nowrap">
                        NOW
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-28 shrink-0">
                  <span className={`text-xs font-mono ${isCurrentEra ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {epoch.cumulativeBTC.toLocaleString()} BTC
                  </span>
                </div>
                <div className="w-16 shrink-0 text-right">
                  <span className={`text-xs ${isCurrentEra ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-400 dark:text-gray-500'}`}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Subsidy info */}
              <div className="pl-28 flex items-center gap-4 mt-0.5 pb-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                  {epoch.era} &nbsp;·&nbsp; {epoch.subsidy > 0 ? `${epoch.subsidy} BTC/block` : 'subsidy = 0 (fees only)'} &nbsp;·&nbsp; {epoch.blockRange}
                </span>
                {isCurrentEra && (
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                    Current era
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {[
          { label: 'Total Supply Cap', value: '21,000,000 BTC', sub: 'Forever. Non-negotiable.' },
          { label: 'Already Mined', value: '~19.7M BTC (93.8%)', sub: 'As of 2024' },
          { label: 'Estimated Lost', value: '~3-4M BTC', sub: 'Effectively reduces circulating supply' },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">{stat.label}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Stock-to-flow callout */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">Stock-to-Flow Comparison (2024)</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { asset: 'Silver', sf: '~22', note: 'Industrial + monetary' },
            { asset: 'Gold', sf: '~62', note: 'Historical benchmark' },
            { asset: 'Bitcoin', sf: '~120', note: 'Post-2024 halving' },
          ].map(item => (
            <div key={item.asset}>
              <p className="text-lg font-black text-amber-700 dark:text-amber-300">{item.sf}</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.asset}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-2 text-center">
          Stock-to-Flow = existing supply / annual new supply. Higher = scarcer.
          Bitcoin's SF nearly doubles with each halving.
        </p>
      </div>
    </div>
  )
}
