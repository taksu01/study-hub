import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import FoundationVisual from '../../components/visuals/FoundationVisual'

export default function TheProblem({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="the-problem"
      subtitle="Every digital file can be copied — so how can digital money exist without a bank keeping score? This is the problem Bitcoin solved, and everything else follows from it."
      onNavigate={onNavigate}
    >
      <LessonSection title="Why digital money is hard" icon="🧩">
        <P>
          If I email you a photo, we <Strong>both</Strong> have the photo. That's fine for photos — and fatal for money.
          If digital coins were just files, you could pay two people with the same coin. This is the{' '}
          <Strong>double-spend problem</Strong>.
        </P>
        <P>
          Before Bitcoin, the only fix was a trusted middleman: a bank, Visa, or PayPal keeps the one true ledger and
          decides which payments count. That works — but the middleman can censor you, charge you, fail, or be
          pressured. Bitcoin's breakthrough was solving double-spending <Strong>without anyone in charge</Strong>.
        </P>
      </LessonSection>

      <LessonSection title="The system, in one map" icon="🗺">
        <P>
          Bitcoin replaces the middleman with four interlocking parts. Remove any one and the security collapses —
          which is why "Bitcoin is just a blockchain" misses the point. Click each mechanism below:
        </P>
        <FoundationVisual />
        <Callout type="tip" title="One sentence to remember">
          Bitcoin = a shared ledger + rules every node enforces + Proof of Work + economic incentives, working
          together so nobody has to trust anybody.
        </Callout>
      </LessonSection>

      <LessonSection title="A payment, step by step" icon="👣">
        <P>Here's what actually happens when Alice pays Bob 1 BTC — no bank anywhere in the flow:</P>
        <StepFlow
          steps={[
            { label: 'Alice signs a transaction', detail: 'Her wallet creates a message — "move 1 BTC to Bob" — and signs it with her private key. Only she can produce that signature.' },
            { label: 'She broadcasts it to the network', detail: 'The transaction spreads peer-to-peer. There is no central server to send it to — and none to shut down.' },
            { label: 'Thousands of nodes verify it', detail: 'Each node independently checks the ledger history: does Alice really own that 1 BTC? Is the signature valid? No trust involved — pure verification.' },
            { label: 'A miner seals it into a block', detail: 'The transaction is bundled into a block, secured with expensive computational work (Proof of Work).' },
            { label: 'The network accepts the block', detail: 'Every node adds it to their copy of the ledger. Reversing it would mean redoing the work — and outpacing the whole network.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Blockchain"',
              b: '"Bitcoin"',
              explanation:
                'A blockchain is just a data structure — blocks linked by hashes, basically a tamper-evident list. Bitcoin is the full system: the blockchain plus the network, the consensus rules, and the economic incentives. A blockchain without those is little better than a normal database.',
            },
            {
              a: '"Wasted energy"',
              b: 'Energy as security',
              explanation:
                'Mining energy is not spent "for nothing" — it is the security mechanism. It converts real-world cost into protection: rewriting history means redoing all that work. Whether the trade-off is worth it is a fair debate, but the energy has a specific job.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The design has now run continuously since <strong>January 2009</strong> — over 16 years with effectively
          zero downtime — securing on the order of <strong>$2 trillion</strong> in value without a single
          administrator, headquarters, or emergency bailout. Whatever you conclude about Bitcoin, the double-spend
          solution itself has held.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Double-spend problem', definition: 'The risk that the same digital money is copied and spent twice. Bitcoin solves it without a central authority.' },
            { term: 'Blockchain', definition: 'An append-only data structure where each block contains the hash of the previous one, forming a tamper-evident chain.' },
            { term: 'Proof of Work (PoW)', definition: 'Miners must expend real computational effort to propose blocks — making history expensive to rewrite.' },
            { term: 'Consensus', definition: 'How thousands of independent nodes agree on one version of the ledger with no coordinator.' },
            { term: 'Decentralization', definition: 'No single point of control or failure; the network is run by many independent participants.' },
            { term: 'Trust minimization', definition: '"Don\'t trust, verify" — you (or your node) check every rule yourself instead of trusting an institution.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What fundamental problem does Bitcoin solve?',
              options: [
                'Making online payments faster than credit cards',
                'Preventing double-spending of digital money without a central authority',
                'Encrypting payments so governments cannot see them',
                'Replacing physical cash with digital files',
              ],
              correct: 1,
              explanation:
                'Digital data can be copied, so digital money needs something to stop the same coin being spent twice. Banks solved it with a central ledger; Bitcoin solved it with a distributed one — no authority required.',
            },
            {
              question: 'Why is "Bitcoin is just a blockchain" wrong?',
              options: [
                'Bitcoin actually uses a different data structure',
                'Blockchains were invented after Bitcoin',
                'The blockchain is only the ledger format — security comes from combining it with PoW, incentives, and distributed validation',
                'Bitcoin stores its data in a normal SQL database',
              ],
              correct: 2,
              explanation:
                'The chain of hashed blocks is just a tamper-evident list. What makes it hard to cheat is the surrounding system: Proof of Work makes rewriting expensive, incentives keep miners honest, and every node re-checks every rule.',
            },
            {
              question: 'In the Alice-pays-Bob flow, who checks that Alice actually owns the bitcoin she is spending?',
              options: [
                'A randomly selected bank in the network',
                'Only the miner who includes the transaction',
                'Bitcoin\'s core developers',
                'Every full node, independently, against the ledger history',
              ],
              correct: 3,
              explanation:
                'Every full node verifies every transaction against its own copy of the complete history. Miners order transactions, but they cannot make an invalid one valid — nodes would reject the block.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What are the four interlocking parts of the Bitcoin system?', answer: 'Shared ledger + consensus rules + Proof of Work + economic incentives. Each reinforces the others; removing one breaks the security model.' },
            { question: 'How did digital payments prevent double-spending before Bitcoin?', answer: 'A trusted middleman (bank, Visa, PayPal) kept the single authoritative ledger and decided which transactions were valid.' },
            { question: 'What does "don\'t trust, verify" mean concretely?', answer: 'Instead of believing an institution, your own node checks every signature, every balance, and every rule against the full transaction history.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The problem', value: 'Digital data can be copied → double-spending. Old fix: a trusted middleman.' },
          { label: 'The breakthrough', value: 'Solve double-spend with no one in charge: distributed ledger + PoW + incentives.' },
          { label: 'System formula', value: 'Bitcoin = shared ledger + consensus rules + Proof of Work + economic incentives.' },
          { label: 'Blockchain ≠ Bitcoin', value: 'Blockchain is the data structure; Bitcoin is the full monetary system around it.' },
          { label: 'Energy', value: 'Mining cost IS the security — it makes rewriting history economically absurd.' },
          { label: 'Result', value: 'Digital money that is scarce, verifiable, censorship-resistant, trustless.' },
        ]}
      />
    </LessonLayout>
  )
}
