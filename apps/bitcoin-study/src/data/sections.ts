import type { Section } from '../types'

export const sections: Section[] = [
  // ─── SECTION 1 — FOUNDATION ────────────────────────────────────
  {
    id: 'foundation',
    number: 1,
    title: 'Bitcoin in One Mental Model',
    subtitle: 'What Bitcoin is, why it exists, and the core problem it solves',
    icon: '◈',
    bigPicture: `Bitcoin is a peer-to-peer electronic cash system — a way to send value over the internet without trusting any bank, government, or payment processor. It solves the fundamental problem of **digital money**: how do you prevent someone from copying and spending the same money twice (the double-spend problem) without a central authority?

Before Bitcoin, every digital payment system needed a trusted middleman (Visa, PayPal, a bank) to keep the ledger and decide which transactions are valid. Bitcoin replaces that middleman with a distributed ledger (the blockchain), a set of consensus rules enforced by software, and an economic incentive mechanism (mining / Proof of Work) that makes cheating extremely expensive.

Think of it as a system with four interlocking parts:
- **Shared Ledger** — everyone can see every transaction ever made
- **Validation Rules** — software enforces what counts as a valid transaction
- **Incentive Layer** — miners spend real energy (and money) to secure the ledger and earn rewards
- **Proof of Work** — the mechanism that makes rewriting history computationally impractical

"Blockchain" is the data structure. "Bitcoin" is the full system: network + protocol + incentive design + culture of decentralization.`,

    whyItMatters: `Understanding this mental model prevents the most common mistake: thinking Bitcoin is "just a database" or "just a currency." It is a system where the data structure, the network, the economic incentives, and the consensus rules all reinforce each other. Remove any one piece and the security model collapses.`,

    visual: `┌─────────────────────────────────────────────────────────────┐
│                    THE BITCOIN SYSTEM                        │
│                                                             │
│   PROBLEM                                                   │
│   ───────                                                   │
│   Digital money can be copied.                              │
│   Without a central authority, who prevents double-spend?   │
│                                                             │
│           ┌──────────────┐                                  │
│           │   MECHANISM  │                                  │
│           └──────┬───────┘                                  │
│                  │                                          │
│    ┌─────────────┼─────────────┐                            │
│    ▼             ▼             ▼                            │
│ ┌──────┐   ┌─────────┐  ┌──────────┐                       │
│ │Shared│   │Consensus │  │ Proof of │                       │
│ │Ledger│   │  Rules   │  │   Work   │                       │
│ └──┬───┘   └────┬─────┘  └────┬─────┘                      │
│    │            │              │                            │
│    └────────────┼──────────────┘                            │
│                 ▼                                           │
│        ┌───────────────┐                                    │
│        │    RESULT     │                                    │
│        │───────────────│                                    │
│        │ Digital money │                                    │
│        │ that is:      │                                    │
│        │ • Scarce      │                                    │
│        │ • Verifiable  │                                    │
│        │ • Censorship- │                                    │
│        │   resistant   │                                    │
│        │ • Trustless   │                                    │
│        └───────────────┘                                    │
└─────────────────────────────────────────────────────────────┘`,

    simpleExample: `Imagine Alice wants to pay Bob 1 BTC. In the traditional world, she tells her bank, the bank checks her balance, deducts 1, credits Bob. Alice trusts the bank. In Bitcoin, Alice broadcasts a signed transaction to the entire network. Thousands of independent nodes verify she actually owns that 1 BTC (by checking the history of the ledger). A miner includes that transaction in a block, does expensive computational work to "seal" it, and the network accepts it. No single party can reverse it. No one had to trust anyone.`,

    details: [
      `**Digital scarcity**: Bitcoin's supply is capped at 21 million coins, enforced by code and consensus. Unlike fiat currency, no entity can print more.`,
      `**Decentralized ledger**: The blockchain is replicated across thousands of nodes worldwide. There is no master copy — every full node independently verifies every rule.`,
      `**Trust minimization**: You don't need to trust any single party. You verify everything yourself (or your node does). "Don't trust, verify."`,
      `**"Blockchain" vs "Bitcoin"**: A blockchain is a data structure — a chain of blocks linked by hashes. Bitcoin is a complete monetary system that uses a blockchain as one component. Many things use blockchains; that doesn't make them like Bitcoin.`,
      `**Peer-to-peer**: Transactions are broadcast directly between participants on the network. There's no central server to shut down.`,
    ],

    keyTerms: [
      { term: 'Double-spend problem', definition: 'The risk that the same digital money could be copied and spent more than once. Bitcoin solves this without a central authority.' },
      { term: 'Blockchain', definition: 'An append-only data structure where each block contains a hash of the previous block, forming a tamper-evident chain.' },
      { term: 'Proof of Work (PoW)', definition: 'A mechanism where miners must expend computational effort to propose new blocks. Makes rewriting history extremely expensive.' },
      { term: 'Consensus', definition: 'The process by which all honest nodes agree on the current state of the ledger without a central coordinator.' },
      { term: 'Decentralization', definition: 'No single point of control. The network operates through thousands of independent participants.' },
      { term: 'Digital scarcity', definition: 'The property that Bitcoin\'s supply is limited to 21 million, enforced by protocol rules.' },
    ],

    commonConfusion: [
      `**"Bitcoin is just a blockchain"** — No. Bitcoin is a system. The blockchain is its ledger format. The security comes from the combination of PoW, economic incentives, and distributed validation.`,
      `**"Blockchain technology will change everything"** — The blockchain data structure alone is just a linked list of hashed blocks. Without the incentive and consensus layer, it offers little advantage over a regular database.`,
      `**"Bitcoin uses too much energy for nothing"** — The energy expenditure IS the security mechanism. It converts real-world cost into protection against ledger tampering. Whether that trade-off is worthwhile is a separate debate, but the energy isn't wasted — it has a specific function.`,
    ],

    recallPrompts: [
      { question: 'What fundamental problem does Bitcoin solve?', hint: 'Think: what goes wrong with digital money when there is no central authority?' },
      { question: 'Name the four interlocking parts of the Bitcoin system.', hint: 'Ledger + Rules + Incentives + ???' },
      { question: 'What is the difference between "blockchain" and "Bitcoin"?', hint: 'One is a data structure, the other is a complete ___.' },
    ],

    cheatSheet: [
      'Bitcoin = shared ledger + consensus rules + Proof of Work + economic incentives',
      'Solves double-spend without a trusted third party',
      'Supply hard-capped at 21 million BTC',
      '"Blockchain" is the data structure; "Bitcoin" is the full system',
      'Energy expenditure in mining IS the security model',
      'Peer-to-peer: no central server, no single point of failure',
    ],
  },

  // ─── SECTION 2 — BLOCKCHAIN / BLOCKS ──────────────────────────
  {
    id: 'blocks',
    number: 2,
    title: 'How the Chain and Blocks Actually Work',
    subtitle: 'Block structure, hash linking, and what makes the chain tamper-evident',
    icon: '⛓',
    bigPicture: `A blockchain is an ordered sequence of blocks, where each block commits to the hash of the previous block. This backward-linking creates a chain: if you alter any data in block N, its hash changes, which breaks the link in block N+1, which cascades all the way to the tip. Re-sealing all those blocks would require redoing all the Proof of Work from block N onward — and doing it faster than the rest of the network extends the chain. That's what makes the ledger practically immutable.

Each block has two parts:
- **Block header** — a small, fixed-size structure containing metadata (previous hash, Merkle root, nonce, timestamp, difficulty target, version)
- **Block body** — the actual list of transactions

The header is what gets hashed during mining. The Merkle root inside the header is a compact cryptographic commitment to every transaction in the body — change one transaction and the Merkle root changes, which changes the header hash, which breaks the chain.`,

    whyItMatters: `Understanding block structure clarifies why "tamper-evident" doesn't mean "tamper-proof by magic." The security is computational and economic: rewriting history requires redoing Proof of Work and outpacing all honest miners. The deeper a block is buried, the more work sits on top of it, and the harder it is to replace.`,

    visual: `BLOCK STRUCTURE
═══════════════

┌─────────────────────────────────────────────┐
│               BLOCK HEADER (80 bytes)        │
│─────────────────────────────────────────────│
│  Version            │ Protocol version       │
│  Prev Block Hash    │ Hash of block N-1   ◄──── links chain backward
│  Merkle Root        │ Hash tree of all txs   │
│  Timestamp          │ Approximate block time │
│  Target (nBits)     │ Difficulty threshold   │
│  Nonce              │ Miner's search value   │
└─────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│               BLOCK BODY                     │
│─────────────────────────────────────────────│
│  Coinbase TX  (miner reward)                 │
│  TX 1                                        │
│  TX 2                                        │
│  TX 3                                        │
│  ...                                         │
│  TX N                                        │
└─────────────────────────────────────────────┘


HOW BLOCKS LINK (backward-pointing chain)
═════════════════════════════════════════

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Block 0  │◄───│ Block 1  │◄───│ Block 2  │◄───│ Block 3  │
  │ (Genesis)│    │ prev=H(0)│    │ prev=H(1)│    │ prev=H(2)│
  └──────────┘    └──────────┘    └──────────┘    └──────────┘

  Each block stores the HASH of the previous block.
  Blocks point BACKWARD, not forward.
  If you change Block 1, H(1) changes → Block 2's prev hash
  no longer matches → chain is broken from Block 2 onward.


MERKLE TREE (inside each block)
═══════════════════════════════

              ┌──────────────┐
              │  Merkle Root │
              └──────┬───────┘
                     │
            ┌────────┴────────┐
            │                 │
       ┌────┴────┐      ┌────┴────┐
       │  H(AB)  │      │  H(CD)  │
       └────┬────┘      └────┬────┘
            │                 │
      ┌─────┴───┐      ┌─────┴───┐
      │         │      │         │
   ┌──┴──┐  ┌──┴──┐ ┌──┴──┐  ┌──┴──┐
   │H(A) │  │H(B) │ │H(C) │  │H(D) │
   └──┬──┘  └──┬──┘ └──┬──┘  └──┬──┘
      │        │       │        │
    TX A     TX B    TX C     TX D`,

    simpleExample: `Think of it like a notarized logbook. Each page (block) contains a list of transactions and a stamped summary of the previous page. If someone rips out page 50 and replaces it, the stamp on page 51 won't match the new page 50. And fixing page 51 breaks page 52. To successfully forge the book, you'd have to rewrite and re-stamp every page from 50 onward — while everyone else keeps adding new legitimate pages.`,

    details: [
      `**Genesis block**: Block 0, hardcoded into the software. It has no previous block hash (set to all zeros). Mined by Satoshi Nakamoto on January 3, 2009.`,
      `**Block header is only 80 bytes**: Despite a block body that can be several megabytes, the header that gets hashed is tiny. This is by design — it makes mining computationally tractable.`,
      `**Merkle root**: A binary hash tree that summarizes all transactions. You can prove a transaction is in a block without downloading the full block (used by light clients / SPV).`,
      `**"Longest chain" is misleading**: The valid chain with the most accumulated Proof of Work wins, not simply the chain with the most blocks. A chain of easy blocks doesn't beat a chain of hard blocks.`,
      `**Backward-linking**: Each block references its parent. The chain is built backward in time. There is no "next block pointer" — the latest block is the tip, and new blocks extend from there.`,
      `**Target / nBits**: Encodes the current difficulty. The block hash must be numerically less than this target to be valid. "Leading zeros" is a simplification — the actual rule is hash < target.`,
    ],

    keyTerms: [
      { term: 'Block header', definition: 'An 80-byte structure containing version, previous block hash, Merkle root, timestamp, target (nBits), and nonce.' },
      { term: 'Previous block hash', definition: 'The SHA-256d hash of the prior block\'s header. This is what links blocks into a chain.' },
      { term: 'Merkle root', definition: 'A single hash that cryptographically commits to every transaction in the block via a binary hash tree.' },
      { term: 'Nonce', definition: 'A 32-bit field the miner varies to search for a valid block hash. Part of the mining process.' },
      { term: 'Genesis block', definition: 'The very first block in Bitcoin (block 0). Hardcoded, has no real parent.' },
      { term: 'Target / nBits', definition: 'The difficulty threshold. A valid block hash must be numerically less than the target.' },
      { term: 'Accumulated work', definition: 'The total Proof of Work across all blocks in a chain. The chain with the most accumulated work is the valid chain.' },
    ],

    commonConfusion: [
      `**"Longest chain wins"** — More precisely, the valid chain with the most accumulated Proof of Work wins. Length (block count) is a rough proxy, but work is what actually matters.`,
      `**"The blockchain is immutable"** — It's tamper-evident and economically impractical to rewrite, but not physically impossible. The cost to rewrite grows with depth (more work to redo).`,
      `**"Each block contains the hash of the next block"** — No. Each block contains the hash of the PREVIOUS block. The chain points backward. The tip has nothing pointing to it yet.`,
    ],

    recallPrompts: [
      { question: 'What are the six fields in a block header?', hint: 'Version, prev hash, ___, timestamp, ___, nonce' },
      { question: 'Why does changing one old transaction break the entire chain from that point forward?', hint: 'Think about what flows into the Merkle root, then into the header hash, then into the next block...' },
      { question: 'What does "most accumulated work" mean vs "longest chain"?', hint: 'Difficulty matters, not just block count.' },
    ],

    cheatSheet: [
      'Block = header (80 bytes) + body (transactions)',
      'Header fields: version, prev hash, Merkle root, timestamp, nBits, nonce',
      'Chain links backward: each block hashes its parent',
      'Merkle tree = compact hash summary of all transactions in a block',
      'Genesis block = block 0, hardcoded, no parent',
      'Valid chain = most accumulated PoW, not just most blocks',
      'Changing any old block cascades hash mismatches forward',
    ],
  },

  // ─── SECTION 3 — TRANSACTIONS & UTXO ────────────────────────
  {
    id: 'utxo',
    number: 3,
    title: 'How Value Actually Moves in Bitcoin',
    subtitle: 'The UTXO model, inputs, outputs, and why Bitcoin doesn\'t have "balances"',
    icon: '⇄',
    bigPicture: `Bitcoin doesn't track balances like a bank. Instead, it tracks **unspent transaction outputs (UTXOs)**. A UTXO is a discrete chunk of bitcoin that was created by a previous transaction and hasn't been spent yet. When you "send" bitcoin, you consume one or more existing UTXOs as inputs and create new UTXOs as outputs.

Think of UTXOs like physical bills. If you have a $20 bill and want to pay $7, you hand over the $20 (consume the input), the recipient gets $7 (output 1), and you get $13 back as change (output 2). The original $20 bill is gone — it has been "spent." Two new "bills" ($7 and $13) now exist.

Your "wallet balance" is simply the sum of all UTXOs your keys can spend. There is no account record anywhere that says "Alice has 3.5 BTC." Instead, there are specific UTXOs scattered across the blockchain that Alice's keys can unlock.`,

    whyItMatters: `The UTXO model is foundational to understanding how Bitcoin actually works under the hood. It explains why transactions have multiple inputs and outputs, why "change addresses" exist, why fees work the way they do, and why privacy in Bitcoin is more nuanced than it first appears.`,

    visual: `THE UTXO MODEL
══════════════

Think: consuming objects and creating new ones (not updating a balance row)


EXAMPLE: Alice pays Bob 0.7 BTC
════════════════════════════════

  Alice's wallet knows about these UTXOs:

  ┌──────────────────┐  ┌──────────────────┐
  │ UTXO A           │  │ UTXO B           │
  │ 0.5 BTC          │  │ 0.4 BTC          │
  │ locked to Alice   │  │ locked to Alice   │
  └──────────────────┘  └──────────────────┘

  Alice wants to send 0.7 BTC to Bob.
  She needs to consume both UTXOs (0.5 + 0.4 = 0.9 BTC).

                    ┌─────────────────────────────┐
  UTXO A (0.5) ───►│                             │──► Output 1: 0.7 BTC → Bob
                    │       TRANSACTION           │
  UTXO B (0.4) ───►│                             │──► Output 2: 0.19 BTC → Alice (change)
                    │                             │
                    └─────────────────────────────┘
                                                    (0.01 BTC implicit fee)

  After this transaction:
  • UTXO A and UTXO B are DESTROYED (spent)
  • Two NEW UTXOs are created:
    - 0.7 BTC locked to Bob's address
    - 0.19 BTC locked to Alice's change address
  • The 0.01 BTC difference is the miner fee (inputs − outputs)


TRANSACTION STRUCTURE
═════════════════════

┌─────────────────────────────────────────────────┐
│  TRANSACTION                                     │
│─────────────────────────────────────────────────│
│  TXID: sha256d(serialized tx)                    │
│                                                 │
│  INPUTS (what is being spent)                    │
│  ├─ Input 0: ref UTXO A (prev_txid + index)     │
│  │           + signature proving ownership       │
│  ├─ Input 1: ref UTXO B (prev_txid + index)     │
│  │           + signature proving ownership       │
│  └─ ...                                          │
│                                                 │
│  OUTPUTS (new UTXOs being created)               │
│  ├─ Output 0: 0.7 BTC → locking script (Bob)    │
│  ├─ Output 1: 0.19 BTC → locking script (Alice) │
│  └─ ...                                          │
│                                                 │
│  FEE = sum(inputs) − sum(outputs) = 0.01 BTC    │
└─────────────────────────────────────────────────┘`,

    simpleExample: `**Developer analogy:** UTXOs are like immutable objects. You never mutate a UTXO — you consume it (delete) and create new ones. It's similar to how functional programming handles state: old state is consumed, new state is produced. There's no global mutable "balance" variable being updated — just a set of discrete, immutable value-objects being created and destroyed.`,

    details: [
      `**Inputs reference previous outputs**: Each input points to a specific output of a previous transaction (by TXID + output index). It includes a signature proving the spender has the right key.`,
      `**Outputs create new UTXOs**: Each output specifies an amount and a "locking script" (scriptPubKey) — the conditions that must be met to spend this UTXO in the future.`,
      `**Change outputs**: If your UTXOs total more than the payment, the excess (minus fee) must be sent back to yourself as a change output. Wallets handle this automatically.`,
      `**Transaction fee**: There is no explicit "fee" field. The fee is implicitly the difference between total inputs and total outputs. Whatever isn't claimed by an output goes to the miner.`,
      `**TXID**: The transaction identifier, computed as the double-SHA-256 hash of the serialized transaction data.`,
      `**Dust**: Extremely small UTXOs that cost more in fees to spend than they're worth. Wallets typically avoid creating these.`,
    ],

    keyTerms: [
      { term: 'UTXO', definition: 'Unspent Transaction Output — a discrete, unspent chunk of bitcoin created by a previous transaction.' },
      { term: 'Input', definition: 'A reference to a previous UTXO being consumed/spent, plus proof of authorization (signature).' },
      { term: 'Output', definition: 'A new value assignment: amount + locking conditions. Becomes a new UTXO until spent.' },
      { term: 'Change output', definition: 'An output that sends "leftover" bitcoin back to the sender. Necessary because UTXOs must be fully consumed.' },
      { term: 'Locking script (scriptPubKey)', definition: 'The conditions that must be satisfied to spend this output. Typically: "provide a signature matching this public key hash."' },
      { term: 'TXID', definition: 'Transaction ID — the hash that uniquely identifies a transaction.' },
      { term: 'Dust', definition: 'A UTXO so small that the fee to spend it exceeds its value.' },
    ],

    commonConfusion: [
      `**"I have 3 BTC in my wallet"** — Your wallet doesn't hold coins. It tracks which UTXOs on the blockchain can be unlocked with your keys. Your "balance" is the sum of those UTXOs.`,
      `**"Bitcoin works like a bank account"** — At the base layer, there are no accounts and no balances. Only UTXOs. Your wallet software computes a balance for you by summing up your spendable UTXOs.`,
      `**"Where did the fee go in the transaction?"** — There is no explicit fee field. The fee is whatever inputs minus outputs equals. The miner claims this remainder.`,
      `**"I sent 1 BTC but the transaction moved 5 BTC"** — If your input UTXO was 5 BTC, the whole thing gets consumed. 1 BTC goes to the recipient, ~4 BTC comes back to you as change. On-chain explorers show the full amount moved.`,
    ],

    recallPrompts: [
      { question: 'What is a UTXO?', hint: 'An unspent _____ output — a discrete chunk of value.' },
      { question: 'How is the transaction fee calculated?', hint: 'There is no fee field. Fee = sum(___) − sum(_____).' },
      { question: 'Why do change outputs exist?', hint: 'UTXOs must be fully consumed. If you overshoot, the remainder needs to go somewhere.' },
    ],

    cheatSheet: [
      'UTXO = Unspent Transaction Output = a discrete chunk of BTC',
      'No "balances" at the protocol level — only UTXOs',
      'Inputs consume old UTXOs; outputs create new UTXOs',
      'Fee = total inputs − total outputs (implicit, no fee field)',
      'Change output sends leftover BTC back to sender',
      'Wallet balance = sum of all UTXOs your keys can spend',
      'Think: immutable objects being consumed and recreated',
    ],
  },

  // ─── SECTION 4 — TRANSACTION LIFECYCLE ─────────────────────
  {
    id: 'tx-lifecycle',
    number: 4,
    title: 'From Wallet to Confirmations',
    subtitle: 'The full journey of a Bitcoin transaction from creation to finality',
    icon: '↻',
    bigPicture: `A Bitcoin transaction goes through a well-defined pipeline: creation → signing → broadcast → validation → mempool → block inclusion → confirmations. Understanding this pipeline clarifies why transactions sometimes take time, why fees matter, and what "confirmed" really means.

The transaction starts in your wallet software, which selects UTXOs, builds the transaction, signs it with your private key, and broadcasts it to the peer-to-peer network. Peers validate the transaction and relay it to their peers. It enters the **mempool** (memory pool) — each node's local holding area for unconfirmed transactions. Miners pick transactions from their mempool (typically prioritizing higher fee rates), include them in a candidate block, and attempt to mine that block. Once a block is found and accepted, the transaction has one confirmation. Each subsequent block adds another confirmation.`,

    whyItMatters: `This pipeline explains the user experience of Bitcoin: why there's a waiting period, why fees fluctuate, why you can "speed up" a transaction with RBF, and why merchants may want to wait for multiple confirmations before releasing goods.`,

    visual: `TRANSACTION LIFECYCLE — FULL PIPELINE
══════════════════════════════════════

  ┌──────────┐
  │  WALLET  │  1. Select UTXOs to spend
  │          │  2. Build transaction (inputs + outputs)
  │          │  3. Sign with private key(s)
  └────┬─────┘
       │
       ▼ broadcast
  ┌──────────┐
  │  PEERS   │  4. Receive transaction
  │          │  5. Validate: correct signatures? valid UTXOs?
  │          │     not a double-spend? follows rules?
  │          │  6. Relay to other peers (gossip propagation)
  └────┬─────┘
       │
       ▼ accepted into
  ┌──────────┐
  │ MEMPOOL  │  7. Transaction waits in each node's local mempool
  │          │  8. NOT yet confirmed — just pending
  │          │  9. Each node's mempool may differ slightly
  └────┬─────┘
       │
       ▼ selected by miner (higher fee rate → higher priority)
  ┌──────────┐
  │  MINER   │  10. Miner builds a candidate block
  │          │  11. Includes this tx (if fee rate is attractive)
  │          │  12. Mines the block (finds valid nonce)
  └────┬─────┘
       │
       ▼ block found
  ┌──────────┐
  │  BLOCK   │  13. Transaction is now in a mined block
  │          │  14. 1 confirmation
  └────┬─────┘
       │
       ▼ more blocks built on top
  ┌──────────┐
  │ CONFIRMS │  15. Each new block = +1 confirmation
  │          │  16. 6 confirmations = strong finality (convention)
  │  1 → 2   │  17. More confirmations = exponentially harder
  │  → 3 → 6 │      to reverse the transaction
  └──────────┘


FEE RATE PRIORITY
═════════════════

  Mempool transactions sorted by fee rate:

  ┌───────────────────────────────────────┐
  │  HIGH FEE RATE   ← mined first       │
  │  ████████████████████                 │
  │  ██████████████                       │
  │  █████████                            │
  │  ████                                 │
  │  LOW FEE RATE    ← may wait long     │
  └───────────────────────────────────────┘

  Fee rate = fee ÷ transaction size (sat/vB)
  Miners maximize revenue → pick highest sat/vB first`,

    simpleExample: `You tap "Send" in your wallet. It picks your UTXOs, creates the transaction, signs it, and sends it into the network. Your transaction floats around in mempools for a few minutes. A miner includes it in the next block. You see "1 confirmation." Ten minutes later, another block is mined on top — "2 confirmations." After 6 confirmations (roughly an hour), most services consider it effectively irreversible.`,

    details: [
      `**Mempool is local, not global**: Each node maintains its own mempool. They're usually similar but can differ based on relay policies, timing, and fee floor settings.`,
      `**Fee rate vs total fee**: Miners optimize for fee rate (satoshis per virtual byte, sat/vB), not total fee. A small, high-rate transaction can outbid a large, low-rate one.`,
      `**RBF (Replace-By-Fee)**: A mechanism that allows you to replace an unconfirmed transaction with a new version that pays a higher fee. Useful when the network is congested and your original fee was too low. The replacement must spend at least one of the same inputs and pay a strictly higher fee.`,
      `**Confirmation depth**: 1 confirmation = included in a valid block. 6 confirmations ≈ 1 hour and is the conventional threshold for "practically irreversible" for most transaction sizes. High-value transfers may warrant more.`,
      `**0-conf (unconfirmed)**: A transaction in the mempool but not yet in a block. Accepting 0-conf transactions carries risk — the sender could attempt a double-spend via RBF or by mining a conflicting transaction.`,
      `**Transaction malleability**: Historically, transaction IDs could be modified without invalidating the transaction. SegWit (Segregated Witness) fixed this by separating signature data from TXID computation.`,
    ],

    keyTerms: [
      { term: 'Mempool', definition: 'Each node\'s local pool of valid but unconfirmed transactions, waiting to be included in a block.' },
      { term: 'Fee rate (sat/vB)', definition: 'Satoshis per virtual byte — the metric miners use to prioritize transactions. Higher fee rate = faster confirmation.' },
      { term: 'Confirmation', definition: 'Each block mined on top of the block containing your transaction adds one confirmation.' },
      { term: 'RBF (Replace-By-Fee)', definition: 'A protocol feature allowing replacement of an unconfirmed transaction with a higher-fee version.' },
      { term: '0-conf', definition: 'A transaction that has been broadcast but not yet included in any block. Carries double-spend risk.' },
      { term: 'SegWit', definition: 'Segregated Witness — a protocol upgrade that fixes transaction malleability and improves block capacity.' },
    ],

    commonConfusion: [
      `**"My transaction is stuck"** — It's in the mempool but the fee rate is too low relative to current demand. Use RBF to bump the fee, or wait for demand to drop.`,
      `**"1 confirmation means it's final"** — It means it's in a block, but a 1-block reorg is possible (rare). 6 confirmations is the convention for strong finality.`,
      `**"The mempool is a single shared pool"** — Each node has its own mempool. They converge but are not identical. Policy differences between nodes mean some transactions appear in some mempools but not others.`,
      `**"Higher total fee = faster"** — Not necessarily. Miners sort by fee RATE (sat/vB), not total sats. A 100-byte tx paying 1000 sats (10 sat/vB) beats a 1000-byte tx paying 2000 sats (2 sat/vB).`,
    ],

    recallPrompts: [
      { question: 'What are the major stages a transaction passes through?', hint: 'Wallet → broadcast → peers → _____ → miner → block → _____' },
      { question: 'Why do miners sort by fee rate instead of total fee?', hint: 'Block space is limited. Miners maximize revenue per ___.' },
      { question: 'What does RBF allow you to do?', hint: 'Replace an unconfirmed transaction with a _____ fee version.' },
    ],

    cheatSheet: [
      'Pipeline: wallet → sign → broadcast → mempool → mined → confirmations',
      'Mempool = local holding area for unconfirmed txs (varies per node)',
      'Fee rate (sat/vB) determines priority, not total fee',
      'RBF lets you bump an unconfirmed tx\'s fee',
      '1 confirmation = in a block; 6 confirmations ≈ strong finality',
      '0-conf = unconfirmed = carries double-spend risk',
      'SegWit fixed transaction malleability',
    ],
  },

  // ─── SECTION 5 — MINING & NAKAMOTO CONSENSUS ──────────────
  {
    id: 'mining',
    number: 5,
    title: 'How Mining Secures Bitcoin',
    subtitle: 'Proof of Work, difficulty, block rewards, and Nakamoto consensus',
    icon: '⛏',
    bigPicture: `Mining is the process by which new blocks are added to the blockchain. A miner assembles a candidate block (choosing transactions from the mempool), then repeatedly hashes the block header with different nonce values, searching for a hash that falls below the current target threshold. This is essentially a brute-force lottery: there's no shortcut, and each attempt has the same tiny probability of success. The first miner to find a valid hash broadcasts the block, and if it's valid, other nodes accept it and start building on top of it.

Mining serves three functions simultaneously:
1. **Transaction ordering** — deciding which transactions are included and in what order
2. **New coin issuance** — the coinbase transaction in each block creates new BTC (the "block subsidy")
3. **Security** — the accumulated PoW makes rewriting history prohibitively expensive

**Nakamoto consensus** is the broader mechanism: PoW + longest-valid-chain rule + difficulty adjustment + economic incentives. It's how a distributed network of strangers reaches agreement on a single transaction history without any coordinator.`,

    whyItMatters: `Mining is the economic backbone of Bitcoin's security. Without it, anyone could trivially rewrite the ledger. The difficulty adjustment keeps block production stable at ~10 minutes regardless of how much hash power joins or leaves. The halving schedule enforces the 21 million supply cap.`,

    visual: `MINING FLOW
═══════════

  ┌──────────────────────────────────────┐
  │  1. ASSEMBLE CANDIDATE BLOCK         │
  │     • Pick transactions from mempool │
  │     • Create coinbase tx (reward)    │
  │     • Build Merkle tree              │
  │     • Construct block header         │
  └─────────────┬────────────────────────┘
                │
                ▼
  ┌──────────────────────────────────────┐
  │  2. HASH THE HEADER                  │
  │     header_hash = SHA256(SHA256(     │
  │       version + prev_hash +          │
  │       merkle_root + timestamp +      │
  │       nBits + nonce                  │
  │     ))                               │
  └─────────────┬────────────────────────┘
                │
                ▼
  ┌──────────────────────────────────────┐
  │  3. CHECK: hash < target ?           │
  │                                      │
  │     YES ──► Broadcast block! ✓       │
  │     NO  ──► Change nonce, go to 2    │
  │             (or change other fields) │
  └──────────────────────────────────────┘


DIFFICULTY ADJUSTMENT
═════════════════════

  Every 2,016 blocks (~2 weeks):

  ┌─────────────────────────────────────────────────┐
  │  If blocks were found TOO FAST:                  │
  │    → target decreases (harder to find hash)      │
  │                                                 │
  │  If blocks were found TOO SLOW:                  │
  │    → target increases (easier to find hash)      │
  │                                                 │
  │  Goal: maintain ~10 minute average block time    │
  └─────────────────────────────────────────────────┘


BLOCK REWARD HALVING
════════════════════

  Block reward = Subsidy + Transaction fees

  ┌────────────────┬────────────────┬──────────┐
  │    Period       │   Subsidy      │   Year   │
  │────────────────┼────────────────┼──────────│
  │  Blocks 0–     │  50 BTC        │  2009    │
  │  Block 210k    │  25 BTC        │  2012    │
  │  Block 420k    │  12.5 BTC      │  2016    │
  │  Block 630k    │  6.25 BTC      │  2020    │
  │  Block 840k    │  3.125 BTC     │  2024    │
  │  ...           │  → 0           │  ~2140   │
  └────────────────┴────────────────┴──────────┘

  Total supply approaches but never exceeds 21,000,000 BTC`,

    simpleExample: `Imagine a global lottery where 100,000 participants each roll dice as fast as they can. Every ~10 minutes, someone rolls the winning number. They get to write the next page of the shared record book, and they earn newly minted coins for their effort. If too many people join and pages are being written too fast, the dice get harder. If people leave, the dice get easier. The goal is always one page every 10 minutes.`,

    details: [
      `**What miners actually compute**: SHA-256 applied twice (SHA-256d) to the 80-byte block header. They vary the nonce (and sometimes the coinbase transaction or timestamp) to produce different hashes.`,
      `**"Leading zeros" is a simplification**: The actual rule is that the hash, interpreted as a 256-bit number, must be less than the target value. Lower targets mean more "leading zeros" on average, but the real check is a numeric comparison.`,
      `**Coinbase transaction**: The first transaction in every block. It has no inputs (it creates coins from nothing). It contains the block subsidy plus any transaction fees from the block's other transactions.`,
      `**Halving**: Every 210,000 blocks (~4 years), the subsidy is cut in half. This is how Bitcoin achieves its fixed supply of 21 million coins. Eventually, miners will rely entirely on transaction fees.`,
      `**PoW as Sybil resistance**: In a pseudonymous network, anyone can create unlimited identities. PoW prevents Sybil attacks by requiring real-world expenditure (energy/hardware) to produce blocks. You can't fake work.`,
      `**Nakamoto consensus > PoW**: Nakamoto consensus includes PoW, but also the longest-valid-chain rule, difficulty adjustment, and the incentive design that makes honest mining more profitable than attacking.`,
      `**Selfish mining**: A theoretical strategy where a miner withholds found blocks to gain a timing advantage. Practically difficult and risky, but theoretically reduces the threshold for profitable attacks.`,
    ],

    keyTerms: [
      { term: 'Proof of Work (PoW)', definition: 'Miners must find a hash below a target by brute-force search. Proves computational expenditure that can be instantly verified.' },
      { term: 'Nonce', definition: 'A counter in the block header that miners increment to produce different hash outputs.' },
      { term: 'Target', definition: 'A 256-bit number. A valid block hash must be less than the target. Lower target = harder.' },
      { term: 'Difficulty adjustment', definition: 'Every 2,016 blocks, the target is recalculated to maintain ~10-minute block intervals.' },
      { term: 'Coinbase transaction', definition: 'The special first transaction in a block that creates new BTC (subsidy + fees). Has no inputs.' },
      { term: 'Halving', definition: 'Every 210,000 blocks, the block subsidy is cut in half. Drives Bitcoin toward its 21M supply cap.' },
      { term: 'Nakamoto consensus', definition: 'The full consensus mechanism: PoW + longest-valid-chain + difficulty adjustment + economic incentives.' },
      { term: 'Sybil resistance', definition: 'Protection against an attacker creating many fake identities. PoW provides this by requiring real energy expenditure.' },
    ],

    commonConfusion: [
      `**"Miners are solving complex math problems"** — They're not solving anything useful. They're performing a brute-force search for a hash below a target. It's deliberately wasteful — that's the point. The waste IS the security.`,
      `**"Proof of Work is all there is to consensus"** — PoW is one component. Nakamoto consensus also includes the chain selection rule, difficulty adjustment, validation rules, and economic incentives.`,
      `**"21 million coins will be mined by 2140"** — More precisely, ~99% will be mined by ~2035. The last fractions trickle out very slowly due to halving. After 2140, miners rely entirely on transaction fees.`,
      `**"More hash power = faster blocks"** — Only temporarily. The difficulty adjusts every 2,016 blocks to bring the average back to ~10 minutes. More hash power = more security, not faster transactions.`,
    ],

    recallPrompts: [
      { question: 'What three functions does mining serve simultaneously?', hint: 'Transaction ___, new coin ___, and network ___.' },
      { question: 'How often does difficulty adjust, and what is the target block interval?', hint: 'Every ___ blocks (~2 weeks), targeting ___ minutes.' },
      { question: 'What is the coinbase transaction?', hint: 'The first tx in each block. It creates BTC from ___.' },
    ],

    cheatSheet: [
      'Mining = brute-force search for hash < target',
      'SHA-256d of 80-byte header, varying nonce',
      'Difficulty adjusts every 2,016 blocks → targets 10-min intervals',
      'Coinbase tx = first tx in block, creates new BTC',
      'Block reward = subsidy + fees; subsidy halves every 210k blocks',
      'Total supply cap: 21 million BTC (enforced by halving schedule)',
      'Nakamoto consensus = PoW + chain selection + difficulty + incentives',
      'PoW = Sybil resistance (can\'t fake computational work)',
    ],
  },

  // ─── SECTION 6 — NODES & NETWORK ─────────────────────────
  {
    id: 'nodes',
    number: 6,
    title: 'How the Network Spreads and Verifies History',
    subtitle: 'Full nodes, light clients, propagation, and why running a node matters',
    icon: '⊛',
    bigPicture: `The Bitcoin network is a peer-to-peer gossip network. When a transaction or block is created, it propagates through the network by each node forwarding it to its connected peers. There is no central server — every node connects to a handful of other nodes and relays data.

The most important distinction is between **full nodes** and **light clients**:
- **Full nodes** download and validate every block and every transaction from the genesis block onward. They independently enforce ALL consensus rules. They don't trust anyone — they verify everything.
- **Light clients (SPV)** only download block headers and use Merkle proofs to check that a transaction was included in a block. They trust that the longest chain is valid without fully verifying every rule.

Miners are a subset of full nodes that also perform Proof of Work. But validation (checking rules) and mining (creating blocks) are distinct roles — and the non-mining full nodes are the ones that truly enforce the rules.`,

    whyItMatters: `If everyone used light clients, the security model would degrade — miners could potentially include invalid transactions that no one fully checks. Full nodes are the immune system of Bitcoin. They enforce the rules that even miners must follow.`,

    visual: `NETWORK TOPOLOGY (simplified)
═════════════════════════════

         ┌──────┐
    ┌────│Node A│────┐
    │    └──────┘    │
    ▼                ▼
┌──────┐        ┌──────┐
│Node B│◄──────►│Node C│
└──┬───┘        └───┬──┘
   │                │
   ▼                ▼
┌──────┐        ┌──────┐
│Node D│◄──────►│Node E│──────► ...
└──────┘        └──────┘

Each node connects to ~8-125 peers.
New transactions/blocks propagate via gossip.
No central server. No master node.


PROPAGATION FLOW (new transaction)
══════════════════════════════════

  Wallet ──broadcast──► Node₁
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
           Node₂       Node₃       Node₄
              │           │           │
              ▼           ▼           ▼
           Node₅       Node₆       Node₇
              │           │
              ▼           ▼
            ...         ...

  Each node: validate → add to mempool → relay to peers


NODE TYPES
══════════

┌────────────────┬───────────────┬───────────────────────────────┐
│  Type          │  Downloads    │  Trust model                  │
│────────────────┼───────────────┼───────────────────────────────│
│  Full node     │  All blocks   │  Trusts no one, verifies      │
│                │  + all txs    │  every rule independently      │
│────────────────┼───────────────┼───────────────────────────────│
│  Pruned node   │  All blocks   │  Same verification, deletes   │
│                │  (discards    │  old blocks to save disk       │
│                │   old ones)   │                               │
│────────────────┼───────────────┼───────────────────────────────│
│  SPV / light   │  Headers only │  Trusts miners for validity,  │
│  client        │  + Merkle     │  checks inclusion only         │
│                │  proofs       │                               │
│────────────────┼───────────────┼───────────────────────────────│
│  Miner         │  Full node +  │  Full verification + creates  │
│                │  PoW search   │  new blocks                   │
└────────────────┴───────────────┴───────────────────────────────┘`,

    simpleExample: `Think of full nodes as independent auditors who each verify every line in the ledger themselves. SPV clients are like people who check that a line exists in the book (via the table of contents) but don't verify the math on every page. Miners are auditors who also get to propose new pages — but their proposals are only accepted if every other auditor agrees the page follows all the rules.`,

    details: [
      `**Initial Block Download (IBD)**: When a new full node starts, it downloads and verifies every block from genesis. This can take hours to days depending on hardware and bandwidth. After IBD, it stays current by processing new blocks as they arrive.`,
      `**Pruned nodes**: Full nodes that discard old block data after validating it. They still verify everything — they just don't keep old blocks on disk. Useful for limited storage.`,
      `**Miners vs validators**: Miners propose new blocks. Full nodes validate them. If a miner creates an invalid block (e.g., claiming too much subsidy), full nodes reject it. Miners follow the rules because invalid blocks are simply ignored.`,
      `**Wallet ≠ node**: A wallet manages keys and builds transactions. A node validates and relays blocks/transactions. Your phone wallet likely connects to someone else's node. Running your own full node means you verify your own transactions.`,
      `**Peer discovery**: Nodes find each other through DNS seeds (hardcoded), peer exchange, and address relay. The network is self-organizing.`,
      `**Block relay optimization**: Techniques like compact blocks (BIP 152) reduce bandwidth by transmitting shortids for transactions the receiving node likely already has in its mempool.`,
    ],

    keyTerms: [
      { term: 'Full node', definition: 'Downloads and validates every block and transaction. Enforces all consensus rules independently.' },
      { term: 'SPV (Simplified Payment Verification)', definition: 'A light client that checks block headers and Merkle proofs, trusting that the longest chain is valid.' },
      { term: 'Pruned node', definition: 'A full node that verifies everything but discards old block data to save storage.' },
      { term: 'Gossip protocol', definition: 'The peer-to-peer method of propagating transactions and blocks by relaying to connected peers.' },
      { term: 'IBD (Initial Block Download)', definition: 'The process of downloading and verifying the entire blockchain from genesis when starting a new full node.' },
      { term: 'Compact blocks', definition: 'An optimization that reduces block relay bandwidth by referencing transactions already in the receiver\'s mempool.' },
    ],

    commonConfusion: [
      `**"Miners control Bitcoin"** — Miners propose blocks, but full nodes enforce the rules. If miners produced invalid blocks, every full node would simply reject them. Miners follow the rules because breaking them wastes their energy and earns them nothing.`,
      `**"Running a node is pointless if you're not mining"** — Running a full node means you verify your own transactions. You don't trust anyone to tell you your balance or that a payment was valid. It's the difference between trusting a bank statement and auditing the bank yourself.`,
      `**"A wallet is a node"** — Most wallets (especially mobile ones) are NOT full nodes. They connect to someone else's node to get transaction information. Running your own node gives you sovereignty over your verification.`,
    ],

    recallPrompts: [
      { question: 'What\'s the key difference between a full node and an SPV client?', hint: 'One verifies everything; the other trusts the ___ chain and only checks ___.' },
      { question: 'Who ultimately enforces Bitcoin\'s rules?', hint: 'Not miners — ___.' },
      { question: 'What happens during Initial Block Download?', hint: 'The node downloads and ___ every block from ___.' },
    ],

    cheatSheet: [
      'Full node = downloads & verifies everything independently',
      'SPV = headers + Merkle proofs only; trusts longest chain',
      'Pruned node = full verification but discards old block data',
      'Miners propose blocks; full nodes enforce rules',
      'Wallet ≠ node (most wallets connect to someone else\'s node)',
      'Network is peer-to-peer gossip — no central server',
      'IBD = Initial Block Download (syncing from genesis)',
    ],
  },

  // ─── SECTION 7 — WALLETS, KEYS, ADDRESSES ────────────────
  {
    id: 'wallets',
    number: 7,
    title: 'How Wallets, Keys, and Ownership Actually Work',
    subtitle: 'Private keys, addresses, HD wallets, seed phrases, and custody models',
    icon: '🔑',
    bigPicture: `Ownership in Bitcoin is purely cryptographic. If you control the private key that can produce a valid signature for a UTXO's locking script, you can spend it. That's it. There's no identity verification, no account recovery department, no "forgot password" flow. The key IS the ownership.

A **wallet** is software (or hardware) that does three things:
1. **Key management** — generates and stores private keys
2. **UTXO tracking** — scans the blockchain for UTXOs spendable by your keys
3. **Transaction building** — constructs, signs, and broadcasts transactions

Modern wallets use **HD (Hierarchical Deterministic)** key derivation: a single seed phrase (12 or 24 words) generates an entire tree of key pairs. Each branch can produce a different address. This means you can back up your entire wallet with just the seed phrase, and your wallet can generate fresh addresses for each transaction (improving privacy).`,

    whyItMatters: `Misunderstanding keys and custody is the #1 cause of lost funds. "Not your keys, not your coins" is the fundamental Bitcoin principle. If an exchange holds your keys, they own your bitcoin — you just have an IOU. Understanding HD wallets explains why your wallet keeps generating new addresses and why a single seed phrase recovers everything.`,

    visual: `KEY → ADDRESS FLOW
══════════════════

  ┌───────────────┐
  │  Private Key   │  256-bit random number
  │  (secret!)     │  YOU must keep this safe
  └───────┬───────┘
          │ elliptic curve multiplication (one-way)
          ▼
  ┌───────────────┐
  │  Public Key    │  Derived from private key
  │                │  Can be shared safely
  └───────┬───────┘
          │ hash (SHA-256, then RIPEMD-160, then encoding)
          ▼
  ┌───────────────┐
  │  Address       │  What you share with others
  │  (bc1q...)     │  to receive bitcoin
  └───────────────┘

  Private key → can derive → Public key → can derive → Address
  Address → CANNOT reverse → Public key → CANNOT reverse → Private key


HD WALLET DERIVATION TREE
══════════════════════════

  ┌─────────────────────────────────────────────┐
  │  SEED PHRASE (12 or 24 words)               │
  │  "abandon ability able about above absent..." │
  └──────────────────┬──────────────────────────┘
                     │ BIP-39 → seed → master key
                     ▼
              ┌──────────────┐
              │  Master Key  │
              │  (m)         │
              └──────┬───────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
     ┌─────────┐ ┌─────────┐ ┌─────────┐
     │ Purpose │ │ Purpose │ │ Purpose │
     │ m/44'   │ │ m/49'   │ │ m/84'   │
     │ Legacy  │ │ SegWit- │ │ Native  │
     │         │ │ compat  │ │ SegWit  │
     └────┬────┘ └────┬────┘ └────┬────┘
          │           │           │
          ▼           ▼           ▼
     ┌─────────┐ ┌─────────┐ ┌─────────┐
     │Coin Type│ │Coin Type│ │Coin Type│
     │ m/84'/0'│ │         │ │         │
     │ Bitcoin │ │         │ │         │
     └────┬────┘ └─────────┘ └─────────┘
          │
     ┌────┴────┐
     ▼         ▼
  ┌──────┐ ┌──────┐
  │Acct 0│ │Acct 1│
  └──┬───┘ └──────┘
     │
  ┌──┴──────────┐
  ▼              ▼
┌──────┐    ┌──────┐
│Recv  │    │Change│
│addrs │    │addrs │
│ 0,1..│    │ 0,1..│
└──────┘    └──────┘

  One seed → unlimited addresses
  Each transaction can use a fresh address


CUSTODY MODELS
══════════════

  ┌────────────────────────────────────────────────────┐
  │  SELF-CUSTODY              │  CUSTODIAL             │
  │────────────────────────────│────────────────────────│
  │  You hold private keys     │  Exchange holds keys   │
  │  You sign transactions     │  Exchange signs for you│
  │  You are responsible       │  They are responsible  │
  │  No one can freeze funds   │  They can freeze funds │
  │  Lose keys = lose coins    │  They get hacked =     │
  │                            │  you may lose coins    │
  │  "Your keys, your coins"   │  "Not your keys,       │
  │                            │   not your coins"      │
  └────────────────────────────────────────────────────┘`,

    simpleExample: `Think of your private key as the master password to a safety deposit box — except there's no locksmith who can open it for you. Your address is the box number: anyone can send things to it. Your wallet software is the assistant that helps you manage multiple boxes and compose transactions. The seed phrase is a master blueprint that can reconstruct all your boxes.`,

    details: [
      `**Private key**: A random 256-bit number. Must be kept secret. Losing it means permanently losing access to the associated bitcoin. There is no recovery mechanism at the protocol level.`,
      `**Public key**: Derived from the private key via elliptic curve multiplication. This is a one-way function — you cannot compute the private key from the public key. The public key is revealed when you spend.`,
      `**Address**: A shorter, encoded form derived from the public key via hashing. Different address formats exist (P2PKH, P2SH, bech32, bech32m) corresponding to different script types.`,
      `**HD wallets (BIP-32/39/44/84)**: Hierarchical Deterministic wallets derive an entire tree of keys from a single seed. BIP-39 defines the mnemonic word list. BIP-44/84 define the derivation paths.`,
      `**xpub**: An extended public key that can derive all child public keys (and therefore all addresses) for an account, WITHOUT being able to spend. Useful for watch-only wallets or giving an auditor visibility without spending authority.`,
      `**Change addresses**: Each time your wallet sends a transaction, the change goes to a fresh address derived from the change branch of your HD tree. This improves privacy by not reusing addresses.`,
      `**Hot wallet vs cold wallet**: Hot = connected to the internet (convenient but higher risk). Cold = offline / hardware device (less convenient but much harder to hack).`,
    ],

    keyTerms: [
      { term: 'Private key', definition: 'A secret 256-bit number that grants spending authority over associated UTXOs via digital signatures.' },
      { term: 'Public key', definition: 'Derived from the private key. Used to verify signatures. Revealed on-chain when spending.' },
      { term: 'Address', definition: 'A hashed/encoded form of the public key. What you share to receive bitcoin.' },
      { term: 'Seed phrase (mnemonic)', definition: '12 or 24 words that encode the master seed of an HD wallet. Backs up the entire key tree.' },
      { term: 'HD wallet', definition: 'Hierarchical Deterministic wallet — derives unlimited key pairs from a single seed.' },
      { term: 'xpub', definition: 'Extended public key — can derive all addresses for an account without spending capability.' },
      { term: 'Self-custody', definition: 'Holding your own private keys. You have full control and full responsibility.' },
    ],

    commonConfusion: [
      `**"My wallet holds my bitcoin"** — Your wallet holds your KEYS. The bitcoin (UTXOs) live on the blockchain. Your wallet is a key manager + UTXO tracker + transaction builder.`,
      `**"I can recover my wallet if I lose my seed phrase"** — No. The seed phrase IS your backup. If you lose it and your device is also lost/broken, the bitcoin is gone forever. There is no "forgot password."`,
      `**"One address = one wallet"** — A modern HD wallet generates many addresses. Reusing a single address is a privacy and security anti-pattern.`,
      `**"Addresses are like bank account numbers"** — Similar concept, but addresses are meant to be used once (or at least not reused across unrelated payments) for privacy reasons. Your wallet generates new ones automatically.`,
    ],

    recallPrompts: [
      { question: 'What three functions does a wallet perform?', hint: 'Key ___, UTXO ___, transaction ___.' },
      { question: 'Can you derive the private key from the public key?', hint: 'Elliptic curve multiplication is a ___-way function.' },
      { question: 'What does an xpub let you do?', hint: 'Derive all ___ without being able to ___.' },
    ],

    cheatSheet: [
      'Private key → public key → address (one-way chain)',
      'Wallet = key manager + UTXO tracker + tx builder',
      'HD wallet: single seed phrase → unlimited key pairs',
      'Seed phrase IS your backup — lose it, lose everything',
      'xpub = all addresses, no spending power',
      'Self-custody: your keys, your coins, your responsibility',
      'Custodial: exchange holds keys, you have an IOU',
      'Hot = online (convenient), Cold = offline (secure)',
    ],
  },

  // ─── SECTION 8 — SECURITY & ATTACKS ─────────────────────
  {
    id: 'security',
    number: 8,
    title: 'What Bitcoin Can Resist and What Can Still Go Wrong',
    subtitle: 'Protocol security vs operational security, attack vectors, and threat models',
    icon: '🛡',
    bigPicture: `Bitcoin security operates at two distinct levels:

**Protocol-level security**: The cryptography, consensus mechanism, and network design that make the Bitcoin protocol itself extremely robust. A 51% attack is the main theoretical threat, but it's extraordinarily expensive and limited in what it can achieve.

**User-level (operational) security**: How individual users store keys, verify transactions, and avoid scams. This is where the vast majority of real-world losses occur — phishing, malware, seed phrase theft, exchange hacks, and social engineering.

The protocol is battle-tested and has never been successfully hacked in its consensus mechanism. Almost all real Bitcoin losses come from user error, poor custody practices, or trusting centralized services that get compromised.`,

    whyItMatters: `Understanding the difference between protocol security and operational security prevents both overconfidence ("Bitcoin can't be hacked") and unnecessary fear ("Bitcoin is constantly being attacked"). The protocol is strong. Your personal security practices are what you need to focus on.`,

    visual: `THREAT MODEL HIERARCHY
══════════════════════

  ┌─────────────────────────────────────────────────────┐
  │               PROTOCOL-LEVEL THREATS                 │
  │         (very expensive, limited impact)              │
  │─────────────────────────────────────────────────────│
  │                                                     │
  │  51% ATTACK                                          │
  │  ├─ Attacker gains majority hash power               │
  │  ├─ CAN: reorder recent txs, double-spend            │
  │  ├─ CAN: censor transactions temporarily             │
  │  ├─ CANNOT: steal coins from arbitrary addresses     │
  │  ├─ CANNOT: change consensus rules                   │
  │  ├─ CANNOT: create coins out of nothing              │
  │  └─ CANNOT: spend coins without valid signatures     │
  │                                                     │
  │  SELFISH MINING                                      │
  │  ├─ Attacker withholds blocks for strategic advantage│
  │  └─ Theoretical concern, hard to execute profitably  │
  │                                                     │
  │  ECLIPSE ATTACK                                      │
  │  ├─ Attacker controls all your node's connections    │
  │  └─ Isolates you from the real network               │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │             USER-LEVEL THREATS                       │
  │     (common, diverse, often preventable)              │
  │─────────────────────────────────────────────────────│
  │                                                     │
  │  SEED PHRASE / KEY THEFT                              │
  │  ├─ Phishing sites                                   │
  │  ├─ Social engineering                               │
  │  ├─ Malware / keyloggers                             │
  │  └─ Physical theft of backup                         │
  │                                                     │
  │  CLIPBOARD ATTACKS                                   │
  │  ├─ Malware replaces copied address with attacker's  │
  │  └─ Always verify the address before sending         │
  │                                                     │
  │  EXCHANGE / CUSTODIAL RISK                           │
  │  ├─ Exchange gets hacked                             │
  │  ├─ Exchange freezes your account                    │
  │  └─ Exchange goes bankrupt (e.g., Mt. Gox, FTX)     │
  │                                                     │
  │  ADDRESS REUSE                                       │
  │  ├─ Reduces privacy (links your transactions)        │
  │  └─ Marginally increases cryptographic risk           │
  │                                                     │
  │  POOR BACKUP PRACTICES                               │
  │  ├─ Lost seed phrase                                 │
  │  ├─ Seed phrase stored digitally (cloud, email)      │
  │  └─ No redundant backups                             │
  │                                                     │
  └─────────────────────────────────────────────────────┘`,

    simpleExample: `Imagine a castle (the Bitcoin protocol) with incredibly thick walls. Nobody has ever breached the walls. But people inside the castle keep leaving the side door open, writing the combination to the vault on sticky notes, or handing their keys to strangers who claim to be locksmiths. The castle is secure. The inhabitants' practices often aren't.`,

    details: [
      `**51% attack limits**: Even with majority hash power, an attacker CANNOT spend other people's coins (still needs valid signatures), CANNOT change consensus rules (other nodes would reject invalid blocks), and CANNOT create coins beyond the subsidy. They CAN double-spend their own recent transactions and censor/delay others' transactions.`,
      `**Double-spend risk**: Mainly relevant for 0-conf and low-confirmation transactions. After 6 confirmations, a double-spend requires an enormous amount of sustained hash power.`,
      `**Eclipse attack**: An attacker monopolizes all of your node's peer connections, feeding it a false view of the network. Mitigated by diverse peer connections and Tor/VPN usage.`,
      `**Selfish mining**: A miner withholds blocks to gain a probabilistic advantage in the next block race. Reduces the threshold for profitable attacks below 50%, but is risky and complex to execute.`,
      `**Supply chain attacks**: Hardware wallets could theoretically be compromised during manufacturing. Buy directly from manufacturers, verify firmware.`,
      `**Social engineering**: The most common attack vector. No amount of cryptography protects against someone voluntarily entering their seed phrase on a phishing site.`,
    ],

    keyTerms: [
      { term: '51% attack', definition: 'An entity with majority hash power can reorder recent blocks and double-spend, but cannot steal arbitrary coins or change rules.' },
      { term: 'Double-spend', definition: 'Spending the same UTXO in two conflicting transactions. Confirmations make this exponentially harder.' },
      { term: 'Eclipse attack', definition: 'Isolating a node by controlling all its peer connections, feeding it false network data.' },
      { term: 'Selfish mining', definition: 'Withholding found blocks to gain strategic advantage in subsequent block races.' },
      { term: 'Seed phrase theft', definition: 'The most common real-world attack: tricking or hacking users into revealing their seed phrase.' },
      { term: 'Address reuse', definition: 'Using the same address for multiple transactions. Reduces privacy and marginally increases risk.' },
    ],

    commonConfusion: [
      `**"51% attack means they control Bitcoin"** — No. They can reorder recent transactions and double-spend. They still cannot steal coins, change consensus rules, or create money from nothing. And maintaining 51% is astronomically expensive.`,
      `**"Bitcoin has been hacked"** — The Bitcoin protocol/network has never been successfully hacked. Exchanges and wallets have been hacked. Those are centralized services, not the protocol.`,
      `**"If quantum computers exist, Bitcoin is dead"** — Quantum computing would threaten ECDSA signatures, but not immediately. There are proposed quantum-resistant upgrade paths, and public keys are only exposed when spending. Addresses (hashed public keys) are more resistant.`,
    ],

    recallPrompts: [
      { question: 'What CAN a 51% attacker do? What CAN\'T they do?', hint: 'CAN: reorder/double-spend. CANNOT: steal, create coins, change ___.' },
      { question: 'Where do most real-world Bitcoin losses come from?', hint: 'Not protocol attacks — ___ security and ___ risk.' },
      { question: 'What is an eclipse attack?', hint: 'An attacker controls all of your node\'s ___.' },
    ],

    cheatSheet: [
      'Two levels: protocol security (very strong) vs user security (your responsibility)',
      '51% attack: can double-spend & reorder; CANNOT steal, create coins, or change rules',
      'Most real losses: phishing, key theft, exchange hacks, bad backups',
      'Always verify addresses before sending (clipboard malware exists)',
      'Don\'t reuse addresses (privacy and security anti-pattern)',
      'Self-custody removes exchange risk but adds personal responsibility',
      'Protocol has never been hacked; human practices get hacked constantly',
    ],
  },

  // ─── SECTION 9 — LIGHTNING NETWORK ────────────────────────
  {
    id: 'lightning',
    number: 9,
    title: 'Why Layer 2 Exists and How Lightning Works',
    subtitle: 'Payment channels, routing, liquidity, and Bitcoin\'s scaling approach',
    icon: '⚡',
    bigPicture: `The Bitcoin base layer processes ~7 transactions per second with ~10-minute block times. This is by design — decentralization and security are prioritized over throughput. But this means the base layer cannot handle millions of small daily payments (like buying coffee).

The **Lightning Network** is a Layer 2 protocol built on top of Bitcoin. It enables instant, high-volume, low-fee payments by keeping most transactions off-chain, only using the base layer for opening/closing channels and dispute resolution.

The core concept is a **payment channel**: two parties lock bitcoin in a 2-of-2 multisig on-chain, then exchange signed transactions off-chain to update the balance between them. These updates are instant, free, and private. When they're done, they close the channel and settle the final balance on-chain. The clever part: channels can be **routed** — you can pay someone you don't have a direct channel with, by routing through intermediaries.`,

    whyItMatters: `Lightning is Bitcoin's answer to "Bitcoin is too slow for small payments." It doesn't replace the base layer — it complements it. The base layer is for settlement and security; Lightning is for speed and volume. Understanding this architecture helps you see how Bitcoin scales without sacrificing decentralization.`,

    visual: `PAYMENT CHANNEL LIFECYCLE
═════════════════════════

  1. OPEN CHANNEL (on-chain)
  ┌────────────────────────────────────────────────┐
  │  Alice and Bob create a funding transaction:    │
  │  2-of-2 multisig on Bitcoin base layer          │
  │  Alice puts in 0.1 BTC                         │
  │                                                 │
  │  Channel state: Alice=0.1  Bob=0.0              │
  └────────────────────────────────────────────────┘
            │
            ▼
  2. OFF-CHAIN UPDATES (instant, free)
  ┌────────────────────────────────────────────────┐
  │  They exchange signed "commitment transactions" │
  │  that redistribute the channel balance:         │
  │                                                 │
  │  Update 1: Alice=0.07  Bob=0.03   (Alice→Bob)  │
  │  Update 2: Alice=0.05  Bob=0.05   (Alice→Bob)  │
  │  Update 3: Alice=0.06  Bob=0.04   (Bob→Alice)  │
  │                                                 │
  │  Only the latest state matters.                 │
  │  Old states are revocable (cheating = penalty). │
  └────────────────────────────────────────────────┘
            │
            ▼
  3. CLOSE CHANNEL (on-chain)
  ┌────────────────────────────────────────────────┐
  │  Cooperative close: both sign final state       │
  │  → one on-chain tx settles the final balance    │
  │                                                 │
  │  OR unilateral close: one party broadcasts      │
  │  latest commitment tx (other can dispute)       │
  └────────────────────────────────────────────────┘


ROUTING THROUGH THE NETWORK
════════════════════════════

  Alice wants to pay Dave, but has no direct channel.
  She routes through Bob and Carol:

  Alice ──ch1──► Bob ──ch2──► Carol ──ch3──► Dave

  ┌────────────────────────────────────────────────┐
  │  Uses HTLCs (Hash Time-Locked Contracts):       │
  │                                                 │
  │  Dave generates a secret R, gives hash(R)       │
  │  to Alice.                                      │
  │                                                 │
  │  Alice → Bob:  "I'll pay you if you show R"     │
  │  Bob → Carol:  "I'll pay you if you show R"     │
  │  Carol → Dave: "I'll pay you if you show R"     │
  │                                                 │
  │  Dave reveals R to Carol → Carol pays Dave      │
  │  Carol reveals R to Bob → Bob pays Carol        │
  │  Bob reveals R to Alice → Alice pays Bob        │
  │                                                 │
  │  Result: Alice paid Dave atomically.             │
  │  Either everyone gets paid or no one does.       │
  └────────────────────────────────────────────────┘


BASE LAYER vs LIGHTNING
═══════════════════════

┌──────────────────┬──────────────────┬──────────────────┐
│  Aspect          │  Base Layer      │  Lightning        │
│──────────────────┼──────────────────┼──────────────────│
│  Speed           │  ~10 min blocks  │  Milliseconds     │
│  Throughput      │  ~7 tx/sec       │  Millions tx/sec  │
│  Fees            │  Variable, can   │  Near-zero        │
│                  │  be high         │                   │
│  Settlement      │  Final on-chain  │  Off-chain until  │
│                  │                  │  channel closes   │
│  Privacy         │  Pseudonymous    │  Better (onion    │
│                  │  but traceable   │  routing)         │
│  Best for        │  Large transfers │  Small, frequent  │
│                  │  Final settlem.  │  payments         │
│  Security        │  Full PoW        │  Anchored to      │
│                  │                  │  base layer       │
└──────────────────┴──────────────────┴──────────────────┘`,

    simpleExample: `Think of a bar tab. You open a tab (funding transaction on-chain). Throughout the night, you and the bartender update your running total (off-chain updates). At the end of the night, you settle the tab (close the channel on-chain). You only needed two on-chain transactions (open and close), but made dozens of payments in between.`,

    details: [
      `**Funding transaction**: A standard Bitcoin transaction that locks funds in a 2-of-2 multisig output. This is the only on-chain transaction needed to open a channel.`,
      `**Commitment transactions**: Off-chain signed transactions that represent the current channel state. Each party holds a version. Old states are revocable — publishing an old state results in a penalty (the cheater loses all funds in the channel).`,
      `**HTLCs (Hash Time-Locked Contracts)**: The mechanism that enables trustless multi-hop routing. A conditional payment: "I'll pay you X if you can present the preimage of this hash, before time T." This chains across hops to ensure atomicity.`,
      `**Liquidity**: A channel can only route up to the amount available on the sending side. Channels are directional in terms of available balance. This is why "having enough liquidity" and "balanced channels" matter for the Lightning Network.`,
      `**Onion routing**: Lightning uses onion-encrypted routing similar to Tor. Each hop only knows the previous and next hop, not the full path. This provides strong payment privacy.`,
      `**Channel capacity ≠ available balance**: A 0.1 BTC channel between Alice and Bob means 0.1 BTC total, distributed between them. If Alice has 0.09 and Bob has 0.01, Alice can send up to 0.09 to Bob, but Bob can only send up to 0.01 to Alice through this channel.`,
    ],

    keyTerms: [
      { term: 'Payment channel', definition: 'A 2-of-2 multisig setup that allows two parties to transact off-chain, settling on-chain only when opening/closing.' },
      { term: 'Funding transaction', definition: 'The on-chain transaction that opens a payment channel by locking bitcoin in a multisig.' },
      { term: 'HTLC', definition: 'Hash Time-Locked Contract — enables trustless routing across multiple hops with atomic settlement.' },
      { term: 'Liquidity', definition: 'The available balance in a channel for sending in a given direction. Determines routing capacity.' },
      { term: 'Onion routing', definition: 'Privacy-preserving routing where each hop only knows its immediate neighbors in the payment path.' },
      { term: 'Commitment transaction', definition: 'An off-chain signed transaction representing the current channel balance. Old states are revocable.' },
    ],

    commonConfusion: [
      `**"Lightning replaces Bitcoin"** — Lightning is built ON Bitcoin. It uses the base layer for security, opening/closing channels, and dispute resolution. It's a complement, not a replacement.`,
      `**"Any payment can be routed to anyone"** — Not necessarily. A viable path with sufficient liquidity in the right direction must exist. Payments can fail if no route has enough capacity.`,
      `**"Lightning is centralized because of big routing nodes"** — Large nodes make routing easier but aren't required. Anyone can run a node and open channels. The architecture is permissionless.`,
      `**"Funds on Lightning are less safe"** — They're different-safe. Channel funds are anchored to the base layer. If your counterparty cheats, you can publish the penalty transaction on-chain. You do need to be online (or have a watchtower) to catch cheating attempts.`,
    ],

    recallPrompts: [
      { question: 'What on-chain transaction opens a Lightning channel?', hint: 'A 2-of-2 ___ transaction.' },
      { question: 'How do multi-hop payments work atomically?', hint: 'Hash Time-Locked Contracts. Dave generates a secret, Alice chains conditional payments through ___.' },
      { question: 'Why might a Lightning payment fail?', hint: 'No path with sufficient ___ in the right direction.' },
    ],

    cheatSheet: [
      'Lightning = Layer 2 on Bitcoin for instant, cheap payments',
      'Channel: lock funds on-chain → trade off-chain → settle on-chain',
      'Off-chain updates are instant, free, and private',
      'HTLCs enable trustless multi-hop routing',
      'Liquidity direction matters — channels have limited capacity per direction',
      'Cheating is punished: old states trigger penalty transactions',
      'Base layer = settlement & security; Lightning = speed & volume',
      'Complement, not replacement',
    ],
  },

  // ─── SECTION 10 — BITCOIN vs OTHER BLOCKCHAINS ────────────
  {
    id: 'comparison',
    number: 10,
    title: 'How Bitcoin Differs From Broader Crypto Systems',
    subtitle: 'Design philosophy, technical trade-offs, and why assumptions don\'t transfer',
    icon: '⚖',
    bigPicture: `Bitcoin and other blockchain platforms (Ethereum, Solana, etc.) share surface-level similarities but differ fundamentally in design philosophy, priorities, and technical architecture.

Bitcoin prioritizes:
- **Trust minimization** — minimize the need to trust any party
- **Monetary properties** — sound money, predictable supply, censorship resistance
- **Conservative protocol evolution** — changes are slow, deliberate, and backward-compatible
- **Decentralization** — keep it cheap to run a full node, keep the protocol simple

Other platforms often prioritize:
- **Programmability** — rich smart contracts, decentralized applications
- **Throughput** — more transactions per second at the base layer
- **Feature velocity** — faster protocol changes and upgrades

These aren't inherently better or worse — they're different design trade-offs for different goals. But assumptions from one system often don't transfer cleanly to another.`,

    whyItMatters: `If you come from Ethereum or general "crypto," many concepts don't map directly to Bitcoin. Bitcoin's UTXO model, simple scripting, Layer 2 scaling approach, and conservative culture are deliberate choices, not limitations. Understanding WHY helps you evaluate each system on its own terms.`,

    visual: `DESIGN PHILOSOPHY COMPARISON
════════════════════════════

  BITCOIN                          OTHER PLATFORMS (e.g. Ethereum)
  ──────                          ─────────────────────────────
  Money-first                     Platform-first
  Simple scripting (Bitcoin Script)  Turing-complete (Solidity/EVM)
  Conservative changes             Faster iteration / hard forks
  Layer 2 scaling (Lightning)      Layer 1 scaling + L2
  UTXO model                       Account/balance model
  ~7 tx/sec base layer             Higher L1 throughput
  Proof of Work (energy-based)     Proof of Stake (capital-based)
  Fixed supply (21M)               Variable/inflationary supply
  Minimize trust                   Maximize programmability`,

    comparisonTable: {
      title: 'Bitcoin vs Account-Based Chains',
      colAHeader: 'Bitcoin (UTXO model)',
      colBHeader: 'Account-based (e.g. Ethereum)',
      rows: [
        { aspect: 'State model', colA: 'Set of unspent outputs (UTXOs)', colB: 'Account balances (like a bank ledger)' },
        { aspect: 'Spending', colA: 'Consume entire UTXOs, create new ones', colB: 'Debit sender account, credit receiver' },
        { aspect: 'Privacy', colA: 'New address per tx (better base privacy)', colB: 'Single account address (more linkable)' },
        { aspect: 'Parallelism', colA: 'Naturally parallel (independent UTXOs)', colB: 'Sequential nonce per account' },
        { aspect: 'Scripting', colA: 'Stack-based, limited (by design)', colB: 'Turing-complete smart contracts' },
        { aspect: 'Scaling approach', colA: 'Layer 2 (Lightning Network)', colB: 'L1 sharding + L2 rollups' },
        { aspect: 'Supply policy', colA: 'Fixed 21M, enforced by halving', colB: 'Variable (Ethereum: dynamic issuance)' },
        { aspect: 'Consensus', colA: 'Proof of Work (Nakamoto)', colB: 'Proof of Stake (varies by chain)' },
        { aspect: 'Philosophy', colA: 'Minimize trust, maximize auditability', colB: 'Maximize programmability, more features' },
        { aspect: 'Upgrade culture', colA: 'Very conservative, soft forks preferred', colB: 'More frequent hard forks' },
      ],
    },

    simpleExample: `Think of Bitcoin as a purpose-built vault: it does one thing (secure money) extremely well, with minimal attack surface. Other platforms are more like general-purpose computers: they can do many things, but each new capability adds complexity and potential vulnerabilities. Neither is "wrong" — they serve different purposes.`,

    details: [
      `**UTXO vs Account model**: Bitcoin tracks discrete outputs. Ethereum tracks account balances. UTXOs offer better natural privacy and parallelism but are harder to reason about for complex applications. Accounts are intuitive but create sequential dependencies (nonce ordering).`,
      `**Simple script vs Turing-complete**: Bitcoin Script is intentionally limited — no loops, no arbitrary computation. This restricts what you can build on Bitcoin directly but massively reduces attack surface. Ethereum's EVM supports arbitrary programs (smart contracts) but this creates a much larger surface for bugs and exploits.`,
      `**Proof of Work vs Proof of Stake**: PoW ties security to energy expenditure (physical, external cost). PoS ties security to staked capital (internal, digital cost). The trade-offs involve energy efficiency, decentralization, and security assumptions. This is a deep topic with legitimate arguments on both sides.`,
      `**Scaling philosophy**: Bitcoin scales through layers (Lightning on top of a conservative base layer). Other chains often increase base layer throughput directly, which can increase hardware requirements for validators and affect decentralization.`,
      `**Upgrade culture**: Bitcoin changes very slowly. Major upgrades (SegWit, Taproot) take years of discussion and are deployed as backward-compatible soft forks. Other chains upgrade more frequently, sometimes via hard forks that require all participants to upgrade.`,
    ],

    keyTerms: [
      { term: 'Account model', definition: 'State model where each address has a balance. Transactions debit/credit accounts. Used by Ethereum and most other chains.' },
      { term: 'Proof of Stake', definition: 'Consensus where validators stake capital (coins) instead of expending energy. Used by Ethereum post-merge.' },
      { term: 'Soft fork', definition: 'A backward-compatible protocol upgrade. Old nodes still accept new blocks. Bitcoin\'s preferred upgrade method.' },
      { term: 'Hard fork', definition: 'A non-backward-compatible upgrade requiring all nodes to update. Common in Ethereum and other chains.' },
      { term: 'Turing-complete', definition: 'A system capable of arbitrary computation. Ethereum\'s EVM is Turing-complete; Bitcoin Script is not.' },
      { term: 'Bitcoin Script', definition: 'Bitcoin\'s stack-based scripting language. Intentionally limited — no loops, no arbitrary state.' },
    ],

    commonConfusion: [
      `**"Bitcoin is outdated / can't do smart contracts"** — Bitcoin's scripting is limited BY DESIGN. Complexity = attack surface. Bitcoin does have scripting capabilities (multisig, timelocks, Taproot/Tapscript), and complex logic can live on Layer 2.`,
      `**"More TPS = better blockchain"** — Throughput increases often come at the cost of decentralization (higher node requirements) or security assumptions. Bitcoin's approach is to keep the base layer simple and scale on higher layers.`,
      `**"Proof of Stake is strictly better than Proof of Work"** — They have different security models, trust assumptions, and trade-offs. PoW provides physical-world anchoring and simpler game theory. PoS is more energy-efficient but introduces different centralization risks (e.g., capital concentration).`,
      `**"What works on Ethereum works on Bitcoin"** — The mental models are different. UTXO vs accounts, limited scripting vs Turing-complete, conservative upgrades vs rapid iteration. Direct translation of concepts is usually incorrect.`,
    ],

    recallPrompts: [
      { question: 'Name three key differences between Bitcoin\'s design philosophy and Ethereum\'s.', hint: 'Money vs platform, simple script vs ___, conservative vs ___.' },
      { question: 'Why is Bitcoin Script intentionally limited?', hint: 'Less complexity = smaller ___ surface.' },
      { question: 'How does Bitcoin\'s scaling approach differ from chains that increase base-layer throughput?', hint: 'Bitcoin scales through ___ (e.g., Lightning).' },
    ],

    cheatSheet: [
      'Bitcoin: money-first, trust-minimized, conservative, PoW, UTXO, Layer 2 scaling',
      'Other chains: platform-first, programmable, faster iteration, often PoS, accounts',
      'UTXO = discrete outputs; Account = running balance',
      'Bitcoin Script is intentionally limited → smaller attack surface',
      'PoW = energy-based security; PoS = capital-based security',
      'Bitcoin upgrades slowly (soft forks); other chains upgrade faster (hard forks)',
      'More TPS ≠ better; trade-offs in decentralization and security',
      'Don\'t map Ethereum mental models directly onto Bitcoin',
    ],
  },

  // ─── SECTION 11 — SEGREGATED WITNESS (SEGWIT) ─────────────────
  {
    id: 'segwit',
    number: 11,
    title: 'Segregated Witness (SegWit)',
    subtitle: 'Transaction malleability fix, the witness discount, and how SegWit unlocked Lightning',
    icon: '✂',
    bigPicture: `Segregated Witness (SegWit) is a protocol upgrade activated in August 2017 via a soft fork (BIP 141). The name describes exactly what it does: it **segregates** (separates) the **witness** data (signatures) from the transaction data that computes the transaction ID (TXID).

Before SegWit, a transaction's ID was computed from the entire serialized transaction, including signatures. This created a critical vulnerability: **transaction malleability** — a third party could modify the signature bytes in a valid way (without invalidating the signature itself) and produce a different TXID for the same economic transaction. This broke Lightning Network channels and caused real operational problems for exchanges.

SegWit solves this by moving signature data into a separate "witness" structure that is NOT included in the TXID calculation. The TXID is now computed only from the non-witness data, making it immutable once broadcast. As a side effect, SegWit also introduced a **witness discount**: witness data is counted at 1/4 the weight of non-witness data, effectively increasing block capacity from ~1 MB to ~2-4 MB for typical workloads.`,

    whyItMatters: `SegWit was the foundational upgrade that made the Lightning Network possible. Without a fixed TXID (the transaction malleability fix), Lightning's channel funding transactions couldn't be safely pre-signed. SegWit also introduced the "virtual byte" (vByte) weight system that all modern fee calculations use, and defined the bech32 address format (bc1q...) still dominant today.`,

    visual: `TRANSACTION MALLEABILITY - THE PROBLEM
========================================

  Before SegWit:
  TXID = SHA256d( version + inputs + outputs + locktime + signatures )

  Problem: signatures could be "malleated" (altered while still valid)
           -> different TXID for the same economic transaction
           -> broke pre-signed tx chains (Lightning, time-locked contracts)


SEGWIT SOLUTION - SEPARATE THE WITNESS
========================================

  After SegWit:
  TXID = SHA256d( version + inputs + outputs + locktime )
         (NO signatures in TXID computation)

  WTXID = SHA256d( version + marker + flag + inputs + outputs +
                   witness_data + locktime )

  TXID is now immutable once broadcast.
  Witness data travels alongside but does not affect the ID.


BLOCK WEIGHT SYSTEM
====================

  Old model: 1 block = max 1,000,000 bytes (1 MB)

  New model: 1 block = max 4,000,000 weight units (WU)
             Non-witness byte = 4 WU
             Witness byte     = 1 WU  <- 75% discount

  Virtual byte (vByte) = weight_units / 4
  Block limit in vBytes = 1,000,000 vB (but up to ~4 MB actual data)

  Real-world capacity:
  +------------------------+--------------------+
  |  Transaction type      | Typical block size |
  +------------------------+--------------------+
  |  All legacy (P2PKH)    | ~1 MB              |
  |  Mixed                 | ~1.5-2 MB          |
  |  All native SegWit     | ~2-2.5 MB          |
  +------------------------+--------------------+


ADDRESS TYPE EVOLUTION
=======================

  P2PKH    (1...)      Legacy          ~148 vB input
  P2SH-P2WPKH (3...)  Wrapped SegWit  ~91 vB input
  P2WPKH   (bc1q...)  Native SegWit   ~68 vB input
  P2TR     (bc1p...)  Taproot         ~57.5 vB input`,

    simpleExample: `Think of a check. Before SegWit, the check number was calculated from the ink of the signature — a forger could rewrite the signature with equivalent ink and produce a "different check" that was still valid but had a new ID. After SegWit, the check number is calculated from the amount and parties only. The signature is stapled to the side. You cannot change the check number anymore.`,

    details: [
      `**Soft fork deployment**: SegWit activated via BIP 9 miner signaling (BIP 141). Old nodes still accepted SegWit blocks — they saw the witness-program outputs as "anyone can spend" but did not enforce witness rules. New nodes enforced the full SegWit ruleset. Backward compatibility preserved.`,
      `**Witness discount rationale**: Witness data can be pruned by nodes after validation. It does not need to be stored forever like UTXO set data. The discount reflects this lower long-term cost to the network.`,
      `**vBytes vs bytes**: Modern wallets and fee estimators use virtual bytes (vB), not raw bytes. Fee rate = sat/vB. A native SegWit input is ~68 vB vs ~148 vB for legacy P2PKH — more than 50% cheaper per spend.`,
      `**Wrapped SegWit (P2SH-P2WPKH)**: A transition format that wraps native SegWit scripts inside P2SH for compatibility with wallets that did not yet support bech32 addresses. Still common but more expensive than native SegWit.`,
      `**WTXID vs TXID**: WTXID includes all witness data and is used in the witness commitment inside the coinbase transaction. TXID remains the stable identifier used in inputs and outputs.`,
      `**Script versioning**: SegWit introduced versioned witness scripts. Version 0 = P2WPKH and P2WSH. Version 1 = Taproot (activated November 2021). This versioning enables future script upgrades as soft forks without changing the base transaction format.`,
    ],

    keyTerms: [
      { term: 'Transaction malleability', definition: 'The ability to alter signature bytes in a valid transaction, changing its TXID without invalidating it. SegWit fixed this.' },
      { term: 'Witness data', definition: 'Signature and script data separated from the main transaction body under SegWit. Not included in TXID computation.' },
      { term: 'Weight unit (WU)', definition: 'Post-SegWit transaction size unit. Non-witness bytes = 4 WU; witness bytes = 1 WU. Block limit = 4,000,000 WU.' },
      { term: 'Virtual byte (vByte)', definition: 'WU divided by 4. Used for fee rate calculations (sat/vB). Block limit = 1,000,000 vB.' },
      { term: 'P2WPKH', definition: 'Pay-to-Witness-Public-Key-Hash. Native SegWit address type using bech32 encoding (bc1q...).' },
      { term: 'bech32', definition: 'The address encoding format for native SegWit (bc1q...) addresses. Uses only lowercase alphanumerics for clarity and error detection.' },
      { term: 'Witness discount', definition: 'Witness bytes cost 1 WU instead of 4 WU, making SegWit transactions significantly cheaper than legacy transactions.' },
    ],

    commonConfusion: [
      `**"SegWit increased the block size to 4 MB"** — Not exactly. SegWit changed the limit to 4 million weight units. Blocks with typical transaction mixes reach ~1.5-2.5 MB in practice. A theoretical all-native-SegWit block could approach ~4 MB of raw data.`,
      `**"SegWit was just about lower fees"** — The fee reduction was a side effect. The primary purpose was fixing transaction malleability to enable Lightning Network and other second-layer protocols that rely on pre-signed transactions.`,
      `**"P2SH addresses (3...) are always SegWit"** — Only if they are wrapped SegWit (P2SH-P2WPKH). Many P2SH outputs are plain multisig with no SegWit benefit. You cannot tell from the address prefix alone.`,
      `**"Miners opposed SegWit because it reduced fees"** — Some miners preferred a direct block size increase. The conflict was also about decentralization philosophy and the precedent for how Bitcoin scales. See Section 13.`,
    ],

    recallPrompts: [
      { question: 'What is transaction malleability and why did it block the Lightning Network?', hint: 'If TXID could change after signing, pre-signed channel funding transactions would reference a ___ TXID.' },
      { question: 'How does the witness discount work in weight units?', hint: 'Witness bytes = ___ WU. Non-witness bytes = ___ WU. So signatures cost ___ as much.' },
      { question: 'What address format did native SegWit introduce?', hint: 'bech32 encoding: bc1___ prefix.' },
    ],

    cheatSheet: [
      'SegWit = soft fork, August 2017 (BIP 141)',
      'Separates signature (witness) from TXID computation -> fixes malleability',
      'Block limit: 4,000,000 weight units (not 4 MB)',
      'Witness bytes = 1 WU; non-witness bytes = 4 WU -> 75% discount on signatures',
      'vByte = WU / 4 (the standard unit for modern fee rates)',
      'Native SegWit: P2WPKH -> bc1q... addresses (bech32)',
      'Taproot: SegWit v1 -> bc1p... addresses (bech32m)',
      'SegWit was the prerequisite that made Lightning Network possible',
    ],
  },

  // ─── SECTION 12 — TAPROOT & SCHNORR ──────────────────────────
  {
    id: 'taproot',
    number: 12,
    title: 'Taproot & Schnorr Signatures',
    subtitle: 'Key aggregation, MAST, script privacy, and Bitcoin\'s biggest upgrade since SegWit',
    icon: '🌿',
    bigPicture: `Taproot is a soft fork upgrade activated in November 2021 (BIP 340/341/342). It bundles three interrelated improvements: **Schnorr signatures**, **Taproot script commitments (MAST)**, and **Tapscript**. Together, they make complex Bitcoin scripts look indistinguishable from simple payments on-chain — dramatically improving privacy and efficiency.

The core insight: with Taproot, a multisig spend, a Lightning channel close, or a complex time-locked contract can all appear identical to a single-key payment on the blockchain. If all parties agree (the "happy path"), the transaction is completely indistinguishable from a regular send — no scripts, no complex locking conditions visible to observers.

**Schnorr signatures** replace ECDSA for Taproot outputs. Schnorr has a crucial algebraic property: multiple public keys can be **aggregated** into a single combined public key, and multiple signatures can be aggregated into a single signature. A 3-of-3 multisig with MuSig2 is indistinguishable from a single-key signature on-chain.`,

    whyItMatters: `Taproot is the foundation of Bitcoin's next decade of development. It enables more efficient multisig, more private Lightning channel closes, more compact smart contracts, and the foundation for Discreet Log Contracts (DLCs). The "looks like a regular tx" property is powerful for privacy — it erodes the heuristics blockchain surveillance firms rely on to deanonymize users.`,

    visual: `ECDSA vs SCHNORR SIGNATURES
============================

  ECDSA (pre-Taproot):
  - Non-linear math, complex batch verification
  - Signature size: ~71-72 bytes each
  - n-of-n multisig -> n separate keys + n separate sigs on-chain
  - Script structure visible to anyone

  Schnorr (BIP 340):
  - Linear math: enables key and signature aggregation
  - Signature size: exactly 64 bytes each (smaller + faster)
  - n-of-n multisig + MuSig2 -> 1 combined key + 1 sig on-chain
  - Indistinguishable from a regular single-key spend


TAPROOT COMMITMENT STRUCTURE (BIP 341)
=======================================

               TAPROOT OUTPUT KEY (Q)
              Q = P + hash(P || root) * G

              P = internal key (happy path)
              root = Merkle root of all script alternatives

                         |
          +--------------+--------------+
          |                             |
   KEY PATH SPEND              SCRIPT PATH SPEND
   (cooperative)               (fallback)

   All parties agree?          Use a specific script leaf
   -> sign with combined key   -> reveal leaf + Merkle proof
   -> looks like a regular tx  -> only USED script is visible
   -> NO scripts visible        -> other scripts stay private


MAST - MERKELIZED ALTERNATIVE SCRIPT TREES
============================================

  "Alice can spend after 1 year, OR 2-of-3 multisig anytime"

                  [Merkle Root]
                       |
           +-----------+-----------+
           |                       |
  [Leaf A: Alice 1yr]   [Leaf B: 2-of-3 multisig]

  If 2-of-3 multisig is used -> Leaf B + proof revealed
  Leaf A (the timelock) stays private forever


LIGHTNING CHANNEL CLOSE - PRIVACY IMPROVEMENT
===============================================

  Pre-Taproot:  2-of-2 multisig spend visible on-chain
                -> identifiable as Lightning channel

  Post-Taproot: Cooperative close = key path spend
                -> looks like a regular 1-of-1 tx
                -> completely unidentifiable as Lightning`,

    simpleExample: `Think of Taproot as a magic legal document. The cover page says "this asset belongs to Alice and Bob" — clean, simple, private. Hidden inside are 37 pages of fallback conditions. If everyone cooperates and signs normally, observers only ever see the cover page. The 37 backup clauses are committed to cryptographically but never revealed unless a fallback is actually needed.`,

    details: [
      `**BIP 340/341/342**: These three BIPs activated together in November 2021. BIP 340 defines Schnorr signatures; BIP 341 defines the Taproot commitment structure; BIP 342 defines Tapscript (the updated scripting language for script-path spends).`,
      `**MuSig2**: A two-round interactive protocol for n-of-n Schnorr key and signature aggregation. Participants must exchange nonce commitments before signing to prevent rogue-key attacks. The result is a single combined key and a single combined signature on-chain.`,
      `**Discreet Log Contracts (DLCs)**: A smart contract primitive enabled by Schnorr signatures. An oracle signs a real-world outcome (e.g., BTC price on a specific date). This signature directly unlocks a contract payout — without the oracle knowing anything about the specific contract it is enabling.`,
      `**Tapscript (BIP 342)**: The updated scripting language for Taproot script-path spends. Introduces OP_SUCCESS opcodes — any future opcode defined as OP_SUCCESS causes immediate script success on old nodes, enabling new functionality via soft forks while remaining backward compatible.`,
      `**Speedy Trial activation**: Taproot used a modified activation mechanism with a fixed 3-month signaling window requiring 90% miner support. It achieved this quickly with near-universal technical consensus — a contrast to the contentious SegWit activation. See Section 13.`,
      `**bc1p addresses**: Taproot outputs use bech32m encoding (a slightly improved checksum over bech32), producing addresses starting with bc1p. The different checksum prevents accidentally sending native SegWit funds to a Taproot address or vice versa.`,
    ],

    keyTerms: [
      { term: 'Schnorr signature', definition: 'A signature scheme with linear algebraic properties enabling key/signature aggregation and efficient batch verification. Replaces ECDSA for Taproot outputs.' },
      { term: 'Key aggregation', definition: 'Combining multiple public keys and signatures into a single key/signature. Makes n-of-n multisig indistinguishable from a single-key spend.' },
      { term: 'MuSig2', definition: 'A two-round interactive protocol for n-of-n Schnorr key/signature aggregation, secure against rogue-key attacks.' },
      { term: 'Taproot output (Q)', definition: 'The on-chain output key committing to both an internal signing key (happy path) and a Merkle root of all fallback scripts.' },
      { term: 'MAST', definition: 'Merkelized Alternative Script Trees. Only the executed script branch is revealed on-chain; all unexecuted alternatives remain private.' },
      { term: 'Key path spend', definition: 'Spending a Taproot output via the internal key (cooperative). Looks identical to a regular single-key spend.' },
      { term: 'Script path spend', definition: 'Spending via a committed script leaf. Requires revealing that specific leaf and its Merkle proof.' },
      { term: 'Tapscript', definition: 'The updated scripting language for Taproot script-path spends, with OP_SUCCESS opcodes for forward-compatible upgrades.' },
    ],

    commonConfusion: [
      `**"Taproot makes Bitcoin like Ethereum"** — Taproot enables more expressive scripts and primitives like DLCs, but Bitcoin remains intentionally non-Turing-complete. No loops, no arbitrary state machines. The security trade-off is explicit.`,
      `**"Taproot makes Bitcoin fully private"** — Taproot significantly improves privacy when all parties cooperate (key path spends). Forced script-path spends still reveal the used branch. It is a meaningful improvement, not complete privacy.`,
      `**"Schnorr key aggregation means anyone can steal coins"** — The linearity that enables aggregation is carefully constrained by protocols like MuSig2. A naive "just add the keys" approach is vulnerable to rogue-key attacks. MuSig2 prevents this with a commitment round.`,
      `**"Taproot was as controversial as SegWit"** — Much less so. There was near-universal technical agreement. The Bitcoin community had matured significantly from the block size wars. Activation via Speedy Trial was smooth and completed without a chain split.`,
    ],

    recallPrompts: [
      { question: 'What is the key path vs script path in a Taproot spend?', hint: 'Key path = all parties cooperate, looks like a ___ spend. Script path = uses a fallback, reveals only the ___ leaf.' },
      { question: 'What algebraic property of Schnorr enables key aggregation?', hint: 'Schnorr is ___ (ECDSA is non-linear). This allows combining keys and signatures into ___.' },
      { question: 'What is MAST and why does it improve privacy?', hint: 'Only the ___ script branch is revealed. Unexecuted alternatives stay ___.' },
    ],

    cheatSheet: [
      'Taproot = BIP 340/341/342, activated November 2021',
      'Schnorr: 64 bytes, linear algebra, batch-verifiable, aggregatable',
      'MuSig2: n-of-n multisig -> 1 combined key + 1 combined signature on-chain',
      'Taproot output commits to an internal key AND a Merkle tree of scripts',
      'Key path spend (happy path) = indistinguishable from a regular single-key tx',
      'MAST: only the executed script branch is revealed; others remain private',
      'bc1p... = bech32m encoding for Taproot (SegWit v1) outputs',
      'Enables DLCs, more private Lightning closes, forward-compatible script upgrades',
    ],
  },

  // ─── SECTION 13 — BLOCK SIZE WARS & BITCOIN GOVERNANCE ────────
  {
    id: 'governance',
    number: 13,
    title: 'The Block Size Wars & Bitcoin Governance',
    subtitle: 'How Bitcoin makes decisions, why the 2015-2017 scaling debate mattered, and what UASF revealed',
    icon: '⚔',
    bigPicture: `From 2015 to 2017, Bitcoin faced its most existential political crisis: the **block size debate**. On one side, a coalition of miners and businesses argued for a simple hard fork to increase the base block size from 1 MB to 8 MB. On the other, a coalition of developers and users argued for SegWit as a soft fork, keeping the base layer constrained and scaling via second-layer solutions like Lightning.

This was not just a technical debate. It was a power struggle over **who controls Bitcoin's protocol rules**: miners, businesses, developers, or users. The answer Bitcoin gave is now called the **UASF** (User-Activated Soft Fork) — and it settled the question of Bitcoin's governance model definitively.

The resolution: SegWit activated in August 2017 via UASF (BIP 148). A competing chain forked off as **Bitcoin Cash** (BCH) with 8 MB blocks. Bitcoin Cash later split further. Bitcoin retained 99%+ of the market value. The market delivered its verdict clearly.`,

    whyItMatters: `The block size wars answered the most important governance question: "who runs Bitcoin?" The answer: not any single party. Not Core developers (they write code; they do not deploy it). Not miners (they build blocks under rules that nodes enforce). Not exchanges (they cannot change the protocol). The UASF demonstrated that **full node operators — users running the software — are the ultimate arbiter of Bitcoin's consensus rules**. This is by design, and it is the reason Bitcoin cannot be captured.`,

    visual: `TIMELINE OF THE SCALING DEBATE
================================

  2015  Block space filling up, fees rising
        Bitcoin XT: 8 MB hard fork proposal -> rejected by community

  2016  Bitcoin Classic: 2 MB hard fork -> rejected
        Bitcoin Unlimited: no fixed limit -> rejected
        Hong Kong Agreement: miners promise SegWit + 2 MB HF
        (agreement never honored)

  Feb 2017  New York Agreement (NYA / SegWit2x):
            Miners + companies agree to:
            1. Activate SegWit (soft fork)
            2. 2 MB base block hard fork within 6 months

  May 2017  BIP 148 (UASF) announced:
            "If SegWit not signaled by Aug 1, 2017,
             BIP 148 nodes REJECT non-signaling blocks"
            -> Full nodes enforcing rules, not miners

  Aug 1, 2017  UASF deadline hits
               Miners rush to signal; SegWit locks in within days
               Bitcoin Cash hard fork (8 MB blocks)

  Nov 2017  SegWit2x (the 2 MB part of NYA) cancelled
            Insufficient consensus; strong community opposition

  Result
  ------
  Bitcoin (BTC): SegWit, original chain, ~99%+ market cap
  Bitcoin Cash (BCH): 8 MB blocks, ~0.3% of BTC value by 2024
  Bitcoin SV, eCash: further forks of BCH, negligible value


WHO HAS POWER IN BITCOIN?
==========================

  Entity         What they control          What they DON'T
  ----------     ------------------------   -----------------
  Core devs      Reference software         Protocol enforcement
  Miners         Block production           Rule validity
                 Transaction ordering       (nodes enforce)
  Exchanges      Fiat gateway access        Protocol changes
  Full nodes     RULE ENFORCEMENT           Block creation
  (USERS)        Define "valid Bitcoin"
                 <- Ultimate authority


HARD FORK vs SOFT FORK
=======================

  SOFT FORK                  HARD FORK
  ---------                  ---------
  Tightens existing rules    Loosens or changes rules
  Old nodes accept new       Old nodes reject new blocks
  Backward compatible        Chain splits if not universal
  SegWit, Taproot            Bitcoin Cash, Ethereum Classic`,

    simpleExample: `Imagine a city's constitution. Legal scholars (developers) draft amendment proposals. The construction industry (miners) builds to spec. Real estate companies (exchanges) market properties. But the **residents** (full node operators) enforce the zoning laws — they vote with their feet by only buying property that follows the rules. Even if 90% of construction companies broke zoning laws, if residents refused to buy those buildings, they would be worthless. UASF was the residents voting.`,

    details: [
      `**The BIP process**: Bitcoin Improvement Proposals are the formal mechanism for proposing protocol changes. Anyone can write a BIP; adoption requires rough consensus — not a committee vote, not a CEO decision. BIP 141 (SegWit) and BIP 148 (UASF) are the defining examples.`,
      `**Why miners could not force SegWit2x**: Miners building SegWit2x blocks could produce blocks — but if the majority of full nodes ran BIP 148 software rejecting those blocks, those blocks earned nothing. Mining on a chain nobody validates is economically irrational. Economic self-interest forced compliance.`,
      `**Bitcoin Cash's core argument**: BCH proponents argued small blocks priced out everyday users from on-chain transactions, betraying the "peer-to-peer electronic cash" mission. They wanted high throughput directly on-chain for global adoption.`,
      `**Bitcoin's counter-argument**: Larger blocks increase full node hardware requirements, centralizing validation. A network where only large data centers can run nodes sacrifices censorship resistance. Layer 2 scales without compromising base layer security.`,
      `**The economic conflict**: Miners who signed the NYA had revenue interests tied to on-chain fees. Lightning routes payments off-chain, reducing miner fee income over time. This was a genuine economic conflict of interest, not purely a technical disagreement.`,
      `**Market verdict**: At the BCH fork, every Bitcoin holder received equivalent BCH. BCH immediately traded at ~10% of BTC price, then continued declining. By 2024, BCH trades at roughly 0.3% of BTC's price. The market chose the conservative, decentralized chain.`,
    ],

    keyTerms: [
      { term: 'UASF', definition: 'User-Activated Soft Fork — a soft fork enforced by full node operators without waiting for miner majority signaling. BIP 148 was the defining example.' },
      { term: 'Hard fork', definition: 'A non-backward-compatible protocol change. Old nodes reject new blocks, causing a permanent chain split if not universally adopted.' },
      { term: 'Soft fork', definition: 'A backward-compatible protocol tightening. Old nodes still accept blocks produced by upgraded nodes.' },
      { term: 'Bitcoin Cash (BCH)', definition: 'A 2017 hard fork of Bitcoin with an 8 MB base block limit. Trades some decentralization for higher on-chain transaction throughput.' },
      { term: 'New York Agreement (NYA)', definition: 'A 2017 agreement by miners and companies to activate SegWit + a 2 MB hard fork. The SegWit part succeeded; the 2 MB part was cancelled due to community opposition.' },
      { term: 'BIP', definition: 'Bitcoin Improvement Proposal — the formal process for proposing and documenting Bitcoin protocol changes. Open to anyone.' },
      { term: 'Rough consensus', definition: 'Bitcoin\'s governance model: no formal voting, but broad agreement among developers, node operators, and users before changes are deployed.' },
    ],

    commonConfusion: [
      `**"Bitcoin Core controls Bitcoin"** — Core is the dominant reference implementation, but any software following consensus rules is valid. The block size wars proved that Core's decisions do not unilaterally determine protocol rules — users choose which software to run.`,
      `**"Miners have final say"** — Miners have significant practical influence (they order and include transactions). But full nodes enforce validity. A miner producing an invalid block earns nothing because full nodes reject it.`,
      `**"Bitcoin Cash failed because of poor marketing"** — BCH's lower market value reflects genuine market assessment of security and decentralization trade-offs. Larger blocks require more powerful nodes, concentrating validation. The market valued decentralization over raw throughput.`,
      `**"The governance debate is over"** — The base block size question is settled. But debates continue: Ordinals/inscriptions data usage, OP_RETURN limits, fee market sustainability post-subsidy. The governance mechanism — rough consensus via node operators — remains the same.`,
    ],

    recallPrompts: [
      { question: 'What is a UASF and how did BIP 148 work mechanically?', hint: 'Full node operators signal they will reject non-compliant blocks on a specific ___, forcing miners to comply or lose their block rewards.' },
      { question: 'Why could miners not force through SegWit2x even with majority hash power?', hint: 'Blocks that full nodes reject are worthless. Miners earn nothing mining on a chain that nobody ___.' },
      { question: 'What is the key difference between a soft fork and a hard fork?', hint: 'Soft = ___ compatible (old nodes still accept new blocks). Hard = old nodes ___ new blocks.' },
    ],

    cheatSheet: [
      'Block size wars: 2015-2017, resolved by UASF + SegWit activated Aug 2017',
      'Bitcoin Cash: 8 MB hard fork, ~0.3% of BTC market value by 2024',
      'UASF (BIP 148): full node operators enforce rules, not miners',
      'Soft fork = backward compatible; hard fork = chain split risk',
      'BIP process: anyone proposes; adoption requires rough consensus',
      'Miners propose blocks; full nodes define what counts as valid',
      'NYA: SegWit activated; 2 MB hard fork part was cancelled',
      'Market verdict: users chose the conservative, decentralized chain',
    ],
  },
]
