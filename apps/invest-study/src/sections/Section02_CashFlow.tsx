import {
  SectionShell, SectionHeader, Subsection, Prose, InteractiveFlowMap,
  ExpandableCardGrid, CompareTable, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section02() {
  return (
    <SectionShell id="section-2">
      <SectionHeader
        number={2}
        title="Control the Base Layer Before Reaching for Returns"
        subtitle="Cash flow, liquidity, and safety are the foundation. Without them, even the best investments become fragile."
      />

      <Subsection title="The Four Layers of Your Money">
        <Prose>
          <p>Not all money in your life serves the same purpose. The biggest mistake is treating all your money as one pool. In reality, your money sits in layers — and each layer has a different job, a different time horizon, and a different risk tolerance.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            { id: 'life-cash', label: 'Life Cash', description: 'Money for daily and monthly living — rent, food, bills, transport. This is your operating budget. It must be instantly accessible and never at risk. This is cash in your checking account.', color: 'green' },
            { id: 'emergency', label: 'Emergency Reserve', description: '3-6 months of essential expenses in a safe, liquid account. This exists to absorb shocks: job loss, health issues, unexpected bills. It is NOT investment money. It is insurance against being forced to sell assets at the worst time.', color: 'blue' },
            { id: 'investment-cash', label: 'Investment Cash', description: 'Surplus money set aside and ready to deploy into investments. This can sit in a money market fund or high-yield savings while you decide where to allocate it. It has already passed through your reserve — meaning your safety net is full.', color: 'purple' },
            { id: 'deployed', label: 'Deployed Investments', description: 'Money that has been actively invested in assets: stocks, ETFs, bonds, crypto, real estate, gold. This money is working for you, but it is exposed to market conditions and may not be instantly accessible at full value.', color: 'indigo' },
          ]}
        />
      </Subsection>

      <Subsection title="Why Cash Flow Awareness Matters">
        <InfoCallout type="warning">
          Most investing mistakes are actually cash flow mistakes in disguise. When someone panic-sells during a crash, the real problem usually isn't fear — it's that they invested money they actually needed.
        </InfoCallout>
        <Prose>
          <p>If you don't know your real monthly cash flow — what comes in, what goes out, and what's truly left — you're flying blind. You might invest money you'll need in three months, or hold too much in cash while your purchasing power erodes.</p>
          <p>Cash flow awareness is not budgeting for the sake of restriction. It's knowing your numbers so you can make confident investment decisions without risking your stability.</p>
        </Prose>
      </Subsection>

      <Subsection title="Fixed vs. Variable vs. Discretionary">
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
      </Subsection>

      <Subsection title="The Danger of Illiquidity">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Forced Selling',
            content: 'When you need cash and your money is locked in volatile investments, you must sell at whatever the market offers — often at a loss.',
            details: 'This is the #1 way retail investors destroy returns. They buy when excited, then sell when they need cash during a downturn. The investment wasn\'t bad — the cash flow planning was.',
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
            details: 'Sinking funds prevent "surprise" expenses from raiding your emergency fund or investments. They sit between life cash and emergency reserve — planned, separate, and liquid.',
            color: 'blue',
          },
          {
            title: 'The Liquidity Spectrum',
            content: 'Every asset sits somewhere on a liquidity spectrum from instantly accessible to locked for years.',
            details: 'Cash: instant. Money market fund: 1-2 days. Stocks/ETFs: 1-3 days. Real estate: weeks to months. Private investments: potentially years. Know where each asset sits before you commit.',
            color: 'purple',
          },
        ]} />
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Cash Flow', definition: 'The movement of money in and out of your life over a period. Positive cash flow means more comes in than goes out.' },
          { term: 'Liquidity', definition: 'How quickly and easily an asset can be converted to cash without significant loss of value.' },
          { term: 'Emergency Fund', definition: '3-6 months of essential expenses in safe, liquid form. Not for investing, not for opportunities — only for emergencies.' },
          { term: 'Sinking Fund', definition: 'Money saved in advance for a known future expense (car repair, annual premium, planned purchase).' },
          { term: 'Forced Selling', definition: 'Having to sell an investment because you need cash — usually at an unfavorable time and price.' },
          { term: 'Purchasing Power', definition: 'What your money can actually buy. Inflation erodes purchasing power over time even if the dollar amount stays the same.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Emergency fund', itemB: 'Investment cash', explanation: 'Your emergency fund is insurance — it should never be in volatile assets. Investment cash is money cleared for risk. Mixing them means your "investments" become your emergency fund, forcing sales at the worst time.' },
          { itemA: 'Being liquid', itemB: 'Being in cash', explanation: 'Liquidity is about accessibility. A money market fund is highly liquid but earns some yield. Being "in cash" often means a checking account earning nothing. You can be liquid without sitting in zero-yield cash.' },
          { itemA: 'Surplus', itemB: 'Disposable income', explanation: 'Disposable income is income after taxes. Surplus is what\'s left after ALL spending. You can have high disposable income and zero surplus if your lifestyle absorbs everything.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What are the four layers of your money?', answer: 'Life Cash (daily operating money) → Emergency Reserve (3-6 months of safety) → Investment Cash (ready to deploy) → Deployed Investments (money actively working in markets).' },
          { question: 'Why is an emergency fund not optional before investing?', answer: 'Without it, any unexpected expense forces you to sell investments — usually during downturns when prices are lowest. The emergency fund protects your portfolio from your life.' },
          { question: 'What is forced selling and why is it so destructive?', answer: 'Forced selling is when you must liquidate investments because you need cash, regardless of market conditions. It locks in losses and turns temporary dips into permanent damage.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Life Cash', value: 'Checking account for bills and daily life' },
          { label: 'Emergency Reserve', value: '3-6 months essential expenses, safe & liquid' },
          { label: 'Investment Cash', value: 'Surplus beyond reserve, awaiting deployment' },
          { label: 'Deployed Capital', value: 'Money actively invested in markets' },
          { label: 'Key Rule', value: 'Never invest money you might need within 1-2 years' },
          { label: 'Biggest Risk', value: 'Forced selling due to poor cash flow planning' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
