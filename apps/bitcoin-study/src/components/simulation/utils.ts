import type { SimBlock, SimTransaction, SimTxInput, SimTxOutput, SimUTXO, SimNode, SimWallet, SimState } from './types'

const HEX = '0123456789abcdef'

export function fakeHash(leadingZeros = 0): string {
  const prefix = '0'.repeat(leadingZeros)
  const rest = Array.from({ length: 64 - leadingZeros }, () => HEX[Math.floor(Math.random() * 16)]).join('')
  return prefix + rest
}

export function shortHash(hash: string, len = 8): string {
  return hash.slice(0, len) + '...' + hash.slice(-4)
}

export function computeMerkleRoot(txids: string[]): string {
  if (txids.length === 0) return fakeHash()
  let level = [...txids]
  while (level.length > 1) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i]
      const right = level[i + 1] ?? level[i]
      next.push(fakeHash())
      void left; void right;
    }
    level = next
  }
  return level[0]
}

export interface MerkleNode {
  hash: string
  left?: MerkleNode
  right?: MerkleNode
  txIndex?: number
}

export function buildMerkleTree(txids: string[]): MerkleNode {
  if (txids.length === 0) {
    return { hash: fakeHash() }
  }

  let level: MerkleNode[] = txids.map((txid, i) => ({ hash: txid, txIndex: i }))

  while (level.length > 1) {
    const next: MerkleNode[] = []
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i]
      const right = level[i + 1] ?? { ...level[i] }
      next.push({
        hash: fakeHash(),
        left,
        right: level[i + 1] ? right : { ...left, hash: left.hash },
      })
    }
    level = next
  }

  return level[0]
}

export function getMerklePath(node: MerkleNode, targetIndex: number): string[] {
  const path: string[] = []

  function walk(n: MerkleNode): boolean {
    if (n.txIndex === targetIndex) {
      path.push(n.hash)
      return true
    }
    if (n.left && walk(n.left)) {
      path.push(n.hash)
      return true
    }
    if (n.right && walk(n.right)) {
      path.push(n.hash)
      return true
    }
    return false
  }

  walk(node)
  return path
}

let txCounter = 0
export function nextTxId(): string {
  txCounter++
  return fakeHash()
}

function makeCoinbaseTx(height: number, wallets: SimWallet[]): SimTransaction {
  const subsidy = getBlockSubsidy(height)
  const txid = nextTxId()

  const outputs: SimTxOutput[] = []

  if (height === 0) {
    const perWallet = [
      { wallet: wallets[0], amount: 1.0 },
      { wallet: wallets[1], amount: 0.5 },
      { wallet: wallets[2], amount: 0.25 },
    ]
    for (const { wallet, amount } of perWallet) {
      outputs.push({
        amount,
        scriptPubKey: `OP_DUP OP_HASH160 <${wallet.name}_hash> OP_EQUALVERIFY OP_CHECKSIG`,
        walletLabel: wallet.name,
        address: wallet.address,
      })
    }
  } else {
    const miner = wallets.find(w => w.name === 'Miner') ?? wallets[0]
    outputs.push({
      amount: subsidy,
      scriptPubKey: `OP_DUP OP_HASH160 <${miner.name}_hash> OP_EQUALVERIFY OP_CHECKSIG`,
      walletLabel: miner.name,
      address: miner.address,
    })
  }

  return {
    txid,
    inputs: [{
      prevTxid: '0'.repeat(64),
      vout: 0xffffffff,
      scriptSig: `coinbase (height=${height})`,
      walletLabel: 'Coinbase',
      amount: 0,
    }],
    outputs,
    fee: 0,
    feeRate: 0,
    size: 250,
    isCoinbase: true,
    timestamp: Date.now(),
  }
}

function getBlockSubsidy(height: number): number {
  const halvings = Math.floor(height / 210000)
  if (halvings >= 64) return 0
  return 50 / Math.pow(2, halvings)
}

export function createGenesisBlock(wallets: SimWallet[]): SimBlock {
  const coinbase = makeCoinbaseTx(0, wallets)
  const merkleRoot = computeMerkleRoot([coinbase.txid])

  return {
    height: 0,
    hash: fakeHash(7),
    header: {
      version: '0x20000000',
      prevHash: '0'.repeat(64),
      merkleRoot,
      timestamp: Date.now(),
      nBits: '0x1d00ffff',
      nonce: 2083236893,
    },
    transactions: [coinbase],
    size: 285,
  }
}

export function createBlock(
  prevBlock: SimBlock,
  txsFromMempool: SimTransaction[],
  wallets: SimWallet[],
  nonce: number,
): SimBlock {
  const height = prevBlock.height + 1
  const coinbase = makeCoinbaseTx(height, wallets)

  const totalFees = txsFromMempool.reduce((sum, tx) => sum + tx.fee, 0)
  coinbase.outputs[0].amount += totalFees

  const allTxs = [coinbase, ...txsFromMempool]
  const merkleRoot = computeMerkleRoot(allTxs.map(t => t.txid))

  return {
    height,
    hash: fakeHash(7),
    header: {
      version: '0x20000000',
      prevHash: prevBlock.hash,
      merkleRoot,
      timestamp: Date.now(),
      nBits: '0x17034219',
      nonce,
    },
    transactions: allTxs,
    size: 250 + allTxs.length * 220,
  }
}

