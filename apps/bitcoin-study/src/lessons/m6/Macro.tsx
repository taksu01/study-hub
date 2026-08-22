import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import ComparisonVisual from '../../components/visuals/ComparisonVisual'

export default function Macro({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="macro"
      subtitle="The macro thesis: heavily indebted governments will keep expanding money supply, some wealth will look for a neutral, non-sovereign exit — and Bitcoin, specifically, is the candidate. Here is the argument, its assumptions, and why 'crypto broadly' is not the same bet."
      onNavigate={onNavigate}
    >
      <LessonSection title="The debt trap" icon="🌍">
        <P>
          Global debt reached roughly <Strong>$315 trillion in 2024</Strong> — about three times world GDP. The US
          sits above 130% debt-to-GDP; Japan near 260%. At these levels central banks face a bind economists call{' '}
          <Strong>fiscal dominance</Strong>: raising interest rates enough to crush inflation would make government
          debt service unpayable. The politically survivable path is <Strong>managed debasement</Strong> — hold real
          rates low or negative and let inflation quietly shrink the debt.
        </P>
        <P>
          History leans the same way: faced with default, austerity, or inflation, democracies have repeatedly chosen
          inflation — 2008, the euro crisis, COVID. The macro chain of reasoning runs like this:
        </P>
        <StepFlow
          steps={[
            { label: 'Debt exceeds what taxes can service', detail: 'At ~3x global GDP, meaningful repayment through surpluses is politically and arithmetically implausible for most major economies.' },
            { label: 'Rates can\'t rise enough to fight inflation', detail: 'Fiscal dominance: every point of higher rates adds enormous debt-service cost, so central banks are pressured to stay easy.' },
            { label: 'Debasement becomes the pressure valve', detail: 'Negative real rates (US 2020–22: roughly −5% to −8%) erode debt and savings alike. Savers holding "safe" bonds are guaranteed real losses.' },
            { label: 'Wealth searches for a neutral exit', detail: 'Assets outside any government\'s balance sheet: historically gold. De-dollarization adds sovereign demand for reserve assets no rival controls.' },
            { label: 'The Bitcoin claim', detail: 'A fixed-supply, borderless, independently verifiable asset with no issuer is proposed as the digital version of that exit. IF even 1–2% of global wealth rotates in, the price impact is large — that "if" is the whole bet.' },
          ]}
        />
        <Callout type="info" title="What the thesis does and doesn't require">
          The macro case does not require fiat collapse or hyperinflation. It requires three assumptions: (1)
          governments keep expanding money supply under debt stress, (2) some wealth seeks a hard, non-sovereign
          alternative, (3) Bitcoin is the asset that wealth picks. Each is plausible; none is certain — and (3) is the
          least certain, since gold already occupies the role.
        </Callout>
      </LessonSection>

      <LessonSection title="The neutral-reserve-asset argument" icon="🏛">
        <P>
          Every traditional reserve asset embeds trust in someone: bonds trust a government's solvency, equities trust
          management, gold at scale trusts custodians, and holding another nation's currency trusts its central bank —
          a trust that de-dollarizing countries (BRICS and others) increasingly want to reduce. A{' '}
          <Strong>neutral</Strong> reserve asset would have <Strong>no issuer, no jurisdiction, and no counterparty</Strong>,
          and be verifiable by all parties independently.
        </P>
        <P>
          Bitcoin is engineered to fit that description; gold has actually filled it for centuries. The open question
          is whether verifiability and portability beat five millennia of incumbency — and whether states would adopt
          an asset they cannot control. Treat "nations will hold Bitcoin reserves" as a scenario with early, small
          examples, not an established trend.
        </P>
      </LessonSection>

      <LessonSection title="Why the thesis says Bitcoin — not 'crypto'" icon="₿">
        <P>
          The macro case demands specific properties: <Strong>no party who can change the supply, reverse
          transactions, freeze accounts, or shut the network down</Strong>. A neutral reserve asset with a CEO is a
          contradiction — whoever can be subpoenaed can be pressured. Proponents argue Bitcoin alone passes this test:
          no foundation controls its rules, its supply policy has never changed, and its 2016 counterexample is
          Ethereum's DAO fork, where transactions <Strong>were</Strong> reversed when powerful actors agreed to.
        </P>
        <P>
          Add the deepest proof-of-work security budget, the longest uninterrupted uptime, and the clearest regulatory
          status (a CFTC commodity with SEC-approved spot ETFs, while many altcoins face securities ambiguity), and
          you get the "Bitcoin, not crypto" position. Note what this is: an argument about <Strong>fitness for one
          specific monetary role</Strong> — not a claim that other chains are useless for other purposes.
        </P>
        <ComparisonVisual />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Fiat is collapsing"',
              b: 'Managed debasement',
              explanation:
                'The macro thesis is often strawmanned as doom-saying. The actual claim is milder and better supported: not collapse, but persistent negative real rates and gradual dilution as the politically easiest way to carry impossible debt. A savings asset can win in that world without any apocalypse.',
            },
            {
              a: 'Bitcoin (the thesis)',
              b: 'Crypto (the sector)',
              explanation:
                'The neutral-money case rests on having no issuer, an unchangeable supply, and no one to pressure. Most other chains have foundations, identifiable leaders, variable supply policies, or fork precedents (Ethereum\'s DAO reversal) that fail this test. They may succeed as tech platforms — that is simply a different investment thesis with different risks.',
            },
            {
              a: 'De-dollarization helps BTC',
              b: 'De-dollarization helps gold/yuan/euro',
              explanation:
                'Countries reducing USD exposure have many options, and so far they have overwhelmingly bought gold, not bitcoin. Bitcoin\'s advantages (auditable, portable, no custodian) matter, but state adoption of an uncontrollable asset is an unproven behavioral leap. The thesis needs some of that flow, not all of it — but it does need some.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Fiscal dominance', definition: 'When government debt is so large that the central bank cannot raise rates enough to fight inflation without triggering a debt crisis.' },
            { term: 'Managed debasement', definition: 'Keeping real interest rates negative so inflation gradually erodes debt — and savings. The historical default of indebted democracies.' },
            { term: 'Real interest rate', definition: 'Nominal rate minus inflation. Negative real rates (US 2020–22: about −5% to −8%) guarantee purchasing-power loss on "safe" assets.' },
            { term: 'De-dollarization', definition: 'The trend of countries reducing USD dependence in trade and reserves — creating demand for neutral alternatives (mostly gold, so far).' },
            { term: 'Neutral reserve asset', definition: 'A store of value with no issuer, jurisdiction, or counterparty, verifiable by all parties. Gold\'s historical role; Bitcoin\'s claimed one.' },
            { term: 'Decentralization moat', definition: 'The absence of anyone to pressure: no CEO, foundation, or supply authority. The property the neutral-money thesis says only Bitcoin has.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What is fiscal dominance?',
              options: [
                'When fiscal policy (spending) grows faster than monetary policy',
                'When government debt is so large that the central bank cannot raise rates to fight inflation without triggering a debt crisis',
                'When a government dominates its neighbors economically',
                'When central banks directly set tax rates',
              ],
              correct: 1,
              explanation:
                'At 100%+ debt-to-GDP, each point of higher rates massively increases debt-service costs. The central bank\'s inflation-fighting tool is effectively constrained by the treasury\'s balance sheet — so inflation tends to be tolerated, and real rates kept low or negative.',
            },
            {
              question: 'Which set of assumptions does the macro thesis actually require?',
              options: [
                'The dollar hyperinflates and governments collapse within a decade',
                'All countries adopt Bitcoin as legal tender',
                'Money supplies keep expanding under debt stress, some wealth seeks a non-sovereign alternative, and Bitcoin is the asset chosen',
                'Bitcoin\'s volatility falls below gold\'s within five years',
              ],
              correct: 2,
              explanation:
                'The thesis is probabilistic and modest: continued debasement (well-supported by history), some rotation into hard assets (also historically common), and Bitcoin winning a meaningful share of that rotation — the weakest link, since gold is the incumbent.',
            },
            {
              question: 'Why does the neutral-money argument exclude most other cryptocurrencies?',
              options: [
                'They use less electricity than Bitcoin',
                'Their transactions are too fast to audit',
                'They are all outright scams',
                'They have identifiable leaders, foundations, or fork precedents — someone who can be pressured to change supply or reverse transactions',
              ],
              correct: 3,
              explanation:
                'Neutrality requires that NO party can change supply, reverse transactions, freeze accounts, or halt the network. Ethereum\'s 2016 DAO fork reversed transactions when its community leadership agreed to; foundations and CEOs are pressure points. That doesn\'t make other chains worthless — it makes them a different thesis.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Walk the chain from global debt to the Bitcoin claim.', answer: 'Debt (~$315T, ~3x GDP) exceeds what taxes can service → fiscal dominance blocks aggressive rate hikes → managed debasement via negative real rates becomes the pressure valve → wealth seeks neutral, non-sovereign stores of value → Bitcoin is proposed as the digital candidate for that flow. Every link is an assumption, not a certainty.' },
            { question: 'What four things must no single party be able to do, for an asset to qualify as neutral money?', answer: 'Change the supply, reverse transactions, freeze accounts, or shut down the network. The thesis holds that Bitcoin passes all four while chains with foundations, leaders, or fork precedents fail at least one.' },
            { question: 'What is the weakest link in the macro case, and why?', answer: 'Assumption (3): that the wealth fleeing debasement picks Bitcoin. Gold is the entrenched incumbent — de-dollarizing central banks have so far bought gold, not BTC — and states may resist reserving in an asset they cannot control. Debasement itself is the best-supported part; Bitcoin capturing the flow is the bet.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The setup', value: 'Global debt ~$315T (~3x GDP). US >130% debt/GDP, Japan ~260%.' },
          { label: 'Fiscal dominance', value: 'Rates can\'t rise enough to kill inflation without a debt crisis → debasement.' },
          { label: 'Savers\' problem', value: 'Negative real rates (2020–22 US: −5% to −8%) = guaranteed real losses on "safe" assets.' },
          { label: 'Three assumptions', value: '(1) printing continues, (2) wealth seeks a neutral exit, (3) Bitcoin is chosen. #3 is weakest.' },
          { label: 'Neutrality test', value: 'No one can change supply, reverse txs, freeze accounts, or halt the network.' },
          { label: 'Not "crypto"', value: 'Foundations, CEOs, and fork precedents (DAO 2016) disqualify most chains from THIS thesis.' },
        ]}
      />
    </LessonLayout>
  )
}
