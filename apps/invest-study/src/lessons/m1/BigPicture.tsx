import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { InteractiveFlowMap, ExpandableCardGrid, CompareTable } from '../../components/ui'

export default function BigPicture({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="big-picture"
      subtitle="Investing isn't 'picking stocks' — it's the final stage of a money system. See the whole machine first, and every later lesson snaps into place."
      onNavigate={onNavigate}
    >
      <LessonSection title="Investing is a stage, not a starting point" icon="🗺">
        <P>
          Most people think investing means "buying stocks" or "picking the right crypto." It's actually the{' '}
          <Strong>last stage of a larger system</Strong>: income flows in, expenses flow out, and the gap between
          them — the surplus — is the raw material for everything else. Skip the earlier stages and the later ones break.
        </P>
        <P>
          And what is investing itself? <Strong>Buying future cash flows</Strong>. A stock is a slice of a
          business's future profits; a bond is a stream of interest payments; a rental property is rent. You trade
          money today for a productive asset that pays you back over time.
        </P>
      </LessonSection>

      <LessonSection title="The money system" icon="⚙️">
        <P>
          Here's the full pipeline from paycheck to net worth. <Strong>Click each step</Strong> to see its job and
          why the order matters:
        </P>
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
        <Callout type="tip" title="The one thing to remember">
          The sequence is the strategy: earn → control spending → build a buffer → then deploy capital. Plenty of
          people who follow markets daily have no emergency fund and no idea what their surplus is. The system
          isn't glamorous — it's just the reason some people build wealth while others trade excitement.
        </Callout>
      </LessonSection>

      <LessonSection title="Each piece, up close" icon="🧩">
        <P>Expand any card for the deeper mechanics of each stage:</P>
        <ExpandableCardGrid
          columns={2}
          cards={[
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
              details: 'Not all expenses are bad. The key is intentionality. Fixed expenses (rent, insurance) are hard to change quickly. Variable expenses (food, transport) have flexibility. Discretionary spending is where most people leak money without noticing.',
              color: 'red',
              tags: ['Fixed', 'Variable', 'Discretionary'],
            },
            {
              title: 'Surplus',
              subtitle: 'The wealth-creation gap',
              content: 'Income minus expenses. The single most predictive number for building wealth.',
              details: 'Even a modest consistent surplus, invested wisely over decades, can build significant wealth. A high income with zero surplus builds nothing. The surplus is where discipline meets opportunity.',
              color: 'blue',
              tags: ['Savings rate', 'Gap'],
            },
            {
              title: 'Reserve',
              subtitle: 'Your safety net',
              content: '3–6 months of expenses in highly liquid, low-risk form.',
              details: 'The reserve absorbs shocks — job loss, medical emergency, surprise costs — without forcing you to sell investments. Without one, you become a forced seller in exactly the conditions when prices are worst.',
              color: 'purple',
              tags: ['Emergency fund', 'Liquidity'],
            },
            {
              title: 'Capital',
              subtitle: 'Deployable investable money',
              content: 'Money cleared for long-term deployment after the reserve is full.',
              details: 'Capital is surplus that has survived the reserve filter. It represents money you genuinely do not need for at least several years. Only capital should go into volatile or illiquid assets.',
              color: 'indigo',
              tags: ['Investable', 'Long-term'],
            },
            {
              title: 'Net Worth',
              subtitle: 'The real scoreboard',
              content: 'Total assets minus total liabilities. Measured over years, not days.',
              details: 'Net worth includes everything: cash, investments, property, minus any debts. It\'s the only number that captures your full financial position. Track it quarterly or annually — never daily.',
              color: 'orange',
              tags: ['Assets − Liabilities'],
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Investing vs. everything that looks like it" icon="🎯">
        <P>
          Four activities all involve "putting money somewhere," and they get confused constantly. What separates
          them is <Strong>where the returns come from</Strong> and <Strong>who has the edge</Strong>:
        </P>
        <CompareTable
          headers={['Saving', 'Investing', 'Trading', 'Gambling']}
          rows={[
            { attribute: 'Goal', values: ['Preserve money, stay liquid', 'Grow wealth over years', 'Profit from short-term price moves', 'Entertainment (with money at stake)'] },
            { attribute: 'Return source', values: ['Interest on deposits', 'Productive assets: profits, rent, interest', 'Other traders being wrong faster', 'Pure chance — the house has the edge'] },
            { attribute: 'Time horizon', values: ['Days to a few years', '5+ years, ideally decades', 'Minutes to months', 'Seconds'] },
            { attribute: 'Expected outcome', values: ['Positive but small; lags inflation', 'Positive — economies and businesses grow', 'Zero-sum before costs; negative after', 'Negative by design'] },
            { attribute: 'Skill vs. luck', values: ['No skill needed', 'Patience and discipline dominate', 'Competing with professionals', 'Luck only'] },
          ]}
        />
        <P>
          The key distinction: an investor owns something that <Strong>produces value while they sleep</Strong>.
          A trader profits only if someone else misprices; a gambler pays for the thrill. Buying an asset with no
          cash flows purely because "someone will pay more later" is speculation — closer to trading than investing,
          whatever the asset is called.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'High income',
              b: 'Wealth',
              explanation:
                'Income is a flow; wealth is a stock. A person earning $200k and spending $200k creates zero wealth. A person earning $60k and saving $15k/year is building faster. The surplus, not the salary, is the engine.',
            },
            {
              a: 'Saving',
              b: 'Investing',
              explanation:
                'Saving sets money aside in safe, liquid form — it protects. Investing deploys money into productive assets for growth — it compounds. You save first (reserve), then invest the surplus beyond it. Different jobs, different money.',
            },
            {
              a: 'Net worth',
              b: 'Cash in hand',
              explanation:
                'Net worth includes illiquid assets like property and retirement accounts. Someone can be "worth" a lot on paper and still be unable to cover next month\'s rent. High net worth does not mean spendable cash.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Surplus', definition: 'Income minus expenses. The gap that creates all future wealth — no surplus, nothing to invest.' },
            { term: 'Emergency reserve', definition: 'Liquid savings (3–6 months of expenses) that never goes into risky assets. Survival money, not investment money.' },
            { term: 'Capital', definition: 'Money available for long-term investment after the reserve is fully funded — money you won\'t need for years.' },
            { term: 'Productive asset', definition: 'Something you own that generates value over time: business profits, rent, interest. The core of what investing buys.' },
            { term: 'Net worth', definition: 'Total assets minus total liabilities. The true scoreboard — measured over years, not days.' },
            { term: 'Liability', definition: 'Anything you owe: loans, credit card debt, mortgages. Subtracts directly from net worth.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What is the single most important number in personal finance, according to the money system?',
              options: [
                'Your total income — the more you earn, the wealthier you become',
                'Your surplus — income minus expenses',
                'Your investment returns — they do the heavy lifting',
                'Your credit score — it determines what you can borrow',
              ],
              correct: 1,
              explanation:
                'No surplus means nothing to save, reserve, or invest — regardless of income. A high earner who spends everything builds nothing, while a modest earner with a consistent surplus compounds year after year.',
            },
            {
              question: 'Fundamentally, what does an investor buy?',
              options: [
                'Ticker symbols they hope will go up',
                'A claim on future cash flows from a productive asset',
                'Protection against inflation',
                'Whatever assets are trending upward',
              ],
              correct: 1,
              explanation:
                'A stock is a slice of future business profits; a bond is a stream of interest; property is rent. "Hoping the price goes up" without any underlying cash flow is speculation — the price can only rise if someone else pays more.',
            },
            {
              question: 'Why must the emergency reserve come before deploying capital into investments?',
              options: [
                'Because reserves earn higher interest than investments',
                'Because it\'s illegal to invest without savings',
                'Because without a buffer, any shock forces you to sell investments at the worst time',
                'Because investments are only available to people with savings accounts',
              ],
              correct: 2,
              explanation:
                'The reserve absorbs life\'s shocks so your investments never have to. Without it, a job loss or medical bill turns you into a forced seller — usually during a downturn, when prices are lowest.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What is the correct sequence before you invest anything?', answer: 'Earn income → control expenses → build surplus → fund the emergency reserve → then deploy capital into investments. Skip a step and the whole structure becomes fragile.' },
            { question: 'What separates investing from trading and gambling?', answer: 'Investing buys productive assets whose future cash flows (profits, rent, interest) create returns over years. Trading tries to profit from short-term price moves — zero-sum before costs. Gambling has a negative expected outcome by design.' },
            { question: 'Why do you need a reserve before investing?', answer: 'Without a reserve, any financial shock forces you to sell investments — often at the worst possible time. The reserve protects your investments from your life.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The system', value: 'Income → Expenses → Surplus → Reserve → Capital → Investment → Growth → Net Worth.' },
          { label: 'Key number', value: 'Surplus = income − expenses. The engine of all wealth creation.' },
          { label: 'Investing is', value: 'Buying future cash flows from productive assets — profits, rent, interest.' },
          { label: 'Not investing', value: 'Saving preserves; trading is zero-sum speculation; gambling loses by design.' },
          { label: 'Reserve first', value: '3–6 months of expenses, liquid and safe, before any capital is deployed.' },
          { label: 'Scoreboard', value: 'Net worth = assets − liabilities. Track over years, never days.' },
        ]}
      />
    </LessonLayout>
  )
}
