import {
  SectionShell, SectionHeader, Subsection, Prose,
  InteractiveFlowMap, TaxonomyTree, TermsMemoryBlock,
  CommonConfusionBlock, MiniRecallBlock, CheatSheetPanel, InfoCallout
} from '../components/ui'

export default function Section01() {
  return (
    <SectionShell id="section-1">
      <SectionHeader
        number={1}
        title="The Big Picture"
        subtitle="AI is a stack. Most developers only need to master one layer. Here's where you fit."
      />

      <Subsection title="The AI Stack — Click Each Layer">
        <Prose>
          <p>When people say "AI," they usually mean very different things depending on context. A researcher means neural networks. A product manager means ChatGPT. A developer might mean an API call. They're all talking about different layers of the same stack.</p>
          <p>Click each node below to understand what it is and — critically — whether you actually need to think about it as a developer.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            {
              id: 'data',
              label: 'Data',
              description: 'The raw training material — billions of web pages, books, code, and conversations scraped and cleaned. This is what a model "read" before you ever talk to it. Creating training data is a multi-million dollar infrastructure problem. You don\'t do this.',
              color: 'slate',
            },
            {
              id: 'training',
              label: 'Training',
              description: 'The process of feeding data through a neural network and adjusting billions of mathematical weights until the model can predict output well. Training GPT-4 reportedly cost over $100M in compute. You definitely don\'t do this.',
              color: 'slate',
            },
            {
              id: 'model',
              label: 'Model',
              description: 'The resulting artifact — a file of billions of floating-point numbers (weights) encoding learned patterns. Claude Sonnet 4.6, GPT-4o, Llama 3.3 are all models. You either download them for local use or access them via API. This is where open-source models like Llama live.',
              color: 'blue',
            },
            {
              id: 'api',
              label: 'API',
              description: 'A web service that wraps the model. You send a prompt via HTTP, the model processes it, you get a response back. Anthropic\'s API, OpenAI\'s API, and Ollama\'s local API all work this way. This is the boundary between AI infrastructure and AI application — where you start.',
              color: 'indigo',
            },
            {
              id: 'agent-app',
              label: 'Agent / App',
              description: 'Your code. A prompt template, a control loop, a set of tools, a UI — anything that orchestrates calls to an AI API to accomplish something useful. This is where you live. Building here is high-leverage and doesn\'t require deep ML knowledge. Note: "Agent" here means the application layer — Section 4 defines what specifically makes something an agent vs. a simple app.',
              color: 'purple',
            },
            {
              id: 'user',
              label: 'User',
              description: 'The person benefiting from the application. They might be chatting with a bot you built, using a trading tool, or getting smarter responses from a well-crafted system prompt. They never see the layers below.',
              color: 'green',
            },
          ]}
        />
        <InfoCallout type="tip">
          <strong>You live at the Agent/App layer.</strong> Everything below the API is someone else's infrastructure. You call the API, you build the logic, you control the user experience. That's where most of the real-world value gets created.
        </InfoCallout>
      </Subsection>

      <Subsection title="The Taxonomy — AI, ML, LLM, Foundation Model... What's What?">
        <Prose>
          <p>These terms aren't interchangeable — they describe a strict containment hierarchy. Each one is a subset of the level above it. Understanding the nesting prevents a huge amount of confusion.</p>
          <p>Click any node to see its precise definition. Use the arrows to collapse branches you already understand.</p>
        </Prose>
        <div className="mt-4" />
        <TaxonomyTree nodes={[
          {
            id: 'ai',
            label: 'AI',
            subtitle: 'Artificial Intelligence',
            description: 'The broadest umbrella: any computer system designed to perform tasks that typically require human intelligence — reasoning, perception, language, decision-making. This includes everything from simple rule-based expert systems ("if temperature > 30, turn on AC") to modern neural networks. When the news says "AI," they almost always mean a narrow slice of this: large language models. Don\'t let the breadth of the term blur the precision of the technology.',
            color: 'slate',
            children: [
              {
                id: 'ml',
                label: 'ML',
                subtitle: 'Machine Learning',
                description: 'A subset of AI where systems learn patterns from data rather than following hand-coded rules. Instead of a programmer writing explicit "if X then Y" logic, ML algorithms infer those rules automatically from examples. Linear regression, decision trees, random forests, recommendation systems — all ML. Deep Learning is a subset of ML that uses layered neural networks.',
                color: 'blue',
                examples: ['Recommendation systems', 'Spam filters', 'Fraud detection'],
                children: [
                  {
                    id: 'deep-learning',
                    label: 'Deep Learning',
                    subtitle: 'Neural Networks with many layers',
                    description: '"Deep" refers to the many layers (depth) of a neural network. These stacked layers can learn increasingly abstract representations of data — raw pixels → edges → shapes → objects. Computer vision, speech recognition, and all modern language models are deep learning. The "Transformer" architecture (2017, "Attention Is All You Need") is the specific deep learning breakthrough that makes modern LLMs possible.',
                    color: 'indigo',
                    examples: ['Image recognition', 'Speech-to-text', 'Neural machine translation'],
                    children: [
                      {
                        id: 'foundation-models',
                        label: 'Foundation Models',
                        subtitle: 'Large pre-trained, general-purpose',
                        description: 'Large deep learning models trained on vast amounts of diverse data, capable of handling many different tasks without task-specific training. The "foundation" metaphor is intentional: one model serves as the base for many downstream applications. You can use them as-is via API or fine-tune on your specific data. Key property: they generalize — a foundation model trained on text can write code, reason about math, and follow instructions without being explicitly trained for each task.',
                        color: 'violet',
                        children: [
                          {
                            id: 'llms',
                            label: 'LLMs',
                            subtitle: 'Large Language Models — text in, text out',
                            description: 'Foundation models trained primarily on text data (web pages, books, code, conversations). Input and output are text tokens. "Large" means billions of parameters. The defining architecture is the Transformer with attention mechanisms. LLMs are what people most commonly mean when they say "AI" today — but technically they\'re the text-specific branch of a larger family. Code, JSON, and math are all expressed as text, so LLMs handle those too.',
                            color: 'purple',
                            examples: ['Claude Sonnet 4.6', 'GPT-4o', 'Llama 3.3 70B', 'Mistral', 'Gemma 2'],
                          },
                          {
                            id: 'vision-models',
                            label: 'Vision Models',
                            subtitle: 'Image generation & understanding',
                            description: 'Foundation models trained on image data. Generative vision models produce images from text prompts (DALL-E, Stable Diffusion). Vision understanding models classify, detect, or segment images. These are NOT LLMs — they operate on image patches or pixel representations, not text tokens. Sora and similar models extend this to video.',
                            color: 'pink',
                            examples: ['DALL-E 3', 'Stable Diffusion', 'Midjourney', 'Sora (video)'],
                          },
                          {
                            id: 'audio-models',
                            label: 'Audio Models',
                            subtitle: 'Speech, voice, music',
                            description: 'Foundation models for audio processing and generation. Categories: speech-to-text (ASR) like Whisper, text-to-speech (TTS) like ElevenLabs, and music generation like Suno. These process audio waveforms or spectrograms — not text tokens. Not LLMs, though they may use similar Transformer architecture applied to different data modalities.',
                            color: 'orange',
                            examples: ['Whisper (speech→text)', 'ElevenLabs (voice)', 'Suno (music)', 'Bark'],
                          },
                          {
                            id: 'multimodal',
                            label: 'Multimodal Models',
                            subtitle: 'Text + image + audio in one model',
                            description: 'Foundation models that natively process multiple input modalities within a single architecture. You can send an image AND text, and receive a text response. The frontier models — Claude 3.5+, GPT-4o, Gemini 2.5 — are all multimodal. Technically precise terminology: when a model processes both text and images, it\'s a Vision-Language Model (VLM), not strictly an "LLM." Using "LLM" as a catch-all for modern frontier models is common but imprecise.',
                            color: 'teal',
                            examples: ['Claude 3.5+ (text+image)', 'GPT-4o (text+image+audio)', 'Gemini 2.5 Pro (text+image+video)'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]} />

        <InfoCallout type="warning">
          <strong>Where is "Agent" in this taxonomy?</strong> It isn't here — and that's intentional. An Agent is a <em>system design pattern</em>, not a model class. You don't build agents instead of LLMs; you build agents <em>using</em> LLMs. Putting "Agent" next to "LLM" in a taxonomy would be like listing "REST API" next to "Python" — different categories entirely. Section 4 covers the Agent pattern in full.
        </InfoCallout>

        <InfoCallout type="info">
          <strong>What about "Generative AI"?</strong> It's a characteristic, not a position in the hierarchy. LLMs, Vision Models, and Audio Models are all Generative AI when they produce new content (text, images, audio) rather than just classifying existing content. The term is useful marketing shorthand but doesn't map cleanly onto the technical taxonomy above.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Terms">
        <TermsMemoryBlock terms={[
          { term: 'LLM', definition: 'Large Language Model — a Transformer-based neural network trained on massive text data that can understand and generate text, code, and structured data. Technically text-only; modern frontier models that also process images are more accurately called VLMs or multimodal models.' },
          { term: 'Model weights', definition: 'The billions of numerical parameters inside a trained model that encode learned patterns. Downloading Llama means downloading these weights. The weights are the model — without them, the architecture is just an empty shell.' },
          { term: 'Token', definition: 'The unit AI processes — roughly 0.75 words or 4 characters. "Hello world" is 2 tokens. Pricing, context limits, and speed are all measured in tokens, not words or characters.' },
          { term: 'Inference', definition: 'Running a trained model to produce output — as opposed to training, which creates the model. When you send a message to Claude, that\'s inference. Inference is what you pay for in cloud APIs.' },
          { term: 'API', definition: 'Application Programming Interface — the HTTP endpoint you call to use a model. You send a prompt, it returns a completion. The API is what converts "AI research project" into "software component you can call."' },
          { term: 'Open-source model', definition: 'A model whose weights are publicly released for download and self-hosting (Llama, Mistral, Gemma, DeepSeek). Closed-source models (Claude, GPT-4) are accessible only via the provider\'s API — you never get the weights.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: '"AI" (the buzzword)',
            itemB: 'What AI actually is technically',
            explanation: 'When someone says "just use AI for that," they almost always mean "call an LLM API." When an ML researcher says it, they might mean something entirely different. The taxonomy above gives you the vocabulary to always clarify which layer is being discussed.',
          },
          {
            itemA: 'LLM',
            itemB: 'AI in general',
            explanation: 'LLMs are one specific type of AI: large Transformer models trained on text. Image generators, voice recognition, recommendation engines, and self-driving cars are all AI but are NOT LLMs. Conversely, modern frontier models (Claude, GPT-4o) process images too, making "LLM" technically imprecise for them — they\'re multimodal models.',
          },
          {
            itemA: '"LLM" for modern frontier models',
            itemB: 'Multimodal Model / VLM',
            explanation: 'Technically, "LLM" means text-only. Claude 3.5+, GPT-4o, and Gemini 2.5 all accept image inputs — they\'re Vision-Language Models (VLMs) or multimodal models. In practice, the industry still uses "LLM" loosely for any large language/reasoning model. Be aware of this imprecision when reading documentation or papers.',
          },
          {
            itemA: 'Foundation Model',
            itemB: 'LLM',
            explanation: 'All LLMs are foundation models, but not all foundation models are LLMs. DALL-E is a foundation model but not an LLM (it generates images, not text). Whisper is a foundation model but not an LLM (it processes audio). LLM is a text-specific subset of the foundation model category.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What are the layers of the AI stack from bottom to top?', answer: 'Data → Training → Model → API → Agent/App → User. As a developer, you primarily work at the API and Agent/App layers. Everything below the API is infrastructure someone else built.' },
          { question: 'What is the difference between an LLM and a Foundation Model?', answer: 'All LLMs are foundation models, but not all foundation models are LLMs. Foundation model = large pre-trained general-purpose model. LLM = specifically the text-in, text-out subset. Vision models (DALL-E) and audio models (Whisper) are also foundation models but not LLMs.' },
          { question: 'Where does "Agent" fit in the AI taxonomy?', answer: 'It doesn\'t — Agent is a system design pattern, not a model class. You build agents using LLMs (or other models). The taxonomy describes types of models; "Agent" describes how you deploy and orchestrate a model. See Section 4 for the full Agent definition.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 1 Summary" items={[
        { label: 'Hierarchy', value: 'AI ⊃ ML ⊃ Deep Learning ⊃ Foundation Models ⊃ LLMs' },
        { label: 'LLM', value: 'Transformer model trained on text. Text in → text out. The core of modern AI.' },
        { label: 'Foundation Model', value: 'Large pre-trained general model. LLMs, vision models, audio models are all subtypes.' },
        { label: 'Multimodal', value: 'Processes text + images (+ audio/video). GPT-4o, Claude 3.5+, Gemini 2.5 are multimodal.' },
        { label: 'Agent', value: 'System pattern using a model + tools + loop. NOT a model class. See Section 4.' },
        { label: 'Generative AI', value: 'A property (produces new content), not a taxonomy node. Applies to LLMs, vision models, audio models.' },
        { label: 'Your layer', value: 'API + App/Agent. No need to go deeper.' },
        { label: 'Key insight', value: 'You don\'t build models. You build on top of them.' },
      ]} />
    </SectionShell>
  )
}
