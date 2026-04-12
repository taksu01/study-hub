import {
  SectionShell, SectionHeader, Subsection, Prose, CompareTable,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section05() {
  return (
    <SectionShell id="section-5">
      <SectionHeader
        number={5}
        title="The Main Buckets Where Capital Can Live"
        subtitle="Every investable asset belongs to a class. Understanding asset classes is the first step to understanding portfolio construction."
      />

      <Subsection title="The Asset Class Map">
        <Prose>
          <p>When you invest, you're placing capital into one or more asset classes. Each class has a different risk profile, return pattern, liquidity level, and role in a portfolio. No single asset class is "the best" — they serve different purposes and behave differently under different conditions.</p>
          <p>Click each card to understand the deeper characteristics of each asset class.</p>
        </Prose>
      </Subsection>

      <Subsection title="The Major Asset Classes">
        <ExpandableCardGrid cards={[
          {
            title: 'Cash & Cash Equivalents',
            subtitle: 'The stability anchor',
            content: 'Checking/savings accounts, money market funds, short-term T-bills. Near-zero volatility, instant liquidity, low returns.',
            details: 'Role: Safety, liquidity, optionality. Cash doesn\'t grow your wealth — it preserves your ability to act. It earns low returns but loses to inflation over time. Hold enough for your reserve and near-term needs, but don\'t let excess cash sit idle for years. Money market funds offer slightly better yields than savings accounts while maintaining daily liquidity.',
            color: 'green',
            tags: ['Low Risk', 'High Liquidity', 'Low Return'],
          },
          {
            title: 'Bonds / Fixed Income',
            subtitle: 'The stability + income layer',
            content: 'Loans to governments or companies that pay regular interest and return principal at maturity.',
            details: 'Bonds range from ultra-safe (US Treasuries) to risky (high-yield corporate / junk bonds). They provide predictable income and reduce portfolio volatility. Government bonds typically rise when stocks fall, making them excellent diversifiers. However, bonds lose value when interest rates rise. Duration (sensitivity to rate changes) matters. Short-term bonds = lower risk, lower yield. Long-term bonds = higher risk, higher yield.',
            color: 'blue',
            tags: ['Low-Med Risk', 'Predictable Income', 'Rate Sensitive'],
          },
          {
            title: 'Stocks / Equities',
            subtitle: 'Ownership in businesses',
            content: 'Buying shares of a company. You participate in its profits, growth, and losses. Historically the strongest wealth-building asset class.',
            details: 'Stocks are volatile in the short term but historically the best-returning liquid asset class over long periods (7-10% annually after inflation in global markets). You earn returns through price appreciation and dividends. Individual stocks carry company-specific risk (one company can go bankrupt). Broad index funds spread this risk across hundreds or thousands of companies. Stocks represent productive capital — real businesses making real things and serving real customers.',
            color: 'indigo',
            tags: ['Higher Risk', 'Growth Engine', 'Productive Asset'],
          },
          {
            title: 'ETFs & Index Funds',
            subtitle: 'Diversified baskets in one purchase',
            content: 'Funds that hold many assets (stocks, bonds, etc.) in a single tradeable package. The dominant vehicle for passive investing.',
            details: 'An S&P 500 ETF gives you exposure to 500 large US companies in one purchase. ETFs trade on exchanges like stocks, with intraday liquidity. Index funds track a specific benchmark passively (low fees). They are the most efficient way to gain diversified exposure. A global stock ETF (like VT/VWCE) gives you exposure to thousands of companies worldwide. Most professional money managers fail to beat index funds after fees over long periods.',
            color: 'purple',
            tags: ['Diversified', 'Low Cost', 'Core Holding'],
          },
          {
            title: 'Gold',
            subtitle: 'The ancient store of value',
            content: 'A non-productive asset valued for scarcity, durability, and thousands of years of monetary history.',
            details: 'Gold produces no income — no dividends, no interest. Its value comes from its role as a crisis hedge, inflation hedge, and store of value. Central banks hold gold as a reserve asset. Gold tends to perform well during currency debasement, geopolitical stress, and real interest rate declines. It\'s uncorrelated with stocks over long periods, making it a useful portfolio diversifier. Typical allocation: 5-15% for those who want a defensive/macro hedge. Can be held via physical gold, gold ETFs, or gold mining stocks.',
            color: 'orange',
            tags: ['Defensive', 'Non-Productive', 'Macro Hedge'],
          },
          {
            title: 'Real Estate',
            subtitle: 'Tangible, often leveraged',
            content: 'Physical property or REITs. Provides rental income and potential appreciation. Often bought with leverage (mortgage).',
            details: 'Real estate offers income (rent), potential appreciation, tax advantages, and inflation hedging (rents tend to rise with inflation). But it\'s illiquid, requires management, has high transaction costs, and concentrates risk geographically. REITs (Real Estate Investment Trusts) offer liquid real estate exposure through the stock market without the hassles of owning property directly. Real estate with mortgage leverage amplifies both gains and losses.',
            color: 'teal',
            tags: ['Illiquid', 'Income + Growth', 'Leverage Common'],
          },
          {
            title: 'Cryptocurrency',
            subtitle: 'Digital, volatile, evolving',
            content: 'Digital assets built on blockchain technology. Bitcoin is the dominant network; thousands of others exist with varying purposes and risk.',
            details: 'BTC is the most established — decentralized, scarce (21M cap), viewed by some as digital gold or a macro hedge against monetary debasement. It\'s extremely volatile (50-80% drawdowns are normal cycle behavior). Altcoins range from legitimate infrastructure (Ethereum) to pure speculation. Crypto is not a monolithic asset class — BTC, ETH, and random tokens have very different risk profiles. Position sizing matters enormously. A 5% BTC allocation behaves very differently from a 50% allocation. Regulatory, technical, and adoption risk remain meaningful.',
            color: 'slate',
            tags: ['High Volatility', 'Asymmetric', 'Evolving'],
          },
        ]} />
      </Subsection>

      <Subsection title="Asset Class Comparison">
        <CompareTable
          headers={['Cash', 'Bonds', 'Stocks', 'Gold', 'Crypto (BTC)']}
          rows={[
            { attribute: 'Expected Return', values: ['Very Low', 'Low-Medium', 'Medium-High', 'Low-Medium', 'Uncertain/High'] },
            { attribute: 'Volatility', values: ['Near Zero', 'Low-Medium', 'Medium-High', 'Medium', 'Very High'] },
            { attribute: 'Liquidity', values: ['Instant', 'High', 'High', 'High (ETF)', 'High (exchange)'] },
            { attribute: 'Income', values: ['Minimal', 'Yes (coupon)', 'Possible (dividend)', 'None', 'None'] },
            { attribute: 'Inflation Hedge', values: ['Poor', 'Mixed', 'Good (long-term)', 'Good', 'Debated'] },
            { attribute: 'Crisis Behavior', values: ['Stable', 'Usually stable', 'Drops first', 'Often rises', 'Drops hard, then recovers'] },
            { attribute: 'Productive?', values: ['No', 'Lends money', 'Yes — businesses', 'No', 'No (network value)'] },
            { attribute: 'Typical Role', values: ['Safety/Optionality', 'Stability/Income', 'Growth Engine', 'Defensive Hedge', 'Asymmetric Upside'] },
          ]}
        />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Asset Class', definition: 'A category of investments that share similar characteristics and behave similarly in markets (stocks, bonds, cash, etc.).' },
          { term: 'Money Market Fund', definition: 'A low-risk fund investing in short-term, high-quality debt. Nearly as safe as cash but with slightly better yields.' },
          { term: 'ETF', definition: 'Exchange-Traded Fund — a basket of assets that trades on an exchange like a stock.' },
          { term: 'REIT', definition: 'Real Estate Investment Trust — a company that owns/operates real estate, traded on stock exchanges.' },
          { term: 'Productive Asset', definition: 'An asset that generates output — businesses (stocks) produce goods/services, bonds lend money. Gold and BTC are non-productive.' },
          { term: 'Store of Value', definition: 'An asset expected to maintain purchasing power over time. Gold is the traditional example; BTC is a debated modern candidate.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Productive assets', itemB: 'Store-of-value assets', explanation: 'Stocks and bonds are productive — they generate earnings, dividends, and interest. Gold and BTC are non-productive — their value depends on what others will pay, not on cash flows. Both have portfolio roles, but they work differently.' },
          { itemA: 'Asset class', itemB: 'Investment vehicle', explanation: '"Stocks" is an asset class. "An S&P 500 ETF" is a vehicle that gives you access to that class. You can access the same asset class through different vehicles (ETFs, mutual funds, individual securities).' },
          { itemA: 'Gold', itemB: 'Crypto', explanation: 'Both are non-productive and sometimes called stores of value, but they have very different volatility profiles, track records, and correlation patterns. Gold has millennia of history and lower volatility. BTC has 15 years and extreme volatility.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Which asset class has historically been the strongest long-term wealth builder?', answer: 'Equities (stocks). Diversified stock portfolios have returned roughly 7-10% annually after inflation over long periods — more than bonds, gold, or cash.' },
          { question: 'Why do you hold cash even though it loses to inflation?', answer: 'Cash provides liquidity and optionality. It protects you from forced selling, covers emergencies, and lets you act on opportunities. Its role is safety, not growth.' },
          { question: 'What is the key difference between stocks and gold as investments?', answer: 'Stocks are productive — they represent businesses that generate revenue and profits. Gold is non-productive — it doesn\'t earn anything. Stocks grow through business activity; gold preserves value through scarcity and demand.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Cash', value: 'Safety and optionality. Low return, instant liquidity.' },
          { label: 'Bonds', value: 'Stability and income. Rate-sensitive, diversifier.' },
          { label: 'Stocks', value: 'Growth engine. Productive, volatile, best long-term return.' },
          { label: 'ETFs/Index', value: 'Diversified access to any asset class. Low cost.' },
          { label: 'Gold', value: 'Defensive hedge. Non-productive store of value.' },
          { label: 'Real Estate', value: 'Income + appreciation. Illiquid, often leveraged.' },
          { label: 'Crypto/BTC', value: 'High-volatility asymmetric bet. Evolving, speculative.' },
          { label: 'Key Insight', value: 'No single class is best. Each plays a role.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
