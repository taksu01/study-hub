import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Risk cards: severity × horizon layout ─────────────────────── */

type Risk = {
  name: string
  category: string
  severity: 'High' | 'Medium' | 'Low'
  horizon: string
  detail: string
}

const RISKS: Risk[] = [
  {
    name: 'Volatility & drawdowns',
    category: 'Market',
    severity: 'High',
    horizon: 'Ongoing',
    detail:
      '70–80% peak-to-trough crashes in 2011, 2014, 2018, and 2022. Recovery is a historical pattern, not a law — and in liquidity crises Bitcoin has traded like a risk asset, falling WITH stocks exactly when a hedge should hold.',
  },
  {
    name: 'Security budget after the subsidy',
    category: 'Protocol',
    severity: 'High',
    horizon: 'Decades',
    detail:
      'Mining is paid mostly by the block subsidy, which halves toward zero (~2140). If fees don\'t replace it — especially with L2s moving activity off-chain — hash rate could fall and attacks get cheaper. Unsolved; openly debated among Bitcoin developers.',
  },
  {
    name: 'Regulatory restriction',
    category: 'Regulatory',
    severity: 'Medium',
    horizon: 'Years',
    detail:
      'Not a global "ban" (coordination across rival states is unlikely) but exchange restrictions, punitive taxation, or reporting rules that strangle practical use in major jurisdictions. ETF approval reduced this risk in the US; it varies widely elsewhere and can re-escalate.',
  },
  {
    name: 'Custody & user error',
    category: 'Custody / UX',
    severity: 'Medium',
    horizon: 'Ongoing',
    detail:
      'Irreversibility cuts both ways: lost keys, exchange failures (Mt. Gox, FTX), phishing, and inheritance failures have destroyed billions in value. An estimated 3–4M BTC are already gone. Self-custody done badly is a bigger everyday risk than any protocol attack.',
  },
  {
    name: 'Quantum computing',
    category: 'Protocol',
    severity: 'Low',
    horizon: '10–20+ yrs',
    detail:
      'A large quantum computer could derive private keys from exposed public keys (ECDSA/Schnorr). Experts put the capability a decade or more away, and post-quantum signatures can be soft-forked in — but migration of old, exposed coins would be messy. A watch item, not a current threat.',
  },
  {
    name: 'Black swans',
    category: 'Systemic',
    severity: 'Low',
    horizon: 'Unknown',
    detail:
      'A SHA-256 break (would also wreck most internet security), an unknown consensus bug, or demand simply fading over a generation. Low probability, impossible to price, non-zero. Honest position sizing accounts for total loss.',
  },
]

const SEVERITY_STYLES: Record<Risk['severity'], string> = {
  High: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
  Medium: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
  Low: 'bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300',
}

