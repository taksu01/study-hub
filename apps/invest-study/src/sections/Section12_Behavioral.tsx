import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section12() {
  return (
    <SectionShell id="section-12">
      <SectionHeader
        number={12}
        title="Why Investors Often Lose to Their Own Mind"
        subtitle="Behavioral finance explains why smart people make irrational financial decisions — and how to recognize and resist these patterns."
      />

      <Subsection title="The Enemy Within">
        <Prose>
          <p>The biggest threat to your portfolio is not the market, the economy, or even bad stock picks. It's your own brain. Humans evolved for survival, not for rational capital allocation. The same instincts that kept us alive on the savanna — fear of loss, herd following, pattern recognition — cause systematic investing mistakes.</p>
          <p>Behavioral finance studies these patterns. Once you can name and recognize them, they lose much of their power over you.</p>
        </Prose>
      </Subsection>

      <Subsection title="The Major Behavioral Traps">
        <ExpandableCardGrid cards={[
          {
            title: 'FOMO (Fear of Missing Out)',
            subtitle: 'The urge to jump in because everyone else is profiting',
            content: 'When an asset is surging and everyone is talking about it, FOMO makes you feel like you must buy NOW or miss out forever.',
            details: 'FOMO peaks at exactly the worst time to buy — near the top of a run. By the time an investment is universally exciting, most of the easy gains are already captured. The cure: have a plan BEFORE the excitement. DCA systems and predefined allocation targets protect against FOMO.',
            color: 'red',
            tags: ['Peak Euphoria', 'Crowd Behavior'],
          },
          {
            title: 'Panic Selling',
            subtitle: 'Selling in fear during drawdowns',
            content: 'When markets crash, panic tells you to sell everything and flee. This turns temporary drawdowns into permanent losses.',
            details: 'Panic selling is the single most destructive investor behavior. Every major market recovery leaves behind investors who sold at the bottom. If you find yourself wanting to sell everything during a crash, it usually means you were taking more risk than your capacity allowed. The fix is preemptive: only invest what you can afford to leave alone for 5+ years.',
            color: 'orange',
            tags: ['Drawdowns', 'Flight Response'],
          },
          {
            title: 'Recency Bias',
            subtitle: 'Assuming recent trends will continue indefinitely',
            content: 'After a long bull market, we believe things will keep going up. After a crash, we believe they\'ll keep going down.',
            details: 'Recency bias makes us extrapolate recent experience into the future. It\'s why investors pile into assets that already went up (chasing performance) and avoid assets that recently went down (selling low). Markets are cyclical. What happened last quarter is a poor predictor of what happens next.',
            color: 'blue',
            tags: ['Extrapolation', 'Cyclical Blindness'],
          },
          {
            title: 'Overconfidence',
            subtitle: 'Believing you know more than you do',
            content: 'A few good trades create the illusion of skill. Deep knowledge of one asset creates false confidence across all assets.',
            details: 'Overconfidence leads to: concentrated positions ("I\'m sure about this"), excessive trading ("I can time this"), ignoring risks ("that won\'t happen to me"), and under-diversification. Particularly dangerous when early success in one domain (e.g., crypto during a bull run) creates a generalized feeling of market mastery.',
            color: 'purple',
            tags: ['Illusion of Control'],
          },
          {
            title: 'Confirmation Bias',
            subtitle: 'Seeking information that agrees with your existing view',
            content: 'Once you\'re invested in something, your brain filters information to confirm your decision and dismiss contradictions.',
            details: 'Confirmation bias creates echo chambers. You follow people who agree with your thesis, dismiss negative news as "FUD," and interpret ambiguous information as supportive. The antidote: actively seek out the best arguments AGAINST your positions. If you can\'t articulate the bear case, you don\'t understand your investment.',
            color: 'indigo',
            tags: ['Echo Chambers', 'Selective Perception'],
          },
          {
            title: 'Loss Aversion',
            subtitle: 'Losses feel roughly 2x as painful as equivalent gains feel good',
            content: 'The psychological pain of losing $1,000 is about twice as intense as the pleasure of gaining $1,000.',
            details: 'Loss aversion makes investors: hold losing positions too long (hoping to "break even"), sell winners too early (locking in gains before they evaporate), and avoid necessary risk-taking entirely. It biases you toward action that minimizes pain in the short term while reducing returns in the long term.',
            color: 'red',
            tags: ['Asymmetric Psychology'],
          },
          {
            title: 'Narrative Addiction',
            subtitle: 'Getting caught up in compelling stories instead of data',
            content: 'A good story about a company or asset feels more convincing than dry financial data, even when the numbers disagree.',
            details: 'Narratives are how humans naturally process information. "AI will change everything" is more compelling than "P/E of 45 with 15% growth implies X return." Narratives are useful for understanding context but dangerous when they replace valuation discipline. Always ask: "Is this narrative already priced in?"',
            color: 'teal',
            tags: ['Stories vs. Data'],
          },
          {
            title: 'Anchoring',
            subtitle: 'Fixating on a specific reference price',
            content: 'Once you see a price (purchase price, all-time high, analyst target), it becomes a mental anchor that distorts your judgment.',
            details: '"I\'ll sell when it gets back to what I paid." "It used to be $100, so $70 is cheap." These are anchoring effects. The market doesn\'t care what you paid. The relevant question is: given current fundamentals and price, is this a good investment going forward? Your purchase price is irrelevant to future returns.',
            color: 'orange',
            tags: ['Reference Point Distortion'],
          },
          {
            title: 'Doom Paralysis',
            subtitle: 'Being so focused on risks that you never invest at all',
            content: 'There\'s always a reason not to invest — recession fears, political uncertainty, market highs. Doom paralysis keeps you in cash forever.',
            details: 'The world has always been uncertain. Markets have survived world wars, pandemics, financial crises, and political upheaval — and trended upward over long periods. Waiting for the "perfect" time to invest means missing decades of compounding. The bigger risk is often inaction, not action.',
            color: 'slate',
            tags: ['Paralysis by Analysis'],
          },
        ]} />
      </Subsection>

      <Subsection title="Why Process Beats Emotion">
        <Prose>
          <p>The common thread in all behavioral traps: they are emotional reactions that feel rational in the moment but lead to poor outcomes over time. The solution is not to eliminate emotions — that's impossible. The solution is to build processes that make good decisions automatic.</p>
        </Prose>
        <div className="grid md:grid-cols-2 gap-4 mt-4 mb-6">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <h4 className="font-semibold text-sm text-emerald-800 mb-2">Process-Driven Investing</h4>
            <ul className="space-y-1.5 text-sm text-emerald-700">
              <li>• Predefined allocation targets</li>
              <li>• Automatic monthly contributions (DCA)</li>
              <li>• Written investment policy ("my rules")</li>
              <li>• Scheduled rebalancing dates</li>
              <li>• Pre-commitment: "I will not sell during a 30% drop"</li>
              <li>• Information diet: reduce noise, check less often</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <h4 className="font-semibold text-sm text-rose-800 mb-2">Emotion-Driven Investing</h4>
            <ul className="space-y-1.5 text-sm text-rose-700">
              <li>• Buying whatever is trending on social media</li>
              <li>• Selling when headlines are scary</li>
              <li>• Checking portfolio multiple times daily</li>
              <li>• Changing strategy after every drawdown</li>
              <li>• Sizing positions based on excitement level</li>
              <li>• Following influencers' trades</li>
            </ul>
          </div>
        </div>
        <InfoCallout type="tip">
          The best investment process is one that works when you're not thinking clearly. Markets will scare you. Build your system now, while you're calm, so it can protect you later, when you're not.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Terms to Remember">
        <TermsMemoryBlock terms={[
          { term: 'FOMO', definition: 'Fear of Missing Out. The urge to buy because everyone else is, typically strongest near market tops.' },
          { term: 'Loss Aversion', definition: 'The tendency to feel losses ~2x more intensely than equivalent gains. Causes holding losers too long and selling winners too early.' },
          { term: 'Recency Bias', definition: 'Overweighting recent events in predicting the future. Makes investors chase trends and extrapolate short-term patterns.' },
          { term: 'Confirmation Bias', definition: 'Seeking information that confirms your existing beliefs while dismissing contradictory evidence.' },
          { term: 'Anchoring', definition: 'Fixating on a specific reference number (purchase price, all-time high) that distorts rational evaluation.' },
          { term: 'Narrative Fallacy', definition: 'Over-reliance on compelling stories instead of quantitative analysis for investment decisions.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          { itemA: 'Conviction', itemB: 'Overconfidence', explanation: 'Genuine conviction comes from deep understanding of both the bull AND bear case. Overconfidence comes from only seeing the upside. Test: can you articulate the three strongest arguments AGAINST your position? If not, it\'s overconfidence, not conviction.' },
          { itemA: 'Patience', itemB: 'Stubbornness', explanation: 'Patience is holding through normal volatility because the thesis is intact. Stubbornness is refusing to sell when the fundamental thesis has broken. Patience requires no new information; stubbornness ignores new information.' },
          { itemA: 'Being informed', itemB: 'Over-monitoring', explanation: 'Being informed means understanding your portfolio\'s macro context and strategic rationale. Over-monitoring means checking prices hourly, reading every headline, and reacting to daily noise. The first improves decisions; the second degrades them.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'Why is panic selling so destructive?', answer: 'Because it converts temporary drawdowns (which recover) into permanent losses (which don\'t). Every major market recovery was missed by investors who sold at the bottom. The cure is preemptive: size positions so drawdowns are survivable.' },
          { question: 'How do you fight confirmation bias?', answer: 'Actively seek out the best arguments against your positions. Read the bear case. Follow people who disagree. If you can\'t articulate strong counterarguments to your thesis, you\'re in an echo chamber.' },
          { question: 'Why are processes better than willpower?', answer: 'Willpower fails under stress. During a crash, your brain is flooded with fear hormones that override rational thinking. Processes (DCA, rebalancing schedules, written rules) work automatically regardless of your emotional state.' },
        ]} />
      </Subsection>

      <Subsection title="Section Summary">
        <CheatSheetPanel items={[
          { label: 'FOMO', value: 'Peaks at the worst time. Cure: predefined plan.' },
          { label: 'Panic', value: 'Turns temporary dips into permanent losses.' },
          { label: 'Recency Bias', value: 'Don\'t extrapolate recent trends.' },
          { label: 'Overconfidence', value: 'If you can\'t argue the bear case, you don\'t understand.' },
          { label: 'Loss Aversion', value: 'Losses hurt 2x more. Distorts hold/sell decisions.' },
          { label: 'Core Rule', value: 'Build processes that work when you\'re not thinking clearly.' },
        ]} />
      </Subsection>
    </SectionShell>
  )
}
