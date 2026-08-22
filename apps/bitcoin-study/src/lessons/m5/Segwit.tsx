import { useState } from 'react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Inline widget: what the txid covers, before vs after SegWit ── */

function TxidCoverageWidget() {
  const [segwit, setSegwit] = useState(false)

  const covered = ['version', 'inputs', 'outputs', 'locktime']
  const Part = ({ label, inTxid }: { label: string; inTxid: boolean }) => (
    <div
      className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${
        inTxid
          ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
          : 'border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
      }`}
    >
      {label}
    </div>
  )

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">✂</span> What the TXID Covers
        </p>
        <div className="flex gap-1">
          {(['Legacy', 'SegWit'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setSegwit(mode === 'SegWit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                (mode === 'SegWit') === segwit
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
            TXID = hash of everything in this box
          </p>
          <div className="flex flex-wrap gap-2">
            {covered.map(p => <Part key={p} label={p} inTxid />)}
            {!segwit && <Part label="signatures ✍" inTxid />}
          </div>
        </div>

        {segwit && (
          <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              Witness — travels with the tx, NOT hashed into the TXID
            </p>
            <div className="flex flex-wrap gap-2">
              <Part label="signatures ✍" inTxid={false} />
            </div>
          </div>
        )}

        <div
          className={`mt-4 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
            segwit
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          }`}
        >
          {segwit ? (
            <><strong>Fixed.</strong> Signatures live outside the hashed region, so tweaking signature bytes cannot change the TXID. The ID is immutable the moment the transaction is created.</>
          ) : (
            <><strong>Malleable.</strong> Signatures are hashed into the TXID — and a third party can re-encode a valid signature into different bytes. Same payment, new TXID. Anything pre-signed on top of that TXID breaks.</>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Segwit({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="segwit"
      subtitle="Bitcoin's biggest upgrade of the 2010s wasn't really about block space — it was about making transaction IDs unforgeable, which quietly unlocked the Lightning Network."
      onNavigate={onNavigate}
    >
      <LessonSection title="The bug: transaction malleability" icon="🐛">
        <P>
          Before 2017, a transaction's ID (its <Strong>txid</Strong>) was the hash of the{' '}
          <Strong>entire</Strong> transaction — inputs, outputs, <em>and signatures</em>. That sounds harmless
          until you learn a quirk of signature encoding: the same valid signature can be written in slightly
          different bytes.
        </P>
        <P>
          So a third party could grab your unconfirmed transaction, re-encode the signature, and rebroadcast it.
          Still valid, still moves the same coins — but with a <Strong>different txid</Strong>. This is{' '}
          <Strong>transaction malleability</Strong>. It made it unsafe to build chains of pre-signed transactions
          that reference each other by txid — exactly what Lightning payment channels need. Malleability didn't
          just annoy exchanges; it <Strong>blocked Layer 2</Strong> entirely.
        </P>
      </LessonSection>

      <LessonSection title="The fix: segregate the witness" icon="✂️">
        <P>
          <Strong>Segregated Witness</Strong> (SegWit, BIP 141) does exactly what the name says: it moves the{' '}
          <Strong>witness</Strong> — signatures and unlocking data — out of the region that gets hashed into the
          txid. Signatures still travel with the transaction and still get verified; they just no longer touch
          the ID. Toggle below to see what changes:
        </P>
        <TxidCoverageWidget />
        <Callout type="tip" title="The one thing to remember">
          SegWit's real purpose was fixing malleability so the txid becomes immutable. That single property is
          what made Lightning's pre-signed channel transactions safe. Cheaper fees and bigger blocks were side
          effects.
        </Callout>
      </LessonSection>

      <LessonSection title="Weight units and the witness discount" icon="⚖️">
        <P>
          SegWit also replaced the flat 1 MB block limit with a <Strong>4,000,000 weight-unit</Strong> budget.
          A non-witness byte costs <Strong>4 WU</Strong>; a witness byte costs just <Strong>1 WU</Strong> — a
          75% discount, justified because witness data can be pruned after validation and never bloats the UTXO
          set. Divide weight by 4 and you get <Strong>virtual bytes</Strong> (vB), the unit every modern fee
          estimate uses: sat/vB.
        </P>
        <P>
          In practice this raised capacity to roughly <Strong>1.5–2.5 MB</Strong> per block with typical
          transaction mixes, and made spending SegWit coins much cheaper: a native SegWit input is ~68 vB versus
          ~148 vB for legacy — more than 50% cheaper per spend. Native SegWit outputs use the{' '}
          <Strong>bech32</Strong> address format, the lowercase <Strong>bc1q…</Strong> addresses you see
          everywhere today.
        </P>
        <P>
          Deployment mattered too: SegWit shipped as a <Strong>soft fork</Strong> in August 2017. Old nodes kept
          accepting the new blocks (they saw witness outputs as "anyone can spend" and simply didn't enforce the
          new rules), so the network upgraded without forcing anyone off the chain.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"SegWit made blocks 4 MB"',
              b: '4M weight units',
              explanation:
                'The limit is 4,000,000 weight units, not 4 MB of data. Because non-witness bytes cost 4 WU each, real blocks with typical transaction mixes land around 1.5–2.5 MB. Only a theoretical all-witness block approaches 4 MB.',
            },
            {
              a: '"3… addresses are SegWit"',
              b: 'Wrapped vs plain P2SH',
              explanation:
                'Addresses starting with 3 are P2SH — a wrapper that might contain wrapped SegWit (P2SH-P2WPKH) or a plain old multisig script with no SegWit at all. You cannot tell from the prefix. Only bc1q… guarantees native SegWit.',
            },
            {
              a: '"It was a fee upgrade"',
              b: 'A malleability fix',
              explanation:
                'The witness discount lowered fees, but that was secondary. The design goal was an immutable txid so pre-signed transaction chains (Lightning channels, time-locked contracts) could safely reference transactions that hadn\'t confirmed yet.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          SegWit activated in <strong>August 2017</strong> and its script-versioning system is now the standard
          upgrade path: <strong>version 0</strong> is native SegWit (bc1q…), and <strong>version 1</strong> is
          Taproot (bc1p…), activated <strong>November 2021</strong> — the next lesson. Fee estimators everywhere
          quote sat/vB, the unit SegWit introduced.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Transaction malleability', definition: 'Altering signature bytes of a valid transaction so it gets a new txid without becoming invalid. SegWit eliminated it.' },
            { term: 'Witness data', definition: 'Signatures and unlocking data, moved into a separate structure that the txid calculation never touches.' },
            { term: 'Weight unit (WU)', definition: 'Post-SegWit size unit: non-witness byte = 4 WU, witness byte = 1 WU. Block limit = 4,000,000 WU.' },
            { term: 'Virtual byte (vB)', definition: 'Weight ÷ 4. The standard unit for fee rates (sat/vB) in every modern wallet.' },
            { term: 'bech32 / bc1q…', definition: 'The native SegWit address encoding — lowercase-only, with strong error detection.' },
            { term: 'Soft fork', definition: 'A backward-compatible rule tightening: old nodes still accept the new blocks. SegWit deployed this way in Aug 2017.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Why did transaction malleability block the Lightning Network?',
              options: [
                'It let attackers steal coins directly from channels',
                'It made signatures too large to fit in a block',
                'Pre-signed transactions reference a parent by txid — if the txid could change, the whole chain became invalid',
                'It slowed block propagation across the network',
              ],
              correct: 2,
              explanation:
                'Lightning channels depend on refund/commitment transactions signed before the funding transaction confirms. Those refer to the funding tx by its txid. If a third party could malleate the funding tx into a new txid, every pre-signed transaction pointed at nothing.',
            },
            {
              question: 'Under SegWit, how much does one witness byte cost compared to one non-witness byte?',
              options: [
                'Both cost 4 weight units',
                '1 WU vs 4 WU — a 75% discount for witness data',
                '2 WU vs 4 WU — a 50% discount',
                'Witness bytes are completely free',
              ],
              correct: 1,
              explanation:
                'Non-witness bytes weigh 4 WU; witness bytes weigh 1 WU. The discount reflects real cost: witness data can be pruned after validation and never lives in the UTXO set, so it burdens the network less long-term.',
            },
            {
              question: 'How did SegWit deploy without splitting the network?',
              options: [
                'Every node was forced to upgrade on a flag day',
                'As a soft fork — old nodes still accepted SegWit blocks, they just didn\'t enforce the new witness rules',
                'As a hard fork approved by miner vote',
                'Exchanges coordinated a simultaneous switchover',
              ],
              correct: 1,
              explanation:
                'Soft forks tighten rules in a backward-compatible way. Un-upgraded nodes saw SegWit outputs as "anyone can spend" and kept following the same chain, while upgraded nodes enforced the full witness ruleset. No one was forced off the network.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What exactly does SegWit remove from the txid calculation, and why does that fix malleability?', answer: 'Signatures (witness data). Since signature bytes could be re-encoded while staying valid, hashing them into the txid made the ID changeable. With witnesses outside the hash, the txid is fixed the moment the transaction is built.' },
            { question: 'What is a vByte and how does it relate to weight units?', answer: 'vByte = weight units ÷ 4. Non-witness bytes are 4 WU (1 vB each); witness bytes are 1 WU (0.25 vB each). Fee rates are quoted in sat/vB, so SegWit inputs (~68 vB) are far cheaper to spend than legacy (~148 vB).' },
            { question: 'What do bc1q addresses tell you, and what can a 3… address hide?', answer: 'bc1q… is bech32 — guaranteed native SegWit (P2WPKH/P2WSH). A 3… address is P2SH, which might wrap SegWit or might be a plain legacy script; the prefix alone can\'t tell you.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'What it is', value: 'Soft fork (BIP 141), activated August 2017. Moves signatures out of the txid hash.' },
          { label: 'Why', value: 'Kills transaction malleability → immutable txids → Lightning becomes possible.' },
          { label: 'Block limit', value: '4,000,000 weight units. Non-witness byte = 4 WU, witness byte = 1 WU.' },
          { label: 'vByte', value: 'WU ÷ 4 — the unit behind every sat/vB fee estimate.' },
          { label: 'Addresses', value: 'Native SegWit = bech32 = bc1q…. Taproot (SegWit v1) = bc1p….' },
          { label: 'Real capacity', value: '~1.5–2.5 MB blocks in practice — not "4 MB blocks."' },
        ]}
      />
    </LessonLayout>
  )
}
