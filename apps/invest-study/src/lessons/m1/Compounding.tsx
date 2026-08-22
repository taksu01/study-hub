import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { CompoundingVisualizer, ScenarioWidget } from '../../components/ui'

export default function Compounding({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="compounding"
      subtitle="Returns that earn their own returns — tiny at first, enormous later. This is the engine of all long-term wealth, and everything else in investing exists to keep it running."
      onNavigate={onNavigate}
    >
      <LessonSection title="The core mechanic" icon="⚙️">
        <P>
          Compounding is simple to state and hard to feel: <Strong>your returns generate their own returns</Strong>.
          Year one's gains earn money in year two, whose gains earn money in year three. The curve is nearly flat for
          a decade — then it isn't.
        </P>
        <P>
          That's why most wealth isn't built by brilliant trades. The investor who averages a reasonable 8% for
          30 years almost always beats the one who chases 30% for 5 years and then blows up.{' '}
          <Strong>Consistency, repeated over a long time, is the strategy.</Strong>
        </P>
      </LessonSection>

      <LessonSection title="See it for yourself" icon="🎛">
        <P>
          Drag the sliders — starting amount, monthly contribution, return rate, years. Watch the gap between{' '}
          <Strong>invested</Strong> (what you put in) and <Strong>total</Strong> (what it became) explode in the
          later years. That gap is compounding.
        </P>
        <CompoundingVisualizer />
        <Callout type="tip" title="The one thing to remember">
          Compounding rewards three behaviors above all: starting early, staying consistent, and never interrupting
          the process. The first decade of investing generates returns for every decade that follows.
        </Callout>
      </LessonSection>

      <LessonSection title="Why time dominates everything" icon="⏳">
        <P>Same $300/month, same 8% return — the only variable is when they start. Guess who wins, then check:</P>
        <ScenarioWidget
          title="Who ends up with more at age 60?"
          scenarios={[
            {
              label: 'Early Start Emma',
              description: 'Invests $300/month from age 22 to 32 (10 years), then stops entirely.',
              details:
                'Total invested: $36,000. By age 60: ~$540,000. She contributed for only 10 years, but compounding worked for 28 more. The early years do the heavy lifting.',
            },
            {
              label: 'Late Start Leo',
              description: 'Invests $300/month from age 32 to 60 (28 years), never stopping.',
              details:
                'Total invested: $100,800. By age 60: ~$430,000. Nearly 3× the money over nearly 3× the years — and he still ends up with LESS than Emma. That is the time advantage.',
            },
            {
              label: 'Steady Sarah',
              description: 'Invests $300/month from age 22 to 60 (38 years) without stopping.',
              details:
                'Total invested: $136,800. By age 60: ~$970,000. Early start + consistency is the unbeatable combination.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Survival is the strategy" icon="🛡">
        <P>
          Compounding only works if it's never interrupted. The math is brutally asymmetric: a 50% loss needs a{' '}
          <Strong>100% gain</Strong> just to get back to even; a 75% loss needs 300%. Capital preservation isn't
          boring conservatism — it's the precondition for the whole engine.
        </P>
        <Callout type="warning" title="The asymmetry rule">
          Lose 50%, and you must double your money to break even. This is why avoiding catastrophic drawdowns
          matters more than chasing spectacular gains — and why the investors who build the most lifetime wealth
          are the ones who stayed in the game through multiple cycles.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Average return',
              b: 'Compound return (CAGR)',
              explanation:
                '+50% one year and −50% the next averages to 0% — but you actually lost 25% (100 → 150 → 75). Compounding is multiplicative, not additive. CAGR is the number that matters.',
            },
            {
              a: 'Saving more',
              b: 'Earning higher returns',
              explanation:
                'On a $10,000 portfolio, the difference between 8% and 12% is $400/year — but saving an extra $400/month adds $4,800/year. Early on, your savings rate dominates; only later do returns take over. You have to survive long enough for that handoff.',
            },
            {
              a: 'Dollar-cost averaging',
              b: 'Timing the market',
              explanation:
                'DCA is systematic consistency — it removes the emotional "when" decision entirely. Market timing is prediction, and nobody does it reliably. DCA wins by making the decision boring.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Compounding', definition: 'Earning returns on your returns — the process by which wealth accelerates as gains generate their own gains.' },
            { term: 'CAGR', definition: 'Compound Annual Growth Rate — the smoothed annual rate that actually gets you from start value to end value.' },
            { term: 'Reinvestment', definition: 'Putting dividends, interest, and gains back to work instead of spending them. This is what keeps the engine fed.' },
            { term: 'Time horizon', definition: 'How long the money stays invested. Longer horizons tolerate more volatility and give compounding more runway.' },
            { term: 'Drawdown', definition: 'Peak-to-trough decline. A 30% drawdown means the portfolio fell 30% from its high.' },
            { term: 'Dollar-cost averaging', definition: 'Investing a fixed amount on a fixed schedule regardless of price — removes market timing from the process.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'An investment gains +50% in year one and loses −50% in year two. Where are you?',
              options: [
                'Back to even — the gains and losses cancel out',
                'Up 25%, because the gain came first',
                'Down 25% — compounding is multiplicative, not additive',
                'It depends on the order of the gain and loss',
              ],
              correct: 2,
              explanation:
                '$100 → $150 → $75. Percentage changes multiply: 1.5 × 0.5 = 0.75. The order doesn\'t matter — you end at 75% either way. This is why "average return" can badly mislead.',
            },
            {
              question: 'Why does Emma (invests age 22–32, then stops) beat Leo (invests age 32–60)?',
              options: [
                'She picked better investments',
                'Her early contributions compound for far longer — the earliest dollars have the longest runway',
                'She invested more money in total',
                'She avoided a market crash that hit Leo',
              ],
              correct: 1,
              explanation:
                'Leo invested nearly 3× as much, for nearly 3× as long, and still ends with less. Each of Emma\'s early dollars compounds for ~30+ years; each year of head start is disproportionately valuable.',
            },
            {
              question: 'What is the single biggest threat to long-term compounding?',
              options: [
                'A year of below-average returns',
                'High inflation',
                'Paying too much in taxes',
                'Interrupting the process — panic-selling, forced selling, or a catastrophic loss',
              ],
              correct: 3,
              explanation:
                'Mediocre years are survivable; the curve barely notices. What kills compounding is breaking the chain: a 50% loss needs a 100% recovery, and selling at the bottom converts a temporary drawdown into a permanent one.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why does starting early matter so much?', answer: 'Compounding is exponential — returns earned in year 1 generate their own returns every year after. The earliest contributions have the longest runway, making them disproportionately valuable.' },
            { question: 'Why is a 50% loss worse than a 50% gain is good?', answer: 'Asymmetry: a 50% loss on $100 leaves $50, and a 50% gain from there only reaches $75. Recovering fully requires a 100% gain. Losses hurt more than equivalent gains help.' },
            { question: 'What matters more — behavior or intelligence?', answer: 'Behavior. Consistent contributions, not panicking in drawdowns, reinvesting returns, and staying invested for decades beat stock-picking skill in nearly every real-world case.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Core force', value: 'Compounding — returns generating their own returns. Flat for years, then explosive.' },
          { label: 'Key variable', value: 'Time. Start early, stay invested. The first decade powers all the rest.' },
          { label: 'Key behavior', value: 'Consistency beats brilliance. DCA makes the decision boring — that\'s the point.' },
          { label: 'Key risk', value: 'Interruption: panic-selling, forced selling, catastrophic loss.' },
          { label: 'Asymmetry rule', value: '−50% needs +100% to recover; −75% needs +300%. Protect capital.' },
          { label: 'Average ≠ CAGR', value: '+50% then −50% averages 0% but compounds to −25%. Trust CAGR.' },
        ]}
      />
    </LessonLayout>
  )
}
