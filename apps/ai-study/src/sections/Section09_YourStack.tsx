import {
  SectionShell, SectionHeader, Subsection, Prose,
  InteractiveFlowMap, ExpandableCardGrid, CompareTable,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout
} from '../components/ui'

export default function Section09() {
  return (
    <SectionShell id="section-9">
      <SectionHeader
        number={9}
        title="Your AI Stack"
        subtitle="How to build your personal AI ecosystem — the right models for the right tasks, cost-optimized and privacy-aware."
      />

      <Subsection title="The Personal AI Ecosystem">
        <Prose>
          <p>The best AI setup isn't one tool — it's a small, deliberate ecosystem. Each layer serves a different purpose: you have a primary thinking partner, a local private AI, an automation layer, and a knowledge layer. Click each node to understand how it fits.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          vertical={true}
          nodes={[
            {
              id: 'primary',
              label: 'Primary AI (Cloud)',
              description: 'Your main AI tool for high-quality reasoning, coding, and complex tasks. Claude Sonnet or GPT-4o. Use for: coding assistance, research, writing, complex problem-solving. Pay for this — the quality difference from free tiers is significant for daily professional use.',
              color: 'purple',
            },
            {
              id: 'local',
              label: 'Local AI (Ollama)',
              description: 'Runs on your machine for private, sensitive, or high-volume tasks. Llama 3.3 70B (if you have the RAM) or Llama 3.2 for everyday use. Free after hardware cost. Use for: processing sensitive documents, RAG over private notes, experimentation, tasks where you want zero data exposure.',
              color: 'blue',
            },
            {
              id: 'automation',
              label: 'Automation Layer (n8n)',
              description: 'Workflows that run without your input: scheduled reports, webhook handlers, data pipelines, notifications. Self-hosted n8n connects your cloud and local AI to everything else — WhatsApp, email, databases, APIs. The plumbing that makes things run automatically.',
              color: 'orange',
            },
            {
              id: 'knowledge',
              label: 'Knowledge Layer (RAG)',
              description: 'Your documents, notes, and data made queryable by AI. ChromaDB or Open WebUI\'s built-in RAG stores your embeddings. When you ask about your own projects, decisions, or notes — this layer retrieves the relevant context and feeds it to the model.',
              color: 'green',
            },
          ]}
        />
      </Subsection>

      <Subsection title="Choosing the Right Model for the Right Task">
        <CompareTable
          headers={['Best Model', 'Why', 'Cost']}
          rows={[
            { attribute: 'Complex reasoning / coding', values: ['Claude Sonnet 4.6', 'Best reasoning + 200k context + coding', 'Paid API'] },
            { attribute: 'Everyday chat / quick tasks', values: ['Claude Haiku 4.5 or GPT-4o mini', 'Fast and cheap, good enough for simple tasks', 'Very cheap'] },
            { attribute: 'Deep reasoning / math', values: ['Claude Opus 4.7 or o3', 'Extended thinking, highest accuracy on hard problems', 'Expensive'] },
            { attribute: 'Local general purpose', values: ['Llama 3.3 70B (via Ollama)', 'Near cloud quality, fully local', 'Free'] },
            { attribute: 'Local fast (limited RAM)', values: ['Llama 3.2 or Phi-4', 'Good quality, runs on 16GB RAM', 'Free'] },
            { attribute: 'Local coding', values: ['Qwen2.5-Coder 14B', 'Best local coding model', 'Free'] },
            { attribute: 'Local reasoning', values: ['DeepSeek-R1 32B', 'Shows chain-of-thought, excellent logic', 'Free'] },
            { attribute: 'Long documents (>200k tokens)', values: ['Gemini 2.5 Pro', '1M token context window, multimodal', 'Paid API'] },
          ]}
        />
        <InfoCallout type="tip">
          <strong>The 80/20 rule:</strong> Claude Sonnet handles 80% of everything you'll throw at it. Add Ollama for privacy-sensitive work and Claude Haiku for high-volume cheap tasks. You don't need 10 different models — start with 2-3 and expand only when you hit a specific gap.
        </InfoCallout>
      </Subsection>

      <Subsection title="Cost Optimization">
        <Prose>
          <p>AI costs can spiral if you're not deliberate. Here are the levers you actually control.</p>
        </Prose>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Model Tiering',
            subtitle: 'Match model to task complexity',
            content: 'Use Haiku for classification, extraction, simple Q&A. Use Sonnet for reasoning, writing, coding. Use Opus/o1 only for the hardest problems.',
            details: 'Current Claude pricing (per million tokens, input/output):\n• Haiku 4.5: $0.25/$1.25 — very cheap, great for simple tasks\n• Sonnet 4.6: $3/$15 — mid-tier, best balance of quality and cost\n• Opus 4.7: $15/$75 — highest quality, for hard problems only\n\nA 10–60x cost difference across the tier. Getting model selection right is the single biggest cost lever. Always start with Haiku for prototyping, measure quality, upgrade only when needed.',
            tags: ['10x cost difference per tier'],
            color: 'green',
          },
          {
            title: 'Prompt Caching',
            subtitle: 'Cache repeated context',
            content: 'If you send the same system prompt or context repeatedly, Anthropic caches it after the first call.',
            details: 'Claude supports prompt caching — if you add cache_control to large, repeated blocks (system prompts, reference documents), subsequent calls that reuse that content cost 90% less. Great for RAG applications where you repeatedly send the same document chunks. Implement with the cache_control parameter in the Anthropic SDK.',
            tags: ['90% discount on cached tokens'],
            color: 'blue',
          },
          {
            title: 'Local for High Volume',
            subtitle: 'Use Ollama for zero-cost scale',
            content: 'Processing 10k documents? Personal assistant with hundreds of daily messages? Go local.',
            details: 'Cloud APIs at $0.003/1k input tokens: processing 10 million tokens = $30. At scale this adds up fast. Ollama is free after hardware. For personal productivity tools, a one-time GPU investment often pays back in months if you\'re a heavy AI user.',
            tags: ['Zero per-query cost'],
            color: 'orange',
          },
          {
            title: 'Shorter Prompts',
            subtitle: 'Every token costs',
            content: 'Optimize your prompts. Remove filler, be specific, use structured formats instead of prose.',
            details: 'A 500-token system prompt sent with every message at 1000 messages/day = 500k tokens/day just in repeated instructions. Use prompt caching for long system prompts. Keep user messages focused. Request concise outputs (specify max length). These aren\'t premature optimizations — they\'re just good engineering.',
            tags: ['Fewer tokens = lower cost'],
            color: 'purple',
          },
        ]} />
      </Subsection>

      <Subsection title="Privacy Considerations">
        <Prose>
          <p>Not everything should go to cloud AI. Understanding where your data goes is important both for personal privacy and for professional/legal compliance.</p>
        </Prose>
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'OK for Cloud AI',
            subtitle: 'Generally safe',
            content: 'Public information, code that\'s not proprietary, general questions, creative work not tied to sensitive identity.',
            details: 'Most cloud AI providers (Anthropic, OpenAI) don\'t train on API requests by default. Consumer products (Claude.ai free tier) may use data differently — check the privacy policy. For most everyday developer tasks, cloud AI is fine.',
            tags: ['Check ToS', 'API ≠ consumer product'],
            color: 'green',
          },
          {
            title: 'Use Local AI Instead',
            subtitle: 'Keep on-device',
            content: 'Medical records, financial data, legal documents, trade secrets, personal journals, unreleased product plans.',
            details: 'If data leaving your machine would be a legal, compliance, or personal problem — use local AI. Ollama processes everything on your hardware. Nothing leaves. This is also true for corporate environments with data residency requirements.',
            tags: ['Ollama', 'Zero data exposure'],
            color: 'orange',
          },
          {
            title: 'Know the Difference',
            subtitle: 'API vs consumer product',
            content: 'Claude API and Claude.ai have different privacy policies. API data isn\'t used for training by default.',
            details: 'When you use the Anthropic API with your API key, your data is not used to train models by default (see Anthropic\'s usage policies). When you use Claude.ai (the website) on a free consumer plan, data policies may differ. Always check the current privacy policy for the specific product you\'re using.',
            tags: ['API vs UI', 'Read the policy'],
            color: 'red',
          },
        ]} />
      </Subsection>

      <Subsection title="Your Daily AI Workflow">
        <Prose>
          <p>The goal isn't to use AI for everything — it's to use it deliberately, saving your cognitive energy for the parts that require you specifically. Here's a practical daily workflow pattern.</p>
        </Prose>
        <TryThisCallout
          title="Your Morning AI Briefing (n8n automation)"
          prompt={`# Daily morning briefing workflow (n8n)

# Trigger: Schedule at 8:00 AM every weekday

# Node 1: HTTP Request
# GET https://hacker-news.firebaseio.com/v0/topstories.json
# + fetch top 5 article summaries

# Node 2: Anthropic (Claude Haiku)
# System: "You are a briefing assistant. Be concise."
# User: "Summarize these tech headlines for a developer:
#        [headlines]
#        What's worth reading? What can I skip?"

# Node 3: Your calendar API (Google Calendar MCP)
# Fetch today's meetings

# Node 4: Anthropic (Claude Haiku)
# "Given these meetings: [meetings]
#  What should I prepare for? Any conflicts?"

# Node 5: Email/Telegram/Slack node
# Send the combined briefing to yourself`}
        />
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Development Work',
            subtitle: 'Claude Code + Sonnet',
            content: 'Primary coding assistant with filesystem access and MCP servers for web search and GitHub.',
            details: 'Claude Code is your best development partner. Configure it with MCP servers: filesystem (for your project), web search (for docs), GitHub (for codebase context). Build a custom CLAUDE.md that explains your project architecture, coding conventions, and preferences once — then it knows your context in every session.',
            tags: ['Claude Code', 'MCP servers'],
            color: 'purple',
          },
          {
            title: 'Research & Learning',
            subtitle: 'Claude Sonnet with web search',
            content: 'Deep research, learning new technologies, understanding papers or documentation.',
            details: 'For research: use Claude with web search MCP enabled. For understanding code or papers: paste directly into Claude with a large context (200k tokens handles most documents). For building mental models of complex topics: chain-of-thought prompting ("explain this to me step by step, checking if I follow").',
            tags: ['Web search MCP', 'Long context'],
            color: 'blue',
          },
          {
            title: 'Private / Sensitive Work',
            subtitle: 'Ollama locally',
            content: 'Anything involving personal data, company secrets, client information, or medical/legal docs.',
            details: 'Route sensitive work to your local Ollama instance via Open WebUI. Set up a RAG collection for private documents. The quality is slightly lower than cloud Claude but the privacy guarantee is absolute — nothing leaves your machine.',
            tags: ['Ollama', 'Open WebUI', 'Zero exposure'],
            color: 'green',
          },
          {
            title: 'Automation & Pipelines',
            subtitle: 'n8n + Claude Haiku',
            content: 'Scheduled jobs, webhook handlers, data processing, notifications, bots.',
            details: 'Self-hosted n8n handles the orchestration. Use Claude Haiku for most automated tasks (fast, cheap, good enough). Use Sonnet only when the task genuinely requires better reasoning. Set up error notifications so you know when automations break. Log AI outputs for auditing.',
            tags: ['n8n', 'Scheduled', 'Low-cost model'],
            color: 'orange',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'You\'re building a customer support classification system that processes 500,000 messages per day. Which model should you use?', answer: 'Claude Haiku (or another small, cheap model). At 500k messages/day, cost is critical. Haiku is 10-12x cheaper than Sonnet and handles classification tasks well. Only escalate to Sonnet for complex cases that Haiku misclassifies.' },
          { question: 'A consultant wants to process client legal documents through an AI. What\'s the right approach?', answer: 'Use local AI (Ollama). Legal documents likely contain sensitive client information — sending them to cloud APIs may violate client confidentiality agreements and data residency requirements. Local processing with Ollama keeps everything on-device.' },
          { question: 'What is prompt caching and when does it matter?', answer: 'Anthropic caches large, repeated prompt blocks (system prompts, reference docs) after the first call — subsequent uses cost ~90% less. Matters when you\'re sending the same large system prompt or document chunks with every message in a high-volume application.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Your Complete AI Reference" items={[
        { label: 'Daily coding', value: 'Claude Code (claude-sonnet-4-6) + filesystem + web search MCP' },
        { label: 'Everyday tasks', value: 'Claude Haiku 4.5 — fast, cheap, good enough for simple work' },
        { label: 'Hard problems', value: 'Claude Opus 4.7 or o3 — only when Sonnet isn\'t enough' },
        { label: 'Local general', value: 'ollama pull llama3.2 (16GB RAM) or llama3.3:70b (64GB)' },
        { label: 'Local coding', value: 'ollama pull qwen2.5-coder:14b' },
        { label: 'Local reasoning', value: 'ollama pull deepseek-r1:32b' },
        { label: 'Automation', value: 'n8n (self-host: docker run n8nio/n8n) + Claude Haiku' },
        { label: 'RAG (cloud)', value: 'Open WebUI Knowledge collections (built-in, no code)' },
        { label: 'RAG (code)', value: 'chromadb + sentence-transformers + Anthropic/Ollama' },
        { label: 'WhatsApp bot', value: 'Twilio + FastAPI webhook + any LLM API' },
        { label: 'Prompt caching', value: 'cache_control in Anthropic SDK — 90% cost reduction on repeated context' },
        { label: 'Privacy rule', value: 'Sensitive data → Ollama (local). Everything else → cloud API is fine.' },
        { label: 'Anthropic API', value: 'console.anthropic.com — API keys, usage, prompt sandbox' },
        { label: 'Ollama API', value: 'localhost:11434 — OpenAI-compatible, free, no key needed' },
      ]} />
    </SectionShell>
  )
}
