import { Hammer, HelpCircle, Rocket } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  MiniRecallBlock, CheatSheetPanel, InfoCallout,
} from '../components/ui'
import { ProjectBlueprint, type Blueprint } from '../components/viz/ProjectBlueprint'

const BLUEPRINTS: Blueprint[] = [
  {
    id: 'assistant',
    name: 'Personal AI assistant',
    pitch: 'A private assistant that reads your files, searches the web, and remembers context between sessions. Mostly configuration, barely any code.',
    difficulty: 'Low',
    time: '2–4 hours',
    concepts: 'Local models, MCP servers, persistent memory',
    sections: 'Sections 5, 6',
    flow: [
      { step: 'Install Ollama, pull a model', result: 'A model serving on localhost:11434' },
      { step: 'Run Open WebUI in Docker', result: 'A chat UI on localhost:3000, wired to Ollama' },
      { step: 'Add the filesystem MCP server', result: 'It can read and write inside directories you name' },
      { step: 'Add a web search MCP server', result: 'It can answer about things after the training cutoff' },
      { step: 'Create a knowledge collection', result: 'Documents you upload are embedded and searchable' },
    ],
    watchOut: 'Scope the filesystem server to a project directory, never your home folder. An assistant that can write anywhere will eventually write somewhere you did not expect.',
    code: [
      {
        label: 'Setup',
        language: 'bash',
        note: 'Three commands and you have a working private assistant.',
        code: `# 1. A model that fits your machine (see the Section 6 lab)
ollama pull llama3.1:8b

# 2. The chat interface
docker run -d -p 3000:8080 \\
  --add-host=host.docker.internal:host-gateway \\
  -v open-webui:/app/backend/data \\
  --name open-webui \\
  ghcr.io/open-webui/open-webui:main

# 3. Open http://localhost:3000
#    Your Ollama models appear automatically under Settings → Models.
#    Enable search under Settings → Web Search (Brave or SearXNG).
#    Upload documents under Workspace → Knowledge for built-in RAG.`,
      },
      {
        label: 'MCP config',
        language: 'json',
        note: 'For file access from Claude Desktop or Claude Code. Note the explicit directory.',
        code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "E:/Project/notes"
      ]
    }
  }
}`,
      },
    ],
  },
  {
    id: 'trading',
    name: 'Trading signal agent',
    pitch: 'Scheduled market analysis producing a structured signal. The model reasons; your code decides whether anything happens.',
    difficulty: 'High',
    time: '1–2 weeks to something you would trust',
    concepts: 'Structured output, scheduled jobs, guardrails',
    sections: 'Sections 3, 4, 7',
    flow: [
      { step: 'Cron fires every 15 minutes', result: 'The pipeline wakes up' },
      { step: 'Fetch market data', result: 'Prices, volume and indicators as structured values' },
      { step: 'Format as prompt context', result: 'A compact table the model can reason over' },
      { step: 'Call the model with tool use', result: 'Enforced JSON: signal, confidence, reasoning, risk' },
      { step: 'Your code applies risk rules', result: 'Position limits, stop-loss, daily drawdown — deterministic' },
      { step: 'Execute only if every rule passes', result: 'Broker API call, or a skip with a logged reason' },
      { step: 'Log the whole decision', result: 'An audit trail you can review when it goes wrong' },
    ],
    watchOut: 'Never let the model enforce its own limits. It will occasionally return confidence 0.95 on noise. Position sizing, stop-losses and daily loss caps belong in ordinary code that cannot be talked out of them. Paper trade for weeks before risking anything.',
    code: [
      {
        label: 'Signal + guardrails',
        language: 'python',
        note: 'Note the split: the model produces an opinion, the function below decides.',
        code: `import anthropic

client = anthropic.Anthropic()

SYSTEM = """You are a quantitative analyst. Analyse the market data and
produce one signal. Base it only on the data given — do not speculate.
Default to HOLD when the evidence is mixed."""

SIGNAL_TOOL = [{
    "name": "emit_signal",
    "description": "Emit a trading signal for the analysed instrument.",
    "input_schema": {
        "type": "object",
        "properties": {
            "signal": {"type": "string", "enum": ["BUY", "SELL", "HOLD"]},
            "confidence": {"type": "number"},
            "reasoning": {"type": "string"},
            "risk_level": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH"]},
        },
        "required": ["signal", "confidence", "reasoning", "risk_level"],
    },
}]


