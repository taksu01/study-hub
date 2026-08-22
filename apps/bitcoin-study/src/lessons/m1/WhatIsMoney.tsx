import type { LessonProps } from '../../App'
import { LessonLayout } from '../../components/lesson/LessonLayout'
import {
  LessonSection, P, Strong, Callout, NowBox,
  KeyTermsGrid, ConfusionBlock, RecallBlock, CheatSheet,
} from '../../components/lesson/blocks'
import { Quiz } from '../../components/lesson/Quiz'
import MoneyPropertiesTable from '../../components/market/visuals/MoneyPropertiesTable'

export default function WhatIsMoney({ onNavigate }: LessonProps) {
  return (
    <LessonLayout
      moduleId="m1"
      lessonId="what-is-money"
      subtitle="Money is a technology, and like any technology it can be scored. Six properties decide whether something works as money — and they explain both why gold won for 5,000 years and why Bitcoin exists."
      onNavigate={onNavigate}
    >
      <LessonSection title="Money is a scoreboard, not a thing" icon="⚖">
        <P>
          Shells, salt, cattle, gold, paper — history has tried them all as money. Each replaced the last not by
          decree but because it <Strong>scored better</Strong> on a handful of properties: it was harder to fake,
          easier to carry, or harder to inflate. Money is a competition, and the best technology tends to win.
        </P>
        <P>
          Economists boil the scoreboard down to six properties: <Strong>scarcity, durability, divisibility,
          portability, fungibility, and verifiability</Strong>. No money in history has aced all six. Gold nails
          scarcity and durability but is miserable to move and verify. Fiat is effortless to spend but fails
          scarcity by design — a central bank can always print more.
        </P>
      </LessonSection>

      <LessonSection title="Score the contenders yourself" icon="🏆">
        <P>
          The scorecard below rates each property from poor to excellent. Notice the <Strong>pattern of the
          gaps</Strong>: gold's weaknesses are physical (moving and testing it), fiat's weakness is political
          (unlimited supply), and Bitcoin's honest weak spot is fungibility, since every coin's history is public.
        </P>
        <MoneyPropertiesTable />
        <Callout type="tip" title="The one thing to remember">
          Bitcoin isn't trying to beat Visa at payments — it's trying to beat gold at being money. It is
          engineered to match or exceed gold on every property except one it can't fake: track record. Gold has
          5,000 years; Bitcoin has been earning its record since 2009.
        </Callout>
      </LessonSection>

      <LessonSection title="The seashell problem" icon="🐚">
        <P>
          Imagine an island using seashells as money — it works for decades because shells are hard to find. Then
          someone discovers a beach with millions of them. Every saved shell instantly buys less. Nobody stole
          anything; the <Strong>supply just grew</Strong>. That is what money printing does to savings, and it is
          why scarcity leads the list. Bitcoin's design promise is simple: <Strong>no beach can ever be
          discovered</Strong>. The supply is capped at 21 million by rules every node enforces.
        </P>
        <P>
          Scarcity also unlocks a bonus property the classic list ignores: <Strong>censorship resistance</Strong>.
          Because no central issuer exists, there is also no central gatekeeper who can freeze your balance or
          block your payment. Fiat scores zero here; gold in a vault scores barely better.
        </P>
      </LessonSection>

      <LessonSection title="Common confusion" icon="🌀">
        <ConfusionBlock
          items={[
            {
              a: '"No intrinsic value"',
              b: 'Value from properties',
              explanation:
                'The US dollar is not backed by gold, oil, or anything else — its value comes from legal mandate and collective agreement. Bitcoin\'s value comes from verifiable scarcity, network effects, and its scores on the money properties. "Intrinsic value" is a weak argument against Bitcoin because it disqualifies most modern money too.',
            },
            {
              a: '"Gold is already sound money"',
              b: 'Sound but stranded',
              explanation:
                'Gold aces scarcity and durability but fails at scale: moving $100M of gold across a border is a logistical nightmare, and proving a bar is pure requires physical assaying. Bitcoin moves $100M in about ten minutes, and any node on Earth verifies it in seconds, for free.',
            },
            {
              a: '"Inflation is only 2–3%"',
              b: 'Compounding erosion',
              explanation:
                'Even the official rate compounds: at 3% a year, savings lose about a quarter of their purchasing power in a decade. Asset prices (housing, equities) typically inflate faster than the CPI basket, and in emerging markets running 10–30% inflation, a fixed-supply asset is not theoretical — it is a lifeline.',
            },
          ]}
        />
      </LessonSection>

      <NowBox asOf="2025">
        <p>
          In <strong>1971</strong> the US ended dollar–gold convertibility (the "Nixon Shock"), removing the last
          hard constraint on money creation. Since then the dollar has lost roughly <strong>87% of its purchasing
          power</strong>. Bitcoin's fixed 21-million cap — live and unbroken since 2009 — is a direct engineering
          response to that structural shift.
        </p>
      </NowBox>

      <LessonSection title="Key terms" icon="🔑">
        <KeyTermsGrid
          terms={[
            { term: 'Sound money', definition: 'Money whose properties preserve value over time — above all, resistance to arbitrary supply expansion.' },
            { term: 'Fiat currency', definition: 'Government-issued money with no commodity backing. Its value rests on legal tender laws and collective trust, not scarcity.' },
            { term: 'Fungibility', definition: 'Every unit is interchangeable with every other. A dollar is a dollar; Bitcoin is nuanced here because coin histories are publicly traceable.' },
            { term: 'Satoshi (sat)', definition: 'The smallest Bitcoin unit: 0.00000001 BTC. One bitcoin splits into 100 million sats.' },
            { term: 'Nixon Shock', definition: 'The 1971 end of dollar–gold convertibility, making the USD pure fiat with no external limit on issuance.' },
            { term: 'Purchasing power', definition: 'What a unit of money actually buys. Inflation erodes it even while the number in your account stays the same.' },
          ]}
        />
      </LessonSection>

      <LessonSection title="Check your understanding" icon="✅">
        <Quiz
          questions={[
            {
              question: 'Which property does fiat currency fail most fundamentally?',
              options: [
                'Divisibility — you cannot split a dollar far enough',
                'Portability — cash is too heavy to move',
                'Scarcity — the issuer can create new units at will',
                'Durability — bills wear out too quickly',
              ],
              correct: 2,
              explanation:
                'Fiat actually scores well on divisibility, portability, and fungibility. Its defining weakness is scarcity: supply is a policy choice, not a constraint. That is the specific failure Bitcoin\'s 21-million hard cap targets.',
            },
            {
              question: 'Gold served as money for millennia. Where does it break down in a modern, global economy?',
              options: [
                'It corrodes and degrades over time',
                'Portability and verifiability at scale — moving and assaying it is slow and costly',
                'It is too easy to counterfeit',
                'Its supply grows faster than fiat supply',
              ],
              correct: 1,
              explanation:
                'Gold is nearly indestructible and hard to fake — but shipping $100M of it across borders is a security operation, and confirming purity requires physical testing. Bitcoin settles the same value in minutes and any full node verifies it instantly.',
            },
            {
              question: 'Why is Bitcoin\'s fungibility considered its weakest property on the scorecard?',
              options: [
                'Some bitcoins are physically larger than others',
                'Bitcoin cannot be divided into small enough units',
                'Miners can refuse to include any transaction they dislike forever',
                'Every coin\'s transaction history is publicly visible, so coins are not perfectly interchangeable',
              ],
              correct: 3,
              explanation:
                'The public ledger means a coin\'s past is traceable — an exchange could treat "tainted" coins differently. A dollar bill carries no such history. Layer 2 and privacy research aim to close this gap, but today it is Bitcoin\'s honest weak spot.',
            },
          ]}
        />
      </LessonSection>

      <LessonSection title="Recall — answer before revealing" icon="🧠">
        <RecallBlock
          prompts={[
            { question: 'Name the six properties of sound money.', answer: 'Scarcity, durability, divisibility, portability, fungibility, and verifiability. Bitcoin adds a seventh in practice: censorship resistance, because no central issuer can freeze or block payments.' },
            { question: 'What happened in 1971, and why does it matter to the Bitcoin story?', answer: 'The Nixon Shock ended dollar–gold convertibility, removing the last hard constraint on money printing. The dollar has since lost roughly 87% of its purchasing power — Bitcoin\'s fixed supply is a direct response to that era.' },
            { question: 'How does Bitcoin solve gold\'s portability problem?', answer: 'Value on the Bitcoin network is weightless and borderless: any amount can move globally in about ten minutes, and access to it can be backed up as a 24-word seed phrase — effectively carrying wealth in your memory.' },
          ]}
        />
      </LessonSection>

      <CheatSheet
        items={[
          { label: 'The six properties', value: 'Scarce, durable, divisible, portable, fungible, verifiable — the scoreboard every money competes on.' },
          { label: 'Fiat\'s failure', value: 'Scarcity. Supply is unlimited by design; printing dilutes every saved unit (the seashell beach).' },
          { label: 'Gold\'s failure', value: 'Portability + verifiability at scale — heavy to move, needs physical assaying.' },
          { label: 'Bitcoin\'s design', value: '21M hard cap, divisible to 8 decimals (1 sat = 0.00000001 BTC), borderless, verifiable by any node in seconds.' },
          { label: 'Bitcoin\'s weak spot', value: 'Fungibility — coin histories are public. Also: a track record measured in years, not millennia.' },
          { label: '1971', value: 'Nixon Shock ends gold convertibility → pure fiat era; USD loses ~87% of purchasing power since.' },
        ]}
      />
    </LessonLayout>
  )
}
