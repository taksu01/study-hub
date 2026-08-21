import { Plug, Database, Webhook, Workflow, Braces, HelpCircle, AlertTriangle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  ExpandableCardGrid, CompareTable, MiniRecallBlock, CheatSheetPanel,
  InfoCallout, CauseEffectChain, CommonConfusionBlock,
} from '../components/ui'
import { RagPipelineLab } from '../components/viz/RagPipelineLab'
import { CodeBlock, Code } from '../components/CodeBlock'

export default function Section07() {
  return (
    <SectionShell id="section-7">
      <SectionHeader
        number={7}
        title="Integration Patterns"
        subtitle="Four patterns cover nearly every AI feature you will ever build. Everything in Section 8 is these, combined."
      />

      <Subsection title="The four patterns" icon={<Plug className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Before writing anything, decide which of these you actually need. Most projects that felt
          complicated were the wrong pattern applied to a simple problem.
        </Takeaway>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            {
              n: 1, name: 'Direct call', colour: 'border-blue-200 bg-blue-50',
              shape: 'Your code → API → response',
              use: 'Transform, generate, classify, analyse something you already have.',
            },
            {
              n: 2, name: 'RAG', colour: 'border-violet-200 bg-violet-50',
              shape: 'Search your data → inject → API → response',
              use: 'The model needs to answer from documents it was never trained on.',
            },
            {
              n: 3, name: 'Webhook', colour: 'border-amber-200 bg-amber-50',
              shape: 'External event → your server → API → action',
              use: 'Something happens elsewhere and the AI should react. Bots, PR reviewers.',
            },
            {
              n: 4, name: 'Scheduled', colour: 'border-emerald-200 bg-emerald-50',
              shape: 'Cron → fetch → API → deliver',
              use: 'Nothing triggers it but the clock. Reports, monitoring, digests.',
            },
          ].map(p => (
            // min-w-0: without it the grid track sizes to the code line's
            // intrinsic width and pushes the whole page sideways on mobile.
            <div key={p.n} className={`rounded-xl border p-4 min-w-0 ${p.colour}`}>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-400">{p.n}</span>
                <h4 className="text-sm font-semibold text-slate-800">{p.name}</h4>
              </div>
              <code className="block text-[13px] font-mono text-slate-600 bg-white/70 rounded-md px-2 py-1 mb-2 overflow-x-auto whitespace-nowrap">
                {p.shape}
              </code>
              <p className="text-sm text-slate-600 leading-relaxed">{p.use}</p>
            </div>
          ))}
        </div>

        <InfoCallout type="tip">
          <strong>Streaming is not a fifth pattern.</strong> It is a delivery detail you can add to
          any of the four — tokens arrive as they are generated instead of all at once. Same total
          time, dramatically better perceived speed. Use it for anything a human watches.
        </InfoCallout>
      </Subsection>

      <Subsection title="Pattern 1 — Direct call" icon={<Plug className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The foundation, and further than most projects need to go. If your problem fits here, stop
          here.
        </Takeaway>

        <CodeBlock tabs={[
          {
            label: 'Python',
            language: 'python',
            note: 'pip install anthropic — set ANTHROPIC_API_KEY in the environment, never in the source.',
            code: `import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful assistant. Be concise.",
    messages=[
        {"role": "user", "content": "Explain what RAG is in two sentences."}
    ],
)

print(message.content[0].text)`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            note: 'npm install @anthropic-ai/sdk',
            code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()  // reads ANTHROPIC_API_KEY from env

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: 'You are a helpful assistant. Be concise.',
  messages: [
    { role: 'user', content: 'Explain what RAG is in two sentences.' },
  ],
})

console.log(message.content[0].text)`,
          },
          {
            label: 'Streaming',
            language: 'python',
            note: 'Same call, incremental delivery. This is what makes a chat UI feel fast.',
            code: `with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain RAG."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# The final assembled message is still available afterwards.
final = stream.get_final_message()`,
          },
          {
            label: 'Local (Ollama)',
            language: 'python',
            note: 'Identical shape against a local model — only the base URL changes.',
            code: `from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "Hello from local AI."}],
)

