import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import MiningVisual from '../../components/visuals/MiningVisual'

export default function ProofOfWork({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m3"
      lessonId="proof-of-work"
      subtitle="Mining isn't solving clever math — it's a brute-force lottery where each ticket costs real electricity. That cost is exactly what makes Bitcoin's history so hard to rewrite."
      onNavigate={onNavigate}
    >
      <LessonSection title="A lottery you can't cheat" icon="🎰">
        <P>
          A miner assembles a candidate block — transactions from the mempool plus one special{' '}
          <Strong>coinbase transaction</Strong> paying themselves — and builds an 80-byte{' '}
          <Strong>block header</Strong> that summarizes it. Then they hash that header with SHA-256
          (twice), over and over, changing a counter called the <Strong>nonce</Strong> each time.
        </P>
        <P>
          They win when the hash, read as a 256-bit number, comes out <Strong>below the target</Strong> — a
          threshold the network sets. Because SHA-256 output is unpredictable, there is no shortcut: every
          attempt is an independent lottery ticket, and modern miners buy quintillions of tickets per second.
          The first to win broadcasts the block, and everyone starts building on top of it.
        </P>
        <P>
          Mining does three jobs at once: it <Strong>orders transactions</Strong>, it{' '}
          <Strong>issues new coins</Strong> (via the coinbase), and it <Strong>secures history</Strong> —
          because redoing a block means redoing its work.
        </P>
      </LessonSection>

      <LessonSection title="Try it yourself" icon="⛏">
        <P>
          Run the hash-search simulator below and watch how many attempts a single "block" takes — then
          remember the real network does this at a scale of roughly a billion billion hashes per second. The
          Difficulty and Halving tabs preview the next lesson.
        </P>
        <MiningVisual />
        <P>
          Want a bigger sandbox? The <Strong>Mining tab in the Live Simulation Lab</Strong> (in this app's
          navigation) lets you mine blocks hands-on with an adjustable difficulty.
        </P>
        <Callout type="tip" title="The one thing to remember">
          Proof of Work is <strong>hard to produce, instant to verify</strong>. Finding a valid hash takes
          quintillions of guesses; checking one takes a single hash. That asymmetry lets anyone verify the
          work without trusting the worker.
        </Callout>
      </LessonSection>

      <LessonSection title="Why miners play by the rules" icon="⚖️">
        <P>
          The winning miner collects the <Strong>block reward = subsidy + fees</Strong>: brand-new BTC
          created by the coinbase transaction, plus every fee from the transactions they included. But the
          reward only becomes real if the block is <Strong>valid</Strong>.
        </P>
        <P>
          Suppose a miner claims extra subsidy or includes a forged transaction. Every full node checks every
          rule independently — they reject the block, nobody builds on it, and the electricity burned finding
          it is simply wasted. Cheating doesn't get punished by an authority; it gets{' '}
          <Strong>priced out by physics</Strong>. Honest mining is the only strategy that pays.
        </P>
        <P>
          This is also Bitcoin's <Strong>Sybil resistance</Strong>: on a network where anyone can spin up a
          thousand fake identities, influence over history is bought with real-world energy, not with names.
          You can fake an identity — you can't fake work.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Solving complex math problems"',
              b: 'Brute-force guessing',
              explanation:
                'Miners are not solving anything clever or useful. They repeat one dumb operation — hash the header, compare to target, change the nonce — trillions of times. The deliberate wastefulness is the point: it makes each block provably expensive.',
            },
            {
              a: '"Leading zeros"',
              b: 'Hash below target',
              explanation:
                'The real rule is a numeric comparison: the hash, as a 256-bit number, must be less than the target. Lower targets happen to force more leading zeros on average, which is why explainers use zeros as shorthand — but the check is "hash < target".',
            },
            {
              a: 'Block subsidy',
              b: 'Block reward',
              explanation:
                'The subsidy is only the newly created BTC (3.125 per block since April 2024). The full reward is subsidy plus all transaction fees in the block. As the subsidy halves toward zero, fees are designed to take over the job of paying for security.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          Since the <strong>April 2024 halving</strong>, the subsidy is <strong>3.125 BTC</strong> per block,
          so a typical block reward is that plus fees. The network's combined hash rate now represents one of
          the largest dedicated computing efforts on Earth — which is precisely the wall an attacker would
          have to out-compute to rewrite recent history.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Proof of Work (PoW)', definition: 'Finding a block-header hash below the target by brute force. Proves real energy was spent — and anyone can verify it with one hash.' },
            { term: 'Nonce', definition: 'A counter in the block header that miners change to get a fresh hash on each attempt.' },
            { term: 'Target', definition: 'A 256-bit threshold. A block is valid only if its header hash is numerically below it. Lower target = harder.' },
            { term: 'Coinbase transaction', definition: 'The first transaction in every block. It has no inputs — it creates the subsidy plus collected fees for the miner.' },
            { term: 'Block reward', definition: 'What the winning miner earns: block subsidy (new BTC) + all transaction fees in the block.' },
            { term: 'Sybil resistance', definition: 'Fake identities are free, but blocks cost energy. PoW ties influence to real-world expenditure, not to names.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What are miners actually computing when they mine?',
              options: [
                'Solving encryption puzzles that protect transactions',
                'Repeatedly hashing the block header with different nonces, hunting for a hash below the target',
                'Verifying signatures faster than regular nodes can',
                'Calculating the optimal order of transactions',
              ],
              correct: 1,
              explanation:
                'Mining is a brute-force search: SHA-256d of the 80-byte header, varying the nonce, until the result is numerically below the target. Nothing is "solved" — each attempt is an independent lottery ticket.',
            },
            {
              question: 'Why can any node verify a winning block instantly, when finding it took quintillions of attempts?',
              options: [
                'Nodes trust the miner\'s reported attempt count',
                'Verification is delegated to a committee of large miners',
                'Checking only requires hashing the header once and comparing to the target',
                'The block includes a mathematical proof of the search process',
              ],
              correct: 2,
              explanation:
                'That asymmetry is the whole trick. Producing a valid hash requires an enormous search, but checking a claimed solution is one hash plus one comparison — cheap enough for every node on Earth to do independently.',
            },
            {
              question: 'A miner finds a valid PoW hash for a block that pays itself 50 BTC instead of the allowed 3.125. What happens?',
              options: [
                'The block is accepted — valid PoW is what counts',
                'The extra BTC is confiscated by other miners',
                'Every full node rejects the block, and the energy spent finding it is wasted',
                'The network votes on whether to allow the higher reward',
              ],
              correct: 2,
              explanation:
                'PoW earns the right to propose a block, not to break rules. Full nodes check the subsidy, the signatures, everything — an invalid block is ignored no matter how much work it carries. That\'s why cheating never pays.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What three functions does mining serve simultaneously?', answer: 'Transaction ordering (which txs, in what order), new coin issuance (the coinbase subsidy), and security (accumulated work makes rewriting history prohibitively expensive).' },
            { question: 'What exactly do miners hash, and what do they vary between attempts?', answer: 'The 80-byte block header (version, previous block hash, Merkle root, timestamp, nBits, nonce), hashed with SHA-256 twice. They vary the nonce — and when that runs out, the timestamp or coinbase — to get fresh hashes.' },
            { question: 'Why don\'t miners cheat, given nobody can punish them?', answer: 'Because full nodes independently validate every rule. An invalid block is rejected and earns nothing, so the electricity spent finding it is pure loss. Honest mining is the only profitable strategy.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Mining =', value: 'Brute-force search for header hash < target. SHA-256d of the 80-byte header, varying the nonce.' },
          { label: 'The asymmetry', value: 'Quintillions of guesses to find; one hash to verify. Anyone can check the work without trusting the worker.' },
          { label: 'Block reward', value: 'Subsidy (new BTC from the coinbase tx) + all transaction fees. Subsidy is 3.125 BTC since April 2024.' },
          { label: 'Coinbase tx', value: 'First tx in each block; has no inputs — creates coins from nothing, per the subsidy rule.' },
          { label: 'Why no cheating', value: 'Full nodes reject invalid blocks → the PoW behind them is wasted electricity. Rules beat hash power.' },
          { label: 'Sybil resistance', value: 'Identities are free; blocks cost energy. Influence is bought with work, so it can\'t be faked.' },
        ]}
      />
    </LessonLayout>
  )
}