function RiskGrid() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          ⚠ The Bear Case, Mapped
        </p>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RISKS.map(r => (
          <div key={r.name} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 p-3.5">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${SEVERITY_STYLES[r.severity]}`}>
                {r.severity} impact
              </span>
              <span className="px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-700 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                {r.category}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-auto">{r.horizon}</span>
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{r.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{r.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Risks({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="risks"
      subtitle="Five lessons argued the bull case. This one argues against it — seriously. If you cannot state the bear case in your own words, you haven't earned an opinion on the bull case."
      onNavigate={onNavigate}
    >
      <LessonSection title="Why the bear case deserves your full attention" icon="⚖">
        <P>
          Everything in this module so far is a <Strong>thesis</Strong> — a probabilistic bet, not a certainty. The
          risks below are not talking points to be swatted away; several are genuinely unsolved, and at least one (the
          long-run security budget) is openly debated by Bitcoin's own developers. Dismissing them doesn't make you
          bullish; it makes you unprepared.
        </P>
        <P>
          The risks cluster into five families: <Strong>protocol</Strong> (security budget, quantum),{' '}
          <Strong>market</Strong> (volatility, correlation in crises), <Strong>regulatory</Strong>,{' '}
          <Strong>custody/UX</Strong>, and <Strong>systemic tail risks</Strong>. Map them by impact and horizon:
        </P>
        <RiskGrid />
        <Callout type="danger" title="The one thing to remember">
          Position sizing is the whole risk-management game: hold only what you could watch fall 80% — or go to zero —
          without being forced to sell. Bitcoin's history punishes leverage and oversized conviction far more often
          than it punishes patience.
        </Callout>
      </LessonSection>

      <LessonSection title="Which counterarguments are strong — and which are weak" icon="🔍">
        <P>
          <Strong>Strong rebuttals exist for some risks.</Strong> "Governments will ban it globally" runs into
          coordination reality — rival states won't synchronize, China's 2021 mining ban relocated rather than killed
          the network, and US ETF approval pulled the largest market the other way. Quantum is distant and
          upgradeable-in-advance. And Buffett's "it produces nothing" critique applies equally to gold's $13T+ market
          — non-yielding monetary assets are a real, ancient category.
        </P>
        <P>
          <Strong>Other rebuttals are weaker than fans admit.</Strong> "It always recovers from crashes" is four data
          points from a period of falling rates and easy money — survivorship isn't destiny. "Fees will fund security"
          is a hope with no demonstrated mechanism yet: today's fee revenue is nowhere near subsidy levels, and L2
          success could make it worse. "It hedges crises" failed its tests in March 2020 and 2022, when Bitcoin fell
          alongside equities. Hold both lists honestly.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"An 80% crash proves fraud"',
              b: '"Crashes are guaranteed to recover"',
              explanation:
                'Both extremes are wrong. Drawdowns of 70–80% are normal for a young asset in price discovery (Amazon fell ~90% in 2000–02) — volatility is not evidence of scam. But the mirror-image claim fails too: four historical recoveries do not guarantee a fifth. The honest position is that severe drawdowns are expected and recovery is probable-not-promised.',
            },
            {
              a: 'Protocol risk',
              b: 'Custody risk',
              explanation:
                'Mt. Gox and FTX were custodian failures — companies losing customer coins — not Bitcoin failures; the protocol ran flawlessly through both. But for a real user the distinction is cold comfort: your bitcoin is exactly as safe as your weakest custody link. Most actual losses in Bitcoin\'s history came from custody and user error, not the protocol.',
            },
            {
              a: '"Banned" (protocol level)',
              b: '"Restricted" (practical level)',
              explanation:
                'The network itself is very hard to switch off — nodes and miners relocate. But governments don\'t need to kill the protocol to hurt the thesis: restricting exchanges, banking access, and taxation can strangle practical usability in a jurisdiction. The realistic regulatory risk is friction and exclusion, not a global off-switch.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Security budget', definition: 'Total miner revenue (subsidy + fees) funding hash rate. As the subsidy halves toward zero (~2140), fees must replace it — an unsolved question.' },
            { term: 'Drawdown', definition: 'Peak-to-trough decline. Bitcoin has had four ~70–80% drawdowns. Past recoveries are a pattern, not a guarantee.' },
            { term: 'Correlation in crises', definition: 'In liquidity panics (March 2020, 2022) Bitcoin fell with risk assets — undermining the short-term hedge narrative precisely when it mattered.' },
            { term: 'Custody risk', definition: 'Loss via exchanges, lost keys, phishing, or inheritance failure. Historically the largest source of real-world Bitcoin losses.' },
            { term: 'Quantum risk', definition: 'Future quantum computers could derive keys from exposed public keys. Estimated 10–20+ years out; mitigable by post-quantum signature upgrades.' },
            { term: 'Position sizing', definition: 'Allocating only what you can hold through an 80% crash — or total loss — without forced selling. The core discipline this lesson exists to teach.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What is the long-run security budget concern?',
              options: [
                'Bitcoin\'s developers are running out of funding for code maintenance',
                'As the block subsidy halves toward zero, transaction fees may not generate enough miner revenue to keep attacks expensive',
                'The 21M cap means miners will eventually run out of coins to steal',
                'Hash rate is growing too fast for the difficulty adjustment to keep up',
              ],
              correct: 1,
              explanation:
                'Security is bought with miner revenue, which today is mostly subsidy. The subsidy is scheduled to vanish, and current fee revenue is far below it — especially if Layer 2s move transactions off-chain. This is a genuine open problem debated within Bitcoin development, not FUD to be dismissed.',
            },
            {
              question: 'Which claim about Bitcoin\'s crash history is actually supported by the evidence?',
              options: [
                'Crashes of 70–80% are anomalies that ended after institutional adoption',
                'Every past crash recovered, so future recovery is effectively certain',
                'Severe drawdowns are a recurring, expected feature, and past recoveries — four of them, all in an easy-money era — do not guarantee the next one',
                'Drawdowns only affect investors who use leverage',
              ],
              correct: 2,
              explanation:
                'Four major drawdowns (2011, 2014, 2018, 2022) each recovered — but that\'s a small sample from one macro regime. The defensible conclusion is "expect severe drawdowns; recovery is probable, not promised." Unleveraged investors still lose if they\'re forced or panicked into selling at the bottom.',
            },
            {
              question: 'What is the most realistic form of regulatory risk?',
              options: [
                'A simultaneous global ban that shuts down the network',
                'The SEC deleting the blockchain',
                'Restrictions on exchanges, banking access, and taxation that strangle practical usability in major jurisdictions',
                'A UN resolution reassigning the 21M cap',
              ],
              correct: 2,
              explanation:
                'The protocol is hard to kill — nodes and miners relocate, and rival states won\'t coordinate. But the investment thesis needs practical on/off ramps and legal usability. Choking those (as several jurisdictions have) does real damage without touching a single node. ETFs reduced this risk in the US; it remains live elsewhere.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Name the five risk families and one concrete example of each.', answer: 'Protocol (post-subsidy security budget; quantum as a long-horizon item), market (70–80% drawdowns; correlation with equities in crises), regulatory (exchange/banking restrictions, punitive taxation), custody/UX (Mt. Gox, FTX, lost keys — the biggest historical loss source), and systemic tails (SHA-256 break, unknown consensus bug, generational demand fade).' },
            { question: 'Give one strong counterargument and one weak counterargument from the bull side.', answer: 'Strong: a coordinated global ban is implausible — rival states don\'t synchronize, and China\'s 2021 ban relocated mining rather than killing it. Weak: "fees will replace the subsidy" — current fee revenue is nowhere near subsidy levels and no demonstrated mechanism closes the gap yet; it is a hope, not a solved problem.' },
            { question: 'Why did March 2020 and 2022 damage the "Bitcoin hedges crises" narrative?', answer: 'In both liquidity panics Bitcoin fell sharply alongside stocks — investors sold everything liquid for dollars. Whatever Bitcoin\'s long-run debasement-hedge merits, it has so far behaved like a risk asset during acute crises, which is exactly when a hedge is supposed to hold.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Market risk', value: 'Four ~70–80% drawdowns; falls WITH equities in liquidity panics. Recovery = pattern, not promise.' },
          { label: 'Protocol risk', value: 'Post-subsidy security budget is unsolved; fees ≪ subsidy today. Quantum: 10–20+ yrs, upgradeable.' },
          { label: 'Regulatory risk', value: 'Realistic form = restriction and friction, not a global ban. Reduced in US by ETFs; live elsewhere.' },
          { label: 'Custody risk', value: 'Biggest historical loss source: exchanges (Mt. Gox, FTX), lost keys, user error. ~3–4M BTC already gone.' },
          { label: 'Strong rebuttals', value: 'Global ban coordination is implausible; quantum is distant; "produces nothing" also describes gold.' },
          { label: 'Weak rebuttals', value: '"Always recovers" (n=4, one macro regime); "fees will cover security" (unproven); "hedges crises" (failed 2020/2022).' },
          { label: 'The discipline', value: 'Size positions for an 80% drawdown or total loss without forced selling.' },
        ]}
      />
    </LessonLayout>
  )
}
