import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { MistakeCard } from '../../components/ui'

const MISTAKES = [
  {
    title: 'Investing without a liquidity buffer',
    whyItHappens:
      'Eagerness to get money "working" and reluctance to leave cash idle. It feels wasteful to hold savings while the market is running.',
    whatItLooksLike:
      'All savings invested, no emergency fund. The first unexpected expense forces selling investments at whatever the market offers — and the timing is almost always bad.',
    whatToDoInstead:
      'Fund 3–6 months of expenses in cash or money market BEFORE investing any surplus. The reserve protects the portfolio from life. It isn\'t idle — it\'s insurance.',
  },
  {
    title: 'Confusing conviction with understanding',
    whyItHappens:
      'Following an asset for months creates the feeling of deep understanding. Reading bullish content reinforces it. Enthusiasm and knowledge feel identical from the inside.',
    whatItLooksLike:
      '"I just KNOW this is going up" — but no bear case, no sense of the valuation, and no plan for a 50% drawdown.',
    whatToDoInstead:
      'Test the conviction: write down three reasons it could be wrong. If that\'s impossible, the "conviction" is unexamined enthusiasm. Real understanding includes what could go wrong.',
  },
  {
    title: 'Over-concentrating in one asset or narrative',
    whyItHappens:
      'One asset performed well, so more keeps getting added. The narrative feels obviously true, and diversification feels like diluting the "best idea."',
    whatItLooksLike:
      '70%+ of the portfolio in one stock, sector, or token. Massive gains in bull markets, devastating losses in downturns. One bad event sets everything back years.',
    whatToDoInstead:
      'Cap any single position at a size where total loss is survivable and a 50% drawdown changes nothing about your life. For most people that means no position above 10–20%.',
  },
  {
    title: 'Confusing price action with value (performance chasing)',
    whyItHappens:
      'Rising prices feel like validation — "the market agrees with me!" Falling prices feel like danger. The brain equates price movement with fundamental quality.',
    whatItLooksLike:
      'Buying more as prices rise because it "proves the thesis," selling as they fall because it "proves it was wrong." That is literally buying high and selling low.',
    whatToDoInstead:
      'Evaluate on fundamentals, not recent movement. A stock at $100 is neither better nor worse than at $80 — it depends on what the business is worth. Valuation, not momentum, is the guide.',
  },
  {
    title: 'Investing money needed soon',
    whyItHappens:
      'Holding cash feels expensive when markets are rising. "I\'ll just invest the down-payment money for a few months."',
    whatItLooksLike:
      'Near-term money (needed within 1–3 years) in stocks or crypto. A 30% dip wipes out the savings — now it\'s delay the purchase or sell at a loss.',
    whatToDoInstead:
      'Money needed within ~3 years belongs in cash or money market. No exceptions. The potential upside is never worth not having the money when it\'s actually needed.',
  },
  {
    title: 'Reacting to every macro headline (overtrading)',
    whyItHappens:
      'Financial media profits from urgency — every datapoint becomes "BREAKING." The brain is wired to respond to perceived threats.',
    whatItLooksLike:
      'Selling after bad jobs data, buying after a Fed speech, reshuffling the allocation monthly. The portfolio churns; returns bleed away through fees, taxes, and bad timing.',
    whatToDoInstead:
      'Review quarterly, not daily. Change allocation only when LIFE changes (new job, baby, retirement approaching) or at predefined rebalancing dates.',
  },
  {
    title: 'Copying others blindly',
    whyItHappens:
      'Social proof is powerful. If someone admired is buying, it feels like validated information — influencer portfolios look public and successful.',
    whatItLooksLike:
      'Buying what personalities are buying without knowing their position size, risk tolerance, or exit plan. Their 2% fun money becomes someone else\'s 30% life savings.',
    whatToDoInstead:
      'Treat others\' ideas as research leads, not decisions. Before buying, articulate YOUR thesis in YOUR situation. No explanation for owning it means it shouldn\'t be owned.',
  },
  {
    title: 'Buying without a clear asset role (no plan)',
    whyItHappens:
      'Something seems promising, so a little gets bought — with no thought about what job it does in the portfolio or how it interacts with everything else.',
    whatItLooksLike:
      'A portfolio that\'s a random collection of things that seemed good at the time: overlapping exposures, no coherent strategy, no clear reason for any position.',
    whatToDoInstead:
      'Before any purchase, answer: What role does this play — growth, stability, hedge, asymmetric bet? How much? What would trigger a sell? No answers, no purchase.',
  },
  {
    title: 'Mixing investing with speculation without realizing it',
    whyItHappens:
      'The line is blurry — both involve buying assets. But investing is deploying capital with a thesis and a time horizon; speculation is betting on short-term price movement.',
    whatItLooksLike:
      'Calling yourself a "long-term investor" in an altcoin you\'d dump in a week if it doubled. Or "investing" in a meme stock for the rush. Self-deception about the real motivation.',
    whatToDoInstead:
      'Label honestly. Speculation isn\'t forbidden — small amounts (1–5% of a portfolio) are fine. But name it what it is and size it accordingly.',
  },
  {
    title: 'Not understanding why you own something',
    whyItHappens:
      'Bought months ago for forgotten reasons, or on a recommendation without forming a view. It just sits there, unexamined.',
    whatItLooksLike:
      'Unable to explain what a position is, why it\'s owned, or what would trigger selling. When it drops 30%, there\'s no framework for hold, add, or sell.',
    whatToDoInstead:
      'Keep a one-paragraph thesis per position: what it is, why it\'s owned, what role it plays, and what would invalidate it. Review periodically.',
  },
]

