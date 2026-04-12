import {
  SectionShell, SectionHeader, Subsection, Prose, InteractiveFlowMap,
  ExpandableCardGrid, CompareTable, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, ScenarioWidget
} from '../components/ui'

export default function Section04() {
  return (
    <SectionShell id="section-4">
      <SectionHeader
        number={4}
        title="What Risk Actually Means"
        subtitle="Risk is not just volatility. Understanding the different faces of risk is essential to making rational investment decisions."
      />

      <Subsection title="The Many Faces of Risk">
        <Prose>
          <p>In everyday conversation, "risk" means "this might go down." In investing, risk is much more nuanced. There are at least five distinct types of risk that matter, and they don't all behave the same way. Confusing them leads to poor decisions — either taking on more danger than you realize, or avoiding investments that are actually appropriate.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            { id: 'volatility', label: 'Volatility', description: 'Price fluctuation in the short term. Stocks and crypto are volatile — prices jump around daily. But volatility alone is not permanent loss. If you don\'t need to sell during the dip, volatility is just noise. It\'s uncomfortable but not inherently destructive.', color: 'blue' },
            { id: 'permanent-loss', label: 'Permanent Loss', description: 'When invested capital is destroyed and cannot recover. A company going bankrupt, a fraud, or a token going to zero. This is true risk — money that is gone forever. Diversification is the primary defense.', color: 'red' },
            { id: 'liquidity-risk', label: 'Liquidity Risk', description: 'The risk that you cannot sell an asset when you need to, or that selling it moves the price significantly against you. Real estate and small-cap tokens have high liquidity risk. Blue-chip stocks and ETFs have low liquidity risk.', color: 'purple' },
            { id: 'concentration', label: 'Concentration Risk', description: 'Having too much of your wealth in one asset, sector, or geography. It can feel like conviction, but it means one bad outcome can disproportionately damage your entire portfolio. Diversification reduces this.', color: 'orange' },
            { id: 'inflation', label: 'Inflation Risk', description: 'The risk that your returns don\'t keep up with the rising cost of living. Cash sitting in a 1% savings account while inflation is 4% is losing 3% of real value each year. "Safe" assets can have hidden inflation risk.', color: 'teal' },
          ]}
        />
      </Subsection>

      <Subsection title="Risk vs. Return: The Core Tradeoff">
        <Prose>
          <p>In general, higher expected returns require accepting higher risk. But this relationship is not automatic or guaranteed. Some risks are rewarded (holding diversified equities long-term), and some risks are not (concentrating in a single speculative stock).</p>
          <p>The goal is not to avoid risk entirely — that's impossible and would mean accepting near-zero returns. The goal is to take <strong>compensated risk</strong>: risk that historically rewards patience with higher returns.</p>
        </Prose>
        <CompareTable
          headers={['Lower Risk / Lower Return', 'Higher Risk / Higher Return']}
          rows={[
            { attribute: 'Assets', values: ['Cash, money market, short-term bonds', 'Stocks, crypto, emerging market equities'] },
            { attribute: 'Volatility', values: ['Low — minimal price swings', 'High — significant price swings'] },
            { attribute: 'Potential upside', values: ['Modest — preserves value', 'Significant — real growth potential'] },
            { attribute: 'Downside risk', values: ['Inflation erosion, low real returns', 'Large drawdowns, potential permanent loss'] },
            { attribute: 'Best for', values: ['Short-term needs, stability', 'Long-term growth, wealth building'] },
            { attribute: 'Time horizon', values: ['0-3 years', '5+ years'] },
          ]}
        />
      </Subsection>

      <Subsection title="Diversification: The Only Free Lunch">
        <InfoCallout type="tip">
          Nobel laureate Harry Markowitz called diversification "the only free lunch in finance." By spreading capital across assets that don't move in lockstep, you can reduce risk without proportionally reducing expected returns.
        </InfoCallout>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Correlation',
            content: 'How much two assets move together. Low or negative correlation means they offset each other during stress.',
            details: 'Stocks and bonds often have low correlation — when stocks fall, bonds may hold steady or rise. Gold and equities also have periods of low correlation. BTC has shown varying correlation with risk assets. Mixing low-correlation assets smooths portfolio volatility.',
            color: 'blue',
            tags: ['Key Concept'],
          },
          {
            title: 'Why Concentration Feels Smart',
            content: 'Concentrated portfolios outperform in bull runs, making the holder feel like a genius. But they also crash harder.',
            details: 'Putting 80% in one high-conviction asset is not diversified, regardless of how much research you\'ve done. Conviction reduces perceived risk but not actual risk. Even great companies and great assets can have devastating drawdowns.',
            color: 'orange',
            tags: ['Behavioral Trap'],
          },
          {
            title: 'Diversification Across What?',
            content: 'Asset classes, geographies, sectors, time horizons, and strategies. True diversification is multi-dimensional.',
            details: 'Owning 10 tech stocks is not diversification — it\'s concentrated sector exposure. True diversification means owning assets that respond to different economic forces: equities for growth, bonds for stability, gold for crisis, cash for optionality.',
            color: 'green',
            tags: ['Multi-dimensional'],
          },
          {
            title: 'When Diversification "Fails"',
            content: 'In severe crises, correlations spike — everything drops together temporarily. This is normal and expected.',
            details: 'During acute panics (like March 2020), even diversified portfolios drop. But the key difference: diversified portfolios recover faster and suffer less permanent damage. The "failure" is temporary; the protection is structural.',
            color: 'purple',
            tags: ['Crisis Behavior'],
          },
        ]} />
      </Subsection>

      <Subsection title="Risk Depends on Context">
        <ScenarioWidget
          title="Same asset, different risk — depending on your situation"
          scenarios={[
            {
              label: 'Short-term need',
              description: 'You need this money in 6 months for a down payment.',
              details: 'Stocks and crypto are HIGH risk here. Even a 20% dip would be devastating because you\'ll be forced to sell. For short-term needs, only cash and money market instruments are appropriate. The risk isn\'t the asset — it\'s the mismatch between time horizon and volatility.',
            },
            {
              label: '10-year horizon',
              description: 'This is retirement money you won\'t touch for a decade.',
              details: 'Stocks and diversified ETFs are LOWER risk here. Over 10+ year periods, equity markets have historically recovered from every crash. The bigger risk is actually holding too much cash and losing to inflation. Time transforms the risk profile of assets.',
            },
            {
              label: 'No emergency fund',
              description: 'You have no cash reserve and all savings are invested.',
              details: 'EVERYTHING in your portfolio becomes high risk because any unexpected expense forces a sale. The problem isn\'t what you own — it\'s that you have no buffer. Risk management starts with liquidity before it starts with asset selection.',
            },
            {
              label: 'Full reserve + stable income',
              description: 'You have 6 months emergency fund, stable income, and no debt.',
              details: 'You can take MORE investment risk because you have structural stability. A 30% drawdown in your portfolio is uncomfortable but won\'t force any action. Your life is insulated from your portfolio. This is the ideal position for long-term aggressive investing.',
            },
          ]}
        />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Volatility', definition: 'The degree to which an asset\'s price fluctuates over time. High volatility = large swings. Not the same as permanent risk.' },
          { term: 'Drawdown', definition: 'The peak-to-trough decline in value. A key measure of how much pain an investment can inflict.' },
          { term: 'Permanent Loss of Capital', definition: 'When money invested is gone forever — through bankruptcy, fraud, or irreversible collapse.' },
          { term: 'Diversification', definition: 'Spreading capital across multiple uncorrelated assets to reduce portfolio risk without proportionally reducing returns.' },
          { term: 'Correlation', definition: 'How two assets move relative to each other. +1 = move together, 0 = independent, -1 = move opposite.' },
          { term: 'Compensated Risk', definition: 'Risk that historically rewards investors with higher returns (e.g., equity risk premium). Not all risks are compensated.' },
          { term: 'Risk Capacity', definition: 'Your financial ability to absorb losses. Determined by income stability, time horizon, liquidity, and obligations.' },
          { term: 'Risk Tolerance', definition: 'Your emotional/psychological ability to handle losses without panicking. Important but less reliable than risk capacity.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Volatility', itemB: 'Risk', explanation: 'Volatility is price noise. Risk is the probability of permanent loss or being forced to sell at the wrong time. An asset can be volatile without being risky (if you have time) or low-volatility but risky (if it slowly loses to inflation).' },
          { itemA: 'Risk tolerance', itemB: 'Risk capacity', explanation: 'Tolerance is how you feel about risk. Capacity is how much risk your financial situation can structurally handle. A person might feel brave (high tolerance) but have no emergency fund (low capacity). Capacity should drive decisions more than tolerance.' },
          { itemA: 'Diversification', itemB: 'Owning many assets', explanation: 'Ten correlated assets is not diversification. True diversification requires assets that respond differently to different conditions. Ten tech stocks are correlated; a mix of stocks, bonds, gold, and cash is diversified.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Name three types of investment risk beyond volatility.', answer: 'Permanent loss of capital (asset goes to zero), liquidity risk (can\'t sell when you need to), concentration risk (too much in one asset), inflation risk (returns don\'t keep up with rising costs).' },
          { question: 'Why does time horizon change the risk profile of an asset?', answer: 'Over short periods, volatile assets can cause large losses if you\'re forced to sell. Over long periods, the same assets tend to recover and grow, making volatility less dangerous. Time absorbs volatility.' },
          { question: 'What makes diversification the "only free lunch"?', answer: 'Because combining uncorrelated assets reduces portfolio volatility without proportionally reducing expected returns. You get a smoother ride toward a similar destination.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Volatility', value: 'Price noise — uncomfortable but not permanent' },
          { label: 'True Risk', value: 'Permanent loss of capital or being forced to sell' },
          { label: 'Diversification', value: 'Mix uncorrelated assets to smooth the ride' },
          { label: 'Correlation', value: 'How assets move together — lower = better diversification' },
          { label: 'Context', value: 'Same asset can be risky or safe depending on your situation' },
          { label: 'Key Insight', value: 'Risk management starts with liquidity, not asset selection' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
