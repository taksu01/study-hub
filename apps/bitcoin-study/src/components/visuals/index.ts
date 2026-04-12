import type { ComponentType } from 'react'
import FoundationVisual from './FoundationVisual'
import BlocksVisual from './BlocksVisual'
import UTXOVisual from './UTXOVisual'
import TxLifecycleVisual from './TxLifecycleVisual'
import MiningVisual from './MiningVisual'
import NodesVisual from './NodesVisual'
import WalletsVisual from './WalletsVisual'
import SecurityVisual from './SecurityVisual'
import LightningVisual from './LightningVisual'
import ComparisonVisual from './ComparisonVisual'

export const visualRegistry: Record<string, ComponentType> = {
  foundation: FoundationVisual,
  blocks: BlocksVisual,
  utxo: UTXOVisual,
  'tx-lifecycle': TxLifecycleVisual,
  mining: MiningVisual,
  nodes: NodesVisual,
  wallets: WalletsVisual,
  security: SecurityVisual,
  lightning: LightningVisual,
  comparison: ComparisonVisual,
}
