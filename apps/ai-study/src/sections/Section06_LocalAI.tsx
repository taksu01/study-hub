import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, CompareTable, TermsMemoryBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout, NumberedSteps
} from '../components/ui'

export default function Section06() {
  return (
    <SectionShell id="section-6">
      <SectionHeader
        number={6}
        title="Local AI Setup"
        subtitle="Run powerful AI models on your own machine — free, private, and fully offline with Ollama."
      />

      <Subsection title="Why Run AI Locally?">
        <Prose>
          <p>Cloud AI APIs (Claude, GPT-4) are convenient but they have real limitations: every message you send is processed on someone else's server, there's a cost per token, and you need an internet connection. Local AI solves all three problems at once.</p>
          <p>With local AI you get: complete privacy (nothing leaves your machine), zero per-token cost, offline capability, no rate limits, and the ability to modify and customize models. The tradeoff: you need decent hardware, and most local models aren't quite as capable as the top cloud models — though the gap is closing fast.</p>
        </Prose>
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Complete Privacy',
            subtitle: 'Data never leaves your machine',
            content: 'Sensitive business data, personal notes, proprietary code — all processed locally.',
            details: 'Medical records, legal documents, unreleased product specs, personal journals, trading strategies. None of this should go through a third-party API. Local AI is the right choice when data sensitivity is high.',
            tags: ['Zero data exposure', 'GDPR-friendly'],
            color: 'green',
          },
          {
            title: 'Zero Cost',
            subtitle: 'No API fees, ever',
            content: 'Run unlimited queries for the price of electricity. Great for high-volume use cases.',
            details: 'Running Llama 3.3 70B on a local machine costs ~$0 per query (just electricity). At $0.003/1k tokens for cloud APIs, 10 million tokens = $30. For a personal assistant processing hundreds of messages daily, local AI saves real money.',
            tags: ['Free after hardware', 'High volume'],
            color: 'blue',
          },
          {
            title: 'Works Offline',
            subtitle: 'No internet dependency',
            content: 'Fully functional in planes, remote areas, or secure environments that block cloud access.',
            details: 'Travel, network outages, or corporate firewalls that block external AI services. A local model is always available. Also useful for development — you can test your AI app without internet or API credits.',
            tags: ['Offline', 'No rate limits'],
            color: 'orange',
          },
        ]} />
      </Subsection>

      <Subsection title="Ollama — Get Started in 5 Minutes">
        <Prose>
          <p>Ollama is the easiest way to run AI models locally. It handles model downloading, loading, and serving — you get an OpenAI-compatible API on <code>localhost:11434</code> that you can use in any application.</p>
        </Prose>
        <NumberedSteps steps={[
          {
            title: 'Download and install Ollama',
            description: 'Go to ollama.com and download the installer for your OS (Windows, Mac, Linux). It\'s a simple one-click install.',
            code: '# After install, verify it works:\nollama --version',
          },
          {
            title: 'Pull and run your first model',
            description: 'This downloads Llama 3.2 (2GB) and starts a chat session. Your first run downloads the model; subsequent runs are instant.',
            code: 'ollama run llama3.2',
          },
          {
            title: 'Try a larger model (if you have 16GB+ RAM)',
            description: 'Llama 3.2 is fast but small. For serious use, pull a larger model. This downloads ~5GB.',
            code: 'ollama pull llama3.2:latest   # 8B, ~5GB, balanced\nollama pull mistral           # 7B, good for coding',
          },
          {
            title: 'Use the REST API (same as OpenAI format)',
            description: 'Ollama runs an OpenAI-compatible API. Any app that uses the OpenAI SDK works with Ollama by just changing the base URL.',
            code: 'curl http://localhost:11434/api/chat -d \'{\n  "model": "llama3.2",\n  "messages": [{"role": "user", "content": "Hello!"}]\n}\'',
          },
          {
            title: 'Install Open WebUI (optional but recommended)',
            description: 'A beautiful ChatGPT-like web interface for your local models. Run it with Docker.',
            code: 'docker run -d -p 3000:8080 \\\n  --add-host=host.docker.internal:host-gateway \\\n  -v open-webui:/app/backend/data \\\n  --name open-webui \\\n  ghcr.io/open-webui/open-webui:main\n\n# Then visit: http://localhost:3000',
          },
        ]} />
        <TryThisCallout
          title="First Ollama Commands to Try"
          prompt={`# List available models on your machine
ollama list

# Pull a model (downloads it)
ollama pull llama3.2

# Run interactively (type messages, Ctrl+D to exit)
ollama run llama3.2

# Run with a one-shot prompt
ollama run llama3.2 "Explain what a token is in AI"

# See model info and specs
ollama show llama3.2

# Remove a model to free space
ollama rm llama3.2

# Ollama API (OpenAI-compatible)
# Base URL: http://localhost:11434/v1
# Works with openai Python SDK: set base_url and api_key="ollama"`}
        />
      </Subsection>

      <Subsection title="Which Model to Run — Hardware Guide">
        <Prose>
          <p>The most important constraint is RAM. Models need to fit in RAM (or VRAM if using a GPU) to run. A general rule: a model's size in GB is roughly its parameter count × quantization bits ÷ 8. A 7B Q4 model ≈ 4GB.</p>
        </Prose>
        <CompareTable
          headers={['Recommended Models', 'RAM Required', 'Quality', 'Speed']}
          rows={[
            { attribute: '8GB RAM', values: ['llama3.2:3b, phi3:mini, gemma2:2b', '4-6GB free', 'Good for simple tasks', 'Very fast'] },
            { attribute: '16GB RAM', values: ['llama3.2, mistral:7b, gemma2:9b', '8-10GB free', 'Solid general purpose', 'Fast'] },
            { attribute: '32GB RAM', values: ['llama3.1:13b, qwen2.5:14b, codellama:13b', '16-20GB free', 'Very good, near GPT-3.5 level', 'Moderate'] },
            { attribute: '64GB RAM', values: ['llama3.3:70b, qwen2.5:32b, deepseek-r1:32b', '40-50GB free', 'Excellent, near GPT-4 level', 'Slower'] },
            { attribute: 'GPU (8GB VRAM)', values: ['llama3.2, mistral:7b (GPU-accelerated)', '8GB VRAM', 'Same quality, much faster', 'Very fast (GPU)'] },
          ]}
        />
        <InfoCallout type="warning">
          Always leave 4-6GB of RAM free for your OS and other programs. If a model is too large, Ollama will use disk (swap) which makes it extremely slow. Better to run a smaller model that fits comfortably in RAM.
        </InfoCallout>
      </Subsection>

      <Subsection title="Model Recommendations by Use Case">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Llama 3.3 70B',
            subtitle: 'Best overall quality (needs 64GB RAM)',
            content: 'Meta\'s flagship open-source model. Competitive with GPT-4 on many benchmarks.',
            details: 'Pull: ollama pull llama3.3:70b\nSize: ~45GB\nBest for: complex reasoning, long documents, coding, anything you\'d use Claude for\nRequires: 64GB RAM or GPU with 48GB VRAM\nNote: The Q4_K_M quantization is the best quality/size tradeoff',
            tags: ['Best quality', '64GB RAM'],
            color: 'purple',
          },
          {
            title: 'Llama 3.2 (8B)',
            subtitle: 'Everyday workhorse (16GB RAM)',
            content: 'Great balance of quality, speed, and RAM usage. Best starting point for most people.',
            details: 'Pull: ollama pull llama3.2\nSize: ~5GB\nBest for: everyday chat, summarization, question answering, simple coding\nRequires: 16GB RAM (8GB minimum)\nThis is the model to use when you just want things to work without fuss.',
            tags: ['Balanced', '16GB RAM'],
            color: 'blue',
          },
          {
            title: 'Qwen2.5-Coder',
            subtitle: 'Best coding model locally',
            content: 'Alibaba\'s coding-specialized model. Excellent at code generation, debugging, and explanation.',
            details: 'Pull: ollama pull qwen2.5-coder:7b (or :14b for better quality)\nSize: ~5GB (7B) / ~9GB (14B)\nBest for: code generation, code review, debugging, explaining code\nSurprises: often outperforms Llama on coding tasks despite smaller size',
            tags: ['Coding specialist', 'Multiple sizes'],
            color: 'orange',
          },
          {
            title: 'DeepSeek-R1',
            subtitle: 'Best reasoning locally',
            content: 'Chinese open-source model with exceptional reasoning, competitive with o1 on math and logic.',
            details: 'Pull: ollama pull deepseek-r1:7b (or :14b, :32b)\nSize: 7B = ~5GB, 32B = ~20GB\nBest for: math problems, logic puzzles, step-by-step reasoning\nNote: Shows its thinking process (chain-of-thought) in <think> tags',
            tags: ['Reasoning', 'Shows thinking'],
            color: 'teal',
          },
          {
            title: 'Phi-3 Mini / Phi-4',
            subtitle: 'Best for low-end hardware (8GB RAM)',
            content: 'Microsoft\'s small but surprisingly capable models. Punch well above their weight class.',
            details: 'Pull: ollama pull phi3:mini\nSize: ~2GB (mini), ~4GB (medium)\nBest for: when you have limited RAM, fast responses, simple tasks\nSurprises: phi3-mini (3.8B) regularly beats larger models on reasoning benchmarks',
            tags: ['8GB RAM friendly', 'Fast'],
            color: 'green',
          },
          {
            title: 'Gemma 2',
            subtitle: 'Google\'s open release',
            content: 'Google\'s open-source model family. Well-rounded with good safety tuning.',
            details: 'Pull: ollama pull gemma2:9b\nSize: ~6GB (9B), ~17GB (27B)\nBest for: general chat, following instructions, creative writing\nNote: Very well-behaved, follows complex instructions reliably',
            tags: ['Google', 'Well-tuned'],
            color: 'cyan',
          },
        ]} />
      </Subsection>

      <Subsection title="Understanding Quantization">
        <Prose>
          <p>Model files come in different "quantizations" — essentially different compression levels. A Q4 version is 4-bit, a Q8 is 8-bit, F16 is 16-bit (full precision). Higher bits = better quality but larger size.</p>
        </Prose>
        <CompareTable
          headers={['Q4_K_M', 'Q8_0', 'F16 (full)']}
          rows={[
            { attribute: 'Bits per weight', values: ['4-bit', '8-bit', '16-bit float'] },
            { attribute: 'Size (7B model)', values: ['~4 GB', '~7 GB', '~14 GB'] },
            { attribute: 'Quality loss', values: ['Mild (~5%)', 'Minimal (~1%)', 'None (reference)'] },
            { attribute: 'Runs on', values: ['Most laptops (16GB RAM)', 'Gaming rigs (32GB RAM)', 'High-end GPU only'] },
            { attribute: 'Use when', values: ['Starting out, everyday use', 'Quality matters more than size', 'Research, fine-tuning prep'] },
          ]}
        />
        <InfoCallout type="tip">
          <strong>For most use cases, Q4_K_M is the right choice.</strong> The quality difference is barely noticeable for everyday tasks, and it fits on normal laptops. Ollama downloads Q4_K_M by default.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key Terms">
        <TermsMemoryBlock terms={[
          { term: 'Ollama', definition: 'A local AI runtime that downloads and serves open-source models. Provides an OpenAI-compatible API at localhost:11434.' },
          { term: 'Open WebUI', definition: 'A self-hosted web interface for chatting with local Ollama models. Looks like ChatGPT, runs 100% locally.' },
          { term: 'GGUF', definition: 'The file format used by quantized models that run on consumer hardware (CPU/GPU). What Ollama downloads.' },
          { term: 'VRAM', definition: 'Video RAM — the dedicated memory on your GPU. For GPU-accelerated inference, the model must fit in VRAM. GPUs are 5-10x faster than CPU inference.' },
          { term: 'Quantization', definition: 'Reducing model precision from 16/32-bit floats to 4/8-bit integers. Makes models smaller and faster, with minor quality tradeoff.' },
          { term: 'llama.cpp', definition: 'The underlying C++ library that powers Ollama and enables running quantized models on CPU. Ollama wraps it with a nice API and model management.' },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'You have 16GB of RAM. Which Ollama model gives the best quality within your constraints?', answer: 'llama3.2 (8B, ~5GB) or mistral:7b (~5GB). Both fit comfortably in 16GB RAM and give solid general-purpose performance. For coding, try qwen2.5-coder:7b.' },
          { question: 'You want to use your Ollama models in an app that uses the OpenAI Python SDK. What do you change?', answer: 'Just change the base_url to http://localhost:11434/v1 and set api_key="ollama". Ollama\'s API is OpenAI-compatible — all the same methods work.' },
          { question: 'What is the difference between Q4 and F16 quantization?', answer: 'Q4 uses 4 bits per weight (~4x smaller, minor quality loss). F16 uses 16-bit floats (full precision, 4x larger). For everyday use, Q4_K_M is the sweet spot — quality difference is barely noticeable but it fits on consumer hardware.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Ollama Quick Reference" items={[
        { label: 'Install', value: 'Download from ollama.com (Windows/Mac/Linux)' },
        { label: 'Run model', value: 'ollama run llama3.2' },
        { label: 'Pull model', value: 'ollama pull llama3.3:70b' },
        { label: 'List models', value: 'ollama list' },
        { label: 'API endpoint', value: 'http://localhost:11434 (OpenAI-compatible: /v1)' },
        { label: 'Open WebUI', value: 'docker run -p 3000:8080 ghcr.io/open-webui/open-webui:main' },
        { label: '8GB RAM', value: 'phi3:mini, llama3.2:3b, gemma2:2b' },
        { label: '16GB RAM', value: 'llama3.2, mistral:7b, qwen2.5-coder:7b' },
        { label: '32GB RAM', value: 'llama3.1:13b, qwen2.5:14b, deepseek-r1:14b' },
        { label: '64GB RAM', value: 'llama3.3:70b, qwen2.5:32b (near cloud quality)' },
      ]} />
    </SectionShell>
  )
}
