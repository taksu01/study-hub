// All data as of December 31, 2024. Sources: CoinGecko, Bloomberg, Federal Reserve, World Gold Council.

export interface AssetReturn {
  asset: string
  symbol: string
  color: string
  darkColor: string
  oneYear: number   // percentage
  fourYear: number  // percentage CAGR
  tenYear: number   // percentage CAGR
  note?: string
}

export const assetReturns: AssetReturn[] = [
  {
    asset: 'Bitcoin',
    symbol: 'BTC',
    color: '#f59e0b',
    darkColor: '#fbbf24',
    oneYear: 121,     // 2024: ~$42k -> ~$93k
    fourYear: 79,     // 2020-2024 CAGR
    tenYear: 60,      // 2015-2024 CAGR (approximate)
    note: 'Best performing major asset across all measured timeframes',
  },
  {
    asset: 'S&P 500',
    symbol: 'SPX',
    color: '#3b82f6',
    darkColor: '#60a5fa',
    oneYear: 23,
    fourYear: 13,
    tenYear: 13,
    note: 'US large-cap equities, total return including dividends',
  },
  {
    asset: 'Gold',
    symbol: 'XAU',
    color: '#d97706',
    darkColor: '#f59e0b',
    oneYear: 27,      // 2024 strong gold year
    fourYear: 12,
    tenYear: 7,
    note: 'Physical gold, spot price return',
  },
  {
    asset: 'Real Estate',
    symbol: 'REITs',
    color: '#10b981',
    darkColor: '#34d399',
    oneYear: 5,
    fourYear: 4,
    tenYear: 9,
    note: 'US REIT index total return (VNQ proxy)',
  },
  {
    asset: 'Bonds',
    symbol: 'AGG',
    color: '#8b5cf6',
    darkColor: '#a78bfa',
    oneYear: 1,
    fourYear: -3,     // Negative — rate hike era destroyed bond returns
    tenYear: 2,
    note: 'US Aggregate Bond Index — severely impacted by 2022 rate hikes',
  },
  {
    asset: 'Cash (USD)',
    symbol: 'USD',
    color: '#6b7280',
    darkColor: '#9ca3af',
    oneYear: -3,      // Real return after CPI
    fourYear: -5,     // COVID era money printing
    tenYear: -2,      // Real return (nominal interest minus inflation)
    note: 'Real return (after CPI inflation). Nominal "safe" cash earns negative real returns.',
  },
]

// USD Purchasing Power: $1 indexed = 100 in 1971
// Value in 2024 dollars that $1 in each year could buy
export interface PurchasingPowerPoint {
  year: number
  value: number   // cents per original 1971 dollar
  event?: string
}

export const usdPurchasingPower: PurchasingPowerPoint[] = [
  { year: 1971, value: 100, event: 'Nixon Shock — dollar decoupled from gold' },
  { year: 1975, value: 78 },
  { year: 1980, value: 51, event: 'Stagflation era peak inflation (13.5%)' },
  { year: 1985, value: 39 },
  { year: 1990, value: 32 },
  { year: 1995, value: 27 },
  { year: 2000, value: 24 },
  { year: 2005, value: 21 },
  { year: 2008, value: 19, event: 'Global Financial Crisis — QE1 begins' },
  { year: 2010, value: 19 },
  { year: 2015, value: 17 },
  { year: 2020, value: 16, event: 'COVID-19 — $6T in new US money created' },
  { year: 2022, value: 13, event: 'Highest inflation since 1980 (9.1% CPI)' },
  { year: 2024, value: 13 },
]

// Bitcoin supply at each halving epoch
export interface SupplyEpoch {
  era: string
  blockRange: string
  subsidy: number   // BTC per block
  year: number
  percentMined: number
  cumulativeBTC: number
}

