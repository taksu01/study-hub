import {
  SectionShell, SectionHeader, Subsection, Prose, CompareTable,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, ScenarioWidget
} from '../components/ui'

export default function Section09() {
  return (
    <SectionShell id="section-9">
      <SectionHeader
        number={9}
        title="A Good Business Can Still Be a Bad Buy"
        subtitle="Valuation is about what you pay relative to what you get. The same business can be a great investment at one price and a terrible one at another."
      />

      <Subsection title="Price vs. Value">
        <Prose>
          <p>The market gives every stock a price. But price and value are not the same thing. Price is what you pay. Value is what you get — the actual earnings power, cash flows, and growth potential of the business.</p>
          <p>When price is far below value, you have a margin of safety. When price is far above value, you're paying for optimism. The entire discipline of investing ultimately comes down to this relationship.</p>
        </Prose>
        <InfoCallout type="tip">
          Warren Buffett: "Price is what you pay. Value is what you get." This one idea, deeply internalized, prevents more investing mistakes than any amount of technical analysis.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Valuation Metrics">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'P/E Ratio (Price-to-Earnings)',
            subtitle: 'The most common valuation metric',
            content: 'Share price ÷ earnings per share. Tells you how much you\'re paying for each dollar of earnings.',
            details: 'A P/E of 20 means you\'re paying $20 for $1 of annual earnings. Lower P/E generally means "cheaper" but not always better (might reflect problems). Higher P/E means "expensive" but might be justified by high growth. The S&P 500 historically averages a P/E around 15-17. Compare P/E within the same industry — tech stocks trade at higher P/Es than utilities.',
            color: 'blue',
            tags: ['Most Used', 'Earnings Based'],
          },
          {
            title: 'P/B Ratio (Price-to-Book)',
            subtitle: 'Price relative to accounting value',
            content: 'Share price ÷ book value per share. Compares what the market pays vs. what the company\'s assets are worth on paper.',
            details: 'P/B of 1 means you\'re paying exactly what the company\'s net assets are worth. Below 1 can mean the market thinks the assets are impaired or the company is in trouble. Above 1 (most growth companies) means the market values the company\'s future earnings potential beyond current book value. Most useful for banks and asset-heavy industries.',
            color: 'purple',
            tags: ['Book Value', 'Asset-Heavy Industries'],
          },
          {
            title: 'Market Cap',
            subtitle: 'Total market value of the company',
            content: 'Share price × total shares outstanding. The market\'s total valuation of the entire business.',
            details: 'Apple at $180/share with 15B shares = $2.7 trillion market cap. Market cap tells you the company\'s size and what the market collectively thinks the business is worth. It\'s not the "true" value — it\'s the consensus opinion at this moment.',
            color: 'green',
            tags: ['Company Size', 'Market Consensus'],
          },
          {
            title: 'EV/EBITDA',
            subtitle: 'Enterprise value relative to earnings before extras',
            content: 'Enterprise Value ÷ EBITDA. More comprehensive than P/E because it accounts for debt and cash.',
            details: 'Enterprise Value = Market Cap + Debt – Cash. EBITDA = Earnings Before Interest, Taxes, Depreciation, Amortization. This metric is debt-neutral — it values the entire business (equity + debt) relative to operating earnings. Useful for comparing companies with different capital structures. A lower EV/EBITDA generally indicates cheaper valuation.',
            color: 'orange',
            tags: ['Debt-Adjusted', 'Professionals Use'],
          },
        ]} />
      </Subsection>

      <Subsection title="Same Business, Different Price — Different Outcome">
        <ScenarioWidget
          title="Company XYZ earns $5 per share. What's your expected return at different prices?"
          scenarios={[
            {
              label: 'Buy at $50 (P/E = 10)',
              description: 'You pay 10x earnings — a relatively cheap price.',
              details: 'At $50, your earnings yield is 10% ($5/$50). If earnings grow 8% annually, your total return could be 15-18% over the next 5 years, even if the P/E ratio stays at 10. Plus, if the market re-rates the stock to P/E 15, you get additional gains from multiple expansion. This is "buying quality at a discount."',
            },
            {
              label: 'Buy at $100 (P/E = 20)',
              description: 'You pay 20x earnings — a normal market price for a quality business.',
              details: 'At $100, your earnings yield is 5%. If earnings grow 8% annually, your total return might be 10-13% over 5 years — decent but much more dependent on continued growth. If growth disappoints, there\'s less margin for error. If the P/E drops to 15, you lose 25% from multiple compression even if earnings grow.',
            },
            {
              label: 'Buy at $200 (P/E = 40)',
              description: 'You pay 40x earnings — pricing in very high expectations.',
              details: 'At $200, your earnings yield is only 2.5%. The company must grow earnings aggressively just to justify the current price. If growth is "merely good" (say 10%), the P/E likely compresses, and you could lose money even as the business improves. This is how great companies become bad investments — the price already contains years of optimism.',
            },
          ]}
        />
      </Subsection>

      <Subsection title="Why Cheap Isn't Always Good">
        <Prose>
          <p>Low P/E doesn't automatically mean "buy." A stock can be cheap for valid reasons: declining business, management problems, industry disruption, or structural headwinds. This is called a "value trap" — the stock looks cheap but keeps getting cheaper.</p>
        </Prose>
        <div className="grid md:grid-cols-2 gap-4 mt-4 mb-6">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <h4 className="font-semibold text-sm text-emerald-800 mb-2">Genuinely Cheap (Opportunity)</h4>
            <ul className="space-y-1.5 text-sm text-emerald-700">
              <li>• Business fundamentals are intact or improving</li>
              <li>• Temporary setback causing pessimism</li>
              <li>• Strong balance sheet (low debt, good cash)</li>
              <li>• Market is overreacting to short-term news</li>
              <li>• Competitive position remains strong</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <h4 className="font-semibold text-sm text-rose-800 mb-2">Value Trap (Danger)</h4>
            <ul className="space-y-1.5 text-sm text-rose-700">
              <li>• Business is in structural decline</li>
              <li>• Revenue shrinking year over year</li>
              <li>• Heavy debt with declining earnings</li>
              <li>• Industry being disrupted</li>
              <li>• Cheap keeps getting cheaper</li>
            </ul>
          </div>
        </div>
      </Subsection>

      <Subsection title="Narratives vs. Valuation">
        <Prose>
          <p>Markets run on narratives — compelling stories about the future. "AI will change everything." "This company is the next Amazon." "Crypto will replace the financial system." Narratives can be true AND the stock can still be overvalued.</p>
          <p>Valuation is the discipline of asking: "How much of this narrative is already priced in?" If a stock price assumes 30% annual growth for the next decade, even a good outcome might disappoint the market's expectations.</p>
        </Prose>
        <InfoCallout type="warning">
          The most expensive words in investing: "This time it's different." Sometimes it is. But the price you pay still determines your return. A revolutionary company at an absurd price can still be a terrible investment.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'P/E Ratio', definition: 'Price-to-Earnings. Price per share divided by earnings per share. Measures how much you pay for each dollar of profit.' },
          { term: 'P/B Ratio', definition: 'Price-to-Book. Price per share divided by book value per share. Compares market price to accounting value.' },
          { term: 'Market Cap', definition: 'Share price × shares outstanding. The total market value of the company.' },
          { term: 'Enterprise Value (EV)', definition: 'Market cap + debt – cash. The total takeover value of a business.' },
          { term: 'EBITDA', definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. A measure of operating profitability.' },
          { term: 'Earnings Yield', definition: 'Earnings per share / price per share. The inverse of P/E. A 5% earnings yield means P/E of 20.' },
          { term: 'Margin of Safety', definition: 'The gap between what a business is worth and what you pay. Larger gap = more protection against mistakes.' },
          { term: 'Multiple Expansion/Compression', definition: 'When the market increases (expansion) or decreases (compression) the P/E it assigns. Can dramatically affect returns.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Low P/E', itemB: 'Undervalued', explanation: 'Low P/E can mean cheap (opportunity) or cheap for a reason (value trap). You need to understand WHY the P/E is low before concluding it\'s undervalued.' },
          { itemA: 'Expensive', itemB: 'Overvalued', explanation: 'A stock at P/E 40 might be fairly valued if it\'s genuinely growing 30%+ annually. "Expensive" is a judgment relative to growth and quality, not an absolute number.' },
          { itemA: 'Narrative', itemB: 'Valuation', explanation: 'The narrative is the story about where the company is going. Valuation is how much of that story is already reflected in the price. Both can be "right" and you can still lose money if the narrative is fully priced in.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Why can a great company still be a bad investment?', answer: 'Because the price might already reflect (or over-reflect) its greatness. If you pay P/E 50 for a company growing at 15%, most of that growth is already priced in. Your return depends not just on business quality but on what you paid.' },
          { question: 'What is a "value trap"?', answer: 'A stock that looks statistically cheap (low P/E, low P/B) but is cheap for valid structural reasons — declining business, industry disruption, or deteriorating fundamentals. The cheapness isn\'t an opportunity; it\'s a warning.' },
          { question: 'What is the margin of safety and why does it matter?', answer: 'The gap between estimated intrinsic value and purchase price. A larger margin of safety means you can be partially wrong about the business and still earn a reasonable return. It\'s your buffer against inevitable estimation errors.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Core Insight', value: 'Price is what you pay. Value is what you get.' },
          { label: 'P/E Ratio', value: 'Price / earnings. Higher = pricier. Compare within sector.' },
          { label: 'P/B Ratio', value: 'Price / book value. Useful for asset-heavy businesses.' },
          { label: 'EV/EBITDA', value: 'Enterprise value / operating earnings. Debt-neutral comparison.' },
          { label: 'Value Trap', value: 'Cheap for a reason. Don\'t buy without understanding why.' },
          { label: 'Narrative Risk', value: 'Great story ≠ good price. How much is already priced in?' },
          { label: 'Margin of Safety', value: 'Buy below value. Leave room for being wrong.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
