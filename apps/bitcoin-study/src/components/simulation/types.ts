export interface SimTxInput {
  prevTxid: string
  vout: number
  scriptSig: string
  walletLabel: string
  amount: number
}

export interface SimTxOutput {
  amount: number
  scriptPubKey: string
  walletLabel: string
  address: string
}

export interface SimTransaction {
  txid: string
  inputs: SimTxInput[]
  outputs: SimTxOutput[]
  fee: number
  feeRate: number
  size: number
  isCoinbase: boolean
  timestamp: number
}

export interface SimUTXO {
  txid: string
  vout: number
  amount: number
  scriptPubKey: string
  walletLabel: string
  address: string
  spent: boolean
}

export interface SimBlockHeader {
  version: string
  prevHash: string
  merkleRoot: string
  timestamp: number
  nBits: string
  nonce: number
}

export interface SimBlock {
  height: number
  hash: string
  header: SimBlockHeader
  transactions: SimTransaction[]
  size: number
}

export interface SimNode {
  id: string
  x: number
  y: number
  label: string
  lit: boolean
}

export interface SimWallet {
  name: string
  address: string
  color: string
}

export interface SimState {
  blockchain: SimBlock[]
  mempool: SimTransaction[]
  utxoSet: Record<string, SimUTXO>
  nodes: SimNode[]
  edges: [string, string][]
  wallets: SimWallet[]
  selectedBlockIndex: number | null
  miningInProgress: boolean
  lastEvent: string | null
  eventLog: string[]
}

export type SimAction =
  | { type: 'CREATE_TX'; payload: { from: string; to: string; amount: number; feeRate: number } }
  | { type: 'MINE_COMPLETE'; payload: { nonce: number } }
  | { type: 'ADD_NODE' }
  | { type: 'REMOVE_NODE'; payload: { id: string } }
  | { type: 'SELECT_BLOCK'; payload: { index: number } }
  | { type: 'DESELECT_BLOCK' }
  | { type: 'SET_MINING'; payload: boolean }
  | { type: 'BROADCAST'; payload: { message: string } }
  | { type: 'SET_NODES'; payload: SimNode[] }
  | { type: 'LOG_EVENT'; payload: string }
  | { type: 'RESET' }
