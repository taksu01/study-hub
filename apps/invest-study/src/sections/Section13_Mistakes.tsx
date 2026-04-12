import {
  SectionShell, SectionHeader, Subsection, Prose, MistakeCard,
  MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'
import type { MistakeEntry } from '../types'

const mistakes: MistakeEntry[] = [
  {
    title: 'Investing without a liquidity buffer',
    whyItHappens: 'Eagerness to get money "working" and reluctance to leave cash idle. Feels wasteful to have money sitting in savings when the market is running.',
    whatItLooksLike: 'All savings invested, no emergency fund. First unexpected expense forces selling investments at whatever the market offers. Losses compound because the timing is almost always bad.',
    whatToDoInstead: 'Fund 3-6 months of expenses in cash/money market BEFORE investing any surplus. This reserve protects your portfolio from your life. It\'s not idle — it\'s insurance.',
  },
  {
    title: 'Confusing conviction with understanding',
    whyItHappens: 'Following an asset closely for months creates the feeling of deep understanding. Reading bullish content reinforces the impression. Enthusiasm and knowledge feel the same.',
    whatItLooksLike: '"I just KNOW this is going up" but can\'t explain the bear case, can\'t describe the valuation, and doesn\'t have a plan for a 50% drawdown.',
    whatToDoInstead: 'Test your conviction: write down 3 reasons you could be wrong. If you can\'t, your "conviction" is just unexamined enthusiasm. Real understanding includes understanding what could go wrong.',
  },
  {
    title: 'Over-concentrating in one asset or narrative',
    whyItHappens: 'One asset has performed well for you, so you keep adding more. The narrative feels obviously true. Diversification feels like dilution of your "best idea."',
    whatItLooksLike: '70%+ of portfolio in one stock, sector, or crypto token. Massive gains in bull markets, devastating losses in downturns. A single bad event can set you back years.',
    whatToDoInstead: 'Cap any single position at a size where a total loss is survivable and a 50% drawdown doesn\'t change your life. For most people, this means no single position above 10-20%.',
  },
  {
    title: 'Confusing price action with value',
    whyItHappens: 'Rising prices feel like validation. "The market is agreeing with me!" Falling prices feel like danger. The brain equates price movement with fundamental quality.',
    whatItLooksLike: 'Buying more as prices rise because it "proves the thesis." Selling as prices fall because it "proves it was wrong." This is literally buying high and selling low.',
    whatToDoInstead: 'Evaluate based on fundamentals, not recent price movement. A stock at $100 is neither better nor worse than at $80 — it depends on what the business is worth. Use valuation, not momentum, as your guide.',
  },
  {
    title: 'Investing money you need soon',
    whyItHappens: 'The opportunity cost of holding cash feels painful when markets are rising. "I\'ll just invest this down payment money for a few months."',
    whatItLooksLike: 'Putting near-term money (needed within 1-3 years) into stocks or crypto. A 30% dip wipes out down payment savings. Now either delay the purchase or sell at a loss.',
    whatToDoInstead: 'Money needed within 3 years: cash or money market only. No exceptions. The potential upside is never worth the risk of not having the money when you actually need it.',
  },
  {
    title: 'Reacting to every macro headline',
    whyItHappens: 'Financial media profits from urgency. Every datapoint becomes "BREAKING." Your brain is wired to respond to perceived threats.',
    whatItLooksLike: 'Selling after bad jobs data. Buying after a Fed speech. Changing allocation monthly based on headlines. Portfolio churns, returns suffer from fees and bad timing.',
    whatToDoInstead: 'Check your portfolio quarterly, not daily. Make allocation changes only when your LIFE changes (new job, baby, retirement approaching) or at predefined rebalancing intervals.',
  },
  {
    title: 'Copying others blindly',
    whyItHappens: 'Social proof is powerful. If someone you admire is buying something, it feels like validated information. Influencer portfolios look public and successful.',
    whatItLooksLike: 'Buying what Twitter/YouTube personalities are buying without understanding why, without knowing their position size, risk tolerance, or time horizon. Their 2% fun money might be your 30% life savings.',
    whatToDoInstead: 'Use others\' ideas as research leads, not investment decisions. Before buying anything, articulate YOUR thesis in YOUR situation. If you can\'t explain why you own it, you shouldn\'t own it.',
  },
  {
    title: 'Buying without a clear asset role',
    whyItHappens: 'Something seems interesting or promising, so you buy some. No thought about what role it plays in the portfolio or how it interacts with other holdings.',
    whatItLooksLike: 'A portfolio that\'s a random collection of things that seemed good at the time. No coherent strategy. Overlapping exposures. No clear reason for any position.',
    whatToDoInstead: 'Before any purchase, answer: What role does this play? Growth? Stability? Hedge? Asymmetric bet? How much should I allocate? What would make me sell? If you can\'t answer these, don\'t buy.',
  },
  {
    title: 'Mixing investing with speculation without realizing it',
    whyItHappens: 'The line between investing and speculating is blurry. Both involve buying assets. But investing is deploying capital with a thesis and time horizon; speculation is betting on short-term price movement.',
    whatItLooksLike: 'Telling yourself you\'re a "long-term investor" in an altcoin you\'d sell in a week if it doubled. Or "investing" in a meme stock for the rush. Self-deception about true motivation.',
    whatToDoInstead: 'Be honest about what\'s investing and what\'s speculation. Speculation isn\'t wrong — it\'s fine in small amounts (1-5% of portfolio). But label it honestly and size it accordingly.',
  },
  {
    title: 'Not understanding why you own something',
    whyItHappens: 'Bought it months ago for reasons you\'ve forgotten. Or bought on a recommendation without forming your own view. It just sits in the portfolio, unexamined.',
    whatItLooksLike: 'You can\'t explain what this position is, why you own it, or what would make you sell it. When it drops 30%, you have no framework for deciding whether to hold, add, or sell.',
    whatToDoInstead: 'For every position, maintain a simple "investment thesis": what it is, why you own it, what role it plays, and what would invalidate your thesis. Review periodically.',
  },
]

export default function Section13() {
  return (
    <SectionShell id="section-13">
      <SectionHeader
        number={13}
        title="What New and Fragmented Investors Commonly Get Wrong"
        subtitle="These are the most common mistakes that turn reasonable people into poor investors. Recognizing them is the first step to avoiding them."
      />

      <Subsection title="The Pattern">
        <Prose>
          <p>Most investing mistakes are not about picking the wrong stock or buying at the wrong time. They're about structural errors: wrong position sizes, money that shouldn't be invested at all, no clear thesis, no process, and emotional decision-making dressed up as rationality.</p>
          <p>Click each mistake to understand why it happens, what it looks like, and what to do instead.</p>
        </Prose>
      </Subsection>

      <Subsection title="The Ten Common Mistakes">
        <div className="space-y-3">
          {mistakes.map((m, i) => (
            <MistakeCard key={i} mistake={m} />
          ))}
        </div>
      </Subsection>

      <Subsection title="The Meta-Lesson">
        <InfoCallout type="tip">
          The common thread in all these mistakes: they are not about bad analysis. They are about bad structure. The fix is almost always a process, not more information. An investor with a simple, clear process will outperform a brilliant analyst with no discipline.
        </InfoCallout>
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What\'s the difference between conviction and overconfidence?', answer: 'Conviction includes understanding the bear case and having a plan for adverse outcomes. Overconfidence is enthusiasm that hasn\'t been stress-tested. Test: can you articulate 3 reasons you could be wrong?' },
          { question: 'Why is "copying others" dangerous even when they\'re smart?', answer: 'Because you don\'t know their full context — their position size, total portfolio, risk capacity, time horizon, or exit plan. Their 2% speculative position might be your 30% life savings.' },
          { question: 'What\'s the key question to ask before any purchase?', answer: 'What role does this play in my portfolio, and why do I own it? If you can\'t answer clearly, don\'t buy. Every position should have a defined purpose, size, and exit criteria.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'Rule #1', value: 'Never invest without a funded emergency reserve' },
          { label: 'Rule #2', value: 'No position should be larger than a survivable loss' },
          { label: 'Rule #3', value: 'If you can\'t explain why you own it, sell it' },
          { label: 'Rule #4', value: 'Short-term money goes in cash, period' },
          { label: 'Rule #5', value: 'Process beats information. Build systems, not opinions.' },
          { label: 'Rule #6', value: 'Be honest about what\'s investing vs. speculation' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
