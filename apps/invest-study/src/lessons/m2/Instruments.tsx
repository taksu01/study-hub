import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { CompareTable, ExpandableCardGrid } from '../../components/ui'

export default function Instruments({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="instruments"
      subtitle="Asset classes are categories; instruments are what you actually buy. Stocks, ETFs, mutual funds, bonds, money market — how each works, what it costs, and why fees compound against you."
      onNavigate={onNavigate}
    >
      <LessonSection title="The thing you actually buy" icon="🧾">
        <P>
          "Stocks" is a category. <Strong>An instrument is the specific security in your brokerage account</Strong> —
          one share of a company, one unit of an ETF, one bond. The same asset class can be reached through very
          different instruments, and the choice of wrapper changes your diversification, your fees, and your risk of
          total loss.
        </P>
        <P>
          The single biggest fork in the road: <Strong>individual securities vs. funds</Strong>. Buy one stock and
          you own one company's fate. Buy a fund and you own hundreds or thousands of securities in a single
          purchase — one holding can no longer sink you.
        </P>
      </LessonSection>

      <LessonSection title="The five core instruments" icon="🧰">
        <P>Tap each card for the mechanics — what it is, how it pays, and where it bites:</P>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Individual Stock',
            subtitle: 'A slice of one company',
            content: 'A share of ownership in a single business. You participate in its profits, growth — and its failures.',
            details: 'You earn through price appreciation and dividends. The risk is company-specific: one business can lose market share, underperform, or go bankrupt — a single stock can go to zero. Owning individual stocks requires both conviction and understanding.',
            color: 'indigo',
            tags: ['No diversification', 'Real-time trading'],
          },
          {
            title: 'ETF',
            subtitle: 'A basket that trades like a stock',
            content: 'A fund holding many assets (stocks, bonds, gold…) that trades on an exchange all day at market prices.',
            details: 'Instant diversification: one S&P 500 ETF = 500 companies; one global ETF = thousands. Index ETFs charge very low fees (0.03–0.20% annually). A single global equity ETF plus a bond ETF can form a complete, diversified portfolio — most investors need surprisingly few positions.',
            color: 'purple',
            tags: ['Diversified', 'Low cost', 'Core holding'],
          },
          {
            title: 'Mutual Fund',
            subtitle: 'The older pooled wrapper',
            content: 'A professionally managed pool; investors buy units priced once per day at NAV, not throughout the day.',
            details: 'Functionally similar to an ETF — a basket of assets — but priced end-of-day and often with higher fees, especially when actively managed (0.50–1.50%+). Passive index mutual funds are the exception: they track an index cheaply, like index ETFs in a different wrapper. Common in retirement accounts where ETFs aren\'t offered.',
            color: 'blue',
            tags: ['Daily pricing', 'Watch the fees'],
          },
          {
            title: 'Bond',
            subtitle: 'A loan with a schedule',
            content: 'You lend to a government or corporation; they pay regular interest (the coupon) and return principal at maturity.',
            details: 'You earn coupon payments plus possible price gains if rates fall. Risks: interest rate risk (prices fall when rates rise), credit risk (default), inflation risk (fixed payments lose purchasing power). Ranges from ultra-safe Treasuries to high-yield "junk" — plus inflation-protected variants (TIPS).',
            color: 'teal',
            tags: ['Coupon income', 'Rate-sensitive'],
          },
          {
            title: 'Money Market Fund',
            subtitle: 'Cash that earns something',
            content: 'A fund holding very short-term, high-quality debt (T-bills, commercial paper). Behaves like a high-yield savings account.',
            details: 'Interest income, extremely stable principal, near-zero risk — though not technically guaranteed like bank deposits. The natural home for emergency reserves and cash waiting to be deployed: liquid, but not idle.',
            color: 'green',
            tags: ['Near-zero risk', 'Cash parking'],
          },
        ]} />
      </LessonSection>

      <LessonSection title="Side by side" icon="📊">
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
      </LessonSection>

      <LessonSection title="Fees: the silent compounder" icon="🧨">
        <P>
          The expense ratio looks harmless — "just 1%." But fees are subtracted <Strong>every year, from the whole
          balance</Strong>, so they compound exactly like returns do, in reverse. Run the numbers on $100,000
          growing at 7% for 30 years:
        </P>
        <P>
          At a <Strong>0.05% index-fund fee</Strong>, the portfolio ends near <Strong>$750,000</Strong>. At a{' '}
          <Strong>1% active-fund fee</Strong>, the same market return ends near <Strong>$574,000</Strong>. That
          "just 1%" quietly consumed roughly <Strong>$176,000</Strong> — about a quarter of the final wealth —
          without a single bad market day.
        </P>
        <Callout type="warning" title="The one thing to remember">
          Fees are the only part of investing you control with certainty. Returns are a hope; the expense ratio is a
          contract. Over decades, a 1% annual fee can consume a quarter or more of your final wealth — check it
          before anything else.
        </Callout>
      </LessonSection>

      <LessonSection title="Active vs. passive" icon="🎯">
        <P>
          A fund is <Strong>passive</Strong> if it simply tracks an index (S&amp;P 500, MSCI World) and{' '}
          <Strong>active</Strong> if a manager tries to beat it. The evidence is lopsided: roughly{' '}
          <Strong>85–90% of active funds underperform their index after fees over 15 years</Strong>. Some managers do
          outperform — but identifying them in advance is the hard part.
        </P>
        <CompareTable
          headers={['Passive (Index)', 'Active']}
          rows={[
            { attribute: 'Goal', values: ['Match the market index', 'Beat the market index'] },
            { attribute: 'Typical fees', values: ['0.03–0.20%', '0.50–1.50%+'] },
            { attribute: 'Skill required', values: ['None — no picking, no timing', 'Research, judgment, and luck'] },
            { attribute: 'Long-run result', values: ['Beats most active managers over 10+ years', '~85–90% underperform after fees over 15 years'] },
            { attribute: 'Character', values: ['Boring, effective, evidence-backed', 'Exciting, expensive, usually disappointing'] },
          ]}
        />
        <NowBox asOf="2025">
          <p>
            Broad index funds have become nearly free to own — expense ratios on major index ETFs sit at a few basis
            points (around 0.03–0.20% per year). Passive index investing has grown from a niche idea into the
            mainstream default, while the long-run evidence has held: most active funds still trail their benchmark
            after fees.
          </p>
        </NowBox>
      </LessonSection>

      <LessonSection title="What actually pays you" icon="💸">
        <P>Whatever the instrument, profit arrives through a small set of channels — and only their sum tells the truth:</P>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Dividends',
            content: 'Cash payments from company profits to shareholders, usually quarterly.',
            details: 'Not all stocks pay them — growth companies often reinvest everything. Dividend yield = annual dividend / share price. And dividends aren\'t free money: on the ex-dividend date the stock price typically drops by the dividend amount.',
            color: 'green',
            tags: ['Stocks', 'ETFs'],
          },
          {
            title: 'Capital Gains',
            content: 'Profit from selling for more than you paid — the primary return channel for stocks and crypto.',
            details: 'Unrealized: the price rose but you haven\'t sold. Realized: you sold and locked it in. Most countries tax short-term (< 1 year) and long-term (> 1 year) gains differently.',
            color: 'blue',
            tags: ['All assets'],
          },
          {
            title: 'Coupon / Interest',
            content: 'Regular interest on bonds and money market instruments — rent paid for borrowing your money.',
            details: 'A 4% coupon on a $1,000 bond pays $40/year, fixed at issuance. The bond\'s market price fluctuates, but the coupon payment stays the same.',
            color: 'purple',
            tags: ['Bonds', 'Money market'],
          },
          {
            title: 'Total Return',
            content: 'Price change + income. The only complete measure of performance.',
            details: 'A stock up 5% paying a 3% dividend returned 8%. A bond down 2% in price paying 4% in coupons returned +2%. Comparing assets by price change alone is incomplete and misleading — always think in total return.',
            color: 'orange',
            tags: ['Key concept'],
          },
        ]} />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'ETF',
              b: 'Mutual fund',
              explanation:
                'Both hold baskets of assets. ETFs trade in real time on exchanges, usually with lower fees. Mutual funds price once daily at NAV and often cost more, especially when actively managed. For most investors, ETFs are the more efficient wrapper.',
            },
            {
              a: 'Index fund',
              b: 'ETF',
              explanation:
                '"Index" is a strategy (passively track a benchmark); "ETF" is a wrapper (trades on an exchange). An index fund can be an ETF or a mutual fund — and an ETF can be passive or active. The cheap, diversified workhorse most investors mean is the index ETF: both at once.',
            },
            {
              a: 'Yield',
              b: 'Total return',
              explanation:
                'Yield is only the income component (dividends or coupons) relative to price. Total return adds price change. A high-yield investment can still have a negative total return if its price falls enough — chasing yield alone is a classic trap.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Expense ratio', definition: 'The annual fee a fund charges as a percentage of assets. Compounds against you every year — lower is better.' },
            { term: 'Index', definition: 'A benchmark representing a market (S&P 500, MSCI World). Index funds track these passively.' },
            { term: 'NAV', definition: 'Net Asset Value — the per-share value of a fund\'s holdings. Mutual funds trade at NAV; ETFs can trade at slight premiums or discounts.' },
            { term: 'Coupon', definition: 'The periodic interest payment on a bond, fixed at issuance.' },
            { term: 'Yield', definition: 'Income relative to price — e.g., dividend yield = annual dividend / current price. Income only, not the full picture.' },
            { term: 'Total return', definition: 'Price change + income. The complete measure of how an investment actually performed.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What is the key advantage of a broad ETF over an individual stock?',
              options: [
                'ETFs are guaranteed by the government',
                'ETFs always rise faster than any single stock',
                'One purchase spreads risk across hundreds of companies — no single failure can take it to zero',
                'ETFs pay higher dividends than stocks',
              ],
              correct: 2,
              explanation:
                'The advantage is diversification, not performance magic. A single stock can go bankrupt; a broad ETF holding hundreds or thousands of companies effectively cannot. You give up lottery-ticket upside in exchange for removing single-company ruin.',
            },
            {
              question: 'Two funds track the same index and earn the same 7% gross return for 30 years on $100,000. Fund A charges 0.05%; Fund B charges 1%. Roughly how do they end up?',
              options: [
                'Nearly identical — 1% is too small to matter',
                'Fund B ends about $176,000 behind — the fee compounds against the whole balance every year',
                'Fund B ends about $300 behind — 1% of the original $30,000 in gains',
                'Fund A ends behind, because cheaper funds track indexes less accurately',
              ],
              correct: 1,
              explanation:
                'Fees subtract from the compounding base every single year, so their cost compounds too: ~$750,000 vs. ~$574,000. A "small" 1% fee consumed roughly a quarter of the final wealth. This is why the expense ratio is the first number to check on any fund.',
            },
            {
              question: 'Why does passive index investing beat most active managers over long periods?',
              options: [
                'Index funds have access to better information than managers',
                'Active managers are legally barred from holding index stocks',
                'Markets only go up, so any strategy works equally well',
                'Active funds charge much higher fees, and most fail to out-pick the market by enough to cover them',
              ],
              correct: 3,
              explanation:
                'Beating the market means out-trading all other informed participants — hard even before costs. Add a 0.50–1.50% annual fee hurdle and roughly 85–90% of active funds trail their index after 15 years. The few persistent winners are nearly impossible to identify in advance.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What is the key advantage of an ETF over an individual stock?', answer: 'Diversification. An ETF holds many assets — often hundreds or thousands — in one purchase, eliminating single-company risk. One stock can go to zero; a broad ETF effectively cannot.' },
            { question: 'Why does passive investing beat most active managers?', answer: 'Fees and consistency. Active managers charge 0.50–1.50% vs. 0.03–0.20% for index funds, and most fail to outperform after fees over long periods — beating the market means out-trading every other informed participant, year after year.' },
            { question: 'What is total return and why does it matter?', answer: 'Total return = price change + income (dividends, interest). It\'s the only complete measure of performance. Price alone ignores income, which can be a large share of returns — especially for bonds and dividend stocks.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Stock', value: 'Ownership in one company. Upside potential, single-company risk.' },
          { label: 'ETF', value: 'Diversified basket on an exchange. Low cost, core holding.' },
          { label: 'Mutual fund', value: 'Similar basket, daily-priced, often higher fees.' },
          { label: 'Bond / Money market', value: 'Loans: coupon income and rate risk vs. ultra-safe cash parking.' },
          { label: 'Fees', value: 'Expense ratios compound against you — 1%/yr can eat ~25% of final wealth over 30 years.' },
          { label: 'Passive > active', value: 'Index funds beat ~85–90% of active managers after fees over 15 years.' },
        ]}
      />
    </LessonLayout>
  )
}
