import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, StepFlow,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import NodesVisual from '../../components/visuals/NodesVisual'

export default function NodesAndNetwork({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m4"
      lessonId="nodes-and-network"
      subtitle="There is no Bitcoin server. Thousands of independent computers gossip transactions to each other and re-check every rule — and it's these nodes, not miners, that actually enforce Bitcoin's law."
      onNavigate={onNavigate}
    >
      <LessonSection title="A network with no center" icon="🕸">
        <P>
          When Alice's wallet broadcasts a transaction, it doesn't upload it to "Bitcoin HQ" — there isn't one.
          Her node hands it to a few connected peers, each peer validates it and hands it to <Strong>their</Strong>{' '}
          peers, and within seconds it has rippled across the globe. This is a <Strong>gossip protocol</Strong>:
          news spreads the way rumors do, neighbor to neighbor.
        </P>
        <P>
          Each node keeps roughly <Strong>8–125 peer connections</Strong>, found via DNS seeds and peer exchange.
          No node is special, so there is nothing to shut down, seize, or censor at the source. Take out any
          machine — even thousands — and the gossip simply routes around the hole.
        </P>
      </LessonSection>

      <LessonSection title="Not all nodes are equal" icon="⊛">
        <P>
          The crucial split is between <Strong>full nodes</Strong>, which download and verify every block and
          transaction since 2009 and trust nobody, and <Strong>SPV light clients</Strong> (most phone wallets),
          which fetch only block headers plus Merkle proofs — they can confirm a transaction was{' '}
          <Strong>included</Strong> in a block, but they trust miners that the block itself is valid. Explore both
          the gossip flow and the node types below:
        </P>
        <NodesVisual />
        <Callout type="tip" title="One sentence to remember">
          Miners <em>propose</em> blocks; full nodes <em>enforce</em> the rules — a block that breaks any rule is
          simply ignored by every full node, no matter how much energy was spent mining it.
        </Callout>
      </LessonSection>

      <LessonSection title="Booting a full node, step by step" icon="👣">
        <P>
          Running your own node means verifying your own money instead of trusting someone else's server.
          Here's what happens when you first start one:
        </P>
        <StepFlow
          steps={[
            { label: 'Find peers', detail: 'The node contacts hardcoded DNS seeds to get a first list of peers, then learns more addresses from the peers themselves. Self-organizing — no registration.' },
            { label: 'Initial Block Download (IBD)', detail: 'It downloads every block from the January 2009 genesis block onward — hundreds of gigabytes. This can take hours to days depending on hardware.' },
            { label: 'Verify everything', detail: 'Every signature, every amount, every rule, on every transaction in history. Nothing is taken on faith — this is the whole point of a full node.' },
            { label: 'Stay in sync', detail: 'After IBD, the node validates each new block as gossip delivers it (~every 10 minutes), and relays valid transactions and blocks to its own peers.' },
            { label: 'Optionally prune', detail: 'A pruned node deletes old block data after verifying it, shrinking disk use to a few GB. Verification is identical — only storage differs.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Miners control Bitcoin"',
              b: 'Full nodes enforce the rules',
              explanation:
                'Miners only order transactions into blocks. If a miner produced a block claiming a 100 BTC subsidy, every full node would reject it instantly and the miner would have burned electricity for nothing. Miners follow the rules because breaking them earns exactly zero.',
            },
            {
              a: '"A wallet"',
              b: '"A node"',
              explanation:
                'A wallet manages keys and builds transactions. A node validates and relays blocks. Your phone wallet is almost certainly NOT a node — it asks someone else\'s node what your balance is. Running your own full node means auditing the ledger yourself instead of trusting a report.',
            },
            {
              a: 'Full node',
              b: 'SPV light client',
              explanation:
                'A full node verifies every rule on every transaction and trusts no one. An SPV client downloads only headers and checks Merkle proofs of inclusion — it assumes the chain with the most work is valid. Lighter, but it outsources rule-checking to others.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Full node', definition: 'Downloads and validates every block and transaction since genesis. Independently enforces all consensus rules — trusts no one.' },
            { term: 'SPV / light client', definition: 'Downloads block headers plus Merkle proofs. Verifies a transaction was included in a block, but trusts miners for validity.' },
            { term: 'Pruned node', definition: 'A full node that verifies everything but discards old block data afterward to save disk space.' },
            { term: 'Gossip protocol', definition: 'How data spreads: each node validates a transaction or block, then relays it to its connected peers. No central hub.' },
            { term: 'IBD (Initial Block Download)', definition: 'A new node\'s first sync — downloading and verifying the entire chain from the 2009 genesis block.' },
            { term: 'Compact blocks (BIP 152)', definition: 'A relay optimization: send short transaction IDs instead of full data the receiver likely already has in its mempool.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'A miner mines a block that awards itself twice the allowed subsidy. What happens?',
              options: [
                'The block is accepted — miners set the rules',
                'Every full node rejects the block, and the miner\'s work is wasted',
                'A vote is held among the largest mining pools',
                'The block is accepted but the extra coins are frozen',
              ],
              correct: 1,
              explanation:
                'Full nodes check every rule on every block, including the subsidy amount. An invalid block is simply ignored — no vote, no negotiation. The miner spent real electricity and earned nothing, which is exactly why miners follow the rules.',
            },
            {
              question: 'What does an SPV light client actually verify?',
              options: [
                'Every consensus rule, same as a full node but slower',
                'That a transaction was included in a block, via headers and Merkle proofs',
                'Nothing — it fully trusts a central Bitcoin server',
                'Only transactions above a certain amount',
              ],
              correct: 1,
              explanation:
                'SPV clients download block headers and use Merkle proofs to confirm inclusion. That proves "this transaction is in the chain with the most work" — but not that every rule was followed. Full validation is outsourced to whoever mined the block.',
            },
            {
              question: 'How does a freshly broadcast transaction reach the whole network?',
              options: [
                'The wallet uploads it to a master node that distributes it',
                'It is sent directly to the largest mining pool',
                'Each node validates it, adds it to its mempool, and relays it to its peers — gossip',
                'Miners scan every wallet on the internet for pending payments',
              ],
              correct: 2,
              explanation:
                'There is no master node or central server. The transaction hops peer to peer: validate → mempool → relay. Within seconds most of the network has seen it — and no single machine was essential to the spread.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What is the key difference between a full node and an SPV client?', answer: 'A full node downloads and verifies every block and transaction, enforcing all rules itself. An SPV client downloads only headers plus Merkle proofs — it checks inclusion but trusts the longest (most-work) chain to be valid.' },
            { question: 'Who ultimately enforces Bitcoin\'s rules — and why not miners?', answer: 'Full nodes. Miners only propose blocks; any block that breaks a rule is rejected by every full node, so the mining work is wasted. Validation and mining are distinct roles.' },
            { question: 'What happens during Initial Block Download, and why does it take so long?', answer: 'The new node downloads and verifies every block from the 2009 genesis block onward — hundreds of GB and every signature in history. Hours to days, but afterward the node trusts nothing it hasn\'t checked itself.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Topology', value: 'Peer-to-peer gossip, ~8–125 peers per node. No central server, no master node.' },
          { label: 'Full node', value: 'Downloads and verifies everything since genesis. Trusts no one.' },
          { label: 'SPV client', value: 'Headers + Merkle proofs only. Checks inclusion, trusts miners for validity.' },
          { label: 'Pruned node', value: 'Full verification, then deletes old blocks to save disk.' },
          { label: 'Power split', value: 'Miners propose blocks; full nodes enforce the rules. Invalid blocks = ignored.' },
          { label: 'Why run one', value: 'Verify your own transactions instead of trusting someone else\'s node. Wallet ≠ node.' },
        ]}
      />
    </LessonLayout>
  )
}
