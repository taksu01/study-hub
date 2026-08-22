import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import InflationVisualizer from '../../components/market/visuals/InflationVisualizer'

export default function Inflation({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="inflation"
      subtitle="Inflation isn't just 'prices going up' — it's who gets the new money first. The Cantillon Effect explains why money printing redistributes wealth, and why Bitcoin's fixed supply is pitched as an opt-out."
      onNavigate={onNavigate}
    >
      <LessonSection title="More units, weaker units" icon="📉">
        <P>
          Since 1971 — when the Nixon Shock ended the dollar's convertibility to gold — the US M2 money supply has grown
          from roughly <Strong>$700 billion to over $21 trillion</Strong>, and the dollar has lost about{' '}
          <Strong>87% of its purchasing power</Strong>. What cost $1 then costs roughly $7.70 now. That is not an
          accident: moderate, continuous expansion of the money supply is deliberate policy in every major economy.
        </P>
        <P>
          Even "harmless" 3% inflation compounds brutally: $1 becomes ~$0.55 of purchasing power in 20 years and ~$0.30
          in 40. A saver holding cash for a working lifetime loses most of its real value{' '}
          <Strong>without spending a penny</Strong>. And in Argentina, Turkey, or Nigeria — where inflation runs
          10–50%+ — this is not a slow leak but an open drain.
        </P>
      </LessonSection>

      <LessonSection title="The dollar's purchasing power, charted" icon="📊">
        <InflationVisualizer />
      </LessonSection>

      <LessonSection title="The Cantillon Effect: who gets the new money first" icon="🏦">
        <P>
          The 18th-century economist <Strong>Richard Cantillon</Strong> noticed something sharper than "prices rise":
          new money enters the economy <Strong>unevenly</Strong>. It arrives through specific doors — bond purchases,
          bank lending, asset markets — and the people standing at those doors get to spend it at <Strong>old
          prices</Strong>, before the price level adjusts. Follow one round of money creation:
        </P>
        <StepFlow
          steps={[
            { label: 'Central bank creates new money', detail: 'Via quantitative easing it buys bonds from primary dealers — large banks — crediting them with freshly created reserves.' },
            { label: 'First recipients spend at old prices', detail: 'Banks and asset managers deploy the new money into stocks, real estate, and credit while price tags still reflect the old money supply.' },
            { label: 'Asset prices inflate first', detail: 'Housing, equities, and financial assets get bid up. Those who already own assets get richer on paper before consumer prices move.' },
            { label: 'Prices ripple outward', detail: 'The new money circulates; goods and services gradually reprice upward across the economy.' },
            { label: 'Last recipients pay the bill', detail: 'Wage earners and cash savers receive the new money last — after prices have adjusted. Their salaries and savings buy less. The transfer is complete.' },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          Inflation is not a uniform tax — it is a transfer, ordered by proximity to the money printer. First
          recipients spend new money at old prices; savers and wage earners get it last, at new prices.
        </Callout>
      </LessonSection>

      <LessonSection title="Bitcoin's answer — and its limits" icon="₿">
        <P>
          Bitcoin's pitch here is structural: there is <Strong>no privileged door for new money</Strong>. New BTC
          enters only through mining — an open, competitive process where the issuer is whoever spends the most
          verifiable energy, and issuance never exceeds the schedule regardless of politics. Nobody can print BTC and
          hand it to allies at old prices.
        </P>
        <P>
          Two honest caveats. First, being immune to <Strong>supply debasement</Strong> is not the same as being stable
          — Bitcoin's price swings far more year-to-year than the dollar's purchasing power does, so it hedges slow
          debasement only over long horizons. Second, this is a critique of the <Strong>mechanism</Strong> of money
          creation, not proof that central banking's goals (smoothing crises, managing employment) are illegitimate.
          Economists genuinely disagree about whether a fixed-supply money would be better for an economy overall.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Price inflation',
              b: 'Monetary inflation',
              explanation:
                'Monetary inflation is the expansion of the money supply; price inflation (CPI) is one downstream symptom. They can diverge for years — 2010s money printing showed up mostly in asset prices (stocks, housing), not consumer goods, which is why CPI looked tame while homes became unaffordable.',
            },
            {
              a: '"Inflation hits everyone equally"',
              b: 'The Cantillon ordering',
              explanation:
                'If new money reached everyone simultaneously, relative wealth would barely change. In reality it enters through banks and asset markets first, so asset owners gain while cash savers and fixed-salary workers lose. The damage depends on where you stand in the queue, not just the inflation rate.',
            },
            {
              a: '"Bitcoin is an inflation hedge"',
              b: '"Bitcoin is short-term stable"',
              explanation:
                'Fixed supply protects against dilution, but Bitcoin\'s market price can fall 50%+ in months — as it did in 2022 while CPI ran hot. The debasement-hedge argument is a long-horizon claim about supply, not a promise that BTC tracks inflation quarter by quarter. Over short windows it has often failed as a hedge.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Cantillon Effect', definition: 'New money benefits those who receive it first (spending at old prices) at the expense of those who receive it last.' },
            { term: 'Nixon Shock (1971)', definition: 'The end of dollar–gold convertibility — the last external constraint on dollar issuance. Start of the pure-fiat era.' },
            { term: 'M2 money supply', definition: 'A broad money measure (cash, deposits, savings). US M2: ~$700B in 1971 → ~$21T in 2024, including ~35% growth in 2020–22 alone.' },
            { term: 'Quantitative easing (QE)', definition: 'Central-bank asset purchases that expand the money supply — the main modern channel through which new money enters via financial institutions.' },
            { term: 'Purchasing power', definition: 'What a unit of money actually buys. The USD has lost ~87% of it since 1971; compounding makes even small annual losses large.' },
            { term: 'Monetary debasement', definition: 'Erosion of a currency\'s value through supply expansion — the historical fate of every fiat currency to date.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What exactly does the Cantillon Effect describe?',
              options: [
                'The tendency of all prices to rise at the same rate during inflation',
                'The unequal impact of new money: early recipients spend at old prices, late recipients face already-risen prices',
                'The rule that central banks must keep inflation near 2%',
                'The correlation between interest rates and unemployment',
              ],
              correct: 1,
              explanation:
                'Cantillon\'s insight is about ordering, not just quantity: new money enters through specific channels (banks, asset markets), and position in that queue determines who gains and who pays. Uniform inflation would be far less redistributive.',
            },
            {
              question: 'Why did the 2010s see huge money creation but modest CPI inflation?',
              options: [
                'The money was never actually created',
                'CPI was secretly redefined to hide it',
                'New money flowed first into asset markets, inflating stocks and housing rather than the consumer-goods basket CPI measures',
                'Inflation only occurs when governments print physical banknotes',
              ],
              correct: 2,
              explanation:
                'QE money entered via financial institutions and largely stayed in asset markets — the S&P and home prices soared while the CPI basket stayed tame. This is the Cantillon mechanism in action: where money enters determines what inflates first.',
            },
            {
              question: 'What is the strongest honest caveat to "Bitcoin fixes inflation"?',
              options: [
                'Bitcoin\'s supply schedule can be quietly changed by miners',
                'Bitcoin is immune to supply dilution but highly volatile — it can lose far more in a bad year than fiat loses to inflation, so the hedge only plausibly works long-term',
                'Bitcoin\'s issuance is controlled by a central foundation',
                'Bitcoin\'s supply actually grows faster than the dollar\'s',
              ],
              correct: 1,
              explanation:
                'The fixed supply is real and enforced. The caveat is price risk: in 2022 BTC fell ~65% while inflation ran hot. Fixed supply addresses slow, permanent debasement over long horizons — it does not deliver short-term purchasing-power stability.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Walk through the path new money takes from creation to the last recipient.', answer: 'Central bank creates money via QE → primary dealers/banks receive it → they buy assets at old prices → asset prices inflate first → the money circulates and consumer prices adjust upward → wage earners and cash savers receive it last, after prices have already risen.' },
            { question: 'Roughly how much purchasing power has the USD lost since 1971, and what event marks that starting point?', answer: 'About 87%. The starting point is the 1971 Nixon Shock — ending dollar–gold convertibility, which removed the last hard constraint on money creation. M2 grew from ~$700B to ~$21T over the same period.' },
            { question: 'Why is Bitcoin structurally immune to the Cantillon Effect — and what does that immunity NOT give you?', answer: 'New BTC is issued only through open, competitive mining on a fixed schedule — there is no privileged first recipient and no way to expand supply for allies. But immunity to dilution is not price stability: BTC remains highly volatile, so the hedge argument only applies over long horizons.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Core mechanic', value: 'Prices rise because money supply rises: more units chasing the same goods.' },
          { label: 'Cantillon Effect', value: 'New money enters unevenly — first recipients win, savers and wage earners pay.' },
          { label: 'The numbers', value: 'USD −87% purchasing power since 1971; M2 ~$700B → ~$21T; 2020–22 M2 +35%.' },
          { label: 'Compounding', value: '3%/yr inflation ≈ −45% in 20 years, −70% in 40. "Small" rates are not small.' },
          { label: 'Bitcoin\'s claim', value: 'Fixed schedule + open mining = no privileged door for new money.' },
          { label: 'The caveat', value: 'Dilution-proof ≠ stable. BTC hedges long-run debasement, not next quarter.' },
        ]}
      />
    </LessonLayout>
  )
}
