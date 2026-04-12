import { useState } from 'react'
import { useSimulation } from './context'
import { shortHash, getWalletBalance } from './utils'

export default function MempoolView() {
  const { state, dispatch } = useSimulation()
  const [from, setFrom] = useState('Alice')
  const [to, setTo] = useState('Bob')
  const [amount, setAmount] = useState('0.1')
  const [feeRate, setFeeRate] = useState('20')
  const [error, setError] = useState('')

  const senderBalance = getWalletBalance(state.utxoSet, from)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const amt = parseFloat(amount)
    const fr = parseInt(feeRate, 10)

    if (isNaN(amt) || amt <= 0) {
      setError('Amount must be a positive number')
      return
    }
    if (isNaN(fr) || fr <= 0) {
      setError('Fee rate must be a positive integer')
      return
    }
    if (from === to) {
      setError('Sender and recipient must be different')
      return
    }

    const estimatedFee = (fr * 250) / 100000000
    if (amt + estimatedFee > senderBalance) {
      setError(`Insufficient funds. ${from} has ${senderBalance.toFixed(8)} BTC`)
      return
    }

    dispatch({
      type: 'CREATE_TX',
      payload: { from, to, amount: amt, feeRate: fr },
    })

    setAmount('0.1')
  }

  const walletOptions = state.wallets.filter(w => w.name !== 'Miner')
  const recipientOptions = state.wallets.filter(w => w.name !== from)

  return (
    <div className="space-y-6">
      {/* Create Transaction */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Create Transaction</p>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">From</label>
              <select
                value={from}
                onChange={e => { setFrom(e.target.value); setError('') }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
              >
                {walletOptions.map(w => (
                  <option key={w.name} value={w.name}>
                    {w.name} ({getWalletBalance(state.utxoSet, w.name).toFixed(4)} BTC)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">To</label>
              <select
                value={to}
                onChange={e => { setTo(e.target.value); setError('') }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
              >
                {recipientOptions.map(w => (
                  <option key={w.name} value={w.name}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Amount (BTC)</label>
              <input
                type="number"
                step="0.0001"
                min="0.0001"
                value={amount}
                onChange={e => { setAmount(e.target.value); setError('') }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Fee Rate (sat/vB)</label>
              <input
                type="number"
                step="1"
                min="1"
                value={feeRate}
                onChange={e => { setFeeRate(e.target.value); setError('') }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
              />
              <p className="text-[10px] text-gray-400 mt-0.5">
                Est. fee: {((parseInt(feeRate, 10) || 0) * 250 / 100000000).toFixed(8)} BTC
              </p>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
          >
            Broadcast Transaction
          </button>
        </form>
      </div>

      {/* Pending Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Mempool — {state.mempool.length} pending tx{state.mempool.length !== 1 ? 's' : ''}
          </p>
          <p className="text-[10px] text-gray-400">Sorted by fee rate (highest first)</p>
        </div>

        {state.mempool.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
            <p className="text-sm text-gray-400">Mempool is empty</p>
            <p className="text-[10px] text-gray-300 mt-1">Create a transaction to see it queued here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {state.mempool.map((tx, i) => (
              <div key={tx.txid} className="rounded-xl border border-gray-200 bg-white p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-gray-500 truncate">{shortHash(tx.txid, 10)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {tx.inputs[0]?.walletLabel} → {tx.outputs[0]?.walletLabel} · {tx.outputs[0]?.amount.toFixed(4)} BTC
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                    {tx.feeRate} sat/vB
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">fee: {tx.fee.toFixed(8)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
