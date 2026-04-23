import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, CauseEffectChain,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout
} from '../components/ui'

export default function Section08() {
  return (
    <SectionShell id="section-8">
      <SectionHeader
        number={8}
        title="Project Blueprints"
        subtitle="Five real AI projects you can actually build — with step-by-step architecture, stack choices, and key concepts."
      />

      <Prose>
        <p>Theory is useless without execution. This section gives you the complete blueprint for five concrete AI projects — from your personal AI assistant to a trading agent. Each blueprint covers the stack, the architecture, and the concepts you'll apply from previous sections.</p>
        <p>These aren't toy projects. They're production-grade patterns used in real systems. Start with whichever excites you most — you'll find the earlier sections suddenly make much more sense when applied to something real.</p>
      </Prose>

      {/* Project 1 */}
      <Subsection title="Project 1 — Personal AI Assistant">
        <InfoCallout type="info">
          <strong>What it does:</strong> A local AI assistant that can edit files, browse the web, answer chat, and remember context across sessions. Your own private version of a capable AI assistant.
        </InfoCallout>
        <ExpandableCardGrid columns={3} cards={[
          { title: 'Complexity', subtitle: '', content: 'Medium — mostly configuration, minimal custom code', color: 'blue', tags: ['Setup-heavy'] },
          { title: 'Time to build', subtitle: '', content: '2-4 hours for basic version, ongoing for customization', color: 'green', tags: ['Weekend project'] },
          { title: 'Key concepts', subtitle: '', content: 'Local AI, MCP servers, computer use, persistent memory', color: 'purple', tags: ['Sections 4, 5, 6'] },
        ]} />
        <Prose>
          <p><strong>Architecture:</strong> Ollama (local model) + Open WebUI (chat interface) + MCP servers for tools. Open WebUI handles the chat UI and multi-turn memory. MCP servers give it capabilities: filesystem access, web search, calendar. For computer use (clicking/browsing), add the browser-use Python library.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Install Ollama + pull llama3.3:70b', effect: 'Local model running at localhost:11434' },
          { cause: 'Run Open WebUI via Docker', effect: 'ChatGPT-like UI at localhost:3000, connected to Ollama' },
          { cause: 'Add Filesystem MCP server', effect: 'Assistant can read/write files in approved directories' },
          { cause: 'Add Web Search MCP (Brave)', effect: 'Assistant can search the internet for current info' },
          { cause: 'Configure memory in Open WebUI', effect: 'Assistant remembers context across sessions via RAG' },
          { cause: 'Add browser-use for computer use', effect: 'Assistant can navigate websites and fill forms' },
        ]} />
        <TryThisCallout
          title="Quick Start: Personal Assistant Stack"
          prompt={`# Step 1: Local model
ollama pull llama3.3:70b  # or llama3.2 if less RAM

# Step 2: Open WebUI
docker run -d -p 3000:8080 \\
  --add-host=host.docker.internal:host-gateway \\
  -v open-webui:/app/backend/data \\
  --name open-webui \\
  ghcr.io/open-webui/open-webui:main

# Step 3: Access at http://localhost:3000
# In Settings → Models: your Ollama models will appear

# Step 4: Add web search (optional)
# Settings → Web Search → enable Brave/SearXNG

# For file editing capability: add to Claude Desktop config
# (see Section 5 MCP setup for filesystem MCP)`}
        />
      </Subsection>

      {/* Project 2 */}
      <Subsection title="Project 2 — Trading AI Agent">
        <InfoCallout type="warning">
          <strong>Important:</strong> This blueprint shows how to build a market analysis and signal agent. If you add auto-execution, always test with paper trading first. The AI provides reasoning — your code enforces risk rules. Never give an AI unconstrained access to execute real trades.
        </InfoCallout>
        <ExpandableCardGrid columns={3} cards={[
          { title: 'Complexity', subtitle: '', content: 'High — needs market data, risk logic, and careful testing', color: 'red', tags: ['Needs careful testing'] },
          { title: 'Time to build', subtitle: '', content: '1-2 weeks for a solid version with paper trading', color: 'orange', tags: ['Paper trade first'] },
          { title: 'Key concepts', subtitle: '', content: 'Structured output, agentic loops, scheduled jobs, guardrails', color: 'purple', tags: ['Sections 3, 4, 7'] },
        ]} />
        <Prose>
          <p><strong>Architecture:</strong> Python script (scheduled via cron or n8n) → fetches market data → formats as structured context → sends to Claude with analysis prompt → extracts JSON signal → your code applies risk rules → optional: executes via broker API.</p>
          <p><strong>Critical design principle:</strong> The LLM outputs a signal recommendation in JSON (buy/sell/hold, confidence, reasoning). Your code — not the LLM — checks position limits, stop losses, and actually places orders. This keeps risk management deterministic and auditable.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Schedule every 15min (cron/n8n)', effect: 'Trigger the analysis pipeline' },
          { cause: 'Fetch market data (yfinance/Alpaca)', effect: 'Price history, volume, indicators as structured data' },
          { cause: 'Format data as LLM context', effect: 'Structured prompt with price, RSI, news headlines' },
          { cause: 'Call Claude with analysis prompt', effect: 'Get JSON: { signal, confidence, reasoning, risk_level }' },
          { cause: 'Python applies risk rules', effect: 'Check: max position size, stop-loss, drawdown limits' },
          { cause: 'Execute via broker API (if rules pass)', effect: 'Alpaca, Binance API places the order' },
          { cause: 'Log everything', effect: 'Audit trail: what signal, why, what action was taken' },
        ]} />
        <TryThisCallout
          title="Trading Agent Prompt Template"
          prompt={`# System prompt for your trading agent
SYSTEM = """You are a quantitative trading analyst.
Analyze the provided market data and output a trading signal.

ALWAYS respond in this exact JSON format:
{
  "signal": "BUY" | "SELL" | "HOLD",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation",
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "suggested_position_size": 0.01-0.10  // as fraction of portfolio
}

Rules:
- Never recommend positions > 10% of portfolio
- Require confidence > 0.7 before suggesting BUY or SELL
- When uncertain, default to HOLD
- Base signals on provided data only, not speculation
"""

# Your code then validates:
# signal = json.loads(response)
# if signal["confidence"] < 0.75: return "HOLD"
# if signal["risk_level"] == "HIGH": reduce_size(signal)
# if within_daily_loss_limit(): execute(signal) else: skip()`}
        />
      </Subsection>

      {/* Project 3 */}
      <Subsection title="Project 3 — Content Creation AI">
        <InfoCallout type="tip">
          <strong>What it does:</strong> A multi-step pipeline that takes a topic, researches it, drafts content, and formats it for publishing. Can produce blog posts, newsletters, social threads, or video scripts.
        </InfoCallout>
        <ExpandableCardGrid columns={3} cards={[
          { title: 'Complexity', subtitle: '', content: 'Medium — multiple chained LLM calls with orchestration', color: 'blue', tags: ['Pipeline-based'] },
          { title: 'Time to build', subtitle: '', content: '3-6 hours for a working pipeline', color: 'green', tags: ['Clear steps'] },
          { title: 'Key concepts', subtitle: '', content: 'Prompt chaining, multi-step pipelines, different models per step', color: 'teal', tags: ['Sections 3, 5, 7'] },
        ]} />
        <Prose>
          <p><strong>Architecture:</strong> A prompt chain where each step feeds the next. Use cheaper/faster models (Haiku) for research and classification, and more capable models (Sonnet) for actual writing. Add web search MCP for grounding the research step.</p>
          <p><strong>Key insight:</strong> Don't try to do everything in one prompt. Research → outline → draft → edit → format is dramatically better than "write me an article about X." Each step produces a focused artifact that guides the next.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Input: topic + audience + format', effect: 'Define the content brief' },
          { cause: 'Step 1: Research (Claude Haiku + web search)', effect: '5-10 key facts, recent developments, angles' },
          { cause: 'Step 2: Outline (Claude Haiku)', effect: 'Structured H2/H3 outline from research' },
          { cause: 'Step 3: Draft (Claude Sonnet)', effect: 'Full draft following the outline' },
          { cause: 'Step 4: Edit (Claude Sonnet)', effect: 'Improve clarity, fix tone, check accuracy' },
          { cause: 'Step 5: Format (Claude Haiku)', effect: 'Add SEO metadata, social snippets, HTML/markdown' },
        ]} />
        <TryThisCallout
          title="Content Pipeline — Python Orchestrator"
          prompt={`import anthropic

client = anthropic.Anthropic()

def content_pipeline(topic: str, audience: str, format: str):

    # Step 1: Research (fast/cheap model)
    research = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        messages=[{"role": "user", "content":
            f"Research '{topic}' for {audience}. Give 6 key facts, "
            f"2 surprising angles, and 3 recent developments. Be specific."
        }]
    ).content[0].text

    # Step 2: Outline
    outline = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=800,
        messages=[{"role": "user", "content":
            f"Create a {format} outline for '{topic}'\\nResearch: {research}"
        }]
    ).content[0].text

    # Step 3: Write (quality model)
    draft = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        system=f"You are a content writer for {audience}. Write engaging, accurate content.",
        messages=[{"role": "user", "content":
            f"Write the full {format} following this outline:\\n{outline}"
        }]
    ).content[0].text

    return draft

# Usage
result = content_pipeline(
    topic="How AI agents work",
    audience="non-technical business owners",
    format="1500-word blog post"
)
print(result)`}
        />
      </Subsection>

      {/* Project 4 */}
      <Subsection title="Project 4 — WhatsApp AI Bot">
        <InfoCallout type="info">
          <strong>What it does:</strong> An AI that automatically replies to WhatsApp messages — acting as a persona, answering questions, or routing conversations. Uses the Twilio WhatsApp API + your own LLM backend.
        </InfoCallout>
        <ExpandableCardGrid columns={3} cards={[
          { title: 'Complexity', subtitle: '', content: 'Low-Medium — webhook server + LLM API + Twilio account', color: 'green', tags: ['Clear integration points'] },
          { title: 'Time to build', subtitle: '', content: '4-6 hours including Twilio setup', color: 'blue', tags: ['API-heavy'] },
          { title: 'Key concepts', subtitle: '', content: 'Webhooks, session memory, persona via system prompt', color: 'orange', tags: ['Sections 3, 4, 7'] },
        ]} />
        <Prose>
          <p><strong>Architecture:</strong> Phone sends WhatsApp message → Twilio receives it → Twilio calls your webhook URL (HTTP POST) → your server processes with LLM → server calls Twilio API to reply → message appears on phone.</p>
          <p><strong>Session memory:</strong> WhatsApp conversations are stateless from the server's perspective. Store conversation history per phone number in a simple dictionary or Redis. Include the last N messages in the LLM prompt for context.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Sign up for Twilio + WhatsApp Sandbox', effect: 'Get a test WhatsApp number for free' },
          { cause: 'Build webhook server (FastAPI/Express)', effect: 'HTTP endpoint that receives WhatsApp events' },
          { cause: 'Configure Twilio to call your webhook', effect: 'Use ngrok for local dev, real URL for production' },
          { cause: 'Message arrives → fetch conversation history', effect: 'Build context with last 10 messages per phone' },
          { cause: 'Call LLM with history + new message', effect: 'Generate reply with persona and context' },
          { cause: 'Send reply via Twilio API', effect: 'Message appears in WhatsApp conversation' },
        ]} />
        <TryThisCallout
          title="WhatsApp Bot — FastAPI Webhook"
          prompt={`# pip install fastapi uvicorn twilio anthropic
from fastapi import FastAPI, Form
from twilio.twiml.messaging_response import MessagingResponse
import anthropic

app = FastAPI()
client = anthropic.Anthropic()
conversations = {}  # In production, use Redis

PERSONA = """You are Aria, a helpful AI assistant.
Be friendly, concise, and helpful.
You're responding via WhatsApp, so keep messages short (under 200 chars when possible)."""

@app.post("/webhook")
async def whatsapp_webhook(From: str = Form(...), Body: str = Form(...)):
    phone = From
    message = Body.strip()

    # Get or create conversation history
    if phone not in conversations:
        conversations[phone] = []

    # Add user message
    conversations[phone].append({"role": "user", "content": message})

    # Keep last 10 messages
    history = conversations[phone][-10:]

    # Call AI
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        system=PERSONA,
        messages=history
    )

    reply = response.content[0].text
    conversations[phone].append({"role": "assistant", "content": reply})

    # Send via Twilio TwiML
    twiml = MessagingResponse()
    twiml.message(reply)
    return str(twiml)

# Run: uvicorn main:app --reload --port 3000
# Expose: npx localtunnel --port 3000`}
        />
      </Subsection>

      {/* Project 5 */}
      <Subsection title="Project 5 — Personal Knowledge Assistant">
        <InfoCallout type="tip">
          <strong>What it does:</strong> Chat with your own notes, PDFs, bookmarks, and documents. Ask questions, get answers grounded in your actual knowledge base. The "second brain" use case.
        </InfoCallout>
        <ExpandableCardGrid columns={3} cards={[
          { title: 'Complexity', subtitle: '', content: 'Medium — RAG pipeline + chat UI + document ingestion', color: 'blue', tags: ['RAG-based'] },
          { title: 'Time to build', subtitle: '', content: '4-8 hours depending on document sources', color: 'green', tags: ['Extendable over time'] },
          { title: 'Key concepts', subtitle: '', content: 'RAG, embeddings, vector search, chunking strategy', color: 'purple', tags: ['Section 2, 7'] },
        ]} />
        <Prose>
          <p><strong>Architecture:</strong> Document ingestion pipeline (reads PDFs/markdown/text) → chunks documents → embeds with sentence-transformers → stores in ChromaDB → simple chat UI → questions get embedded → similar chunks retrieved → LLM answers from your data.</p>
          <p><strong>Quickest path:</strong> Use Ollama for both the embeddings and the chat model (completely free and local). Or use Open WebUI which has RAG built-in — just drop your documents into a collection and start chatting.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Drop files into a watched folder', effect: 'Ingestion script detects new files' },
          { cause: 'Read and chunk documents', effect: 'Split into 500-token overlapping chunks' },
          { cause: 'Embed each chunk', effect: 'sentence-transformers → 384-dim vector per chunk' },
          { cause: 'Store in ChromaDB', effect: 'Local vector database with metadata (source, date)' },
          { cause: 'User asks question', effect: 'Embed question → find top-5 similar chunks' },
          { cause: 'Build prompt with chunks', effect: '"Based on these notes: [chunks]. Answer: [question]"' },
          { cause: 'LLM answers from your data', effect: 'Grounded response citing source documents' },
        ]} />
        <TryThisCallout
          title="Quickest Path: Open WebUI RAG (No Code)"
          prompt={`# Open WebUI has RAG built in — no code required!

# 1. Make sure Open WebUI is running (Section 6 setup)
#    http://localhost:3000

# 2. Click "Workspace" → "Knowledge" → "Create"
#    Name your knowledge base (e.g., "My Notes")

# 3. Upload your documents:
#    - PDFs, markdown files, text files, web URLs
#    - Open WebUI automatically embeds them

# 4. In a new chat, click the "+" → select your Knowledge base
#    Now every message will search your docs for context

# For a custom Python version:
# See the minimal RAG code in Section 7 (Pattern 2)
# Add more sources (Notion, Obsidian, web scraping) to the ingestion step`}
        />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'For the trading agent, why should your Python code enforce risk rules instead of relying on the LLM to self-limit?', answer: 'LLMs can hallucinate, misinterpret data, or produce inconsistent outputs. Risk rules (max position size, stop-loss, daily loss limits) must be deterministic and auditable. The LLM provides reasoning; your code enforces boundaries.' },
          { question: 'In the content creation pipeline, why use Claude Haiku for research and Sonnet for writing?', answer: 'Haiku is fast and cheap — ideal for structured tasks like research and classification where output quality doesn\'t need to be exceptional. Sonnet is slower and more expensive but produces higher-quality prose. Matching model to task step saves cost without sacrificing output quality.' },
          { question: 'What\'s the simplest way to give a WhatsApp bot multi-turn memory?', answer: 'Store a list of message objects per phone number (in a dict or Redis). On each new message, retrieve the history for that phone number, append the new message, call the LLM with the full history (last 10 messages), and save the reply back to history.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Project Quick Reference" items={[
        { label: 'Personal Assistant', value: 'Ollama + Open WebUI + MCP (filesystem, web search)' },
        { label: 'Trading Agent', value: 'Python + yfinance + Claude (JSON signal) + broker API' },
        { label: 'Content Pipeline', value: 'Prompt chain: research (Haiku) → outline → draft (Sonnet) → format' },
        { label: 'WhatsApp Bot', value: 'Twilio + FastAPI webhook + LLM + conversation history per phone' },
        { label: 'Knowledge Assistant', value: 'ChromaDB + sentence-transformers + RAG + Ollama (all local)' },
        { label: 'Fastest start', value: 'Open WebUI — installs in 2 min, RAG built in, no code needed' },
        { label: 'Core rule', value: 'LLMs reason. Your code enforces rules, executes actions, handles errors.' },
      ]} />
    </SectionShell>
  )
}
