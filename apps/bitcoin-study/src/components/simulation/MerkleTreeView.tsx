import { useState, useMemo } from 'react'
import type { SimTransaction } from './types'
import { buildMerkleTree, getMerklePath, shortHash, type MerkleNode } from './utils'

interface Props {
  transactions: SimTransaction[]
}

export default function MerkleTreeView({ transactions }: Props) {
  const [highlightedTx, setHighlightedTx] = useState<number | null>(null)

  const tree = useMemo(() => buildMerkleTree(transactions.map(t => t.txid)), [transactions])

  const highlightedHashes = useMemo(() => {
    if (highlightedTx === null) return new Set<string>()
    return new Set(getMerklePath(tree, highlightedTx))
  }, [tree, highlightedTx])

  const levels = useMemo(() => {
    const result: MerkleNode[][] = []
    let current = [tree]
    while (current.length > 0) {
      result.push(current)
      const next: MerkleNode[] = []
      for (const node of current) {
        if (node.left) next.push(node.left)
        if (node.right && node.right !== node.left) next.push(node.right)
      }
      if (next.length === 0) break
      current = next
    }
    return result
  }, [tree])

  if (transactions.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4">No transactions in this block</p>
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-gray-500 mb-1">Click a transaction to highlight its Merkle path to the root</p>

      {levels.map((level, depth) => (
        <div key={depth} className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {level.map((node, i) => {
            const isHighlighted = highlightedHashes.has(node.hash)
            const isRoot = depth === 0
            return (
              <div
                key={`${depth}-${i}`}
                className={`rounded-lg border-2 px-3 py-1.5 text-center transition-all duration-200
                  ${isHighlighted
                    ? 'border-amber-400 bg-amber-50 shadow-md'
                    : isRoot
                      ? 'border-gray-300 bg-white'
                      : 'border-gray-200 bg-white'
                  }`}
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  {isRoot ? 'Root' : depth === levels.length - 1 ? `H(TX)` : 'H'}
                </p>
                <p className="text-[10px] font-mono text-gray-500">{shortHash(node.hash, 6)}</p>
              </div>
            )
          })}
        </div>
      ))}

      {/* Connectors to transaction labels */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mt-1">
        {transactions.map((tx, i) => (
          <button
            key={tx.txid}
            onClick={() => setHighlightedTx(highlightedTx === i ? null : i)}
            onMouseEnter={() => setHighlightedTx(i)}
            onMouseLeave={() => setHighlightedTx(null)}
            className={`rounded-xl border-2 px-3 py-2 text-center transition-all duration-200 cursor-pointer
              ${highlightedTx === i
                ? 'border-amber-400 bg-amber-100 shadow-md scale-105'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
          >
            <p className="text-[10px] font-bold text-gray-700">
              {tx.isCoinbase ? 'Coinbase' : `TX ${i}`}
            </p>
            <p className="text-[9px] font-mono text-gray-400">{shortHash(tx.txid, 6)}</p>
          </button>
        ))}
      </div>

      {highlightedTx !== null && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 max-w-sm text-center">
          <p className="text-xs text-amber-800">
            {transactions[highlightedTx].isCoinbase ? 'Coinbase TX' : `TX ${highlightedTx}`} → hashed up through{' '}
            {levels.length - 1} level{levels.length - 1 !== 1 ? 's' : ''} → <strong>Merkle Root</strong>
          </p>
          <p className="text-[10px] text-amber-600 mt-1">
            Changing this TX invalidates every hash up to the root, breaking the block header.
          </p>
        </div>
      )}
    </div>
  )
}
