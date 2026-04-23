import {
  SectionShell, SectionHeader, Subsection, Prose,
  InteractiveFlowMap, ExpandableCardGrid, TermsMemoryBlock,
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
              description: 'The raw training material — billions of web pages, books, code, and conversations scraped and cleaned. This is what an LLM "read" before you ever talk to it. Creating training data is a multi-million dollar infrastructure problem. You don\'t do this.',
              color: 'slate',
            },
            {
              id: 'training',
              label: 'Training',
              description: 'The process of feeding all that data through a neural network and adjusting billions of mathematical weights until the model can predict text well. Training GPT-4 reportedly cost over $100M in compute. You definitely don\'t do this.',
              color: 'slate',
            },
            {
              id: 'model',
              label: 'Model',
              description: 'The resulting artifact — a file of billions of floating point numbers (weights) that encode learned patterns. Claude Sonnet 4.6, GPT-4o, Llama 3.3 are all models. You either download them (for local use) or access them via API. This is where open-source models like Llama live.',
              color: 'blue',
            },
            {
              id: 'api',
              label: 'API',
              description: 'A web service that wraps the model. You send text (a prompt) via HTTP, the model processes it, you get text back. Anthropic\'s API, OpenAI\'s API, and Ollama\'s local API all work this way. This is the boundary between "AI infrastructure" and "AI application."',
              color: 'indigo',
            },
            {
              id: 'agent',
              label: 'Agent / App',
              description: 'Your code. A prompt template, a loop, a set of tools, a UI — anything that orchestrates calls to an AI API to accomplish something useful. This is where you live. Building here is high-leverage and doesn\'t require deep ML knowledge.',
              color: 'purple',
            },
            {
              id: 'user',
              label: 'User',
              description: 'The person benefiting from the application. They might be chatting with a WhatsApp bot you built, using a trading tool, or just getting smarter responses from a well-crafted system prompt. They don\'t see the layers below.',
              color: 'green',
            },
          ]}
        />
        <InfoCallout type="tip">
          <strong>You live at the Agent/App layer.</strong> Everything below the API is someone else's infrastructure. You call the API, you build the logic, you control the user experience. That's where most of the real-world value gets created.
        </InfoCallout>
      </Subsection>

      <Subsection title="The Landscape — AI, ML, LLM, Agent... What's What?">
        <Prose>
          <p>These terms get used interchangeably but they're not the same thing. Each one is more specific than the last. Expand each card to see what it actually means and how it relates to the others.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'AI',
            subtitle: 'Artificial Intelligence',
            content: 'The broadest category. Any computer system that performs tasks typically requiring human intelligence.',
            details: 'Includes everything from simple rule-based systems ("if temperature > 30, turn on AC") to complex neural networks. When the news says "AI," they usually mean modern LLM-based systems. Don\'t let the broad term confuse you.',
            tags: ['Umbrella term'],
            color: 'slate',
          },
          {
            title: 'ML',
            subtitle: 'Machine Learning',
            content: 'AI that learns patterns from data rather than following hand-coded rules.',
            details: 'Instead of a programmer writing "if X then Y", ML finds patterns automatically. Linear regression, random forests, recommendation systems — all ML. Deep Learning (neural networks with many layers) is a subset of ML. LLMs are a subset of Deep Learning.',
            tags: ['Learns from data', 'No explicit rules'],
            color: 'blue',
          },
          {
            title: 'LLM',
            subtitle: 'Large Language Model',
            content: 'A deep learning model trained on massive text data to understand and generate language.',
            details: 'Specifically a neural network (usually Transformer architecture) trained to predict the next token in a sequence. "Large" means billions of parameters. Examples: GPT-4, Claude, Gemini, Llama, Mistral. The "language" part is broader than it sounds — code, JSON, math, reasoning are all expressed as language.',
            tags: ['Text in → text out', 'Billions of parameters'],
            color: 'purple',
          },
          {
            title: 'Generative AI',
            subtitle: 'Gen AI',
            content: 'AI that generates new content — text, images, audio, video, code.',
            details: 'LLMs are generative AI for text. DALL-E and Midjourney are generative AI for images. Suno is for music. The "generative" part means it creates new outputs rather than just classifying existing ones. Most of what we call "AI" today is generative AI.',
            tags: ['Creates new content', 'Multi-modal'],
            color: 'pink',
          },
          {
            title: 'Agent',
            subtitle: 'AI Agent',
            content: 'An LLM that can take actions in the world via tools, not just respond to a single message.',
            details: 'A regular chatbot replies to messages. An agent can also: search the web, read/write files, call APIs, run code, send emails, click buttons in a browser. The agent loops: observe → think → act → observe result → think again. Claude Code is an agent. Auto-GPT was an early agent.',
            tags: ['Uses tools', 'Can loop autonomously'],
            color: 'orange',
          },
          {
            title: 'Foundation Model',
            subtitle: 'Base Model',
            content: 'A large pre-trained model that serves as a base for many applications.',
            details: 'Claude, GPT-4, Llama are foundation models — trained on massive general data, capable across many tasks. You can use them as-is via API, or fine-tune them on specific data (e.g., medical records, legal documents). Foundation models make it economical to build AI products without training from scratch.',
            tags: ['Pre-trained', 'General purpose'],
            color: 'teal',
          },
        ]} />
      </Subsection>

      <Subsection title="Key Terms">
        <TermsMemoryBlock terms={[
          { term: 'LLM', definition: 'Large Language Model — a neural network trained on massive text data that can understand and generate text, code, and reasoning.' },
          { term: 'Model weights', definition: 'The billions of numerical parameters inside a trained model that encode learned patterns. Downloading Llama means downloading these weights.' },
          { term: 'Token', definition: 'The unit AI processes — roughly 0.75 words. "Hello world" is 2 tokens. Pricing, context limits, and speed are all measured in tokens.' },
          { term: 'Inference', definition: 'Running a model to get output (as opposed to training, which creates the model). When you send a message to Claude, that\'s inference.' },
          { term: 'API', definition: 'Application Programming Interface — the HTTP endpoint you call to use a model. You send text, it sends text back.' },
          { term: 'Open-source model', definition: 'A model whose weights are publicly available for download and self-hosting (e.g., Llama, Mistral, Gemma). Closed-source models (Claude, GPT-4) are only accessible via API.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: '"AI" (buzzword)',
            itemB: 'What AI actually is technically',
            explanation: 'When someone says "just use AI for that," they usually mean LLM APIs. When a researcher says it, they might mean something completely different. Always clarify which layer of the stack is being discussed.',
          },
          {
            itemA: 'LLM',
            itemB: 'AI in general',
            explanation: 'LLMs are one type of AI (specifically: large transformer models trained on text). Image generators, voice recognition, recommendation systems, and self-driving cars are all AI but are not LLMs. When this guide says "AI," it means LLM-based systems.',
          },
          {
            itemA: 'Agent',
            itemB: 'Chatbot',
            explanation: 'A chatbot responds to messages. An agent can also take actions in the world via tools — search, file access, code execution. The key difference is the feedback loop: agents observe the results of their actions and adjust.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What are the layers of the AI stack from bottom to top?', answer: 'Data → Training → Model → API → Agent/App → User. As a developer, you primarily work at the API and Agent/App layers.' },
          { question: 'What is the difference between an LLM and an AI agent?', answer: 'An LLM is a model that processes text. An agent is an application built on an LLM that can also use tools, take actions, and loop — observe → think → act → observe.' },
          { question: 'Why don\'t most developers need to understand training?', answer: 'Training is a multi-million dollar infrastructure problem solved by Anthropic, OpenAI, Meta, and Google. As a developer you access trained models via API and focus on building applications on top.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 1 Summary" items={[
        { label: 'AI Stack', value: 'Data → Training → Model → API → App → User' },
        { label: 'Your layer', value: 'API + Agent/App (no need to go deeper)' },
        { label: 'LLM', value: 'Language model trained on text — the core of modern AI' },
        { label: 'Agent', value: 'LLM + tools + loops = can take actions, not just respond' },
        { label: 'Open source', value: 'Free models you can download (Llama, Mistral, Gemma)' },
        { label: 'Closed source', value: 'API-only models (Claude, GPT-4, Gemini)' },
        { label: 'Key insight', value: 'You don\'t build models. You build on top of them.' },
      ]} />
    </SectionShell>
  )
}
