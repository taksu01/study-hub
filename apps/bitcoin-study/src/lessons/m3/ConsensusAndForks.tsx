import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Temporary-fork step-through demo ──────────────────────────── */

type BlockState = 'hidden' | 'base' | 'contender' | 'winner' | 'stale'

const BLOCK_STYLES: Record<Exclude<BlockState, 'hidden'>, string> = {
  base: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  contender: 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300',
  winner: 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300',
  stale: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-400 dark:text-rose-500 line-through',
}

function BlockCard({ label, state }: { label: string; state: BlockState }) {
  if (state === 'hidden') {
    return <div className="w-[68px] h-9 rounded-lg border border-dashed border-gray-200 dark:border-gray-800 shrink-0" />
  }
  return (
    <div className={`w-[68px] h-9 rounded-lg border-2 flex items-center justify-center font-mono text-[11px] font-bold shrink-0 transition-all duration-300 ${BLOCK_STYLES[state]}`}>
      {label}
    </div>
  )
}

const STEPS: { title: string; desc: string; a101: BlockState; b101: BlockState; b102: BlockState }[] = [
  {
    title: 'One chain, one tip',
    desc: 'Every node agrees: the chain ends at block #100. All miners are racing to find #101 on top of it.',
    a101: 'hidden', b101: 'hidden', b102: 'hidden',
  },
  {
    title: 'Two winners at once',
    desc: 'Ava (Texas) and Ben (Iceland) both find a valid block #101 within seconds of each other. Both blocks are fully valid — they just contain a slightly different transaction set. Both propagate outward.',
    a101: 'contender', b101: 'contender', b102: 'hidden',
  },
  {
    title: 'The network splits',
    desc: 'Each node keeps whichever #101 it heard first, so roughly half the network sits on Ava\'s branch and half on Ben\'s. Both branches carry equal work — a tie. Miners simply keep mining on the tip they hold.',
    a101: 'contender', b101: 'contender', b102: 'hidden',
  },
  {
    title: 'Block #102 breaks the tie',
    desc: 'A miner building on Ben\'s block finds #102 first. Ben\'s branch now has more accumulated Proof of Work — and the chain-selection rule says: follow the chain with the most work.',
    a101: 'stale', b101: 'winner', b102: 'winner',
  },
  {
    title: 'Reorg: Ava\'s block goes stale',
    desc: 'Nodes holding Ava\'s branch reorganize to the heavier chain. Her block #101 becomes stale (orphaned): its block reward is unspendable, and its transactions — mostly already in Ben\'s #101 — return to the mempool to be mined again. Consensus restored.',
    a101: 'stale', b101: 'winner', b102: 'winner',
  },
]