def analyse(market_data: str) -> dict:
    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM,
        tools=SIGNAL_TOOL,
        tool_choice={"type": "tool", "name": "emit_signal"},
        messages=[{"role": "user", "content": market_data}],
    )
    return msg.content[0].input


def decide(signal: dict, portfolio) -> str:
    """Deterministic gate. The model has no say past this point."""
    if signal["signal"] == "HOLD":
        return "hold: model declined"
    if signal["confidence"] < 0.75:
        return f"skip: confidence {signal['confidence']:.2f} below threshold"
    if portfolio.daily_loss_pct() > 2.0:
        return "skip: daily loss limit reached"

    size = 0.10 if signal["risk_level"] == "LOW" else 0.05
    size = min(size, portfolio.max_position_pct())
    return execute(signal["signal"], size)`,
      },
    ],
  },
  {
    id: 'content',
    name: 'Content pipeline',
    pitch: 'Topic in, finished draft out — through five focused steps rather than one hopeful prompt. Cheap models for the mechanical stages, a capable one for the writing.',
    difficulty: 'Medium',
    time: '3–6 hours',
    concepts: 'Prompt chaining, routing models by step',
    sections: 'Sections 3, 5, 7',
    flow: [
      { step: 'Brief: topic, audience, format', result: 'The constraint set for every later step' },
      { step: 'Research (cheap model + search)', result: 'Key facts, angles, recent developments' },
      { step: 'Outline (cheap model)', result: 'A structured skeleton from the research' },
      { step: 'Draft (capable model)', result: 'Full prose following the outline' },
      { step: 'Critique then revise (capable model)', result: 'Specific weaknesses found, then fixed' },
      { step: 'Format (cheap model)', result: 'Metadata, social snippets, markdown or HTML' },
    ],
    watchOut: 'The critique step only works as its own call. Asking one prompt to "write it and then improve it" produces a draft plus a paragraph claiming it was improved. Separate calls, and pass only the artefact the next step needs.',
    code: [
      {
        label: 'Pipeline',
        language: 'python',
        note: 'Each step gets its own model, sized to the difficulty of that step.',
        code: `import anthropic

client = anthropic.Anthropic()

FAST = "claude-haiku-4-5-20251001"
GOOD = "claude-sonnet-4-6"


def ask(model: str, prompt: str, system: str = "", max_tokens: int = 2000) -> str:
    msg = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=system or "Be specific and concise.",
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text


def pipeline(topic: str, audience: str, fmt: str) -> str:
    research = ask(FAST, (
        f"Research '{topic}' for {audience}. Give six concrete facts, "
        f"two non-obvious angles, and three recent developments."
    ))

    outline = ask(FAST, (
        f"Build a {fmt} outline for '{topic}'.\\n\\nResearch:\\n{research}"
    ))

    draft = ask(
        GOOD,
        f"Write the full {fmt} following this outline:\\n{outline}",
        system=f"You write for {audience}. Concrete, no filler, no throat-clearing.",
        max_tokens=4000,
    )

    # A separate call — self-critique inside one prompt does not work.
    critique = ask(GOOD, (
        f"Name the three weakest parts of this draft and why. "
        f"Do not rewrite it.\\n\\n{draft}"
    ))

    return ask(
        GOOD,
        f"Revise the draft to address this critique.\\n\\nCritique:\\n{critique}\\n\\nDraft:\\n{draft}",
        max_tokens=4000,
    )`,
      },
    ],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp bot',
    pitch: 'An AI that answers messages with a persona and remembers the thread. The clearest possible example of the webhook pattern.',
    difficulty: 'Low',
    time: '4–6 hours including Twilio setup',
    concepts: 'Webhooks, per-user session memory, persona prompts',
    sections: 'Sections 3, 7',
    flow: [
      { step: 'Twilio WhatsApp sandbox', result: 'A free test number in minutes' },
      { step: 'Webhook server (FastAPI or Express)', result: 'An endpoint Twilio can POST to' },
      { step: 'Tunnel it for local development', result: 'A public URL pointing at your laptop' },
      { step: 'Message arrives, load that thread', result: 'The last N turns for that phone number' },
      { step: 'Call the model with history + persona', result: 'A reply in character and in context' },
      { step: 'Reply and append to history', result: 'The thread stays coherent next turn' },
    ],
    watchOut: 'Conversation state is per phone number, and an in-memory dict evaporates on restart. Redis or SQLite from the start costs ten minutes and saves the confusing bug where the bot forgets everyone after a deploy.',
    code: [
      {
        label: 'FastAPI bot',
        language: 'python',
        note: 'pip install fastapi uvicorn twilio anthropic',
        code: `from fastapi import FastAPI, Form
