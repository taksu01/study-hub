import {
  SectionShell, SectionHeader, Subsection, Prose, CompareTable,
  AssetRoleCards, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, PortfolioBucketMap
} from '../components/ui'

export default function Section07() {
  return (
    <SectionShell id="section-7">
      <SectionHeader
        number={7}
        title="How Different Assets Play Different Jobs"
        subtitle="Every asset in your portfolio should have a clear role. When you know why you hold something, you make better decisions."
      />

      <Subsection title="The Portfolio Role Framework">
        <Prose>
          <p>The biggest shift from beginner to intermediate investor is moving from "what should I buy?" to "what role does each asset play?" A portfolio is not a collection of things you like — it's a system where each piece serves a purpose.</p>
          <p>Click each asset card to explore its strengths, weaknesses, and portfolio role.</p>
        </Prose>
      </Subsection>

      <Subsection title="Four Core Asset Roles">
        <AssetRoleCards assets={[
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
              'Passive index approach is evidence-backed',
            ],
            weaknesses: [
              'High short-term volatility (30-50% drawdowns happen)',
              'Requires long time horizon to ride out cycles',
              'Individual stocks carry bankruptcy risk',
              'Vulnerable in severe recessions and rate hiking cycles',
            ],
            color: 'indigo',
          },
          {
            name: 'Gold',
            role: 'Defensive hedge against monetary debasement, geopolitical risk, and systemic stress.',
            strengths: [
              'Uncorrelated with stocks over long periods',
              'Central banks accumulate it — institutional trust',
              'Performs well during real rate declines and currency crises',
              'No counterparty risk (physical gold)',
              'Thousands of years of monetary history',
            ],
            weaknesses: [
              'Non-productive — generates no income',
              'Can underperform for years/decades in stable growth environments',
              'Opportunity cost vs. equities in bull markets',
              'Storage/security costs for physical gold',
            ],
            color: 'orange',
          },
          {
            name: 'Bitcoin (BTC)',
            role: 'High-volatility asymmetric position. Digital scarcity play with macro narrative, meaningful upside, and significant risk.',
            strengths: [
              'Fixed supply (21M) — scarcity in a world of monetary expansion',
              'Highest-returning major asset class over the last decade',
              'Asymmetric upside potential (small position, large impact)',
              'Decentralized — no single point of control',
              'Growing institutional adoption and regulatory clarity',
            ],
            weaknesses: [
              '50-80% drawdowns are historically normal',
              'No income generation',
              'Regulatory uncertainty in many jurisdictions',
              'Still relatively young (15 years of price history)',
              'Highly correlated with risk-on sentiment in the short term',
              'Position sizing is critical — 5% feels very different from 50%',
            ],
            color: 'slate',
          },
        ]} />
      </Subsection>

      <Subsection title="Example Portfolio Buckets">
        <Prose>
          <p>This is an educational model showing how different investors might allocate across asset roles. Click each bucket to see its purpose. These are learning examples, not investment advice.</p>
        </Prose>
        <div className="mt-4" />
        <p className="text-xs text-slate-500 mb-2 font-medium">Balanced Growth Portfolio (educational example)</p>
        <PortfolioBucketMap buckets={[
          { name: 'Cash/MM', allocation: '10%', description: 'Safety buffer and optionality. Covers emergency reserve and near-term needs. Money market fund for slightly better yield.', color: 'green', assets: ['Money Market Fund', 'High-Yield Savings', 'T-Bills'] },
          { name: 'Bonds', allocation: '15%', description: 'Stability and income layer. Dampens portfolio volatility. Government bonds for safety, some corporate for yield.', color: 'blue', assets: ['Government Bonds', 'Investment Grade Corporate', 'Bond ETF'] },
          { name: 'Equities', allocation: '50%', description: 'Core growth engine. Diversified across geographies. Broad index ETFs as the base, with possible tilts.', color: 'indigo', assets: ['Global Equity ETF', 'S&P 500 ETF', 'International Developed', 'Emerging Markets'] },
          { name: 'Gold', allocation: '10%', description: 'Macro hedge and portfolio stabilizer. Non-correlated with equities. Defensive allocation for uncertain environments.', color: 'orange', assets: ['Gold ETF', 'Physical Gold'] },
          { name: 'BTC', allocation: '5%', description: 'Asymmetric position. Small enough that a total loss is survivable, large enough that significant upside moves the needle.', color: 'slate', assets: ['Bitcoin', 'BTC ETF'] },
          { name: 'Other', allocation: '10%', description: 'Tactical positions, REITs, or additional exposures based on conviction and macro view.', color: 'teal', assets: ['REIT ETF', 'Commodity ETF', 'Thematic Positions'] },
        ]} />
      </Subsection>

      <Subsection title="Tradeoff Comparison">
        <CompareTable
          headers={['Cash/MM', 'Equities', 'Gold', 'BTC']}
          rows={[
            { attribute: 'Growth Potential', values: ['Very Low', 'High', 'Moderate', 'Very High (uncertain)'] },
            { attribute: 'Drawdown Risk', values: ['None', '30-50%', '20-40%', '50-80%'] },
            { attribute: 'Income', values: ['Some (MM)', 'Dividends', 'None', 'None'] },
            { attribute: 'Inflation Hedge', values: ['Poor', 'Good (long-term)', 'Good', 'Debated'] },
            { attribute: 'Crisis Behavior', values: ['Rock solid', 'Drops first', 'Often rises', 'Drops hard, then may rally'] },
            { attribute: 'Productive?', values: ['No', 'Yes', 'No', 'No'] },
            { attribute: 'Liquidity', values: ['Instant', 'High (ETFs)', 'High (ETFs)', 'High (exchanges)'] },
            { attribute: 'Biggest strength', values: ['Safety', 'Long-term returns', 'Non-correlation', 'Asymmetric upside'] },
            { attribute: 'Biggest weakness', values: ['Inflation erosion', 'Volatility', 'No income, can lag', 'Extreme volatility'] },
          ]}
        />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Asset Role', definition: 'The specific job an asset does in your portfolio — growth, stability, hedge, income, or optionality.' },
          { term: 'Asymmetric Bet', definition: 'A position where the potential upside far exceeds the downside. BTC with a small allocation is asymmetric — you can only lose 5% of your portfolio but might gain much more.' },
          { term: 'Macro Hedge', definition: 'An asset that protects against macroeconomic risks like inflation, currency debasement, or recession. Gold is the classic macro hedge.' },
          { term: 'Productive Asset', definition: 'An asset that generates economic value — businesses (stocks) earn profits. Non-productive assets (gold, BTC) store value but don\'t generate output.' },
          { term: 'Position Sizing', definition: 'How much of your portfolio is in each asset. Size determines how much an asset\'s performance affects your overall wealth.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Liking an asset', itemB: 'Giving it a large allocation', explanation: 'You can believe strongly in an asset\'s future while still keeping its allocation modest. BTC might 10x, but a 50% allocation means a 50% drawdown hits half your wealth. Role clarity and position sizing matter more than conviction.' },
          { itemA: 'Gold and BTC', itemB: 'Interchangeable stores of value', explanation: 'They share the "non-productive store of value" narrative but behave very differently. Gold is low-volatility and defensive. BTC is high-volatility and speculative. They play different roles in a portfolio.' },
          { itemA: 'Equities performing well', itemB: 'Equities being safe', explanation: 'A long bull run doesn\'t reduce risk — it often increases it by inflating valuations. Equities are the best long-term asset class AND can drop 40-50% in a year. Both things are true simultaneously.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Why should every asset in your portfolio have a defined role?', answer: 'Because without a role, you don\'t know when to add, reduce, or hold. If BTC drops 50%, your reaction should be different depending on whether it\'s a 5% asymmetric position or 50% of your net worth. Role clarity enables rational decisions.' },
          { question: 'Why does position sizing matter more than asset selection?', answer: 'Because a 5% position that goes to zero costs you 5%. A 50% position that drops 50% costs you 25% of your wealth. The same asset can be smart at one size and reckless at another.' },
          { question: 'What makes equities the "growth engine" of a portfolio?', answer: 'Equities are productive — they represent ownership in businesses that generate revenue, profits, and innovation. Over long periods, this productivity compounds into the highest returns of any traditional asset class.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Cash/MM', value: 'Safety + optionality. No growth, total stability.' },
          { label: 'Equities', value: 'Growth engine. Productive but volatile.' },
          { label: 'Gold', value: 'Defensive macro hedge. Non-correlated, non-productive.' },
          { label: 'BTC', value: 'Asymmetric. High potential, extreme vol. Size carefully.' },
          { label: 'Framework', value: 'Every asset needs a role. No role = random exposure.' },
          { label: 'Sizing Rule', value: 'Position size determines impact. Conviction ≠ allocation.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
