import { useState, useRef, useCallback } from 'react'
import { useSimulation } from './context'
import { fakeHash, shortHash, getWalletBalance } from './utils'

export default function MiningPanel() {
  const { state, dispatch } = useSimulation()
  const [hashAttempts, setHashAttempts] = useState(0)
  const [currentHash, setCurrentHash] = useState('')
  const [found, setFound] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const txsToMine = state.mempool.slice(0, 10)
  const totalFees = txsToMine.reduce((s, tx) => s + tx.fee, 0)
  const prevBlock = state.blockchain[state.blockchain.length - 1]
  const nextHeight = prevBlock.height + 1
  const subsidy = 50 / Math.pow(2, Math.floor(nextHeight / 210000))

  const stopMining = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startMining = useCallback(() => {
    if (state.miningInProgress) return

    setHashAttempts(0)
    setFound(false)
    setCurrentHash('')
    dispatch({ type: 'SET_MINING', payload: true })
    dispatch({ type: 'LOG_EVENT', payload: `Mining block #${nextHeight} with ${txsToMine.length + 1} txs (1 coinbase + ${txsToMine.length} from mempool)...` })

    const target = 15 + Math.floor(Math.random() * 25)
    let count = 0

    intervalRef.current = setInterval(() => {
      count++
      const h = fakeHash()
      setCurrentHash(h)
      setHashAttempts(count)

      if (count >= target) {
        const winHash = '0000000' + h.slice(7)
        setCurrentHash(winHash)
        setFound(true)
        stopMining()

        setTimeout(() => {
          dispatch({ type: 'MINE_COMPLETE', payload: { nonce: Math.floor(Math.random() * 4294967295) } })
        }, 600)
      }
    }, 70)
  }, [state.miningInProgress, dispatch, nextHeight, txsToMine.length, stopMining])

  const resetMiningUI = () => {
    setHashAttempts(0)
    setCurrentHash('')
    setFound(false)
    stopMining()
    dispatch({ type: 'SET_MINING', payload: false })
  }

  const minerBalance = getWalletBalance(state.utxoSet, 'Miner')

  return (
    <div className="space-y-6">
      {/* Mining overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Block</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">#{nextHeight}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mempool TXs</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{state.mempool.length}</p>
          <p className="text-[10px] text-gray-400">({Math.min(state.mempool.length, 10)} will be included)</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Miner Balance</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{minerBalance.toFixed(4)}</p>
          <p className="text-[10px] text-gray-400">BTC</p>
        </div>
      </div>

      {/* Block preview */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Candidate Block Preview</p>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Prev hash</span>
            <span className="font-mono text-gray-400">{shortHash(prevBlock.hash, 12)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Subsidy</span>
            <span className="font-semibold text-amber-600">{subsidy.toFixed(8)} BTC</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Total fees</span>
            <span className="font-semibold text-amber-600">{totalFees.toFixed(8)} BTC</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Block reward</span>
            <span className="font-bold text-gray-800">{(subsidy + totalFees).toFixed(8)} BTC</span>
          </div>

          {txsToMine.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Transactions to include (by fee rate)
              </p>
              <div className="space-y-1">
                {txsToMine.map((tx, i) => (
                  <div key={tx.txid} className="flex items-center justify-between text-[10px] py-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{i + 1}.</span>
                      <span className="font-mono text-gray-500">{shortHash(tx.txid, 8)}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                      {tx.feeRate} sat/vB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PoW Simulator */}
      <div className="rounded-xl bg-gray-900 p-6 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Proof of Work — Hash Search</p>

        <div className="font-mono text-xs text-gray-500 mb-3 break-all h-5">
          {currentHash && (
            <span>
              <span className={found ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                {currentHash.slice(0, 7)}
              </span>
              <span className="text-gray-600">{currentHash.slice(7)}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xs text-gray-500">
            Attempts: <span className="text-white font-bold">{hashAttempts}</span>
          </span>
          {found && (
            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
              BLOCK FOUND!
            </span>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          {!state.miningInProgress && !found && (
            <button
              onClick={startMining}
              disabled={state.miningInProgress}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 cursor-pointer transition-all shadow-lg disabled:opacity-50"
            >
              Mine Block #{nextHeight}
            </button>
          )}
          {state.miningInProgress && (
            <button
              onClick={resetMiningUI}
              className="px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-400 cursor-pointer transition-all"
            >
              Cancel
            </button>
          )}
          {found && (
            <button
              onClick={resetMiningUI}
              className="px-6 py-2.5 rounded-xl bg-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-600 cursor-pointer transition-all"
            >
              Done
            </button>
          )}
        </div>

        <p className="text-[10px] text-gray-600 mt-3">
          {found
            ? 'Hash starts with enough leading zeros — below the target threshold!'
            : state.miningInProgress
              ? 'Searching for a hash below the difficulty target...'
              : 'Click to simulate the Proof of Work hash search.'}
        </p>
      </div>
    </div>
  )
}
