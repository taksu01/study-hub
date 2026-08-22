import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import UTXOVisual from '../../components/visuals/UTXOVisual'

export default function UtxoModel({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="utxo-model"
      subtitle="Bitcoin has no accounts and no balances. It tracks discrete chunks of value that get destroyed and created — and once you see that, half of Bitcoin's apparent weirdness makes sense."
      onNavigate={onNavigate}
    >
      <LessonSection title="No balances — only bills" icon="💵">
        <P>
          A bank keeps a row in a database: <Strong>"Alice: 3.5 BTC"</Strong>. Bitcoin keeps nothing of the sort.
          Instead it tracks <Strong>UTXOs</Strong> — unspent transaction outputs. A UTXO is a discrete chunk of
          bitcoin created by some earlier transaction and not yet spent, locked to whoever holds the right key.
        </P>
        <P>
          UTXOs behave like <Strong>physical bills</Strong>. Pay $7 with a $20 bill and you can't tear off $7 —
          you hand over the whole $20, the shop gets $7, and $13 comes back as change. The original bill is gone;
          two new "bills" exist. Bitcoin works exactly like this: inputs are consumed{' '}
          <Strong>entirely</Strong>, and outputs are the new bills.
        </P>
        <P>
          Your "wallet balance" is a fiction your wallet software computes for you: the{' '}
          <Strong>sum of every UTXO your keys can unlock</Strong>. Nowhere on the blockchain does a balance exist.
        </P>
      </LessonSection>

      <LessonSection title="Watch a transaction consume and create" icon="⇄">
        <P>
          Step through Alice paying Bob 0.7 BTC. She owns two UTXOs (0.5 and 0.4), so her wallet must consume{' '}
          <Strong>both</Strong> — and route the excess back to herself:
        </P>
        <UTXOVisual />
        <Callout type="tip" title="The one thing to remember">
          There is no fee field. <strong>Fee = total inputs − total outputs.</strong> Whatever value the outputs
          don't claim, the miner keeps. A wallet bug that forgets the change output turns your change into a
          gigantic accidental fee.
        </Callout>
      </LessonSection>

      <LessonSection title="Change, fees, and dust" icon="🪙">
        <P>
          Because inputs must be consumed whole, almost every payment needs a <Strong>change output</Strong> back
          to the sender — wallets create one automatically at a fresh address. Each output carries a{' '}
          <Strong>locking script</Strong> (typically "prove you own this public key"), which is what makes a UTXO
          spendable only by its owner.
        </P>
        <P>
          One corner case: a UTXO can be so small that the fee to spend it exceeds its value. That's{' '}
          <Strong>dust</Strong> — economically unspendable, so wallets avoid creating it.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"My wallet holds coins"',
              b: 'Wallet tracks UTXOs',
              explanation:
                'Your wallet contains keys, not coins. The coins are UTXOs recorded on the blockchain; your wallet just knows which ones your keys can unlock and sums them into a "balance" for display.',
            },
            {
              a: 'Account model (bank)',
              b: 'UTXO model (Bitcoin)',
              explanation:
                'A bank updates a mutable balance row. Bitcoin never updates anything — it destroys old UTXOs and creates new ones, like immutable objects in functional programming. There is no account to overwrite, which also makes double-spending a UTXO trivially detectable.',
            },
            {
              a: '"I sent 1 BTC"',
              b: '"Explorer shows 5 BTC moved"',
              explanation:
                'If your input UTXO was 5 BTC, the whole thing is consumed: 1 BTC to the recipient, ~4 BTC back to you as change. Block explorers show the full amount in motion, which routinely alarms newcomers.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'UTXO', definition: 'Unspent Transaction Output — a discrete, unspent chunk of bitcoin created by a previous transaction.' },
            { term: 'Input', definition: 'A reference to a previous UTXO being consumed (prev TXID + output index), plus a signature proving the right to spend it.' },
            { term: 'Output', definition: 'A new value assignment: an amount plus locking conditions. It becomes a UTXO until something spends it.' },
            { term: 'Change output', definition: 'The output that returns leftover value to the sender. Needed because UTXOs must be consumed whole.' },
            { term: 'Locking script', definition: 'The scriptPubKey — conditions that must be met to spend an output, usually "provide a signature matching this key hash."' },
            { term: 'Dust', definition: 'A UTXO so small that the fee to spend it costs more than the UTXO is worth.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Alice owns a single 5 BTC UTXO and wants to pay Bob 1 BTC. What does her transaction look like?',
              options: [
                'One input of exactly 1 BTC carved out of the UTXO',
                'The 5 BTC UTXO stays put; only a balance entry changes',
                'The whole 5 BTC UTXO is consumed: ~1 BTC to Bob, ~4 BTC back to Alice as change, remainder as fee',
                'Two inputs: 1 BTC for Bob and 4 BTC for the miner',
              ],
              correct: 2,
              explanation:
                'UTXOs cannot be partially spent — like a bill, the whole thing is handed over. The transaction consumes the 5 BTC input and creates two outputs: Bob\'s payment and Alice\'s change, with the small unclaimed difference going to the miner as fee.',
            },
            {
              question: 'Where is the transaction fee specified?',
              options: [
                'In a dedicated fee field signed by the sender',
                'Nowhere explicitly — it is whatever total inputs exceed total outputs',
                'In the locking script of the first output',
                'The miner sets it after including the transaction',
              ],
              correct: 1,
              explanation:
                'There is no fee field in a Bitcoin transaction. Fee = sum(inputs) − sum(outputs), claimed implicitly by the miner. That\'s why a missing change output is catastrophic: all the leftover value becomes fee.',
            },
            {
              question: 'What is your "wallet balance" at the protocol level?',
              options: [
                'A number stored in your wallet file and synced to the blockchain',
                'An account record kept by the nodes that have seen your address',
                'The total of coins physically stored on your device',
                'Nothing — it\'s just your wallet summing every UTXO your keys can unlock',
              ],
              correct: 3,
              explanation:
                'Bitcoin has no accounts and no balance records. There are only UTXOs scattered across the chain. Wallet software scans for the ones your keys control and displays the sum as a convenience.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What is a UTXO?', answer: 'An Unspent Transaction Output — a discrete chunk of bitcoin created as the output of an earlier transaction and not yet spent. The set of all UTXOs is the entire state of who can spend what.' },
            { question: 'How is the transaction fee calculated?', answer: 'Fee = total inputs − total outputs. There is no explicit fee field; the miner claims whatever value the outputs leave unclaimed.' },
            { question: 'Why must change outputs exist?', answer: 'Because inputs are consumed entirely, like handing over a whole bill. If your UTXOs exceed the payment amount, the excess (minus fee) must be sent back to you as a new UTXO — otherwise the miner keeps it.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Core idea', value: 'No accounts, no balances — only discrete UTXOs being destroyed and created.' },
          { label: 'Inputs', value: 'References to old UTXOs + signatures. Consumed entirely, never partially.' },
          { label: 'Outputs', value: 'New UTXOs: amount + locking script. Spendable by whoever satisfies the lock.' },
          { label: 'Fee', value: 'Implicit: inputs − outputs. No fee field anywhere.' },
          { label: 'Change', value: 'Leftover value routed back to the sender as a fresh UTXO.' },
          { label: 'Balance', value: 'A wallet-side sum of every UTXO your keys can unlock — a display convenience.' },
        ]}
      />
    </LessonLayout>
  )
}
