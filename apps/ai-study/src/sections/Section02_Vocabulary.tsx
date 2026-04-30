import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, TermsMemoryBlock, ModelCardGrid,
  CommonConfusionBlock, MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section02() {
  return (
    <SectionShell id="section-2">
      <SectionHeader
        number={2}
        title="Core Vocabulary"
        subtitle="The jargon demystified. These are the terms you'll see everywhere — understand them once, deeply."
      />

      <Subsection title="How Models Process Text">
        <Prose>
          <p>Before you can use AI tools well, you need to understand how they actually see your text. It's not words — it's tokens. And there's a hard limit on how much it can reason about at once.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Token',
            subtitle: 'The atomic unit of AI text',
            content: 'A chunk of text roughly 0.75 words or 4 characters long. "Hello world" is 2 tokens. A 1000-word essay is ~1300 tokens.',
            details: 'Models don\'t process words — they process tokens. A token might be a word ("cat"), a word fragment ("un-", "-ing"), punctuation, or whitespace. Tokenization is language-specific: Chinese or Arabic typically use more tokens per character than English. Tokens matter because: (1) API pricing is per-token, (2) speed is measured in tokens/second, (3) context limits are in tokens. Rule of thumb: 1 token ≈ 4 characters ≈ 0.75 English words.',
            tags: ['~0.75 words', 'Basis for pricing & limits'],
            color: 'blue',
          },
          {
            title: 'Context Window',
            subtitle: 'The model\'s working memory per call',
            content: 'The maximum number of tokens a model can process in a single API call — your input prompt plus its output response combined.',
            details: 'Think of it as a model\'s short-term RAM. The model can only reason about what\'s in the context window right now. Content that doesn\'t fit is simply not seen. Important: context window ≠ conversation length. A conversation can be arbitrarily long — but each API call can only include what fits in the window. You decide what to include.\n\nCurrent limits: Claude: 200k tokens (~150k words), GPT-4o: 128k, Gemini 2.5 Pro: 1M tokens. Older models had just 4k–8k.',
            tags: ['Claude: 200k', 'GPT-4o: 128k', 'Gemini: 1M'],
            color: 'purple',
          },
          {
            title: 'Temperature',
            subtitle: 'Controls randomness — provider-dependent range',
            content: 'A parameter that controls how "random" or "creative" the model\'s outputs are. Higher = more varied. Lower = more consistent.',
            details: 'At each step, the model assigns probabilities to all possible next tokens. Temperature scales those probabilities before sampling.\n\nClaude (Anthropic): 0.0 to 1.0\n• 0.0 = deterministic (always picks the highest-probability token)\n• 0.5–0.7 = balanced, natural responses (default)\n• 1.0 = maximum creativity/variation\n\nOpenAI / others: 0.0 to 2.0 (same behavior, wider range)\n\n⚠️ Common mistake: setting temperature to 2 while using Claude\'s API will throw an error — Anthropic caps at 1.0.\n\nUse low temperature for: code generation, data extraction, factual tasks. Use higher temperature for: brainstorming, creative writing, generating diverse options.',
            tags: ['Anthropic: 0–1', 'OpenAI: 0–2', 'Provider-specific'],
            color: 'orange',
          },
          {
            title: 'Max Tokens',
            subtitle: 'Output length limit',
            content: 'Caps how many tokens the model generates in its response. Does not affect input length.',
            details: 'Set too low and the model truncates mid-sentence. Set too high and you pay for tokens you don\'t need. The model also stops early if it naturally finishes.\n\nPractical defaults:\n• Simple Q&A: 512–1024 tokens\n• Code generation: 2048–4096 tokens\n• Long-form writing: 4096–8192 tokens\n\nNote: this is the output cap only. Input tokens are separate and counted from your prompt.',
            tags: ['Output limit only', 'Affects cost'],
            color: 'teal',
          },
          {
            title: 'Streaming',
            subtitle: 'Tokens as they arrive, not all at once',
            content: 'Receiving model output token-by-token as it generates, rather than waiting for the complete response.',
            details: 'When you see Claude or ChatGPT typing word-by-word in real time — that\'s streaming. Without streaming, you\'d wait 5–30 seconds for a long response before seeing anything. With streaming, text appears immediately.\n\nImplementation: most AI APIs deliver streaming via Server-Sent Events (SSE). For real-time UIs — chat interfaces, live code editors, dashboards — always use streaming. The total latency is the same; perceived latency is dramatically better.',
            tags: ['Better UX', 'Server-sent events (SSE)'],
            color: 'green',
          },
          {
            title: 'Top-p / Top-k',
            subtitle: 'Advanced sampling — usually leave at defaults',
            content: 'Parameters that filter which tokens the model samples from at each step, independent of temperature.',
            details: 'Top-p (nucleus sampling): only sample from the set of tokens whose cumulative probability reaches p. Top-p=0.9 means "consider tokens until you\'ve accounted for 90% of the probability mass." Top-k: only consider the k most likely tokens.\n\nThese are advanced controls that most application developers never need to touch. Temperature provides sufficient control for the vast majority of use cases. Leave at defaults unless you have a specific, researched reason to change them.',
            tags: ['Advanced', 'Leave at defaults'],
            color: 'slate',
          },
        ]} />
      </Subsection>

      <Subsection title="Standard Models vs. Reasoning Models">
        <Prose>
          <p>There are now two fundamentally different operating modes for frontier AI models. Understanding which type you're dealing with changes how you prompt, what you pay, and what tasks are appropriate.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Standard Models',
            subtitle: 'Fast, efficient, great for most tasks',
            content: 'Generate output directly from your prompt. One forward pass through the model. Response time: 1–5 seconds for most tasks.',
            details: 'Standard models are what you\'ve always used: you send a prompt, they generate a response. The model processes your input and generates output in a single continuous pass.\n\nBest for: coding assistance, summarization, writing, Q&A, data extraction, classification, conversational chat — essentially 90%+ of all real-world AI tasks.\n\nCost: typically lower per-token. Latency: typically 1–10 seconds.\n\nExamples: Claude Sonnet 4.6, GPT-4o, Gemini 2.5 Pro (standard mode), Llama 3.3 70B',
            tags: ['Fast', 'Efficient', 'General purpose'],
            color: 'blue',
          },
          {
            title: 'Reasoning Models',
            subtitle: 'Slow, expensive, dramatically better on hard problems',
            content: 'Spend extra compute "thinking" before responding. Generate extended internal reasoning chains, then produce a final answer. Response time: 15–120 seconds.',
            details: 'Reasoning models like o1, o3 (OpenAI), Claude Opus 4.7 (with extended thinking), and DeepSeek-R1 generate a long chain of thought before producing their final answer. This internal reasoning — sometimes thousands of tokens — is what makes them dramatically better on complex problems.\n\nBest for: complex math proofs, multi-step logic puzzles, intricate code architecture, deep research synthesis, anything that requires careful sequential reasoning.\n\nCost: significantly higher per-task (more tokens generated total). Latency: 30–120 seconds for hard problems.\n\nWhen to use them: only when standard models consistently fail at the task. The quality gap is significant — but so is the cost gap. Don\'t use o1/Opus for tasks Claude Sonnet handles fine.\n\nExamples: o1, o3 (OpenAI), Claude Opus 4.7, DeepSeek-R1',
            tags: ['Slower', 'Higher cost', 'Hard problems only'],
            color: 'purple',
          },
        ]} />
        <InfoCallout type="tip">
          <strong>The 80/20 rule for model selection:</strong> A standard model (Claude Sonnet, GPT-4o) handles 90%+ of tasks well. Upgrade to a reasoning model only when the standard model is consistently failing or reasoning incorrectly on genuinely difficult tasks. Start cheap, upgrade when needed.
        </InfoCallout>
      </Subsection>

      <Subsection title="The Intelligence Terms">
        <Prose>
          <p>These terms describe what models can do and how they behave. Understanding them prevents common mistakes when building with AI.</p>
        </Prose>
        <div className="mt-4" />
        <TermsMemoryBlock terms={[
          { term: 'Hallucination', definition: 'When a model confidently states something false. It\'s not "lying" — it\'s predicting plausible-sounding text that happens to be factually wrong. An inherent characteristic of how LLMs work, not a fixable bug. Mitigate with grounding (RAG) and explicit verification steps.' },
          { term: 'Grounding', definition: 'Anchoring model outputs to real, verifiable information — usually by including actual source documents in the prompt (RAG). Grounded models answer from provided facts rather than training data, dramatically reducing hallucination on domain-specific questions.' },
          { term: 'Reasoning', definition: 'The model\'s ability to work through multi-step problems. Standard models do this via chain-of-thought. Reasoning models (o1, DeepSeek-R1, Claude Opus with extended thinking) dedicate additional compute to generate a full internal reasoning chain before producing an answer.' },
          { term: 'Fine-tuning', definition: 'Continuing to train a pre-trained model on a specific dataset to specialize it. Makes the model better at niche tasks (medical records, legal documents, a specific writing style). Expensive and technically complex — most developers use base models with good prompting instead.' },
          { term: 'Embedding', definition: 'Converting text to a vector (list of numbers) that represents its semantic meaning. Texts with similar meaning produce similar vectors. Used for semantic search, duplicate detection, recommendations, and RAG (finding relevant documents by meaning, not keyword).' },
          { term: 'RAG', definition: 'Retrieval Augmented Generation. Before calling the model, search a knowledge base for relevant documents (using embeddings) and inject them into the prompt. The model answers from retrieved context, not training data. Prevents hallucination on domain-specific facts.' },
          { term: 'System prompt', definition: 'Instructions provided to the model before the conversation begins. Defines persona, behavior rules, output format, and constraints. The user never sees it. Set once per session (or once per API call). The primary tool for customizing model behavior in production.' },
          { term: 'Prompt caching', definition: 'An API optimization where repeated prompt prefixes (large system prompts, reference documents) are cached after the first call. Subsequent calls reusing that cached content are billed at ~10% of normal cost. Anthropic, OpenAI, and Google all support this. Critical for RAG applications and high-volume production systems.' },
          { term: 'Parameters', definition: 'The numerical weights inside a model encoding learned knowledge. A "70B model" has 70 billion parameters. More parameters generally correlates with greater capability, but is not a guarantee — training data quality and methodology matter equally.' },
          { term: 'Quantization', definition: 'Compressing model weights from 16/32-bit floats to fewer bits (8-bit or 4-bit integers). Q4_K_M is 4-bit: ~4x smaller, runs on laptops, minor quality tradeoff (~5%). Essential for running large models locally — a 70B Q4 model needs ~45GB RAM instead of ~140GB at full precision.' },
          { term: 'Completion', definition: 'The model\'s generated response to a prompt. Also used as a verb — "completing" a prompt. Older APIs (GPT-3 era) used a /completions endpoint. Modern APIs use /messages or /chat/completions — the concept is the same.' },
          { term: 'Multimodal', definition: 'A model that processes multiple input types (text + images, or text + images + audio) in a single architecture. Modern frontier models (Claude 3.5+, GPT-4o, Gemini 2.5) are multimodal. Technically more precise than "LLM" for these models.' },
        ]} />
      </Subsection>

      <Subsection title="Model Comparison — The Major Players">
        <Prose>
          <p>These are the models you'll actually use. Each card shows the model's key characteristics — click "Show strengths & cost" to expand details. The badges tell you at a glance: where it runs, what type it is, and whether it handles multiple modalities.</p>
        </Prose>
        <ModelCardGrid models={[
          {
            name: 'Claude Sonnet 4.6',
            maker: 'Anthropic',
            contextWindow: '200k tokens',
            access: 'cloud',
            modelType: 'standard',
            multimodal: true,
            bestFor: 'Coding, long-document analysis, complex reasoning, instruction following',
            strengths: [
              'Best-in-class coding and reasoning balance',
              '200k context — handles entire codebases or books',
              'Accepts image inputs (screenshots, diagrams, documents)',
              'Strong instruction following and structured output',
              'Prompt caching support for cost optimization',
            ],
            costTier: '$3 input / $15 output per million tokens',
          },
          {
            name: 'GPT-4o',
            maker: 'OpenAI',
            contextWindow: '128k tokens',
            access: 'cloud',
            modelType: 'standard',
            multimodal: true,
            bestFor: 'General-purpose tasks, multimodal inputs, broad ecosystem compatibility',
            strengths: [
              'Accepts text, image, and audio inputs',
              'Massive ecosystem of tools and integrations',
              'Strong general reasoning and versatility',
              'Native function calling / tool use',
              'Well-documented, widely supported in frameworks',
            ],
            costTier: '$2.50 input / $10 output per million tokens',
          },
          {
            name: 'Gemini 2.5 Pro',
            maker: 'Google DeepMind',
            contextWindow: '1M tokens',
            access: 'cloud',
            modelType: 'standard',
            multimodal: true,
            bestFor: 'Very long documents, video understanding, massive codebases',
            strengths: [
              '1 million token context — largest available',
              'Accepts text, images, video, and audio',
              'Competitive reasoning benchmarks',
              'Native integration with Google Workspace',
              'Strong at tasks requiring entire repositories or long books',
            ],
            costTier: '$1.25 input / $10 output per million tokens',
          },
          {
            name: 'Llama 3.3 70B',
            maker: 'Meta (open-source)',
            contextWindow: '128k tokens',
            access: 'local',
            modelType: 'standard',
            multimodal: false,
            bestFor: 'Local / private use, zero cost, high-volume processing, sensitive data',
            strengths: [
              'Fully local — zero data exposure',
              'Near cloud-quality on many benchmarks',
              'No API costs (just electricity)',
              'No rate limits, fully offline capable',
              'Run via Ollama: ollama pull llama3.3:70b',
            ],
            costTier: 'Free (requires ~45GB RAM or 48GB VRAM)',
          },
          {
            name: 'DeepSeek-R1',
            maker: 'DeepSeek (open-source)',
            contextWindow: '128k tokens',
            access: 'local',
            modelType: 'reasoning',
            multimodal: false,
            bestFor: 'Math, logic puzzles, multi-step reasoning, problems that trip up standard models',
            strengths: [
              'Shows full chain-of-thought in <think> tags',
              'Competitive with o1 on math and reasoning benchmarks',
              'Open-source — run locally or via API',
              'Multiple sizes: 7B, 14B, 32B, 70B',
              'Best local option for hard reasoning tasks',
            ],
            costTier: 'Free locally (7B = ~5GB RAM, 32B = ~20GB RAM)',
          },
        ]} />
        <InfoCallout type="tip">
          <strong>Starting recommendation:</strong> Claude Sonnet 4.6 for API development (best coding + reasoning with massive context). Add Ollama + Llama 3.3 70B for local/private work. Use DeepSeek-R1 locally when you hit problems that require step-by-step reasoning. Gemini 2.5 Pro is your go-to when you need to process documents that exceed 200k tokens.
        </InfoCallout>
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Context window',
            itemB: 'Conversation history',
            explanation: 'The context window is the hard per-call token limit set by the model. Conversation history is what you pass as previous messages — you control exactly what goes in. A conversation can be indefinitely long; you manage what fits in the window by choosing what to include, summarize, or drop.',
          },
          {
            itemA: 'Temperature 0',
            itemB: 'Perfectly deterministic output',
            explanation: 'Temperature 0 is nearly deterministic, not perfectly so. Floating-point arithmetic on GPUs introduces tiny non-determinism. If you need exact reproducibility, also set a seed parameter (supported by OpenAI and Ollama). For most practical purposes, temperature 0 gives consistent enough results.',
          },
          {
            itemA: 'Hallucination',
            itemB: 'The model being broken or lying',
            explanation: 'Hallucination is a fundamental property of how LLMs work — they predict probable next tokens, not verified facts. It\'s not a bug that will get patched; it\'s an inherent characteristic. The mitigations are architectural: grounding with RAG, verification steps, structured output with citations.',
          },
          {
            itemA: 'Standard model',
            itemB: 'Reasoning model',
            explanation: 'Standard models (Claude Sonnet, GPT-4o) respond quickly with a single forward pass. Reasoning models (o1, Claude Opus with extended thinking, DeepSeek-R1) generate a long internal chain-of-thought before their final answer — taking 30–120 seconds but performing dramatically better on hard reasoning tasks. Use reasoning models only when standard models are failing.',
          },
          {
            itemA: 'Fine-tuning',
            itemB: 'RAG',
            explanation: 'Fine-tuning permanently changes model weights by training on new data — expensive ($$$) and requires ML expertise. RAG dynamically retrieves and injects documents at query time — cheap, fast, and easy to update. For most "the model needs to know my data" use cases, RAG is the right answer. Fine-tune only when you need to change the model\'s style, format, or behavior, not just its knowledge.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'You have a 5000-word document and want to pass it to Claude. Will it fit in the context window?', answer: 'Yes — 5000 words ≈ 6500 tokens. Claude\'s 200k context window easily fits documents up to ~150,000 words. You\'d need Gemini 2.5 Pro (1M context) only for truly massive inputs like entire codebases or book-length research.' },
          { question: 'You\'re building a code generation feature with the Claude API and set temperature to 2. What happens?', answer: 'You\'ll get a validation error. Anthropic\'s API caps temperature at 1.0. OpenAI allows 0–2, but Anthropic does not. For code generation, use temperature 0 or close to it for deterministic, consistent output.' },
          { question: 'What\'s the difference between fine-tuning and RAG, and when should you use each?', answer: 'Fine-tuning changes the model\'s weights permanently via additional training — expensive and inflexible. RAG retrieves relevant documents at query time and includes them in the prompt — cheap, dynamic, and easy to update. Use RAG for "the model needs to know my data." Use fine-tuning only to change the model\'s output style, format, or specialized behavior.' },
          { question: 'When should you use a reasoning model vs. a standard model?', answer: 'Start with a standard model. Upgrade to a reasoning model (o1, DeepSeek-R1, Claude Opus with extended thinking) only when the standard model is consistently failing on genuinely hard multi-step reasoning tasks — complex math, intricate logic, or deep architecture planning. Reasoning models are 5–10x slower and significantly more expensive per task.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 2 Summary" items={[
        { label: 'Token', value: '~0.75 words / ~4 chars. Unit for pricing, context limits, and speed.' },
        { label: 'Context window', value: 'Per-call token cap. Claude: 200k. GPT-4o: 128k. Gemini 2.5: 1M.' },
        { label: 'Temperature', value: 'Anthropic: 0–1. OpenAI: 0–2. Lower = deterministic. Higher = varied.' },
        { label: 'Standard model', value: 'Fast, efficient, handles 90% of tasks. (Sonnet, GPT-4o)' },
        { label: 'Reasoning model', value: 'Slow, expensive, dramatically better on hard problems. (o1, DeepSeek-R1)' },
        { label: 'Multimodal', value: 'Accepts text + images (+ audio/video). Claude 3.5+, GPT-4o, Gemini 2.5.' },
        { label: 'Hallucination', value: 'Inherent property, not a bug. Mitigate with RAG + verification.' },
        { label: 'RAG', value: 'Retrieve docs → embed → inject into prompt → model answers from YOUR data.' },
        { label: 'Prompt caching', value: '~90% cost reduction on repeated prefixes. Supported by Anthropic, OpenAI, Google.' },
        { label: 'Starter stack', value: 'Claude Sonnet 4.6 (API) + Ollama Llama 3.3 70B (local).' },
      ]} />
    </SectionShell>
  )
}
