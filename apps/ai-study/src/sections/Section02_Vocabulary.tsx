import { Scissors, Gauge, SlidersHorizontal, Brain, BookOpen, AlertTriangle, HelpCircle, Boxes } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  TermsMemoryBlock, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout, ModelCardGrid, CompareTable,
} from '../components/ui'
import { TokenizerLab } from '../components/viz/TokenizerLab'
import { ContextWindowLab } from '../components/viz/ContextWindowLab'
import { TemperatureLab } from '../components/viz/TemperatureLab'

export default function Section02() {
  return (
    <SectionShell id="section-2">
      <SectionHeader
        number={2}
        title="Core Vocabulary"
        subtitle="Tokens, context and temperature are the three knobs behind every AI tool you will ever touch. Play with them here and the jargon stops being jargon."
      />

      <Subsection title="Tokens — what the model actually reads" icon={<Scissors className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Models do not see words. They see tokens — chunks of roughly four characters that a
          learned vocabulary carved the language into. Everything you are billed for, and every
          limit you hit, is counted in these.
        </Takeaway>

        <TokenizerLab />

        <Points items={[
          <><strong>Common words are one token.</strong> "the", "and", "model" each cost exactly one.</>,
          <><strong>Rare words fragment.</strong> "Antidisestablishmentarianism" becomes five or six pieces — and you pay for every one.</>,
          <><strong>Code is expensive.</strong> Camel-case names, braces and operators all split. A line of code costs far more tokens than a line of prose.</>,
          <><strong>Other languages cost more.</strong> English dominates the training vocabulary, so Thai, Japanese or Arabic text often runs 2–3× the token count for the same meaning.</>,
        ]} />

        <Example label="The number worth memorising">
          <strong>1 token ≈ 0.75 words ≈ 4 characters.</strong> So 1,000 words ≈ 1,300 tokens,
          and a 300-page book ≈ 150,000 tokens.
        </Example>
      </Subsection>

      <Subsection title="Context window — the model's whole world" icon={<Gauge className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The context window is short-term RAM, not memory. Everything must fit in one call:
          your instructions, the whole conversation so far, any documents you pasted — and the
          space the reply needs to be written into.
        </Takeaway>

        <ContextWindowLab />

        <InfoCallout type="warning">
          <strong>Why long chats "forget" things.</strong> Nothing is remembered between calls. Each
          message re-sends the entire history, and when that history no longer fits, your client
          silently drops the oldest turns. The model did not forget — you stopped sending it.
        </InfoCallout>
      </Subsection>

      <Subsection title="Temperature — how adventurous the model is" icon={<SlidersHorizontal className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          At every step the model holds a ranked list of plausible next tokens. Temperature does not
          make it smarter or dumber — it only changes how often it picks something other than the
          front-runner.
        </Takeaway>

        <TemperatureLab />

        <InfoCallout type="warning">
          <strong>The ranges differ by provider.</strong> Anthropic caps temperature at 1.0.
          OpenAI allows 0–2. Sending 2 to Anthropic is a validation error, not a wild answer.
        </InfoCallout>
      </Subsection>

      <Subsection title="The other parameters you will meet" icon={<Boxes className="w-4 h-4 text-violet-500" />}>
        <CompareTable
          headers={['What it does', 'When you touch it']}
          rows={[
            {
              attribute: 'max_tokens',
              values: [
                'Hard cap on the length of the reply. Counts against the same window.',
                'Set too low and answers truncate mid-sentence. Set generously — you are billed for what is generated, not for the ceiling.',
              ],
            },
            {
              attribute: 'top_p',
              values: [
                'Nucleus sampling: only consider tokens whose cumulative probability reaches p.',
                'Rarely. Tune temperature or top_p, not both — they fight each other.',
              ],
            },
            {
              attribute: 'stop sequences',
              values: [
                'Strings that make generation halt immediately when produced.',
                'Useful when you want the model to emit one item and stop, not carry on with a list.',
              ],
            },
            {
              attribute: 'stream',
              values: [
                'Return tokens as they are generated instead of waiting for the whole reply.',
                'Any user-facing UI. Same total time, but the perceived wait collapses.',
              ],
            },
            {
              attribute: 'seed',
              values: [
                'Fixes the random draw so the same input reproduces the same output.',
                'Testing and evaluation. Supported by OpenAI and Ollama; not by every provider.',
              ],
            },
          ]}
        />
      </Subsection>

      <Subsection title="Standard vs. reasoning models" icon={<Brain className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          There are now two operating modes, and picking the wrong one costs you either accuracy or
          a great deal of money.
        </Takeaway>

        <CompareTable
          headers={['Standard model', 'Reasoning model']}
          rows={[
            { attribute: 'How it answers', values: ['One pass — starts writing immediately', 'Thinks at length internally first, then writes'] },
            { attribute: 'Latency', values: ['1–5 seconds', '30–120 seconds'] },
            { attribute: 'Cost per task', values: ['Baseline', '5–20× — you pay for the thinking tokens too'] },
            { attribute: 'Wins at', values: ['Chat, coding, summarising, extraction, agent loops', 'Multi-step maths, intricate logic, subtle debugging, architecture trade-offs'] },
            { attribute: 'Examples', values: ['Claude Sonnet, GPT-4o, Gemini Pro', 'Claude Opus with extended thinking, o-series, DeepSeek-R1'] },
          ]}
        />

        <InfoCallout type="tip">
          <strong>The 80/20 rule.</strong> A standard model handles the overwhelming majority of real
          work. Reach for a reasoning model only when a standard one has visibly and repeatedly
          failed at the same problem — not preemptively.
        </InfoCallout>
      </Subsection>

      <Subsection title="The models you will actually use" icon={<Boxes className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Filter by how you want to run it. Cloud buys you capability per call; local buys you
          privacy and a marginal cost of zero.
        </Takeaway>

        <ModelCardGrid models={[
          {
            name: 'Claude Sonnet', maker: 'Anthropic', contextWindow: '200k', access: 'cloud',
            modelType: 'standard', multimodal: true,
            bestFor: 'Coding, long-document work, agent loops, following detailed instructions',
            strengths: [
              'Strongest balance of coding and reasoning at this price point',
              '200k context handles a whole codebase or a book',
              'Reads screenshots, diagrams and scanned documents',
              'Reliable structured output and tool use',
              'Prompt caching cuts repeat costs sharply',
            ],
            costTier: '~$3 in / $15 out per million tokens',
          },
          {
            name: 'GPT-4o', maker: 'OpenAI', contextWindow: '128k', access: 'cloud',
            modelType: 'standard', multimodal: true,
            bestFor: 'General-purpose work and the widest ecosystem support',
            strengths: [
              'Text, image and audio input',
              'Almost every framework supports it first',
              'Mature function calling',
              'Enormous body of examples and tutorials',
            ],
            costTier: '~$2.50 in / $10 out per million tokens',
          },
          {
            name: 'Gemini 2.5 Pro', maker: 'Google DeepMind', contextWindow: '1M', access: 'cloud',
            modelType: 'standard', multimodal: true,
            bestFor: 'Inputs too big for anything else — whole repos, long video, book-length research',
            strengths: [
              'One million token context, the largest widely available',
              'Accepts video as well as images and audio',
              'Competitive on reasoning benchmarks',
              'Cheapest input rate of the frontier three',
            ],
            costTier: '~$1.25 in / $10 out per million tokens',
          },
          {
            name: 'Llama 3.3 70B', maker: 'Meta — open weights', contextWindow: '128k', access: 'local',
            modelType: 'standard', multimodal: false,
            bestFor: 'Private and high-volume work where data must not leave the machine',
            strengths: [
              'Runs entirely offline — nothing is transmitted',
              'Close to cloud quality on many everyday tasks',
              'No rate limits and no per-call cost',
              'One command to install: ollama pull llama3.3:70b',
            ],
            costTier: 'Free — needs roughly 45 GB of memory',
          },
          {
            name: 'Llama 3.1 8B', maker: 'Meta — open weights', contextWindow: '128k', access: 'local',
            modelType: 'standard', multimodal: false,
            bestFor: 'The realistic starting point on a normal laptop',
            strengths: [
              'Runs comfortably in about 6 GB at Q4',
              'Fast enough for interactive use on CPU',
              'Good at summarising, rewriting and extraction',
              'Where almost everyone should begin with local AI',
            ],
            costTier: 'Free — needs roughly 6 GB of memory',
          },
          {
            name: 'DeepSeek-R1', maker: 'DeepSeek — open weights', contextWindow: '128k', access: 'local',
            modelType: 'reasoning', multimodal: false,
            bestFor: 'Maths, logic and multi-step problems that defeat standard models',
            strengths: [
              'Shows its full chain of thought in <think> tags',
              'Competitive with closed reasoning models on maths benchmarks',
              'Available at 7B, 14B, 32B and 70B',
              'The best local option for genuinely hard reasoning',
            ],
            costTier: 'Free — 7B needs ~5 GB, 32B needs ~20 GB',
          },
        ]} />

        <InfoCallout type="tip">
          <strong>A sane starting stack:</strong> Claude Sonnet for API work, plus Ollama running
          Llama 3.1 8B for anything private. Add Gemini only when an input genuinely exceeds 200k
          tokens, and DeepSeek-R1 only when you hit a reasoning wall.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key terms" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
        <TermsMemoryBlock terms={[
          {
            term: 'Hallucination',
            short: 'Confidently stating something false.',
            example: 'Inventing a library function that does not exist',
            detail: 'Not lying and not a bug that gets patched — the model predicts probable text, and a plausible-sounding falsehood is exactly what "probable" produces when it has no grounding. Mitigate architecturally: retrieval, citations, verification steps.',
          },
          {
            term: 'Grounding',
            short: 'Anchoring answers to real source material you supply.',
            example: 'Pasting the actual docs into the prompt',
            detail: 'The single most effective hallucination defence. RAG is grounding done automatically.',
          },
          {
            term: 'RAG',
            short: 'Retrieval Augmented Generation — search your data, paste the hits into the prompt, then ask.',
            example: 'Chat with your own PDFs',
            detail: 'Cheap, updatable, and the right answer for almost every "the model needs to know my data" problem. Section 7 builds one.',
          },
          {
            term: 'Fine-tuning',
            short: 'Further training that permanently changes the weights.',
            example: 'Teaching a model your house writing style',
            detail: 'Expensive and inflexible next to RAG. Use it to change how the model behaves, never merely to give it facts.',
          },
          {
            term: 'Embedding',
            short: 'Text turned into a vector, where nearby vectors mean similar things.',
            example: '"car" and "automobile" land close together',
            detail: 'The mechanism behind semantic search. You must use the same embedding model for indexing and querying or the distances are meaningless.',
          },
          {
            term: 'System prompt',
            short: 'Instructions supplied before the conversation, carrying more weight than user messages.',
            example: '"You are a terse code reviewer."',
            detail: 'Persists across every turn. This is where role, constraints and output format belong.',
          },
          {
            term: 'Prompt caching',
            short: 'The provider stores a long, repeated prompt prefix and bills it at a fraction of the rate.',
            example: 'Up to ~90% off the cached portion',
            detail: 'Pays off exactly when a large system prompt or document is reused across many calls. Section 9 has a lab for the numbers.',
          },
          {
            term: 'Parameters',
            short: 'The weight count — the "7B" or "70B" in a model name.',
            example: 'Llama 3.1 70B = 70 billion weights',
            detail: 'Loosely tracks capability, and directly determines memory needs. More is not automatically better if it will not fit.',
          },
          {
            term: 'Quantization',
            short: 'Shrinking weights from 16-bit floats to 4 or 8 bits so a model fits in less memory.',
            example: 'Q4 roughly quarters the size',
            detail: 'The quality cost at Q4 is small and the memory saving is large. Section 6 has a lab.',
          },
          {
            term: 'Multimodal',
            short: 'Accepts more than one input type in a single model.',
            example: 'Send a screenshot and ask what is wrong with it',
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Context window',
            itemB: 'Conversation history',
            explanation: 'The window is a hard per-call cap set by the model. History is whatever you choose to re-send. A conversation can run for months; you decide what still fits by summarising or dropping old turns.',
            fix: 'The window is fixed. What goes into it is entirely your choice.',
          },
          {
            itemA: 'Temperature 0',
            itemB: 'Perfectly reproducible output',
            explanation: 'Floating-point arithmetic on GPUs is not bit-identical between runs, so temperature 0 is near-deterministic, not deterministic. Set a seed as well if you need genuine reproducibility for tests.',
            fix: 'Temperature 0 plus a seed, if reproducibility actually matters.',
          },
          {
            itemA: 'Hallucination',
            itemB: 'A bug that will be fixed',
            explanation: 'It falls straight out of how the architecture works — predicting probable next tokens, not looking facts up. No release will patch it away.',
            fix: 'Design around it: ground, cite, verify.',
          },
          {
            itemA: 'Fine-tuning',
            itemB: 'RAG',
            explanation: 'Fine-tuning rewrites weights through training — costly, slow to update, needs ML skill. RAG injects documents at query time — cheap, instantly updatable, no training.',
            fix: 'Facts → RAG. Behaviour and format → fine-tuning.',
          },
          {
            itemA: 'A bigger context window',
            itemB: 'Better answers',
            explanation: 'Attention thins out over very long inputs, and models reliably attend to the beginning and end more than the middle. A tightly curated 8k prompt often beats a lazy 200k one.',
            fix: 'Fill the window deliberately, not just fully.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'You have a 5,000-word document. Will it fit in a 200k-token window?',
            answer: 'Comfortably — 5,000 words is roughly 6,500 tokens, about 3% of the window. You would need a million-token model only for genuinely enormous inputs like a whole repository or several books.',
          },
          {
            question: 'You set temperature to 2 on the Anthropic API. What happens?',
            answer: 'A validation error. Anthropic caps temperature at 1.0; OpenAI is the one that allows up to 2. For code generation you want 0 or close to it regardless.',
          },
          {
            question: 'Your chatbot keeps forgetting what the user said ten messages ago. Why?',
            answer: 'The history no longer fits the window, so your client is trimming the oldest turns before sending. Fix it by summarising older turns rather than dropping them, or by moving to a larger window.',
          },
          {
            question: 'The model needs to answer from your company handbook. Fine-tune or RAG?',
            answer: 'RAG. You need it to know facts, not to behave differently. RAG is cheaper, updates the moment the handbook changes, and lets you show citations. Fine-tuning would bake in a snapshot that goes stale.',
          },
          {
            question: 'Same prompt, wildly different answers each run. What is the first thing to check?',
            answer: 'Temperature. Anything above about 0.8 will visibly vary the phrasing and often the substance. Drop it toward 0 for anything you need to be consistent.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 2 in ten lines" items={[
        { label: 'Token', value: '≈0.75 words, ≈4 characters. The unit for price, limits and speed.' },
        { label: 'Context window', value: 'Per-call cap. Claude 200k · GPT-4o 128k · Gemini 1M.' },
        { label: 'It all shares one window', value: 'System prompt + history + documents + the reply.' },
        { label: 'Temperature', value: 'Anthropic 0–1, OpenAI 0–2. Low = consistent, high = varied.' },
        { label: 'Standard model', value: 'Fast and cheap. Handles the vast majority of work.' },
        { label: 'Reasoning model', value: 'Slow and pricey. Only for genuinely hard multi-step problems.' },
        { label: 'Hallucination', value: 'Inherent, not a bug. Ground it, cite it, verify it.' },
        { label: 'RAG vs fine-tuning', value: 'Facts → RAG. Style and behaviour → fine-tuning.' },
        { label: 'Prompt caching', value: 'Up to ~90% off a repeated prefix. Worth it above a few hundred calls.' },
        { label: 'Starter stack', value: 'Claude Sonnet for API work + Ollama Llama 3.1 8B for private work.' },
      ]} />
    </SectionShell>
  )
}
