import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, TermsMemoryBlock, CompareTable,
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
          <p>Before you can use AI tools well, you need to understand how they actually see your text. It's not words — it's tokens. And there's a hard limit on how much it can hold in memory at once.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Token',
            subtitle: 'The atomic unit of AI text',
            content: 'A chunk of text roughly 0.75 words long. "Hello world" is 2 tokens. A 1000-word essay is ~1300 tokens.',
            details: 'Models don\'t process words — they process tokens. A token might be a word ("cat"), a word fragment ("un-", "-ing"), punctuation, or whitespace. Tokenization is language-specific: Chinese or Arabic might use more tokens per word than English. Tokens matter because: (1) API pricing is per-token, (2) speed is per-token, (3) context limits are in tokens. Rule of thumb: 1 token ≈ 4 characters ≈ 0.75 English words.',
            tags: ['~0.75 words', 'Basis for pricing'],
            color: 'blue',
          },
          {
            title: 'Context Window',
            subtitle: 'The model\'s working memory',
            content: 'The maximum amount of text (in tokens) a model can "see" at once — both your input and its output.',
            details: 'Think of it as RAM. The model can only reason about what\'s in the context window right now. Earlier conversation that fell out of the window is simply gone. Claude has a 200k token context (~150k words — an entire novel). GPT-4o has 128k. Older models had 4k or 8k. This is why long documents sometimes need chunking strategies.',
            tags: ['Claude: 200k tokens', 'GPT-4o: 128k tokens'],
            color: 'purple',
          },
          {
            title: 'Temperature',
            subtitle: 'Controls randomness / creativity',
            content: 'A number from 0 to 2 that controls how "creative" or "random" the model\'s outputs are.',
            details: 'Temperature 0: always picks the most likely next token — deterministic, consistent, good for code/data. Temperature 1 (default): balanced, natural responses. Temperature 2: very random, creative, sometimes incoherent. For factual tasks (data extraction, coding), use low temperature. For creative tasks (brainstorming, writing), use higher temperature. Most APIs default to 1.',
            tags: ['0 = deterministic', '1 = balanced', '2 = chaotic'],
            color: 'orange',
          },
          {
            title: 'Max Tokens',
            subtitle: 'Output length limit',
            content: 'Caps how many tokens the model generates in a single response.',
            details: 'Set too low and the model will cut off mid-sentence. Set too high and you\'ll pay for tokens you don\'t need. For most chat responses, 1024-2048 tokens is plenty (~750-1500 words). For generating full code files, you might need 4096-8192. The model can also stop early on its own if it finishes naturally.',
            tags: ['Affects cost', 'Affects cutoff'],
            color: 'teal',
          },
          {
            title: 'Streaming',
            subtitle: 'Tokens as they arrive',
            content: 'Receiving model output word-by-word as it generates, rather than waiting for the full response.',
            details: 'When you see Claude or ChatGPT typing character by character — that\'s streaming. Without streaming, you\'d wait 10-30 seconds for a long response. With streaming, text appears immediately. Most APIs support streaming via server-sent events (SSE). For real-time UIs, always use streaming.',
            tags: ['Better UX', 'Server-sent events'],
            color: 'green',
          },
          {
            title: 'Top-p / Top-k',
            subtitle: 'Advanced sampling controls',
            content: 'Parameters that limit which tokens the model can choose from at each step.',
            details: 'Top-p (nucleus sampling): only consider tokens whose probabilities sum to p. Top-p=0.9 means only sample from the top 90% probability mass. Top-k: only consider the top k most likely tokens. These are rarely tuned by application developers — temperature is usually enough. Leave them at defaults unless you have a specific reason to change them.',
            tags: ['Advanced', 'Usually leave as default'],
            color: 'slate',
          },
        ]} />
      </Subsection>

      <Subsection title="The Intelligence Terms">
        <Prose>
          <p>These terms describe what the model can do and how it behaves. Understanding them prevents common mistakes when building with AI.</p>
        </Prose>
        <div className="mt-4" />
        <TermsMemoryBlock terms={[
          { term: 'Hallucination', definition: 'When a model confidently states something false. It\'s not "lying" — it\'s predicting plausible-sounding text that happens to be wrong. Always verify factual claims from AI.' },
          { term: 'Grounding', definition: 'Anchoring the model\'s outputs to real, verifiable information — usually by including actual documents in the prompt (RAG). Grounding reduces hallucination.' },
          { term: 'Reasoning', definition: 'The model\'s ability to work through multi-step problems. Models like Claude Opus, o1, and DeepSeek-R1 are specifically optimized for extended reasoning chains.' },
          { term: 'Fine-tuning', definition: 'Continuing to train a pre-trained model on a specific dataset to specialize it. Fine-tuned models are better at niche tasks but expensive to create. Most developers use base models via prompting instead.' },
          { term: 'Embedding', definition: 'Converting text to a vector of numbers that represents its meaning. Similar texts have similar vectors. Used in search, recommendations, and RAG (finding relevant documents).' },
          { term: 'RAG', definition: 'Retrieval Augmented Generation — finding relevant documents (via embeddings/search) and including them in the prompt so the model can answer questions grounded in real data.' },
          { term: 'System prompt', definition: 'Instructions given to the model at the start of a conversation that define its behavior, persona, constraints, and format. The model treats these as its operating rules.' },
          { term: 'Completion', definition: 'The model\'s response to a prompt. Also used as a verb: "completing" a prompt. Older APIs used "completion" endpoints; newer ones use "messages" but the concept is the same.' },
          { term: 'Parameters', definition: 'The numerical weights inside a model that encode learned knowledge. A "70B model" has 70 billion parameters. More parameters generally means more capable but slower and more expensive.' },
          { term: 'Quantization', definition: 'Compressing model weights to use fewer bits (e.g., 4-bit instead of 16-bit floats). Q4 models are ~4x smaller and run on laptops but lose some quality. Essential for running models locally.' },
        ]} />
      </Subsection>

      <Subsection title="Model Comparison — The Major Players">
        <Prose>
          <p>These are the models you'll actually use. Understanding their strengths helps you pick the right one for the right task.</p>
        </Prose>
        <CompareTable
          headers={['Claude Sonnet 4.6', 'GPT-4o', 'Gemini 1.5 Pro', 'Llama 3.3 70B']}
          rows={[
            { attribute: 'Made by', values: ['Anthropic', 'OpenAI', 'Google', 'Meta (open-source)'] },
            { attribute: 'Context window', values: ['200k tokens', '128k tokens', '1M tokens', '128k tokens'] },
            { attribute: 'Strengths', values: ['Coding, reasoning, long docs', 'General, vision, tools', 'Very long docs, multimodal', 'Free, local, good quality'] },
            { attribute: 'Speed', values: ['Fast', 'Fast', 'Medium', 'Depends on hardware'] },
            { attribute: 'Cost tier', values: ['Mid', 'Mid-high', 'Mid', 'Free (self-hosted)'] },
            { attribute: 'Best for', values: ['Development, complex tasks', 'Versatile everyday use', 'Massive document analysis', 'Local / private use'] },
            { attribute: 'Access', values: ['API (claude.ai)', 'API (openai.com)', 'API (ai.google.dev)', 'Download / Ollama'] },
          ]}
        />
        <InfoCallout type="tip">
          <strong>For most developers starting out:</strong> Use Claude Sonnet 4.6 as your primary model — it has the best coding + reasoning balance with a massive context window. Use Llama via Ollama for local experimentation where privacy matters or you want zero cost.
        </InfoCallout>
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Model size (parameter count)',
            itemB: 'Model quality',
            explanation: 'More parameters doesn\'t always mean better for your use case. A well-tuned 8B model can outperform a poorly tuned 70B model. Parameter count is a proxy for capability, not a guarantee.',
          },
          {
            itemA: 'Hallucination',
            itemB: 'The model being broken',
            explanation: 'Hallucination is an inherent property of how LLMs work — they predict probable text, not verified facts. It\'s not a bug, it\'s a characteristic. Mitigate it with grounding (RAG) and verification, not by assuming the model is correct.',
          },
          {
            itemA: 'Temperature 0',
            itemB: 'Deterministic output',
            explanation: 'Temperature 0 is close to deterministic but not perfectly so. Modern LLMs use floating point arithmetic with tiny variations. If you need exact reproducibility, seed the random number generator AND use temperature 0.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'You have a 5000-word document and want to pass it to Claude. Will it fit in the context window?', answer: 'Yes — 5000 words is roughly 6500 tokens. Claude\'s 200k context window can handle documents up to ~150,000 words easily.' },
          { question: 'You\'re building a code generation feature. Should you use temperature 0 or 1?', answer: 'Temperature 0 (or close to it). Code generation benefits from deterministic, consistent outputs rather than creative variation.' },
          { question: 'What\'s the difference between fine-tuning and RAG?', answer: 'Fine-tuning permanently changes the model\'s weights by training on new data. RAG temporarily feeds relevant documents into the prompt at query time. RAG is much cheaper and easier to update — prefer it unless you have a specific reason to fine-tune.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 2 Summary" items={[
        { label: 'Token', value: '~0.75 words. Basis for pricing and context limits.' },
        { label: 'Context window', value: 'Model\'s working memory. Claude: 200k, GPT-4o: 128k tokens.' },
        { label: 'Temperature', value: '0 = precise/deterministic. 1 = balanced. 2 = creative/random.' },
        { label: 'Hallucination', value: 'AI confidently stating false info. Mitigate with RAG + verification.' },
        { label: 'RAG', value: 'Find relevant docs → add to prompt → model answers from real data.' },
        { label: 'Embedding', value: 'Text → vector numbers. Used for semantic search and RAG.' },
        { label: 'Quantization', value: 'Compress model to run on consumer hardware (Q4 ≈ 4x smaller).' },
        { label: 'Best starter model', value: 'Claude Sonnet 4.6 for API work, Llama 3.3 70B for local.' },
      ]} />
    </SectionShell>
  )
}
