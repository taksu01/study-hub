import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import LightningVisual from '../../components/visuals/LightningVisual'

export default function Lightning({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m5"
      lessonId="lightning"
      subtitle="The base layer settles ~7 transactions per second — on purpose. Lightning is how Bitcoin handles coffee money: lock funds once on-chain, then pay instantly off-chain, thousands of times."
      onNavigate={onNavigate}
    >
      <LessonSection title="Why Layer 1 can't buy you coffee" icon="☕">
        <P>
          Bitcoin's base layer produces a block every ~10 minutes and handles roughly{' '}
          <Strong>7 transactions per second</Strong>. That's not a bug — decentralization and security were
          deliberately prioritized over throughput, so anyone can run a full node. But it means the base layer
          can never settle millions of small daily payments directly.
        </P>
        <P>
          The <Strong>Lightning Network</Strong> is a <Strong>Layer 2</Strong> built on top of Bitcoin: keep
          most payments off-chain, and touch the base layer only to open channels, close them, or resolve
          disputes. Base layer = settlement and security; Lightning = speed and volume. It's a complement, not a
          replacement.
        </P>
      </LessonSection>

      <LessonSection title="Payment channels: a bar tab with cryptography" icon="🍺">
        <P>
          A <Strong>payment channel</Strong> works like a bar tab. Alice and Bob lock, say, 0.1 BTC into a{' '}
          <Strong>2-of-2 multisig</Strong> on-chain (the <Strong>funding transaction</Strong> — opening the
          tab). Then they trade <Strong>signed commitment transactions</Strong> off-chain, each one
          redistributing the balance: instant, free, private, and as often as they like. Closing the channel
          settles the final balance in one on-chain transaction — the tab is paid.
        </P>
        <P>
          Only the <Strong>latest</Strong> state counts. Old states are revocable: if Bob tries to cheat by
          broadcasting a stale balance that favored him, Alice can publish a{' '}
          <Strong>penalty transaction</Strong> and take <em>everything</em> in the channel. Cheating is not just
          detectable — it's economically suicidal. Explore the lifecycle, routing, and the L1 comparison below:
        </P>
        <LightningVisual />
      </LessonSection>

      <LessonSection title="Routing: paying strangers through HTLCs" icon="🔀">
        <P>
          You don't need a channel with everyone. If Alice wants to pay Dave, she can route through Bob and
          Carol using <Strong>HTLCs</Strong> (Hash Time-Locked Contracts). Dave generates a secret R and hands
          Alice its hash; each hop then promises "I'll pay you if you show me R, before time T." When Dave
          reveals R to claim his payment, the secret unzips backward through the route — every hop gets paid, or
          nobody does. <Strong>Atomic</Strong>, with no trusted middlemen.
        </P>
        <P>
          The catch is <Strong>liquidity</Strong>: a channel can only send up to the balance sitting on the
          sender's side. A 0.1 BTC channel where Alice holds 0.09 lets her send 0.09 toward Bob — but Bob can
          only send 0.01 back. Payments fail when no route has enough capacity in the right direction, which is
          why node operators care about balanced channels.
        </P>
        <Callout type="tip" title="The one thing to remember">
          Lightning = lock funds on-chain once, transact off-chain endlessly, settle on-chain once. Security
          comes from the base layer: any cheat can be punished with an on-chain penalty transaction.
        </Callout>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"Lightning replaces Bitcoin"',
              b: 'Lightning is anchored to it',
              explanation:
                'Every channel opens and closes with a real Bitcoin transaction, and every dispute is settled by the base layer. Remove Bitcoin and Lightning has no security. L1 does settlement; L2 does volume.',
            },
            {
              a: '"Any payment always routes"',
              b: 'Liquidity limits routes',
              explanation:
                'A payment needs a path where every hop has enough balance pointing in the right direction. Channel capacity is not the same as available balance — a route can exist on the map yet fail for lack of directional liquidity.',
            },
            {
              a: '"Off-chain = less safe"',
              b: 'Different-safe',
              explanation:
                'Channel funds are protected by revocable states and penalty transactions enforced on-chain. The trade-off: you (or a watchtower service acting for you) must be online often enough to catch a counterparty broadcasting an old state.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          Lightning only became viable after <strong>SegWit (August 2017)</strong> fixed transaction
          malleability — pre-signed commitment transactions need immutable txids. Since{' '}
          <strong>Taproot (November 2021)</strong>, cooperative channel closes can look like ordinary single-key
          payments on-chain, making channels harder for observers to even identify.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Payment channel', definition: 'A 2-of-2 multisig arrangement letting two parties transact off-chain, touching the chain only to open and close.' },
            { term: 'Funding transaction', definition: 'The on-chain transaction that opens a channel by locking bitcoin in the multisig.' },
            { term: 'Commitment transaction', definition: 'An off-chain signed transaction encoding the current balance. Old states are revocable — publishing one triggers a penalty.' },
            { term: 'HTLC', definition: 'Hash Time-Locked Contract: "paid if you reveal the secret, refunded after a deadline." Chains hops into one atomic payment.' },
            { term: 'Liquidity', definition: 'The balance available to send in a given direction of a channel. Determines whether a route can carry a payment.' },
            { term: 'Onion routing', definition: 'Each hop learns only its immediate neighbors, never the full path — Tor-style privacy for payments.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'How many on-chain transactions does a channel need for 500 Lightning payments between Alice and Bob?',
              options: [
                '500 — one per payment',
                '2 — one to open the channel, one to close it',
                'None — Lightning never touches the chain',
                '10 — one per block interval',
              ],
              correct: 1,
              explanation:
                'That is the whole point of a channel: one funding transaction opens it, then any number of off-chain balance updates, then one closing transaction settles the final state. 500 payments, 2 on-chain footprints.',
            },
            {
              question: 'What stops Bob from broadcasting an old channel state where he had more money?',
              options: [
                'Miners check channel histories and reject stale states',
                'Commitment transactions expire after 24 hours',
                'Old states are revocable — Alice can publish a penalty transaction and claim ALL the channel funds',
                'The Lightning software refuses to sign old states',
              ],
              correct: 2,
              explanation:
                'Every balance update revokes the previous state. If Bob broadcasts a stale commitment, Alice (or her watchtower) uses the revocation secret to sweep the entire channel balance. Cheating risks everything to gain a little.',
            },
            {
              question: 'Alice routes a payment to Dave via Bob and Carol. What guarantees Bob can\'t just pocket the money?',
              options: [
                'Bob signed a legal agreement with the network',
                'HTLCs — each hop only gets paid by revealing the secret R, which simultaneously entitles the next hop to claim its incoming payment',
                'Alice pays Bob only after Dave confirms receipt by message',
                'Routing nodes post a security deposit with miners',
              ],
              correct: 1,
              explanation:
                'The same hash locks every hop. Bob can only claim Alice\'s payment by presenting R — and he learns R only when Carol claims from him, which happens only when Dave claims from Carol. Either the secret propagates and everyone is paid, or the timeouts refund everyone.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What on-chain transaction opens a Lightning channel, and what does it create?', answer: 'The funding transaction — a standard Bitcoin transaction locking funds in a 2-of-2 multisig output. It is the only on-chain step needed to open a channel.' },
            { question: 'Walk through how an HTLC route delivers a payment atomically.', answer: 'The recipient generates secret R and shares hash(R). Each hop forwards a conditional payment: "yours if you show R before time T." The recipient reveals R to claim the last hop, and the secret propagates backward, unlocking every hop. If R never appears, timeouts refund everyone.' },
            { question: 'Why might a Lightning payment fail even when channels connect sender and receiver?', answer: 'Insufficient directional liquidity. Each hop must have enough balance on the sending side of its channel. Total channel capacity does not tell you how it is split between the two ends.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'What it is', value: 'Layer 2 on Bitcoin: instant, near-free payments off-chain, anchored on-chain.' },
          { label: 'Channel lifecycle', value: 'Fund on-chain (2-of-2 multisig) → update off-chain → close on-chain.' },
          { label: 'Anti-cheat', value: 'Old states revocable; broadcasting one forfeits the whole channel balance.' },
          { label: 'Routing', value: 'HTLCs chain conditional payments hop-by-hop — atomic, all-or-nothing.' },
          { label: 'Liquidity', value: 'Channels have per-direction capacity; payments fail without a viable route.' },
          { label: 'Division of labor', value: 'L1 = settlement + security. Lightning = speed + volume. Complement, not replacement.' },
        ]}
      />
    </LessonLayout>
  )
}
