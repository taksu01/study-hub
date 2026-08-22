import { useState } from 'react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Inline widget: adoption flywheel step-through ─────────────── */

const FLYWHEEL_STAGES = [
  { label: 'More users', detail: 'Each new holder, merchant, and developer makes the network more useful to everyone already in it — the Metcalfe-style effect: value grows faster than user count.' },
  { label: 'More liquidity', detail: 'Deeper markets mean large amounts can be bought or sold without moving the price much — a precondition for any serious store-of-value use.' },
  { label: 'More infrastructure', detail: 'Exchanges, custodians, wallets, Lightning, insurance, accounting tools. Infrastructure lowers the cost and risk of joining for the next cohort.' },
  { label: 'More institutional acceptance', detail: 'Regulated products (ETFs), custody standards, and clearer rules let pensions and corporates participate — actors who literally could not hold BTC before.' },
  { label: 'More credibility → more users', detail: 'Every year survived (the Lindy effect) plus visible institutional presence lowers perceived risk for the next wave. The loop closes and compounds.' },
]

function AdoptionFlywheel() {
  const [stage, setStage] = useState(0)
  const current = FLYWHEEL_STAGES[stage]
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          🌀 The Adoption Flywheel
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {stage + 1}/{FLYWHEEL_STAGES.length}
        </span>
      </div>
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {FLYWHEEL_STAGES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setStage(i)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                i === stage
                  ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : i < stage
                    ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{current.label}</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{current.detail}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setStage(s => Math.max(0, s - 1))}
            disabled={stage === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-40 cursor-pointer disabled:cursor-default hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            ← Back
          </button>
          <button
            onClick={() => setStage(s => (s + 1) % FLYWHEEL_STAGES.length)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
          >
            {stage === FLYWHEEL_STAGES.length - 1 ? 'Loop again ↺' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Adoption({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="adoption"
      subtitle="Half of the value thesis is supply; the other half is demand. Network effects, the Lindy effect, and the S-curve explain how adoption compounds — and the ETF era shows what institutional entry actually changed."
      onNavigate={onNavigate}
    >
      <LessonSection title="Networks get more valuable as they grow" icon="🌐">
        <P>
          A telephone with one user is a paperweight; a network of a billion phones is indispensable.{' '}
          <Strong>Metcalfe's law</Strong> formalizes the intuition: a network's value scales roughly with the{' '}
          <Strong>square</Strong> of its users, because each newcomer adds a connection to everyone already there.
          Money is the purest network good of all — a currency is only useful if others accept it.
        </P>
        <P>
          This is also why "just copy the code" fails as a competitive strategy. Bitcoin's code has been forked
          thousands of times; none of the copies took the users, liquidity, security budget, or institutional
          plumbing with them. <Strong>The code is open source; the network is not copyable.</Strong>
        </P>
      </LessonSection>

      <LessonSection title="Lindy and the S-curve" icon="📈">
        <P>
          The <Strong>Lindy effect</Strong> says that for non-perishable things — technologies, protocols, ideas —
          expected remaining lifespan grows with age. Bitcoin has survived 16+ years of 80% crashes, exchange
          collapses (Mt. Gox, FTX), national bans, and contentious forks. Each survived stress test lowers the
          perceived odds that the next one is fatal. It's a useful heuristic, not a law — Lindy raises survival odds;
          it doesn't guarantee them.
        </P>
        <P>
          Technology adoption historically follows an <Strong>S-curve</Strong>: slow among innovators, steep through
          the majority, flat at saturation. Estimates put Bitcoin somewhere in the early-adopter-to-early-majority
          transition — but locating yourself on an S-curve is only obvious in hindsight, so treat this as a framing,
          not a measurement. Step through how the pieces feed each other:
        </P>
        <AdoptionFlywheel />
        <Callout type="tip" title="The one thing to remember">
          Bitcoin's moat is not its technology — that's copyable. The moat is the compounding network: users,
          liquidity, security spend, infrastructure, and credibility that a new chain cannot fork into existence.
        </Callout>
      </LessonSection>

      <LessonSection title="The institutional turn" icon="🏦">
        <P>
          For Bitcoin's first decade, most regulated institutions <Strong>could not</Strong> hold it even if they
          wanted to — no approved vehicles, no custody standards, unclear rules. That constraint, more than opinion,
          kept institutional money out. The turn came gradually: custody services, futures markets, corporate
          treasuries (MicroStrategy from 2020), and finally <Strong>US spot ETFs in January 2024</Strong>, which let
          any brokerage account hold regulated Bitcoin exposure.
        </P>
        <P>
          Read the reversal carefully. Institutions once dismissive now offer Bitcoin products — evidence that it
          passed serious due-diligence and compliance review, and a real credibility signal. But it is{' '}
          <Strong>demand-side validation, not proof the thesis is correct</Strong>: institutions chase client demand
          and fees, they have been wrong before as a herd, and ETF flows can reverse in a bear market just as fast as
          they arrived.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Better tech wins"',
              b: 'Network effects win',
              explanation:
                'Newer chains advertise higher throughput and richer features, and technically they often are faster. But monetary networks compete on liquidity, security, credibility, and integrations — not benchmarks. QWERTY beat better keyboard layouts; TCP/IP outlived faster rivals. A "better Bitcoin" must overcome a 16-year compounding head start, not just a spec sheet.',
            },
            {
              a: 'ETF exposure',
              b: 'Owning bitcoin',
              explanation:
                'An ETF share is a claim on custodied BTC inside the financial system — convenient, regulated, but frozen or restricted like any brokerage asset. Self-custodied bitcoin is bearer ownership with no intermediary. ETFs widened access without changing the protocol; the trade-off is convenience versus sovereignty.',
            },
            {
              a: 'Institutional adoption',
              b: 'Thesis confirmation',
              explanation:
                'BlackRock offering a product means Bitcoin cleared fiduciary and compliance review — meaningful. It does not mean the price thesis is right: institutions respond to client demand, and consensus positioning has famously been wrong (dot-coms 1999, housing 2007). Adoption strengthens the case; it does not settle it.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The US SEC approved <strong>spot Bitcoin ETFs in January 2024</strong>, and major asset managers — including{' '}
          <strong>BlackRock and Fidelity</strong> — now run them, giving ordinary brokerage accounts regulated Bitcoin
          exposure. Several public companies also hold BTC as a treasury asset (MicroStrategy, which began in 2020,
          is the largest). Institutional access is now mainstream financial plumbing; whether the demand persists
          across a full market cycle remains to be seen.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Network effect', definition: 'A good becomes more valuable as more people use it. Money is the strongest case: a currency\'s usefulness is its acceptance.' },
            { term: 'Metcalfe\'s law', definition: 'Network value scales roughly with the square of user count — each new user adds connections to all existing users.' },
            { term: 'Lindy effect', definition: 'For non-perishables, expected remaining life grows with age. 16+ survived years of crises raise (but don\'t guarantee) survival odds.' },
            { term: 'Adoption S-curve', definition: 'Innovators → early adopters → majority → saturation. Bitcoin is argued to be in the early phases — knowable only in hindsight.' },
            { term: 'Spot Bitcoin ETF', definition: 'An exchange-traded fund holding actual BTC, SEC-approved January 2024. Regulated exposure through ordinary brokerage accounts.' },
            { term: 'Corporate treasury BTC', definition: 'Holding bitcoin on a company balance sheet as a reserve asset instead of (or beside) cash. Pioneered by MicroStrategy in 2020.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Why hasn\'t any of the thousands of Bitcoin code forks displaced Bitcoin?',
              options: [
                'Forking Bitcoin\'s code is illegal in most jurisdictions',
                'The forks all had technical bugs that Bitcoin lacks',
                'The code copies over, but the users, liquidity, security budget, and institutional infrastructure do not',
                'Miners are contractually bound to the original chain',
              ],
              correct: 2,
              explanation:
                'Anyone may fork the open-source code — many have. What can\'t be forked is the network: holders, market depth, accumulated hash power, credibility, and integrations. That is what Metcalfe-style network effects protect, and why "better specs" alone haven\'t been enough.',
            },
            {
              question: 'What does the Lindy effect claim about Bitcoin — stated carefully?',
              options: [
                'Bitcoin is now old enough that it cannot fail',
                'Each year survived raises the expected remaining lifespan, making survival more probable — though never guaranteed',
                'Technologies all die after roughly 30 years',
                'Older assets always outperform newer ones',
              ],
              correct: 1,
              explanation:
                'Lindy is probabilistic: surviving crashes, bans, and exchange collapses is evidence of resilience that updates the odds upward. It is a heuristic about expectations, not a law — a genuine thesis-breaking event (see the Risks lesson) would override it.',
            },
            {
              question: 'What did the January 2024 spot ETF approvals actually change?',
              options: [
                'The Bitcoin protocol was upgraded to support institutional custody',
                'It proved the price can only go up from institutional buying',
                'Regulated brokerage-account access removed a structural barrier that had kept most institutions out — without changing the protocol at all',
                'The SEC took over governance of the Bitcoin network',
              ],
              correct: 2,
              explanation:
                'ETFs are a wrapper around custodied BTC; the protocol is untouched. The significance is access: fiduciaries who previously could not hold Bitcoin now can through familiar rails. That is a genuine structural shift in who can buy — not a guarantee about what they will do.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Trace one loop of the adoption flywheel.', answer: 'More users → deeper liquidity → more infrastructure (exchanges, custody, wallets, ETFs) → more institutional acceptance and regulatory clarity → more credibility (helped by each Lindy year survived) → which attracts more users. Each turn lowers the joining cost for the next cohort.' },
            { question: 'Why is "a technically better coin will replace Bitcoin" considered a weak argument — and what would a strong version need?', answer: 'Because monetary networks compete on liquidity, security spend, credibility, and integrations, which compound with time and cannot be forked. A strong version would need a mechanism for migrating the network itself — users, market depth, institutional plumbing — not just superior benchmarks.' },
            { question: 'What is the balanced reading of institutional adoption since 2024?', answer: 'It removed a real structural barrier (regulated access via spot ETFs from BlackRock, Fidelity and others) and signals Bitcoin passed serious due diligence — but it is demand validation, not thesis proof. Institutional flows follow client demand and can reverse; herd consensus has been wrong before.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Metcalfe\'s law', value: 'Network value ~ users². Money is the purest network good — value IS acceptance.' },
          { label: 'The moat', value: 'Code is forkable; users, liquidity, hash power, and credibility are not.' },
          { label: 'Lindy effect', value: 'Each survived year raises expected lifespan. Heuristic, not guarantee.' },
          { label: 'S-curve', value: 'Innovators → early adopters → majority. Position claimed, only provable in hindsight.' },
          { label: 'ETF era', value: 'US spot ETFs approved Jan 2024 (BlackRock, Fidelity et al.) — structural access, protocol unchanged.' },
          { label: 'Honest read', value: 'Institutional entry = credibility signal and wider access, not proof the thesis is right.' },
        ]}
      />
    </LessonLayout>
  )
}