export default function Mistakes({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="mistakes"
      subtitle="The classic catalogue of investor self-sabotage — and the pattern behind it: almost every mistake is structural, not analytical. The fix is a process, not more information."
      onNavigate={onNavigate}
    >
      <LessonSection title="The pattern behind the mistakes" icon="🔍">
        <P>
          Most investing mistakes aren't about picking the wrong stock or mistiming a trade. They're{' '}
          <Strong>structural errors</Strong>: positions sized wrong, money invested that shouldn't be, no thesis,
          no plan, and emotional decisions dressed up as analysis.
        </P>
        <P>
          That's actually good news. Structural errors have structural fixes —{' '}
          <Strong>a simple, clear process beats a brilliant analyst with no discipline</Strong>, and a process is
          something anyone can build.
        </P>
      </LessonSection>

      <LessonSection title="The ten classic mistakes" icon="⚠️">
        <P>
          Open each one. For every mistake: why the brain produces it, what it looks like in a real portfolio, and
          the structural fix.
        </P>
        <div className="space-y-3">
          {MISTAKES.map((m, i) => (
            <MistakeCard key={i} mistake={m} />
          ))}
        </div>
        <Callout type="tip" title="The meta-lesson">
          None of these are analysis failures — they're structure failures. Chasing performance, timing headlines,
          overtrading, skipping the reserve: each one is fixed by a rule made in advance, not by getting smarter or
          reading more. Build systems, not opinions.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Investing',
              b: 'Speculation',
              explanation:
                'Investing deploys capital with a thesis and a multi-year horizon. Speculation bets on short-term price movement. Both are legitimate — the danger is mislabeling: calling a one-week momentum bet "long-term investing" leads to sizing it like one.',
            },
            {
              a: 'A rising price',
              b: 'A validated thesis',
              explanation:
                'Price movement is the market\'s mood; value is what the business is worth. Buying more because it went up and selling because it went down is momentum-following disguised as analysis — literally buying high and selling low.',
            },
            {
              a: 'An idle emergency fund',
              b: 'Wasted money',
              explanation:
                'The reserve\'s job is not to earn returns — it\'s to stop life from forcing the portfolio to sell at the worst moment. Its "cost" (missed gains) is the insurance premium that keeps compounding uninterrupted.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Emergency reserve', definition: '3–6 months of expenses in safe, liquid form. Funded before any investing — it protects the portfolio from life\'s surprises.' },
            { term: 'Position sizing', definition: 'How much of the portfolio a single holding gets. Size determines whether being wrong is a lesson or a catastrophe.' },
            { term: 'Investment thesis', definition: 'A written statement of what a position is, why it\'s owned, its role, and what would invalidate it.' },
            { term: 'Performance chasing', definition: 'Buying assets because they recently rose — mistaking price action for validation, and usually arriving after the gains.' },
            { term: 'Overtrading', definition: 'Frequent buying and selling driven by headlines or emotion. Bleeds returns through fees, taxes, and bad timing.' },
            { term: 'Speculation', definition: 'Betting on short-term price movement rather than long-term value. Fine in small, honestly-labeled amounts.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'An investor puts their house down-payment fund (needed in 18 months) into stocks "to not waste time." What\'s the core error?',
              options: [
                'They picked stocks instead of ETFs',
                'They should have waited for a market dip to enter',
                'Time-horizon mismatch — money needed within ~3 years can\'t absorb a normal drawdown',
                'Nothing, as long as the market has been rising',
              ],
              correct: 2,
              explanation:
                'A 30% dip is a normal event for stocks, and 18 months is not enough time to reliably recover from one. Near-term money belongs in cash or money market — the potential upside never justifies not having the money when it\'s needed.',
            },
            {
              question: 'Why is copying a smart influencer\'s trades still dangerous?',
              options: [
                'Influencers are always wrong about markets',
                'You don\'t know their position size, risk capacity, horizon, or exit plan — their 2% fun money may be your 30% life savings',
                'It\'s illegal to copy other people\'s portfolios',
                'Their trades are delayed, so the prices are always worse',
              ],
              correct: 1,
              explanation:
                'The idea itself might be fine — the missing information is context. Without knowing their sizing, total portfolio, and exit criteria, you\'re copying the visible half of a decision. Use others\' ideas as research leads, then build your own thesis.',
            },
            {
              question: 'A holding drops 30% and the owner has no idea whether to hold, add, or sell. What was the actual mistake?',
              options: [
                'Not setting a stop-loss order at purchase',
                'Buying without a written thesis — no defined role, size logic, or invalidation criteria',
                'Failing to predict the drop from macro data',
                'Checking the portfolio too rarely to react in time',
              ],
              correct: 1,
              explanation:
                'The confusion at −30% is a symptom; the mistake happened at purchase. A position bought with a clear thesis has a built-in framework: has the thesis broken, or just the price? Without one, every drawdown becomes a coin flip driven by emotion.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What\'s the difference between conviction and overconfidence?', answer: 'Conviction includes understanding the bear case and having a plan for adverse outcomes. Overconfidence is enthusiasm that hasn\'t been stress-tested. The test: can you articulate three reasons you could be wrong?' },
            { question: 'Why is copying others dangerous even when they\'re smart?', answer: 'You don\'t know their full context — position size, total portfolio, risk capacity, time horizon, or exit plan. Their 2% speculative position might be your 30% life savings.' },
            { question: 'What\'s the key question to ask before any purchase?', answer: 'What role does this play in my portfolio, and why do I own it? If there\'s no clear answer, don\'t buy. Every position needs a defined purpose, size, and exit criteria.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Rule #1', value: 'Never invest without a funded emergency reserve.' },
          { label: 'Rule #2', value: 'No position larger than a survivable loss (typically 10–20% max).' },
          { label: 'Rule #3', value: 'If you can\'t explain why you own it, don\'t own it.' },
          { label: 'Rule #4', value: 'Money needed within ~3 years stays in cash. Period.' },
          { label: 'Rule #5', value: 'Process beats information — build systems, not opinions.' },
          { label: 'Rule #6', value: 'Label investing vs speculation honestly, and size each accordingly.' },
        ]}
      />
    </LessonLayout>
  )
}