print(response.choices[0].message.content)`,
          },
        ]} />

        <InfoCallout type="warning">
          <strong>Never commit an API key.</strong> Read it from the environment, keep it out of the
          browser entirely, and put the call behind your own server — a key shipped to a client is a
          key that gets scraped and spent.
        </InfoCallout>
      </Subsection>

      <Subsection title="Pattern 2 — RAG" icon={<Database className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          RAG lets a model answer from your documents without any training. Search first, paste the
          hits into the prompt, then ask. That is the entire idea — the rest is engineering.
        </Takeaway>

        <RagPipelineLab />

        <CodeBlock tabs={[
          {
            label: 'Minimal RAG',
            language: 'python',
            note: 'pip install anthropic chromadb sentence-transformers — no framework, ~30 lines.',
            code: `import chromadb
from sentence_transformers import SentenceTransformer
import anthropic

embedder = SentenceTransformer("all-MiniLM-L6-v2")
db = chromadb.Client()
collection = db.create_collection("handbook")

# ── Index time: runs once ──────────────────────────────
docs = [
    "Employees accrue 1.5 days of leave per month.",
    "Unused leave carries over up to 10 days.",
    "Leave requests need two weeks notice.",
]
collection.add(
    documents=docs,
    embeddings=embedder.encode(docs).tolist(),
    ids=[f"doc{i}" for i in range(len(docs))],
)

# ── Query time: runs per question ──────────────────────
question = "How much leave do I get?"
hits = collection.query(
    query_embeddings=embedder.encode([question]).tolist(),
    n_results=3,
)
context = "\\n".join(hits["documents"][0])

client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=512,
    # Without this instruction the model falls back on training data.
    system=(
        "Answer only from the context provided. "
        "If the answer is not in the context, say you do not know."
    ),
    messages=[{
        "role": "user",
        "content": f"Context:\\n{context}\\n\\nQuestion: {question}",
    }],
)
print(msg.content[0].text)`,
          },
          {
            label: 'Chunking',
            language: 'python',
            note: 'Where most RAG projects actually fail. Overlap keeps sentences from being cut in half.',
            code: `def chunk(text: str, size: int = 600, overlap: int = 80) -> list[str]:
    """Split on paragraph boundaries, packing up to ~size characters.

    Overlap carries the tail of one chunk into the head of the next so a
    fact that straddles a boundary survives in at least one chunk intact.
    """
    paragraphs = [p.strip() for p in text.split("\\n\\n") if p.strip()]
    chunks: list[str] = []
    current = ""

    for para in paragraphs:
        if len(current) + len(para) <= size:
            current += ("\\n\\n" if current else "") + para
        else:
            if current:
                chunks.append(current)
            # Carry the overlap forward, not the whole previous chunk.
            current = current[-overlap:] + "\\n\\n" + para if current else para

    if current:
        chunks.append(current)
    return chunks`,
          },
        ]} />

        <Points items={[
          <><strong>Same embedding model both times.</strong> Index and query must match, or the distances mean nothing and search silently returns junk.</>,
          <><strong>Store the text next to the vector.</strong> A vector cannot be turned back into words.</>,
          <><strong>Instruct the model to abstain.</strong> "Say you do not know if it is not in the context" is the line that stops confident invention.</>,
          <><strong>Return citations.</strong> Include chunk IDs so a user can check the source — this is most of RAG's practical value.</>,
        ]} />

        <Example label="When RAG is the wrong tool">
          If the whole corpus fits in the context window — a 40-page handbook is ~30k tokens — just
          paste it in. RAG is what you do when the data is too big for that, not a rite of passage.
        </Example>
      </Subsection>

      <Subsection title="Pattern 3 — Webhook" icon={<Webhook className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Something happens in the outside world, it POSTs to your URL, you run the AI, you act.
          Every messaging bot and PR reviewer is this shape.
        </Takeaway>

        <CauseEffectChain chain={[
          { cause: 'Event happens (message, commit, payment)', effect: 'Platform POSTs JSON to your webhook URL' },
          { cause: 'Your server receives it', effect: 'Verify the signature, extract the payload, acknowledge fast' },
          { cause: 'Process with the AI', effect: 'Classify, draft, analyse — in a background task, not inline' },
          { cause: 'AI returns a result', effect: 'Reply, write to the database, notify a human' },
        ]} />

        <CodeBlock tabs={[
          {
            label: 'FastAPI webhook',
            language: 'python',
            note: 'The 200 goes back immediately; the AI call runs after. Most platforms time out in 5–10s.',
            code: `from fastapi import BackgroundTasks, FastAPI, Request
