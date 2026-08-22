import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import SecurityVisual from '../../components/visuals/SecurityVisual'

export default function SecurityThreats({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m4"
      lessonId="security-threats"
      subtitle="Bitcoin's consensus layer has never been broken — yet people lose bitcoin every day. The difference is two separate security levels, and knowing which one you're actually responsible for."
      onNavigate={onNavigate}
    >
      <LessonSection title="Two very different battlefields" icon="🛡">
        <P>
          <Strong>Protocol security</Strong> is the cryptography, Proof of Work, and node validation that protect
          Bitcoin itself. Attacks here — like the famous <Strong>51% attack</Strong> — are astronomically
          expensive and surprisingly limited in what they achieve. This layer has held since 2009.
        </P>
        <P>
          <Strong>Operational security</Strong> is how <em>you</em> store keys and avoid scams. This is where
          essentially all real-world losses happen: phishing sites harvesting seed phrases, clipboard malware
          swapping addresses, and exchanges getting hacked or going bankrupt. Picture a castle with unbreached
          walls — whose residents keep taping the vault combination to the front gate.
        </P>
      </LessonSection>

      <LessonSection title="Map the threats" icon="🗺">
        <P>
          The interactive below splits the threat model into the two levels. On the protocol side, pay close
          attention to what a 51% attacker <Strong>cannot</Strong> do — it's the most misunderstood list in
          Bitcoin. On the user side, note how every threat has a boring, practical prevention:
        </P>
        <SecurityVisual />
        <Callout type="warning" title="The one thing to remember">
          A 51% attacker can reorder recent history and double-spend their own coins — but they can never steal
          from your address, invent new coins, or change the rules. Signatures and full-node validation still
          bind them.
        </Callout>
      </LessonSection>

      <LessonSection title="Why 'crypto hacks' are almost never Bitcoin hacks" icon="📰">
        <P>
          When headlines say "Bitcoin hacked," read closely: it was an <Strong>exchange</Strong>, a wallet app,
          or a person who got phished. Those are centralized services and human mistakes sitting <em>around</em>{' '}
          the protocol. Stealing coins at the protocol level would mean forging an ECDSA signature or out-mining
          the entire global network indefinitely — neither has ever happened.
        </P>
        <P>
          That's also why confirmations matter: a double-spend against a payment with <Strong>6 confirmations</Strong>{' '}
          requires redoing six blocks of work faster than the whole honest network extends the chain. For
          everyday amounts, waiting a few blocks makes reversal economically absurd.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"51% = total control"',
              b: 'Majority hash power, minority powers',
              explanation:
                'Majority hash power lets an attacker choose transaction ordering: reorg recent blocks, double-spend their own coins, delay others\' transactions. It grants zero power over validity: no stealing from addresses, no extra coins, no rule changes — full nodes reject any block that cheats.',
            },
            {
              a: '"Bitcoin was hacked"',
              b: 'A company holding bitcoin was hacked',
              explanation:
                'Mt. Gox and FTX were custodian failures — centralized businesses losing customer deposits. The Bitcoin protocol processed every block normally throughout. The consensus mechanism itself has never been successfully attacked.',
            },
            {
              a: '"Quantum computers kill Bitcoin"',
              b: 'A slow, upgradeable threat',
              explanation:
                'Quantum computing would threaten ECDSA signatures, but public keys are only exposed on-chain when you spend — unspent addresses (hashed keys) are more resistant. Quantum-resistant signature schemes exist as upgrade paths long before machines of that scale do.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The pattern keeps repeating at the custody layer, not the protocol: <strong>Mt. Gox</strong> collapsed
          in 2014 after losing customer coins, and <strong>FTX</strong> went bankrupt in November 2022 having
          misused deposits. In both cases Bitcoin's consensus kept producing valid blocks without interruption —
          the losses were entirely "their keys, your IOU."
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: '51% attack', definition: 'Majority hash power can reorder recent blocks and double-spend its own coins — but cannot steal, mint, or change rules.' },
            { term: 'Double-spend', definition: 'Spending the same UTXO in two conflicting transactions. Each confirmation makes reversal exponentially harder.' },
            { term: 'Eclipse attack', definition: 'Monopolizing one node\'s peer connections to feed it a false view of the network. Mitigated by diverse peers.' },
            { term: 'Selfish mining', definition: 'Withholding found blocks for a strategic edge in the next block race. Theoretical; hard to run profitably.' },
            { term: 'Seed phrase theft', definition: 'The most common real attack: phishing, malware, or social engineering that tricks a user into revealing their 12/24 words.' },
            { term: 'Custodial risk', definition: 'Losses from trusting a third party with keys — exchange hacks, frozen accounts, bankruptcies.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'An attacker controls 60% of Bitcoin\'s hash power. Can they take 10 BTC from Alice\'s address?',
              options: [
                'Yes — majority hash power can rewrite any balance',
                'Yes, but only from addresses that reused their public key',
                'No — spending Alice\'s coins still requires her signature, which hash power cannot forge',
                'No, but they can move her coins to a frozen "quarantine" address',
              ],
              correct: 2,
              explanation:
                'Hash power decides transaction ordering, not validity. A transaction spending Alice\'s UTXO needs a signature from Alice\'s private key, and every full node checks it. A block containing a signature-less spend is rejected no matter who mined it.',
            },
            {
              question: 'What CAN that same 51% attacker actually do?',
              options: [
                'Create extra coins beyond the block subsidy',
                'Double-spend their own recent transactions and temporarily censor others',
                'Change the 21 million coin cap',
                'Force all nodes to upgrade to new software',
              ],
              correct: 1,
              explanation:
                'With majority hash power they can secretly mine an alternative chain, release it, and undo their own recent payments (double-spend), and they can refuse to include others\' transactions for a while. Everything else — stealing, minting, rule changes — is still blocked by full-node validation.',
            },
            {
              question: 'Statistically, how is an individual most likely to actually lose bitcoin?',
              options: [
                'A protocol-level consensus attack reverses their transactions',
                'An eclipse attack on their home full node',
                'Phishing, a leaked seed phrase, or a failed exchange holding their coins',
                'A quantum computer derives their private key overnight',
              ],
              correct: 2,
              explanation:
                'Real losses overwhelmingly come from operational failures: entering a seed phrase on a fake site, malware, lost backups, and custodians like Mt. Gox or FTX collapsing. Protocol attacks are theoretical and expensive; social engineering is cheap and works daily.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'List what a 51% attacker CAN and CANNOT do.', answer: 'CAN: reorder recent blocks, double-spend their own recent transactions, temporarily censor transactions. CANNOT: steal coins from any address (signatures required), create coins beyond the subsidy, or change consensus rules (nodes reject invalid blocks).' },
            { question: 'What is the difference between protocol security and operational security?', answer: 'Protocol security is Bitcoin\'s own defenses — cryptography, PoW, node validation — which have never been broken. Operational security is how users handle keys and avoid scams, and it is where nearly all real losses occur.' },
            { question: 'Why does "the exchange was hacked" not mean "Bitcoin was hacked"?', answer: 'An exchange is a centralized company holding customer keys — a conventional target. Breaching it needs no attack on Bitcoin at all. The protocol validated blocks normally during Mt. Gox and FTX; only the custodian failed.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Two levels', value: 'Protocol security (never broken) vs operational security (your job).' },
          { label: '51% attack', value: 'Can reorder + double-spend own coins; cannot steal, mint, or change rules.' },
          { label: 'Confirmations', value: 'Each block buried makes reversal exponentially harder; 6 is the classic bar.' },
          { label: 'Real losses', value: 'Phishing, seed leaks, clipboard malware, bad backups, exchange failures.' },
          { label: 'Custody rule', value: 'Exchanges hold IOUs. Mt. Gox and FTX were custodian failures, not protocol hacks.' },
          { label: 'Habits', value: 'Never type a seed online, verify addresses before sending, back up on paper/metal.' },
        ]}
      />
    </LessonLayout>
  )
}
