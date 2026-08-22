import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import WalletsVisual from '../../components/visuals/WalletsVisual'

export default function KeysAndWallets({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m4"
      lessonId="keys-and-wallets"
      subtitle="In Bitcoin there is no account, no ID check, no 'forgot password' link. Ownership is one thing only: control of a private key. Everything about wallets follows from that."
      onNavigate={onNavigate}
    >
      <LessonSection title="The key IS the ownership" icon="🗝">
        <P>
          A <Strong>private key</Strong> is just a random 256-bit number. Whoever can use it to sign a valid
          transaction can spend the coins it controls — full stop. There is no identity attached, no recovery
          department, no appeal. If Alice's key leaks, the thief <Strong>is</Strong> Alice as far as the
          protocol can tell.
        </P>
        <P>
          From that secret number, a <Strong>one-way chain</Strong> is derived: private key → public key
          (elliptic-curve multiplication) → address (hashing + encoding, e.g. <Strong>bc1q…</Strong>). Each arrow
          is easy forward and computationally impossible backward — so you can share your address with the whole
          world without exposing the key that spends from it.
        </P>
      </LessonSection>

      <LessonSection title="What a wallet actually is" icon="👛">
        <P>
          Your wallet does not "hold bitcoin" — the coins (UTXOs) live on the blockchain, on every node's disk.
          A wallet is software that does three jobs: <Strong>manages keys</Strong>, <Strong>tracks which UTXOs
          your keys can spend</Strong>, and <Strong>builds and signs transactions</Strong>. Modern wallets are{' '}
          <Strong>HD (Hierarchical Deterministic)</Strong>: a single 12- or 24-word seed phrase deterministically
          generates an entire tree of key pairs, so one backup covers unlimited fresh addresses. Explore all
          three ideas below:
        </P>
        <WalletsVisual />
        <Callout type="warning" title="The one thing to remember">
          Your seed phrase IS your bitcoin. Anyone who reads it can spend everything; if you lose it (and the
          device), everything is gone forever. Write it on paper or metal, never in a photo, cloud note, or email.
        </Callout>
      </LessonSection>

      <LessonSection title="Custody: who holds the keys?" icon="🏦">
        <P>
          <Strong>Self-custody</Strong> means you hold the keys: nobody can freeze your funds, and nobody can
          save you if you lose them. <Strong>Custodial</Strong> means an exchange holds the keys and you hold an
          IOU — convenient, but they can be hacked, freeze your account, or go bankrupt. Hence the maxim:{' '}
          <Strong>"not your keys, not your coins."</Strong>
        </P>
        <P>
          Two tools harden self-custody. A <Strong>hardware wallet</Strong> keeps keys on an offline device that
          signs transactions internally, so even a malware-ridden laptop never sees the key. <Strong>Multisig</Strong>{' '}
          requires M-of-N keys to spend (say, 2-of-3 kept in different places) — one stolen or lost key no longer
          means disaster.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"My wallet holds my bitcoin"',
              b: 'Your wallet holds your keys',
              explanation:
                'The coins are UTXOs recorded on the blockchain, replicated on every full node. The wallet is a key manager, UTXO tracker, and transaction builder. Delete the app and your bitcoin is untouched — as long as you still have the seed phrase.',
            },
            {
              a: '"I forgot my seed — support can reset it"',
              b: 'The seed IS the backup',
              explanation:
                'There is no reset. The seed phrase deterministically regenerates every key in the wallet; nothing else can. Lose the seed and the device, and the coins are unspendable forever — the protocol has no customer-service layer, by design.',
            },
            {
              a: '"One address = my account number"',
              b: 'Fresh address per payment',
              explanation:
                'An HD wallet derives a new address for every receive and every change output — that\'s why your address "keeps changing." Reusing one address links all your payments together publicly. All addresses from the same seed are recovered by the same 12/24 words.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          The dominant address format today is <strong>native SegWit</strong> (<strong>bc1q…</strong>, derivation
          path m/84'), with <strong>Taproot</strong> addresses (<strong>bc1p…</strong>) growing since Taproot
          activated in <strong>November 2021</strong>. Seed phrases follow the BIP-39 standard, so a 12/24-word
          backup from one wallet can typically be restored in another vendor's wallet.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Private key', definition: 'A secret 256-bit number. Signing with it is spending authority — there is no other proof of ownership.' },
            { term: 'Address', definition: 'A hashed, encoded form of the public key (e.g. bc1q…). Safe to share; cannot be reversed to the key.' },
            { term: 'Seed phrase', definition: '12 or 24 BIP-39 words encoding the master seed. Regenerates the entire HD key tree — the one backup that matters.' },
            { term: 'HD wallet', definition: 'Hierarchical Deterministic wallet: one seed derives unlimited key pairs and fresh addresses (BIP-32/39/44/84).' },
            { term: 'xpub', definition: 'Extended public key — derives all of an account\'s addresses for watching or auditing, with zero spending power.' },
            { term: 'Multisig', definition: 'A script requiring M of N keys to spend (e.g. 2-of-3). Removes the single point of failure of one key.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Bob\'s phone with his wallet app falls in a lake, but his 24-word seed phrase is written down at home. What happened to his bitcoin?',
              options: [
                'Gone — the keys were only on the phone',
                'Nothing — the coins are on the blockchain, and the seed regenerates every key on a new device',
                'Recoverable only if he contacts the wallet company within 30 days',
                'Half is lost, because change addresses cannot be recovered',
              ],
              correct: 1,
              explanation:
                'The bitcoin never lived on the phone — UTXOs live on the blockchain. The seed phrase deterministically regenerates the full HD tree, including change addresses, on any compatible wallet. The phone was just a keyholder.',
            },
            {
              question: 'Why is it safe to publish your address but catastrophic to reveal your seed phrase?',
              options: [
                'It isn\'t — addresses should also be kept secret',
                'Addresses expire after one use, so leaks don\'t matter',
                'Derivation is one-way: an address cannot be reversed into a key, but the seed derives every private key',
                'The seed phrase contains your government-registered identity',
              ],
              correct: 2,
              explanation:
                'Private key → public key → address uses one-way functions; going backward is computationally infeasible. The seed goes the other direction: it generates every private key in the wallet, so revealing it hands over everything.',
            },
            {
              question: 'You give your accountant your wallet\'s xpub. What can she do with it?',
              options: [
                'Spend from the account if she also knows one address',
                'Derive and watch every address in the account, but never spend',
                'Nothing — an xpub is just a receipt',
                'Reset the seed phrase for the account',
              ],
              correct: 1,
              explanation:
                'An extended public key derives all child public keys, and therefore all addresses, for the account — perfect for watch-only auditing. It contains no private material, so spending remains impossible.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'What three jobs does a wallet actually perform?', answer: 'Key management (generate and store private keys), UTXO tracking (scan the chain for coins your keys can spend), and transaction building (construct, sign, broadcast). It does not store coins.' },
            { question: 'Why can\'t anyone compute your private key from your address?', answer: 'Both derivation steps are one-way: elliptic-curve multiplication (private → public key) and hashing (public key → address) are easy forward but computationally infeasible to reverse.' },
            { question: 'What trade does self-custody make versus a custodial exchange?', answer: 'Self-custody: full control, no freezes, but losing keys means losing coins with no recourse. Custodial: convenient and recoverable password, but you hold an IOU — the exchange can be hacked, freeze you, or go bankrupt.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'Ownership', value: 'Control of the private key = ownership. No identity, no recovery flow.' },
          { label: 'One-way chain', value: 'Private key → public key → address. Never reversible.' },
          { label: 'Wallet =', value: 'Key manager + UTXO tracker + transaction builder. Coins live on-chain.' },
          { label: 'HD wallet', value: 'One 12/24-word seed → unlimited keys and fresh addresses. Seed IS the backup.' },
          { label: 'Custody', value: 'Self-custody: your keys, your coins. Custodial: their keys, your IOU.' },
          { label: 'Hardening', value: 'Hardware wallet = keys never touch the internet. Multisig = M-of-N keys to spend.' },
        ]}
      />
    </LessonLayout>
  )
}
