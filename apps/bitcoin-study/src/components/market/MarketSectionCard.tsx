import type { MarketSection } from '../../types'
import { marketVisualRegistry } from './visuals'
import TermsTable from '../TermsTable'
import CheatSheet from '../CheatSheet'
import RecallPrompts from '../RecallPrompts'
import MarkdownText from '../MarkdownText'
import Collapsible from '../Collapsible'

interface MarketSectionCardProps {
  section: MarketSection
}

const audienceColors = {
  skeptic: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-400',
  investor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400',
  developer: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-400',
  all: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400',
}

const audienceLabel = {
  skeptic: 'Start here if skeptical',
  investor: 'For investors',
  developer: 'For developers',
  all: 'For everyone',
}

export default function MarketSectionCard({ section }: MarketSectionCardProps) {
  const Visual = section.visualComponent ? marketVisualRegistry[section.visualComponent] : null

  return (
    <section id={`market-${section.id}`} className="scroll-mt-20">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Section header — orange-amber gradient for market theme */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 px-8 py-8">
          <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{section.icon}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold tracking-widest text-amber-100 uppercase">
                  Market Section {section.number}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${audienceColors[section.audience]} bg-white/20 border-white/30 text-white`}>
                  {audienceLabel[section.audience]}
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
          <p className="text-amber-100 text-sm mb-3">{section.subtitle}</p>
          {/* Tagline */}
          <div className="inline-block bg-white/15 backdrop-blur rounded-lg px-4 py-2">
            <p className="text-white text-sm font-medium italic">"{section.tagline}"</p>
          </div>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Big Picture */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">
              The Case
            </h3>
            <MarkdownText text={section.bigPicture} className="text-base leading-7 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Why It Matters */}
          <div className="rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-5">
            <h4 className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-2">
              Why This Matters
            </h4>
            <MarkdownText text={section.whyItMatters} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300" />
          </div>

          {/* Interactive Visual */}
          {Visual && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800/50">
              <Visual />
            </div>
          )}

          {/* Simple Example */}
          {section.simpleExample && (
            <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-5">
              <h4 className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                Simple Example
              </h4>
              <MarkdownText text={section.simpleExample} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300" />
            </div>
          )}

          {/* Details */}
          <Collapsible title="Deeper Analysis" icon="📌" defaultOpen variant="default">
            <ul className="space-y-3 mt-2">
              {section.details.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1 shrink-0">●</span>
                  <MarkdownText text={d} className="text-sm text-gray-700 dark:text-gray-300" />
                </li>
              ))}
            </ul>
          </Collapsible>

          {/* Key Terms */}
          <TermsTable terms={section.keyTerms} />

          {/* Comparison Table */}
          {section.comparisonTable && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                  {section.comparisonTable.title}
                </h4>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Aspect</th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 border-b border-gray-200 dark:border-gray-700">{section.comparisonTable.colAHeader}</th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{section.comparisonTable.colBHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {section.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-900/50'} border-b border-gray-100 dark:border-gray-800`}>
                      <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">{row.aspect}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.colA}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.colB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Investor Takeaway */}
          {section.investorTakeaway && (
            <div className="rounded-xl bg-gray-900 dark:bg-black border border-amber-500/30 p-5">
              <h4 className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
                Investor Takeaway
              </h4>
              <p className="text-white text-sm leading-relaxed font-medium">
                {section.investorTakeaway}
              </p>
            </div>
          )}

          {/* Common Confusion */}
          <Collapsible title="Common Objections" icon="⚠" variant="warning">
            <ul className="space-y-3 mt-2">
              {section.commonConfusion.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-orange-300 dark:text-orange-500 mt-1 shrink-0">▹</span>
                  <MarkdownText text={c} className="text-sm text-gray-700 dark:text-gray-300" />
                </li>
              ))}
            </ul>
          </Collapsible>

          {/* Recall */}
          <RecallPrompts prompts={section.recallPrompts} />

          {/* Cheat Sheet */}
          <CheatSheet items={section.cheatSheet} />
        </div>
      </div>
    </section>
  )
}
