import {
  SectionShell, SectionHeader, Subsection, Prose, InteractiveFlowMap,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section01() {
  return (
    <SectionShell id="section-1">
      <SectionHeader
        number={1}
        title="How Money, Wealth, and Investing Fit Together"
        subtitle="The complete picture of how income becomes capital, and how capital becomes long-term wealth."
      />

      {/* Big Picture */}
      <Subsection title="The System at a Glance">
        <Prose>
          <p>Most people think of investing as "buying stocks" or "picking the right crypto." But investing is actually the final stage of a much larger personal financial system. If you skip the earlier stages, the later ones break.</p>
          <p>Here's the real sequence. Click each step to understand what it does and why it matters.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            { id: 'income', label: 'Income', description: 'All money flowing in — salary, freelance, business, side income. This is the raw fuel. Without positive income, nothing else works. The goal: make this as robust and growing as possible.', color: 'green' },
            { id: 'expenses', label: 'Expenses', description: 'Everything that leaves — rent, food, transport, subscriptions, fun. Not evil, but must be intentional. The gap between income and expenses is what creates opportunity.', color: 'red' },
            { id: 'surplus', label: 'Surplus', description: 'Income minus expenses. This is the single most important number in personal finance. No surplus = no savings = no investing. Growing this gap is more reliable than picking great investments.', color: 'blue' },
            { id: 'reserve', label: 'Reserve', description: 'Your emergency fund and short-term buffer. This is not investment money. It is survival money. Without a proper reserve, any downturn forces you to sell investments at the worst time.', color: 'purple' },
            { id: 'capital', label: 'Capital', description: 'Money that has been set aside specifically for deploying into investments. This is surplus that has passed through the reserve filter and is now available for long-term allocation.', color: 'indigo' },
            { id: 'investment', label: 'Investment', description: 'Capital deployed into productive or appreciating assets: stocks, ETFs, bonds, real estate, crypto, gold. Each asset plays a different role and carries different risk.', color: 'teal' },
            { id: 'growth', label: 'Growth', description: 'Returns from your investments — dividends, interest, capital gains, compounding. Over time, growth on your investments becomes larger than the new capital you add. This is when wealth really accelerates.', color: 'green' },
            { id: 'networth', label: 'Net Worth', description: 'Everything you own minus everything you owe. This is the scoreboard — but only if measured over years, not days. Wealth is built through a repeating cycle of this entire flow.', color: 'orange' },
          ]}
        />
      </Subsection>

      {/* Why it Matters */}
      <Subsection title="Why This Matters in Real Life">
        <InfoCallout type="tip">
          Understanding this system prevents the most common mistake: jumping straight to investment decisions without having the financial base to sustain them. If you invest money you might need next month, you're building on sand.
        </InfoCallout>
        <Prose>
          <p>Many people who know a lot about Bitcoin or ETFs still have no emergency fund. Many people who follow markets daily have no idea what their actual surplus is. The system above isn't glamorous, but it's the reason some people build wealth while others just trade excitement.</p>
          <p>The sequence matters: earn → control spending → build a buffer → then allocate capital. Skip a step and the whole thing becomes fragile.</p>
        </Prose>
      </Subsection>

      {/* Expandable Deep Dive */}
      <Subsection title="Each Piece of the System">
        <ExpandableCardGrid cards={[
          {
            title: 'Income',
            subtitle: 'The starting fuel',
            content: 'Your total inflow from all sources. The foundation of everything.',
            details: 'Increasing income is often the highest-leverage financial move. It\'s not just about cutting expenses — growing income expands what\'s possible. Think salary growth, skill development, side income, career moves.',
            color: 'green',
            tags: ['Active', 'Passive', 'Earned'],
          },
          {
            title: 'Expenses',
            subtitle: 'The necessary outflow',
            content: 'Fixed costs, variable costs, and discretionary spending.',
            details: 'Not all expenses are bad. The key is intentionality. Fixed expenses (rent, insurance) are hard to change quickly. Variable expenses (food, transport) have flexibility. Discretionary spending (entertainment, impulse buys) is where most people leak money without noticing.',
            color: 'red',
            tags: ['Fixed', 'Variable', 'Discretionary'],
          },
          {
            title: 'Surplus',
            subtitle: 'The wealth-creation gap',
            content: 'Income minus expenses. The single most predictive number for building wealth.',
            details: 'Even a modest consistent surplus, invested wisely over decades, can build significant wealth. A high income with zero surplus builds nothing. The surplus is where discipline meets opportunity.',
            color: 'blue',
            tags: ['Savings Rate', 'Gap'],
          },
          {
            title: 'Reserve',
            subtitle: 'Your safety net',
            content: '3-6 months of expenses in highly liquid, low-risk form.',
            details: 'The reserve exists to absorb shocks — job loss, medical emergency, unexpected costs — without forcing you to sell investments. Without a reserve, you become a forced seller in exactly the conditions when prices are worst.',
            color: 'purple',
            tags: ['Emergency Fund', 'Liquidity'],
          },
          {
            title: 'Capital',
            subtitle: 'Deployable investable money',
            content: 'Money cleared for long-term deployment after reserve is full.',
            details: 'Capital is surplus that has survived the reserve filter. It represents money you genuinely do not need for at least several years. Only capital should be invested in volatile or illiquid assets.',
            color: 'indigo',
            tags: ['Investable', 'Long-term'],
          },
          {
            title: 'Net Worth',
            subtitle: 'The real scoreboard',
            content: 'Total assets minus total liabilities. Measured over years, not days.',
            details: 'Net worth includes everything: cash, investments, property, minus any debts. It\'s the only number that captures your full financial position. Track it quarterly or annually — never daily.',
            color: 'orange',
            tags: ['Assets – Liabilities'],
          },
        ]} />
      </Subsection>

      {/* Key Terms */}
      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'Income', definition: 'All money flowing into your life — salary, business, investments, side income.' },
          { term: 'Surplus', definition: 'Income minus expenses. The gap that creates all future wealth.' },
          { term: 'Emergency Reserve', definition: 'Liquid savings (3-6 months of expenses) that you never invest in risky assets.' },
          { term: 'Capital', definition: 'Money available for long-term investment after your reserve is fully funded.' },
          { term: 'Net Worth', definition: 'Total assets minus total liabilities. The true measure of financial position.' },
          { term: 'Optionality', definition: 'Having choices available. Cash and liquidity create optionality — the ability to act when opportunity appears.' },
          { term: 'Asset', definition: 'Anything you own that has economic value: cash, investments, property.' },
          { term: 'Liability', definition: 'Anything you owe: loans, credit card debt, mortgages.' },
        ]} />
      </Subsection>

      {/* Common Confusion */}
      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'High income', itemB: 'Wealth', explanation: 'Income is a flow; wealth is a stock. A person earning $200k with $200k in spending has zero wealth creation. A person earning $60k saving $15k/year is building faster.' },
          { itemA: 'Saving', itemB: 'Investing', explanation: 'Saving is setting money aside (usually in safe, liquid form). Investing is deploying money into assets for growth. You save first, then invest the surplus beyond your reserve.' },
          { itemA: 'Net worth', itemB: 'Cash in hand', explanation: 'Net worth includes illiquid assets like property and retirement accounts. Having high net worth doesn\'t mean you have cash available to spend.' },
        ]} />
      </Subsection>

      {/* Mini Recall */}
      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What is the correct sequence before you invest anything?', answer: 'Earn income → Control expenses → Build surplus → Fund emergency reserve → Then deploy capital into investments.' },
          { question: 'Why is the surplus the most important number?', answer: 'Because without a positive gap between income and expenses, there is nothing to save, reserve, or invest. The surplus is the engine of wealth.' },
          { question: 'Why do you need a reserve before investing?', answer: 'Without a reserve, any financial shock forces you to sell investments — often at the worst possible time. The reserve protects your investments from your life.' },
          { question: 'What is the difference between an asset and net worth?', answer: 'An asset is something you own. Net worth is total assets minus total liabilities. You can have many assets but still have low or negative net worth if you owe more.' },
        ]} />
      </Subsection>

      {/* Cheat Sheet */}
      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Income', value: 'All money in' },
          { label: 'Expenses', value: 'All money out (fixed + variable + discretionary)' },
          { label: 'Surplus', value: 'Income – Expenses = the wealth-creation engine' },
          { label: 'Reserve', value: '3-6 months of expenses, liquid & safe' },
          { label: 'Capital', value: 'Surplus beyond reserve, available for investment' },
          { label: 'Investing', value: 'Deploying capital into assets for growth' },
          { label: 'Net Worth', value: 'Assets – Liabilities = your true financial position' },
          { label: 'Core Principle', value: 'The system matters more than any single investment decision' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
