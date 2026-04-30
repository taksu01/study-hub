import type { Section } from '../types'
import { visualRegistry } from './visuals'
import TermsTable from './TermsTable'
import CheatSheet from './CheatSheet'
import RecallPrompts from './RecallPrompts'
import ComparisonTable from './ComparisonTable'
import MarkdownText from './MarkdownText'
import Collapsible from './Collapsible'

interface SectionCardProps {
  section: Section
}

export default function SectionCard({ section }: SectionCardProps) {
  const InteractiveVisual = visualRegistry[section.id]

  return (
    <section id={section.id} className="scroll-mt-20">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Section header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-2xl">{section.icon}</span>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Section {section.number}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
          <p className="text-gray-400 text-sm">{section.subtitle}</p>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Big Picture */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">
              The Big Picture
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
          {InteractiveVisual && <InteractiveVisual />}

          {/* Simple Example */}
          {section.simpleExample && (
            <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-5">
              <h4 className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                Simple Example
              </h4>
              <MarkdownText text={section.simpleExample} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300" />
            </div>
          )}

          {/* Important Details */}
          <Collapsible title="Important Details" icon="📌" defaultOpen variant="default">
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
            <ComparisonTable
              title={section.comparisonTable.title}
              colAHeader={section.comparisonTable.colAHeader}
              colBHeader={section.comparisonTable.colBHeader}
              rows={section.comparisonTable.rows}
            />
          )}

          {/* Common Confusion */}
          <Collapsible title="Common Confusion" icon="⚠" variant="warning">
            <ul className="space-y-3 mt-2">
              {section.commonConfusion.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-orange-300 dark:text-orange-500 mt-1 shrink-0">▹</span>
                  <MarkdownText text={c} className="text-sm text-gray-700 dark:text-gray-300" />
                </li>
              ))}
            </ul>
          </Collapsible>

          {/* Mini Recall */}
          <RecallPrompts prompts={section.recallPrompts} />

          {/* Cheat Sheet */}
          <CheatSheet items={section.cheatSheet} />
        </div>
      </div>
    </section>
  )
}
