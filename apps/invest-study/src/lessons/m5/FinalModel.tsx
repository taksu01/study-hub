import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { InteractiveFlowMap } from '../../components/ui'

const RUSTY_MAP = [
  {
    when: 'When everything feels scattered…',
    icon: '🧭',
    items: [
      'Revisit Module 1 (Foundations) — income, cash flow, and the compounding engine.',
      'Re-trace the system map in this lesson from Income down to Net Worth.',
      'Ask: "Do I know the role of every asset I hold?"',
    ],
  },
  {
    when: 'When you feel tempted…',
    icon: '🧠',
    items: [
      'Revisit this module — Behavioral Finance for the bias, Common Mistakes for the pattern.',
      'Ask: "Am I acting on process or emotion?"',
      'If no pre-written rule covers this move, that\'s the answer: wait.',
    ],
  },
  {
    when: 'When markets feel scary…',
    icon: '⚖️',
    items: [
      'Revisit Module 2 (Risk & Assets) — what risk actually is, and isn\'t.',
      'Revisit Module 3\'s macro lesson — macro is weather to dress for, not prophecy.',
      'Ask: "Has my thesis changed, or just the price?"',
    ],
  },
  {
    when: 'When the portfolio feels random…',
    icon: '🧱',
    items: [
      'Revisit Module 4 (Portfolio) — every holding gets a job, then the jobs get sizes.',
      'Revisit Module 3 (Analysis) if a single position is the confusion.',
      'Ask: "What role does each position play — and what would make me sell it?"',
    ],
  },
]

