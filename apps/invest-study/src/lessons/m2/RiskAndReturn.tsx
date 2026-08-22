import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { InteractiveFlowMap, CompareTable, ExpandableCardGrid, ScenarioWidget } from '../../components/ui'

export default function RiskAndReturn({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="risk-and-return"
      subtitle="Risk isn't 'prices go down.' It's the chance your capital never comes back — or that you're forced to sell at the worst moment. Learn to tell real danger from mere noise."
      onNavigate={onNavigate}
    >
      <LessonSection title="Risk is not volatility" icon="⚖️">
        <P>
          In everyday talk, "risky" means "this might drop." In investing, the drop is often the least important
          part. <Strong>Volatility is noise — permanent loss is risk.</Strong> A stock that swings 30% and recovers
          cost you nothing if you never sold. A "stable" asset that quietly loses to inflation for a decade cost
          you plenty.
        </P>
        <P>
          There are at least five distinct faces of risk, and they don't behave the same way. Confusing them leads
          to both mistakes: taking on more danger than you realize, or avoiding assets that are actually appropriate.
          Tap each one:
        </P>
        <InteractiveFlowMap
          nodes={[
            { id: 'volatility', label: 'Volatility', description: 'Short-term price fluctuation. Stocks and crypto jump around daily — uncomfortable, but not inherently destructive. If you don\'t need to sell during the dip, volatility is just noise.', color: 'blue' },
            { id: 'permanent-loss', label: 'Permanent Loss', description: 'Capital that is destroyed and cannot recover: a bankruptcy, a fraud, a token going to zero. This is true risk — money gone forever. Diversification is the primary defense.', color: 'red' },
            { id: 'liquidity-risk', label: 'Liquidity Risk', description: 'The risk that you can\'t sell when you need to, or that selling moves the price against you. Real estate and small-cap tokens: high. Blue-chip stocks and broad ETFs: low.', color: 'purple' },
            { id: 'concentration', label: 'Concentration Risk', description: 'Too much wealth in one asset, sector, or geography. It feels like conviction, but it means one bad outcome can wreck the whole portfolio.', color: 'orange' },
            { id: 'inflation', label: 'Inflation Risk', description: 'Returns that don\'t keep up with the cost of living. Cash earning 1% while inflation runs 4% loses 3% of real value per year. "Safe" assets carry hidden inflation risk.', color: 'teal' },
          ]}
        />
      </LessonSection>

      <LessonSection title="The risk–return tradeoff" icon="📈">
        <P>
          Higher expected returns generally require accepting higher risk — but the relationship is not automatic.
          Some risks are historically rewarded (holding diversified equities for decades); some are not
          (concentrating in a single speculative stock). The goal isn't zero risk — that guarantees near-zero
          returns. The goal is <Strong>compensated risk</Strong>: risk that rewards patience.
        </P>
        <CompareTable
          headers={['Lower Risk / Lower Return', 'Higher Risk / Higher Return']}
          rows={[
            { attribute: 'Assets', values: ['Cash, money market, short-term bonds', 'Stocks, crypto, emerging market equities'] },
            { attribute: 'Volatility', values: ['Low — minimal price swings', 'High — significant price swings'] },
            { attribute: 'Potential upside', values: ['Modest — preserves value', 'Significant — real growth potential'] },
            { attribute: 'Downside risk', values: ['Inflation erosion, low real returns', 'Large drawdowns, potential permanent loss'] },
            { attribute: 'Best for', values: ['Short-term needs, stability', 'Long-term growth, wealth building'] },
            { attribute: 'Time horizon', values: ['0–3 years', '5+ years'] },
          ]}
        />
      </LessonSection>

      <LessonSection title="Diversification — the only free lunch" icon="🥗">
        <P>
          Nobel laureate Harry Markowitz called diversification "the only free lunch in finance": by spreading
          capital across assets that <Strong>don't move in lockstep</Strong>, you reduce risk without proportionally
          reducing expected returns. The mechanism is correlation — and so are the common misunderstandings:
        </P>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Correlation',
            content: 'How much two assets move together. Low or negative correlation means they offset each other during stress.',
            details: 'Stocks and bonds often have low correlation — when stocks fall, bonds may hold steady or rise. Gold and equities also have periods of low correlation. Mixing low-correlation assets smooths portfolio volatility.',
            color: 'blue',
            tags: ['Key Concept'],
          },
          {
            title: 'Why Concentration Feels Smart',
            content: 'Concentrated portfolios outperform in bull runs, making the holder feel like a genius. They also crash harder.',
            details: '80% in one high-conviction asset is not diversified, no matter how much research went into it. Conviction reduces perceived risk, not actual risk. Even great companies have devastating drawdowns.',
            color: 'orange',
            tags: ['Behavioral Trap'],
          },
          {
            title: 'Diversification Across What?',
            content: 'Asset classes, geographies, sectors, time horizons, and strategies. True diversification is multi-dimensional.',
            details: 'Owning 10 tech stocks is concentrated sector exposure, not diversification. The real thing means assets that respond to different economic forces: equities for growth, bonds for stability, gold for crisis, cash for optionality.',
            color: 'green',
            tags: ['Multi-dimensional'],
          },
          {
            title: 'When Diversification "Fails"',
            content: 'In severe crises, correlations spike — everything drops together temporarily. This is normal and expected.',
            details: 'During acute panics (like March 2020), even diversified portfolios fall. The difference: they recover faster and suffer less permanent damage. The "failure" is temporary; the protection is structural.',
            color: 'purple',
            tags: ['Crisis Behavior'],
          },
        ]} />
        <P>
          Diversification's quieter sibling is <Strong>position sizing</Strong>: no single holding should be large
          enough that its worst case forces a change in how the investor lives or invests. A 5% position going to
          zero is a bad month; a 50% position going to zero is a different life.
        </P>
      </LessonSection>

      <LessonSection title="Risk depends on your situation" icon="🎭">
        <P>
          The same asset can be dangerous or perfectly reasonable depending on <Strong>who holds it and for how
          long</Strong>. Explore the four situations:
        </P>
        <ScenarioWidget
          title="Same asset, different risk — depending on context"
          scenarios={[
            {
              label: 'Short-term need',
              description: 'The money is needed in 6 months for a down payment.',
              details: 'Stocks and crypto are HIGH risk here. Even a 20% dip is devastating because a sale will be forced. For short-term needs, only cash and money market instruments fit. The risk isn\'t the asset — it\'s the mismatch between time horizon and volatility.',
            },
            {
              label: '10-year horizon',
              description: 'Retirement money that won\'t be touched for a decade.',
              details: 'Stocks and diversified ETFs are LOWER risk here. Over 10+ year periods, equity markets have historically recovered from every crash. The bigger danger is holding too much cash and losing to inflation. Time transforms the risk profile.',
            },
            {
              label: 'No emergency fund',
              description: 'No cash reserve — all savings are invested.',
              details: 'EVERYTHING in the portfolio becomes high risk, because any unexpected expense forces a sale. The problem isn\'t what\'s owned — it\'s the missing buffer. Risk management starts with liquidity before it starts with asset selection.',
            },
            {
              label: 'Full reserve + stable income',
              description: 'Six months of expenses saved, stable income, no debt.',
              details: 'This investor can take MORE risk, because their life is insulated from their portfolio. A 30% drawdown is uncomfortable but forces no action. Structural stability is what makes long-term aggressive investing possible.',
            },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          Risk is not a property of the asset alone — it's the relationship between the asset, your time horizon,
          and your liquidity. Volatility you can wait out is noise; volatility you're forced to sell into is loss.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Volatility',
              b: 'Risk',
              explanation:
                'Volatility is price noise. Risk is the probability of permanent loss or of being forced to sell at the wrong time. An asset can be volatile without being risky (if you have time), or low-volatility but risky (if it slowly loses to inflation).',
            },
            {
              a: 'Risk tolerance',
              b: 'Risk capacity',
              explanation:
                'Tolerance is how you feel about losses. Capacity is how much loss your finances can structurally absorb — income stability, emergency fund, time horizon. Someone can feel brave (high tolerance) with no emergency fund (low capacity). Capacity should drive decisions.',
            },
            {
              a: 'Diversification',
              b: 'Owning many assets',
              explanation:
                'Ten correlated assets is not diversification. Ten tech stocks all respond to the same forces. True diversification requires assets that behave differently under different conditions — stocks, bonds, gold, cash.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Volatility', definition: 'How much an asset\'s price fluctuates. High volatility = large swings. Not the same as permanent risk.' },
            { term: 'Permanent loss of capital', definition: 'Money gone forever — bankruptcy, fraud, or irreversible collapse. The truest form of risk.' },
            { term: 'Correlation', definition: 'How two assets move relative to each other: +1 together, 0 independent, −1 opposite. Lower correlation = better diversification.' },
            { term: 'Compensated risk', definition: 'Risk that historically rewards investors with higher returns (e.g., the equity risk premium). Not all risks are compensated.' },
            { term: 'Risk capacity', definition: 'Your financial ability to absorb losses — set by income stability, time horizon, liquidity, and obligations.' },
            { term: 'Risk tolerance', definition: 'Your emotional ability to handle losses without panicking. Real, but less reliable than capacity.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'A diversified index fund drops 25% in a crash. For an investor with a 15-year horizon and a full emergency fund, this is primarily…',
              options: [
                'Permanent loss of capital — the money is gone',
                'Volatility — uncomfortable, but not destructive unless they\'re forced to sell',
                'Liquidity risk — the fund can no longer be sold',
                'Concentration risk — the fund holds too many stocks',
              ],
              correct: 1,
              explanation:
                'Nothing forces this investor to sell, and broad markets have historically recovered from every crash over long horizons. The drawdown is noise on the way to a long-term destination. It would be real risk only with a short horizon or no cash buffer.',
            },
            {
              question: 'Which portfolio is best diversified?',
              options: [
                '12 different technology stocks',
                'One large position in a company you\'ve researched deeply',
                'A mix of global stocks, bonds, gold, and cash',
                'Five different crypto tokens',
              ],
              correct: 2,
              explanation:
                'Diversification is about assets that respond to different economic forces, not about the count of tickers. Twelve tech stocks share one fate; the stock/bond/gold/cash mix has components that offset each other under stress.',
            },
            {
              question: 'An investor feels totally comfortable with big losses, but has no emergency fund and unstable income. What\'s true?',
              options: [
                'High tolerance means they can safely take high risk',
                'Their risk capacity is low — a forced sale in a drawdown could turn volatility into permanent loss',
                'They should hold only cash forever',
                'Tolerance and capacity are the same thing measured differently',
              ],
              correct: 1,
              explanation:
                'Feeling brave doesn\'t pay surprise bills. Without a liquidity buffer, any emergency forces selling at whatever the market price is that day. Capacity — the structural ability to absorb losses — should drive decisions more than tolerance.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Name three types of investment risk beyond volatility.', answer: 'Permanent loss of capital (asset goes to zero), liquidity risk (can\'t sell when needed), concentration risk (too much in one asset), and inflation risk (returns don\'t keep up with rising costs).' },
            { question: 'Why does time horizon change the risk profile of an asset?', answer: 'Over short periods, volatile assets can inflict large losses if a sale is forced. Over long periods the same assets tend to recover and grow, so volatility becomes less dangerous. Time absorbs volatility.' },
            { question: 'What makes diversification the "only free lunch"?', answer: 'Combining uncorrelated assets reduces portfolio volatility without proportionally reducing expected returns — a smoother ride toward a similar destination.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Volatility', value: 'Price noise — uncomfortable but not permanent.' },
          { label: 'True risk', value: 'Permanent loss of capital, or being forced to sell into a drawdown.' },
          { label: 'Diversification', value: 'Mix uncorrelated assets — stocks, bonds, gold, cash — to smooth the ride.' },
          { label: 'Position sizing', value: 'No single holding\'s worst case should change your life or your plan.' },
          { label: 'Capacity > tolerance', value: 'What your finances can absorb matters more than how brave you feel.' },
          { label: 'Key insight', value: 'Risk management starts with liquidity, not asset selection.' },
        ]}
      />
    </LessonLayout>
  )
}
