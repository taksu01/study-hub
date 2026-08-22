import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { ExpandableCardGrid, ScenarioWidget } from '../../components/ui'

export default function Valuation({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m3"
      lessonId="valuation"
      subtitle="Price is what you pay; value is what you get. The same business can be a great investment at one price and a terrible one at another — this lesson is about telling the difference."
      onNavigate={onNavigate}
    >
      <LessonSection title="Price is not value" icon="🏷️">
        <P>
          The market gives every stock a <Strong>price</Strong> — a number that changes every second. What you
          actually get is <Strong>value</Strong>: the earnings power, cash flows, and growth of the business behind
          the ticker. They are related, but they are not the same thing.
        </P>
        <P>
          When price sits far below value, you have a <Strong>margin of safety</Strong>. When price sits far above
          it, you're paying for optimism. Almost everything else in investing is a footnote to this relationship.
        </P>
        <Callout type="tip" title="The one thing to remember">
          Your return is set by two things: how the business does, and what you paid for it. You control only the
          second — which is why disciplined investors obsess over price, not predictions.
        </Callout>
      </LessonSection>

      <LessonSection title="Multiples — and what they hide" icon="📐">
        <P>
          Multiples like P/E compress a whole valuation into one ratio: <Strong>what am I paying per dollar of
          earnings (or assets)?</Strong> Useful shorthand — but every multiple hides assumptions about growth,
          debt, and quality. Expand each card for what it shows <Strong>and</Strong> what it conceals.
        </P>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'P/E Ratio (Price-to-Earnings)',
            subtitle: 'The most common valuation metric',
            content: 'Share price ÷ earnings per share. How much you\'re paying for each dollar of annual earnings.',
            details: 'A P/E of 20 means paying $20 for $1 of annual earnings. Lower generally means "cheaper" — but it can also reflect problems. Higher means "expensive" — but may be justified by growth. What it hides: whether earnings are sustainable, growing, or accounting-flattered. Compare within the same industry; tech naturally trades at higher P/Es than utilities.',
            color: 'blue',
            tags: ['Most Used', 'Earnings Based'],
          },
          {
            title: 'P/B Ratio (Price-to-Book)',
            subtitle: 'Price relative to accounting value',
            content: 'Share price ÷ book value per share. What the market pays vs. what the assets are worth on paper.',
            details: 'P/B of 1 means paying exactly what net assets are worth. Below 1 can signal the market thinks assets are impaired or the business is in trouble. Above 1 (most growth companies) means the market values future earnings beyond current book value. What it hides: intangibles like brands and software barely show up in book value. Most useful for banks and asset-heavy industries.',
            color: 'purple',
            tags: ['Book Value', 'Asset-Heavy Industries'],
          },
          {
            title: 'Market Cap',
            subtitle: 'Total market value of the company',
            content: 'Share price × shares outstanding. The market\'s collective valuation of the whole business.',
            details: 'A company at $180/share with 15B shares carries a $2.7 trillion market cap. It tells you the company\'s size and the consensus opinion of what the business is worth right now — not the "true" value. What it hides: debt. Two companies with the same market cap can carry wildly different obligations.',
            color: 'green',
            tags: ['Company Size', 'Market Consensus'],
          },
          {
            title: 'EV/EBITDA',
            subtitle: 'Enterprise value relative to operating earnings',
            content: 'Enterprise Value ÷ EBITDA. More comprehensive than P/E because it accounts for debt and cash.',
            details: 'Enterprise Value = market cap + debt − cash. EBITDA = earnings before interest, taxes, depreciation, amortization. Debt-neutral — it values the entire business relative to operating earnings, so it\'s useful for comparing companies with different capital structures. What it hides: EBITDA ignores real costs like capex, so asset-heavy businesses can look deceptively cheap on it.',
            color: 'orange',
            tags: ['Debt-Adjusted', 'Professionals Use'],
          },
        ]} />
      </LessonSection>

      <LessonSection title="Same business, three prices" icon="⚖️">
        <P>
          Here's the whole lesson in one exercise. Company XYZ earns <Strong>$5 per share</Strong> — identical
          business in all three scenarios. Only the price you pay changes:
        </P>
        <ScenarioWidget
          title="Company XYZ earns $5 per share. What's your expected return at different prices?"
          scenarios={[
            {
              label: 'Buy at $50 (P/E = 10)',
              description: 'You pay 10x earnings — a relatively cheap price.',
              details: 'At $50, your earnings yield is 10% ($5/$50). If earnings grow 8% annually, your total return could be 15–18% over the next 5 years even if the P/E stays at 10. And if the market re-rates the stock to P/E 15, you get extra gains from multiple expansion. This is "buying quality at a discount."',
            },
            {
              label: 'Buy at $100 (P/E = 20)',
              description: 'You pay 20x earnings — a normal market price for a quality business.',
              details: 'At $100, your earnings yield is 5%. With 8% annual earnings growth, total return might be 10–13% over 5 years — decent, but much more dependent on the growth actually arriving. If the P/E drops to 15, you lose 25% from multiple compression even while earnings grow.',
            },
            {
              label: 'Buy at $200 (P/E = 40)',
              description: 'You pay 40x earnings — pricing in very high expectations.',
              details: 'At $200, your earnings yield is just 2.5%. The company must grow aggressively simply to justify today\'s price. If growth is merely good (say 10%), the P/E likely compresses and you can lose money even as the business improves. This is how great companies become bad investments — the price already contains years of optimism.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="DCF intuition — no spreadsheet required" icon="🔮">
        <P>
          Behind every multiple sits one deeper idea: a business is worth{' '}
          <Strong>all the cash it will produce, discounted back to today</Strong>. That's a discounted cash flow
          (DCF). You don't need the math — you need the logic:
        </P>
        <StepFlow
          steps={[
            { label: 'Estimate the future cash the business will generate', detail: 'Not revenue, not hype — the free cash flow left after running and maintaining the business, year by year.' },
            { label: 'Discount it back to today', detail: 'A dollar arriving in ten years is worth less than a dollar today. The riskier the business and the higher interest rates are, the harsher the discount.' },
            { label: 'Add it up — that\'s intrinsic value', detail: 'The sum of all discounted future cash is what the business is worth to a rational owner. It\'s an estimate, always — garbage assumptions in, garbage value out.' },
            { label: 'Compare with the price, and demand a gap', detail: 'Buy only when price sits well below your estimate. That gap — the margin of safety — is what protects you when your assumptions turn out wrong. They will.' },
          ]}
        />
        <P>
          Two takeaways hide in step 2: <Strong>distant cash is worth less</Strong> (which is why "growth someday"
          companies are so sensitive to disappointment), and <Strong>higher interest rates shrink every valuation</Strong>{' '}
          (the next lesson picks that up).
        </P>
      </LessonSection>

      <LessonSection title="Cheap isn't always good" icon="🪤">
        <P>
          A low P/E doesn't mean "buy." Stocks can be cheap for valid reasons — declining business, industry
          disruption, structural decay. That's a <Strong>value trap</Strong>: it looks cheap and keeps getting cheaper.
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40">
            <h4 className="font-semibold text-sm text-emerald-800 dark:text-emerald-300 mb-2">Genuinely cheap (opportunity)</h4>
            <ul className="space-y-1.5 text-sm text-emerald-700 dark:text-emerald-300/90">
              <li>• Fundamentals intact or improving</li>
              <li>• Temporary setback causing pessimism</li>
              <li>• Strong balance sheet — low debt, good cash</li>
              <li>• Market overreacting to short-term news</li>
              <li>• Competitive position still strong</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/40">
            <h4 className="font-semibold text-sm text-rose-800 dark:text-rose-300 mb-2">Value trap (danger)</h4>
            <ul className="space-y-1.5 text-sm text-rose-700 dark:text-rose-300/90">
              <li>• Business in structural decline</li>
              <li>• Revenue shrinking year over year</li>
              <li>• Heavy debt with falling earnings</li>
              <li>• Industry being disrupted</li>
              <li>• Cheap keeps getting cheaper</li>
            </ul>
          </div>
        </div>
        <Callout type="warning" title="Narratives vs. valuation">
          Markets run on stories — "this changes everything," "the next Amazon." A narrative can be completely true
          and the stock still overvalued. Valuation is the discipline of asking: how much of this story is already
          in the price? A revolutionary company at an absurd price is still a bad investment.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Low P/E',
              b: 'Undervalued',
              explanation:
                'Low P/E can mean cheap (opportunity) or cheap for a reason (value trap). You need to understand WHY the multiple is low before concluding anything. The number is the start of the question, not the answer.',
            },
            {
              a: 'Expensive',
              b: 'Overvalued',
              explanation:
                'A stock at P/E 40 might be fairly valued if it\'s genuinely compounding earnings at 30%+ a year. "Expensive" is a judgment relative to growth and quality, not an absolute threshold.',
            },
            {
              a: 'Narrative',
              b: 'Valuation',
              explanation:
                'The narrative is the story about where the company is going. Valuation asks how much of that story is already in the price. Both can be "right" and you can still lose money if the story was fully priced in.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'P/E ratio', definition: 'Price per share ÷ earnings per share. How much you pay for each dollar of annual profit.' },
            { term: 'Earnings yield', definition: 'Earnings ÷ price — the inverse of P/E. A P/E of 20 is a 5% earnings yield; useful for comparing against bond yields.' },
            { term: 'Enterprise value (EV)', definition: 'Market cap + debt − cash. The total takeover value of a business — what buying the whole thing really costs.' },
            { term: 'Intrinsic value', definition: 'What a business is worth based on the discounted sum of its future cash flows. Always an estimate, never a fact.' },
            { term: 'Margin of safety', definition: 'The gap between estimated value and price paid. A bigger gap means you can be partially wrong and still do fine.' },
            { term: 'Multiple expansion / compression', definition: 'The market raising or cutting the P/E it assigns a stock. Can dominate returns independently of how the business performs.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'A stock trades at a P/E of 10. What does that actually tell you?',
              options: [
                'The stock is undervalued and should be bought',
                'You\'re paying $10 per $1 of annual earnings — a 10% earnings yield — but not WHY it\'s priced that way',
                'The company will grow earnings 10% per year',
                'The stock is 10% cheaper than the market average',
              ],
              correct: 1,
              explanation:
                'A multiple is a price tag, not a verdict. P/E 10 means a 10% earnings yield — attractive IF earnings are sustainable. It could be a bargain or a value trap in structural decline. The multiple starts the investigation; it never finishes it.',
            },
            {
              question: 'How can a genuinely great, growing company still be a bad investment?',
              options: [
                'It can\'t — great businesses always produce great returns eventually',
                'Only if management commits fraud',
                'If the purchase price already contains years of optimism, even good results can bring multiple compression and losses',
                'Only if the overall market crashes',
              ],
              correct: 2,
              explanation:
                'At P/E 40, "merely good" growth disappoints expectations, the multiple compresses, and the shareholder loses money while the business improves. Return = business performance AND the price paid. History is full of great companies that were terrible stocks from the wrong starting price.',
            },
            {
              question: 'In DCF terms, why are far-future-growth companies hit hardest when interest rates rise?',
              options: [
                'Because their cash flows sit far in the future, and higher discount rates shrink distant cash the most',
                'Because rising rates always cause recessions',
                'Because growth companies carry the most debt',
                'They aren\'t — all stocks fall equally when rates rise',
              ],
              correct: 0,
              explanation:
                'Discounting punishes distance: a dollar in year 15 loses far more present value from a higher discount rate than a dollar next year. Companies whose value depends mostly on distant earnings are therefore the most rate-sensitive — a key link to the macro lesson.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why can a great company still be a bad investment?', answer: 'Because the price may already reflect — or over-reflect — its greatness. Pay P/E 50 for a company growing 15% and most of the growth is pre-paid. Your return depends on business quality AND the price you paid.' },
            { question: 'What is a value trap?', answer: 'A stock that looks statistically cheap (low P/E, low P/B) but is cheap for valid structural reasons — declining business, disruption, deteriorating fundamentals. The cheapness is a warning, not an opportunity.' },
            { question: 'What is the margin of safety and why does it matter?', answer: 'The gap between estimated intrinsic value and the purchase price. A larger margin means you can be partially wrong about the business and still earn a reasonable return. It\'s the buffer against inevitable estimation errors.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Core insight', value: 'Price is what you pay; value is what you get. Return = business + price paid.' },
          { label: 'P/E ratio', value: 'Price / earnings. Shorthand, not verdict. Compare within a sector.' },
          { label: 'EV/EBITDA', value: 'Debt-neutral comparison. Watch out — EBITDA ignores capex.' },
          { label: 'DCF intuition', value: 'Value = future cash, discounted to today. Distant cash is worth less.' },
          { label: 'Value trap', value: 'Cheap for a reason. Never buy without understanding the why.' },
          { label: 'Margin of safety', value: 'Buy below estimated value. Leave room to be wrong — you will be.' },
        ]}
      />
    </LessonLayout>
  )
}