function ForkDemo() {
  const [step, setStep] = useState(0)
  const s = STEPS[step]
  const forked = step >= 1

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Fork Resolver
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">Step {step + 1}/{STEPS.length}</span>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-14 shrink-0">Shared</span>
            <BlockCard label="#99" state="base" />
            <span className="text-gray-300 dark:text-gray-600">—</span>
            <BlockCard label="#100" state="base" />
            {forked && <span className="text-gray-300 dark:text-gray-600 text-lg leading-none">⟨</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-14 shrink-0">Ava</span>
            <BlockCard label="#101ᴬ" state={s.a101} />
            <div className="w-[68px] shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-14 shrink-0">Ben</span>
            <BlockCard label="#101ᴮ" state={s.b101} />
            <BlockCard label="#102" state={s.b102} />
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3.5 min-h-24">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{s.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setStep(v => Math.max(0, v - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 disabled:opacity-40 enabled:hover:border-amber-300 enabled:cursor-pointer transition-all"
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === step ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
          </div>
          <button
            onClick={() => setStep(v => Math.min(STEPS.length - 1, v + 1))}
            disabled={step === STEPS.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 disabled:opacity-40 enabled:hover:border-amber-300 enabled:cursor-pointer transition-all"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Lesson ────────────────────────────────────────────────────── */

export default function ConsensusAndForks({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m3"
      lessonId="consensus-and-forks"
      subtitle="Thousands of strangers, no coordinator, one history. Nakamoto consensus makes agreement emerge from a simple rule — follow the chain with the most work — even when the network briefly disagrees."
      onNavigate={onNavigate}
    >
      <LessonSection title="How strangers agree" icon="🤝">
        <P>
          Proof of Work alone doesn't create agreement — it only makes blocks expensive.{' '}
          <Strong>Nakamoto consensus</Strong> is the full recipe: PoW <Strong>+</Strong> the
          heaviest-chain rule <Strong>+</Strong> difficulty adjustment <Strong>+</Strong> economic
          incentives. Every node independently validates blocks, and when two valid histories exist, everyone
          follows the one with the <Strong>most accumulated work</Strong>.
        </P>
        <P>
          People say "longest chain," but the real rule is <Strong>heaviest</Strong>: the chain whose blocks
          embody the most total Proof of Work. Since attacking it means out-mining the entire honest network,
          agreement isn't enforced by authority — it's the <Strong>cheapest strategy</Strong> for everyone.
        </P>
      </LessonSection>

      <LessonSection title="When the network briefly disagrees" icon="⑂">
        <P>
          Blocks take seconds to cross the globe, so occasionally two miners find valid blocks at the same
          height before hearing of each other. The network <Strong>temporarily forks</Strong> — and resolves
          itself within a block or two. Step through exactly how:
        </P>
        <ForkDemo />
        <Callout type="warning" title="This is why confirmations exist">
          A transaction with 1 confirmation sits in a block that could still lose a fork race. Each block
          mined on top makes reversal exponentially harder — by <strong>6 confirmations (~1 hour)</strong>,
          rewriting it would require out-mining the whole network for six blocks straight. Bigger payment,
          more confirmations.
        </Callout>
      </LessonSection>

      <LessonSection title="Soft forks vs hard forks" icon="🔱">
        <P>
          Temporary forks are accidents of timing. <Strong>Rule-change forks</Strong> are different: they
          happen when nodes disagree about what "valid" means. A <Strong>soft fork tightens</Strong> the
          rules — old nodes still accept the new blocks, so the network stays whole (SegWit and Taproot
          shipped this way). A <Strong>hard fork loosens or changes</Strong> the rules — blocks valid under
          the new rules are rejected by old nodes, so unless literally everyone upgrades, the network splits
          into <Strong>two permanent chains</Strong> (that's how Bitcoin Cash split off in 2017).
        </P>
        <P>
          Mechanically: soft fork = one chain, backwards-compatible; hard fork = potentially two chains,
          two coins. Who decides whether to upgrade — and the politics of it — is the subject of the{' '}
          <Strong>Governance & the Block Size Wars</Strong> lesson in Module 5.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Stale (orphaned) block',
              b: 'Invalid block',
              explanation:
                'A stale block followed every rule — it just lost the race to a competing branch with more work. An invalid block breaks a rule and is rejected instantly by every node, no race required. Stale blocks are bad luck; invalid blocks are cheating.',
            },
            {
              a: 'Temporary fork',
              b: 'Hard fork',
              explanation:
                'A temporary fork is a timing accident under ONE set of rules — resolved automatically within a block or two. A hard fork is a disagreement about the rules themselves, which can split the network into two permanent chains with two separate coins.',
            },
            {
              a: '"Longest chain"',
              b: 'Most-work chain',
              explanation:
                'Nodes follow the chain with the most accumulated Proof of Work, not the most blocks. A long chain of easy, low-difficulty blocks loses to a shorter chain of harder ones. "Longest" is the popular shorthand; "heaviest" is the actual rule.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Nakamoto consensus', definition: 'The full agreement mechanism: PoW + heaviest-valid-chain rule + difficulty adjustment + economic incentives.' },
            { term: 'Heaviest-chain rule', definition: 'When valid histories compete, follow the one with the most accumulated Proof of Work.' },
            { term: 'Temporary fork', definition: 'Two valid blocks at the same height, caused by propagation delay. Resolved when the next block makes one branch heavier.' },
            { term: 'Stale / orphaned block', definition: 'The losing block of a fork race. Valid but abandoned — its reward is unspendable and its transactions return to the mempool.' },
            { term: 'Reorg (reorganization)', definition: 'A node switching from its current chain tip to a competing branch that now has more work.' },
            { term: 'Soft fork vs hard fork', definition: 'Soft fork tightens rules (backwards-compatible, one chain). Hard fork changes rules so old nodes reject new blocks — risking a permanent split.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Two miners find valid blocks at height 101 at nearly the same moment. How does the network resolve this?',
              options: [
                'Nodes vote on which block to keep',
                'The block with the earlier timestamp wins automatically',
                'Both blocks are discarded and height 101 is re-mined',
                'Miners keep building on the block they saw first; whichever branch gets the next block becomes the heaviest chain, and the other block goes stale',
              ],
              correct: 3,
              explanation:
                'There is no vote and timestamps are too unreliable to arbitrate. Each side mines on its own tip until one branch pulls ahead in accumulated work — usually one block later. Everyone then reorgs to the heavier branch.',
            },
            {
              question: 'What happens to the transactions inside a block that becomes stale?',
              options: [
                'They are permanently reversed and the coins are destroyed',
                'Most were also included in the winning block; any that weren\'t simply return to the mempool to be mined again',
                'They must be re-signed by the senders before being valid again',
                'They stay confirmed, because the block was valid when mined',
              ],
              correct: 1,
              explanation:
                'Both competing blocks drew from the same mempool, so their contents overlap heavily. Transactions not in the winning branch just go back to being unconfirmed — nothing is destroyed. This is also why one confirmation is weaker than six.',
            },
            {
              question: 'What is the key mechanical difference between a soft fork and a hard fork?',
              options: [
                'Soft forks change the code; hard forks change the whitepaper',
                'Soft forks are temporary; hard forks last about two weeks',
                'Soft forks tighten rules so old nodes still accept new blocks; hard forks make blocks old nodes reject, risking a permanent chain split',
                'Soft forks are decided by miners; hard forks by developers',
              ],
              correct: 2,
              explanation:
                'It\'s about backwards compatibility. Tightened rules (soft fork) produce blocks old software still sees as valid — one chain survives. Loosened or changed rules (hard fork) produce blocks old nodes reject, so non-upgraders continue a separate chain with its own coin.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What four ingredients make up Nakamoto consensus?', answer: 'Proof of Work (blocks are expensive), the heaviest-valid-chain selection rule, difficulty adjustment (stable block pace), and economic incentives (honesty pays better than attacking).' },
            { question: 'Walk through a temporary fork from split to resolution.', answer: 'Two valid blocks appear at the same height → nodes keep the first one they heard → miners mine on their own tip → the next block found makes one branch heavier → all nodes reorg to it → the losing block goes stale and its unique transactions return to the mempool.' },
            { question: 'Why does each additional confirmation make a transaction safer?', answer: 'Reversing a transaction means secretly rebuilding a heavier chain from before its block. Every block added on top is more work an attacker must redo while outpacing the honest network — the cost grows with every confirmation, which is why ~6 is the norm for large payments.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Nakamoto consensus', value: 'PoW + heaviest-valid-chain rule + difficulty adjustment + incentives. No coordinator anywhere.' },
          { label: 'Chain selection', value: 'Follow the most accumulated work ("heaviest"), not literally the most blocks.' },
          { label: 'Temporary fork', value: 'Two valid blocks, same height → next block breaks the tie → loser goes stale. Self-healing in ~1 block.' },
          { label: 'Stale block', value: 'Valid but abandoned. Reward unspendable; its unique transactions return to the mempool.' },
          { label: 'Confirmations', value: 'Each block on top makes reversal exponentially costlier. ~6 confirmations ≈ 1 hour ≈ settled.' },
          { label: 'Soft vs hard fork', value: 'Soft = tighten rules, backwards-compatible, one chain. Hard = change rules, old nodes reject → possible permanent split.' },
        ]}
      />
    </LessonLayout>
  )
}
