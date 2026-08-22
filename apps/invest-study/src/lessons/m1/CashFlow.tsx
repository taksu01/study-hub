import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { InteractiveFlowMap, ExpandableCardGrid, CompareTable } from '../../components/ui'

export default function CashFlow({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="cash-flow"
      subtitle="Cash flow, liquidity, and a real safety buffer are the base layer. Get them right and market crashes become survivable; get them wrong and even great investments turn fragile."
      onNavigate={onNavigate}
    >
      <LessonSection title="Not all money has the same job" icon="🧱">
        <P>
          The biggest base-layer mistake is treating all your money as <Strong>one pool</Strong>. In reality it
          sits in layers, and each layer has a different job, time horizon, and risk tolerance. Rent money and
          retirement money should never live in the same bucket.
        </P>
        <P>
          Most investing mistakes are actually <Strong>cash flow mistakes in disguise</Strong>. When someone
          panic-sells during a crash, the real problem usually isn't fear — it's that they invested money they
          actually needed.
        </P>
      </LessonSection>

      <LessonSection title="The four layers of your money" icon="🗂">
        <P><Strong>Click each layer</Strong> to see its job — money should only flow rightward once the layer before it is full:</P>
        <InteractiveFlowMap
          nodes={[
            { id: 'life-cash', label: 'Life Cash', description: 'Money for daily and monthly living — rent, food, bills, transport. This is your operating budget. It must be instantly accessible and never at risk. This is cash in your checking account.', color: 'green' },
            { id: 'emergency', label: 'Emergency Reserve', description: '3-6 months of essential expenses in a safe, liquid account. This exists to absorb shocks: job loss, health issues, unexpected bills. It is NOT investment money. It is insurance against being forced to sell assets at the worst time.', color: 'blue' },
            { id: 'investment-cash', label: 'Investment Cash', description: 'Surplus money set aside and ready to deploy into investments. This can sit in a money market fund or high-yield savings while you decide where to allocate it. It has already passed through your reserve — meaning your safety net is full.', color: 'purple' },
            { id: 'deployed', label: 'Deployed Investments', description: 'Money that has been actively invested in assets: stocks, ETFs, bonds, crypto, real estate, gold. This money is working for you, but it is exposed to market conditions and may not be instantly accessible at full value.', color: 'indigo' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Pay yourself first" icon="💸">
        <P>
          The classic failure mode is <Strong>investing whatever's left at month-end</Strong> — and there's never
          anything left. The fix reverses the order: the surplus moves out the moment income arrives, before
          lifestyle can absorb it.
        </P>
        <StepFlow
          steps={[
            { label: 'Income lands', detail: 'Salary or business income arrives in your checking account.' },
            { label: 'Surplus moves first — automatically', detail: 'A fixed transfer goes to savings/investing before any spending happens. Automation removes the willpower requirement.' },
            { label: 'Fill the emergency reserve', detail: 'Until you have 3–6 months of essential expenses in safe, liquid form, the transfer builds the reserve — not investments.' },
            { label: 'Then deploy capital', detail: 'Once the reserve is full, the same automatic transfer becomes investment cash, ready for long-term allocation.' },
            { label: 'Live on the rest', detail: 'Whatever remains is the spending budget. The saving already happened — there\'s nothing to "have discipline" about.' },
          ]}
        />
        <Callout type="warning" title="The one rule to remember">
          Never invest money you might need within 1–2 years. The market doesn't care about your timing — if a
          downturn and an emergency arrive together, money without a buffer behind it gets sold at the bottom.
        </Callout>
      </LessonSection>

      <LessonSection title="Know your outflows" icon="📊">
        <P>
          Cash flow awareness isn't budgeting for restriction — it's knowing your numbers well enough to invest
          confidently. Expenses come in three types with very different levers:
        </P>
        <CompareTable
          headers={['Fixed Expenses', 'Variable Expenses', 'Discretionary']}
          rows={[
            { attribute: 'Nature', values: ['Same every month', 'Fluctuate monthly', 'Fully optional'] },
            { attribute: 'Examples', values: ['Rent, insurance, loan payments', 'Groceries, utilities, fuel', 'Dining out, subscriptions, hobbies'] },
            { attribute: 'Control', values: ['Hard to change quickly', 'Some flexibility', 'Highly flexible'] },
            { attribute: 'Risk if cut', values: ['Contractual obligations', 'Quality of life impact', 'Lifestyle adjustment'] },
            { attribute: 'Priority', values: ['Must pay', 'Essential but adjustable', 'First area to optimize'] },
          ]}
        />
        <P>
          Your emergency reserve is sized on <Strong>essential expenses</Strong> (fixed + necessary variable), not
          your full lifestyle — which is why knowing the split matters.
        </P>
      </LessonSection>

      <LessonSection title="Liquidity — and the danger of ignoring it" icon="💧">
        <P>
          Liquidity is how fast an asset converts to cash <Strong>without losing value</Strong>. Every asset sits
          somewhere on the spectrum, and the failures happen at the extremes:
        </P>
        <ExpandableCardGrid
          columns={2}
          cards={[
            {
              title: 'Forced Selling',
              content: 'When you need cash and your money is locked in volatile investments, you must sell at whatever the market offers — often at a loss.',
              details: 'This is the #1 way retail investors destroy returns. They buy when excited, then sell when they need cash during a downturn. The investment wasn\'t bad — the cash flow planning was. Forced selling converts a temporary dip into a permanent loss.',
              color: 'red',
            },
            {
              title: 'Opportunity Cost of Over-Caution',
              content: 'Holding too much in cash means inflation slowly erodes your purchasing power year after year.',
              details: 'If inflation is 4% and your cash earns 1%, you\'re losing 3% of real value annually. The right balance: enough liquidity for safety, but not so much that it drags your wealth backward.',
              color: 'orange',
            },
            {
              title: 'Sinking Funds',
              content: 'Money set aside for planned future expenses that are not emergencies: vacations, car maintenance, annual insurance.',
              details: 'Sinking funds prevent "surprise" expenses from raiding your emergency fund or investments. They sit between life cash and the emergency reserve — planned, separate, and liquid.',
              color: 'blue',
            },
            {
              title: 'The Liquidity Spectrum',
              content: 'Every asset sits somewhere on a spectrum from instantly accessible to locked for years.',
              details: 'Cash: instant. Money market fund: 1–2 days. Stocks/ETFs: 1–3 days to settle. Real estate: weeks to months. Private investments: potentially years. Know where each asset sits before you commit.',
              color: 'purple',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Emergency fund',
              b: 'Investment cash',
              explanation:
                'The emergency fund is insurance — it should never sit in volatile assets. Investment cash is money cleared for risk. Mix them and your "investments" become your emergency fund, forcing sales at the worst possible time.',
            },
            {
              a: 'Being liquid',
              b: 'Being in cash',
              explanation:
                'Liquidity is about accessibility, not the account type. A money market fund is highly liquid and earns yield; a checking account is "cash" earning nothing. You can be liquid without sitting in zero-yield cash.',
            },
            {
              a: 'Surplus',
              b: 'Disposable income',
              explanation:
                'Disposable income is what\'s left after taxes. Surplus is what\'s left after ALL spending. High disposable income with a lifestyle that absorbs everything means zero surplus — and zero wealth creation.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Cash flow', definition: 'The movement of money in and out over a period. Positive cash flow means more comes in than goes out.' },
            { term: 'Liquidity', definition: 'How quickly and easily an asset converts to cash without significant loss of value.' },
            { term: 'Emergency fund', definition: '3–6 months of essential expenses in safe, liquid form. Not for investing, not for opportunities — only emergencies.' },
            { term: 'Sinking fund', definition: 'Money saved in advance for a known future expense — car repair, annual premium, planned purchase.' },
            { term: 'Forced selling', definition: 'Having to sell an investment because you need cash — usually at an unfavorable time and price.' },
            { term: 'Purchasing power', definition: 'What your money can actually buy. Inflation erodes it over time even when the dollar amount stays the same.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'An investor panic-sells their index fund during a crash to cover three months of rent after a job loss. What was the real mistake?',
              options: [
                'Choosing an index fund instead of individual stocks',
                'Not selling earlier, before the crash began',
                'Investing money without an emergency reserve behind it',
                'Renting instead of owning a home',
              ],
              correct: 2,
              explanation:
                'The investment was fine — the base layer was missing. With a 3–6 month reserve, the job loss would never have touched the portfolio. Most "investing mistakes" are cash flow mistakes in disguise.',
            },
            {
              question: 'What does "pay yourself first" actually mean?',
              options: [
                'Spend on what you enjoy before paying bills',
                'Move the surplus to savings/investing automatically when income arrives, then live on the rest',
                'Pay off all debt before saving anything',
                'Take your salary in cash before taxes',
              ],
              correct: 1,
              explanation:
                'Reversing the order removes the willpower problem. "Invest what\'s left after spending" reliably leaves nothing; "spend what\'s left after investing" makes the surplus automatic and untouchable.',
            },
            {
              question: 'Why is forced selling so destructive to long-term returns?',
              options: [
                'It triggers extra brokerage fees',
                'It locks in losses at market-determined prices, turning temporary dips into permanent damage',
                'It is illegal in most jurisdictions',
                'It only happens with high-risk assets like crypto',
              ],
              correct: 1,
              explanation:
                'Markets recover; a sold position doesn\'t. When you must sell, you take whatever price the market offers — usually during downturns, when prices are lowest. The loss becomes permanent and the recovery happens without you.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What are the four layers of your money?', answer: 'Life Cash (daily operating money) → Emergency Reserve (3–6 months of safety) → Investment Cash (ready to deploy) → Deployed Investments (money actively working in markets). Each fills only after the previous one is full.' },
            { question: 'Why is an emergency fund not optional before investing?', answer: 'Without it, any unexpected expense forces you to sell investments — usually during downturns when prices are lowest. The emergency fund protects your portfolio from your life.' },
            { question: 'What is forced selling and why is it so destructive?', answer: 'Forced selling is liquidating investments because you need cash, regardless of market conditions. It locks in losses and turns temporary dips into permanent damage — the market recovers, but without you.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Four layers', value: 'Life Cash → Emergency Reserve → Investment Cash → Deployed Investments.' },
          { label: 'Emergency reserve', value: '3–6 months of essential expenses, safe and liquid. Insurance, not investment.' },
          { label: 'Pay yourself first', value: 'Automate the surplus out on payday; live on the rest.' },
          { label: 'Key rule', value: 'Never invest money you might need within 1–2 years.' },
          { label: 'Biggest risk', value: 'Forced selling — poor cash flow planning sells your portfolio at the bottom.' },
          { label: 'Liquidity spectrum', value: 'Cash: instant · money market: days · stocks: days · property: months · private: years.' },
        ]}
      />
    </LessonLayout>
  )
}
