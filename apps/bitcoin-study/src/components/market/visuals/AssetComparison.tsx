import { useState } from 'react'
import { assetReturns } from '../../../data/marketData'

type Period = '1yr' | '4yr' | '10yr'

const PERIOD_LABELS: Record<Period, string> = {
  '1yr': '1 Year (2024)',
  '4yr': '4 Year CAGR (2020–2024)',
  '10yr': '10 Year CAGR (2015–2024)',
}

export default function AssetComparison() {
  const [period, setPeriod] = useState<Period>('10yr')

  const getReturn = (asset: (typeof assetReturns)[0]) => {
    if (period === '1yr') return asset.oneYear
    if (period === '4yr') return asset.fourYear
    return asset.tenYear
  }

  const sorted = [...assetReturns].sort((a, b) => getReturn(b) - getReturn(a))
  const maxReturn = Math.max(...sorted.map(a => Math.abs(getReturn(a))), 1)

  const formatReturn = (val: number) => {
    const sign = val > 0 ? '+' : ''
    return `${sign}${val}%`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
          Asset Class Returns Comparison
        </h4>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['1yr', '4yr', '10yr'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                period === p
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">{PERIOD_LABELS[period]}</p>

      <div className="space-y-3">
        {sorted.map((asset, idx) => {
          const ret = getReturn(asset)
          const isNegative = ret < 0
          const barWidth = (Math.abs(ret) / maxReturn) * 100
          const isBitcoin = asset.symbol === 'BTC'

          return (
            <div key={asset.asset} className="group">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-28 shrink-0 flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className={`text-sm font-semibold ${isBitcoin ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {asset.asset}
                  </span>
                </div>

                <div className="flex-1 relative h-8 flex items-center">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div
                    className={`absolute inset-y-1 left-1 rounded transition-all duration-500 ${
                      isNegative ? 'opacity-60' : ''
                    }`}
                    style={{
                      width: `calc(${barWidth}% - 4px)`,
                      backgroundColor: isNegative ? '#ef4444' : asset.color,
                      minWidth: '2px',
                    }}
                  />
                  {isBitcoin && (
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hidden sm:block">
                        #1 Best Performer
                      </span>
                    </div>
                  )}
                </div>

                <div className="w-20 text-right shrink-0">
                  <span
                    className={`text-sm font-bold font-mono ${
                      isNegative
                        ? 'text-red-500 dark:text-red-400'
                        : isBitcoin
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {formatReturn(ret)}
                    {period !== '1yr' && <span className="text-[10px] font-normal text-gray-400 dark:text-gray-500">/yr</span>}
                  </span>
                </div>

                {idx === 0 && (
                  <span className="w-16 text-center hidden sm:block">
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                      Best
                    </span>
                  </span>
                )}
                {idx === sorted.length - 1 && (
                  <span className="w-16 text-center hidden sm:block">
                    <span className="text-[10px] bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">
                      Worst
                    </span>
                  </span>
                )}
                {idx !== 0 && idx !== sorted.length - 1 && (
                  <span className="w-16 hidden sm:block" />
                )}
              </div>

              <p className="text-[10px] text-gray-400 dark:text-gray-500 pl-[6.75rem] leading-relaxed">
                {asset.note}
              </p>
            </div>
          )
        })}
      </div>

      {/* Portfolio math callout */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">The 1% Allocation Math</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          A portfolio that was 99% S&amp;P 500 + 1% Bitcoin on Jan 1, 2015 would have
          outperformed a 100% S&amp;P 500 portfolio significantly by end of 2024.
          The 1% Bitcoin position would have grown to represent ~25-30% of the portfolio
          by value — from a 1% starting allocation. This is the asymmetric bet thesis.
        </p>
      </div>

      <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
        Data as of December 31, 2024. Past performance does not predict future returns.
        CAGR = Compound Annual Growth Rate. Cash returns shown as real (inflation-adjusted).
      </p>
    </div>
  )
}
