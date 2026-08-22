import { useState } from 'react'
import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

/* ── Halving-schedule explorer ─────────────────────────────────── */

const CAP = 21_000_000

const EPOCHS = Array.from({ length: 10 }, (_, i) => ({
  epoch: i,
  startBlock: i * 210_000,
  yearLabel: `~${2009 + i * 4}`,
  subsidy: 50 / 2 ** i,
  // Coins mined by the END of this epoch: 210,000 × Σ subsidies = 21M × (1 − 2^−(e+1))
  minedByEnd: CAP * (1 - 0.5 ** (i + 1)),
}))

function fmtBtc(n: number) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 8 })
}

function HalvingExplorer() {
  const [i, setI] = useState(4) // current epoch (post-April-2024)
  const e = EPOCHS[i]
  const pctMined = (e.minedByEnd / CAP) * 100

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Halving Explorer
        </p>
      </div>
      <div className="p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {EPOCHS.map(ep => (
            <button
              key={ep.epoch}
              onClick={() => setI(ep.epoch)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border
                ${i === ep.epoch
                  ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-amber-300 dark:hover:border-amber-700'}`}
            >
              {ep.yearLabel}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Era</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {i === 0 ? 'Genesis era' : `After halving #${i}`}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Blocks {e.startBlock.toLocaleString('en-US')}–{(e.startBlock + 209_999).toLocaleString('en-US')}
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Block subsidy</p>
            <p className="text-lg font-bold text-amber-700 dark:text-amber-300 mt-1 tabular-nums">{fmtBtc(e.subsidy)} BTC</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${(e.subsidy / 50) * 100}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mined by era's end</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-1 tabular-nums">
              {(e.minedByEnd / 1_000_000).toFixed(2)}M
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{pctMined.toFixed(2)}% of 21M</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-semibold text-gray-400 mb-1">
            <span>0</span>
            <span>Supply → 21,000,000 BTC</span>
          </div>
          <div className="h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${pctMined}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            Each halving adds only <strong className="text-gray-700 dark:text-gray-300">half</strong> of what
            the previous era added — the bar creeps toward 21M but never touches it. The final fractions
            trickle out until ~2140.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Lesson ────────────────────────────────────────────────────── */

export default function DifficultyAndHalving({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m3"
      lessonId="difficulty-and-halving"
      subtitle="Two feedback rules run Bitcoin's monetary engine: difficulty keeps blocks coming every ~10 minutes no matter what, and the halving cuts new supply in half every 4 years — forever."
      onNavigate={onNavigate}
    >
      <LessonSection title="The thermostat: difficulty adjustment" icon="🌡">
        <P>
          Mining is a lottery, so block times drift with the number of players. Bitcoin fixes this with a
          built-in thermostat: every <Strong>2,016 blocks (~2 weeks)</Strong>, each node recalculates the
          target. If the last 2,016 blocks came <Strong>too fast</Strong>, the target drops — hashes must be
          smaller, mining gets harder. Too slow, and the target rises.
        </P>
        <P>
          The goal is always the same: a <Strong>~10-minute average block interval</Strong>, whether the
          network has a thousand laptops or millions of industrial machines. When hash power doubles, blocks
          speed up only until the next retarget — then the difficulty doubles and the pace returns to 10
          minutes. More hash power buys <Strong>more security, not more throughput</Strong>.
        </P>
      </LessonSection>

      <LessonSection title="The countdown: the halving" icon="⏳">
        <P>
          The second rule controls issuance. Every <Strong>210,000 blocks — roughly 4 years</Strong> at
          10-minute intervals — the block subsidy is cut in half: 50 BTC in 2009, then 25 (2012), 12.5
          (2016), 6.25 (2020), and <Strong>3.125 BTC since April 2024</Strong>. This geometric decay is why
          total supply converges to exactly <Strong>21 million BTC</Strong> — the sum of the series, reached
          around 2140. Explore each era below:
        </P>
        <HalvingExplorer />
        <Callout type="tip" title="The one thing to remember">
          Difficulty adjusts <strong>supply of blocks</strong> (always ~10 minutes apart); the halving
          adjusts <strong>supply of coins</strong> (cut in half every 210,000 blocks). Together they make
          Bitcoin's issuance schedule predictable decades in advance — no meeting, no vote, no exceptions.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"More miners = faster blocks"',
              b: 'More miners = more security',
              explanation:
                'Extra hash power speeds up blocks only until the next 2,016-block retarget, then difficulty rises and the average returns to ~10 minutes. Permanently, added hash power raises the cost of attacking the chain — it never raises transaction capacity.',
            },
            {
              a: '"Mining ends in 2140"',
              b: '"New issuance ends in 2140"',
              explanation:
                'Roughly 99% of all BTC will exist by ~2035; the last slivers trickle out until ~2140. Mining itself never ends — miners keep ordering and securing blocks, paid by transaction fees instead of subsidy. Bitcoin doesn\'t "run out"; it just stops minting.',
            },
            {
              a: '"The cap is a line of code"',
              b: 'The cap is consensus',
              explanation:
                'Any miner could write software claiming a bigger subsidy — and every full node would reject those blocks. Changing 21M would require convincing essentially every node operator to switch rules, while dissenters simply keep the original chain. Code states the limit; consensus enforces it.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The fourth halving happened in <strong>April 2024</strong> at block 840,000, dropping the subsidy
          from 6.25 to <strong>3.125 BTC</strong>. Around <strong>19.7 million BTC</strong> (~94% of the cap)
          had been mined by then — the remaining ~6% takes another century, and an estimated 3–4 million of
          the mined coins are permanently lost to forgotten keys.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Difficulty adjustment', definition: 'Every 2,016 blocks (~2 weeks) the target is recalculated so blocks keep averaging ~10 minutes, whatever the hash power.' },
            { term: 'Retarget period', definition: 'The 2,016-block window whose actual duration is compared to the ideal two weeks to set the next difficulty.' },
            { term: 'Halving', definition: 'Every 210,000 blocks (~4 years) the block subsidy is cut in half — a programmatic supply shock.' },
            { term: 'Block subsidy', definition: 'The new BTC created per block. 50 → 25 → 12.5 → 6.25 → 3.125 (since April 2024) → … → 0 by ~2140.' },
            { term: '21 million cap', definition: 'The converging sum of the halving series: 210,000 × (50 + 25 + 12.5 + …) = 21M BTC. Enforced by every full node.' },
            { term: 'Fee market transition', definition: 'As the subsidy shrinks toward zero, transaction fees must gradually take over paying for the network\'s security.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Overnight, half of all miners shut down. What happens to Bitcoin in the long run?',
              options: [
                'Blocks permanently take ~20 minutes',
                'Blocks slow temporarily, then difficulty adjusts down and ~10-minute blocks resume',
                'The remaining miners split the missing miners\' rewards',
                'The network halts until hash power returns',
              ],
              correct: 1,
              explanation:
                'Blocks would average ~20 minutes only until the current 2,016-block window ends. The retarget then lowers difficulty to match the remaining hash power, restoring the ~10-minute average. The thermostat works in both directions.',
            },
            {
              question: 'Why does Bitcoin\'s supply stop at exactly 21 million?',
              options: [
                'Miners voted to stop issuance at that number',
                'It matches the amount of gold ever mined',
                'The subsidy halves every 210,000 blocks, and that geometric series sums to 21 million',
                'Nodes delete coins whenever supply exceeds the cap',
              ],
              correct: 2,
              explanation:
                '210,000 blocks × (50 + 25 + 12.5 + 6.25 + …) BTC converges to 21,000,000. The cap isn\'t a counter that stops minting — it\'s the mathematical consequence of the halving schedule, enforced because nodes reject any block claiming too much subsidy.',
            },
            {
              question: 'What has been the block subsidy since the April 2024 halving?',
              options: [
                '6.25 BTC',
                '3.125 BTC',
                '1.5625 BTC',
                '12.5 BTC',
              ],
              correct: 1,
              explanation:
                'The halvings so far: 50 (2009) → 25 (2012) → 12.5 (2016) → 6.25 (2020) → 3.125 BTC at block 840,000 in April 2024. The next halving, around 2028, cuts it to 1.5625 BTC.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'How often does difficulty adjust, and what is it aiming for?', answer: 'Every 2,016 blocks (~2 weeks). Each node compares how long those blocks actually took to the ideal two weeks and rescales the target so blocks keep averaging ~10 minutes.' },
            { question: 'State the halving rule and the first five subsidy values.', answer: 'Every 210,000 blocks (~4 years) the subsidy halves: 50 BTC (2009), 25 (2012), 12.5 (2016), 6.25 (2020), 3.125 (since April 2024). It converges to zero around 2140, capping supply at 21M.' },
            { question: 'What pays miners after the subsidy becomes negligible?', answer: 'Transaction fees. The block reward is always subsidy + fees; as halvings shrink the subsidy toward zero, fees must carry the security budget. Whether they will suffice is a genuinely open question.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Difficulty rule', value: 'Retarget every 2,016 blocks (~2 weeks) to hold a ~10-minute average block time.' },
          { label: 'Hash power effect', value: 'More hash power → temporarily faster blocks → difficulty rises → back to 10 min. Security up, speed unchanged.' },
          { label: 'Halving rule', value: 'Every 210,000 blocks (~4 years) the subsidy halves: 50 → 25 → 12.5 → 6.25 → 3.125 BTC (April 2024).' },
          { label: 'Supply cap', value: '21M BTC = the converging sum of the halving series. ~99% mined by ~2035; last fraction by ~2140.' },
          { label: 'Who enforces it', value: 'Every full node rejects blocks with excess subsidy. The cap is social consensus backed by code.' },
          { label: 'Endgame', value: 'Subsidy → 0, so transaction fees must eventually fund the network\'s security.' },
        ]}
      />
    </LessonLayout>
  )
}