export const supplyEpochs: SupplyEpoch[] = [
  { era: 'Genesis', blockRange: '0 – 209,999', subsidy: 50, year: 2009, percentMined: 50, cumulativeBTC: 10_500_000 },
  { era: 'Halving 1', blockRange: '210,000 – 419,999', subsidy: 25, year: 2012, percentMined: 75, cumulativeBTC: 15_750_000 },
  { era: 'Halving 2', blockRange: '420,000 – 629,999', subsidy: 12.5, year: 2016, percentMined: 87.5, cumulativeBTC: 18_375_000 },
  { era: 'Halving 3', blockRange: '630,000 – 839,999', subsidy: 6.25, year: 2020, percentMined: 93.75, cumulativeBTC: 19_687_500 },
  { era: 'Halving 4', blockRange: '840,000 – 1,049,999', subsidy: 3.125, year: 2024, percentMined: 96.875, cumulativeBTC: 20_343_750 },
  { era: 'Halving 5', blockRange: '1,050,000 – 1,259,999', subsidy: 1.5625, year: 2028, percentMined: 98.44, cumulativeBTC: 20_671_875 },
  { era: 'Halving 6', blockRange: '1,260,000 – 1,469,999', subsidy: 0.78125, year: 2032, percentMined: 99.22, cumulativeBTC: 20_835_937 },
  { era: 'Halving 7', blockRange: '1,470,000+', subsidy: 0.390625, year: 2036, percentMined: 99.61, cumulativeBTC: 20_917_968 },
  { era: '~2140', blockRange: 'Final satoshi', subsidy: 0, year: 2140, percentMined: 100, cumulativeBTC: 21_000_000 },
]

// Money properties scorecard
export interface MoneyProperty {
  property: string
  description: string
  bitcoin: number   // 1-5 score
  gold: number
  usd: number
  ethereum: number
  bitcoinNote: string
  goldNote: string
  usdNote: string
  ethereumNote: string
}

export const moneyProperties: MoneyProperty[] = [
  {
    property: 'Scarcity',
    description: 'Limited and predictable supply',
    bitcoin: 5,
    gold: 4,
    usd: 1,
    ethereum: 2,
    bitcoinNote: '21M hard cap, halving schedule — verifiable by any node',
    goldNote: '~1.5-2% annual supply growth — difficult to accelerate',
    usdNote: 'Unlimited supply — M2 grew 30x since 1971',
    ethereumNote: 'Variable supply (EIP-1559) — policy can change',
  },
  {
    property: 'Durability',
    description: 'Resistant to physical decay',
    bitcoin: 5,
    gold: 5,
    usd: 2,
    ethereum: 5,
    bitcoinNote: 'Digital — survives indefinitely if private keys are preserved',
    goldNote: 'Does not corrode or degrade over millennia',
    usdNote: 'Paper bills degrade; digital records persist but can be erased',
    ethereumNote: 'Digital — same durability characteristics as Bitcoin',
  },
  {
    property: 'Divisibility',
    description: 'Can be split into smaller units',
    bitcoin: 5,
    gold: 3,
    usd: 4,
    ethereum: 5,
    bitcoinNote: 'Divisible to 8 decimal places (0.00000001 BTC = 1 satoshi)',
    goldNote: 'Physically divisible but expensive and complex at small scales',
    usdNote: 'Divisible to cents; digital fractions possible but impractical',
    ethereumNote: 'Divisible to 18 decimal places (1 Wei)',
  },
  {
    property: 'Portability',
    description: 'Easy to transport and transfer',
    bitcoin: 5,
    gold: 2,
    usd: 4,
    ethereum: 5,
    bitcoinNote: 'Transfer $1B globally in minutes; entire wealth in 24 words',
    goldNote: 'Heavy, expensive to ship, seizure risk at borders',
    usdNote: 'Digital transfers work well; international wire transfers slow',
    ethereumNote: 'Same global transferability as Bitcoin',
  },
  {
    property: 'Fungibility',
    description: 'Each unit equals any other unit',
    bitcoin: 3,
    gold: 4,
    usd: 4,
    ethereum: 3,
    bitcoinNote: 'UTXO history is visible; chain analysis can flag "tainted" coins',
    goldNote: 'One gram = one gram, though purity must be verified',
    usdNote: 'Serial numbers tracked; generally treated as fungible',
    ethereumNote: 'Account-based; history is traceable on-chain',
  },
  {
    property: 'Verifiability',
    description: 'Easy to confirm as genuine',
    bitcoin: 5,
    gold: 2,
    usd: 3,
    ethereum: 5,
    bitcoinNote: 'Any full node verifies any transaction cryptographically in seconds',
    goldNote: 'Requires assay equipment; tungsten-core bar fraud exists',
    usdNote: 'Security features, UV scanners; counterfeiting still occurs',
    ethereumNote: 'Same cryptographic verifiability as Bitcoin',
  },
]
