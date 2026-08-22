import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import AssetComparison from '../../components/market/visuals/AssetComparison'

export default function DigitalGold({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="digital-gold"
      subtitle="Gold won a 5,000-year competition to become the world's neutral reserve asset. The 'digital gold' thesis claims Bitcoin inherits gold's winning properties and fixes its weaknesses — with two honest exceptions."
      onNavigate={onNavigate}
    >
      <LessonSection title="Why gold won in the first place" icon="🪙">
        <P>
          Gold did not become money by decree. Over millennia it outcompeted shells, salt, cattle, and copper because it
          scored best on the properties money needs: <Strong>scarce</Strong> (~1.8% new supply per year),{' '}
          <Strong>durable</Strong>, divisible, fungible, and verifiable. It earned reserve-asset status by winning a
          very long market test.
        </P>
        <P>
          But gold has one structural weakness in a digital world: <Strong>it cannot move at the speed of
          information</Strong>. Shipping $100M of gold means vaults, armored trucks, and trusted intermediaries — which
          reintroduces exactly the counterparty risk that sound money is supposed to remove. That gap is where the
          Bitcoin thesis lives.
        </P>
      </LessonSection>

      <LessonSection title="What Bitcoin inherits, improves — and lacks" icon="⚖">
        <P>
          The thesis: Bitcoin keeps gold's scarcity and durability while upgrading <Strong>portability</Strong> (a
          fortune moves globally in one block; keys fit in 12–24 memorized words), <Strong>divisibility</Strong> (100
          million satoshis per coin), <Strong>verifiability</Strong> (any node confirms authenticity in seconds — no
          assay lab), and <Strong>supply auditability</Strong> (nobody knows gold's true above-ground stock; anyone can
          verify Bitcoin's to the satoshi).
        </P>
        <P>
          Where gold still clearly wins: <Strong>track record</Strong> — 5,000 years versus ~16 — and{' '}
          <Strong>volatility</Strong>, roughly 15% annualized versus Bitcoin's 50–80%. Whether Bitcoin's advantages
          outweigh a 5,000-year head start is precisely the bet; the label "digital gold" describes an aspiration the
          market is still testing.
        </P>
      </LessonSection>

      <LessonSection title="How the asset classes stack up" icon="📊">
        <P>
          Bitcoin has been the best-performing major asset of the last decade — and also the one with the deepest
          drawdowns. Toggle the time horizons and note both facts at once:
        </P>
        <AssetComparison />
        <Callout type="warning" title="Read the returns honestly">
          Those historical returns came from Bitcoin repricing from near-zero, an effect that mathematically cannot
          repeat at today's size. Past performance is evidence the thesis has worked so far — it is not a forecast. The
          same table includes multiple 70–80% crashes.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Gold is backed by something real"',
              b: 'Both are social agreements',
              explanation:
                'Gold\'s industrial demand explains only a fraction of its price; its monetary premium — most of its value — comes from collective agreement, exactly like Bitcoin\'s. The fair comparison is not "real vs fake" but "which set of monetary properties do people converge on?" That question is open.',
            },
            {
              a: 'Store of value (goal)',
              b: 'Store of value (today)',
              explanation:
                'An asset that can drop 70% in a year is not yet a reliable short-term store of value, whatever the long-term chart says. The thesis is that volatility declines as market cap and liquidity grow — which has broadly happened so far — but "digital gold" is a destination Bitcoin is argued to be approaching, not a status it holds now.',
            },
            {
              a: 'Bitcoin vs stocks',
              b: 'Bitcoin vs gold',
              explanation:
                'Stocks are claims on cash flows — they produce earnings and can be valued on them. Gold and Bitcoin produce nothing; their value is purely monetary. So "Bitcoin has no earnings" is true but aims at the wrong benchmark: the honest comparison set is gold, cash, and other non-yielding monetary assets.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Store of value (SoV)', definition: 'An asset expected to hold purchasing power across time. Gold is the historical benchmark; Bitcoin is the proposed digital contender.' },
            { term: 'Digital gold thesis', definition: 'The argument that Bitcoin can capture part of gold\'s monetary role by matching its scarcity while beating it on portability and verifiability.' },
            { term: 'Monetary premium', definition: 'The share of an asset\'s price that comes from its use as money rather than from industrial or consumption demand. Most of gold\'s value is monetary premium.' },
            { term: 'Counterparty risk', definition: 'The risk that someone else\'s promise fails — a custodian, bank, or issuer. Physical gold at scale requires custodians; self-custodied Bitcoin does not.' },
            { term: 'Executive Order 6102', definition: 'FDR\'s 1933 order compelling Americans to surrender gold. Cited to show physical assets are seizable in ways self-custodied keys are harder to reach.' },
            { term: 'Asymmetric bet', definition: 'A position where the plausible upside is a large multiple of the bounded downside (the amount invested). The standard framing for small BTC allocations.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Which property gap between gold and Bitcoin does the "digital gold" thesis lean on most?',
              options: [
                'Gold is less scarce than Bitcoin per unit',
                'Gold cannot move or be verified at the speed of information without trusted intermediaries',
                'Gold has no industrial use, unlike Bitcoin',
                'Gold\'s supply schedule is published in advance',
              ],
              correct: 1,
              explanation:
                'Gold\'s scarcity is fine — its weakness is physical: moving or verifying it at scale requires vaults, assayers, and custodians, reintroducing counterparty risk. Bitcoin settles globally in minutes and any node verifies it for free. (Gold does have industrial use, and its supply schedule is not fixed.)',
            },
            {
              question: 'Where does gold still clearly beat Bitcoin today?',
              options: [
                'Divisibility and portability',
                'Ability to audit the total supply',
                'Track record (millennia vs ~16 years) and much lower volatility',
                'Resistance to confiscation',
              ],
              correct: 2,
              explanation:
                'Gold\'s two honest advantages are time-tested credibility and ~15% volatility versus Bitcoin\'s 50–80%. The other options run the other way: Bitcoin is more divisible, more portable, has a fully auditable supply, and 1933\'s EO 6102 showed physical gold is quite confiscable.',
            },
            {
              question: 'Why should you NOT project Bitcoin\'s past decade of returns forward?',
              options: [
                'The returns were fabricated by exchanges',
                'Much of the gain came from repricing off a near-zero base — an effect that shrinks as market cap grows',
                'Bitcoin\'s supply will start inflating after 2028',
                'Historical returns only count if an asset pays dividends',
              ],
              correct: 1,
              explanation:
                'Early returns reflect a tiny asset being discovered. At a multi-trillion-dollar market cap, doubling requires trillions of new demand, not millions. The thesis can still pay off from here — but arithmetic guarantees the slope must flatten, and the historical drawdowns remain real.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Name three concrete ways Bitcoin improves on gold, and the two ways gold still wins.', answer: 'Improves: portability (global settlement in minutes, keys in memorized words), verifiability (any node, seconds, free — no assay), and supply auditability/divisibility (exact 21M cap, 100M sats per coin). Gold wins: a 5,000-year track record and far lower volatility (~15% vs 50–80%).' },
            { question: 'Why is "Bitcoin isn\'t backed by anything" a weak argument in the gold comparison?', answer: 'Because gold\'s monetary value is not "backed" either — its industrial demand covers only a fraction of its price. Both assets derive their monetary premium from collective agreement about their properties. The real question is which property set the market prefers.' },
            { question: 'What is the honest way to describe Bitcoin\'s store-of-value status today?', answer: 'A candidate, not an incumbent. Long-term holders have historically been rewarded, but 70–80% drawdowns mean it does not yet reliably store value over short horizons. The thesis is that volatility declines with scale — a trend visible so far but not guaranteed.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Gold\'s win', value: '5,000 years of beating rival monies on scarcity, durability, fungibility, verifiability.' },
          { label: 'Gold\'s flaw', value: 'Physical: can\'t move or verify at information speed; needs custodians → counterparty risk.' },
          { label: 'BTC inherits', value: 'Scarcity + durability; adds instant settlement, free verification, auditable 21M supply.' },
          { label: 'BTC lacks', value: 'Track record (~16 yrs) and stability (50–80% vol vs gold\'s ~15%).' },
          { label: 'vs stocks/bonds', value: 'Those are cash-flow claims; gold and BTC are pure monetary assets. Compare like with like.' },
          { label: 'Returns caveat', value: 'Decade-best performance came off a near-zero base and included multiple 70–80% crashes.' },
        ]}
      />
    </LessonLayout>
  )
}
