import { useState } from 'react'
import { Pencil, RotateCcw } from 'lucide-react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import BlocksVisual from '../../components/visuals/BlocksVisual'

/* ── Inline widget: tamper demo — edit block 1 and watch hashes cascade ── */

const DEMO_BLOCKS = [
  { n: 1, data: 'Alice → Bob: 1 BTC', tamperedData: 'Alice → Bob: 100 BTC', hash: '0000a1f4', tamperedHash: '9c47e2b8', prev: '00003c9d' },
  { n: 2, data: 'Bob → Carol: 0.5 BTC', tamperedData: null, hash: '00007b2e', tamperedHash: null, prev: '0000a1f4' },
  { n: 3, data: 'Carol → Dan: 0.2 BTC', tamperedData: null, hash: '0000d90c', tamperedHash: null, prev: '00007b2e' },
]

function TamperDemo() {
  const [tampered, setTampered] = useState(false)
  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Tamper Demo
        </p>
        <button
          onClick={() => setTampered(!tampered)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
            ${tampered
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              : 'bg-red-600 text-white hover:bg-red-700 shadow-sm'}`}
        >
          {tampered ? <RotateCcw size={12} /> : <Pencil size={12} />}
          {tampered ? 'Reset chain' : "Edit Block 1's data"}
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_BLOCKS.map(b => {
            const isEdited = tampered && b.n === 1
            const linkBroken = tampered && b.n > 1
            const broken = isEdited || linkBroken
            return (
              <div
                key={b.n}
                className={`rounded-xl border-2 p-3 transition-all duration-300
                  ${broken
                    ? 'border-red-300 dark:border-red-700 bg-red-50/60 dark:bg-red-900/15'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className={`text-sm font-bold ${broken ? 'text-red-700 dark:text-red-300' : 'text-gray-800 dark:text-gray-200'}`}>
                    Block {b.n}
                  </p>
                  {broken && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                      {isEdited ? 'edited' : 'link broken'}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className={`rounded-lg px-2.5 py-1.5 border ${isEdited ? 'border-red-300 dark:border-red-700 bg-red-100/70 dark:bg-red-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Data</span>
                    <span className={isEdited ? 'font-semibold text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}>
                      {isEdited && b.tamperedData ? b.tamperedData : b.data}
                    </span>
                  </div>
                  <div className={`rounded-lg px-2.5 py-1.5 border font-mono ${linkBroken ? 'border-red-300 dark:border-red-700 bg-red-100/70 dark:bg-red-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                    <span className="block text-[10px] uppercase tracking-wider font-sans text-gray-400 dark:text-gray-500">Prev hash</span>
                    <span className={linkBroken ? 'text-red-600 dark:text-red-400 line-through' : 'text-gray-500 dark:text-gray-400'}>{b.prev}</span>
                    {linkBroken && <span className="ml-1.5 font-sans text-[10px] font-semibold text-red-500 no-underline">≠ parent!</span>}
                  </div>
                  <div className={`rounded-lg px-2.5 py-1.5 border font-mono ${broken ? 'border-red-300 dark:border-red-700 bg-red-100/70 dark:bg-red-900/30' : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30'}`}>
                    <span className="block text-[10px] uppercase tracking-wider font-sans text-gray-400 dark:text-gray-500">Hash</span>
                    <span className={broken ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-emerald-700 dark:text-emerald-400'}>
                      {isEdited && b.tamperedHash ? b.tamperedHash : broken ? '????????' : b.hash}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className={`mt-3 text-xs leading-relaxed transition-colors ${tampered ? 'text-red-700 dark:text-red-300' : 'text-gray-400 dark:text-gray-500'}`}>
          {tampered
            ? 'One edit in Block 1 changed its hash from 0000a1f4 to 9c47e2b8. Block 2 still points at the old hash, so its link is broken — and once Block 2 is invalid, so is Block 3. Notice the new hash has no leading zeros either: the edited block also fails Proof of Work and must be re-mined.'
            : 'A healthy chain: every block\'s "prev hash" matches its parent\'s hash exactly. Try editing Block 1.'}
        </p>
      </div>
    </div>
  )
}

export default function BlocksAndChain({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="blocks-and-chain"
      subtitle="A blockchain is just blocks linked backward by hashes — but that one design choice makes history cascade-proof: change anything old and every block after it visibly breaks."
      onNavigate={onNavigate}
    >
      <LessonSection title="Anatomy of a block" icon="🧱">
        <P>
          Every block has two parts. The <Strong>header</Strong> is a tiny, fixed 80-byte structure of metadata:
          version, previous block hash, Merkle root, timestamp, difficulty target, and nonce. The{' '}
          <Strong>body</Strong> is the actual list of transactions, which can run to megabytes.
        </P>
        <P>
          Miners only hash the <Strong>header</Strong> — that's what keeps mining tractable. But the body isn't
          left out: the <Strong>Merkle root</Strong> inside the header is a compact cryptographic fingerprint of
          every transaction in the body. Change one transaction and the Merkle root changes, which changes the
          header hash.
        </P>
      </LessonSection>

      <LessonSection title="Blocks point backward" icon="⛓">
        <P>
          Each header contains the <Strong>hash of the previous block</Strong> — blocks point backward to their
          parent, never forward. That single field turns a pile of blocks into a chain, and it's why one edit
          anywhere ripples all the way to the tip. Explore all three layers below: the header fields, the chain
          links, and the Merkle tree.
        </P>
        <BlocksVisual />
      </LessonSection>

      <LessonSection title="Break a chain with your own hands" icon="🔨">
        <P>
          Here's a toy chain of three blocks. Watch what one edit does — not just to the edited block, but to
          everything downstream of it:
        </P>
        <TamperDemo />
        <Callout type="tip" title="The one thing to remember">
          Tamper-evident, not tamper-proof. Nothing physically stops you from editing a block — but the broken
          hashes make the edit instantly visible, and fixing them means redoing the Proof of Work for every block
          from the edit to the tip, faster than the whole honest network adds new ones.
        </Callout>
      </LessonSection>

      <LessonSection title="Depth is security" icon="🛡">
        <P>
          This cascade is why <Strong>confirmations</Strong> matter. When your transaction enters a block, it has
          1 confirmation; each block mined on top adds another. Rewriting a block 6 deep means redoing 6 blocks of
          work while out-racing every honest miner — which is why exchanges commonly wait for{' '}
          <Strong>6 confirmations</Strong> (~1 hour) before treating large deposits as final. The deeper a block
          is buried, the more expensive the lie.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Longest chain wins"',
              b: 'Most accumulated work wins',
              explanation:
                'Nodes follow the valid chain with the most total Proof of Work, not simply the most blocks. A long chain of easy, low-difficulty blocks loses to a shorter chain of hard ones. Length is a decent proxy only because difficulty is usually similar across competing tips.',
            },
            {
              a: '"Immutable"',
              b: 'Tamper-evident + expensive',
              explanation:
                'The blockchain is not magically unchangeable. It is tamper-evident (edits break hashes visibly) and economically impractical to rewrite (you must redo all the work above the edit and outpace the network). The cost grows with depth — that is the real guarantee.',
            },
            {
              a: 'Blocks point forward',
              b: 'Blocks point backward',
              explanation:
                'Each block stores the hash of its PREVIOUS block — there is no "next block" pointer. The newest block is the tip, with nothing pointing to it yet. This backward linking is exactly what makes edits cascade forward: a child\'s stored parent-hash stops matching.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The chain starts at the <strong>genesis block</strong>, mined by Satoshi Nakamoto on{' '}
          <strong>January 3, 2009</strong> and hardcoded into the software with an all-zero parent hash. Since
          then the chain has grown past <strong>850,000 blocks</strong> — every one still linked, header to
          header, back to that first block.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Block header', definition: 'The 80-byte structure miners actually hash: version, prev block hash, Merkle root, timestamp, target (nBits), nonce.' },
            { term: 'Previous block hash', definition: 'The hash of the parent block\'s header, stored in each header. This one field is what chains blocks together.' },
            { term: 'Merkle root', definition: 'A single hash committing to every transaction in the block via a binary hash tree — lets light clients prove inclusion without the full block.' },
            { term: 'Genesis block', definition: 'Block 0, hardcoded into the software with no real parent. The anchor the entire chain links back to.' },
            { term: 'Confirmation', definition: 'A block mined on top of the one holding your transaction. More confirmations = more work an attacker must redo = more final.' },
            { term: 'Accumulated work', definition: 'The total Proof of Work across a chain. Nodes follow the valid chain with the most work, not merely the most blocks.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'A transaction in the block body is altered. Why does this invalidate the block header?',
              options: [
                'The header stores a full copy of every transaction',
                'The altered transaction changes the Merkle root, which sits inside the header and changes its hash',
                'The timestamp automatically updates when data changes',
                'The nonce is recalculated from the transaction list',
              ],
              correct: 1,
              explanation:
                'The header doesn\'t contain transactions — it contains the Merkle root, a compact fingerprint of all of them. Change any transaction and the root changes, so the header hash changes, so the next block\'s "prev hash" no longer matches. Body and header are cryptographically welded together.',
            },
            {
              question: 'An attacker wants to rewrite a transaction buried 6 blocks deep. What must they do?',
              options: [
                'Only re-mine the one block containing the transaction',
                'Convince a majority of nodes to vote for the change',
                'Re-mine that block and all 6 blocks above it, while outpacing the honest network adding new blocks',
                'Nothing — blocks that deep are physically impossible to change',
              ],
              correct: 2,
              explanation:
                'Editing the block breaks every hash link above it, so the attacker must redo the Proof of Work for the edited block and everything after — and do it faster than the whole honest network extends the chain. Possible in theory, economically absurd in practice. That is why depth equals security.',
            },
            {
              question: 'Two chains compete: chain A has 100 easy (low-difficulty) blocks, chain B has 95 hard ones with more total work. Which do nodes follow?',
              options: [
                'Chain A — it is longer',
                'Chain B — it has more accumulated Proof of Work',
                'Whichever chain they received first',
                'Neither, until miners vote on it',
              ],
              correct: 1,
              explanation:
                '"Longest chain" is shorthand; the actual rule is the valid chain with the most accumulated work. Otherwise an attacker could out-lengthen the honest chain with cheap, easy blocks. Work — real expended energy — is what counts.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What are the six fields in a block header?', answer: 'Version, previous block hash, Merkle root, timestamp, target (nBits), and nonce — 80 bytes total. This small header is what miners hash, not the multi-megabyte body.' },
            { question: 'Why does changing one old transaction break the chain from that point forward?', answer: 'The change alters the Merkle root → which alters that block\'s header hash → which no longer matches the "prev hash" stored in the next block → which cascades block by block to the tip. Repairing it means re-mining every affected block.' },
            { question: 'What is the difference between "tamper-evident" and "tamper-proof"?', answer: 'Tamper-evident: any edit is instantly visible because hash links break. Tamper-proof would mean edits are impossible — Bitcoin doesn\'t claim that. Instead, rewriting requires redoing all the Proof of Work above the edit while outpacing the network, which becomes economically absurd with depth.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Block anatomy', value: 'Header (80 bytes, gets hashed) + body (the transactions, can be MBs).' },
          { label: 'Header fields', value: 'Version, prev block hash, Merkle root, timestamp, target (nBits), nonce.' },
          { label: 'The chain link', value: 'Each header stores its parent\'s hash — blocks point backward, never forward.' },
          { label: 'The cascade', value: 'Edit a TX → Merkle root changes → header hash changes → every later block\'s prev-hash mismatches.' },
          { label: 'Security model', value: 'Tamper-evident, not tamper-proof: rewriting means redoing all PoW above the edit, faster than the network.' },
          { label: 'Depth & finality', value: '1 confirmation per block on top; ~6 confirmations (~1 hour) is the common "final" convention.' },
        ]}
      />
    </LessonLayout>
  )
}
