import { useState } from 'react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Inline widget: fee market simulator ─────────────────────── */

const PENDING: { id: string; rate: number }[] = [
  { id: 'tx-a', rate: 45 },
  { id: 'tx-b', rate: 32 },
  { id: 'tx-c', rate: 18 },
  { id: 'tx-d', rate: 12 },
  { id: 'tx-e', rate: 6 },
  { id: 'tx-f', rate: 3 },
]
const CAPACITY = 4 // toy block: 4 transactions fit
const PRESETS = [2, 10, 40]

function FeeMarketDemo() {
  const [rate, setRate] = useState(10)

  const sorted = [...PENDING.map(t => ({ ...t, mine: false })), { id: 'you', rate, mine: true }]
    .sort((a, b) => b.rate - a.rate)
  const pos = sorted.findIndex(t => t.mine)
  const inNextBlock = pos < CAPACITY

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Fee Market — Place Your Bid
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Your fee rate:</span>
          {PRESETS.map(p => (
            <button
              key={p}
              onClick={() => setRate(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${rate === p
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {p} sat/vB
            </button>
          ))}
          <span className="ml-auto text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">{rate} sat/vB</span>
        </div>
        <input
          type="range"
          min={1}
          max={60}
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
          aria-label="Your fee rate in sat/vB"
        />

        {/* Mempool, sorted by fee rate */}
        <div className="space-y-1.5">
          {sorted.map((t, i) => (
            <div key={t.id}>
              <div
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 border transition-all
                  ${t.mine
                    ? 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800'
                    : i < CAPACITY
                      ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10'
                      : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 opacity-70'}`}
              >
                <span className={`w-14 shrink-0 text-[11px] font-bold ${t.mine ? 'text-amber-700 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {t.mine ? '➜ YOU' : t.id}
                </span>
                <div className="flex-1 h-3.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden min-w-0">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${t.mine ? 'bg-amber-500' : i < CAPACITY ? 'bg-emerald-400/80' : 'bg-gray-300 dark:bg-gray-600'}`}
                    style={{ width: `${Math.max(6, Math.min(100, (t.rate / 50) * 100))}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-[11px] font-mono text-gray-500 dark:text-gray-400 tabular-nums">{t.rate} sat/vB</span>
              </div>
              {i === CAPACITY - 1 && (
                <div className="flex items-center gap-2 py-1.5">
                  <div className="flex-1 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">next block full ({CAPACITY} tx)</span>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div
          className={`rounded-xl border p-3.5 text-sm leading-relaxed
            ${inNextBlock
              ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
              : 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'}`}
        >
          {inNextBlock ? (
            <><strong>✓ You made it.</strong> Your {rate} sat/vB bid ranks #{pos + 1} — inside the next block. Expect a confirmation in ~10 minutes.</>
          ) : (
            <><strong>✗ Outbid.</strong> Your {rate} sat/vB bid ranks #{pos + 1}, but only {CAPACITY} fit. And new transactions keep arriving — a low bid can be outbid again every block{rate <= 5 ? ', potentially for hours or days' : ''}. Bump the fee or wait for demand to drop.</>
          )}
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
          Toy model: real blocks fit ~2,000–3,000 transactions, but the auction works exactly like this.
        </p>
      </div>
    </div>
  )
}

/* ── Lesson ──────────────────────────────────────────────────── */

export default function FeesAndMempool({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m2"
      lessonId="fees-and-mempool"
      subtitle="Block space is scarce and sold by auction. Your fee isn't a service charge — it's a bid, and the mempool is the room where everyone's bids compete."
      onNavigate={onNavigate}
    >
      <LessonSection title="Block space is scarce" icon="📦">
        <P>
          A block arrives roughly every <Strong>10 minutes</Strong> and holds a limited amount of data — a few
          thousand typical transactions. When more people want in than a block can fit, someone has to wait.
          Bitcoin resolves this the market way: <Strong>an auction</Strong>. Your fee is your bid for a slice of
          the next block.
        </P>
        <P>
          Crucially, miners don't sort by total fee — they sort by <Strong>fee rate</Strong>: satoshis per virtual
          byte (<Strong>sat/vB</Strong>). Block space is measured in bytes, so miners maximize revenue per byte.
          A 100 vB transaction paying 1,000 sats (10 sat/vB) beats a 1,000 vB transaction paying 2,000 sats
          (2 sat/vB) — even though the second pays double in total.
        </P>
      </LessonSection>

      <LessonSection title="Play the auction" icon="🎯">
        <P>
          Here's a toy mempool where the next block fits 4 transactions. Set your bid and see whether you make
          the cut:
        </P>
        <FeeMarketDemo />
        <Callout type="tip" title="The one thing to remember">
          Miners sort by <strong>sat/vB, not total sats</strong>. The mempool isn't a queue you join — it's an
          auction you can lose at any moment when higher bids arrive.
        </Callout>
      </LessonSection>

      <LessonSection title="Losing the auction: RBF and CPFP" icon="🔧">
        <P>
          Bid too low and your transaction just sits there. Two fee-bumping tools fix that.{' '}
          <Strong>RBF (Replace-By-Fee)</Strong> lets the <Strong>sender</Strong> rebroadcast a replacement that
          spends at least one of the same inputs with a strictly higher fee — the old version is dropped.
        </P>
        <P>
          <Strong>CPFP (Child-Pays-For-Parent)</Strong> works from the <Strong>receiving</Strong> end: spend an
          output of the stuck transaction in a new, high-fee child. A miner who wants the juicy child must also
          include the parent, so they evaluate the pair's combined fee rate.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Total fee',
              b: 'Fee rate (sat/vB)',
              explanation:
                'Miners fill limited bytes, so they rank by fee per byte, not fee per transaction. A big transaction paying a big fee can still be a bad deal per byte. Wallets quoting "20 sat/vB" are quoting your position in this auction.',
            },
            {
              a: 'Queue',
              b: 'Auction',
              explanation:
                'The mempool has no first-come-first-served order. Arriving early earns you nothing; a transaction broadcast a minute ago at 50 sat/vB jumps ahead of yours from yesterday at 5 sat/vB. Position is bought, not waited for.',
            },
            {
              a: '"RBF is cheating"',
              b: 'RBF is repricing',
              explanation:
                'Replacing an unconfirmed transaction sounds like a double-spend — and technically it\'s the same mechanism, which is exactly why 0-conf was never safe. RBF just makes replacement explicit and rule-bound: same inputs, strictly higher fee. Once confirmed, no replacement is possible.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The fee market matters more every cycle: the <strong>April 2024 halving</strong> cut the block subsidy
          to <strong>3.125 BTC</strong>, and it halves again every ~4 years toward zero around 2140. Long term,
          transaction fees are designed to become the dominant — eventually the only — revenue paying for
          Bitcoin's security.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Fee rate (sat/vB)', definition: 'Satoshis per virtual byte — the metric miners sort by. Higher rate = higher priority.' },
            { term: 'Virtual byte (vB)', definition: 'The unit measuring a transaction\'s claim on block space (adjusted for SegWit data). Bigger tx = more vB = needs more total fee for the same rate.' },
            { term: 'Mempool', definition: 'Each node\'s waiting room of valid, unconfirmed transactions — effectively the auction house floor.' },
            { term: 'RBF', definition: 'Replace-By-Fee: the sender rebroadcasts a conflicting version spending the same input(s) with a strictly higher fee.' },
            { term: 'CPFP', definition: 'Child-Pays-For-Parent: a high-fee child transaction spends the stuck parent\'s output, so miners take both together.' },
            { term: 'Block space', definition: 'The scarce resource being auctioned — a fixed data budget per block, ~every 10 minutes.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Two transactions are waiting: X is 200 vB and pays 4,000 sats; Y is 1,000 vB and pays 6,000 sats. Which does a rational miner include first?',
              options: [
                'Y — it pays a higher total fee',
                'X — 20 sat/vB beats Y\'s 6 sat/vB',
                'Y — larger transactions get priority',
                'Whichever was broadcast first',
              ],
              correct: 1,
              explanation:
                'Block space is a byte budget, so miners maximize sats per byte. X pays 4,000/200 = 20 sat/vB; Y pays 6,000/1,000 = 6 sat/vB. X earns more than 3× the revenue per byte it occupies, despite the smaller total fee.',
            },
            {
              question: 'What best describes the mempool?',
              options: [
                'A first-in-first-out queue maintained by miners',
                'A global ledger of pending balances',
                'Each node\'s local pool of valid unconfirmed transactions, competing on fee rate',
                'A backup of the blockchain kept in memory',
              ],
              correct: 2,
              explanation:
                'Every node keeps its own mempool of valid-but-unmined transactions. There is no shared queue and no arrival-order priority — miners repeatedly skim the highest fee rates, so it behaves like a continuous auction.',
            },
            {
              question: 'Your transaction is stuck at 2 sat/vB during congestion. What does RBF let you do?',
              options: [
                'Ask miners politely to prioritize it via a flag',
                'Cancel the payment and instantly recover the funds',
                'Split the transaction into smaller pieces that confirm faster',
                'Broadcast a replacement spending the same input(s) with a higher fee',
              ],
              correct: 3,
              explanation:
                'RBF replaces the unconfirmed original with a conflicting transaction that spends at least one identical input and pays strictly more. Nodes drop the old version. (If you\'re the receiver instead, CPFP is your tool.)',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Why do miners sort by fee rate instead of total fee?', answer: 'Block space is a fixed byte budget. To maximize revenue for that budget, miners rank transactions by satoshis per virtual byte — revenue per unit of the scarce resource — not by the headline fee.' },
            { question: 'What\'s the difference between RBF and CPFP?', answer: 'RBF is sender-side: rebroadcast a conflicting replacement spending the same input(s) with a higher fee. CPFP is receiver-side (or sender via change): spend the stuck transaction\'s output in a high-fee child, forcing miners to take parent + child as a package.' },
            { question: 'What happens to a transaction whose fee rate is too low?', answer: 'Nothing fails — it waits in mempools while higher bids keep cutting in line. It confirms when demand drops, gets fee-bumped, or is eventually evicted by nodes if it lingers too long.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Scarce resource', value: 'Block space: a fixed byte budget roughly every 10 minutes.' },
          { label: 'The market', value: 'Mempool = auction floor. Fee = your bid. No queue, no arrival priority.' },
          { label: 'Sorting metric', value: 'sat/vB (fee ÷ size). Small high-rate tx beats big high-total tx.' },
          { label: 'RBF', value: 'Sender replaces stuck tx: same input(s), strictly higher fee.' },
          { label: 'CPFP', value: 'High-fee child spends stuck parent\'s output; miners take both together.' },
          { label: 'Long game', value: 'Subsidy halves toward zero (~2140) — fees become mining\'s pay.' },
        ]}
      />
    </LessonLayout>
  )
}
