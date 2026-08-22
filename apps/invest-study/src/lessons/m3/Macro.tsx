import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { InteractiveFlowMap, CauseEffectChain, ScenarioWidget, ExpandableCardGrid } from '../../components/ui'

export default function Macro({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m3"
      lessonId="macro"
      subtitle="Interest rates, inflation, and cycles are the weather around your portfolio. Learn to read the environment — and why forecasting it precisely is mostly noise for long-term investors."
      onNavigate={onNavigate}
    >
      <LessonSection title="Rates are gravity" icon="🌍">
        <P>
          You don't need to be an economist to invest well — but you do need to understand the weather your
          portfolio lives in. And the single strongest force in that weather is the{' '}
          <Strong>interest rate</Strong>: it acts like <Strong>gravity on asset prices</Strong>. When rates are near
          zero, money is cheap and every future dollar is discounted gently — valuations float. When rates rise,
          gravity strengthens and everything priced on distant cash flows gets pulled down.
        </P>
        <P>
          Macro is <Strong>context, not an oracle</Strong>. Like a farmer with the weather, an investor adjusts to
          conditions without pretending to predict next month's storm.
        </P>
      </LessonSection>

      <LessonSection title="The transmission chain" icon="⛓️">
        <P>
          One chain explains most macro headlines. Each link pushes the next — tap through them in order:
        </P>
        <InteractiveFlowMap
          nodes={[
            { id: 'inflation', label: 'Inflation', description: 'The rate at which prices broadly rise. High inflation means your money buys less over time — it erodes cash, fixed income, and purchasing power. Central banks watch it obsessively; moderate inflation (around 2%) is the usual target.', color: 'red' },
            { id: 'central-bank', label: 'Central Bank', description: 'The Federal Reserve (US), ECB (Europe), and peers. Their job: price stability and employment. High inflation → they tighten (raise rates). Weak economy → they ease (cut rates). Central bank decisions are the single most powerful force in financial markets.', color: 'purple' },
            { id: 'rates', label: 'Interest Rates', description: 'The price of borrowing money. Higher rates make borrowing costlier, slowing spending and investment; lower rates stimulate activity. Rates touch everything — mortgages, corporate debt, bond prices, stock valuations, currencies.', color: 'blue' },
            { id: 'liquidity', label: 'Liquidity', description: 'How much money flows through the financial system. Low rates plus central-bank bond buying (QE) flood the system — asset prices generally rise. High rates plus bond selling (QT) drain it — prices face pressure. Liquidity is the tide that lifts or lowers all boats.', color: 'indigo' },
            { id: 'assets', label: 'Asset Prices', description: 'Stocks, bonds, gold, crypto, real estate — all respond to the rate and liquidity environment, but not equally. Growth stocks are the most rate-sensitive, bonds move inversely with rates, gold tracks real rates, and crypto often trades as a high-beta risk asset.', color: 'green' },
          ]}
        />
      </LessonSection>

      <LessonSection title="The two regimes" icon="🔄">
        <P>
          Run the chain in both directions and you get the two macro regimes every investor eventually lives
          through. <Strong>Tightening:</Strong>
        </P>
        <CauseEffectChain chain={[
          { cause: 'High inflation', effect: 'Central bank raises rates' },
          { cause: 'Higher rates', effect: 'Borrowing costs rise, spending slows' },
          { cause: 'Less spending', effect: 'Liquidity tightens, growth slows' },
          { cause: 'Tight liquidity', effect: 'Pressure on risk assets (stocks, crypto)' },
          { cause: 'Sustained tightening', effect: 'Possible recession' },
        ]} />
        <P><Strong>Easing:</Strong></P>
        <CauseEffectChain chain={[
          { cause: 'Recession / low inflation', effect: 'Central bank cuts rates' },
          { cause: 'Lower rates', effect: 'Borrowing cheaper, activity increases' },
          { cause: 'More activity', effect: 'Liquidity increases, money flows into assets' },
          { cause: 'More liquidity', effect: 'Support for risk assets, growth recovers' },
          { cause: 'Sustained easing', effect: 'New expansion cycle begins' },
        ]} />
      </LessonSection>

      <LessonSection title="The business cycle" icon="🎡">
        <P>
          Those regimes trace a repeating loop: <Strong>expansion → peak → contraction → trough</Strong>. Each phase
          favors different assets — and, notably, punishes different emotions:
        </P>
        <ScenarioWidget
          title="Where are we in the cycle? Each phase favors different assets."
          scenarios={[
            {
              label: 'Expansion',
              description: 'Economy growing, employment strong, corporate profits rising.',
              details: 'Risk assets thrive: stocks, crypto, real estate. Growth stocks often outperform and commodities do well as demand rises; bonds lag. The mood is optimistic and valuations can stretch — this is when most people feel best about investing, which is exactly when discipline about valuation matters most.',
            },
            {
              label: 'Peak',
              description: 'Economy running hot, inflation rising, central banks tightening.',
              details: 'Late-cycle dynamics: rates rising, credit tightening, some sectors overheating. Energy and commodities may still do well, while growth stocks start underperforming as higher rates compress their valuations. Defensive positioning gains value, and cash gets more attractive as money-market yields rise.',
            },
            {
              label: 'Contraction',
              description: 'Economy slowing, employment weakening, profits declining.',
              details: 'Risk assets fall — stocks can drop 20–40%, crypto often more. Government bonds typically rally (flight to safety) and gold often performs well. Cash is king: it provides stability and buying power. The mood is fearful, yet this is often the best period for long-term buying.',
            },
            {
              label: 'Trough / Recovery',
              description: 'Economy bottoming, central bank easing, early signs of recovery.',
              details: 'Central banks cut aggressively and liquidity returns. Risk assets begin recovering — often violently. Investors who kept cash and discipline through the contraction can buy at deep discounts. This is where fortunes are built, and where most people are too scared to act.',
            },
          ]}
        />
        <Callout type="warning" title="The one thing to remember">
          Macro is context, not prediction. Even professional economists reliably fail to forecast rates and
          recessions — for a long-term investor, reacting to macro headlines is mostly noise. Use the environment to
          set expectations and check positioning, not to trade.
        </Callout>
      </LessonSection>

      <LessonSection title="How assets feel the weather" icon="🌦️">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Stocks / Equities',
            content: 'Favor expansion and easing. Suffer during tightening and recession. Most sensitive to growth and liquidity.',
            details: 'Growth stocks (tech) are the most rate-sensitive — their value depends on distant future earnings, which higher rates discount hardest. Value stocks (financials, energy) can hold up better during tightening. Broadly, equities are the main beneficiary of expansion and easy money.',
            color: 'indigo',
          },
          {
            title: 'Bonds',
            content: 'Inversely related to interest rates. Rally when rates fall, decline when rates rise.',
            details: 'Government bonds are the classic risk-off asset — they tend to rally in recessions and panics as investors flee to safety and central banks cut. Long-duration bonds are far more rate-sensitive than short-duration ones; inflation-linked bonds protect purchasing power.',
            color: 'blue',
          },
          {
            title: 'Gold',
            content: 'Responds to real rates, currency debasement, and fear. Often uncorrelated with equities.',
            details: 'Gold tends to do well when real rates decline, currencies weaken, geopolitical tension is high, or central banks accumulate reserves. It struggles when real rates rise and risk appetite is strong. A macro hedge, not a growth asset.',
            color: 'orange',
          },
          {
            title: 'Bitcoin / Crypto',
            content: 'Trades as a high-beta risk asset in the short term, whatever the long-term thesis.',
            details: 'Despite the "digital gold" narrative, BTC has historically tracked risk-on sentiment and liquidity — rallying hard in easing cycles and falling hard in tightening ones. Long-term holders argue the monetary thesis (scarce asset amid monetary expansion) will dominate with adoption; the short run remains liquidity-driven.',
            color: 'slate',
          },
          {
            title: 'Cash / Money Market',
            content: 'Most valuable during tightening and crisis. Earns more when rates are high.',
            details: 'Cash never drops in nominal value, and in tightening cycles money-market yields become genuinely attractive. In crises it buys assets at distressed prices. Its cost is opportunity: sitting out the good times while inflation nibbles at it.',
            color: 'green',
          },
          {
            title: 'Real Estate',
            content: 'Sensitive to rates (mortgage costs) and growth. Benefits from inflation over the long term.',
            details: 'Rising rates raise mortgage costs, cooling demand and prices; falling rates do the opposite. Rents tend to rise with inflation over time, making property a long-run inflation hedge — but it\'s illiquid and leveraged, so cycles hit it with amplification.',
            color: 'teal',
          },
        ]} />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Macro understanding',
              b: 'Macro timing',
              explanation:
                'Understanding macro helps you contextualize your portfolio and set structural expectations. Trying to time macro shifts precisely is extremely difficult and usually counterproductive. Positioning, not prediction.',
            },
            {
              a: 'Nominal rates',
              b: 'Real rates',
              explanation:
                'Nominal is the stated rate; real is nominal minus inflation. A 5% rate with 4% inflation is only a 1% real return. Real rates determine the actual reward for holding cash and bonds — and drive gold.',
            },
            {
              a: 'Inflation falling',
              b: 'Prices falling',
              explanation:
                'Inflation is a rate of change. "Inflation is falling" means prices are rising more slowly — the level can stay high (and usually does). Confusing the rate with the level is the most common macro misreading in headlines.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="The regime we're in" icon="📅">
        <NowBox asOf="2025">
          <p>
            For most of the 2010s, policy rates in major economies sat near zero — weak gravity, and valuations of
            long-duration assets (growth stocks, long bonds) floated accordingly. From 2022, central banks hiked
            rapidly to fight post-pandemic inflation, and rates have since stayed <em>materially higher</em> than
            that near-zero era even as inflation cooled.
          </p>
          <p>
            The regime change showed the gravity metaphor in real time: long-dated bonds suffered historic drawdowns,
            unprofitable growth stocks were repriced hardest, and cash went from yielding nothing to being a real
            alternative. The lasting lesson isn't a rate forecast — it's that <em>the discount rate regime you buy
            into shapes every valuation you pay</em>.
          </p>
        </NowBox>
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Inflation', definition: 'Broad rise in prices over time, measured by indexes like CPI. Erodes the purchasing power of cash and fixed income.' },
            { term: 'Central bank', definition: 'The institution controlling monetary policy — rates and money supply. The Fed (US), ECB (Europe), BOJ (Japan).' },
            { term: 'Real interest rate', definition: 'Nominal rate minus inflation. Negative real rates mean cash quietly loses value; positive real rates pay you to wait.' },
            { term: 'QE / QT', definition: 'Quantitative easing: central bank buys bonds, injecting liquidity (supports asset prices). Tightening: it sheds bonds, draining liquidity (pressures them).' },
            { term: 'Risk-on / risk-off', definition: 'Market mood. Risk-on: money favors growth assets (stocks, crypto). Risk-off: money flees to safety (bonds, gold, cash).' },
            { term: 'Business cycle', definition: 'The recurring loop of expansion → peak → contraction → trough in economic activity. Each phase favors different assets.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Why does "rates are gravity" hit growth stocks and long bonds hardest when rates rise?',
              options: [
                'Because those assets carry the most debt',
                'Because their value depends on distant future cash flows, which higher discount rates shrink the most',
                'Because central banks sell growth stocks directly during tightening',
                'It doesn\'t — all assets fall by the same amount when rates rise',
              ],
              correct: 1,
              explanation:
                'Discounting punishes distance. Assets whose value sits far in the future — a growth company\'s earnings in year 15, a bond\'s payment in year 30 — lose the most present value when the discount rate climbs. Short-duration assets barely notice.',
            },
            {
              question: 'A headline says "inflation has fallen for six straight months." What does that mean for prices?',
              options: [
                'Prices are back to where they were before inflation started',
                'Prices are now falling month over month',
                'Prices are still rising, just more slowly — the level stays high while the rate cools',
                'The central bank must already have cut rates six times',
              ],
              correct: 2,
              explanation:
                'Inflation is the rate of change, not the level. Falling inflation (disinflation) means prices climb more slowly; only outright deflation means they drop. Mixing up the rate and the level is the most common macro misreading.',
            },
            {
              question: 'How do long-term investors typically make the best use of macro?',
              options: [
                'Trade in and out of markets based on rate and recession forecasts',
                'Ignore it completely — it never matters',
                'Wait in cash until the macro outlook is certain, then invest',
                'Treat it as context — set expectations and check positioning, while accepting that precise forecasts are mostly noise',
              ],
              correct: 3,
              explanation:
                'Even professionals reliably fail to forecast rates and recessions, and "waiting for certainty" means waiting forever. Macro understanding explains WHY assets behave as they do and informs structural positioning — it\'s a compass, not a crystal ball.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What is the core macro transmission chain?', answer: 'Inflation → central bank response → interest rates → liquidity → asset prices. High inflation brings tighter policy, higher rates, less liquidity, and pressure on risk assets. The reverse drives expansions.' },
            { question: 'Why does liquidity matter so much for asset prices?', answer: 'Liquidity is the amount of money moving through the system. More liquidity means more money chasing assets, so prices tend to rise; less means weaker buying pressure and falling prices. It\'s the tide that lifts or lowers all boats.' },
            { question: 'How should macro inform investing?', answer: 'As context, not a crystal ball. It explains why assets behave as they do and whether the environment favors risk-taking or caution. It should shape portfolio positioning — not drive frequent trading on forecasts, which are mostly noise.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Rates = gravity', value: 'Higher rates pull down valuations — hardest on long-duration assets.' },
          { label: 'The chain', value: 'Inflation → central bank → rates → liquidity → asset prices.' },
          { label: 'Tightening', value: 'Rate hikes + QT → less liquidity → pressure on risk assets.' },
          { label: 'Easing', value: 'Rate cuts + QE → more liquidity → support for risk assets.' },
          { label: 'The cycle', value: 'Expansion → peak → contraction → trough → repeat. Fear marks the buying phase.' },
          { label: 'Key rule', value: 'Macro is context, not prediction. Position; don\'t forecast.' },
        ]}
      />
    </LessonLayout>
  )
}