import anthropic

app = FastAPI()
client = anthropic.Anthropic()


@app.post("/webhook")
async def receive(req: Request, background: BackgroundTasks):
    payload = await req.json()

    text = payload.get("message", {}).get("text", "")
    sender = payload.get("message", {}).get("from", "")

    # Acknowledge now, think later — the platform will retry if we stall.
    background.add_task(handle, sender, text)
    return {"ok": True}


def handle(sender: str, text: str) -> None:
    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system="You are a concise support assistant. Two sentences maximum.",
        messages=[{"role": "user", "content": text}],
    )
    send_reply(sender, msg.content[0].text)`,
          },
        ]} />

        <InfoCallout type="info">
          <strong>Testing locally:</strong> webhook providers cannot reach <Code>localhost</Code>.
          Tunnel it — <Code>npx localtunnel --port 8000</Code> or <Code>ngrok http 8000</Code> — and
          register the public URL it prints.
        </InfoCallout>
      </Subsection>

      <Subsection title="Pattern 4 — Scheduled, and n8n" icon={<Workflow className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          When the only trigger is the clock, the plumbing is the whole job — and a visual tool beats
          code for plumbing.
        </Takeaway>

        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'n8n AI Agent node', subtitle: 'The agent loop, configured not coded', color: 'orange',
            content: 'Pick a model, write the system prompt, tick which other nodes count as tools.',
            points: [
              'Works with Claude, OpenAI, or Ollama',
              'Any n8n integration can be exposed to the agent as a tool',
              'Memory and iteration limits are settings, not code',
            ],
            tags: ['Visual config'],
          },
          {
            title: 'What people actually build', subtitle: 'The five workflows that recur', color: 'green',
            content: 'Almost every real n8n AI workflow is a variation of these.',
            points: [
              'Inbound message → classify intent → route to a reply',
              'Every morning → fetch news → summarise → post to Slack',
              'PR opened → review the diff → comment',
              'Customer email → draft a reply → queue for human approval',
              'RSS feeds → extract insights → save to Notion',
            ],
            tags: ['Webhook', 'Cron'],
          },
        ]} />

        <CodeBlock tabs={[
          {
            label: 'Self-host n8n',
            language: 'bash',
            note: 'Free forever when self-hosted. Data stays on your machine.',
            code: `docker run -it --rm --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n

