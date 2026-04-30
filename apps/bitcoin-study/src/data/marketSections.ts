import type { MarketSection } from '../types'

export const marketSections: MarketSection[] = [
  // ─── MARKET SECTION 1 — WHAT MAKES MONEY VALUABLE? ───────────
  {
    id: 'money-properties',
    number: 1,
    title: 'What Makes Money Valuable?',
    subtitle: 'The six properties of sound money — and how every form of money scores against them',
    icon: '⚖',
    tagline: 'Before debating Bitcoin, you must understand what money actually is.',
    audience: 'skeptic',
    bigPicture: `Most people use money every day without ever asking: why does it have value? The short answer is that money is a social technology — a shared ledger of economic promises. But not every form of money is equally good at fulfilling this role. For something to serve reliably as money, economists have identified six core properties: **scarcity, durability, divisibility, portability, fungibility, and verifiability**.

Throughout history, different objects have served as money: shells, salt, cattle, gold, silver, paper, and now digital tokens. Each generation of money replaced the last when a better technology arrived — one that scored higher on more of these properties. **Bitcoin is an argument that digital scarcity represents the next step in this progression.**

Fiat currency (USD, EUR, JPY) scores well on divisibility, portability, and fungibility — but it fails catastrophically on scarcity. Central banks can and do create new units at will. Since 1971, the US dollar has lost approximately 87% of its purchasing power. The money you save today is worth measurably less every year not because you spent it, but because more units were created. This is not a bug — it is a deliberate policy tool. Bitcoin's creators viewed this as a fundamental defect.`,

    whyItMatters: `If you understand why gold became the global reserve asset for 5,000 years — its scarcity, durability, and verifiability — then you understand the Bitcoin thesis. Bitcoin is engineered to be superior to gold on every measurable dimension except one: track record. That gap closes with every passing year.`,

    simpleExample: `Imagine you discovered an island where everyone used seashells as money. For decades, it worked — seashells were hard to find. Then someone discovered a beach covered in millions of shells. Overnight, all existing shells were worth less. This is what central bank money printing does to savings. Bitcoin is designed so no beach can ever be discovered. The supply is mathematically fixed.`,

    details: [
      `**Scarcity**: The supply must be limited and predictable. Gold: ~205,000 tonnes above ground, ~1.8% new supply per year. Fiat: unlimited, determined by central bank policy. Bitcoin: hard capped at 21 million, with new supply halving every 4 years.`,
      `**Durability**: Must not degrade. Gold: survives millennia. Paper money: degrades. Digital money: potentially eternal if the network persists.`,
      `**Divisibility**: Must be splittable into smaller units. Bitcoin is divisible to 8 decimal places — one satoshi = 0.00000001 BTC. If Bitcoin reaches $1M, one sat = $0.01.`,
      `**Portability**: Must be easy to transport. Gold: heavy, hard to move across borders. Fiat: weight is fine; border controls create friction. Bitcoin: 21 million BTC can be memorized in 24 words. Borderless by design.`,
      `**Fungibility**: One unit must equal any other unit. A dollar bill is a dollar bill. A gram of gold is a gram of gold. Bitcoin fungibility is nuanced — the UTXO history is visible, though this is addressed by Layer 2 and future privacy upgrades.`,
      `**Verifiability**: Must be easy to confirm as genuine. Gold: requires assaying. Dollars: security features. Bitcoin: cryptographically verifiable by any full node, anywhere, in seconds, for free.`,
      `**The 1971 problem (Nixon Shock)**: In 1971, the US decoupled the dollar from gold, eliminating the last constraint on money printing. Since then, the M2 money supply has grown from ~$700B to over $21 trillion. Real wages have stagnated. Asset prices have inflated. Bitcoin's fixed supply is a direct response to this structural shift.`,
    ],

    keyTerms: [
      { term: 'Sound money', definition: 'Money with properties that preserve value over time, particularly resistance to arbitrary supply expansion.' },
      { term: 'Fiat currency', definition: 'Government-issued money with no intrinsic backing. Value derives from legal tender laws and collective trust, not physical scarcity.' },
      { term: 'M2 money supply', definition: 'A broad measure of money including cash, checking deposits, and savings accounts. Used to track monetary expansion.' },
      { term: 'Nixon Shock', definition: 'The 1971 decision by President Nixon to end dollar-gold convertibility, effectively making the USD a pure fiat currency with no external constraint on issuance.' },
      { term: 'Purchasing power', definition: 'The real value of a currency unit — how much it can buy. Inflation erodes purchasing power over time.' },
      { term: 'Satoshi (sat)', definition: 'The smallest unit of Bitcoin: 0.00000001 BTC. Named after Bitcoin\'s pseudonymous creator.' },
    ],

    commonConfusion: [
      `**"Bitcoin has no intrinsic value"** — Neither does paper money. The US dollar is not backed by gold, oil, or any commodity. Its value derives from collective agreement and legal mandate. Bitcoin's value derives from its properties as sound money, its network effects, and its verifiable scarcity. "Intrinsic value" is a philosophically weak argument against Bitcoin and against most modern money.`,
      `**"Inflation is just 2-3%, it's not a problem"** — Official CPI figures measure a specific basket of goods and are subject to methodological revisions that tend to understate real-world price increases. Asset inflation (real estate, equities) is far more severe. And for people in emerging markets with 10-30% annual inflation, Bitcoin is not a theoretical improvement — it is a practical lifeline.`,
      `**"Gold is already sound money, why Bitcoin?"** — Gold scores extremely well on the money properties checklist, but fails on portability and verifiability at scale. Moving $100M of gold across borders is a logistical nightmare. Verifying that a gold bar is pure requires physical testing. Bitcoin transfers $100M in 10 minutes and any node verifies it instantly.`,
    ],

    recallPrompts: [
      { question: 'Name the six properties of sound money.', hint: 'Scarce, durable, ___, ___, fungible, ___.' },
      { question: 'What happened in 1971 that changed money forever?', hint: 'The US ended ___ convertibility, removing the last constraint on fiat money creation.' },
      { question: 'How does Bitcoin address the "can\'t transport gold" problem?', hint: 'Think: 21 million BTC, 24 words, borderless network.' },
    ],

    visualComponent: 'MoneyPropertiesTable',

    investorTakeaway: 'Bitcoin is the first monetary asset in history to combine hard scarcity, digital portability, cryptographic verifiability, and permissionless access in a single system.',

    cheatSheet: [
      '6 properties of sound money: scarce, durable, divisible, portable, fungible, verifiable',
      'Fiat fails on scarcity — central banks create unlimited supply',
      'Gold fails on portability and verifiability at scale',
      'Bitcoin: hard cap of 21M, divisible to 8 decimals (satoshis), borderless, cryptographically verifiable',
      '1971 Nixon Shock: dollar decoupled from gold, unlimited fiat era begins',
      'USD has lost ~87% of purchasing power since 1971',
      'Bitcoin is engineered to score best on all 6 properties',
    ],
  },

  // ─── MARKET SECTION 2 — THE 21M HARD CAP & SCARCITY ENGINE ───
  {
    id: 'scarcity',
    number: 2,
    title: 'The 21 Million Hard Cap: Engineering Scarcity',
    subtitle: 'Stock-to-flow, the halving schedule, and why Bitcoin\'s supply is uniquely predictable',
    icon: '◆',
    tagline: 'Gold took 5,000 years to develop its scarcity story. Bitcoin did it in 15.',
    audience: 'all',
    bigPicture: `Bitcoin's 21 million coin limit is not an arbitrary number — it is the result of a specific mathematical design. Satoshi Nakamoto chose a geometric decay schedule for block rewards: starting at 50 BTC per block, halving every 210,000 blocks (~4 years), and converging to zero around the year 2140. The sum of this infinite geometric series converges to exactly 21 million BTC.

This creates a **predictable, immutable monetary policy** — something that has never existed before. No central banker can change it. No government can override it. No shareholder vote can dilute it. The issuance schedule is enforced by code, validated by tens of thousands of full nodes worldwide, and backed by the most powerful computing network ever assembled.

As of 2024, approximately **19.7 million BTC have been mined** — about 93.8% of the total supply. The remaining ~1.3 million will be issued over the next 116 years, in ever-decreasing increments. More importantly, an estimated **3-4 million BTC are permanently lost** (forgotten keys, lost hard drives, early Satoshi-era coins). The *effective* circulating supply is likely closer to 15-17 million.`,

    whyItMatters: `The **Stock-to-Flow (SF) ratio** measures how scarce an asset is: stock (existing supply) divided by flow (new annual production). Gold has an SF of approximately 62 — meaning it would take 62 years of current mining to double the supply. After the April 2024 halving, Bitcoin's SF is approximately **120** — nearly twice as scarce as gold by this measure. No other asset in human history has achieved this level of mathematically enforced scarcity.`,

    simpleExample: `Imagine knowing with certainty that no more than 21 million of something will ever exist — and you can verify this independently in seconds, without trusting anyone. Now imagine that every 4 years, the rate at which new units are created is cut in half — on a fixed, predictable schedule, enforced by physics (computation) not politics. That is Bitcoin's supply model. Gold miners have been trying to achieve this predictability for millennia and cannot.`,

    details: [
      `**The halving schedule**: Every 210,000 blocks, the block subsidy halves. Block 0-209,999: 50 BTC. Block 210,000-419,999: 25 BTC. Currently (post-April 2024, block 840,000+): 3.125 BTC per block. Each halving is a programmatic supply shock.`,
      `**Lost Bitcoin**: Chainalysis and other research firms estimate 3-4 million BTC are provably lost. Early adopters lost keys; Satoshi's estimated 1 million+ BTC has never moved. This permanently reduces effective circulating supply, increasing scarcity for everyone else.`,
      `**Stock-to-Flow context**: Silver SF ~22. Gold SF ~62. Bitcoin (post-2024 halving) SF ~120. Bitcoin post-2028 halving SF ~240. By this measure, Bitcoin is becoming the scarcest monetary asset in human history, doubling the scarcity of gold every 4 years.`,
      `**The fee market transition**: As the block subsidy approaches zero (~2140), miners will rely entirely on transaction fees for revenue. Whether fees will be sufficient to secure the network is an open debate. Layer 2 and fee market dynamics are active areas of research.`,
      `**21 million is consensus, not code**: The 21 million limit is enforced by every full node independently. If someone tried to change the limit via a hard fork, every node that disagreed would simply not follow that chain. The limit is protected by social consensus as much as code.`,
      `**Satoshi's 1 million BTC**: The coins mined in Bitcoin's earliest days (1-50,000 blocks range) appear to belong to Satoshi Nakamoto and have never moved. If they ever moved, it would signal major market uncertainty — they are effectively lost, reducing supply further.`,
    ],

    keyTerms: [
      { term: 'Hard cap', definition: 'An absolute maximum on Bitcoin\'s supply: 21,000,000 BTC. Enforced by every full node independently.' },
      { term: 'Halving', definition: 'Every 210,000 blocks (~4 years), the block subsidy is cut in half. The supply shock programmatically reduces new BTC issuance.' },
      { term: 'Stock-to-Flow (SF)', definition: 'Existing supply divided by annual new production. Higher SF = greater scarcity. Bitcoin post-2024 halving: ~120.' },
      { term: 'Block subsidy', definition: 'The new BTC created with each block. Currently 3.125 BTC (post-April 2024 halving). Not the same as transaction fees.' },
      { term: 'Lost Bitcoin', definition: 'BTC permanently inaccessible due to lost private keys. Estimated 3-4 million BTC are permanently lost, tightening effective supply.' },
      { term: 'Effective supply', definition: 'Total mined minus estimated lost coins. Likely 15-17 million BTC rather than the nominal ~19.7 million.' },
    ],

    commonConfusion: [
      `**"Someone could change the 21 million limit"** — Theoretically, a miner could build a block claiming more than the allowed subsidy. Every full node running Bitcoin software would immediately reject that block as invalid. Changing the limit would require convincing every node operator on Earth to upgrade simultaneously — while those who disagreed would simply continue on the original chain.`,
      `**"Bitcoin will run out when mining ends"** — Bitcoin does not "run out." The last fraction of BTC will be mined around 2140. Miners transition to fee-based revenue. BTC continues to exist and circulate; only new issuance ends.`,
      `**"99% of Bitcoin will be mined by 2032 anyway"** — True, roughly. But the scarcity argument is about the stock-to-flow ratio going forward, not just the total quantity. Post-2028, Bitcoin's SF of ~240 will be nearly 4x gold's SF. Existing holders benefit from this ongoing supply reduction.`,
    ],

    recallPrompts: [
      { question: 'What is the Stock-to-Flow ratio and why does Bitcoin\'s matter?', hint: 'SF = stock / annual flow. Post-2024 halving Bitcoin SF is ~___, roughly double gold\'s SF of ~62.' },
      { question: 'How does the halving create a programmatic supply shock?', hint: 'Every ___ blocks (~4 years), new BTC issuance is ___.' },
      { question: 'What is "effective circulating supply" and why is it lower than the minted total?', hint: 'Lost keys, Satoshi\'s coins, and early miner losses have permanently removed an estimated ___ million BTC.' },
    ],

    visualComponent: 'SupplySchedule',

    investorTakeaway: 'Bitcoin is the only asset with a verifiable, immutable, declining supply schedule — enforced by mathematics and network consensus, not politics.',

    cheatSheet: [
      'Hard cap: exactly 21 million BTC, enforced by every full node',
      '~19.7 million mined as of 2024; ~1.3 million remain (issued over next 116 years)',
      'Estimated 3-4 million BTC permanently lost -> effective supply ~15-17 million',
      'Halving: every 210,000 blocks (~4 years), new issuance cut in half',
      'Current subsidy (post-April 2024): 3.125 BTC per block',
      'Stock-to-Flow: Bitcoin ~120 post-2024 halving (gold ~62)',
      '21M limit is protected by social consensus of all full node operators',
    ],
  },

  // ─── MARKET SECTION 3 — DIGITAL GOLD ─────────────────────────
  {
    id: 'digital-gold',
    number: 3,
    title: 'Digital Gold: What Bitcoin Inherits and Improves',
    subtitle: 'Why gold became the global reserve asset — and why Bitcoin does everything gold does, better',
    icon: '🪙',
    tagline: 'Gold was not chosen arbitrarily. Bitcoin was not chosen randomly.',
    audience: 'investor',
    bigPicture: `Gold did not become the global reserve asset by accident. For 5,000 years, it won a global competition against every competing form of money — shells, salt, cattle, copper, silver — because it consistently outperformed on the six properties of sound money. Gold is rare, doesn't corrode, can be divided into smaller pieces, is the same everywhere, and is easy to verify. It earned its status.

But gold has a fundamental weakness in a digital, global, connected world: **it cannot be transmitted at the speed of information**. Moving physical gold requires trusted intermediaries (banks, vaults, armored trucks), which reintroduces the exact counterparty risks that sound money is meant to eliminate.

Bitcoin inherits every property that made gold valuable — and adds the properties gold lacks: instant global transmission, cryptographic verification, programmable conditions, and a fixed supply schedule that even gold cannot match (gold mining can accelerate with technology; Bitcoin's supply cannot). The "digital gold" label is not marketing. It is a technical assessment.`,

    whyItMatters: `The global gold market is worth approximately $13-15 trillion. If Bitcoin captures even 10% of gold's store-of-value market, that implies a price of roughly $600,000-700,000 per Bitcoin at current supply. This is before considering the currency debasement market (sovereign debt, bond alternatives), the cross-border payments market, or the emerging collateral market for DeFi.`,

    simpleExample: `Think about what a gold investor actually wants: an asset that holds purchasing power over decades, cannot be inflated away by a government, and doesn't depend on anyone's promise. Bitcoin does all of that — and adds the ability to send $1 billion to anyone, anywhere, in under an hour, without a bank, without permission. A gold bar cannot do that.`,

    details: [
      `**Where gold fails Bitcoin**: 1) Portability — moving significant gold requires physical infrastructure. 2) Verifiability — testing gold requires assay equipment. 3) Programmability — gold cannot have spending conditions. 4) Transparency — gold supply is unknowable precisely. 5) Self-custody — gold requires physical security and is vulnerable to government seizure (FDR's 1933 Executive Order 6102 forced Americans to sell their gold).`,
      `**Where gold still beats Bitcoin**: Track record — 5,000 years vs ~15 years. Price stability — gold's annual volatility is ~15%; Bitcoin's is ~50-80%. Industrial uses — gold has real-world demand from electronics, jewelry. These gaps narrow with time and adoption.`,
      `**The "digital gold" market size**: Global gold held as investment and reserves: ~$5-6 trillion. Total gold market: ~$13-15 trillion. Bitcoin market cap as of early 2025: ~$1.8 trillion. The runway for convergence is enormous if the thesis holds.`,
      `**Gold's ETF moment**: When the first gold ETFs launched (GLD in 2004), gold experienced a sustained multi-year rally. Bitcoin's spot ETFs launched in January 2024 (BlackRock, Fidelity, etc.) and attracted $40B+ in assets within 12 months — potentially repeating gold's ETF-era narrative.`,
      `**The generational handoff**: Survey data consistently shows younger generations (Millennials, Gen Z) prefer Bitcoin to gold as a long-term store of value. As wealth transfers from older to younger generations (~$68 trillion transfer expected over the next 20 years in the US alone), allocation preferences shift.`,
    ],

    keyTerms: [
      { term: 'Store of Value (SoV)', definition: 'An asset that maintains purchasing power over time. Gold is the historical benchmark; Bitcoin is the proposed digital successor.' },
      { term: 'Digital gold thesis', definition: 'The argument that Bitcoin will capture gold\'s role as a global neutral store of value, with superior digital properties.' },
      { term: 'Gold ETF (GLD)', definition: 'The SPDR Gold Shares ETF, launched in 2004, which made gold investment accessible to retail and institutional investors. A historical parallel to Bitcoin ETF launches in 2024.' },
      { term: 'Executive Order 6102', definition: 'FDR\'s 1933 order requiring Americans to turn in their gold to the Federal Reserve. Bitcoin\'s private key self-custody makes a similar seizure logistically impossible.' },
      { term: 'Spot Bitcoin ETF', definition: 'ETFs holding actual Bitcoin (not futures), approved by the SEC in January 2024. Opened Bitcoin to institutional investors via traditional brokerage accounts.' },
    ],

    commonConfusion: [
      `**"Bitcoin is not backed by anything, gold is real"** — Gold's value as money is also not intrinsic — it's social. A country could mandate platinum as money tomorrow, and gold's value as currency would collapse. Both gold and Bitcoin derive monetary value from collective agreement on their properties. The question is which properties serve money better in the 21st century.`,
      `**"Bitcoin is too volatile to be a store of value"** — Gold was also volatile in its early adoption phases. Bitcoin is in its price discovery phase — a 15-year-old asset competing with a 5,000-year-old one. Volatility is a function of market cap and liquidity. As Bitcoin's market cap grows toward gold's, volatility will structurally decrease.`,
      `**"Governments will ban Bitcoin like they banned gold"** — FDR's gold seizure worked because gold is physical and must be stored somewhere. Bitcoin's private keys can be memorized, stored encrypted, or distributed across jurisdictions. A seizure order applies only to what can be physically located.`,
    ],

    recallPrompts: [
      { question: 'Name three ways Bitcoin improves on gold as a store of value.', hint: 'Think: can you email gold? Can you verify gold\'s purity instantly? Can you set conditions on spending gold?' },
      { question: 'What is the approximate size of the global gold market vs Bitcoin?', hint: 'Gold total market ~$13-15T; Bitcoin market cap ~$1.8T. What is the implied upside if Bitcoin reaches ___% of gold?' },
      { question: 'What historical parallel exists between gold ETFs in 2004 and Bitcoin ETFs in 2024?', hint: 'Both provided institutional access via ___ accounts. Gold experienced a sustained ___ after ETF launch.' },
    ],

    investorTakeaway: 'Bitcoin is a superior version of gold: it matches gold on scarcity and durability while adding instant global portability, cryptographic verifiability, and censorship resistance.',

    cheatSheet: [
      'Gold won 5,000 years of monetary competition; Bitcoin inherits its core properties',
      'Gold\'s weaknesses: physical transport, counterparty risk, government seizure risk, unknowable supply',
      'Bitcoin\'s advantages over gold: instant global transfer, cryptographic verification, programmable, fixed supply',
      'Global gold market: ~$13-15T; Bitcoin market cap: ~$1.8T (early 2025)',
      'Spot Bitcoin ETFs launched Jan 2024: $40B+ in first 12 months',
      'Generational wealth transfer (~$68T US) shifts allocation preferences toward Bitcoin',
      '"Not your keys, not your coins" — Bitcoin self-custody is seizure-resistant in a way gold is not',
    ],
  },

  // ─── MARKET SECTION 4 — INFLATION & THE CANTILLON EFFECT ──────
  {
    id: 'inflation',
    number: 4,
    title: 'Inflation & the Cantillon Effect',
    subtitle: 'Why money printing destroys savings, who benefits first, and why Bitcoin fixes this',
    icon: '📉',
    tagline: 'The rich get richer not because of talent — because they own assets that inflate first.',
    audience: 'all',
    bigPicture: `Inflation is often described as "prices going up." But this is backwards. Prices go up because the supply of money goes up. More dollars chasing the same goods = each dollar buys less. The purchasing power of the US dollar has fallen approximately 87% since 1971, when President Nixon ended dollar-gold convertibility. What cost $1 in 1971 costs roughly $7.70 today.

The **Cantillon Effect**, named after 18th century economist Richard Cantillon, describes something even more insidious than price inflation: the **unequal distribution of newly created money**. New money is not dropped uniformly from a helicopter — it enters the economy through specific channels (government bond purchases, bank lending, asset purchases). The first recipients of new money can buy goods at old prices, before prices rise. By the time new money reaches wage earners and savers, prices have already adjusted upward.

This is why asset owners (stocks, real estate, equities) have gotten dramatically richer since 2008, while workers with savings in cash have seen their purchasing power erode. Central bank money printing is not a neutral economic policy — it is a systematic wealth transfer from savers and wage earners to asset owners and those closest to the money printer.`,

    whyItMatters: `Bitcoin is the first asset in history that is genuinely immune to the Cantillon Effect. There is no central party creating new Bitcoin and distributing it to favored institutions first. New BTC enters circulation only via mining — a competitive, open process where anyone can participate. Bitcoin is the closest thing that has ever existed to a completely neutral monetary system.`,

    simpleExample: `Imagine a pizza economy. 10 pizzas exist. 10 people have $10 each. Each pizza costs $1. Now the government creates $50 more and gives it to banks first. Banks buy pizzas, bidding prices up to $2. Now the original $10 savers can only buy 5 pizzas with their savings. The banks spent new money at old prices and got richer. The savers held money while it halved in real value. This is inflation. This is the Cantillon Effect. This happens every decade with every quantitative easing program.`,

    details: [
      `**USD purchasing power decline**: $1 in 1971 = approximately $0.13 in 2024 purchasing power (87% loss). $1 in 2000 = approximately $0.44 in 2024. $1 in January 2020 = approximately $0.82 in 2024 (post-COVID money printing erased 18% in 4 years).`,
      `**M2 money supply explosion**: US M2 grew from ~$700B in 1971 to ~$21T in 2024 — a 30x increase. From 2020 to 2022 alone, M2 grew by ~35% in 2 years as pandemic relief measures injected trillions into the economy. Asset prices exploded; real wages did not keep pace.`,
      `**The wealth inequality driver**: Since 2008 (QE1), the S&P 500 has increased ~700%. Real estate prices have tripled in most major cities. Bitcoin has increased over 10,000x. Meanwhile, cash savings have lost purchasing power. Those who owned assets got rich; those who saved in cash got poorer.`,
      `**Who benefits from new money first**: Primary dealers (large banks), government contractors, bond market participants — all receive new money before prices adjust. Workers on fixed salaries are last. This is the Cantillon hierarchy, and central banking structurally reinforces it.`,
      `**Bitcoin as an opt-out**: Bitcoin offers an exit from this system. By converting savings from fiat to BTC, an individual removes their savings from the debasement pool. Bitcoin cannot be inflated. No central party can benefit from its issuance at others' expense. Mining is competitive and open.`,
      `**Global context**: While US inflation is moderate (~2-7% officially), many countries experience 10-50%+ annual inflation. Turkey, Argentina, Nigeria, Venezuela, Lebanon — hundreds of millions of people live under severe monetary debasement. For them, Bitcoin is not a speculation; it is a savings survival tool.`,
    ],

    keyTerms: [
      { term: 'Cantillon Effect', definition: 'The unequal economic impact of newly created money: those who receive it first spend at old prices; those who receive it last face already-inflated prices.' },
      { term: 'Quantitative Easing (QE)', definition: 'Central bank asset purchases that expand the money supply. Used by the Federal Reserve, ECB, and Bank of Japan to stimulate economies — and that systematically inflate asset prices.' },
      { term: 'Purchasing power', definition: 'The real value of money — what a given dollar amount can actually buy. Inflation reduces purchasing power over time.' },
      { term: 'M2 money supply', definition: 'A broad measure of money in circulation including cash, deposits, and money market accounts. Grew from ~$700B to ~$21T in the US since 1971.' },
      { term: 'Nixon Shock', definition: 'President Nixon\'s 1971 decision to end dollar-gold convertibility. Began the modern era of unconstrained fiat money creation.' },
      { term: 'Monetary debasement', definition: 'The deliberate reduction of a currency\'s purchasing power through supply expansion. The historical fate of every fiat currency.' },
    ],

    commonConfusion: [
      `**"Inflation of 2-3% per year is harmless"** — Compound math makes this severe over time. At 3% annual inflation, $1 becomes $0.55 in 20 years and $0.30 in 40 years. A person saving for retirement over 40 years loses 70% of their savings' real value to "harmless" 3% inflation, without spending a penny.`,
      `**"Bitcoin is itself highly volatile, so it can't be a hedge"** — Correct that Bitcoin is volatile in the short term. But measured in Bitcoin, the price of everything else has fallen dramatically. One Bitcoin bought ~50 oz of gold in 2010; in 2024 it buys ~30 oz. Bitcoin is a long-term store of value, not a short-term price stabilizer.`,
      `**"The Fed creates money but it's for good reasons"** — The Fed's mandated goals (price stability, employment) are legitimate policy aims. The problem is the mechanism: money creation always benefits early recipients at late recipients' expense. There is no neutral way to print money. Bitcoin doesn't argue against macroeconomic policy — it offers individuals an exit from the consequences.`,
    ],

    recallPrompts: [
      { question: 'What is the Cantillon Effect?', hint: 'New money enters through specific channels. Those who receive it ___ can spend at old prices; those who receive it ___ face higher prices.' },
      { question: 'By approximately how much has the USD lost purchasing power since 1971?', hint: '~___% loss. What cost $1 in 1971 costs about $7.70 today.' },
      { question: 'Why is Bitcoin immune to the Cantillon Effect?', hint: 'New BTC is issued via competitive ___ — an open process with no favored recipient. No central party ___ new coins to allies first.' },
    ],

    visualComponent: 'InflationVisualizer',

    investorTakeaway: 'Every dollar saved in fiat currency is a loan to a system that systematically dilutes it. Bitcoin is the first savings technology in history designed to be inflation-proof by construction.',

    cheatSheet: [
      'USD has lost ~87% of purchasing power since 1971 (Nixon Shock)',
      'Cantillon Effect: new money benefits first recipients; savers bear the cost',
      'US M2 money supply: ~$700B (1971) to ~$21T (2024) — a 30x expansion',
      '2020-2022 QE: M2 grew 35% in 2 years; assets exploded, real wages lagged',
      'Bitcoin: fixed supply, competitive mining, no favored recipients of new issuance',
      'For countries with 10-50%+ inflation, Bitcoin is not speculation — it is survival',
      'Compound math: 3% annual inflation = 70% loss of real value over 40 years',
    ],
  },

  // ─── MARKET SECTION 5 — ASSET CLASS COMPARISON ───────────────
  {
    id: 'asset-comparison',
    number: 5,
    title: 'The Asset Class Comparison',
    subtitle: 'Bitcoin vs stocks, gold, real estate, bonds, and cash — returns, risk, and correlation',
    icon: '📊',
    tagline: 'The best performing asset of the decade, by a factor of 10.',
    audience: 'investor',
    bigPicture: `Bitcoin has been the best-performing major asset class across every meaningful time horizon of the past decade. This is not an opinion — it is a mathematical fact based on historical return data. A $1,000 investment made on January 1, 2015 in Bitcoin would be worth approximately $175,000-200,000 by end of 2024. The same investment in the S&P 500 would be worth approximately $4,800. In gold: approximately $2,100. In bonds: approximately $1,200.

This outperformance raises a critical question for any investment allocator: **even if Bitcoin is volatile and carries tail risks, what does a small allocation do to a portfolio?** Academic research consistently shows that a 1-5% allocation to Bitcoin in a traditional portfolio has historically improved risk-adjusted returns — because Bitcoin's correlation to other asset classes has been low to negative during its strongest performance periods.

Bitcoin is not "instead of" stocks or real estate. For most investors, it belongs in the portfolio as a small but meaningfully sized bet on a new paradigm — one with asymmetric upside and bounded downside (the maximum loss is the invested amount).`,

    whyItMatters: `Every institutional investor who ignores Bitcoin is effectively making a bet that the asset will fail. That bet may prove correct. But it is not the neutral default it appears to be — it is an active choice to hold assets with known debasement risk over an asset with a mathematically fixed supply. The risk of being wrong about Bitcoin is asymmetric: the cost of underallocation (if Bitcoin succeeds) dramatically exceeds the cost of overallocation (if Bitcoin fails).`,

    simpleExample: `If you had put 1% of your savings in Bitcoin in 2015 and everything else in an S&P 500 index fund, the 1% Bitcoin would now represent roughly 20-30% of your portfolio by value — despite starting at just 1%. And during the times Bitcoin fell 80%, your overall portfolio only fell a few percent. A small allocation captured enormous upside with limited portfolio-level downside.`,

    details: [
      `**10-year returns (Jan 2015 - Dec 2024, approximate)**: Bitcoin: ~11,000%+ CAGR ~60%; S&P 500: ~380%, CAGR ~13.5%; Gold: ~95%, CAGR ~6.9%; US Real Estate (REIT): ~175%, CAGR ~10.7%; Bonds (AGG): ~20%, CAGR ~1.8%; Cash (USD inflation-adjusted): ~-28% real return.`,
      `**Volatility**: Bitcoin 30-day annualized volatility: typically 50-90%. S&P 500: 12-20%. Gold: 12-18%. Bitcoin's high volatility is the source of both its risk and its return potential. It is priced for risk — and has historically overcompensated risk takers.`,
      `**Correlation**: Bitcoin's correlation to the S&P 500 has historically been low (0.0-0.3 over longer timeframes), though it rose during the 2022 rate-hike cycle. During Bitcoin's strongest bull markets (2017, 2020-2021), it was largely uncorrelated to traditional assets. This is the portfolio diversification case.`,
      `**Maximum drawdowns**: Bitcoin has experienced multiple 70-80%+ drawdowns (2014, 2018, 2022). These are severe for leveraged or over-allocated investors. For appropriately sized positions (1-5%), these drawdowns are manageable within a diversified portfolio.`,
      `**Sharpe ratio**: Despite high volatility, Bitcoin's Sharpe ratio (return per unit of risk) over 5 and 10 year periods has rivaled or exceeded the S&P 500. Risk-adjusted returns have been exceptional for patient, appropriately sized investors.`,
      `**The volatility trajectory**: Bitcoin's volatility has been declining structurally as market cap grows. 2011-2015: 200%+ volatility. 2015-2020: 80-120%. 2020-2025: 50-80%. As the market cap approaches gold's, volatility should continue declining toward gold levels (~15-20%).`,
    ],

    keyTerms: [
      { term: 'CAGR', definition: 'Compound Annual Growth Rate — the smoothed annual return of an investment over a period. Bitcoin\'s 10-year CAGR: ~60%. S&P 500: ~13.5%.' },
      { term: 'Sharpe ratio', definition: 'Return per unit of risk (volatility). A Sharpe ratio above 1 is considered good. Bitcoin has historically had a high Sharpe ratio despite its apparent volatility.' },
      { term: 'Correlation', definition: 'How much two assets move together. Low or negative correlation to traditional assets improves portfolio diversification.' },
      { term: 'Maximum drawdown', definition: 'The peak-to-trough decline in an investment\'s value. Bitcoin has had multiple 70-80% drawdowns — the source of its reputation for risk.' },
      { term: 'Portfolio allocation', definition: 'How much of a portfolio to put in a specific asset. Research suggests 1-5% Bitcoin allocation improves risk-adjusted portfolio returns.' },
      { term: 'Asymmetric bet', definition: 'An investment where the potential gain significantly exceeds the potential loss. A 1% Bitcoin allocation has limited downside (lose 1% in worst case) with potentially massive upside.' },
    ],

    commonConfusion: [
      `**"Past returns don't predict future returns"** — True for any asset. But for Bitcoin specifically, the question is whether the underlying investment thesis (fixed supply, growing adoption, Lindy Effect) has become more or less valid over time. The answer appears to be more valid: more institutions hold it, more regulatory clarity exists, more infrastructure has been built.`,
      `**"Bitcoin is too risky for my portfolio"** — An all-cash portfolio in USD has a 100% probability of losing purchasing power over time. "Safe" assets have hidden risks — currency debasement, counterparty risk, regulatory seizure. Risk is not eliminated by avoiding Bitcoin; it is redirected.`,
      `**"I missed it already"** — Bitcoin's market cap is ~$1.8 trillion. Gold is ~$13-15 trillion. Global bond markets are ~$130 trillion. Total global wealth is ~$450 trillion. Bitcoin represents approximately 0.4% of global wealth. If the thesis is correct, there is still significant room for price appreciation.`,
    ],

    recallPrompts: [
      { question: 'What was the approximate 10-year return of Bitcoin vs the S&P 500 (2015-2024)?', hint: 'Bitcoin: ~___%. S&P 500: ~380%. The ratio is roughly ___x.' },
      { question: 'Why does a small Bitcoin allocation improve portfolio risk-adjusted returns?', hint: 'Bitcoin\'s ___ to traditional assets is low. Even high-volatility assets can improve Sharpe ratio if they are ___.' },
      { question: 'What does "asymmetric bet" mean in the context of a 1% Bitcoin allocation?', hint: 'Maximum loss is ___%. Potential gain (if thesis plays out) is dramatically larger. The math favors ___.' },
    ],

    visualComponent: 'AssetComparison',

    investorTakeaway: 'Even a 1% Bitcoin allocation has historically improved risk-adjusted returns in a diversified portfolio. The question for any allocator is not "should I hold some?" — it is "how much is appropriate given my risk tolerance?"',

    cheatSheet: [
      '10-year Bitcoin CAGR (~2015-2024): ~60% vs S&P 500 ~13.5% vs Gold ~6.9%',
      'Bitcoin volatility: 50-80% annualized (declining structurally as market cap grows)',
      'Bitcoin drawdowns: multiple 70-80% peak-to-trough — real but manageable with proper sizing',
      'Portfolio correlation to S&P 500: historically low (0.0-0.3) over longer periods',
      '1-5% Bitcoin allocation has historically improved portfolio Sharpe ratio',
      'Bitcoin is 0.4% of global wealth (~$450T); gold is ~3%; significant runway if thesis holds',
      'Asymmetric bet: max loss = amount invested; potential gain is multiples if thesis is correct',
    ],
  },

  // ─── MARKET SECTION 6 — NETWORK EFFECTS & LINDY ──────────────
  {
    id: 'network-effects',
    number: 6,
    title: 'Network Effects & the Lindy Effect',
    subtitle: 'Why Bitcoin\'s value grows with adoption, and why each passing year makes it more likely to survive',
    icon: '🌐',
    tagline: 'Every year Bitcoin survives makes the next year more likely. This is not a coincidence.',
    audience: 'all',
    bigPicture: `Bitcoin's value is not just about its supply. It is also a function of how many people use it, trust it, and build on top of it. This is the **network effect** — the phenomenon where a network becomes more valuable as more participants join it. A telephone with one user is useless. A telephone network with 1 billion users is extraordinarily valuable to each participant. Bitcoin's global user base has grown from a handful of cryptographers in 2009 to an estimated 300-500 million people globally by 2024.

The **Lindy Effect** is a related observation from the world of technology and culture: for non-perishable things, the longer something has survived, the longer it is expected to continue surviving. A technology that has existed for 1 year has an uncertain future. A technology that has existed for 50 years is likely to exist for another 50. Bitcoin turned 15 in 2024 — and each year of survival without a catastrophic failure strengthens the case for its continued existence.

Combined, these effects create a **compounding credibility flywheel**: more users → more liquidity → more infrastructure → more institutional acceptance → more users. Bitcoin in 2024 is measurably more resilient, more liquid, and more institutionally embedded than Bitcoin in 2014.`,

    whyItMatters: `Understanding network effects explains why competing "Bitcoins" (forks, altcoins) have consistently failed to displace the original. The network effect of Bitcoin's security, liquidity, developer mindshare, regulatory clarity, and brand recognition is a 15-year head start that compounds. This is also why the "just copy Bitcoin" argument fails — the code can be copied; the network cannot.`,

    simpleExample: `Facebook wasn't valuable because of its code. MySpace had similar code. Facebook was valuable because of its users — and each new user made it more valuable to every existing user. Bitcoin is the Facebook of money networks, except it launched first, cannot be shut down, and cannot be acquired. The network effect is its moat.`,

    details: [
      `**Metcalfe's Law**: The value of a network is proportional to the square of the number of users (n²). Bitcoin at 10 users: value = 100 units. Bitcoin at 1,000 users: value = 1,000,000 units. This mathematical relationship partially explains Bitcoin's price trajectory as adoption grows.`,
      `**Hash rate as a security proxy**: The Bitcoin network hash rate — the total computational power securing it — has grown from ~1 TH/s in 2013 to over 700 EH/s (700,000,000 TH/s) in 2024. This 700 million-fold increase in security represents hundreds of billions of dollars of invested capital. It is the most powerful computing network in human history.`,
      `**Lindy Effect specifics**: In 2024, Bitcoin has survived 15 years of: bear markets, multiple 80%+ price crashes, government bans in various countries, exchange hacks (Mt. Gox, FTX), regulatory uncertainty, alternative chain competition, and internal governance crises. Each survived challenge increases the probability of surviving the next one.`,
      `**Developer activity**: Bitcoin has one of the most active open-source development ecosystems. Core protocol changes move slowly by design, but surrounding infrastructure (wallets, exchanges, custody, Lightning) has grown exponentially.`,
      `**Global regulatory acceptance**: In 2024, the US SEC approved spot Bitcoin ETFs from BlackRock and Fidelity. The EU implemented MiCA (Markets in Crypto-Assets) regulation. US congressional hearings treated Bitcoin as a legitimate asset class. Regulatory risk has declined materially since 2017.`,
      `**The adoption curve**: Estimates suggest 300-500 million people have used Bitcoin in some form. Global internet users: ~5.4 billion. If Bitcoin reaches even 2 billion users, network effects alone imply a dramatically higher price.`,
    ],

    keyTerms: [
      { term: 'Network effect', definition: 'The phenomenon where a product or service becomes more valuable as more people use it. Telephone networks, social media, and Bitcoin all exhibit network effects.' },
      { term: 'Lindy Effect', definition: 'For non-perishable entities, additional life expectancy is proportional to current age. Technology that has survived 15 years has demonstrated significant resilience.' },
      { term: 'Metcalfe\'s Law', definition: 'The value of a network is proportional to the square of the number of connected users. Underlies why network effects create disproportionate value growth.' },
      { term: 'Hash rate', definition: 'The total computational power of the Bitcoin network. A proxy for the cost to attack the network. Currently: 700+ EH/s (exahashes per second).' },
      { term: 'Adoption curve', definition: 'The S-curve of technology adoption: innovators → early adopters → early majority → late majority → laggards. Bitcoin is estimated to be in the early adopter to early majority transition.' },
    ],

    commonConfusion: [
      `**"Bitcoin can just be replaced by a better crypto"** — The "better technology" fallacy assumes value is purely technical. QWERTY keyboards are demonstrably inferior to Dvorak. VHS was inferior to Betamax. Yet network effects locked in the inferior technology. Bitcoin's network effect — security, liquidity, institutional infrastructure, regulatory acceptance, brand — is vastly larger than any alternative.`,
      `**"Bitcoin's hash rate could fall overnight if miners leave"** — The difficulty adjustment (Section 5) automatically adjusts to maintain 10-minute blocks regardless of hash rate. If 50% of miners disappeared tomorrow, the difficulty would halve within 2 weeks, and the remaining miners would continue producing blocks normally.`,
      `**"Bitcoin is too old and slow to compete with modern blockchains"** — "Old" is the point. Bitcoin's conservatism, its slow upgrade cadence, and its refusal to rush features are features, not bugs. They ensure stability, security, and predictability — the properties required for a global reserve asset.`,
    ],

    recallPrompts: [
      { question: 'What does the Lindy Effect predict about Bitcoin\'s future?', hint: 'Each year Bitcoin survives makes it ___ likely to survive future years. 15 years of survival is ___.' },
      { question: 'Why can\'t a "better Bitcoin" simply replace Bitcoin via superior technology?', hint: 'The ___ effect cannot be copied. Security, liquidity, regulatory clarity, and brand recognition are a ___ head start.' },
      { question: 'How does hash rate growth demonstrate Bitcoin\'s network effects?', hint: 'Hash rate grew from 1 TH/s to 700+ EH/s — a ___ million-fold increase. This represents hundreds of billions of ___ invested capital.' },
    ],

    investorTakeaway: 'Bitcoin\'s network effects compound over time. Every year of survival, every institutional adoption, and every infrastructure buildout increases the cost of failing and the value of participating.',

    cheatSheet: [
      'Network effect: more users -> more valuable for each user (Metcalfe: n²)',
      'Lindy Effect: 15-year track record makes Bitcoin exponentially more credible',
      'Hash rate: grew from 1 TH/s (2013) to 700+ EH/s (2024) — 700M-fold increase',
      'Bitcoin has survived: crashes, bans, hacks, forks, governance crises, regulatory attacks',
      '300-500 million estimated global users in 2024; ~5.4B internet users total',
      'Regulatory inflection: US spot ETFs (Jan 2024), EU MiCA framework',
      'Cannot copy Bitcoin\'s network — code is open source; the network is not',
    ],
  },

  // ─── MARKET SECTION 7 — THE INSTITUTIONAL THESIS ─────────────
  {
    id: 'institutional',
    number: 7,
    title: 'The Institutional Thesis',
    subtitle: 'Why the smartest money in the world is buying Bitcoin — and what they see that others miss',
    icon: '🏦',
    tagline: 'When BlackRock calls it "digital gold," the conversation has changed.',
    audience: 'investor',
    bigPicture: `The institutional narrative around Bitcoin has undergone a complete reversal. In 2017, Jamie Dimon (JPMorgan CEO) called Bitcoin "a fraud." In 2024, JPMorgan offers Bitcoin custody services to clients. In 2017, BlackRock CEO Larry Fink called Bitcoin an "index of money laundering." In 2024, BlackRock launched the world's fastest-growing ETF in history — the iShares Bitcoin Trust (IBIT) — accumulating $40+ billion in assets within 12 months.

The institutional thesis is not primarily about speculation. It is about **portfolio construction**: in a world of negative real interest rates, rising government debt, and currency debasement risk, Bitcoin offers something no other asset can — a fixed-supply, uncorrelated, self-custodied store of value with no counterparty risk. For pension funds, sovereign wealth funds, and corporate treasuries facing the same inflation pressures as individuals, Bitcoin addresses a real problem.

MicroStrategy's Michael Saylor made the most public institutional case: every dollar held in cash is a short position on the USD's purchasing power. By converting corporate cash to Bitcoin, he converted a depreciating asset into one with a fixed supply. His critics called it reckless in 2020; his $250M Bitcoin investment is worth billions in 2024.`,

    whyItMatters: `Institutional adoption creates a self-reinforcing cycle: institutional buying increases price and legitimacy, which attracts more institutional buyers, which increases the regulatory clarity that enables more institutional buyers. The US spot ETF approval in January 2024 was the pivotal institutional legitimacy moment — it signaled that the world's most rigorous financial regulator now treats Bitcoin as a legitimate investable asset.`,

    simpleExample: `Imagine you invented a new type of vault that was mathematically proven to be unbreakable. At first, only eccentric individuals used it. Then small businesses. Then a local bank. Then Goldman Sachs built their custody around it. Then BlackRock put their client funds in it. At each stage, adoption created more adoption — and skepticism became a professional liability.`,

    details: [
      `**BlackRock IBIT**: Launched January 2024, IBIT accumulated $40B+ in assets in under 12 months — making it one of the fastest-growing ETFs in Wall Street history. BlackRock holds the world's largest ETF (IVV at $500B+). Their Bitcoin entry was not a sideshow — it was a calculated business decision based on client demand.`,
      `**MicroStrategy playbook**: CEO Michael Saylor converted MicroStrategy's corporate treasury to Bitcoin starting in August 2020, acquiring ~214,000+ BTC by early 2024. The strategy became a publicly traded proxy for Bitcoin exposure and inspired other corporations. As of early 2025, MicroStrategy holds 478,000+ BTC.`,
      `**El Salvador adoption**: In 2021, El Salvador made Bitcoin legal tender — the first nation to do so. This opened a regulatory template for sovereign adoption. In 2024, multiple nations held Bitcoin in their reserves. El Salvador's experiment, though mixed in execution, demonstrated sovereign-level Bitcoin integration.`,
      `**Nation-state accumulation**: Several sovereign wealth funds and central banks have begun quietly accumulating Bitcoin as a reserve asset alongside gold and USD. Bhutan's government mining operation came to light in 2023. The US government holds ~200,000+ BTC from seizures (largest sovereign holder). Geopolitical competition over Bitcoin reserves is emerging.`,
      `**The "digital gold" legitimization**: When the world's largest asset manager (BlackRock, $10T AUM) calls Bitcoin "digital gold" in official marketing materials, it is not an endorsement of speculation — it is a statement that Bitcoin has passed their diligence as a store-of-value asset suitable for client portfolios.`,
      `**Fidelity's early conviction**: Fidelity Investments began mining Bitcoin in-house in 2014 and offered institutional custody services in 2018 — years before most financial institutions acknowledged Bitcoin existed. By 2024, Fidelity's Bitcoin ETF (FBTC) was accumulating billions in assets.`,
    ],

    keyTerms: [
      { term: 'Spot Bitcoin ETF', definition: 'An exchange-traded fund holding actual Bitcoin. Approved by the SEC in January 2024. Allows investors to gain Bitcoin exposure through traditional brokerage accounts.' },
      { term: 'Corporate treasury Bitcoin', definition: 'Holding Bitcoin on a company\'s balance sheet as a treasury reserve asset. Pioneered by MicroStrategy in 2020.' },
      { term: 'Legal tender', definition: 'Currency that must be accepted for payment of debts. El Salvador made Bitcoin legal tender in 2021 — the first nation to do so.' },
      { term: 'Sovereign Bitcoin reserve', definition: 'A nation-state holding Bitcoin as a reserve asset alongside gold and foreign currencies. Several nations have begun doing this as of 2024.' },
      { term: 'BlackRock IBIT', definition: 'The iShares Bitcoin Trust ETF, launched January 2024. Accumulated $40B+ in assets within 12 months — among the fastest ETF launches in history.' },
      { term: 'AUM', definition: 'Assets Under Management — the total market value of assets a financial institution manages. BlackRock manages approximately $10 trillion AUM.' },
    ],

    commonConfusion: [
      `**"Institutional adoption is just speculation and hype"** — Institutional buyers have fiduciary duties. BlackRock cannot put client money into assets they believe are worthless — they would face legal liability. Institutional adoption represents genuine due diligence concluding that Bitcoin is a legitimate asset class with risk-reward characteristics worth owning.`,
      `**"ETFs mean institutions control Bitcoin"** — ETF investors own a claim on Bitcoin held in custody — not Bitcoin directly. This is not ideal from a sovereignty perspective, but it is separate from Bitcoin's underlying protocol. The Bitcoin network itself is unchanged by ETF adoption. The ETF is a wrapper; Bitcoin is the core.`,
      `**"El Salvador proved Bitcoin doesn't work as currency"** — El Salvador's implementation faced real challenges (incomplete infrastructure, forced adoption concerns). But the legal tender experiment revealed something important: a country can adopt Bitcoin without asking permission from the IMF or USD-dominated financial system. The experiment continues and is evolving.`,
    ],

    recallPrompts: [
      { question: 'What was BlackRock IBIT and why was it historically significant?', hint: 'Launched ___ 2024. Accumulated $40B+ in ___ months. Called it "___" in marketing materials.' },
      { question: 'What is the MicroStrategy corporate treasury thesis?', hint: 'Holding USD in a corporate treasury is a ___ position on USD purchasing power. Bitcoin is the hedge against ___.' },
      { question: 'What happens to institutional adoption once the US SEC approves spot ETFs?', hint: 'Regulatory legitimacy -> more institutional buyers -> more infrastructure -> more regulatory clarity -> ___.' },
    ],

    investorTakeaway: 'The institutional adoption wave is in its first innings. The world\'s largest asset managers have entered. Pension funds, sovereign wealth funds, and central banks are next.',

    cheatSheet: [
      'BlackRock IBIT: launched Jan 2024, $40B+ in 12 months, one of fastest ETF launches in history',
      'MicroStrategy: 478,000+ BTC on corporate balance sheet by early 2025',
      'El Salvador: first nation to adopt Bitcoin as legal tender (2021)',
      'Multiple nations quietly accumulating Bitcoin reserves (Bhutan, US from seizures, others)',
      'BlackRock officially calls Bitcoin "digital gold" in investor materials',
      'Fidelity mining Bitcoin since 2014 — institutional conviction predates the current cycle',
      'SEC ETF approval = regulatory legitimacy for the world\'s most rigorous financial regulator',
    ],
  },

  // ─── MARKET SECTION 8 — THE MACRO CASE ───────────────────────
  {
    id: 'macro',
    number: 8,
    title: 'The Macro Case: Apex Collateral',
    subtitle: 'Global debt, currency wars, de-dollarization, and why Bitcoin is the neutral reserve asset',
    icon: '🌍',
    tagline: 'In a world where every currency is a melting ice cube, the only hard money wins.',
    audience: 'investor',
    bigPicture: `Global government debt reached approximately $315 trillion in 2024 — roughly 3x global GDP. Every major economy has debt levels that, in any historical context, would have triggered currency crises. The only mechanism preventing a reckoning is the continuous issuance of new money to service old debt — which further debases currencies and pushes the crisis forward.

This creates what economists call a **fiscal dominance** trap: central banks cannot raise interest rates sufficiently to fight inflation without triggering debt crises in over-leveraged governments. The result is a managed debasement: real interest rates are kept negative, money is gradually inflated away, and savers are systematically penalized. Every fiat currency in history has eventually reached zero purchasing power. The question is when, not if.

In this macro environment, the search for **neutral, non-sovereign, hard collateral** has become increasingly urgent. Gold has served this role for millennia, but it is slow to transfer, difficult to audit at scale, and vulnerable to seizure. Bitcoin is increasingly positioned as the 21st century version of this neutral collateral — politically unaffiliated, mathematically scarce, and transmissible at the speed of light.`,

    whyItMatters: `The Bitcoin macro thesis does not require believing that all governments will collapse or all fiat currencies will go to zero. It only requires believing that: (1) governments will continue to expand money supply in response to debt and economic stress, (2) some portion of global wealth will seek hard, non-sovereign alternatives, and (3) Bitcoin is the best candidate for that role. If even 1-2% of global wealth rotates into Bitcoin, the price implications are enormous.`,

    simpleExample: `Imagine a world with 10 countries, each with its own currency. Each government is printing money to pay its debts. Smart traders are selling the weakest currencies and buying the strongest. Now imagine one country that has no government, no central bank, and a mathematically fixed currency supply. Every player who wants to "escape" the debasement game would compete to buy into that country's currency. That is Bitcoin in a world of fiscal dominance.`,

    details: [
      `**Global debt dynamics**: $315T global debt as of 2024. US national debt: ~$34T (130%+ of GDP). Japan: ~260% of GDP. Most developed nations are above the 100% debt-to-GDP threshold historically associated with fiscal stress. Debt service costs rise with interest rates — creating pressure to keep rates artificially low and inflate.`,
      `**De-dollarization pressure**: The USD has been the world's reserve currency since 1944 (Bretton Woods). Several large economies (China, Russia, Saudi Arabia, BRICS group) are actively reducing USD dependence in trade settlement. Bitcoin, as a neutral non-sovereign asset, could benefit from both sides: USD-skeptical nations seeking an alternative and USD-holding nations seeking protection against dollar depreciation.`,
      `**Real interest rates**: When inflation exceeds the interest rate paid on deposits or bonds, the real rate is negative — meaning cash earns negative real returns. From 2020-2022, real rates were deeply negative in the US (-5% to -8%). Savers were guaranteed to lose purchasing power by holding "safe" bonds. Bitcoin, with zero yield but fixed supply, outperforms in this environment.`,
      `**Bitcoin as neutral collateral**: Unlike gold (requires trust in physical custody), stocks (require trust in corporate governance), bonds (require trust in government solvency), and real estate (requires trust in local legal systems), Bitcoin collateral is verifiable by any party independently, transferable globally, and not dependent on any jurisdiction's legal system.`,
      `**The Saylor thesis in numbers**: Michael Saylor models Bitcoin as "cybernetic water" or "apex property" — an asset that captures value from every other depreciating asset class as monetary debasement continues. His projection: Bitcoin could capture 25-50% of total global wealth by 2045 as currencies debase. This is the bull case. Even the moderate case is significantly higher than current prices.`,
      `**Emerging market demand**: Argentina, Turkey, Nigeria, Lebanon, and Venezuela have experienced catastrophic currency collapses in the last decade. In these countries, Bitcoin demand is driven not by speculation but by the desire to hold savings in something that cannot be inflated away by a central bank or devalued by government decree.`,
    ],

    keyTerms: [
      { term: 'Fiscal dominance', definition: 'A situation where a central bank cannot raise rates sufficiently (due to government debt levels) — leading to inflation being used to erode real debt burdens.' },
      { term: 'De-dollarization', definition: 'The global trend of reducing dependence on the US dollar in international trade and reserves. Creates openings for alternative reserve assets.' },
      { term: 'Real interest rate', definition: 'Nominal interest rate minus inflation. Negative real rates mean holding cash or bonds guarantees purchasing power loss.' },
      { term: 'Neutral collateral', definition: 'An asset with no counterparty risk, not subject to any nation\'s legal system, that can serve as collateral in cross-border agreements.' },
      { term: 'Apex property', definition: 'Michael Saylor\'s framing of Bitcoin as the ultimate monetary store of value — the asset that captures capital fleeing every other depreciating asset class.' },
      { term: 'Currency debasement', definition: 'The reduction of a currency\'s purchasing power through supply expansion. Has historically affected every fiat currency. Bitcoin is designed to be immune.' },
    ],

    commonConfusion: [
      `**"Governments can just ban Bitcoin"** — Some have tried (China in 2021). Bitcoin mining and usage declined temporarily in China and moved to other jurisdictions. The network continued operating. For Bitcoin to be "banned" globally, every government on Earth would need to coordinate simultaneously — including those that are geopolitically opposed. The probability is extremely low, and even partial bans historically have had limited long-term impact.`,
      `**"The global debt problem will be solved without money printing"** — It is possible. Debt crises can resolve through default, restructuring, or austerity-driven growth. But history strongly suggests that democracies choose inflation over default. The European debt crisis, the US COVID response, the 2008 financial crisis — each was "resolved" with money creation, not debt forgiveness.`,
      `**"Bitcoin is too small to serve as macro collateral"** — Bitcoin's market cap of ~$1.8T is larger than all but the world's top 5 central bank foreign exchange reserves. It is already "macro scale" in any reasonable sense. The question is whether it is trusted widely enough — which is a function of adoption, and adoption is growing.`,
    ],

    recallPrompts: [
      { question: 'What is fiscal dominance and how does it benefit Bitcoin?', hint: 'Fiscal dominance means governments cannot raise rates enough to fight inflation without triggering ___ crises. The result is managed ___. Bitcoin is immune.' },
      { question: 'Why would de-dollarization benefit Bitcoin specifically?', hint: 'Nations moving away from USD need a ___ reserve asset with no political ___ and no counterparty ___.' },
      { question: 'What does "negative real interest rate" mean for savers?', hint: 'Nominal rate - inflation = negative. Holding "safe" bonds guarantees ___ power loss. Bitcoin has ___ yield but fixed supply.' },
    ],

    investorTakeaway: 'Bitcoin is not a bet against the economy — it is a bet that governments will continue doing what they have always done: expand money supply under fiscal pressure. The only insurance is a fixed-supply, non-sovereign asset.',

    cheatSheet: [
      'Global debt: ~$315T in 2024 (~3x global GDP) — unprecedented and growing',
      'Fiscal dominance: governments cannot fight inflation without triggering debt crisis',
      'Result: managed debasement — real rates kept negative, savers systematically penalized',
      'De-dollarization: BRICS nations reducing USD dependence — creating demand for neutral alternatives',
      'Bitcoin: neutral, non-sovereign, cryptographically verifiable, no counterparty risk',
      'Real interest rates negative 2020-2022 in US (-5% to -8%) — Bitcoin outperforms by design',
      'Even 1-2% of global wealth rotating to Bitcoin implies dramatically higher prices',
    ],
  },

  // ─── MARKET SECTION 9 — WHY BITCOIN SPECIFICALLY ─────────────
  {
    id: 'bitcoin-not-crypto',
    number: 9,
    title: 'Why Bitcoin Specifically (Not Crypto)',
    subtitle: 'The first-mover advantage, the decentralization moat, and why no competitor fits the same thesis',
    icon: '₿',
    tagline: 'Crypto is a casino. Bitcoin is a protocol. The difference matters enormously.',
    audience: 'developer',
    bigPicture: `The most common misconception about the Bitcoin investment thesis is that it applies to "crypto" broadly — that if Bitcoin succeeds, Ethereum or Solana or whatever comes next will also succeed, perhaps even more. This is a category error. Bitcoin and other blockchain platforms differ fundamentally in their design philosophy, security model, and the nature of the value they capture.

The Bitcoin thesis is specifically about **sound money** — a fixed-supply, decentralized, censorship-resistant monetary layer for the internet. This thesis requires specific properties: no authority that can be pressured (no CEO, no foundation), no supply that can be inflated (hard cap enforced by consensus), no rule changes that can be forced by powerful actors (decentralized node network). **No other cryptocurrency meaningfully satisfies all three requirements.**

Ethereum has a foundation (the Ethereum Foundation), a CEO-equivalent (Vitalik Buterin), and a variable supply policy (the "ultrasound money" thesis depends on EIP-1559 burning more than issuance — which can change). Solana has had multiple network outages (centralization risk). All "crypto" projects have identifiable leaders who can be pressured, regulated, or compromised by governments.`,

    whyItMatters: `The value proposition of Bitcoin as sound money requires **absolute decentralization** — not just "more decentralized than a bank." If there is a single party who can be pressured to change the rules, the asset's monetary properties are not guaranteed. Bitcoin's 15 years without a CEO, without a foundation that controls protocol rules, and without a meaningful supply change is not an accident. It is the result of a specific governance design that no other project has replicated.`,

    simpleExample: `TCP/IP is the protocol that runs the internet. Every email, every web page, every streaming video runs on TCP/IP. No company "owns" TCP/IP. No government can shut it down. No one can be pressured to change how it routes packets. This is its strength — and it is why the internet has lasted 50 years without being captured. Bitcoin is to money what TCP/IP is to communication: a foundational protocol that is resistant to capture precisely because it is owned by no one.`,

    details: [
      `**The decentralization test**: For an asset to serve as neutral money, no single party should be able to: change the supply, reverse transactions, freeze accounts, or shut down the network. Bitcoin passes all four. Ethereum, Solana, and every other chain have identifiable parties who have authority over protocol changes — failing the neutrality test for money.`,
      `**First-mover and network effects**: Bitcoin has ~15 years of uninterrupted operation, the largest mining network in computing history, the most liquid market, the clearest regulatory status, and the deepest institutional infrastructure. These compound network effects cannot be replicated by starting a new chain from scratch.`,
      `**The CEO risk**: Vitalik Buterin and the Ethereum Foundation could be subpoenaed, regulated, pressured, or simply change direction. This has already happened: the 2016 Ethereum DAO hack led to a controversial hard fork (creating Ethereum Classic), directly reversing transactions. No equivalent event is possible in Bitcoin.`,
      `**Supply policy risk**: Ethereum's "ultrasound money" narrative depends on EIP-1559 burning more ETH than issuance. This balance is not guaranteed and has broken down during low-fee periods. Ethereum's supply is controlled by protocol decisions made by identifiable parties — the antithesis of sound money properties.`,
      `**Solana's centralization failures**: Solana has experienced multiple multi-hour network outages (2021, 2022, 2023). The cause: insufficient validator decentralization. A network where a small number of validators can disrupt operation is not sound money infrastructure.`,
      `**Regulatory clarity differential**: Bitcoin has received the clearest regulatory treatment in most major jurisdictions — treated as a commodity (not a security) by the CFTC, with spot ETF approval from the SEC. Ethereum, Solana, and most altcoins face ongoing securities law ambiguity that creates existential regulatory risk.`,
    ],

    keyTerms: [
      { term: 'Decentralization moat', definition: 'Bitcoin\'s protection against capture: no CEO, no foundation with control, no single party who can be pressured to change consensus rules.' },
      { term: 'Sound money properties', definition: 'For currency to serve as sound money: fixed supply, censorship resistance, no counterparty risk. Bitcoin is the only cryptocurrency that fully satisfies all three.' },
      { term: 'Protocol vs platform', definition: 'Bitcoin is a protocol (like TCP/IP) — a set of rules with no owner. Ethereum is a platform — a programmable environment with an identifiable development team.' },
      { term: 'The DAO hard fork', definition: 'The 2016 Ethereum decision to reverse a hack by rewriting history via a hard fork. Demonstrated that Ethereum\'s ledger is not immutable when powerful actors disagree.' },
      { term: 'Regulatory clarity', definition: 'Bitcoin is treated as a commodity by US regulators (CFTC), with spot ETF approval (SEC). Most altcoins face ongoing securities law uncertainty.' },
      { term: 'CFTC', definition: 'Commodity Futures Trading Commission — the US regulator that oversees commodities markets. Bitcoin has been classified as a commodity, giving it clearer legal status than most cryptocurrencies.' },
    ],

    commonConfusion: [
      `**"Ethereum has smart contracts and Bitcoin doesn't"** — Bitcoin has Taproot, Tapscript, DLCs, and Lightning. It is not featureless. The difference is that Bitcoin adds features conservatively, minimizing attack surface. Ethereum's programmability comes at the cost of vastly greater complexity and bug surface area. The choice is deliberate.`,
      `**"If Bitcoin wins, my altcoin will also win"** — The opposite is more likely. Bitcoin's success as neutral money depends on it being the clear choice — regulatory certainty, institutional adoption, and network effects concentrating around a single monetary standard, not spreading across thousands of "currencies." History shows that monetary systems converge to one dominant standard.`,
      `**"Ethereum is becoming more decentralized"** — Ethereum's transition to Proof of Stake has concentrated power among large stakers. The Ethereum Foundation retains de facto protocol governance influence. These are not neutral technical facts — they are governance choices with real consequences for monetary neutrality.`,
    ],

    recallPrompts: [
      { question: 'What four tests does an asset need to pass to serve as neutral money?', hint: 'No single party can: change ___, reverse ___, freeze ___, or ___ the network.' },
      { question: 'What does the 2016 Ethereum DAO fork reveal about Ethereum vs Bitcoin?', hint: 'The DAO hack led Ethereum to ___ transactions — demonstrating that the ledger is not truly ___. Bitcoin has no equivalent mechanism.' },
      { question: 'Why is "invest in crypto broadly" not the same thesis as "invest in Bitcoin"?', hint: 'Sound money requires absolute decentralization and fixed supply. Only Bitcoin has no ___ to pressure, no supply that can be ___, and no rules that can be forced by powerful actors.' },
    ],

    investorTakeaway: 'Bitcoin is not "crypto number one." It is a fundamentally different category — a monetary protocol that cannot be captured, inflated, or controlled. No other blockchain fits this thesis.',

    cheatSheet: [
      'Bitcoin is a protocol (no owner); Ethereum/Solana are platforms (with identifiable leaders)',
      'Sound money test: no party can change supply, reverse transactions, freeze accounts, or shut down',
      'Bitcoin passes all four; every other blockchain fails at least one',
      'Ethereum Foundation and Vitalik = identifiable parties who can be pressured',
      'DAO hard fork 2016: Ethereum reversed transactions when powerful actors disagreed',
      'Solana: multiple multi-hour network outages due to centralization',
      'Bitcoin regulatory clarity: classified as commodity (CFTC), spot ETF approved (SEC)',
      'Monetary systems historically converge to one standard — not 10,000 tokens',
    ],
  },

  // ─── MARKET SECTION 10 — RISK FACTORS ────────────────────────
  {
    id: 'risks',
    number: 10,
    title: 'Risk Factors & Honest Assessment',
    subtitle: 'The bear case, the counterarguments, and what would actually need to go wrong',
    icon: '⚠',
    tagline: 'Any investor who cannot articulate the bear case has no business taking the bull case.',
    audience: 'all',
    bigPicture: `Bitcoin has produced extraordinary returns over 15 years. It has survived crashes, bans, exchange collapses, and regulatory hostility. But intellectual honesty requires confronting the genuine risks — because they are real, and dismissing them is both intellectually dishonest and strategically foolish.

The risks fall into several categories: **technical risks** (protocol vulnerabilities, quantum computing), **regulatory risks** (coordinated global crackdowns, restrictive legislation), **adoption risks** (network stagnation, competition), **market risks** (extreme volatility, liquidity crises), and **systemic risks** (what happens when the block subsidy approaches zero). Each deserves a clear-eyed assessment, not a dismissal.

The conclusion of this analysis is not that Bitcoin is risk-free — it obviously is not. The conclusion is that, for an investor who understands the risks, determines an appropriate position size, and has conviction in the underlying thesis, Bitcoin's expected value is positive over medium-to-long time horizons. This is not certainty. It is a probabilistic bet on a genuinely novel and important technology.`,

    whyItMatters: `Understanding the bear case makes you a better investor in Bitcoin. It calibrates position sizing (you only bet what you can afford to lose in the worst case). It prepares you psychologically for drawdowns (60-80% crashes are normal; selling at the bottom is the mistake). And it helps you distinguish genuine thesis-breaking developments from temporary price noise.`,

    simpleExample: `A serious investor does not buy Bitcoin because "number go up." They buy it because: the fixed supply thesis is sound, the network effects are compelling, the institutional adoption is accelerating, and the alternative (holding USD savings that debase at 3-10% annually) has a guaranteed negative real return. That investor can survive an 80% Bitcoin drawdown because they understand why they own it.`,

    details: [
      `**Volatility risk**: Bitcoin has experienced 70-80% peak-to-trough drawdowns in 2014, 2018, and 2022. These are severe and psychologically brutal. The correct response is position sizing (only invest what you can hold through an 80% crash without panic selling) and time horizon (Bitcoin has always recovered its previous highs — historically within 2-4 years of each crash).`,
      `**Regulatory risk**: The most credible threat to Bitcoin is coordinated global regulatory action — not a ban (technically impossible), but severe restrictions on exchanges, taxation at prohibitive rates, or mandatory reporting that eliminates practical utility. The US spot ETF approval significantly reduces this risk by making Bitcoin part of mainstream financial infrastructure. But regulatory risk is real and varies by jurisdiction.`,
      `**Quantum computing risk**: Sufficiently powerful quantum computers could theoretically break ECDSA/Schnorr signatures, allowing private keys to be computed from public keys. This threat is real but distant (experts estimate 10-20+ years for relevant quantum capability). Bitcoin's protocol can be upgraded to quantum-resistant signatures via soft forks before this becomes an active threat.`,
      `**Fee market sustainability post-subsidy**: By ~2140, miners will rely entirely on transaction fees. If L2 (Lightning) routes most transactions off-chain, on-chain fee revenue may be insufficient to incentivize the hash rate needed for security. This is a legitimate long-term concern, actively debated among Bitcoin developers. Potential solutions include fee markets, Drivechain proposals, and inscription-driven demand.`,
      `**The "rat poison" counterargument**: Warren Buffett famously called Bitcoin "rat poison squared." The critique: Bitcoin produces nothing, pays no dividend, and its value is purely speculative belief. The rebuttal: gold also produces nothing and pays no dividend — yet it is a $13-15T market. Bitcoin's value thesis is not earnings — it is monetary properties, not unlike how gold's value thesis is monetary properties.`,
      `**Concentration risk**: An estimated 2% of Bitcoin addresses hold approximately 95% of supply. "Whale" concentration is real. However, this is also true of gold (central banks, ETFs), equities (institutional funds), and real estate (REITs, institutional landlords). Concentration risk in Bitcoin is not uniquely severe compared to other asset classes.`,
      `**Black swan scenarios**: Bitcoin fails in extreme scenarios: a fundamental cryptographic break of SHA-256 (would threaten all internet security, not just Bitcoin), complete global internet shutdown (also destroys all digital commerce), or an unknown consensus-level bug. These are low-probability but non-zero tail risks that cannot be fully discounted.`,
    ],

    keyTerms: [
      { term: 'Volatility risk', definition: 'Bitcoin\'s historical tendency to experience 70-80%+ price crashes. Real but manageable with appropriate position sizing and time horizon.' },
      { term: 'Regulatory risk', definition: 'The risk that government action restricts Bitcoin\'s usability, exchanges, or taxation to the point of practical elimination. Reduced but not eliminated by institutional adoption.' },
      { term: 'Quantum computing risk', definition: 'The theoretical future ability of quantum computers to break Bitcoin\'s elliptic curve cryptography. Estimated to be 10-20+ years away; upgrades are possible.' },
      { term: 'Fee market sustainability', definition: 'The question of whether transaction fees alone can incentivize sufficient mining security once block subsidies near zero (~2140).' },
      { term: 'Position sizing', definition: 'Allocating only the portion of a portfolio to Bitcoin that can be held through an 80% drawdown without panic selling. The key risk management discipline.' },
      { term: 'Drawdown', definition: 'A peak-to-trough price decline. Bitcoin has had multiple 70-80% drawdowns; each was followed by recovery to new all-time highs (historically within 2-4 years).' },
    ],

    commonConfusion: [
      `**"Bitcoin going down 80% proves it's a scam"** — Bitcoin has gone down 80% four times (2011, 2014, 2018, 2022). Each time, it recovered and reached new highs. Price volatility is not evidence of fraud — it is evidence of a young, thinly traded market in price discovery. Amazon also went down 90% in 2000-2002 and went on to be worth $2T.`,
      `**"Tether and stablecoin risks will take down Bitcoin"** — Stablecoin risks are real — a Tether collapse could trigger severe crypto market volatility. But Bitcoin exists independently of stablecoins. A stablecoin crisis would cause short-term Bitcoin price damage (correlation during liquidity events), not Bitcoin's fundamental failure as a protocol.`,
      `**"If it was going to work, it would have worked by now"** — Gold took millennia to become globally accepted as monetary collateral. The internet took 30+ years from ARPANET (1969) to mainstream adoption (~2000). Bitcoin at 15 years old is extraordinarily young relative to the claim it is making (replacing global monetary infrastructure).`,
    ],

    recallPrompts: [
      { question: 'What is the correct risk management response to Bitcoin\'s 70-80% volatility?', hint: 'Two disciplines: ___ sizing (only invest what you can hold through worst case) and appropriate ___ horizon.' },
      { question: 'How does quantum computing threaten Bitcoin, and what is the timeline?', hint: 'It could theoretically break ___ signatures. But experts estimate 10-20+ years away, and Bitcoin can upgrade to ___ algorithms.' },
      { question: 'What does the fee market sustainability concern actually mean?', hint: 'Post-2140, miners rely entirely on ___. If Lightning routes most txs off-chain, on-chain ___ revenue may be insufficient for security.' },
    ],

    investorTakeaway: 'Bitcoin carries genuine risks. The appropriate response is not avoidance — it is position sizing, time horizon selection, and conviction in the underlying thesis sufficient to survive the inevitable drawdowns.',

    cheatSheet: [
      'Volatility: 70-80% crashes are normal; Bitcoin has always recovered (within 2-4 years historically)',
      'Regulatory risk: reduced but not eliminated by US ETF approval; varies by jurisdiction',
      'Quantum computing: real but 10-20+ years away; Bitcoin can upgrade signatures beforehand',
      'Fee market sustainability: legitimate long-term concern for post-2140 mining incentives',
      'Position sizing: only invest what you can hold through an 80% crash without panic selling',
      'Concentration risk: real but comparable to gold, equities, and real estate',
      'Warren Buffett\'s "rat poison" critique: Bitcoin produces nothing (neither does gold; see $13T market)',
      'Black swans: SHA-256 break, global internet shutdown — low probability, non-zero tail risks',
    ],
  },
]
