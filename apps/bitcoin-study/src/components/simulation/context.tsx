import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'
import type { SimState, SimAction } from './types'
import {
  createInitialState,
  createTransaction,
  createBlock,
  buildUtxoSetFromChain,
  createNewNode,
  randomEdgesForNode,
} from './utils'

const SimContext = createContext<{ state: SimState; dispatch: Dispatch<SimAction> } | null>(null)

function simReducer(state: SimState, action: SimAction): SimState {
  switch (action.type) {
    case 'CREATE_TX': {
      const { from, to, amount, feeRate } = action.payload
      const fromWallet = state.wallets.find(w => w.name === from)
      const toWallet = state.wallets.find(w => w.name === to)
      if (!fromWallet || !toWallet) return state

      const tx = createTransaction(state.utxoSet, fromWallet, toWallet, amount, feeRate)
      if (!tx) {
        return {
          ...state,
          lastEvent: `Failed: ${from} has insufficient funds`,
          eventLog: [...state.eventLog, `TX failed: ${from} → ${to} ${amount} BTC (insufficient funds)`],
        }
      }

      const newUtxo = { ...state.utxoSet }
      for (const inp of tx.inputs) {
        const key = `${inp.prevTxid}:${inp.vout}`
        if (newUtxo[key]) newUtxo[key] = { ...newUtxo[key], spent: true }
      }

      const newMempool = [...state.mempool, tx].sort((a, b) => b.feeRate - a.feeRate)
      const msg = `TX created: ${from} → ${to} ${amount} BTC (fee: ${tx.fee.toFixed(8)} BTC, ${feeRate} sat/vB)`
      return {
        ...state,
        mempool: newMempool,
        utxoSet: newUtxo,
        lastEvent: msg,
        eventLog: [...state.eventLog, msg],
      }
    }

    case 'MINE_COMPLETE': {
      const { nonce } = action.payload
      const prevBlock = state.blockchain[state.blockchain.length - 1]
      const txsToInclude = state.mempool.slice(0, 10)
      const newBlock = createBlock(prevBlock, txsToInclude, state.wallets, nonce)
      const newChain = [...state.blockchain, newBlock]
      const remainingMempool = state.mempool.slice(txsToInclude.length)
      const utxoSet = buildUtxoSetFromChain(newChain)
      const msg = `Block #${newBlock.height} mined with ${newBlock.transactions.length} tx(s), nonce=${nonce}`
      return {
        ...state,
        blockchain: newChain,
        mempool: remainingMempool,
        utxoSet,
        miningInProgress: false,
        lastEvent: msg,
        eventLog: [...state.eventLog, msg],
      }
    }

    case 'SET_MINING':
      return { ...state, miningInProgress: action.payload }

    case 'ADD_NODE': {
      const newNode = createNewNode()
      const newEdges = randomEdgesForNode(newNode.id, state.nodes, 2)
      const msg = `Node ${newNode.label} joined the network`
      return {
        ...state,
        nodes: [...state.nodes, newNode],
        edges: [...state.edges, ...newEdges],
        lastEvent: msg,
        eventLog: [...state.eventLog, msg],
      }
    }

    case 'REMOVE_NODE': {
      const { id } = action.payload
      if (state.nodes.length <= 3) return state
      const removed = state.nodes.find(n => n.id === id)
      const msg = `${removed?.label ?? id} left the network`
      return {
        ...state,
        nodes: state.nodes.filter(n => n.id !== id),
        edges: state.edges.filter(([a, b]) => a !== id && b !== id),
        lastEvent: msg,
        eventLog: [...state.eventLog, msg],
      }
    }

    case 'SELECT_BLOCK':
      return { ...state, selectedBlockIndex: action.payload.index }

    case 'DESELECT_BLOCK':
      return { ...state, selectedBlockIndex: null }

    case 'SET_NODES':
      return { ...state, nodes: action.payload }

    case 'BROADCAST': {
      return {
        ...state,
        lastEvent: action.payload.message,
        eventLog: [...state.eventLog, action.payload.message],
      }
    }

    case 'LOG_EVENT':
      return {
        ...state,
        lastEvent: action.payload,
        eventLog: [...state.eventLog, action.payload],
      }

    case 'RESET': {
      return createInitialState()
    }

    default:
      return state
  }
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(simReducer, null, createInitialState)

  return (
    <SimContext.Provider value={{ state, dispatch }}>
      {children}
    </SimContext.Provider>
  )
}

export function useSimulation() {
  const ctx = useContext(SimContext)
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider')
  return ctx
}