from twilio.twiml.messaging_response import MessagingResponse
import anthropic

app = FastAPI()
client = anthropic.Anthropic()

# In production this must outlive the process — Redis or SQLite.
conversations: dict[str, list[dict]] = {}

PERSONA = """You are Aria, a friendly assistant replying over WhatsApp.
Keep replies under 200 characters where you can. Never send a wall of text.
If you do not know something, say so in one short sentence."""


@app.post("/webhook")
async def whatsapp(From: str = Form(...), Body: str = Form(...)):
    history = conversations.setdefault(From, [])
    history.append({"role": "user", "content": Body.strip()})

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=400,
        system=PERSONA,
        messages=history[-10:],   # Bound the context, and the bill.
    )

    reply = response.content[0].text
    history.append({"role": "assistant", "content": reply})

    twiml = MessagingResponse()
    twiml.message(reply)
    return str(twiml)

# uvicorn main:app --reload --port 8000
# npx localtunnel --port 8000   → register that URL in Twilio`,
      },
    ],
  },
  {
    id: 'knowledge',
    name: 'Personal knowledge assistant',
    pitch: 'Chat with your own notes, PDFs and bookmarks. The "second brain" build — and the fastest one to get working, because a no-code path exists.',
    difficulty: 'Medium',
    time: '30 minutes no-code, 4–8 hours custom',
    concepts: 'RAG, embeddings, chunking strategy',
    sections: 'Sections 2, 7',
    flow: [
      { step: 'Drop files into a watched folder', result: 'The ingest script notices new documents' },
      { step: 'Extract text and chunk it', result: 'Overlapping passages of ~500–800 tokens' },
      { step: 'Embed each chunk locally', result: 'A vector per chunk, nothing sent anywhere' },
      { step: 'Store in Chroma with metadata', result: 'A searchable index that knows each chunk\'s source' },
      { step: 'A question arrives', result: 'Embed it, retrieve the closest chunks' },
      { step: 'Answer from the retrieved text only', result: 'A grounded reply that can cite its sources' },
    ],
    watchOut: 'Chunking decides whether this works. Split mid-sentence and facts get orphaned from their subject; make chunks too large and the embedding averages several topics into something that matches nothing. Split on paragraphs with overlap, and read a sample of your chunks before trusting the index.',
    code: [
      {
        label: 'No-code path',
        language: 'bash',
        note: 'Genuinely the fastest route. Do this first and only build custom if it falls short.',
        code: `# Open WebUI has RAG built in — no code at all.

# 1. Open WebUI running (see the Personal Assistant blueprint)
#    http://localhost:3000

# 2. Workspace → Knowledge → Create
#    Name it, e.g. "Notes"

# 3. Upload PDFs, markdown, text files or URLs.
#    Embedding happens automatically, locally.

# 4. In a chat, press "+" and attach the knowledge base.
#    Every message now searches your documents first.`,
      },
      {
        label: 'Custom ingest',
        language: 'python',
        note: 'Fully local — the embedding model runs on your machine, nothing is uploaded.',
        code: `from pathlib import Path
import chromadb
from sentence_transformers import SentenceTransformer

embedder = SentenceTransformer("all-MiniLM-L6-v2")
db = chromadb.PersistentClient(path="./knowledge_db")
collection = db.get_or_create_collection("notes")


def chunk(text: str, size: int = 700, overlap: int = 100) -> list[str]:
    paragraphs = [p.strip() for p in text.split("\\n\\n") if p.strip()]
    chunks, current = [], ""
    for para in paragraphs:
        if len(current) + len(para) <= size:
            current += ("\\n\\n" if current else "") + para
        else:
            if current:
                chunks.append(current)
            current = (current[-overlap:] + "\\n\\n" + para) if current else para
    if current:
        chunks.append(current)
    return chunks


def ingest(folder: str) -> None:
    for path in Path(folder).rglob("*.md"):
        pieces = chunk(path.read_text(encoding="utf-8"))
        collection.add(
            documents=pieces,
            embeddings=embedder.encode(pieces).tolist(),
            # Metadata is what lets an answer cite its source.
            metadatas=[{"source": str(path)} for _ in pieces],
            ids=[f"{path.stem}-{i}" for i in range(len(pieces))],
        )
        print(f"{path.name}: {len(pieces)} chunks")


ingest("./notes")`,
      },
    ],
  },
]

