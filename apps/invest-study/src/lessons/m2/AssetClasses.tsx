import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { AssetRoleCards, CompareTable } from '../../components/ui'

export default function AssetClasses({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="asset-classes"
      subtitle="Every investable dollar lives in a bucket — cash, bonds, stocks, real estate, gold, crypto. Each has its own return driver, risk profile, and job. None of them is 'the best.'"
      onNavigate={onNavigate}
    >
      <LessonSection title="The asset class map" icon="🗺">
        <P>
          An asset class is a category of investments that share a <Strong>return driver</Strong> — the underlying
          reason the thing can be worth more later. Stocks earn because businesses generate profits. Bonds earn
          because borrowers pay interest. Real estate earns rent. Gold and bitcoin earn nothing — their value rests
          on scarcity and what others will pay.
        </P>
        <P>
          That last distinction is the most important one on this page: <Strong>productive assets generate cash
          flows; store-of-value assets don't</Strong>. Both can belong in a portfolio, but they work through
          completely different mechanisms — and they behave differently under stress.
        </P>
      </LessonSection>

      <LessonSection title="The major classes and their jobs" icon="🧱">
        <P>Tap each class to see its role, strengths, and weaknesses:</P>
        <AssetRoleCards
          assets={[
            {
              name: 'Cash & Equivalents',
              role: 'The stability anchor — safety, liquidity, optionality. It preserves your ability to act, not your purchasing power.',
              strengths: ['Near-zero volatility', 'Instant liquidity', 'Protects against forced selling'],
              weaknesses: ['Loses to inflation over time', 'Near-zero real return', 'Idle excess cash is a drag'],
              color: 'green',
            },
            {
              name: 'Bonds / Fixed Income',
              role: 'The stability + income layer — loans to governments or companies that pay interest and return principal at maturity.',
              strengths: ['Predictable coupon income', 'Government bonds often rise when stocks fall', 'Dampens portfolio volatility'],
              weaknesses: ['Prices fall when rates rise (duration risk)', 'Credit risk on corporate/junk bonds', 'Fixed payments lose to inflation'],
              color: 'blue',
            },
            {
              name: 'Stocks / Equities',
              role: 'The growth engine — ownership in real businesses. Historically the best-returning liquid asset class (~7–10% annually after inflation over long periods).',
              strengths: ['Productive: profits + dividends', 'Strongest long-term compounding', 'Highly liquid via exchanges'],
              weaknesses: ['Volatile short-term', 'Single companies can go to zero', 'Drops first in a crisis'],
              color: 'indigo',
            },
            {
              name: 'Gold',
              role: 'The ancient defensive hedge — non-productive, valued for scarcity and millennia of monetary history.',
              strengths: ['Crisis and inflation hedge', 'Low long-run correlation with stocks', 'Central banks hold it as a reserve'],
              weaknesses: ['No income — no dividends, no interest', 'Long stagnant stretches', 'Value rests purely on demand'],
              color: 'orange',
            },
            {
              name: 'Real Estate',
              role: 'Tangible income + appreciation — physical property or REITs, often bought with mortgage leverage.',
              strengths: ['Rental income', 'Rents tend to rise with inflation', 'REITs offer liquid exposure'],
              weaknesses: ['Illiquid with high transaction costs', 'Geographically concentrated', 'Leverage amplifies losses too'],
              color: 'teal',
            },
            {
              name: 'Crypto (BTC)',
              role: 'The high-volatility asymmetric bet — decentralized, scarce (21M cap), viewed by some as digital gold. Not a monolith: BTC, ETH, and random tokens differ enormously.',
              strengths: ['Asymmetric upside potential', 'Scarce and globally tradeable', 'Hedge thesis against monetary debasement'],
              weaknesses: ['50–80% drawdowns are normal cycle behavior', 'Non-productive; short track record', 'Regulatory and technical risk'],
              color: 'slate',
            },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          No single asset class is "the best." Each is a tool with a job: stocks for growth, bonds for stability and
          income, cash for optionality, gold for crisis, real estate for income, crypto for a sized asymmetric bet.
          Portfolio construction is assigning those jobs deliberately.
        </Callout>
      </LessonSection>

      <LessonSection title="Side by side" icon="📊">
        <P>
          The same five classes, compared on the dimensions that matter. Notice how <Strong>strengths and weaknesses
          trade off</Strong> — nothing scores well everywhere:
        </P>
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
        <P>
          One deliberate omission: <Strong>ETFs and index funds are not an asset class</Strong> — they're vehicles
          that hold asset classes. An S&amp;P 500 ETF is stocks; a bond ETF is bonds. The next lesson covers vehicles
          in depth.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Productive assets',
              b: 'Store-of-value assets',
              explanation:
                'Stocks and bonds are productive — they generate earnings, dividends, and interest. Gold and BTC are non-productive — their value depends on what others will pay, not on cash flows. Both have portfolio roles, but they work through different mechanisms.',
            },
            {
              a: 'Asset class',
              b: 'Investment vehicle',
              explanation:
                '"Stocks" is an asset class. "An S&P 500 ETF" is a vehicle that gives you access to that class. The same class can be reached through different vehicles — ETFs, mutual funds, or individual securities.',
            },
            {
              a: 'Gold',
              b: 'Crypto',
              explanation:
                'Both are non-productive and both get called stores of value — but gold has millennia of history and moderate volatility, while BTC has about 15 years and extreme volatility (50–80% drawdowns are normal). Similar thesis, very different risk profile.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Asset class', definition: 'A category of investments sharing similar characteristics and market behavior — stocks, bonds, cash, real estate, gold, crypto.' },
            { term: 'Productive asset', definition: 'An asset that generates output: businesses produce profits, bonds pay interest, property earns rent. Gold and BTC are non-productive.' },
            { term: 'Store of value', definition: 'An asset expected to hold purchasing power over time. Gold is the traditional example; BTC is a debated modern candidate.' },
            { term: 'REIT', definition: 'Real Estate Investment Trust — a company that owns and operates property, traded on stock exchanges. Liquid real estate exposure.' },
            { term: 'Money market fund', definition: 'A low-risk fund holding short-term, high-quality debt. Nearly as safe as cash, slightly better yield, daily liquidity.' },
            { term: 'Duration', definition: 'A bond\'s sensitivity to interest rate changes. Longer duration = bigger price moves when rates change.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What fundamentally separates stocks from gold as investments?',
              options: [
                'Stocks are riskier than gold in every situation',
                'Stocks are productive — businesses generate profits; gold earns nothing and relies on scarcity and demand',
                'Gold is more liquid than stocks',
                'Stocks hedge inflation and gold doesn\'t',
              ],
              correct: 1,
              explanation:
                'Stocks represent businesses producing goods and services — their value is fed by cash flows. Gold produces no income; its value comes from scarcity, history, and what buyers will pay. Different mechanisms, different portfolio jobs.',
            },
            {
              question: 'Why do investors hold cash even though it reliably loses to inflation?',
              options: [
                'Because cash occasionally outperforms stocks over decades',
                'Because banks guarantee a real return above inflation',
                'For liquidity and optionality — it prevents forced selling and funds emergencies and opportunities',
                'Because cash is a productive asset',
              ],
              correct: 2,
              explanation:
                'Cash\'s job is safety, not growth. It protects the rest of the portfolio from forced selling and preserves the ability to act. The inflation loss is the price of that optionality — which is why you hold enough, not extra.',
            },
            {
              question: 'Government bonds are often called a good diversifier for a stock portfolio. Why?',
              options: [
                'They return more than stocks over long periods',
                'They typically hold steady or rise when stocks fall, smoothing the portfolio',
                'They are immune to interest rate changes',
                'They compound faster during bull markets',
              ],
              correct: 1,
              explanation:
                'The diversification value is low correlation: in many stock selloffs, government bonds hold or gain. They return less than stocks long-term and they DO fall when rates rise — the pairing works because of behavior under stress, not raw return.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Which asset class has historically been the strongest long-term wealth builder?', answer: 'Equities. Diversified stock portfolios have returned roughly 7–10% annually after inflation over long periods — more than bonds, gold, or cash — because they represent productive businesses.' },
            { question: 'Why hold cash even though it loses to inflation?', answer: 'Liquidity and optionality. Cash protects against forced selling, covers emergencies, and lets you act on opportunities. Its role is safety, not growth.' },
            { question: 'What is the key difference between an asset class and a vehicle?', answer: 'A class is a category (stocks, bonds); a vehicle is the wrapper you buy to access it (an ETF, a mutual fund, an individual security). The same class can be held through many vehicles.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Cash', value: 'Safety and optionality. Low return, instant liquidity.' },
          { label: 'Bonds', value: 'Stability and income. Rate-sensitive; classic stock diversifier.' },
          { label: 'Stocks', value: 'Growth engine. Productive, volatile, best long-term return.' },
          { label: 'Gold', value: 'Defensive hedge. Non-productive store of value; often rises in crisis.' },
          { label: 'Real estate / Crypto', value: 'Income + leverage vs. asymmetric volatility. Size both carefully.' },
          { label: 'Key insight', value: 'No class is best — each has a return driver and a job.' },
        ]}
      />
    </LessonLayout>
  )
}
