import {
  SectionShell, SectionHeader, Subsection, Prose,
  TermsMemoryBlock, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout, CompoundingVisualizer, ScenarioWidget
} from '../components/ui'

export default function Section03() {
  return (
    <SectionShell id="section-3">
      <SectionHeader
        number={3}
        title="How Wealth Actually Grows"
        subtitle="Compounding, time, and consistency — the mechanics behind long-term wealth creation."
      />

      <Subsection title="The Core Mechanic">
        <Prose>
          <p>Compounding is the single most important force in long-term wealth building. It's simple in concept: your returns generate their own returns. But its power is deeply counterintuitive — the effects are tiny at first and enormous later.</p>
          <p>Most wealth is built not by brilliant decisions but by consistent, reasonable decisions repeated over a long time. The investor who averages 8% annually for 30 years will almost certainly outperform the one who chases 30% returns for 5 years and then blows up.</p>
        </Prose>
        <InfoCallout type="tip">
          Compounding rewards three things above all else: starting early, staying consistent, and not interrupting the process. Every year you wait costs more than you think, and every year you stay invested matters more than you expect.
        </InfoCallout>
      </Subsection>

      <Subsection title="See It for Yourself">
        <Prose>
          <p>Adjust the sliders below to see how starting amount, monthly contributions, return rate, and time interact. Pay special attention to how the gap between "invested" (dark) and "total" (light) grows exponentially in later years.</p>
        </Prose>
        <div className="mt-4" />
        <CompoundingVisualizer />
      </Subsection>

      <Subsection title="Why Time Is the Dominant Variable">
        <ScenarioWidget
          title="Who ends up with more?"
          scenarios={[
            {
              label: 'Early Start Emma',
              description: 'Emma invests $300/month from age 22 to 32 (10 years), then stops entirely.',
              details: 'Total invested: $36,000. At 8% annual return, by age 60: ~$540,000. She contributed for only 10 years but let compounding work for 28 more years. The early start gives compounding time to do the heavy lifting.',
            },
            {
              label: 'Late Start Leo',
              description: 'Leo invests $300/month from age 32 to 60 (28 years), and never stops.',
              details: 'Total invested: $100,800. At 8% annual return, by age 60: ~$430,000. Despite investing nearly 3x as much money for nearly 3x as long, Leo ends up with LESS than Emma. This is the time advantage in action.',
            },
            {
              label: 'Steady Sarah',
              description: 'Sarah invests $300/month from age 22 to 60 (38 years) without stopping.',
              details: 'Total invested: $136,800. At 8% annual return, by age 60: ~$970,000. Combining early start with consistency produces the best outcome. The first decade of investing generates returns for every subsequent decade.',
            },
          ]}
        />
      </Subsection>

      <Subsection title="Behavior Beats Brilliance">
        <Prose>
          <p>The investing world celebrates stock-pickers, macro callers, and dramatic trades. But the data consistently shows that the most important factor in long-term wealth is behavior, not brilliance.</p>
        </Prose>
        <div className="grid md:grid-cols-2 gap-4 mt-4 mb-6">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <h4 className="font-semibold text-sm text-emerald-800 mb-2">What Actually Builds Wealth</h4>
            <ul className="space-y-1.5 text-sm text-emerald-700">
              <li>• Consistent contributions over decades</li>
              <li>• Not panicking during drawdowns</li>
              <li>• Reinvesting returns</li>
              <li>• Keeping costs low</li>
              <li>• Not interrupting compounding</li>
              <li>• Living below your means</li>
              <li>• Having patience</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <h4 className="font-semibold text-sm text-rose-800 mb-2">What Feels Important But Isn't</h4>
            <ul className="space-y-1.5 text-sm text-rose-700">
              <li>• Timing the exact bottom</li>
              <li>• Picking the "best" stock this year</li>
              <li>• Reacting to every news headline</li>
              <li>• Switching strategies every quarter</li>
              <li>• Finding the next 100x moonshot</li>
              <li>• Having an opinion on every market move</li>
              <li>• Checking your portfolio daily</li>
            </ul>
          </div>
        </div>
      </Subsection>

      <Subsection title="Why Survival Matters">
        <Prose>
          <p>Compounding only works if you stay in the game. The biggest threat to compounding is not low returns — it's interruption. A 50% loss requires a 100% gain just to get back to even. This is why capital preservation is not boring conservatism — it's the precondition for compounding to work.</p>
          <p>The investors who build the most wealth over a lifetime are not the ones who had the highest single-year return. They're the ones who avoided catastrophic losses and stayed invested through multiple cycles.</p>
        </Prose>
        <InfoCallout type="warning">
          A 50% drawdown requires a 100% recovery to break even. A 75% drawdown requires 300%. This asymmetry is why risk management is not optional — it's the mechanism that keeps compounding alive.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Compounding', definition: 'Earning returns on your returns. The process by which wealth accelerates over time as gains generate their own gains.' },
          { term: 'Reinvestment', definition: 'Taking the returns (dividends, interest, gains) and putting them back into investments rather than spending them.' },
          { term: 'Time Horizon', definition: 'How long you plan to keep money invested before needing it. Longer horizons allow more risk and more compounding.' },
          { term: 'CAGR', definition: 'Compound Annual Growth Rate — the smoothed annual rate of return that gets you from starting value to ending value.' },
          { term: 'Drawdown', definition: 'The peak-to-trough decline in an investment\'s value. A 30% drawdown means the investment fell 30% from its highest point.' },
          { term: 'Dollar-Cost Averaging (DCA)', definition: 'Investing a fixed amount at regular intervals regardless of price. Reduces the impact of volatility and removes the need to time the market.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Average return', itemB: 'Compound return (CAGR)', explanation: 'If an investment returns +50% one year and -50% the next, the average return is 0%. But the compound return is -25% (you\'re left with 75% of what you started with). Compounding is multiplicative, not additive.' },
          { itemA: 'Saving more', itemB: 'Earning higher returns', explanation: 'In the early years, saving more has a bigger impact than earning higher returns. On a $10,000 portfolio, the difference between 8% and 12% is $400. But saving an extra $400/month adds $4,800/year. Over time, returns dominate — but you have to survive long enough.' },
          { itemA: 'Dollar-cost averaging', itemB: 'Timing the market', explanation: 'DCA is about systematic consistency. Market timing is about prediction. DCA works because it removes the emotional decision of when to invest. Timing fails because no one can consistently predict short-term movements.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Why does an early start matter so much?', answer: 'Because compounding is exponential. The returns you earn in year 1 generate their own returns for every subsequent year. Each early year has the longest runway, making it disproportionately valuable.' },
          { question: 'Why is a 50% loss worse than a 50% gain is good?', answer: 'Because of asymmetry. A 50% loss on $100 leaves you with $50. A 50% gain on $50 only brings you to $75. You need a 100% gain to recover from a 50% loss. This is why avoiding large drawdowns matters more than chasing large gains.' },
          { question: 'What matters more: behavior or intelligence?', answer: 'Behavior. Consistently investing, not panicking, reinvesting returns, and maintaining discipline over decades beats stock-picking skill and market-timing attempts in nearly all cases.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Core Force', value: 'Compounding — returns generating their own returns' },
          { label: 'Key Variable', value: 'Time. Start early. Stay invested.' },
          { label: 'Key Behavior', value: 'Consistency beats brilliance' },
          { label: 'Key Risk', value: 'Interrupting compounding through panic, forced selling, or catastrophic loss' },
          { label: 'DCA', value: 'Fixed amount at regular intervals — removes timing pressure' },
          { label: 'Asymmetry Rule', value: '50% loss needs 100% gain to recover. Protect capital.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
