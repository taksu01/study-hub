import {
  SectionShell, SectionHeader, Subsection, Prose, CompareTable,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TabbedContent
} from '../components/ui'

export default function Section06() {
  return (
    <SectionShell id="section-6">
      <SectionHeader
        number={6}
        title="How Common Investment Instruments Actually Work"
        subtitle="Stocks, ETFs, bonds, mutual funds — what they are, how they differ, and which confusions to avoid."
      />

      <Subsection title="The Instrument Landscape">
        <Prose>
          <p>An "instrument" is the specific thing you buy. While asset classes are categories (stocks, bonds, etc.), instruments are the actual securities you purchase in a brokerage account. Understanding how each one works — and how they differ from each other — prevents costly confusion.</p>
        </Prose>
      </Subsection>

      <Subsection title="Side-by-Side Instrument Profiles">
        <TabbedContent tabs={[
          {
            label: 'Stocks',
            content: (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-800">What it is:</strong> A share of ownership in a single company. When you buy a stock, you own a tiny fraction of that business.</p>
                <p><strong className="text-slate-800">How you earn:</strong> Price appreciation (stock price goes up) and dividends (company pays you a share of profits).</p>
                <p><strong className="text-slate-800">Risk:</strong> Individual company risk — the company can underperform, lose market share, or go bankrupt. High volatility for individual stocks.</p>
                <p><strong className="text-slate-800">Best for:</strong> Investors who want to own specific businesses they understand, or as the building block inside ETFs and funds.</p>
                <InfoCallout type="info">Owning individual stocks requires conviction AND understanding. A single stock can go to zero. ETFs remove single-company risk by holding hundreds of stocks.</InfoCallout>
              </div>
            ),
          },
          {
            label: 'ETFs',
            content: (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-800">What it is:</strong> A fund that holds a basket of assets (stocks, bonds, gold, etc.) and trades on an exchange like a stock.</p>
                <p><strong className="text-slate-800">How you earn:</strong> Same as the underlying assets — price appreciation, dividends, interest — all in one package.</p>
                <p><strong className="text-slate-800">Key advantage:</strong> Instant diversification. One S&P 500 ETF = 500 companies. One global ETF = thousands of companies. Very low fees for index ETFs (0.03-0.20% annually).</p>
                <p><strong className="text-slate-800">Best for:</strong> Most investors. ETFs are the default tool for building a diversified portfolio efficiently. Buy and hold a few broad ETFs and you're better positioned than most professional traders.</p>
                <InfoCallout type="tip">A single global equity ETF + a bond ETF can form a complete, diversified portfolio. You don't need dozens of positions.</InfoCallout>
              </div>
            ),
          },
          {
            label: 'Mutual Funds',
            content: (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-800">What it is:</strong> A pooled investment fund managed by a professional. Investors buy "units" of the fund, which holds a portfolio of assets.</p>
                <p><strong className="text-slate-800">Key difference from ETFs:</strong> Mutual funds are priced once daily (end of day). ETFs trade throughout the day at market prices. Mutual funds often have higher fees, especially actively managed ones.</p>
                <p><strong className="text-slate-800">Active vs. Passive:</strong> Active mutual funds try to beat the market (usually fail after fees). Passive index mutual funds track an index (similar to index ETFs, just different vehicle).</p>
                <p><strong className="text-slate-800">Best for:</strong> Retirement accounts where mutual funds are the only option, or specific strategies not available as ETFs.</p>
              </div>
            ),
          },
          {
            label: 'Bonds',
            content: (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-800">What it is:</strong> A loan you make to a government or corporation. They pay you regular interest (coupon) and return your principal at maturity.</p>
                <p><strong className="text-slate-800">How you earn:</strong> Coupon payments (regular interest) and potential price appreciation if interest rates fall.</p>
                <p><strong className="text-slate-800">Key risk:</strong> Interest rate risk (bond prices fall when rates rise), credit risk (the borrower might default), and inflation risk (fixed payments lose purchasing power).</p>
                <p><strong className="text-slate-800">Types:</strong> Government bonds (safest), corporate bonds (higher yield, higher risk), high-yield/junk bonds (even higher yield and risk), inflation-protected bonds (TIPS).</p>
              </div>
            ),
          },
          {
            label: 'Money Market',
            content: (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-800">What it is:</strong> A fund that invests in very short-term, high-quality debt (T-bills, commercial paper). Functions like a high-yield savings account.</p>
                <p><strong className="text-slate-800">How you earn:</strong> Interest income, typically higher than a regular savings account. Principal is extremely stable.</p>
                <p><strong className="text-slate-800">Risk:</strong> Near zero. Not technically guaranteed like bank deposits, but defaults are exceptionally rare.</p>
                <p><strong className="text-slate-800">Best for:</strong> Parking cash short-term, emergency reserves, or investment cash waiting to be deployed. The ideal holding for money you need liquid but want to earn something on.</p>
              </div>
            ),
          },
        ]} />
      </Subsection>

      <Subsection title="The Key Comparisons">
        <CompareTable
          headers={['Stock', 'ETF', 'Mutual Fund', 'Bond', 'Money Market']}
          rows={[
            { attribute: 'What you own', values: ['Piece of 1 company', 'Basket of assets', 'Basket of assets', 'Debt/loan', 'Short-term debt'] },
            { attribute: 'Trading', values: ['Real-time', 'Real-time', 'End of day', 'OTC or fund', 'Fund (daily)'] },
            { attribute: 'Diversification', values: ['None (1 company)', 'High', 'High', 'Varies', 'High'] },
            { attribute: 'Typical fees', values: ['Commission only', '0.03-0.50%', '0.50-1.50%', 'Varies', 'Very low'] },
            { attribute: 'Income', values: ['Dividends (maybe)', 'Passed through', 'Passed through', 'Coupon (regular)', 'Interest'] },
            { attribute: 'Volatility', values: ['High (single co.)', 'Medium (diversified)', 'Medium', 'Low-Medium', 'Very Low'] },
            { attribute: 'Risk of total loss', values: ['Possible', 'Extremely rare', 'Extremely rare', 'Low (gov) / Med (corp)', 'Near zero'] },
          ]}
        />
      </Subsection>

      <Subsection title="Return Types: What Generates Your Profit">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Dividends',
            content: 'Cash payments from companies to shareholders, usually quarterly. Funded by company profits.',
            details: 'Not all stocks pay dividends. Growth companies often reinvest all profits. Dividend yield = annual dividend / share price. A 3% dividend yield on a $100 stock means $3/year per share. Dividends are not free money — on the ex-dividend date, the stock price typically drops by the dividend amount.',
            color: 'green',
            tags: ['Stocks', 'ETFs'],
          },
          {
            title: 'Capital Gains',
            content: 'Profit from selling an asset for more than you paid. The primary way stocks and crypto generate returns.',
            details: 'Unrealized gains: the price went up but you haven\'t sold. Realized gains: you sold and locked in the profit. Capital gains can be short-term (held < 1 year) or long-term (held > 1 year), with different tax implications in most countries.',
            color: 'blue',
            tags: ['All Assets'],
          },
          {
            title: 'Coupon / Interest',
            content: 'Regular interest payments on bonds and money market instruments. The "rent" someone pays you for borrowing your money.',
            details: 'Bond coupon = fixed interest rate × face value, paid periodically. A 4% coupon on a $1,000 bond pays $40/year. Coupon rates are fixed at issuance for traditional bonds. The market price of the bond fluctuates, but the coupon payment stays the same.',
            color: 'purple',
            tags: ['Bonds', 'Money Market'],
          },
          {
            title: 'Total Return',
            content: 'Price appreciation + income (dividends, interest). The complete picture of how an investment performed.',
            details: 'Always think in total return. A stock that rises 5% and pays 3% dividend returned 8% total. A bond that drops 2% in price but paid 4% in coupons returned 2% total. Comparing assets by price change alone is incomplete and misleading.',
            color: 'orange',
            tags: ['Key Concept'],
          },
        ]} />
      </Subsection>

      <Subsection title="Active vs. Passive Investing">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-violet-200 bg-violet-50/50">
            <h4 className="font-semibold text-sm text-violet-800 mb-2">Passive (Index) Investing</h4>
            <ul className="space-y-1.5 text-sm text-violet-700">
              <li>• Track a market index (S&P 500, MSCI World)</li>
              <li>• Very low fees (0.03-0.20%)</li>
              <li>• No stock-picking or market timing</li>
              <li>• Beats most active managers over 10+ years</li>
              <li>• Boring, effective, and evidence-backed</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <h4 className="font-semibold text-sm text-amber-800 mb-2">Active Investing</h4>
            <ul className="space-y-1.5 text-sm text-amber-700">
              <li>• Manager tries to beat the index</li>
              <li>• Higher fees (0.50-1.50%+)</li>
              <li>• Requires skill, research, and judgment</li>
              <li>• ~85-90% of active funds underperform after fees over 15 years</li>
              <li>• Some consistently outperform, but identifying them in advance is hard</li>
            </ul>
          </div>
        </div>
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Dividend', definition: 'Cash payment from a company to shareholders, usually from profits.' },
          { term: 'Capital Gain', definition: 'Profit from selling an asset for more than you paid.' },
          { term: 'Coupon', definition: 'Periodic interest payment on a bond.' },
          { term: 'Total Return', definition: 'Price change + income. The complete measure of investment performance.' },
          { term: 'Yield', definition: 'Income generated relative to price. Dividend yield = annual dividend / current price.' },
          { term: 'Expense Ratio', definition: 'Annual fee charged by a fund as a percentage of assets. Lower is better.' },
          { term: 'Index', definition: 'A benchmark that represents a market (S&P 500, MSCI World). Index funds track these.' },
          { term: 'NAV', definition: 'Net Asset Value — the per-share value of a fund\'s holdings. Mutual funds trade at NAV; ETFs can trade at slight premiums or discounts.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'ETF', itemB: 'Mutual Fund', explanation: 'Both hold baskets of assets. ETFs trade in real-time on exchanges with low fees. Mutual funds trade once daily and often have higher fees. For most investors, ETFs are the more efficient choice.' },
          { itemA: 'Dividend', itemB: 'Capital Gain', explanation: 'Dividends are cash paid by the company to you. Capital gains are profit from price increase. A stock can give you both, either, or neither. Total return combines them.' },
          { itemA: 'Yield', itemB: 'Total Return', explanation: 'Yield is just the income component (dividends or coupons) relative to price. Total return includes price change. A high-yield investment can have negative total return if the price drops enough.' },
          { itemA: 'Bond', itemB: 'Money Market Fund', explanation: 'Both involve lending money. Bonds are specific loans with maturity dates and coupon rates. Money market funds hold pools of very short-term debt. Money market = ultra-stable, lower yield. Bonds = more variable, higher yield.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What is the key advantage of an ETF over an individual stock?', answer: 'Diversification. An ETF holds many assets (often hundreds or thousands) in one purchase, eliminating single-company risk. One stock can go to zero; a broad ETF effectively cannot.' },
          { question: 'Why does passive investing beat most active managers?', answer: 'Because of fees and consistency. Active managers charge more (0.5-1.5% vs 0.03-0.20%), and most fail to outperform the index after fees over long periods. The market is hard to beat consistently — you\'re competing against all other informed participants.' },
          { question: 'What is total return and why does it matter?', answer: 'Total return = price change + income (dividends, interest). It\'s the only complete measure of performance. Looking at price alone ignores income, which can be a significant portion of returns, especially for bonds and dividend stocks.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Stock', value: 'Ownership in one company. Growth potential, company-specific risk.' },
          { label: 'ETF', value: 'Diversified basket on an exchange. Low cost, core holding.' },
          { label: 'Mutual Fund', value: 'Similar to ETF but daily-priced, often higher fees.' },
          { label: 'Bond', value: 'Loan to gov/corp. Regular income (coupon). Rate-sensitive.' },
          { label: 'Money Market', value: 'Ultra-safe, short-term debt. Best cash parking option.' },
          { label: 'Total Return', value: 'Price change + income = the real picture.' },
          { label: 'Passive > Active', value: 'Index investing beats most stock-pickers over time.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
