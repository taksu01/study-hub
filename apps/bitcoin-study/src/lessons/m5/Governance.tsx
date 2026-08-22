import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'

export default function Governance({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="governance"
      subtitle="Bitcoin has no CEO, no board, no vote. So who decides the rules? The 2015–2017 Block Size Wars answered that question — and the answer wasn't miners."
      onNavigate={onNavigate}
    >
      <LessonSection title="How Bitcoin's rules actually change" icon="🏛️">
        <P>
          There is no committee that upgrades Bitcoin. Changes start as <Strong>BIPs</Strong> (Bitcoin
          Improvement Proposals) — anyone can write one. Developers publish code, miners may signal readiness,
          but nothing becomes a rule until <Strong>node operators choose to run software that enforces
          it</Strong>. Adoption requires <Strong>rough consensus</Strong>: broad agreement, no formal vote.
        </P>
        <P>
          Each group holds a different, limited power. Developers write code but can't deploy it. Miners produce
          blocks and order transactions, but nodes decide whether those blocks are <em>valid</em> — an invalid
          block earns its miner nothing. Exchanges control fiat on-ramps, not the protocol. From 2015 to 2017,
          this balance of power was stress-tested for real.
        </P>
      </LessonSection>

      <LessonSection title="The Block Size Wars, blow by blow" icon="⚔️">
        <P>
          Blocks were filling and fees rising. One camp — mostly miners and large businesses — wanted a{' '}
          <Strong>hard fork to bigger blocks</Strong> (more on-chain throughput, but heavier nodes and more
          centralized validation). The other — mostly developers and users — wanted <Strong>SegWit as a soft
          fork</Strong>, keeping the base layer small and scaling via Layer 2:
        </P>
        <StepFlow
          steps={[
            { label: '2015 — Blocks fill, tempers flare', detail: 'Fees rise as block space runs short. Bitcoin XT proposes 8 MB blocks via hard fork — rejected by the community.' },
            { label: '2016 — Big-block proposals keep failing', detail: 'Bitcoin Classic (2 MB) and Bitcoin Unlimited (no fixed limit) both fizzle. The Hong Kong Agreement promises SegWit + a 2 MB hard fork; miners never honor it.' },
            { label: 'Feb 2017 — The New York Agreement (SegWit2x)', detail: 'Miners and companies representing most hash power agree to activate SegWit AND hard-fork to 2 MB blocks within six months — negotiated behind closed doors, without user consent.' },
            { label: 'May 2017 — Users escalate: BIP 148 (UASF)', detail: 'The User-Activated Soft Fork: from Aug 1, BIP 148 nodes will REJECT any block not signaling SegWit. Ordinary node operators — not miners — start enforcing the upgrade.' },
            { label: 'Aug 2017 — Miners blink; SegWit locks in', detail: 'Facing a chain where their non-signaling blocks would be worthless, miners rush to signal. SegWit locks in within days. Big-block proponents hard-fork away as Bitcoin Cash (8 MB blocks).' },
            { label: 'Nov 2017 — SegWit2x collapses', detail: 'The 2 MB hard-fork half of the NYA is cancelled days before activation — insufficient consensus, fierce community opposition. The corporate agreement dies; the user-enforced upgrade lives.' },
          ]}
        />
        <Callout type="warning" title="The one thing to remember">
          The UASF settled Bitcoin's governance question: miners propose blocks, but full nodes define what
          counts as valid Bitcoin. Users running nodes — not hash power, not companies, not developers — have
          the final say.
        </Callout>
      </LessonSection>

      <LessonSection title="Why miners had to fold" icon="🧲">
        <P>
          Hash power looks like control, but it isn't. A miner can build any block it likes — if the economic
          majority of nodes rejects that block, the reward is unspendable on the chain people actually use.
          Mining a chain nobody validates is burning electricity for tokens no exchange will credit.{' '}
          <Strong>Economic self-interest forced compliance</Strong> with the rules users enforced.
        </P>
        <P>
          The market then graded the split. Every BTC holder received equal BCH at the fork; BCH opened around
          10% of Bitcoin's price and slid to roughly <Strong>0.3% by 2024</Strong>. Given a free choice between
          bigger blocks and a conservative, decentralized base layer, holders overwhelmingly kept the original
          chain. The hard fork worked as an <Strong>escape valve</Strong>: those who disagreed could leave
          without holding the rest of the network hostage.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Miners run Bitcoin"',
              b: 'Nodes enforce the rules',
              explanation:
                'Miners choose transaction ordering and produce blocks — real but bounded power. Validity is decided by every full node independently. SegWit2x had overwhelming miner and corporate backing and still died, because node operators refused to follow.',
            },
            {
              a: '"Core devs decide"',
              b: 'Users choose what to run',
              explanation:
                'Bitcoin Core is the dominant implementation, but developers cannot force an upgrade onto anyone. Code only becomes consensus when node operators voluntarily install and run it. Users can — and during the UASF, did — run alternative rule-enforcing software.',
            },
            {
              a: 'Soft fork',
              b: 'Hard fork',
              explanation:
                'A soft fork tightens rules; old nodes still accept the new blocks (SegWit, Taproot). A hard fork loosens or changes rules; old nodes reject the new blocks, splitting the chain unless everyone upgrades (Bitcoin Cash). That is why contentious changes tend to ship as soft forks.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The base block size question is settled, but governance debates continue — Ordinals/inscriptions data
          usage, OP_RETURN policy, long-term fee-market sustainability. The mechanism hasn't changed:{' '}
          <strong>rough consensus, enforced by node operators</strong>. Taproot's smooth, near-unanimous 2021
          activation showed the same process working without the drama.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'BIP', definition: 'Bitcoin Improvement Proposal — the open, formal process for proposing protocol changes. Anyone can submit one.' },
            { term: 'Rough consensus', definition: 'Bitcoin\'s decision model: no vote, no committee — broad agreement among developers, node operators, and users before deployment.' },
            { term: 'UASF', definition: 'User-Activated Soft Fork — nodes enforce a new rule on a deadline regardless of miner signaling. BIP 148 forced SegWit\'s activation.' },
            { term: 'Soft fork', definition: 'Backward-compatible rule tightening; old nodes still accept new blocks. SegWit and Taproot both shipped this way.' },
            { term: 'Hard fork', definition: 'Non-backward-compatible change; old nodes reject new blocks, splitting the chain unless adoption is universal.' },
            { term: 'Bitcoin Cash (BCH)', definition: 'The August 2017 hard fork with 8 MB blocks — the big-block camp\'s exit, later fading to a fraction of a percent of BTC\'s value.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'What did BIP 148 (the UASF) actually threaten?',
              options: [
                'To ban non-compliant miners from the P2P network permanently',
                'That participating full nodes would reject any block not signaling SegWit after Aug 1, 2017',
                'To double transaction fees for legacy transactions',
                'To hard-fork Bitcoin onto a new proof-of-stake chain',
              ],
              correct: 1,
              explanation:
                'BIP 148 nodes committed to treating non-signaling blocks as invalid from a fixed date. Miners producing such blocks would earn rewards worthless to the economic majority — so they rushed to signal, and SegWit locked in within days.',
            },
            {
              question: 'Why couldn\'t SegWit2x\'s 2 MB hard fork succeed despite majority hash power and major company support?',
              options: [
                'The code had a critical bug that was found too late',
                'Regulators blocked the upgrade',
                'Node operators and users refused to run it — blocks valid only under rules nobody validates are economically worthless',
                'Miners lost interest once fees dropped',
              ],
              correct: 2,
              explanation:
                'Hash power can produce blocks, but it cannot make users accept them. Without the economic majority of nodes enforcing the new rules, SegWit2x coins would trade nowhere that mattered. It was cancelled in November 2017 for lack of consensus.',
            },
            {
              question: 'What distinguishes a soft fork from a hard fork?',
              options: [
                'Soft forks are temporary; hard forks are permanent',
                'Soft forks tighten rules and stay backward compatible; hard forks change rules so old nodes reject the new blocks',
                'Soft forks are decided by miners; hard forks by developers',
                'Soft forks only affect wallets, not nodes',
              ],
              correct: 1,
              explanation:
                'A soft fork narrows what is valid, so un-upgraded nodes still accept the new blocks (SegWit, Taproot). A hard fork widens or changes validity, so old nodes reject new blocks — producing a permanent chain split unless everyone upgrades (Bitcoin Cash).',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Map the powers: what do developers, miners, exchanges, and full nodes each control?', answer: 'Developers write reference software but cannot deploy it. Miners produce blocks and order transactions but cannot define validity. Exchanges control fiat access, not the protocol. Full nodes (users) enforce the rules — they are the ultimate arbiter of what counts as valid Bitcoin.' },
            { question: 'What was the New York Agreement, and how did each half of it end?', answer: 'A Feb 2017 pact by miners and companies: activate SegWit (soft fork) plus a 2 MB hard fork within six months. SegWit activated in August 2017 — pushed by the UASF, not the NYA. The 2 MB half (SegWit2x) was cancelled in November 2017 for lack of community consensus.' },
            { question: 'What role did the Bitcoin Cash fork play in resolving the conflict?', answer: 'It was the escape valve: the big-block camp exited to their own chain (8 MB blocks) instead of forcing changes on everyone. Every holder got coins on both chains, and the market priced the outcome — BCH fell to roughly 0.3% of BTC\'s value by 2024.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The war', value: '2015–2017: big-block hard fork vs SegWit soft fork + Layer 2 scaling.' },
          { label: 'The turning point', value: 'BIP 148 UASF — nodes vowed to reject non-signaling blocks after Aug 1, 2017.' },
          { label: 'The outcome', value: 'SegWit locked in Aug 2017; SegWit2x cancelled Nov 2017; BCH forked off.' },
          { label: 'The lesson', value: 'Users running full nodes — not miners or companies — have the final say.' },
          { label: 'Fork types', value: 'Soft = tighter rules, backward compatible. Hard = old nodes reject → chain split.' },
          { label: 'The process', value: 'BIP → rough consensus → node adoption. No CEO, no vote, no capture.' },
        ]}
      />
    </LessonLayout>
  )
}
