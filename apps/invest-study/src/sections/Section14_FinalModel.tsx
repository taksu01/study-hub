import { useState } from 'react'
import {
  SectionShell, SectionHeader, Subsection, Prose,
  CheatSheetPanel, InfoCallout
} from '../components/ui'
import { ArrowDown, CheckCircle2 } from 'lucide-react'

const systemNodes = [
  { id: 'income', label: 'Income', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', description: 'All money flowing in. The raw fuel. Growing income is the highest-leverage financial move available to most people.' },
  { id: 'expenses', label: 'Controlled Expenses', color: 'bg-rose-100 border-rose-300 text-rose-800', description: 'Intentional spending — not minimal, but deliberate. The gap between income and expenses determines everything downstream.' },
  { id: 'surplus', label: 'Surplus', color: 'bg-blue-100 border-blue-300 text-blue-800', description: 'Income minus expenses. The single most important number. Without surplus, nothing else in this system works.' },
  { id: 'reserve', label: 'Emergency Reserve', color: 'bg-violet-100 border-violet-300 text-violet-800', description: '3-6 months of expenses in safe, liquid form. Protects your investments from your life. Non-negotiable before investing.' },
  { id: 'capital', label: 'Investment Capital', color: 'bg-indigo-100 border-indigo-300 text-indigo-800', description: 'Surplus beyond reserve. Cleared for long-term deployment. This is the money that enters the investing system.' },
  { id: 'allocation', label: 'Asset Allocation', color: 'bg-sky-100 border-sky-300 text-sky-800', description: 'The strategic mix: equities for growth, bonds for stability, gold for defense, crypto for asymmetry, cash for optionality. Each asset has a role.' },
  { id: 'risk', label: 'Risk Management', color: 'bg-amber-100 border-amber-300 text-amber-800', description: 'Diversification, position sizing, correlation awareness, rebalancing. The system that keeps your portfolio survivable through any market condition.' },
  { id: 'macro', label: 'Macro Context', color: 'bg-orange-100 border-orange-300 text-orange-800', description: 'The economic weather: inflation, rates, liquidity, business cycle. Informs your positioning without driving knee-jerk reactions. Context, not prophecy.' },
  { id: 'behavior', label: 'Behavioral Discipline', color: 'bg-pink-100 border-pink-300 text-pink-800', description: 'Process over emotion. DCA, rebalancing, written rules, limited monitoring. Your system must work when your brain doesn\'t.' },
  { id: 'compounding', label: 'Compounding', color: 'bg-teal-100 border-teal-300 text-teal-800', description: 'Time + consistency + reinvestment = exponential growth. The force that turns modest contributions into substantial wealth. Interruption is the enemy.' },
  { id: 'networth', label: 'Net Worth Growth', color: 'bg-emerald-200 border-emerald-400 text-emerald-900', description: 'The cumulative result of the entire system working together over years and decades. Not a destination but an ongoing process of compounding.' },
]

export default function Section14() {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = systemNodes.find(n => n.id === active)

  return (
    <SectionShell id="section-14">
      <SectionHeader
        number={14}
        title="How Finance and Investing Work as One Coherent System"
        subtitle="The grand mental model. Everything connects. Come back here whenever your understanding feels fragmented."
      />

      <Subsection title="The Complete System Map">
        <Prose>
          <p>This is the single most important visual in this entire study tool. Every concept from every section connects into this one chain. When you feel confused or fragmented, return here. Click each node to revisit what it means and why it matters.</p>
        </Prose>

        <div className="mt-6 flex flex-col items-center gap-1">
          {systemNodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center">
              <button
                onClick={() => setActive(active === node.id ? null : node.id)}
                className={`px-6 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer w-72 text-center
                  ${active === node.id ? `${node.color} ring-2 ring-offset-2 ring-indigo-400 shadow-lg scale-105` : `${node.color} hover:shadow-md`}`}
              >
                {node.label}
              </button>
              {i < systemNodes.length - 1 && (
                <ArrowDown className="w-5 h-5 text-slate-300 my-0.5" />
              )}
            </div>
          ))}
        </div>

        {activeNode && (
          <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-md max-w-xl mx-auto">
            <h4 className="font-bold text-slate-800 mb-2">{activeNode.label}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{activeNode.description}</p>
          </div>
        )}
      </Subsection>

      <Subsection title="What to Revisit When Rusty">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/50">
            <h4 className="font-semibold text-indigo-800 mb-3">When you feel scattered...</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 1</strong> — the income-to-net-worth flow</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 14</strong> — this complete system map</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Ask: "Do I know the role of each asset in my portfolio?"</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <h4 className="font-semibold text-emerald-800 mb-3">When you feel tempted...</h4>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 12</strong> — behavioral traps</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 13</strong> — common mistakes</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Ask: "Am I acting on process or emotion?"</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50">
            <h4 className="font-semibold text-amber-800 mb-3">When you confuse terms...</h4>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Check the Key Terms block in the relevant section</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Check the Common Confusion block</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 6</strong> for instrument distinctions</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-violet-200 bg-violet-50/50">
            <h4 className="font-semibold text-violet-800 mb-3">When markets feel scary...</h4>
            <ul className="space-y-2 text-sm text-violet-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 4</strong> — what risk really means</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Revisit <strong>Section 10</strong> — macro as context, not panic</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Ask: "Has my thesis changed, or just the price?"</li>
            </ul>
          </div>
        </div>
      </Subsection>

      <Subsection title="The Core Principles">
        <div className="space-y-3 mb-6">
          {[
            'Investing is the final stage of a personal financial system — not the first step.',
            'The surplus between income and expenses is the engine. No surplus, no wealth.',
            'An emergency reserve is not optional. It protects your investments from your life.',
            'Compounding rewards time, consistency, and not interrupting the process.',
            'Risk is not just volatility. It\'s permanent loss, forced selling, and being wrong at the wrong size.',
            'Every asset needs a role: growth, stability, hedge, income, or optionality.',
            'Position sizing matters more than asset selection. Size determines impact.',
            'Valuation determines return. A great business at a terrible price is a bad investment.',
            'Macro is context, not an oracle. Understand the weather, don\'t try to control it.',
            'Process beats emotion. Build systems that work when your brain doesn\'t.',
            'Most mistakes are structural, not analytical. Fix the process, not just the picks.',
            'The goal is not maximum return. It\'s maximum survivable return over a lifetime.',
          ].map((principle, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-slate-700">{principle}</p>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Final Cheat Sheet">
        <CheatSheetPanel title="The Complete Framework in 30 Seconds" items={[
          { label: 'Foundation', value: 'Income → Expenses → Surplus → Reserve' },
          { label: 'Deployment', value: 'Capital → Allocation → Diversified Assets' },
          { label: 'Protection', value: 'Risk management + position sizing + liquidity' },
          { label: 'Context', value: 'Macro informs but doesn\'t dictate' },
          { label: 'Discipline', value: 'Process > emotion. Systems > impulses.' },
          { label: 'Engine', value: 'Compounding = time × consistency × reinvestment' },
          { label: 'Output', value: 'Net worth grows steadily over decades' },
          { label: 'Philosophy', value: 'Think like a rational allocator of capital, not a gambler' },
        ]} />
      </Subsection>

      <InfoCallout type="tip">
        <strong>You don't need to memorize all of this.</strong> You need to understand the structure. When something feels confusing, find it on the system map above and trace how it connects to everything else. Understanding the relationships is more valuable than memorizing the details.
      </InfoCallout>
    </SectionShell>
  )
}
