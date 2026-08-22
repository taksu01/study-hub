import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import SupplySchedule from '../../components/market/visuals/SupplySchedule'

export default function Scarcity({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m6"
      lessonId="scarcity"
      subtitle="21 million is not a marketing number — it falls out of a geometric series baked into the consensus rules. Here's how the supply schedule works, and why it can't bend when demand surges."
      onNavigate={onNavigate}
    >
      <LessonSection title="A supply curve written in advance" icon="📐">
        <P>
          Every other asset's supply responds to price. Gold at $10,000/oz would trigger a mining boom; a hot housing
          market triggers construction. Bitcoin is the odd one out: its issuance is <Strong>fixed in the consensus
          rules</Strong>. Blocks started paying miners 50 BTC each, and every 210,000 blocks (~4 years) that subsidy{' '}
          <Strong>halves</Strong> — 50 → 25 → 12.5 → 6.25 → 3.125, converging toward zero around 2140.
        </P>
        <P>
          Sum that infinite geometric series and you get <Strong>almost exactly 21 million BTC</Strong> — ever. No board
          meeting can raise it, because it isn't policy: it's a rule that every full node independently enforces. A block
          claiming even one extra satoshi of subsidy is simply rejected by the whole network.
        </P>
      </LessonSection>

      <LessonSection title="The schedule, era by era" icon="⛏">
        <P>
          Roughly <Strong>93.8% of all bitcoin was already mined by 2024</Strong>. The remaining ~1.3 million trickles
          out over the next century in ever-smaller drips. And because an estimated 3–4 million BTC sit behind lost keys,
          the effective supply is likely closer to 15–17 million:
        </P>
        <SupplySchedule />
        <Callout type="tip" title="The one thing to remember">
          Bitcoin's supply does not respond to demand. When demand rises, gold miners dig faster and central banks print
          — Bitcoin just gets more expensive. The issuance schedule is identical whether one person wants it or one
          billion do.
        </Callout>
      </LessonSection>

      <LessonSection title="Stock-to-flow: a framing, not a law" icon="📊">
        <P>
          <Strong>Stock-to-flow (S2F)</Strong> divides existing supply by annual new production. Gold scores ~62 (it
          would take 62 years of mining to double the stock); post-2024-halving Bitcoin scores ~120, and each halving
          roughly doubles it. It's a clean way to <Strong>quantify how hard an asset's supply is to expand</Strong>.
        </P>
        <P>
          Be careful with the popular next step, though. S2F has also been used as a <Strong>price prediction
          model</Strong> — and in that role it is widely contested: its price forecasts have missed badly since 2021,
          and critics note that scarcity alone says nothing about demand. Use S2F to compare supply hardness across
          assets; don't use it to read off a future price.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: 'Hard cap "in the code"',
              b: 'Hard cap by consensus',
              explanation:
                'The 21M limit lives in the software, but code alone protects nothing — anyone can edit a fork. What actually protects the cap is that tens of thousands of independent node operators run rules that reject inflation, and would keep following the original chain if a fork tried to change it. The cap is social consensus enforced by code, not code alone.',
            },
            {
              a: 'Scarcity',
              b: 'Value',
              explanation:
                'Fixed supply makes Bitcoin scarce; it does not by itself make Bitcoin valuable. Plenty of things are scarce and worthless (your signature on a napkin is one-of-a-kind). The investment thesis needs scarcity AND sustained demand. This lesson covers the supply half; the demand half is argued — not proven — in the rest of the module.',
            },
            {
              a: '"Mining ends in 2140"',
              b: '"Bitcoin ends in 2140"',
              explanation:
                'Only new issuance ends around 2140. The existing coins keep circulating, and miners are expected to be paid from transaction fees instead of subsidy. Whether fees alone will fund enough security is a genuine open question — the Risks lesson takes it seriously.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Hard cap', definition: 'The 21,000,000 BTC maximum, enforced independently by every full node. A block that mints more is invalid by definition.' },
            { term: 'Halving', definition: 'Every 210,000 blocks (~4 years) the block subsidy is cut in half — a pre-scheduled reduction in new supply.' },
            { term: 'Block subsidy', definition: 'Newly created BTC paid to the miner of each block. 3.125 BTC since the April 2024 halving. Distinct from transaction fees.' },
            { term: 'Stock-to-flow (S2F)', definition: 'Existing supply ÷ annual new production. Useful for comparing supply hardness; contested as a price model.' },
            { term: 'Lost coins', definition: 'BTC behind permanently lost keys — estimated 3–4 million, including Satoshi\'s untouched ~1M. Shrinks effective supply.' },
            { term: 'Supply inelasticity', definition: 'Bitcoin issuance cannot increase in response to higher prices — the property that makes demand shocks show up entirely in price.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Why is the total supply exactly ~21 million BTC?',
              options: [
                'Satoshi picked a round number that sounded scarce',
                'It is the sum of a geometric series: a 50 BTC subsidy halving every 210,000 blocks converges there',
                'Miners voted on the limit in 2012',
                'It matches the number of ounces of gold ever mined',
              ],
              correct: 1,
              explanation:
                'The cap is a mathematical consequence, not a chosen constant: 210,000 × (50 + 25 + 12.5 + …) converges to just under 21 million. Change any parameter of the halving schedule and you change the cap — which is why nodes enforce the schedule itself.',
            },
            {
              question: 'Gold hits $10,000/oz and Bitcoin hits an equivalent demand surge. What happens to each supply?',
              options: [
                'Both supplies expand as producers respond to price',
                'Gold mining accelerates and supply grows faster; Bitcoin issuance stays exactly on schedule',
                'Bitcoin miners produce blocks faster to capture the higher price',
                'Both supplies are fixed, so nothing changes for either',
              ],
              correct: 1,
              explanation:
                'Gold supply is price-elastic — higher prices fund more exploration and extraction. Bitcoin is inelastic: even if hash rate doubles, the difficulty adjustment keeps blocks at ~10 minutes and issuance on schedule. Demand shocks can only move Bitcoin\'s price, never its supply.',
            },
            {
              question: 'What is the strongest criticism of using stock-to-flow as a Bitcoin price model?',
              options: [
                'The S2F ratio is impossible to calculate for Bitcoin',
                'Bitcoin\'s stock-to-flow is actually lower than gold\'s',
                'Scarcity measures supply only — the model assumes demand, and its price forecasts have missed badly since 2021',
                'The halving schedule changes too often for the ratio to be stable',
              ],
              correct: 2,
              explanation:
                'S2F is well-defined and Bitcoin\'s is genuinely high (~120 post-2024). The problem is inference: price needs demand as well as supply, and the model\'s predictions have diverged sharply from reality. It survives as a scarcity framing, not a price oracle.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Describe the halving schedule and what it converges to.', answer: 'The block subsidy started at 50 BTC and halves every 210,000 blocks (~4 years): 50 → 25 → 12.5 → 6.25 → 3.125 → … reaching effectively zero around 2140. The sum converges to just under 21 million BTC.' },
            { question: 'Who enforces the 21M cap, and what happens if a miner tries to exceed it?', answer: 'Every full node independently validates subsidy amounts. A block claiming too much is rejected by all honest nodes, so the miner wastes the electricity spent producing it. Changing the cap would require virtually all node operators to voluntarily adopt new rules.' },
            { question: 'Why is effective circulating supply lower than the ~19.7M mined?', answer: 'An estimated 3–4 million BTC are permanently inaccessible — lost keys, discarded drives, and Satoshi\'s ~1M coins that have never moved — leaving perhaps 15–17 million actually available.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Hard cap', value: '~21,000,000 BTC — the converged sum of the halving series, enforced by every node.' },
          { label: 'Halving', value: 'Every 210,000 blocks (~4 yrs) subsidy halves. Post-April 2024: 3.125 BTC/block.' },
          { label: 'Mined so far', value: '~19.7M by 2024 (93.8%); the last ~1.3M drips out over the next century.' },
          { label: 'Lost coins', value: 'Est. 3–4M gone forever → effective supply nearer 15–17M.' },
          { label: 'Stock-to-flow', value: 'Bitcoin ~120 vs gold ~62. Good scarcity comparison; contested as a price model.' },
          { label: 'Core property', value: 'Supply is demand-inelastic: demand shocks move price only, never issuance.' },
        ]}
      />
    </LessonLayout>
  )
}