# Open http://localhost:5678 and create a local account.
#
# To use Claude:  Credentials → New → Anthropic API → paste your key
# To use Ollama:  use the OpenAI credential type with
#                 base URL http://host.docker.internal:11434/v1`,
          },
          {
            label: 'Or just cron it',
            language: 'python',
            note: 'A scheduled job does not need a platform. Sometimes this is the whole answer.',
            code: `# daily_brief.py — run from cron or Task Scheduler
import anthropic

client = anthropic.Anthropic()


def main() -> None:
    headlines = fetch_headlines()          # your own function
    prices = fetch_portfolio()             # your own function

    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=800,
        system=(
            "You write a morning brief. Five bullets, no preamble. "
            "Lead with anything that changed materially overnight."
        ),
        messages=[{
            "role": "user",
            "content": f"Headlines:\\n{headlines}\\n\\nPortfolio:\\n{prices}",
        }],
    )
    deliver(msg.content[0].text)           # email, Slack, a file


if __name__ == "__main__":
    main()`,
          },
        ]} />
      </Subsection>

      <Subsection title="Structured output — making the response parseable" icon={<Braces className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The moment code consumes the output, "usually valid JSON" is a bug waiting for production.
          Tool use turns a request into a guarantee.
        </Takeaway>

        <CompareTable
          headers={['Asking for JSON', 'Tool / function calling']}
          rows={[
            { attribute: 'How', values: ['"Reply only in JSON: { … }"', 'Define a JSON schema; the model must fill it'] },
            { attribute: 'Reliability', values: ['Good, not guaranteed — prose and code fences leak in', 'Effectively guaranteed — the shape is enforced'] },
            { attribute: 'Effort', values: ['One line of prompt', 'A schema definition'] },
            { attribute: 'Use for', values: ['Prototypes and one-off extraction', 'Anything running unattended'] },
          ]}
        />

        <CodeBlock tabs={[
          {
            label: 'Enforced schema',
            language: 'python',
            note: 'tool_choice forces this exact tool, so the reply is always the schema — never prose.',
            code: `import json
import anthropic

client = anthropic.Anthropic()

tools = [{
    "name": "extract_product",
    "description": "Extract structured product information from text.",
    "input_schema": {
        "type": "object",
        "properties": {
            "product_name": {"type": "string"},
            "price": {"type": "number"},
            "in_stock": {"type": "boolean"},
            "features": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["product_name", "price", "in_stock"],
    },
}]

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    # Without this the model may answer in prose instead of calling the tool.
    tool_choice={"type": "tool", "name": "extract_product"},
    messages=[{
        "role": "user",
        "content": (
            "Product: ProCam X5. Price: $299.99. Currently available. "
            "Features: 4K video, waterproof, 12hr battery."
        ),
    }],
)

result = message.content[0].input   # already a dict, no parsing needed
print(json.dumps(result, indent=2))`,
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Needing RAG',
            itemB: 'Having a lot of text',
            explanation: 'If the corpus fits in the context window, pasting it in is simpler, more accurate and easier to debug. RAG exists for data that will not fit — not as a badge of seriousness.',
            fix: 'Count the tokens first. Under ~100k? Just paste it.',
          },
          {
            itemA: 'A slow webhook handler',
            itemB: 'An acceptable webhook handler',
            explanation: 'Most platforms time out in 5–10 seconds and then retry, so a slow handler produces duplicate processing rather than a late reply.',
            fix: 'Return 200 immediately, do the AI work in the background.',
          },
          {
            itemA: 'Prompting for JSON',
            itemB: 'Guaranteeing JSON',
            explanation: 'Asking works most of the time. Most of the time is not a contract — you will get a markdown fence or a polite sentence eventually, at 3am.',
            fix: 'Tool use with tool_choice for anything unattended.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'What is RAG, and when should you use it over just asking?',
            answer: 'Search your documents for relevant chunks, paste them into the prompt, then ask. Use it when the model must answer from data it was never trained on and that data is too large to paste wholesale. It also lets you show citations.',
          },
          {
            question: 'Your code parses the model\'s JSON response and breaks intermittently. Fix?',
            answer: 'Switch from asking for JSON to tool use with an input_schema and tool_choice pinned to that tool. The shape is then enforced rather than requested.',
          },
          {
            question: 'A WhatsApp bot that answers with AI — which pattern, and what is the trap?',
            answer: 'Webhook. The trap is doing the AI call inline: the platform times out after a few seconds and retries, so you process the same message twice. Acknowledge immediately and handle it in the background.',
          },
          {
            question: 'Your RAG system confidently answers questions the documents do not cover. Why?',
            answer: 'No abstention instruction. Without an explicit "if it is not in the context, say you do not know", the model falls back on training data. Add that line, and consider a relevance threshold on retrieval.',
          },
          {
            question: 'You indexed with one embedding model and queried with another. What happens?',
            answer: 'Silently wrong results. The vectors live in different spaces, so "nearest" is meaningless. Nothing errors — you just get irrelevant chunks and confident nonsense.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 7 in nine lines" items={[
        { label: 'Direct call', value: 'Prompt in, response out. Where most projects should stop.' },
        { label: 'RAG', value: 'Chunk → embed → store → retrieve → inject → ask.' },
        { label: 'RAG rule 1', value: 'Same embedding model for indexing and querying. Always.' },
        { label: 'RAG rule 2', value: 'Tell it to say "I do not know". Otherwise it invents.' },
        { label: 'Webhook', value: 'Return 200 fast, process in the background, verify signatures.' },
        { label: 'Scheduled', value: 'Cron plus a script. n8n if the plumbing is the hard part.' },
        { label: 'Streaming', value: 'Not a pattern — a delivery mode. Use it wherever a human waits.' },
        { label: 'Structured output', value: 'Tool use with tool_choice. Enforced beats requested.' },
        { label: 'Vector stores', value: 'Chroma to learn · Qdrant or pgvector for production · Pinecone hosted.' },
      ]} />
    </SectionShell>
  )
}
