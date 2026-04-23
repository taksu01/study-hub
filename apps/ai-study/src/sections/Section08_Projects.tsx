import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, CauseEffectChain,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout, NumberedSteps
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

      {/* Crypto Deep Dive */}
      <Subsection title="Deep Dive: Crypto Trading AI — Full Setup">
        <Prose>
          <p>This expands Project 2 into a concrete, runnable crypto trading agent targeting BTC/ETH on Binance (or any exchange supported by ccxt). It fetches real candle data, computes technical indicators, asks Claude to reason about them, and logs signals — with a paper trading mode you can run safely before going live.</p>
        </Prose>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Stack',
            subtitle: 'What you need to install',
            content: 'Python libraries: ccxt, pandas, pandas-ta, anthropic, apscheduler, sqlite3 (built-in)',
            details: 'pip install ccxt pandas pandas-ta anthropic apscheduler\n\n• ccxt: connects to 100+ exchanges (Binance, Bybit, OKX, Coinbase) with a unified API\n• pandas-ta: computes RSI, MACD, Bollinger Bands, EMA, ATR from OHLCV data\n• anthropic: Claude API for the reasoning engine\n• apscheduler: runs the loop every N minutes without cron\n• sqlite3: logs every signal + outcome for backreview',
            tags: ['ccxt', 'pandas-ta', 'apscheduler'],
            color: 'blue',
          },
          {
            title: 'Architecture',
            subtitle: 'How the pieces connect',
            content: 'Scheduler → fetch candles → compute indicators → build prompt → Claude → parse JSON signal → paper/live trade → log to SQLite',
            details: 'The agent runs in a loop every 15 minutes. Each cycle:\n1. Fetch last 100 candles (15m or 1h timeframe) via ccxt\n2. Compute RSI(14), MACD, BB, EMA(20/50) with pandas-ta\n3. Format as a compact table for the LLM prompt\n4. Send to Claude Haiku (fast + cheap for frequent calls)\n5. Parse structured JSON signal\n6. In paper mode: log to SQLite. In live mode: place order via ccxt.',
            tags: ['15-minute loop', 'SQLite logging'],
            color: 'purple',
          },
        ]} />

        <NumberedSteps steps={[
          {
            title: 'Set up exchange API keys (read-only first)',
            description: 'Log in to Binance (or your exchange) → API Management → Create API. Enable "Read Info" only. DO NOT enable trading until you\'ve paper-traded successfully for at least 2 weeks.',
            code: '# Store credentials in a .env file, never in code\nBINANCE_API_KEY=your_key_here\nBINANCE_SECRET=your_secret_here\nANTHROPIC_API_KEY=your_anthropic_key',
          },
          {
            title: 'Fetch candle data with ccxt',
            description: 'ccxt gives you a unified interface to any exchange. Fetch OHLCV (Open, High, Low, Close, Volume) candles for your chosen pair and timeframe.',
            code: 'import ccxt, pandas as pd\nexchange = ccxt.binance({"apiKey": KEY, "secret": SECRET})\nohlcv = exchange.fetch_ohlcv("BTC/USDT", "15m", limit=100)\ndf = pd.DataFrame(ohlcv, columns=["ts","open","high","low","close","vol"])',
          },
          {
            title: 'Compute technical indicators with pandas-ta',
            description: 'One line adds all the standard indicators to your DataFrame. pandas-ta computes them directly from the OHLCV data.',
            code: 'import pandas_ta as ta\ndf.ta.rsi(length=14, append=True)    # RSI_14\ndf.ta.macd(append=True)              # MACD_12_26_9\ndf.ta.bbands(length=20, append=True) # BBL, BBM, BBU\ndf.ta.ema(length=20, append=True)    # EMA_20\ndf.ta.ema(length=50, append=True)    # EMA_50',
          },
          {
            title: 'Format data as a compact LLM prompt',
            description: 'Take only the last 5 candles + current indicator values. Don\'t dump the whole DataFrame — context matters but noise hurts reasoning.',
            code: '# Get latest values\nr = df.iloc[-1]\nprompt = f"""BTC/USDT 15m — {pd.Timestamp(r.ts, unit="ms")}\nPrice: {r.close:.2f} | Vol: {r.vol:.0f}\nRSI(14): {r.RSI_14:.1f} | EMA20: {r.EMA_20:.2f} | EMA50: {r.EMA_50:.2f}\nMACD: {r.MACD_12_26_9:.2f} | Signal: {r.MACDs_12_26_9:.2f}\nBB Upper: {r.BBU_20_2.0:.2f} | BB Lower: {r.BBL_20_2.0:.2f}\n24h change: {((r.close/df.iloc[-96].close)-1)*100:.2f}%"""',
          },
          {
            title: 'Call Claude and parse the signal',
            description: 'Use Claude Haiku for speed and cost (you\'ll call this every 15 minutes). Enforce JSON output via tool calling.',
            code: 'import anthropic, json\nclient = anthropic.Anthropic()\nresponse = client.messages.create(\n    model="claude-haiku-4-5-20251001",\n    max_tokens=300,\n    system=SYSTEM_PROMPT,  # see TryThis box below\n    messages=[{"role": "user", "content": prompt}]\n)\nsignal = json.loads(response.content[0].text)',
          },
          {
            title: 'Log to SQLite (paper trading)',
            description: 'Every signal gets logged with the full reasoning. Review your log after a week — see if the signals were good before trusting live execution.',
            code: 'import sqlite3\ncon = sqlite3.connect("trades.db")\ncon.execute("""CREATE TABLE IF NOT EXISTS signals\n  (ts TEXT, pair TEXT, signal TEXT, confidence REAL,\n   price REAL, reasoning TEXT, executed INTEGER)""")\ncon.execute("INSERT INTO signals VALUES (?,?,?,?,?,?,?)",\n  (str(pd.Timestamp.now()), "BTC/USDT",\n   signal["signal"], signal["confidence"],\n   r.close, signal["reasoning"], 0))  # 0 = paper\ncon.commit()',
          },
          {
            title: 'Add live execution (after 2+ weeks paper trading)',
            description: 'Only when your paper results look good. Enable "Spot Trading" on your API key. Add strict guards in code before this step runs.',
            code: '# Only execute if ALL guards pass:\nif (signal["signal"] != "HOLD"\n    and signal["confidence"] >= 0.80\n    and signal["risk_level"] != "HIGH"\n    and within_daily_loss_limit(con)\n    and not position_too_large(exchange)):\n    order = exchange.create_market_order(\n        "BTC/USDT", signal["signal"].lower(), amount)\n    log_execution(con, order)',
          },
        ]} />

        <TryThisCallout
          title="System Prompt for Crypto Agent"
          prompt={`SYSTEM_PROMPT = """You are a quantitative crypto analyst specializing in technical analysis.
You receive 15-minute candle data with technical indicators for a crypto pair.
Your job: provide a trading signal based ONLY on the provided data.

ALWAYS respond in this exact JSON (no prose, no markdown):
{
  "signal": "BUY" | "SELL" | "HOLD",
  "confidence": 0.0-1.0,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "reasoning": "max 2 sentences explaining the signal",
  "key_indicator": "which indicator drove this decision",
  "invalidation": "what would make this signal wrong"
}

Signal rules:
- BUY only when confidence >= 0.75 AND risk_level != HIGH
- SELL only when confidence >= 0.75 AND risk_level != HIGH
- Default to HOLD when uncertain — missing a trade is better than a bad trade
- Consider trend (EMA20 vs EMA50), momentum (RSI, MACD), and levels (Bollinger Bands)
- RSI > 70 = overbought warning. RSI < 30 = oversold opportunity.
- Never base signal on a single indicator
"""

# Example output you should get:
# {
#   "signal": "BUY",
#   "confidence": 0.78,
#   "risk_level": "MEDIUM",
#   "reasoning": "RSI recovering from 32 with MACD crossover above signal line. Price touching lower BB.",
#   "key_indicator": "MACD crossover + RSI divergence",
#   "invalidation": "Close below BBL_20 would negate the bounce setup"
# }`}
        />

        <TryThisCallout
          title="Full Runnable Agent Loop (save as crypto_agent.py)"
          prompt={`import ccxt, pandas as pd, pandas_ta as ta
import anthropic, json, sqlite3, os
from apscheduler.schedulers.blocking import BlockingScheduler
from dotenv import load_dotenv

load_dotenv()
exchange = ccxt.binance({"apiKey": os.getenv("BINANCE_API_KEY"),
                          "secret": os.getenv("BINANCE_SECRET")})
client = anthropic.Anthropic()
PAPER_MODE = True  # Set to False only after 2+ weeks of paper validation

def get_signal(pair="BTC/USDT", timeframe="15m"):
    # 1. Fetch data
    ohlcv = exchange.fetch_ohlcv(pair, timeframe, limit=100)
    df = pd.DataFrame(ohlcv, columns=["ts","open","high","low","close","vol"])
    # 2. Indicators
    df.ta.rsi(length=14, append=True)
    df.ta.macd(append=True)
    df.ta.bbands(length=20, append=True)
    df.ta.ema(length=20, append=True)
    df.ta.ema(length=50, append=True)
    r = df.iloc[-1]
    # 3. Prompt
    prompt = (f"{pair} {timeframe} | Price: {r.close:.2f} | "
              f"RSI: {r.RSI_14:.1f} | EMA20: {r.EMA_20:.2f} | "
              f"EMA50: {r.EMA_50:.2f} | MACD: {r.MACD_12_26_9:.4f} | "
              f"BB: {r.BBL_20_2_0:.2f}–{r.BBU_20_2_0:.2f}")
    # 4. LLM
    resp = client.messages.create(
        model="claude-haiku-4-5-20251001", max_tokens=300,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}])
    signal = json.loads(resp.content[0].text)
    signal["price"] = r.close
    signal["pair"] = pair
    return signal

def run_cycle():
    signal = get_signal()
    print(f"[{pd.Timestamp.now()}] {signal['pair']}: {signal['signal']} "
          f"(conf={signal['confidence']:.2f}) — {signal['reasoning']}")
    # Log to SQLite
    con = sqlite3.connect("trades.db")
    con.execute("CREATE TABLE IF NOT EXISTS signals "
                "(ts,pair,signal,confidence,price,risk,reasoning,paper)")
    con.execute("INSERT INTO signals VALUES (?,?,?,?,?,?,?,?)",
                (str(pd.Timestamp.now()), signal["pair"], signal["signal"],
                 signal["confidence"], signal["price"],
                 signal["risk_level"], signal["reasoning"], int(PAPER_MODE)))
    con.commit(); con.close()

scheduler = BlockingScheduler()
scheduler.add_job(run_cycle, "interval", minutes=15)
print("Crypto AI agent started — paper mode:", PAPER_MODE)
run_cycle()  # Run once immediately
scheduler.start()`}
        />

        <InfoCallout type="warning">
          <strong>Before going live:</strong> Run in PAPER_MODE=True for at least 2 weeks. Review your SQLite log — check win rate by signal type, average confidence vs actual outcome, and whether the agent outperforms a simple buy-and-hold. If it doesn't beat the baseline, don't trust it with real money. Start with a position size you're comfortable losing entirely.
        </InfoCallout>
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
