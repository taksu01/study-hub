import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { PortfolioBucketMap, TabbedContent, CompareTable, ScenarioWidget, ExpandableCardGrid } from '../../components/ui'

export default function PortfolioConstruction({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m4"
      lessonId="portfolio-construction"
      subtitle="The mix of asset classes you choose matters more than any stock you'll ever pick. Set the allocation, keep it simple, and let rebalancing do the disciplined work for you."
      onNavigate={onNavigate}
    >
      <LessonSection title="Allocation is the decision" icon="🏗">
        <P>
          Here's the uncomfortable truth about stock-picking: <Strong>your strategic asset allocation — the mix of
          stocks, bonds, gold, and cash — drives roughly 90% of your long-term results</Strong>. Which specific
          fund or stock you pick within each class is fine-tuning by comparison.
        </P>
        <P>
          There's also no single correct portfolio. The right mix depends on time horizon, income stability, and
          risk capacity — a 25-year-old with a stable salary and a 55-year-old near retirement need different
          machines. <Strong>The goal isn't the highest-returning portfolio; it's one you can actually stick with
          through full market cycles.</Strong>
        </P>
      </LessonSection>

      <LessonSection title="The construction process" icon="🧭">
        <P>Investors typically build in this order — each step constrains the next:</P>
        <StepFlow
          steps={[
            {
              label: 'Define time horizons',
              detail: 'Money needed in < 3 years belongs in cash/money market — never in volatile assets. 10+ year money can tolerate a heavy equity allocation.',
            },
            {
              label: 'Assess risk capacity',
              detail: 'Objective, not emotional: income stability, emergency reserve, debt, dependents, horizon. Capacity — not feelings — sets the risk budget.',
            },
            {
              label: 'Set the strategic allocation',
              detail: 'The long-term target mix, e.g. 60% equities / 20% bonds / 10% gold / 10% cash. This is the master decision. It changes rarely — when life changes, not when markets do.',
            },
            {
              label: 'Size positions within it',
              detail: 'Core broad ETFs 60–80%; satellites (individual stocks, gold, crypto) 5–20% each; speculative bets 1–5% max. High conviction never excuses oversized volatile positions.',
            },
            {
              label: 'Keep the emergency reserve separate',
              detail: '3–6 months of expenses outside the portfolio entirely. It prevents forced selling — the thing that breaks compounding.',
            },
            {
              label: 'Rebalance periodically',
              detail: 'Annually, or when an allocation drifts more than ~5% from target. Restore the plan — mechanically, without a market opinion.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Core–satellite: simple beats clever" icon="🛰">
        <P>
          A structure that keeps portfolios both simple and interesting: a boring, diversified{' '}
          <Strong>core</Strong> that does most of the work, plus small <Strong>satellites</Strong> for conviction
          bets. The evidence is humbling — simple 2–4 fund portfolios routinely beat complex ones, because
          complexity multiplies decisions, costs, and chances to make a behavioral mistake.
        </P>
        <ExpandableCardGrid
          columns={2}
          cards={[
            {
              title: 'Core (60–80%)',
              subtitle: 'The engine room',
              content: 'Broad, cheap index ETFs held for decades. Boring on purpose — it captures market returns with minimal decisions.',
              details: 'Think one global equity ETF plus a bond ETF. Rarely touched except to rebalance. This is where compounding actually happens.',
              color: 'indigo',
            },
            {
              title: 'Satellites (20–40%)',
              subtitle: 'The conviction sleeve',
              content: 'Smaller positions expressing specific views: individual stocks, gold, BTC, sector or thematic ETFs.',
              details: 'Each satellite stays small enough (5–20%, speculative 1–5%) that being wrong is survivable. If a satellite thesis fails, the core keeps the portfolio on track.',
              color: 'orange',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Three risk profiles, three mixes" icon="🗺">
        <P>
          Educational models only — the point is seeing how the <Strong>same building blocks resize</Strong> as
          risk capacity and horizon change. Tap the buckets.
        </P>
        <TabbedContent
          tabs={[
            {
              label: 'Conservative',
              content: (
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    Capital preservation focus — short horizon or low risk capacity
                  </p>
                  <PortfolioBucketMap
                    buckets={[
                      { name: 'Cash/MM', allocation: '25%', description: 'Large safety buffer. Highly liquid. Reflects a short time horizon or low risk capacity.', color: 'green', assets: ['Money Market Fund', 'T-Bills'] },
                      { name: 'Bonds', allocation: '40%', description: 'Core stability layer. Government bonds for safety, some investment grade corporate for yield.', color: 'blue', assets: ['Gov Bonds', 'Investment Grade', 'TIPS'] },
                      { name: 'Equities', allocation: '25%', description: 'Modest growth exposure. Broad index, mostly developed markets.', color: 'indigo', assets: ['Global Equity ETF', 'Dividend ETF'] },
                      { name: 'Gold', allocation: '10%', description: 'Defensive hedge. Portfolio stabilizer.', color: 'orange', assets: ['Gold ETF'] },
                    ]}
                  />
                </div>
              ),
            },
            {
              label: 'Balanced',
              content: (
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    Long-term wealth building — the classic middle path
                  </p>
                  <PortfolioBucketMap
                    buckets={[
                      { name: 'Cash/MM', allocation: '10%', description: 'Lean cash position. Full emergency fund sits outside the portfolio.', color: 'green', assets: ['Money Market Fund'] },
                      { name: 'Bonds', allocation: '15%', description: 'Stability buffer. Mix of government and corporate.', color: 'blue', assets: ['Bond ETF', 'Gov Bonds'] },
                      { name: 'Equities', allocation: '50%', description: 'Core growth engine. Diversified globally.', color: 'indigo', assets: ['MSCI World ETF', 'S&P 500', 'Emerging Markets'] },
                      { name: 'Gold', allocation: '10%', description: 'Macro hedge. Non-correlated diversifier.', color: 'orange', assets: ['Gold ETF'] },
                      { name: 'BTC', allocation: '5%', description: 'Asymmetric position. Small but impactful if the thesis plays out.', color: 'slate', assets: ['Bitcoin'] },
                      { name: 'Other', allocation: '10%', description: 'REITs, thematic, or tactical positions.', color: 'teal', assets: ['REIT ETF', 'Sector ETFs'] },
                    ]}
                  />
                </div>
              ),
            },
            {
              label: 'Aggressive',
              content: (
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    High capacity, long horizon — and tolerance for deep drawdowns
                  </p>
                  <PortfolioBucketMap
                    buckets={[
                      { name: 'Cash', allocation: '5%', description: 'Minimal cash beyond the reserve. Fully deployed approach.', color: 'green', assets: ['Money Market'] },
                      { name: 'Equities', allocation: '65%', description: 'Heavy equity allocation. Diversified globally with growth tilts.', color: 'indigo', assets: ['Global ETFs', 'Growth ETF', 'Emerging Markets', 'Small Cap'] },
                      { name: 'Gold', allocation: '8%', description: 'Defensive position — kept even in aggressive portfolios.', color: 'orange', assets: ['Gold ETF'] },
                      { name: 'BTC', allocation: '10%', description: 'Larger asymmetric bet. Requires conviction AND tolerance for 50%+ drawdowns.', color: 'slate', assets: ['Bitcoin', 'ETH'] },
                      { name: 'Other', allocation: '12%', description: 'REITs, thematic, individual high-conviction positions.', color: 'teal', assets: ['Sector ETFs', 'Individual Stocks', 'REITs'] },
                    ]}
                  />
                </div>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Rebalancing: the discipline machine" icon="🔄">
        <P>
          Markets move, so allocations drift. Rebalancing restores the targets — and hides a superpower: it{' '}
          <Strong>mechanically sells what's gotten expensive and buys what's gotten cheap</Strong>, with zero
          forecasting required. Work through both directions:
        </P>
        <ScenarioWidget
          title="Target: 60% stocks / 40% bonds on a $100,000 portfolio. What does rebalancing do?"
          scenarios={[
            {
              label: 'Stocks rally +40%',
              description: 'Stocks: $60k → $84k. Bonds flat at $40k. Portfolio = $124k, now 68% stocks.',
              details:
                'You\'re carrying more risk than you chose. Rebalancing sells ~$9.6k of stocks (the winners, at high prices) and buys bonds, restoring 60/40 at $74.4k / $49.6k. You just sold high — not because you predicted a top, but because the rule said so.',
            },
            {
              label: 'Stocks crash −30%',
              description: 'Stocks: $60k → $42k. Bonds flat at $40k. Portfolio = $82k, now 51% stocks.',
              details:
                'Rebalancing sells ~$7.2k of bonds and buys stocks at depressed prices, restoring 60/40 at $49.2k / $32.8k. You just bought low — at the exact moment your emotions were screaming to do the opposite. This is why the rule beats the gut.',
            },
            {
              label: 'Small drift',
              description: 'Stocks creep to 63% over the year. Within the ~5% drift band.',
              details:
                'Do nothing. Rebalancing on every wiggle adds transaction costs and taxes for no benefit. Most investors rebalance annually or when an allocation drifts more than ~5 percentage points from target — whichever comes first.',
            },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          Your allocation decision outweighs every stock pick you'll ever make, and rebalancing is the only
          reliable way most investors ever buy low and sell high — because it's a rule, not a feeling. Simple
          portfolio, firm rules, decades of runway.
        </Callout>
      </LessonSection>

      <LessonSection title="Strategic vs. tactical" icon="🎚">
        <P>
          One more distinction keeps the system honest: the <Strong>strategic</Strong> allocation is the long-term
          plan; <Strong>tactical</Strong> moves are short-term tilts around it. Beginners profit from having only
          the first.
        </P>
        <CompareTable
          headers={['Strategic allocation', 'Tactical allocation']}
          rows={[
            { attribute: 'What it is', values: ['Long-term target allocation', 'Short-term tilts based on market conditions'] },
            { attribute: 'Changes', values: ['Rarely — when life changes', 'Occasionally — based on macro view or valuation'] },
            { attribute: 'Importance', values: ['Drives ~90% of long-term returns', 'Fine-tuning, not the main driver'] },
            { attribute: 'Example', values: ['60% stocks / 20% bonds / 10% gold / 10% cash', 'Trimming equities to 50% because valuations look extreme'] },
            { attribute: 'Risk', values: ['Low — systematic and disciplined', 'Higher — requires judgment, invites over-trading'] },
            { attribute: 'Who benefits', values: ['Everyone', 'Experienced investors with real discipline'] },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Risk tolerance',
              b: 'Risk capacity',
              explanation:
                'Tolerance is psychological — how risk feels. Capacity is structural — how much loss your finances can absorb given income, reserves, and obligations. Portfolios built on capacity survive; feelings change with every headline, financial structure doesn\'t.',
            },
            {
              a: 'Rebalancing',
              b: 'Market timing',
              explanation:
                'Rebalancing is systematic: restore targets on a schedule regardless of your market view. Timing is discretionary: act on predictions. They can produce the same trade — selling stocks after a rally — but one is a process and the other is a guess.',
            },
            {
              a: 'Diversification',
              b: 'Over-diversification',
              explanation:
                'Diversification reduces risk efficiently. Owning 50 overlapping ETFs adds complexity, cost, and decision fatigue without meaningfully reducing risk further. A handful of genuinely different holdings captures most of the benefit — simple portfolios win partly because they\'re easier to stick with.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Strategic allocation', definition: 'The baseline long-term mix of asset classes, matched to goals and risk capacity. The single most consequential investment decision.' },
            { term: 'Tactical allocation', definition: 'Temporary adjustments around the strategic mix based on market conditions. Optional, and dangerous without discipline.' },
            { term: 'Rebalancing', definition: 'Periodically restoring the portfolio to its target allocation — mechanically enforcing buy-low, sell-high.' },
            { term: 'Risk capacity', definition: 'Your financial ability to absorb losses — set by income stability, reserves, horizon, and obligations. Objective, unlike tolerance.' },
            { term: 'Core–satellite', definition: 'Structure with broad index core holdings (60–80%) plus small conviction satellites (20–40% total).' },
            { term: 'Drift', definition: 'How far an allocation has wandered from target as markets move. A common trigger: rebalance at ~5 points of drift.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What drives roughly 90% of a portfolio\'s long-term returns?',
              options: [
                'Picking the best individual stocks within each asset class',
                'The strategic asset allocation — the mix of asset classes held',
                'Perfectly timing entries and exits',
                'Choosing the broker with the lowest fees',
              ],
              correct: 1,
              explanation:
                'The stocks/bonds/gold/cash mix explains the overwhelming majority of long-term results. Security selection and timing are fine-tuning by comparison — which is why the allocation decision deserves the most thought and the picks the least.',
            },
            {
              question: 'Your target is 60/40 and a stock rally pushes equities to 72%. Rebalancing means…',
              options: [
                'Buying more stocks — momentum says the rally will continue',
                'Selling everything and waiting in cash for a crash',
                'Selling some stocks (high) and buying bonds to restore 60/40 — no prediction involved',
                'Changing the target to 72/28 since stocks are clearly stronger now',
              ],
              correct: 2,
              explanation:
                'Rebalancing trims what grew expensive and tops up what lagged, purely to restore the chosen risk level. The buy-low/sell-high behavior is a side effect of the rule — that\'s exactly what makes it achievable when emotions say otherwise. Changing the target to chase winners defeats the whole system.',
            },
            {
              question: 'Why do simple 2–4 fund portfolios so often beat complex ones?',
              options: [
                'Simple portfolios are guaranteed higher returns by index providers',
                'Fewer holdings means less diversification, which boosts returns',
                'Complexity adds costs, overlapping exposures, and decisions — more chances for behavioral mistakes',
                'Complex portfolios are illegal for retail investors in most countries',
              ],
              correct: 2,
              explanation:
                'Every extra holding is another fee, another thing to monitor, and another temptation to tinker. Since a few genuinely different assets capture most diversification benefits, complexity mostly adds failure modes. The best portfolio is the one you can actually stick with for decades.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why is strategic allocation the most important investment decision?', answer: 'It drives roughly 90% of long-term portfolio returns. The overall mix of asset classes matters far more than which specific stocks or funds you pick within those classes — so it deserves the most care and the fewest changes.' },
            { question: 'Why does rebalancing force buy-low, sell-high behavior?', answer: 'Drift happens because winners grew and laggards shrank. Restoring targets therefore means selling what recently rose (at higher prices) and buying what recently fell (at lower prices) — a disciplined pattern most investors can\'t execute on gut feel, especially during crashes.' },
            { question: 'What is the difference between the emergency reserve and investment cash?', answer: 'The emergency reserve (3–6 months of expenses) sits completely outside the portfolio — it\'s insurance against life shocks and prevents forced selling. Investment cash is part of the allocation, held as dry powder for deployment. Never raid the reserve for opportunities.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Master decision', value: 'Strategic allocation drives ~90% of returns. Set it from risk capacity + horizon.' },
          { label: 'Build order', value: 'Horizons → risk capacity → allocation → position sizes → reserve → rebalance.' },
          { label: 'Core–satellite', value: 'Broad index core 60–80%; conviction satellites small (speculative 1–5%).' },
          { label: 'Rebalancing', value: 'Annually or at ~5% drift. Mechanically sells high, buys low — no forecast needed.' },
          { label: 'Reserve rule', value: '3–6 months of expenses outside the portfolio. Prevents forced selling.' },
          { label: 'Golden rule', value: 'The best portfolio is the one you can stick with through full cycles.' },
        ]}
      />
    </LessonLayout>
  )
}
