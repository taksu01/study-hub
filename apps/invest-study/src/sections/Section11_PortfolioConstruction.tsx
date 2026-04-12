import {
  SectionShell, SectionHeader, Subsection, Prose, CompareTable,
  ExpandableCardGrid, PortfolioBucketMap, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, ScenarioWidget
} from '../components/ui'

export default function Section11() {
  return (
    <SectionShell id="section-11">
      <SectionHeader
        number={11}
        title="How to Build an Investing System That Matches Real Life"
        subtitle="Portfolio construction is where all the theory becomes practical. It's about matching your money to your life — your goals, timeline, and capacity for risk."
      />

      <Subsection title="Portfolio Construction Is Personal">
        <Prose>
          <p>There is no single correct portfolio. The right portfolio depends entirely on your specific situation: your income stability, time horizon, goals, risk capacity, liquidity needs, and psychological temperament. A portfolio that's perfect for a 25-year-old with stable income and no obligations would be reckless for a 55-year-old approaching retirement.</p>
          <p>The goal is not to build the "highest returning" portfolio. It's to build one you can stick with through multiple market cycles while making progress toward your financial goals.</p>
        </Prose>
      </Subsection>

      <Subsection title="The Construction Framework">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: '1. Define Time Horizons',
            content: 'Different goals have different timelines. Short-term money (< 3 years) and long-term money (10+ years) need different treatments.',
            details: 'Short-term: down payment in 2 years → cash/money market only. Medium-term: 3-7 years → balanced mix with lower volatility. Long-term: 10+ years → can tolerate high equity allocation and more volatility. Never invest short-term money in volatile assets.',
            color: 'blue',
          },
          {
            title: '2. Assess Risk Capacity',
            content: 'How much risk can your financial situation structurally absorb? This is about objective factors, not feelings.',
            details: 'Risk capacity depends on: income stability (stable salary vs freelance), emergency reserve (funded or not), dependents, debt obligations, time horizon, and job security. High capacity: stable income, no debt, full reserve, long horizon. Low capacity: unstable income, debt, no reserve, short horizon.',
            color: 'purple',
          },
          {
            title: '3. Set Strategic Allocation',
            content: 'The baseline mix of asset classes you plan to hold long-term. This is the most important investment decision you make.',
            details: 'Strategic allocation (e.g., 60% equities, 20% bonds, 10% gold, 10% cash) drives ~90% of portfolio returns over time. It should reflect your risk capacity, time horizon, and goals. It changes slowly — perhaps once a year or when your life situation changes materially.',
            color: 'green',
          },
          {
            title: '4. Size Positions Carefully',
            content: 'How much of your portfolio goes to each specific investment. This determines how much each position can help or hurt you.',
            details: 'Core holdings (broad ETFs): 60-80% of the portfolio. Satellite positions (individual stocks, crypto, gold): 5-20% each. Speculative positions: 1-5% maximum. The sizing should reflect your conviction AND the asset\'s risk. High-conviction, high-volatility assets (BTC) should still be modestly sized.',
            color: 'orange',
          },
          {
            title: '5. Maintain Cash Reserve',
            content: 'Always keep a cash layer separate from your investment portfolio. This is non-negotiable.',
            details: 'Emergency fund: 3-6 months of essential expenses in a safe, liquid account. This is NOT part of your investment allocation — it sits outside the portfolio. Investment cash: an additional buffer for opportunities or planned contributions. The reserve prevents forced selling and enables opportunistic buying during drawdowns.',
            color: 'teal',
          },
          {
            title: '6. Rebalance Periodically',
            content: 'Over time, some assets grow faster than others, causing your allocation to drift. Rebalancing brings it back.',
            details: 'If your target is 60% stocks and stocks rally to 75% of your portfolio, you\'re now taking more risk than intended. Rebalancing means selling some of the winners and buying more of the laggards. This is counterintuitive but powerful — it systematically enforces "buy low, sell high." Rebalance annually or when allocations drift more than 5% from targets.',
            color: 'indigo',
          },
        ]} />
      </Subsection>

      <Subsection title="Example Portfolio Models">
        <Prose>
          <p>These are educational models to illustrate how different risk profiles translate to different allocations. They are not personal recommendations. Click each bucket to explore its role.</p>
        </Prose>

        <p className="text-xs text-slate-500 mt-4 mb-2 font-medium">Conservative (Capital Preservation Focus)</p>
        <PortfolioBucketMap buckets={[
          { name: 'Cash/MM', allocation: '25%', description: 'Large safety buffer. Highly liquid. Reflects a short time horizon or low risk capacity.', color: 'green', assets: ['Money Market Fund', 'T-Bills'] },
          { name: 'Bonds', allocation: '40%', description: 'Core stability layer. Government bonds for safety, some investment grade corporate for yield.', color: 'blue', assets: ['Gov Bonds', 'Investment Grade', 'TIPS'] },
          { name: 'Equities', allocation: '25%', description: 'Modest growth exposure. Broad index, mostly developed markets.', color: 'indigo', assets: ['Global Equity ETF', 'Dividend ETF'] },
          { name: 'Gold', allocation: '10%', description: 'Defensive hedge. Portfolio stabilizer.', color: 'orange', assets: ['Gold ETF'] },
        ]} />

        <p className="text-xs text-slate-500 mt-4 mb-2 font-medium">Balanced Growth (Long-Term Wealth Building)</p>
        <PortfolioBucketMap buckets={[
          { name: 'Cash/MM', allocation: '10%', description: 'Lean cash position. Full emergency fund sits outside portfolio.', color: 'green', assets: ['Money Market Fund'] },
          { name: 'Bonds', allocation: '15%', description: 'Stability buffer. Mix of government and corporate.', color: 'blue', assets: ['Bond ETF', 'Gov Bonds'] },
          { name: 'Equities', allocation: '50%', description: 'Core growth engine. Diversified globally.', color: 'indigo', assets: ['MSCI World ETF', 'S&P 500', 'Emerging Markets'] },
          { name: 'Gold', allocation: '10%', description: 'Macro hedge. Non-correlated diversifier.', color: 'orange', assets: ['Gold ETF'] },
          { name: 'BTC', allocation: '5%', description: 'Asymmetric position. Small but impactful if thesis plays out.', color: 'slate', assets: ['Bitcoin'] },
          { name: 'Other', allocation: '10%', description: 'REITs, thematic, or tactical positions.', color: 'teal', assets: ['REIT ETF', 'Sector ETFs'] },
        ]} />

        <p className="text-xs text-slate-500 mt-4 mb-2 font-medium">Aggressive Growth (High Capacity, Long Horizon)</p>
        <PortfolioBucketMap buckets={[
          { name: 'Cash', allocation: '5%', description: 'Minimal cash beyond reserve. Fully deployed approach.', color: 'green', assets: ['Money Market'] },
          { name: 'Equities', allocation: '65%', description: 'Heavy equity allocation. Diversified globally with growth tilts.', color: 'indigo', assets: ['Global ETFs', 'Growth ETF', 'Emerging Markets', 'Small Cap'] },
          { name: 'Gold', allocation: '8%', description: 'Defensive position even in aggressive portfolios.', color: 'orange', assets: ['Gold ETF'] },
          { name: 'BTC', allocation: '10%', description: 'Larger asymmetric bet. Requires conviction AND tolerance for 50%+ drawdowns.', color: 'slate', assets: ['Bitcoin', 'ETH'] },
          { name: 'Other', allocation: '12%', description: 'REITs, thematic, individual high-conviction positions.', color: 'teal', assets: ['Sector ETFs', 'Individual Stocks', 'REITs'] },
        ]} />
      </Subsection>

      <Subsection title="Strategic vs. Tactical Allocation">
        <CompareTable
          headers={['Strategic Allocation', 'Tactical Allocation']}
          rows={[
            { attribute: 'What it is', values: ['Long-term target allocation', 'Short-term adjustments based on market conditions'] },
            { attribute: 'Changes', values: ['Rarely — when life changes', 'Occasionally — based on macro view or valuation'] },
            { attribute: 'Importance', values: ['Drives ~90% of long-term returns', 'Fine-tuning, not the main driver'] },
            { attribute: 'Example', values: ['60% stocks / 20% bonds / 10% gold / 10% cash', 'Temporarily reducing equity to 50% because valuations are extreme'] },
            { attribute: 'Risk', values: ['Low — systematic and disciplined', 'Higher — requires judgment, can lead to over-trading'] },
            { attribute: 'Who benefits', values: ['Everyone', 'Experienced investors who can stay disciplined'] },
          ]}
        />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Strategic Allocation', definition: 'Your baseline long-term mix of asset classes, designed to match your goals and risk capacity.' },
          { term: 'Tactical Allocation', definition: 'Temporary adjustments to your strategic allocation based on market conditions or macro outlook.' },
          { term: 'Rebalancing', definition: 'Periodically restoring your portfolio to its target allocation. Systematically enforces buy-low-sell-high behavior.' },
          { term: 'Position Sizing', definition: 'How much of your portfolio is allocated to each specific investment. Determines impact of each holding.' },
          { term: 'Risk Capacity', definition: 'Your financial ability to absorb losses — determined by income, reserves, time horizon, and obligations.' },
          { term: 'Core-Satellite', definition: 'A portfolio structure with core holdings (broad index ETFs, 60-80%) and satellite positions (specific bets, 20-40%).' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Risk tolerance', itemB: 'Risk capacity', explanation: 'Tolerance is psychological (how you feel about risk). Capacity is structural (how much risk your finances can handle). Build your portfolio around capacity, not tolerance — feelings change, financial structure is more stable.' },
          { itemA: 'Diversification', itemB: 'Over-diversification', explanation: 'Diversification reduces risk efficiently. Over-diversification (owning 50 ETFs) adds complexity without meaningfully reducing risk further. 3-7 well-chosen, uncorrelated holdings usually capture most diversification benefits.' },
          { itemA: 'Rebalancing', itemB: 'Market timing', explanation: 'Rebalancing is systematic — you restore target allocations regardless of your market view. Market timing is discretionary — you make changes based on predictions. Rebalancing is a disciplined process; timing is speculation.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Why is strategic allocation the most important investment decision?', answer: 'Because it drives approximately 90% of long-term portfolio returns. The overall mix of asset classes matters far more than which specific stocks or bonds you pick within those classes.' },
          { question: 'Why does rebalancing improve returns?', answer: 'Rebalancing systematically sells assets that have become overweight (recent winners at higher prices) and buys assets that have become underweight (recent losers at lower prices). This enforces a disciplined buy-low, sell-high pattern.' },
          { question: 'What\'s the difference between your emergency reserve and investment cash?', answer: 'Emergency reserve is completely separate from your portfolio — it\'s insurance against life shocks. Investment cash is part of your portfolio allocation, sitting ready for deployment. Never raid your reserve for investment opportunities.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Step 1', value: 'Define time horizons for each pool of money' },
          { label: 'Step 2', value: 'Assess risk capacity (objective, not emotional)' },
          { label: 'Step 3', value: 'Set strategic allocation (the master plan)' },
          { label: 'Step 4', value: 'Size positions appropriately' },
          { label: 'Step 5', value: 'Keep emergency reserve separate' },
          { label: 'Step 6', value: 'Rebalance periodically (annually or at 5% drift)' },
          { label: 'Key Rule', value: 'The best portfolio is one you can stick with through cycles' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
