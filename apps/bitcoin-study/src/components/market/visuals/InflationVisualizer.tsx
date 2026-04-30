import { usdPurchasingPower } from '../../../data/marketData'

export default function InflationVisualizer() {
  const maxValue = 100
  const minBarHeight = 4

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
          USD Purchasing Power Since 1971
        </h4>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          $1 in 1971 = ? today
        </span>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-48 mb-3">
          {usdPurchasingPower.map(point => {
            const height = Math.max(minBarHeight, (point.value / maxValue) * 100)
            const isNixon = point.year === 1971
            const isCovid = point.year === 2020
            const isNow = point.year === 2024
            const isEvent = !!point.event

            return (
              <div key={point.year} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                {isEvent && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block w-48 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-lg p-2 shadow-xl pointer-events-none">
                    <p className="font-bold">{point.year}: ${(point.value / 100).toFixed(2)} cents</p>
                    <p className="text-gray-300 mt-0.5">{point.event}</p>
                  </div>
                )}

                <div
                  className={`w-full rounded-t transition-all ${
                    isNixon
                      ? 'bg-green-500 dark:bg-green-400'
                      : isNow
                      ? 'bg-red-500 dark:bg-red-400'
                      : isCovid
                      ? 'bg-orange-400 dark:bg-orange-400'
                      : isEvent
                      ? 'bg-amber-400 dark:bg-amber-500'
                      : 'bg-blue-300 dark:bg-blue-600'
                  }`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[9px] text-gray-400 dark:text-gray-500 rotate-[-45deg] origin-top-left translate-y-3 translate-x-1 whitespace-nowrap">
                  {point.year}
                </span>
              </div>
            )
          })}
        </div>

        {/* Y-axis labels */}
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-6 px-1">
          <span>0¢</span>
          <span>25¢</span>
          <span>50¢</span>
          <span>75¢</span>
          <span className="text-green-600 dark:text-green-400 font-bold">100¢ (1971)</span>
        </div>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { year: '1971', value: '$1.00', change: 'Baseline', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
          { year: '2000', value: '$0.24', change: '-76% real value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
          { year: '2020', value: '$0.16', change: '-84% real value', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
          { year: '2024', value: '$0.13', change: '-87% real value', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
        ].map(item => (
          <div key={item.year} className={`rounded-xl p-3 border ${item.bg}`}>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide">{item.year}</p>
            <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
            <p className={`text-[10px] ${item.color}`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Key events */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Key Events</p>
        {usdPurchasingPower.filter(p => p.event).map(point => (
          <div key={point.year} className="flex items-start gap-3 text-xs">
            <span className="text-amber-600 dark:text-amber-400 font-mono font-bold w-10 shrink-0">{point.year}</span>
            <span className="text-gray-600 dark:text-gray-400">{point.event}</span>
            <span className="ml-auto text-gray-400 dark:text-gray-500 font-mono shrink-0">
              {point.value}¢ remaining
            </span>
          </div>
        ))}
      </div>

      {/* Bitcoin comparison callout */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
        <span className="text-2xl shrink-0">₿</span>
        <div>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">The Bitcoin comparison</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            $1 of Bitcoin purchased in 2015 (~$315/BTC) is worth approximately $300+ in 2024.
            $1 of USD saved in 2015 is worth approximately $0.82 in real terms.
            The difference is not investment genius — it is monetary policy.
          </p>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
        Sources: BLS CPI data, Federal Reserve. Values represent approximate purchasing power in 2024 dollars.
        Hover over highlighted bars to see event details.
      </p>
    </div>
  )
}