export default function Section08() {
  return (
    <SectionShell id="section-8">
      <SectionHeader
        number={8}
        title="Project Blueprints"
        subtitle="Five projects you can actually finish, each built from the patterns in Section 7. Open one, read how it works, take the code."
      />

      <Subsection title="Pick one and finish it" icon={<Rocket className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Reading five blueprints teaches you less than shipping one. If you are unsure, start with
          the knowledge assistant — the no-code path gets you something working in half an hour.
        </Takeaway>

        <InfoCallout type="tip">
          <strong>Every one of these is the same three moves:</strong> get data in, ask the model
          something specific about it, act on a structured answer. The projects differ only in where
          the data comes from and what "act" means.
        </InfoCallout>
      </Subsection>

      <Subsection title="The blueprints" icon={<Hammer className="w-4 h-4 text-violet-500" />}>
        {BLUEPRINTS.map((bp, i) => (
          <ProjectBlueprint key={bp.id} bp={bp} defaultOpen={i === 0} />
        ))}
      </Subsection>

      <Subsection title="The rule that runs through all five" icon={<Rocket className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The model reasons. Your code decides, executes and handles errors. Every blueprint above
          puts a deterministic gate between the model's opinion and anything irreversible.
        </Takeaway>

        <Points items={[
          <><strong>Trading agent:</strong> the model suggests a signal; Python checks position limits and daily loss before anything trades.</>,
          <><strong>WhatsApp bot:</strong> the model drafts a reply; your code bounds history length and cost.</>,
          <><strong>Content pipeline:</strong> the model writes; your code decides which model handles which step.</>,
          <><strong>Knowledge assistant:</strong> the model answers; your retrieval decides what it is allowed to answer from.</>,
        ]} />

        <Example label="If you remember one thing from this section">
          Anything the model gets wrong should cost you a log line, not money, data or a sent message.
          Put ordinary code in that gap.
        </Example>
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'Why must the trading agent\'s risk rules live in Python rather than the system prompt?',
            answer: 'Because a prompt is a request and code is a guarantee. The model will occasionally be confidently wrong or ignore an instruction under unusual input. Position limits, stop-losses and drawdown caps must be deterministic and auditable — that means ordinary code.',
          },
          {
            question: 'Why does the content pipeline use a cheap model for research and a capable one for writing?',
            answer: 'The stages differ in difficulty. Gathering and outlining is mechanical and a cheap model does it well. Prose quality is where capability actually shows. Routing by step cuts cost substantially with no visible drop in the output.',
          },
          {
            question: 'What is the simplest multi-turn memory for a WhatsApp bot, and what is the catch?',
            answer: 'A map from phone number to a list of messages, sending the last ten with each call. The catch is that an in-memory dict dies on restart — use Redis or SQLite from the beginning.',
          },
          {
            question: 'Your knowledge assistant returns irrelevant passages. Where do you look first?',
            answer: 'Chunking. Print a sample of your chunks and read them. Mid-sentence splits and multi-topic chunks are the usual cause. After that, check you used the same embedding model for indexing and querying.',
          },
          {
            question: 'Which of these five should you build first, and why?',
            answer: 'The knowledge assistant — the no-code Open WebUI path is done in half an hour and immediately useful. Something finished teaches more than four things started.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Blueprint quick reference" items={[
        { label: 'Personal assistant', value: 'Ollama + Open WebUI + MCP (filesystem, search)' },
        { label: 'Trading agent', value: 'Cron + market data + tool-use signal + deterministic risk gate' },
        { label: 'Content pipeline', value: 'Chain: research → outline → draft → critique → revise' },
        { label: 'WhatsApp bot', value: 'Twilio + FastAPI webhook + per-phone history + persona' },
        { label: 'Knowledge assistant', value: 'Chroma + sentence-transformers + RAG, fully local' },
        { label: 'Fastest start', value: 'Open WebUI knowledge collections — 30 minutes, no code' },
        { label: 'The rule', value: 'The model reasons. Your code decides, acts and handles errors.' },
      ]} />
    </SectionShell>
  )
}
