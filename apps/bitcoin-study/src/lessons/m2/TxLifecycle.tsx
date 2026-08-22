import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import TxLifecycleVisual from '../../components/visuals/TxLifecycleVisual'

export default function TxLifecycle({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="tx-lifecycle"
      subtitle="From a tap in your wallet to 'practically irreversible' is a six-stage pipeline. Follow it once and you'll understand why Bitcoin makes you wait — and what 'confirmed' really promises."
      onNavigate={onNavigate}
    >
      <LessonSection title="The pipeline" icon="🛤">
        <P>
          Every transaction takes the same journey:{' '}
          <Strong>build → sign → broadcast → mempool → mined → confirmations</Strong>. Your wallet selects UTXOs,
          builds the transaction, and signs it with your private key. Then it hands the signed message to a few
          peers — and from there, the network takes over.
        </P>
        <P>
          Each peer <Strong>validates before relaying</Strong>: signatures correct? UTXOs real and unspent? no
          rule broken? Valid transactions gossip across the whole network in seconds and land in each node's{' '}
          <Strong>mempool</Strong> — the local waiting room for transactions that are valid but not yet in a
          block. A miner eventually picks yours for a candidate block; when that block is mined and accepted,
          you have <Strong>1 confirmation</Strong>.
        </P>
      </LessonSection>

      <LessonSection title="Walk the stages" icon="👣">
        <P>Click through each stage — the fee-rate chart at the bottom previews the next lesson:</P>
        <TxLifecycleVisual />
      </LessonSection>

      <LessonSection title="Finality is probabilistic" icon="🎲">
        <P>
          Bitcoin never declares a transaction "final." Instead, every block mined <Strong>on top of</Strong>{' '}
          yours adds one confirmation — and one more block's worth of Proof of Work that an attacker would have
          to redo <Strong>while outpacing the entire honest network</Strong>. The probability of reversal drops
          exponentially with depth.
        </P>
        <P>
          The convention: <Strong>6 confirmations (~1 hour)</Strong> is treated as strong finality for ordinary
          amounts. A coffee seller might accept 1; an exchange crediting millions may wait for more. It's a
          risk dial, not a rule.
        </P>
        <Callout type="warning" title="0-conf is a promise, not a payment">
          A transaction sitting in the mempool has <strong>zero</strong> confirmations. The sender can still
          replace it (via RBF) or get a conflicting transaction mined instead. Never treat an unconfirmed
          transaction as settled money.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"1 confirmation = final"',
              b: 'Deep = final(ish)',
              explanation:
                '1 confirmation means your transaction is in a valid block — but a 1-block reorg, while rare, does happen. Each additional block makes reversal exponentially harder, which is why 6 confirmations became the convention for "practically irreversible."',
            },
            {
              a: '"The mempool"',
              b: 'Thousands of mempools',
              explanation:
                'There is no single shared queue. Every node keeps its own mempool, and they differ slightly based on timing, relay policy, and fee floors. "The mempool" is shorthand for the rough consensus of all of them.',
            },
            {
              a: '"My transaction failed"',
              b: '"My transaction is waiting"',
              explanation:
                'A valid transaction with a low fee rate doesn\'t fail — it sits in mempools until a miner finds it attractive or nodes eventually drop it. It can be sped up (fee bumping, next lesson) or simply left to wait for demand to fall.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          One historical wart in this pipeline is gone: transaction <strong>malleability</strong> — the ability
          to tweak a TXID without invalidating the transaction — was fixed by <strong>SegWit, activated in
          August 2017</strong>, which moved signature data out of the TXID calculation. That fix is also what
          made the Lightning Network practical.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Broadcast', definition: 'Handing a signed transaction to peers, who validate it and gossip it across the whole network in seconds.' },
            { term: 'Mempool', definition: 'Each node\'s local pool of valid but unconfirmed transactions, waiting to be mined. Local, not global.' },
            { term: 'Confirmation', definition: 'Each block mined on top of the block containing your transaction adds one confirmation.' },
            { term: '0-conf', definition: 'A broadcast transaction not yet in any block. Reversible — carries real double-spend risk.' },
            { term: 'Reorg', definition: 'A chain reorganization: a competing chain overtakes the tip, orphaning recent blocks and un-confirming their transactions.' },
            { term: 'Probabilistic finality', definition: 'Bitcoin\'s guarantee: never absolute, but reversal probability shrinks exponentially with each confirmation.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What exactly does "1 confirmation" mean?',
              options: [
                'One node has validated the transaction',
                'The transaction has been in the mempool for one block interval (~10 min)',
                'The transaction is included in a mined block that the network accepted',
                'The recipient has acknowledged receiving the funds',
              ],
              correct: 2,
              explanation:
                'Confirmations count blocks, not validations. Inclusion in an accepted block = 1 confirmation; each block mined on top adds another. Mempool time counts for nothing — an unconfirmed transaction has zero confirmations no matter how long it waits.',
            },
            {
              question: 'Why do more confirmations make a transaction safer?',
              options: [
                'More nodes have had time to store a copy of it',
                'Reversing it means redoing the Proof of Work of every block on top — while outpacing the whole honest network',
                'Miners charge a penalty for reversing old blocks',
                'After 6 blocks the protocol locks the transaction permanently',
              ],
              correct: 1,
              explanation:
                'Nothing ever "locks." Safety comes from economics: an attacker must re-mine your block plus everything above it faster than the honest network extends the chain. The odds of that collapse exponentially with depth — 6 confirmations is just the conventional "good enough" point.',
            },
            {
              question: 'Your transaction was broadcast 20 minutes ago and still has 0 confirmations. Where is it?',
              options: [
                'Lost — transactions expire after one block interval',
                'In a queue on Bitcoin\'s central relay server',
                'Sitting in nodes\' local mempools, waiting for a miner to include it',
                'Already spent by the recipient',
              ],
              correct: 2,
              explanation:
                'Valid unconfirmed transactions live in each node\'s mempool. There is no central server and no fixed expiry at 10 minutes — it waits until a miner selects it (fee rate decides how soon) or nodes eventually evict it.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Name the six stages of the transaction pipeline in order.', answer: 'Build (wallet selects UTXOs and constructs the tx) → sign (private key) → broadcast (peers validate and gossip) → mempool (waits, unconfirmed) → mined (included in a block = 1 confirmation) → confirmations (each new block on top adds one).' },
            { question: 'Why is Bitcoin finality "probabilistic" rather than absolute?', answer: 'Any block could in principle be reorged out by a longer competing chain. But reversing a transaction requires redoing its block\'s PoW plus all blocks above it, faster than the honest network — a probability that shrinks exponentially with each confirmation.' },
            { question: 'What is the 6-confirmation convention and where does it come from?', answer: 'Waiting ~6 blocks (~1 hour) before treating a payment as irreversible. It\'s a social convention, not a protocol rule — a depth at which reversal is economically absurd for ordinary amounts. High-value transfers may warrant more.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Pipeline', value: 'Build → sign → broadcast → mempool → mined → confirmations.' },
          { label: 'Validation', value: 'Every peer checks signatures, UTXOs, and rules before relaying. Invalid txs die instantly.' },
          { label: 'Mempool', value: 'Per-node waiting room for valid unconfirmed transactions. Local, roughly converging.' },
          { label: 'Confirmation', value: 'In a block = 1. Each block on top = +1. Zero until mined, no matter the wait.' },
          { label: 'Finality', value: 'Probabilistic — reversal cost grows exponentially with depth. 6 conf ≈ 1 hour ≈ convention for "done."' },
          { label: '0-conf', value: 'Unconfirmed = replaceable = not settled. Don\'t hand over the goods yet.' },
        ]}
      />
    </LessonLayout>
  )
}
