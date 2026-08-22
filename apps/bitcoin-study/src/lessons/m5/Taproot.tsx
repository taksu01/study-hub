import { useState } from 'react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Inline widget: 3-of-3 multisig, legacy vs Taproot key path ── */

function MultisigWidget() {
  const [taproot, setTaproot] = useState(false)

  const chip = (label: string, tone: 'rose' | 'emerald') => (
    <span
      key={label}
      className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-all ${
        tone === 'rose'
          ? 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
          : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
      }`}
    >
      {label}
    </span>
  )

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">🌿</span> 3-of-3 Multisig On-Chain
        </p>
        <div className="flex gap-1">
          {(['Legacy', 'Taproot'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setTaproot(mode === 'Taproot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                (mode === 'Taproot') === taproot
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
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          What everyone on the blockchain sees
        </p>

        {!taproot ? (
          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 p-3 space-y-2.5">
            <div className="flex flex-wrap gap-2">
              {['sig_Alice (72B)', 'sig_Bob (72B)', 'sig_Carol (72B)'].map(s => chip(s, 'rose'))}
            </div>
            <div className="flex flex-wrap gap-2">
              {chip('script: OP_CHECKMULTISIG 3-of-3 [pubA] [pubB] [pubC]', 'rose')}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 p-3">
            <div className="flex flex-wrap gap-2">
              {chip('one Schnorr signature (64B)', 'emerald')}
            </div>
          </div>
        )}

        <div
          className={`mt-4 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
            taproot
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          }`}
        >
          {taproot ? (
            <><strong>Key path spend.</strong> Alice, Bob, and Carol aggregated their keys with MuSig2 into one public key, and their three signatures into one 64-byte Schnorr signature. On-chain it is indistinguishable from someone spending from a normal single-key wallet.</>
          ) : (
            <><strong>Everything exposed.</strong> Three separate ~72-byte ECDSA signatures plus the full multisig script are published on-chain. Anyone can see this is a 3-of-3 wallet — and pays fees for every byte of it.</>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Taproot({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="taproot"
      subtitle="Schnorr signatures let many keys collapse into one, and MAST hides unused contract clauses — so a complex vault can look exactly like a plain payment."
      onNavigate={onNavigate}
    >
      <LessonSection title="Schnorr: signatures you can add together" icon="➕">
        <P>
          Taproot (BIPs 340/341/342, activated <Strong>November 2021</Strong>) swapped Bitcoin's ECDSA
          signatures for <Strong>Schnorr signatures</Strong> on new outputs. Schnorr's superpower is{' '}
          <Strong>linearity</Strong>: public keys can be added into one combined key, and signatures into one
          combined signature.
        </P>
        <P>
          With the <Strong>MuSig2</Strong> protocol, a 3-of-3 multisig between Alice, Bob, and Carol becomes{' '}
          <Strong>one key and one 64-byte signature</Strong> on-chain — smaller, cheaper, and impossible to tell
          apart from a regular single-key payment. (Naively adding keys would allow "rogue-key" attacks; MuSig2's
          commitment round prevents them.)
        </P>
        <MultisigWidget />
      </LessonSection>

      <LessonSection title="Two doors: key path and script path" icon="🚪">
        <P>
          A Taproot output commits to two things at once: an <Strong>internal key</Strong> (the aggregated
          "everyone agrees" key) and a <Strong>Merkle tree of fallback scripts</Strong> — the{' '}
          <Strong>MAST</Strong> structure. That gives every spend two doors.
        </P>
        <P>
          The <Strong>key path</Strong> is the happy path: all parties cooperate, sign with the combined key,
          and the transaction looks like a boring single-key send. The <Strong>script path</Strong> is the
          fallback: reveal <em>one</em> script leaf plus a Merkle proof, and only that branch becomes public.
          A contract like "Alice can spend after 1 year, OR 2-of-3 multisig anytime" reveals only the clause
          actually used — the timelock stays private forever if the multisig door is taken.
        </P>
        <Callout type="tip" title="The one thing to remember">
          Taproot makes complex scripts look like simple payments. Cooperation = key path = indistinguishable
          from a normal send. Disagreement = script path = only the used clause is revealed.
        </Callout>
      </LessonSection>

      <LessonSection title="Why this matters: privacy by default" icon="🕶️">
        <P>
          Before Taproot, a Lightning channel close was a visible 2-of-2 multisig spend — blockchain surveillance
          firms could tag it instantly. After Taproot, a cooperative close is a key path spend that looks like
          any other payment. The heuristics used to fingerprint wallets, vaults, and contracts erode, and the
          privacy improvement benefits everyone whose transactions blend into the same crowd.
        </P>
        <P>
          Taproot outputs use <Strong>bech32m</Strong> encoding and start with <Strong>bc1p…</Strong> (SegWit
          version 1 — built on the script-versioning system SegWit introduced). The tweaked checksum prevents
          accidentally sending bc1q funds to a bc1p address or vice versa.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Taproot = full privacy"',
              b: 'Privacy on the happy path',
              explanation:
                'Key path spends are indistinguishable from normal payments — a big win. But a forced script path spend still reveals the branch that was executed. Taproot narrows what leaks; it does not make Bitcoin anonymous.',
            },
            {
              a: '"Bitcoin becomes Ethereum"',
              b: 'Still deliberately limited',
              explanation:
                'Taproot enables more expressive contracts (DLCs, better vaults) but Bitcoin script remains non-Turing-complete: no loops, no arbitrary state machines. The constraint is a security choice, not a missing feature.',
            },
            {
              a: '"Key aggregation is unsafe"',
              b: 'MuSig2 handles it',
              explanation:
                'Naive key addition is vulnerable to rogue-key attacks, where a malicious cosigner crafts a key that cancels out the others. MuSig2 defeats this with a nonce-commitment round before signing — the aggregation you actually use is safe.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          Taproot activated in <strong>November 2021</strong> via "Speedy Trial" miner signaling — smooth and
          nearly unanimous, a sharp contrast to SegWit's contentious 2017 activation. bc1p… addresses are now
          supported by all major wallets, and Taproot underpins newer protocols from Discreet Log Contracts to
          more private Lightning channels.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Schnorr signature', definition: 'A 64-byte signature scheme with linear math — keys and signatures can be aggregated. Replaces ECDSA for Taproot outputs.' },
            { term: 'Key aggregation', definition: 'Combining n public keys into one and n signatures into one, making n-of-n multisig look like a single-key spend.' },
            { term: 'MuSig2', definition: 'The two-round protocol that performs aggregation safely, blocking rogue-key attacks via a nonce-commitment step.' },
            { term: 'MAST', definition: 'Merkelized Alternative Script Trees — commit to many script branches, reveal only the one actually executed.' },
            { term: 'Key path / script path', definition: 'The two ways to spend a Taproot output: cooperative combined-key signature, or revealing one fallback script leaf + Merkle proof.' },
            { term: 'bc1p / bech32m', definition: 'The address format for Taproot (SegWit v1) outputs, with a checksum tweak that keeps bc1q and bc1p funds from crossing.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What property of Schnorr signatures enables key aggregation?',
              options: [
                'They are quantum-resistant',
                'They are encrypted rather than hashed',
                'Their math is linear, so keys and signatures can be added into single combined values',
                'They are variable-length, so multiple can share one slot',
              ],
              correct: 2,
              explanation:
                'Schnorr signatures are linear: the sum of valid signatures under summed keys is itself a valid signature under the combined key. ECDSA\'s non-linear construction has no such property, which is why legacy multisig needs every signature on-chain.',
            },
            {
              question: 'A 3-of-3 Taproot multisig spends via the key path. What does an outside observer see?',
              options: [
                'Three signatures and the multisig script',
                'One signature and a note marking it as multisig',
                'A single 64-byte signature — indistinguishable from a normal single-key payment',
                'The Merkle root of all three keys',
              ],
              correct: 2,
              explanation:
                'On the key path, MuSig2 aggregation produces one key and one signature. Nothing on-chain distinguishes it from an ordinary wallet payment — that indistinguishability is Taproot\'s core privacy win.',
            },
            {
              question: 'With MAST, what happens to script branches that are never executed?',
              options: [
                'They are published when the output is created',
                'They stay hidden forever — only the executed leaf and its Merkle proof are revealed',
                'They are revealed when the channel or contract closes',
                'Miners archive them off-chain for dispute resolution',
              ],
              correct: 1,
              explanation:
                'The output commits to the Merkle root of all branches, but spending via one leaf only requires revealing that leaf plus a proof it belongs to the tree. Every alternative clause remains permanently private.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What are the two ways to spend a Taproot output, and when is each used?', answer: 'Key path: all parties cooperate and sign with the aggregated internal key — looks like a normal payment. Script path: fallback when cooperation fails — reveal one committed script leaf plus a Merkle proof; only that branch becomes public.' },
            { question: 'Why is Taproot good for Lightning\'s privacy specifically?', answer: 'Pre-Taproot, a cooperative channel close was a visible 2-of-2 multisig spend, easily tagged as Lightning. Post-Taproot, a cooperative close is a key path spend indistinguishable from a regular single-key transaction.' },
            { question: 'Which three BIPs make up Taproot and what does each define?', answer: 'BIP 340: Schnorr signatures. BIP 341: the Taproot output/commitment structure (key + MAST). BIP 342: Tapscript, the updated scripting language with upgrade-friendly OP_SUCCESS opcodes. All activated together in November 2021.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'What it is', value: 'Soft fork (BIPs 340/341/342), activated November 2021 via Speedy Trial.' },
          { label: 'Schnorr', value: '64-byte signatures, linear math → keys and signatures aggregate (MuSig2).' },
          { label: 'Key path', value: 'Cooperative spend with the combined key — looks like a plain payment.' },
          { label: 'Script path', value: 'Fallback: reveal one MAST leaf + Merkle proof; unused branches stay private.' },
          { label: 'Privacy win', value: 'Multisigs, vaults, and Lightning closes blend in with ordinary sends.' },
          { label: 'Addresses', value: 'bc1p… (bech32m) = Taproot = SegWit version 1.' },
        ]}
      />
    </LessonLayout>
  )
}