export function buildUtxoSetFromChain(blockchain: SimBlock[]): Record<string, SimUTXO> {
  const set: Record<string, SimUTXO> = {}
  const spent = new Set<string>()

  for (const block of blockchain) {
    for (const tx of block.transactions) {
      if (!tx.isCoinbase) {
        for (const inp of tx.inputs) {
          spent.add(`${inp.prevTxid}:${inp.vout}`)
        }
      }
      for (let i = 0; i < tx.outputs.length; i++) {
        const key = `${tx.txid}:${i}`
        set[key] = {
          txid: tx.txid,
          vout: i,
          amount: tx.outputs[i].amount,
          scriptPubKey: tx.outputs[i].scriptPubKey,
          walletLabel: tx.outputs[i].walletLabel,
          address: tx.outputs[i].address,
          spent: false,
        }
      }
    }
  }

  for (const key of spent) {
    if (set[key]) set[key].spent = true
  }

  return set
}

export function getWalletBalance(utxoSet: Record<string, SimUTXO>, walletName: string): number {
  return Object.values(utxoSet)
    .filter(u => u.walletLabel === walletName && !u.spent)
    .reduce((sum, u) => sum + u.amount, 0)
}

export function getWalletUtxos(utxoSet: Record<string, SimUTXO>, walletName: string): SimUTXO[] {
  return Object.values(utxoSet)
    .filter(u => u.walletLabel === walletName && !u.spent)
    .sort((a, b) => b.amount - a.amount)
}

export function createTransaction(
  utxoSet: Record<string, SimUTXO>,
  fromWallet: SimWallet,
  toWallet: SimWallet,
  amount: number,
  feeRate: number,
): SimTransaction | null {
  const available = getWalletUtxos(utxoSet, fromWallet.name)
  const size = 250
  const fee = Math.round((feeRate * size) / 100000000 * 100000000) / 100000000
  const needed = amount + fee

  const selected: SimUTXO[] = []
  let total = 0
  for (const utxo of available) {
    selected.push(utxo)
    total += utxo.amount
    if (total >= needed) break
  }

  if (total < needed) return null

  const txid = nextTxId()
  const change = Math.round((total - amount - fee) * 100000000) / 100000000

  const inputs: SimTxInput[] = selected.map(u => ({
    prevTxid: u.txid,
    vout: u.vout,
    scriptSig: `<sig_${fromWallet.name}> <pubkey_${fromWallet.name}>`,
    walletLabel: fromWallet.name,
    amount: u.amount,
  }))

  const outputs: SimTxOutput[] = [
    {
      amount,
      scriptPubKey: `OP_DUP OP_HASH160 <${toWallet.name}_hash> OP_EQUALVERIFY OP_CHECKSIG`,
      walletLabel: toWallet.name,
      address: toWallet.address,
    },
  ]

  if (change > 0) {
    outputs.push({
      amount: change,
      scriptPubKey: `OP_DUP OP_HASH160 <${fromWallet.name}_hash> OP_EQUALVERIFY OP_CHECKSIG`,
      walletLabel: fromWallet.name,
      address: fromWallet.address,
    })
  }

  return {
    txid,
    inputs,
    outputs,
    fee,
    feeRate,
    size,
    isCoinbase: false,
    timestamp: Date.now(),
  }
}

export const DEFAULT_WALLETS: SimWallet[] = [
  { name: 'Alice', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', color: 'blue' },
  { name: 'Bob', address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', color: 'emerald' },
  { name: 'Miner', address: '1MinerRewardAddressxxxxxxxxxxxxxxxxx', color: 'amber' },
]

export const DEFAULT_NODES: SimNode[] = [
  { id: 'N1', x: 50, y: 12, label: 'Node 1', lit: false },
  { id: 'N2', x: 20, y: 35, label: 'Node 2', lit: false },
  { id: 'N3', x: 80, y: 35, label: 'Node 3', lit: false },
  { id: 'N4', x: 10, y: 62, label: 'Node 4', lit: false },
  { id: 'N5', x: 50, y: 62, label: 'Node 5', lit: false },
  { id: 'N6', x: 90, y: 62, label: 'Node 6', lit: false },
  { id: 'N7', x: 35, y: 88, label: 'Node 7', lit: false },
]

export const DEFAULT_EDGES: [string, string][] = [
  ['N1', 'N2'], ['N1', 'N3'], ['N2', 'N3'], ['N2', 'N4'],
  ['N2', 'N5'], ['N3', 'N5'], ['N3', 'N6'], ['N4', 'N7'], ['N5', 'N7'],
]

export function createInitialState(): SimState {
  const wallets = [...DEFAULT_WALLETS]
  const genesis = createGenesisBlock(wallets)
  const utxoSet = buildUtxoSetFromChain([genesis])

  return {
    blockchain: [genesis],
    mempool: [],
    utxoSet,
    nodes: DEFAULT_NODES.map(n => ({ ...n })),
    edges: [...DEFAULT_EDGES],
    wallets,
    selectedBlockIndex: null,
    miningInProgress: false,
    lastEvent: 'Genesis block created',
    eventLog: ['Genesis block created with seed UTXOs for Alice (1.0), Bob (0.5), Miner (0.25)'],
  }
}

let nodeCounter = 7
export function createNewNode(): SimNode {
  nodeCounter++
  return {
    id: `N${nodeCounter}`,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 70,
    label: `Node ${nodeCounter}`,
    lit: false,
  }
}

export function randomEdgesForNode(nodeId: string, existingNodes: SimNode[], count = 2): [string, string][] {
  const others = existingNodes.filter(n => n.id !== nodeId)
  const shuffled = others.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(n => [nodeId, n.id] as [string, string])
}
