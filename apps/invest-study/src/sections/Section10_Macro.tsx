import {
  SectionShell, SectionHeader, Subsection, Prose, InteractiveFlowMap,
  ExpandableCardGrid, CauseEffectChain, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, ScenarioWidget
} from '../components/ui'

export default function Section10() {
  return (
    <SectionShell id="section-10">
      <SectionHeader
        number={10}
        title="The Economic Weather Around Your Portfolio"
        subtitle="Macro conditions shape the environment for every investment. Understanding them helps you contextualize, not predict."
      />

      <Subsection title="Why Macro Matters for Investors">
        <Prose>
          <p>You don't need to be a macro economist to be a good investor. But you do need to understand the economic weather your portfolio lives in. Just as a farmer doesn't control the weather but adjusts their behavior based on it, an investor should understand macro conditions without trying to time them precisely.</p>
          <p>Macro is context, not an oracle. It tells you the environment — whether the wind is at your back or in your face — not what will happen tomorrow.</p>
        </Prose>
      </Subsection>

      <Subsection title="The Macro Transmission Chain">
        <Prose>
          <p>This is the critical chain to internalize. Each link affects the next. Click each step to understand how it transmits through the system.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            { id: 'inflation', label: 'Inflation', description: 'The rate at which prices rise broadly. When inflation is high, your money buys less over time. Central banks watch this obsessively. Moderate inflation (2%) is the target — too high or too low causes problems. Inflation erodes cash, fixed-income, and purchasing power.', color: 'red' },
            { id: 'central-bank', label: 'Central Bank', description: 'The Federal Reserve (US), ECB (Europe), etc. Their primary job: maintain price stability and support employment. When inflation is high, they tighten policy (raise rates). When the economy is weak, they ease (lower rates). Central bank decisions are the single most powerful force in financial markets.', color: 'purple' },
            { id: 'rates', label: 'Interest Rates', description: 'The price of borrowing money. When central banks raise rates, it costs more to borrow, slowing spending and investment. When they lower rates, borrowing becomes cheaper, stimulating activity. Rates affect everything — mortgages, corporate debt, bond prices, stock valuations, and currency strength.', color: 'blue' },
            { id: 'liquidity', label: 'Liquidity', description: 'How much money is flowing through the financial system. When rates are low and central banks are buying bonds (QE), liquidity floods the system — asset prices generally rise. When rates are high and central banks sell bonds (QT), liquidity drains — asset prices face pressure. Liquidity is the tide that lifts or lowers all boats.', color: 'indigo' },
            { id: 'assets', label: 'Asset Prices', description: 'Stocks, bonds, gold, crypto, real estate — all respond to the liquidity and rate environment. More liquidity generally supports prices. Less liquidity pressures them. But not all assets respond equally: growth stocks are most rate-sensitive, bonds move inversely with rates, gold responds to real rates, and BTC often trades as a high-beta risk asset.', color: 'green' },
          ]}
        />
      </Subsection>

      <Subsection title="Two Core Macro Scenarios">
        <CauseEffectChain chain={[
          { cause: 'High Inflation', effect: 'Central bank raises rates' },
          { cause: 'Higher rates', effect: 'Borrowing costs rise, spending slows' },
          { cause: 'Less spending', effect: 'Liquidity tightens, economic growth slows' },
          { cause: 'Tight liquidity', effect: 'Pressure on risk assets (stocks, crypto)' },
          { cause: 'Sustained tightening', effect: 'Possible recession' },
        ]} />
        <div className="my-4 py-2 border-t border-slate-200" />
        <CauseEffectChain chain={[
          { cause: 'Recession / Low Inflation', effect: 'Central bank cuts rates' },
          { cause: 'Lower rates', effect: 'Borrowing cheaper, activity increases' },
          { cause: 'More activity', effect: 'Liquidity increases, money flows into assets' },
          { cause: 'More liquidity', effect: 'Support for risk assets, growth recovers' },
          { cause: 'Sustained easing', effect: 'New expansion cycle begins' },
        ]} />
      </Subsection>

      <Subsection title="The Business Cycle">
        <ScenarioWidget
          title="Where are we in the cycle? Each phase favors different assets."
          scenarios={[
            {
              label: 'Expansion',
              description: 'Economy growing, employment strong, corporate profits rising.',
              details: 'Risk assets thrive: stocks, crypto, real estate. Growth stocks often outperform. Commodities do well as demand rises. Bonds underperform. The mood is optimistic, but valuations can stretch. This is when most people feel best about investing — which is often when they should be most disciplined about valuation.',
            },
            {
              label: 'Peak',
              description: 'Economy running hot, inflation rising, central banks tightening.',
              details: 'Late-cycle dynamics: interest rates rising, credit tightening, some sectors overheating. Energy and commodities may still do well. Growth stocks start underperforming as higher rates compress their valuations. Defensive positioning becomes valuable. Cash becomes more attractive as money market yields rise.',
            },
            {
              label: 'Contraction',
              description: 'Economy slowing, employment weakening, profits declining.',
              details: 'Risk assets fall. Stocks can drop 20-40%. Crypto often falls more. Government bonds typically rally (flight to safety). Gold often performs well. Cash is king — it provides stability and buying opportunities. The mood is fearful, but this is often the best time for long-term buying.',
            },
            {
              label: 'Trough / Recovery',
              description: 'Economy bottoming, central bank easing, early signs of recovery.',
              details: 'Central banks cutting rates aggressively, liquidity returning. Risk assets begin recovering — often violently. The investors who had cash and discipline during the contraction can buy assets at deep discounts. This is where fortunes are built, but most people are too scared to act.',
            },
          ]}
        />
      </Subsection>

      <Subsection title="How Different Assets React to Macro">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Stocks / Equities',
            content: 'Favor expansion and easing. Suffer during tightening and recession. Most sensitive to growth and liquidity.',
            details: 'Growth stocks (tech) are more rate-sensitive — higher rates compress their valuations more because their value depends on distant future earnings. Value stocks (financials, energy) can do better during tightening. Broadly, equities are the primary beneficiary of economic expansion and easy money.',
            color: 'indigo',
          },
          {
            title: 'Bonds',
            content: 'Inversely related to interest rates. Rally when rates fall, decline when rates rise.',
            details: 'Government bonds are the classic "risk-off" asset — they tend to rally during recessions and market panics as investors flee to safety and central banks cut rates. Long-duration bonds are more sensitive to rate changes. Short-duration bonds are more stable. TIPS protect against inflation.',
            color: 'blue',
          },
          {
            title: 'Gold',
            content: 'Responds to real rates, currency debasement, and fear. Often uncorrelated with equities.',
            details: 'Gold tends to do well when: real interest rates are declining, currencies are weakening, geopolitical tension is high, or central banks are accumulating reserves. Gold struggles when: real rates are rising, confidence is high, and risk appetite is strong. It\'s a macro hedge, not a growth asset.',
            color: 'orange',
          },
          {
            title: 'Bitcoin / Crypto',
            content: 'Trades as a high-beta risk asset in the short term. Long-term thesis tied to monetary debasement and adoption.',
            details: 'Despite the "digital gold" narrative, BTC has historically correlated with risk-on sentiment and liquidity. It rallies strongly in easing cycles and drops hard in tightening cycles. Its 4-year halving cycle adds another dynamic layer. Long-term holders argue the monetary thesis (scarce asset in a world of monetary expansion) will dominate as adoption grows.',
            color: 'slate',
          },
          {
            title: 'Cash / Money Market',
            content: 'Most valuable during tightening and crisis. Earns more when rates are high.',
            details: 'Cash is the only asset that never drops in nominal value. During tightening cycles, money market yields become attractive (3-5%+). During crises, cash provides the ability to buy assets at distressed prices. The cost of holding cash is the opportunity cost of not being invested during good times.',
            color: 'green',
          },
          {
            title: 'Real Estate',
            content: 'Sensitive to interest rates (mortgage costs) and economic growth. Benefits from inflation long-term.',
            details: 'Rising rates increase mortgage costs, reducing demand and prices. Falling rates do the opposite. Rents tend to rise with inflation over time, making real estate an inflation hedge. But real estate is illiquid and leveraged — it amplifies both good and bad outcomes during cycles.',
            color: 'teal',
          },
        ]} />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Inflation', definition: 'Broad increase in prices over time. Erodes purchasing power. Measured by CPI (Consumer Price Index).' },
          { term: 'Central Bank', definition: 'The institution that controls monetary policy — interest rates and money supply. The Fed (US), ECB (Europe), BOJ (Japan).' },
          { term: 'Interest Rate', definition: 'The cost of borrowing money. Set by central banks as the primary lever of monetary policy.' },
          { term: 'Quantitative Easing (QE)', definition: 'Central bank buys bonds to inject liquidity into the financial system. Typically supports asset prices.' },
          { term: 'Quantitative Tightening (QT)', definition: 'Central bank reduces its bond holdings, draining liquidity. Typically pressures asset prices.' },
          { term: 'Risk-On / Risk-Off', definition: 'Market mood. Risk-on: investors favor growth assets (stocks, crypto). Risk-off: investors flee to safety (bonds, gold, cash).' },
          { term: 'Real Interest Rate', definition: 'Nominal interest rate minus inflation. Negative real rates mean cash loses value; positive real rates mean cash earns real return.' },
          { term: 'Business Cycle', definition: 'The recurring pattern of expansion → peak → contraction → trough in economic activity.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Macro understanding', itemB: 'Macro timing', explanation: 'Understanding macro helps you contextualize your portfolio and make better structural decisions. Trying to perfectly time macro shifts is extremely difficult and often counterproductive. Use macro for positioning, not prediction.' },
          { itemA: 'Nominal rates', itemB: 'Real rates', explanation: 'Nominal rate = the stated rate (e.g., 5%). Real rate = nominal rate minus inflation. If rates are 5% and inflation is 4%, the real rate is only 1%. Real rates determine the actual reward for holding cash and bonds.' },
          { itemA: 'Inflation rising', itemB: 'Prices being high', explanation: 'Inflation is the rate of change. Prices can be high (the LEVEL) while inflation is falling (the RATE is decreasing). "Inflation is falling" doesn\'t mean prices are dropping — it means they\'re rising slower.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What is the core macro transmission chain?', answer: 'Inflation → Central bank response → Interest rates → Liquidity → Asset prices. Higher inflation leads to tighter policy, higher rates, less liquidity, and pressure on risk assets. The reverse drives expansion.' },
          { question: 'Why does liquidity matter so much for asset prices?', answer: 'Liquidity is the amount of money flowing through the system. More liquidity means more money chasing assets (prices tend to rise). Less liquidity means less buying pressure (prices tend to fall). It\'s the tide that lifts or lowers all boats.' },
          { question: 'How should macro inform your investing?', answer: 'As context, not as a crystal ball. Macro helps you understand WHY assets are behaving a certain way and whether the environment favors risk-taking or caution. It should inform portfolio positioning, not drive frequent trading decisions.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Inflation', value: 'Rising prices → central bank tightens → pressure on risk assets' },
          { label: 'Easing', value: 'Rate cuts + QE → more liquidity → supports asset prices' },
          { label: 'Tightening', value: 'Rate hikes + QT → less liquidity → pressures asset prices' },
          { label: 'Business Cycle', value: 'Expansion → Peak → Contraction → Trough → repeat' },
          { label: 'Stocks', value: 'Favor growth, easing, expansion' },
          { label: 'Bonds', value: 'Favor rate cuts and risk-off' },
          { label: 'Gold', value: 'Favors declining real rates and crisis' },
          { label: 'BTC', value: 'Favors liquidity expansion and risk-on' },
          { label: 'Key Rule', value: 'Macro is context, not prediction' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
