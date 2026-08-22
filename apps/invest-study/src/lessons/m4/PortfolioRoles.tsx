import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { AssetRoleCards, PortfolioBucketMap, ExpandableCardGrid, CompareTable } from '../../components/ui'

export default function PortfolioRoles({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m4"
      lessonId="portfolio-roles"
      subtitle="Every holding needs a job — growth, income, stability, hedge, or dry powder. When you know why you own something, you know exactly what to do when it moves."
      onNavigate={onNavigate}
    >
      <LessonSection title="A portfolio is a team, not a collection" icon="🧩">
        <P>
          The biggest shift from beginner to intermediate investor is moving from{' '}
          <Strong>"what should I buy?"</Strong> to <Strong>"what job does each holding do?"</Strong> A portfolio
          isn't a pile of things you like — it's a system where every piece serves a purpose, like players on a team.
        </P>
        <P>
          Role clarity is what makes decisions rational later. If a holding drops 50%, your correct reaction depends
          entirely on what job it was hired for — a hedge doing its thing, or a growth engine breaking down.{' '}
          <Strong>No role means random exposure.</Strong>
        </P>
      </LessonSection>

      <LessonSection title="The five jobs" icon="🎯">
        <P>Nearly every sensible holding fills one of five roles. Tap each card:</P>
        <ExpandableCardGrid
          columns={3}
          cards={[
            {
              title: 'Growth',
              content: 'Compounds wealth over decades. Volatile by nature — that\'s the price of the returns.',
              details: 'Typical holders: broad equity ETFs, individual stocks. Judged on years, not quarters.',
              color: 'indigo',
            },
            {
              title: 'Income',
              content: 'Produces cash flow you can spend or reinvest — dividends, coupons, rent.',
              details: 'Typical holders: bonds, dividend stocks, REITs. Steadies the ride and feeds reinvestment.',
              color: 'blue',
            },
            {
              title: 'Stability',
              content: 'Dampens the swings so the whole portfolio is survivable in a crash.',
              details: 'Typical holders: government bonds, money market funds. Low return is the point, not a flaw.',
              color: 'green',
            },
            {
              title: 'Hedge',
              content: 'Zigs when everything else zags. Protection against inflation, crisis, or currency stress.',
              details: 'Typical holder: gold. Expect it to lag for years in calm markets — that\'s normal for insurance.',
              color: 'orange',
            },
            {
              title: 'Dry powder',
              content: 'Cash waiting for opportunity. Lets you buy when others are forced to sell.',
              details: 'Typical holders: money market, T-bills. Loses slowly to inflation — the cost of optionality.',
              color: 'teal',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Four assets, four résumés" icon="📇">
        <P>
          Here are the four assets you'll see in most modern portfolios, each with its role, strengths, and
          weaknesses. Tap a card to expand it — notice how <Strong>every strength has a matching weakness</Strong>.
          That's why they're combined instead of chosen.
        </P>
        <AssetRoleCards
          assets={[
            {
              name: 'Cash & Money Market',
              role: 'Stability, liquidity, and optionality. Your ability to survive shocks and act on opportunities.',
              strengths: [
                'Instant liquidity — available when you need it',
                'Zero volatility — no risk of drawdown',
                'Optionality — lets you buy when others are forced to sell',
                'Psychological safety — reduces panic during crashes',
              ],
              weaknesses: [
                'Loses to inflation over time',
                'Earns minimal real return',
                'Too much cash = drag on long-term growth',
                'Opportunity cost when markets are rising',
              ],
              color: 'green',
            },
            {
              name: 'Equities / ETFs',
              role: 'The long-term growth engine. Productive businesses generating returns through economic activity.',
              strengths: [
                'Highest long-term expected returns of traditional assets',
                'Productive — real businesses creating real value',
                'Deeply liquid (broad ETFs)',
                'Inflation-beating over long periods',
              ],
              weaknesses: [
                'High short-term volatility (30–50% drawdowns happen)',
                'Requires a long horizon to ride out cycles',
                'Individual stocks carry bankruptcy risk',
                'Vulnerable in recessions and rate-hiking cycles',
              ],
              color: 'indigo',
            },
            {
              name: 'Gold',
              role: 'Defensive hedge against monetary debasement, geopolitical risk, and systemic stress.',
              strengths: [
                'Uncorrelated with stocks over long periods',
                'Central banks accumulate it — institutional trust',
                'Performs well when real rates fall or currencies wobble',
                'No counterparty risk (physical gold)',
              ],
              weaknesses: [
                'Non-productive — generates no income',
                'Can underperform for years in stable growth environments',
                'Opportunity cost vs. equities in bull markets',
                'Storage/security costs for physical gold',
              ],
              color: 'orange',
            },
            {
              name: 'Bitcoin (BTC)',
              role: 'High-volatility asymmetric position. Digital scarcity with meaningful upside and significant risk.',
              strengths: [
                'Fixed supply (21M) — scarcity in a world of monetary expansion',
                'Highest-returning major asset of the last decade',
                'Asymmetric upside — small position, large potential impact',
                'Growing institutional adoption',
              ],
              weaknesses: [
                '50–80% drawdowns are historically normal',
                'No income generation',
                'Regulatory uncertainty in many jurisdictions',
                'Trades with risk-on sentiment in the short term',
              ],
              color: 'slate',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Roles on a map" icon="🗺">
        <P>
          Here's an educational example of how the roles combine into one portfolio. Tap a bucket to see its job.
          The widths are the allocations — <Strong>size determines impact</Strong>, which is the whole game.
        </P>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          Balanced Growth Portfolio (educational example, not advice)
        </p>
        <PortfolioBucketMap
          buckets={[
            { name: 'Cash/MM', allocation: '10%', description: 'Safety buffer and optionality. Covers near-term needs and lets you act in a crash instead of panicking.', color: 'green', assets: ['Money Market Fund', 'High-Yield Savings', 'T-Bills'] },
            { name: 'Bonds', allocation: '15%', description: 'Stability and income layer. Dampens portfolio volatility. Government bonds for safety, some corporate for yield.', color: 'blue', assets: ['Government Bonds', 'Investment Grade Corporate', 'Bond ETF'] },
            { name: 'Equities', allocation: '50%', description: 'Core growth engine. Diversified across geographies. Broad index ETFs as the base.', color: 'indigo', assets: ['Global Equity ETF', 'S&P 500 ETF', 'International Developed', 'Emerging Markets'] },
            { name: 'Gold', allocation: '10%', description: 'Macro hedge and stabilizer. Non-correlated with equities — insurance for uncertain environments.', color: 'orange', assets: ['Gold ETF', 'Physical Gold'] },
            { name: 'BTC', allocation: '5%', description: 'Asymmetric position. Small enough that total loss is survivable, large enough that big upside moves the needle.', color: 'slate', assets: ['Bitcoin', 'BTC ETF'] },
            { name: 'Other', allocation: '10%', description: 'Tactical positions, REITs, or extra exposures based on conviction and macro view.', color: 'teal', assets: ['REIT ETF', 'Commodity ETF', 'Thematic Positions'] },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          Conviction is not allocation. You can believe strongly in an asset's future and still size it small —
          a 5% position that goes to zero costs 5%; a 50% position that halves costs a quarter of your wealth.
          Role first, then size, then (and only then) enthusiasm.
        </Callout>
      </LessonSection>

      <LessonSection title="Trade-offs at a glance" icon="⚖️">
        <CompareTable
          headers={['Cash/MM', 'Equities', 'Gold', 'BTC']}
          rows={[
            { attribute: 'Growth potential', values: ['Very low', 'High', 'Moderate', 'Very high (uncertain)'] },
            { attribute: 'Drawdown risk', values: ['None', '30–50%', '20–40%', '50–80%'] },
            { attribute: 'Income', values: ['Some (MM)', 'Dividends', 'None', 'None'] },
            { attribute: 'Inflation hedge', values: ['Poor', 'Good (long-term)', 'Good', 'Debated'] },
            { attribute: 'Crisis behavior', values: ['Rock solid', 'Drops first', 'Often rises', 'Drops hard, then may rally'] },
            { attribute: 'Productive?', values: ['No', 'Yes', 'No', 'No'] },
            { attribute: 'Biggest strength', values: ['Safety', 'Long-term returns', 'Non-correlation', 'Asymmetric upside'] },
            { attribute: 'Biggest weakness', values: ['Inflation erosion', 'Volatility', 'No income, can lag', 'Extreme volatility'] },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Liking an asset',
              b: 'Giving it a large allocation',
              explanation:
                'BTC might 10x — and a 50% allocation still means a 50% drawdown hits half your wealth. The same asset can be smart at 5% and reckless at 50%. Role clarity and position sizing matter more than conviction.',
            },
            {
              a: 'Gold',
              b: 'Bitcoin',
              explanation:
                'They share the "non-productive store of value" narrative but behave completely differently. Gold is low-volatility and defensive — it often rises in a crisis. BTC is high-volatility and trades like a risk asset in the short term. Different jobs, not substitutes.',
            },
            {
              a: 'Equities performing well',
              b: 'Equities being safe',
              explanation:
                'A long bull run doesn\'t reduce risk — it often raises it by inflating valuations. Equities are the best long-term asset class AND can drop 40–50% in a year. Both are true at the same time.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Asset role', definition: 'The specific job an asset does in the portfolio — growth, income, stability, hedge, or dry powder.' },
            { term: 'Asymmetric bet', definition: 'A position where potential upside far exceeds the downside. A small BTC allocation is asymmetric: you can only lose the 5%, but the upside is uncapped.' },
            { term: 'Macro hedge', definition: 'An asset that protects against big-picture risks — inflation, currency debasement, crisis. Gold is the classic example.' },
            { term: 'Productive asset', definition: 'An asset that generates economic output — businesses earn profits. Gold and BTC store value but produce nothing.' },
            { term: 'Position sizing', definition: 'How much of the portfolio each holding gets. Size — not conviction — determines how much a holding can help or hurt you.' },
            { term: 'Dry powder', definition: 'Cash held deliberately for opportunity — the ability to buy when others are forced to sell.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'A holding drops 50%. What should determine your reaction?',
              options: [
                'How far it has fallen — big drops always mean sell',
                'The role and size you gave it — a 5% asymmetric bet and a 50% core position demand different responses',
                'What financial media is saying about it that week',
                'Whether you personally still like the asset',
              ],
              correct: 1,
              explanation:
                'A 5% BTC position halving costs 2.5% of your wealth — survivable by design. The same drop in a 50% position is a crisis. Role clarity, decided in advance, is what makes the reaction rational instead of emotional.',
            },
            {
              question: 'Why do gold and Bitcoin fill different portfolio roles despite the shared "store of value" story?',
              options: [
                'Gold is legal and Bitcoin is not',
                'Bitcoin generates income while gold does not',
                'Gold is low-volatility and often rises in crises; BTC is high-volatility and trades with risk appetite short-term',
                'They are actually interchangeable — either one works',
              ],
              correct: 2,
              explanation:
                'Gold behaves like insurance: boring, defensive, often up when stocks are down. BTC has 50–80% drawdowns and drops with risk assets before any potential rally. One is a hedge; the other is an asymmetric growth bet. Narrative overlap is not behavioral overlap.',
            },
            {
              question: 'What makes equities the "growth engine" rather than gold or cash?',
              options: [
                'They are the least volatile of the three',
                'They are productive — ownership of businesses whose profits compound over time',
                'Governments guarantee stock market returns',
                'They always outperform in every single year',
              ],
              correct: 1,
              explanation:
                'Stocks represent real businesses generating revenue and profits — that productivity is what compounds into the highest long-term returns of any traditional asset class. Gold and cash store value; they don\'t create it. The price is volatility along the way.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why should every asset in a portfolio have a defined role?', answer: 'Without a role you don\'t know when to add, trim, or hold. If BTC drops 50%, the right reaction differs completely between a 5% asymmetric position and 50% of net worth. Role clarity, set in advance, enables rational decisions under stress.' },
            { question: 'Why does position sizing matter more than asset selection?', answer: 'A 5% position that goes to zero costs 5%. A 50% position that merely halves costs 25% of your wealth. The same asset can be a smart bet at one size and a reckless one at another — size determines impact.' },
            { question: 'What is the job of a hedge, and what should you expect from it in calm markets?', answer: 'A hedge (like gold) protects against inflation, crisis, and monetary stress by being uncorrelated with stocks. In calm bull markets, expect it to lag — sometimes for years. That underperformance is the insurance premium, not a failure.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Cash/MM', value: 'Safety + dry powder. No growth, total stability, loses slowly to inflation.' },
          { label: 'Equities', value: 'Growth engine. Productive but volatile — 30–50% drawdowns happen.' },
          { label: 'Gold', value: 'Defensive macro hedge. Non-correlated, non-productive, lags in bull markets.' },
          { label: 'BTC', value: 'Asymmetric bet. Huge potential, 50–80% drawdowns. Size small.' },
          { label: 'Framework', value: 'Every holding needs a job. No role = random exposure.' },
          { label: 'Sizing rule', value: 'Size determines impact. Conviction ≠ allocation.' },
        ]}
      />
    </LessonLayout>
  )
}
