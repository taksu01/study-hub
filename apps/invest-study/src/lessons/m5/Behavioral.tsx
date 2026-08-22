import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import { ExpandableCardGrid, CompareTable } from '../../components/ui'

export default function Behavioral({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="behavioral"
      subtitle="The biggest threat to a portfolio isn't the market — it's the person holding it. Learn to name the biases, and build systems that work when your brain doesn't."
      onNavigate={onNavigate}
    >
      <LessonSection title="The enemy in the mirror" icon="🪞">
        <P>
          The biggest risk to a portfolio is not the economy, the Fed, or a bad stock pick. It's{' '}
          <Strong>the investor's own brain</Strong>. Humans evolved for survival, not for rational capital
          allocation — the instincts that kept us alive (fear of loss, following the herd, pattern-spotting)
          produce systematic investing errors.
        </P>
        <P>
          Behavioral finance catalogues those errors. That matters because{' '}
          <Strong>a bias you can name loses most of its power</Strong>. You can't stop feeling FOMO in a mania —
          but you can recognize it as FOMO and let a pre-written plan decide instead.
        </P>
      </LessonSection>

      <LessonSection title="The trap catalogue" icon="🕳">
        <P>
          Tap each card. For every trap, notice the same shape: an emotional reaction that{' '}
          <Strong>feels rational in the moment</Strong> but destroys returns over time.
        </P>
        <ExpandableCardGrid
          columns={2}
          cards={[
            {
              title: 'FOMO (Fear of Missing Out)',
              subtitle: 'The urge to jump in because everyone else is profiting',
              content: 'When an asset is surging and everyone is talking about it, FOMO says buy NOW or miss out forever.',
              details:
                'FOMO peaks at exactly the worst time to buy — near the top of a run. By the time an investment is universally exciting, most of the easy gains are captured. The cure: have a plan BEFORE the excitement. DCA schedules and predefined allocation targets make FOMO irrelevant.',
              color: 'red',
              tags: ['Peak euphoria', 'Herding'],
            },
            {
              title: 'Panic selling',
              subtitle: 'Selling in fear during drawdowns',
              content: 'When markets crash, panic says sell everything. This converts temporary drawdowns into permanent losses.',
              details:
                'Panic selling is the single most destructive investor behavior — every major recovery leaves behind the people who sold at the bottom. Wanting to sell everything in a crash usually means the position was too big to begin with. The fix is preemptive: only invest what can be left alone for 5+ years.',
              color: 'orange',
              tags: ['Drawdowns', 'Flight response'],
            },
            {
              title: 'Recency bias',
              subtitle: 'Assuming recent trends continue forever',
              content: 'After a long bull market, up feels permanent. After a crash, down feels permanent. Neither is.',
              details:
                'Recency bias extrapolates the last quarter into the next decade. It\'s why investors pile into assets that already rose (performance chasing) and dump assets that just fell (selling low). Markets are cyclical; recent history is a poor predictor of what comes next.',
              color: 'blue',
              tags: ['Extrapolation'],
            },
            {
              title: 'Overconfidence',
              subtitle: 'Believing you know more than you do',
              content: 'A few good trades create the illusion of skill. Knowledge of one asset creates false confidence in all of them.',
              details:
                'Overconfidence produces concentrated positions ("I\'m sure about this"), excessive trading ("I can time this"), and ignored risks ("that won\'t happen to me"). It\'s most dangerous when early success in one domain — say, crypto in a bull run — feels like generalized market mastery.',
              color: 'purple',
              tags: ['Illusion of control'],
            },
            {
              title: 'Confirmation bias',
              subtitle: 'Only hearing what agrees with you',
              content: 'Once invested, the brain filters information to confirm the decision and dismiss contradictions.',
              details:
                'Confirmation bias builds echo chambers: follow people who agree, dismiss bad news as "FUD," read ambiguity as support. The antidote is deliberate: seek the best arguments AGAINST each position. An investor who can\'t articulate the bear case doesn\'t understand the investment.',
              color: 'indigo',
              tags: ['Echo chambers'],
            },
            {
              title: 'Loss aversion',
              subtitle: 'Losses hurt ~2× more than gains feel good',
              content: 'The pain of losing $1,000 is roughly twice as intense as the pleasure of gaining $1,000.',
              details:
                'Loss aversion makes investors hold losers too long (waiting to "break even"), sell winners too early (locking in gains before they "evaporate"), and avoid sensible risk entirely. It optimizes for short-term emotional comfort at the cost of long-term returns.',
              color: 'red',
              tags: ['Asymmetric psychology'],
            },
            {
              title: 'Anchoring',
              subtitle: 'Fixating on a reference price',
              content: 'Purchase price, all-time high, an analyst target — any number seen becomes a mental anchor that distorts judgment.',
              details:
                '"I\'ll sell when it gets back to what I paid." "It used to be $100, so $70 is cheap." The market doesn\'t know or care what anyone paid. The only relevant question is forward-looking: given current fundamentals and price, is this a good investment from here?',
              color: 'orange',
              tags: ['Reference-point distortion'],
            },
            {
              title: 'Narrative addiction',
              subtitle: 'Stories beating data',
              content: 'A compelling story feels more convincing than dry numbers — even when the numbers disagree.',
              details:
                '"AI will change everything" is more gripping than "a P/E of 45 with 15% growth implies mediocre returns." Narratives are useful context but dangerous when they replace valuation discipline. Always ask: is this story already priced in?',
              color: 'teal',
              tags: ['Stories vs data'],
            },
            {
              title: 'Doom paralysis',
              subtitle: 'So focused on risk you never invest',
              content: 'There is always a reason to wait — recession fears, elections, all-time highs. Paralysis keeps money in cash forever.',
              details:
                'Markets have survived world wars, pandemics, and financial crises — and trended upward over long periods anyway. Waiting for the "perfect" moment means missing decades of compounding. For long-horizon money, the bigger risk is usually inaction.',
              color: 'slate',
              tags: ['Analysis paralysis'],
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Process beats emotion" icon="🤖">
        <P>
          The fix is not to eliminate emotion — that's impossible. It's to{' '}
          <Strong>make good decisions automatic</Strong> so emotion never gets a vote. Compare the two operating
          modes:
        </P>
        <CompareTable
          headers={['Process-driven investor', 'Emotion-driven investor']}
          rows={[
            { attribute: 'Buying', values: ['Automatic monthly contributions (DCA) into predefined targets', 'Buys whatever is trending on social media, sized by excitement'] },
            { attribute: 'Selling', values: ['Pre-committed rules — e.g. "I will not sell during a 30% drop"', 'Sells when headlines are scary, near the bottom'] },
            { attribute: 'Monitoring', values: ['Deliberate information diet; checks quarterly', 'Checks prices multiple times a day, reacts to noise'] },
            { attribute: 'Strategy', values: ['Written investment policy, scheduled rebalancing dates', 'Changes strategy after every drawdown; follows influencers\' trades'] },
          ]}
        />
        <Callout type="tip" title="The one thing to remember">
          The best investment process is one that works when you're not thinking clearly. Markets will scare
          you — that's guaranteed. Build the system now, while calm, so it can protect you later, when you're not.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Conviction',
              b: 'Overconfidence',
              explanation:
                'Conviction comes from understanding both the bull AND bear case. Overconfidence comes from only seeing the upside. The test: can you state the three strongest arguments against your position? If not, it\'s overconfidence wearing conviction\'s clothes.',
            },
            {
              a: 'Patience',
              b: 'Stubbornness',
              explanation:
                'Patience is holding through normal volatility because the thesis is intact — it requires no new information. Stubbornness is refusing to sell after the thesis has broken — it ignores new information. Same behavior on the outside, opposite logic on the inside.',
            },
            {
              a: 'Being informed',
              b: 'Over-monitoring',
              explanation:
                'Being informed means understanding your portfolio\'s strategy and macro context. Over-monitoring means checking prices hourly and reacting to every headline. The first improves decisions; the second actively degrades them — more data, worse behavior.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'FOMO', definition: 'Fear of Missing Out — the urge to buy because everyone else is. Typically strongest near market tops.' },
            { term: 'Loss aversion', definition: 'Losses feel roughly twice as intense as equivalent gains. Causes holding losers too long and selling winners too early.' },
            { term: 'Recency bias', definition: 'Overweighting recent events when predicting the future — the engine behind trend-chasing and bottom-selling.' },
            { term: 'Confirmation bias', definition: 'Seeking information that confirms existing beliefs while dismissing contradictory evidence.' },
            { term: 'Anchoring', definition: 'Fixating on a reference number (purchase price, all-time high) that distorts forward-looking evaluation.' },
            { term: 'Narrative fallacy', definition: 'Letting a compelling story replace quantitative analysis in an investment decision.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'An investor refuses to sell a losing stock until it "gets back to what I paid." Which bias is driving this?',
              options: [
                'Recency bias — extrapolating the recent decline',
                'Anchoring plus loss aversion — the purchase price is an irrelevant reference point',
                'FOMO — fear of missing the rebound',
                'Confirmation bias — filtering out bad news',
              ],
              correct: 1,
              explanation:
                'The market doesn\'t know what anyone paid. Anchoring makes the purchase price feel meaningful, and loss aversion makes realizing the loss feel unbearable. The rational question is forward-looking: is this a good investment from today\'s price?',
            },
            {
              question: 'Why does FOMO tend to strike at exactly the worst time to buy?',
              options: [
                'Because prices are random, so any time is equally bad',
                'Because brokers raise fees during rallies',
                'Because universal excitement means most of the easy gains have already been captured',
                'Because FOMO only affects inexperienced investors',
              ],
              correct: 2,
              explanation:
                'FOMO is fueled by visible gains that already happened. By the time an asset is what everyone talks about, the crowd has bid the price up — the excitement peaks near the top, which is precisely when new buyers are most eager.',
            },
            {
              question: 'What is the most reliable defense against behavioral traps?',
              options: [
                'Stronger willpower and staying calm under pressure',
                'Following more market news to stay ahead of moves',
                'Only investing in assets you feel strong conviction about',
                'Pre-built processes — DCA, written rules, scheduled rebalancing — that decide for you',
              ],
              correct: 3,
              explanation:
                'Willpower fails under stress: in a crash, fear chemistry overrides rational thinking. Processes work regardless of emotional state — the decision was already made while calm. That\'s the entire point of systems and automation.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why is panic selling so destructive?', answer: 'It converts temporary drawdowns (which recover) into permanent losses (which don\'t). Every major recovery was missed by those who sold at the bottom. The cure is preemptive: size positions so drawdowns are survivable.' },
            { question: 'How do you fight confirmation bias?', answer: 'Actively seek the best arguments against your positions. Read the bear case, follow people who disagree. If you can\'t articulate strong counterarguments to your thesis, you\'re in an echo chamber.' },
            { question: 'Why are processes better than willpower?', answer: 'Willpower fails under stress — during a crash the brain is flooded with fear hormones that override rational thinking. Processes (DCA, rebalancing schedules, written rules) execute automatically regardless of emotional state.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The real enemy', value: 'Not the market — the investor\'s own instincts. Naming a bias defuses it.' },
          { label: 'FOMO', value: 'Peaks at the worst time to buy. Cure: a plan made before the excitement.' },
          { label: 'Panic', value: 'Turns temporary dips into permanent losses. Size positions to survive.' },
          { label: 'Recency bias', value: 'Don\'t extrapolate the last quarter into the next decade. Markets cycle.' },
          { label: 'Loss aversion', value: 'Losses hurt ~2× more than gains feel good — distorts every hold/sell call.' },
          { label: 'Core rule', value: 'Build processes that work when you\'re not thinking clearly.' },
        ]}
      />
    </LessonLayout>
  )
}