export default function FinalModel({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="final-model"
      subtitle="The whole course reconnected into one chain: income → surplus → allocation → compounding, with behavior guarding every link. Come back here whenever it feels fragmented."
      onNavigate={onNavigate}
    >
      <LessonSection title="One system, not fourteen topics" icon="🗺">
        <P>
          Everything in this course is one machine. Money flows in as <Strong>income</Strong>, survives{' '}
          <Strong>controlled expenses</Strong> to become surplus, gets a safety layer, and only then becomes
          investment capital. Allocation gives every dollar a job, risk management keeps the machine survivable,
          and <Strong>compounding turns time into wealth</Strong> — as long as behavior never breaks the chain.
        </P>
        <P>
          You don't need to memorize the details. You need the <Strong>structure</Strong>: when a concept feels
          confusing, find it on this map and trace how it connects to everything else.
        </P>
      </LessonSection>

      <LessonSection title="The complete system map" icon="🔗">
        <P>Tap each node — this is the entire course in one vertical chain.</P>
        <InteractiveFlowMap
          vertical
          nodes={[
            { id: 'income', label: 'Income', color: 'green', description: 'All money flowing in — the raw fuel. Growing income is the highest-leverage financial move available to most people.' },
            { id: 'expenses', label: 'Controlled Expenses', color: 'red', description: 'Intentional spending — not minimal, but deliberate. The gap between income and expenses determines everything downstream.' },
            { id: 'surplus', label: 'Surplus', color: 'blue', description: 'Income minus expenses — the single most important number. Without surplus, nothing else in this system works.' },
            { id: 'reserve', label: 'Emergency Reserve', color: 'purple', description: '3–6 months of expenses in safe, liquid form. Protects the investments from life. Non-negotiable before investing.' },
            { id: 'capital', label: 'Investment Capital', color: 'indigo', description: 'Surplus beyond the reserve, cleared for long-term deployment. This is the money that enters the investing system.' },
            { id: 'allocation', label: 'Asset Allocation', color: 'teal', description: 'The strategic mix: equities for growth, bonds for stability, gold for defense, crypto for asymmetry, cash for optionality. Every asset has a role.' },
            { id: 'risk', label: 'Risk Management', color: 'orange', description: 'Diversification, position sizing, correlation awareness, rebalancing — the system that keeps the portfolio survivable in any market.' },
            { id: 'macro', label: 'Macro Context', color: 'slate', description: 'The economic weather: inflation, rates, liquidity, the cycle. Informs positioning without driving knee-jerk reactions. Context, not prophecy.' },
            { id: 'behavior', label: 'Behavioral Discipline', color: 'red', description: 'Process over emotion: DCA, rebalancing, written rules, limited monitoring. The system must work when the brain doesn\'t.' },
            { id: 'compounding', label: 'Compounding', color: 'teal', description: 'Time × consistency × reinvestment = exponential growth. The force that turns modest contributions into substantial wealth. Interruption is the enemy.' },
            { id: 'networth', label: 'Net Worth Growth', color: 'green', description: 'The cumulative result of the whole system working together over decades. Not a destination — an ongoing compounding process.' },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          Investing is the <em>final</em> stage of a personal financial system, not the first step. Every link
          upstream — surplus, reserve, sizing — exists so that compounding downstream is never interrupted.
          Understanding the relationships beats memorizing the details.
        </Callout>
      </LessonSection>

      <LessonSection title="The decision checklist" icon="✔️">
        <P>
          Before any purchase, the system asks six questions. A position that can't pass them isn't an
          investment — it's an impulse.
        </P>
        <StepFlow
          steps={[
            { label: 'Is the foundation intact?', detail: 'Emergency reserve funded, no near-term money involved. If not, the answer is no before the asset is even considered.' },
            { label: 'What role does this play?', detail: 'Growth, stability, hedge, income, or asymmetric bet. A holding without a job is clutter.' },
            { label: 'What\'s the thesis?', detail: 'One written paragraph: what it is, why it should work, and — critically — what would prove it wrong.' },
            { label: 'Is the price sane?', detail: 'Valuation determines return. A great business at a terrible price is a bad investment.' },
            { label: 'What size is survivable?', detail: 'Sizing matters more than selection. Cap the position so a 50% drawdown changes nothing about your life.' },
            { label: 'Process or emotion?', detail: 'Is this move written in the plan — or a reaction to a headline, a rally, or someone else\'s trade? If it\'s not in the plan, wait.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Maximum return',
              b: 'Maximum survivable return',
              explanation:
                'The goal isn\'t the highest possible return in any single year — it\'s the highest return you can sustain for decades without being knocked out. A strategy that compounds at 8% for 30 years beats one that does 30% for 5 years and then blows up.',
            },
            {
              a: 'Macro as context',
              b: 'Macro as prediction',
              explanation:
                'Macro tells you what weather you\'re investing in — rates, inflation, the cycle — so positioning makes sense. It does not tell you what happens next quarter. Using it as context improves allocation; using it as an oracle produces overtrading.',
            },
            {
              a: 'A collection of assets',
              b: 'A portfolio',
              explanation:
                'A collection is things that seemed good at the time. A portfolio is a machine: every holding has a role, a size that matches the role, and known interactions with the other parts. Same assets, completely different object.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Surplus', definition: 'Income minus expenses — the engine of the whole system. No surplus, no wealth, regardless of investing skill.' },
            { term: 'Asset allocation', definition: 'The strategic mix of asset classes, each chosen for a role: growth, stability, defense, asymmetry, optionality.' },
            { term: 'Position sizing', definition: 'How much each holding gets. Size determines impact — it matters more than asset selection.' },
            { term: 'Rebalancing', definition: 'Periodically restoring target weights — systematically trimming winners and topping up laggards on a schedule, not a feeling.' },
            { term: 'Investment policy', definition: 'Your written rules: targets, contribution schedule, rebalancing dates, and pre-commitments for drawdowns.' },
            { term: 'Compounding', definition: 'Returns earning their own returns. Time × consistency × reinvestment — the output stage of the entire system.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Mechanics: a portfolio falls 50% in a crash. What gain does it need just to get back to even — and what does that imply?',
              options: [
                '+50% — losses and gains are symmetric, so recovery is quick',
                '+100% — losses compound asymmetrically, so avoiding catastrophic drawdowns beats chasing spectacular gains',
                '+75% — recovery needs are slightly larger than the loss',
                'It depends entirely on which assets caused the loss',
              ],
              correct: 1,
              explanation:
                'From 100 to 50 is −50%, but from 50 back to 100 is +100%. Compounding is multiplicative, and the asymmetry is why the system prioritizes survival: reserve, sizing, and diversification all exist to keep drawdowns recoverable.',
            },
            {
              question: 'Allocation: an investor holds eight assets but can\'t say what job any of them does. According to the system, what\'s wrong?',
              options: [
                'Nothing — eight assets is diversified enough by count alone',
                'They need more macro analysis to rank the assets',
                'It\'s a collection, not a portfolio — without roles there\'s no basis for sizing, rebalancing, or knowing when to sell',
                'They should consolidate into a single best-conviction position',
              ],
              correct: 2,
              explanation:
                'Diversification isn\'t a head-count — it\'s different roles (growth, stability, hedge, asymmetry) working together. Roles determine size, and the thesis behind each role determines exit criteria. Without them, every decision reverts to emotion.',
            },
            {
              question: 'Behavior: markets drop 30% and the plan says "do nothing — contributions continue automatically." Why is following the plan usually right?',
              options: [
                'Because markets always recover within a year',
                'Because the plan was made calmly in advance, while the urge to sell is fear chemistry — and panic converts temporary drawdowns into permanent losses',
                'Because selling would trigger taxes that outweigh any losses avoided',
                'Because a 30% drop always signals a buying opportunity',
              ],
              correct: 1,
              explanation:
                'Markets offer no guarantees on timing — that\'s not the point. The point is that the pre-written rule embodies your rational judgment, made without fear hormones. Panic selling at the bottom is the single most destructive investor behavior; process exists precisely for this moment.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why is investing the LAST stage of the financial system, not the first?', answer: 'Because everything upstream protects it: surplus provides the fuel, the emergency reserve stops life from forcing sales, and only then can capital be deployed for the long term. Skipping the stages means the first crisis interrupts compounding — the one unforgivable failure.' },
            { question: 'What matters more than asset selection, and why?', answer: 'Position sizing. Being wrong at 5% is a lesson; being wrong at 50% is a catastrophe. Size determines whether any single mistake is survivable — and survival is the precondition for compounding.' },
            { question: 'What is macro FOR in this system?', answer: 'Context, not prophecy. It explains the environment — rates, inflation, the cycle — so allocation makes sense, without dictating knee-jerk trades. Understand the weather; don\'t try to predict or control it.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Where to go when rusty" icon="🧰">
        <P>
          This course is designed to be revisited. Match the symptom to the module and go straight there:
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RUSTY_MAP.map((card, i) => (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                <span className="mr-1.5">{card.icon}</span>
                {card.when}
              </p>
              <ul className="space-y-1.5">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="text-indigo-400 dark:text-indigo-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Foundation', value: 'Income → controlled expenses → surplus → reserve. No surplus, no wealth.' },
          { label: 'Deployment', value: 'Capital → allocation → every asset gets a role, every role gets a size.' },
          { label: 'Protection', value: 'Risk management: sizing + diversification + liquidity. Survival first.' },
          { label: 'Context', value: 'Macro informs positioning; it never dictates trades.' },
          { label: 'Discipline', value: 'Process > emotion. Systems > impulses. Rules written while calm.' },
          { label: 'Engine & output', value: 'Compounding = time × consistency × reinvestment → net worth over decades.' },
        ]}
      />
    </LessonLayout>
  )
}
