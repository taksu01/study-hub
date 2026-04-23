import {
  SectionShell, SectionHeader, Subsection, Prose,
  InteractiveFlowMap, ExpandableCardGrid, CompareTable,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout, CauseEffectChain
} from '../components/ui'

export default function Section07() {
  return (
    <SectionShell id="section-7">
      <SectionHeader
        number={7}
        title="Integration Patterns"
        subtitle="How to connect AI to your applications, data, and workflows. The building blocks of everything in Section 8."
      />

      <Subsection title="The Four Core Integration Patterns">
        <Prose>
          <p>Every AI integration — no matter how complex — is built from a small set of patterns. Learn these and you can understand any AI application, then build your own.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          nodes={[
            { id: 'direct', label: 'Direct API Call', description: 'Your code calls the AI API with a prompt, gets a response. The simplest pattern. Good for: transformations, generation, classification, analysis of provided data.', color: 'blue' },
            { id: 'rag', label: 'RAG', description: 'Retrieval Augmented Generation. Before calling the AI, you search your knowledge base for relevant documents and include them in the prompt. The AI answers from your data, not just its training.', color: 'purple' },
            { id: 'webhook', label: 'Webhook/Event', description: 'An external event triggers an AI workflow. A message arrives on WhatsApp → webhook fires → AI processes it → responds. Event-driven architecture for reactive agents.', color: 'orange' },
            { id: 'scheduled', label: 'Scheduled Job', description: 'AI runs on a cron schedule. Every morning at 8am → fetch market data → AI analyzes → send report. For monitoring, reporting, and autonomous agents.', color: 'green' },
            { id: 'streaming', label: 'Streaming UX', description: 'Tokens arrive as they\'re generated, giving the user immediate feedback. Critical for chat interfaces. Uses server-sent events (SSE) or WebSockets between your server and the browser.', color: 'teal' },
          ]}
        />
      </Subsection>

      <Subsection title="Pattern 1: Direct API Call">
        <Prose>
          <p>The foundation. You send a prompt to the AI API and receive a response. Most applications start here.</p>
        </Prose>
        <TryThisCallout
          title="Python — Anthropic SDK (copy and run)"
          prompt={`# pip install anthropic
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful assistant that responds concisely.",
    messages=[
        {"role": "user", "content": "Explain what RAG is in 2 sentences."}
    ]
)

print(message.content[0].text)`}
        />
        <TryThisCallout
          title="JavaScript — Anthropic SDK"
          prompt={`// npm install @anthropic-ai/sdk
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: 'your-api-key' });

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: 'You are a helpful assistant that responds concisely.',
  messages: [
    { role: 'user', content: 'Explain what RAG is in 2 sentences.' }
  ]
});

console.log(message.content[0].text);`}
        />
        <TryThisCallout
          title="Ollama (local model — same OpenAI format)"
          prompt={`# pip install openai
from openai import OpenAI

# Point to local Ollama — same SDK, just different base_url
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Hello from local AI!"}]
)

print(response.choices[0].message.content)`}
        />
      </Subsection>

      <Subsection title="Pattern 2: RAG — Chat With Your Own Data">
        <Prose>
          <p>RAG (Retrieval Augmented Generation) lets you build AI that knows about your specific data — your documents, your database, your notes — without fine-tuning a model.</p>
          <p>The idea: before calling the AI, you search for relevant information and include it in the prompt. The AI then answers based on that retrieved context rather than just its training data. This eliminates hallucination for domain-specific questions and keeps answers up-to-date.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'Load your docs (PDF, CSV, text)', effect: 'Split into chunks (~500-1000 tokens each)' },
          { cause: 'Embed each chunk', effect: 'Get a vector (list of numbers) per chunk' },
          { cause: 'Store in vector DB', effect: 'ChromaDB / Qdrant / Pinecone stores vectors' },
          { cause: 'User asks a question', effect: 'Embed the question → find similar chunks' },
          { cause: 'Retrieve top-k chunks', effect: 'Build a prompt: "Context: [chunks]. Question: [user query]"' },
          { cause: 'Call LLM with context', effect: 'Model answers from YOUR data, grounded in fact' },
        ]} />
        <TryThisCallout
          title="Minimal RAG in Python (no framework)"
          prompt={`# pip install anthropic chromadb sentence-transformers

import chromadb
from sentence_transformers import SentenceTransformer
import anthropic

# Setup
embedder = SentenceTransformer('all-MiniLM-L6-v2')
db = chromadb.Client()
collection = db.create_collection("my_docs")

# Ingest documents
docs = [
    "The company was founded in 2020 in Singapore.",
    "Our product pricing is $29/month for the starter plan.",
    "Support is available 24/7 via email at support@example.com.",
]
embeddings = embedder.encode(docs).tolist()
collection.add(documents=docs, embeddings=embeddings, ids=["doc1","doc2","doc3"])

# Query
question = "What is the support email?"
q_embedding = embedder.encode([question]).tolist()
results = collection.query(query_embeddings=q_embedding, n_results=2)
context = "\\n".join(results["documents"][0])

# Ask AI with context
client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=512,
    messages=[{
        "role": "user",
        "content": f"Context:\\n{context}\\n\\nQuestion: {question}"
    }]
)
print(msg.content[0].text)`}
        />
      </Subsection>

      <Subsection title="Pattern 3: Webhook-Triggered AI">
        <Prose>
          <p>Many real-world AI applications are event-driven: something happens in the outside world, it hits your webhook, your server runs AI processing, and an action is taken. WhatsApp bots, GitHub PR reviewers, email assistants — all webhooks.</p>
        </Prose>
        <CauseEffectChain chain={[
          { cause: 'External event (message, payment, commit)', effect: 'Platform sends HTTP POST to your webhook URL' },
          { cause: 'Your server receives the payload', effect: 'Extract relevant data from the JSON body' },
          { cause: 'Call AI API with the data', effect: 'Process: classify, respond, analyze, transform' },
          { cause: 'AI returns structured response', effect: 'Your server takes action (reply, update DB, send notification)' },
        ]} />
        <InfoCallout type="info">
          <strong>For local development:</strong> Use ngrok or localtunnel to expose your localhost to the internet so webhook providers can reach your development server. <code>npx localtunnel --port 3000</code>
        </InfoCallout>
      </Subsection>

      <Subsection title="Pattern 4: n8n — Visual AI Automation">
        <Prose>
          <p>For workflows that connect multiple services, n8n lets you build AI pipelines visually. You drag nodes onto a canvas, connect them, and your workflow runs. No complex coding needed for the plumbing — just configure the nodes.</p>
        </Prose>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'n8n AI Agent Node',
            subtitle: 'The core AI building block',
            content: 'A configurable LLM node with tool support. Point it at Claude, GPT-4, or Ollama.',
            details: 'The AI Agent node in n8n handles the full agent loop internally. You configure: which model to use, the system prompt, which tools are available (other n8n nodes), and memory settings. You can chain multiple agents or use tools like HTTP Request, database queries, and any n8n integration as agent tools.',
            tags: ['LangChain under hood', 'Visual config'],
            color: 'orange',
          },
          {
            title: 'Common n8n Workflow Patterns',
            subtitle: 'What people actually build',
            content: 'Webhook → AI classify/respond → Action. Schedule → fetch data → AI analyze → notify.',
            details: 'Real examples:\n• Receive WhatsApp message → AI classify intent → route to appropriate response\n• Every morning: fetch news → AI summarize → post to Slack\n• GitHub PR opened → AI review code → comment on PR\n• Customer email → AI draft reply → send to support agent for approval\n• Monitor RSS feeds → AI extract insights → save to Notion',
            tags: ['Webhook', 'Scheduled', 'Routing'],
            color: 'green',
          },
        ]} />
        <TryThisCallout
          title="n8n: Install and Access Locally"
          prompt={`# Self-host with Docker (free forever)
docker run -it --rm --name n8n -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n

# Access at: http://localhost:5678
# Sign up with a local account (no cloud account needed)

# To connect n8n to Claude:
# 1. Add a Credential: Credentials → New → Anthropic API
# 2. Paste your Anthropic API key
# 3. In any AI node, select "Claude" and your credential
# 4. For Ollama: use "OpenAI" credential type with base URL = http://host.docker.internal:11434/v1`}
        />
      </Subsection>

      <Subsection title="Structured Output — Making AI API-Friendly">
        <Prose>
          <p>When AI output goes into code (parsed, stored, acted upon), you need it in a predictable format. The two approaches: prompt-based (ask for JSON) or schema-based (use tool calling / function calling to enforce a schema).</p>
        </Prose>
        <CompareTable
          headers={['Prompt-based JSON', 'Tool/Function Calling']}
          rows={[
            { attribute: 'How it works', values: ['"Reply only in JSON: {key: value}"', 'Define a JSON schema. Model MUST use it.'] },
            { attribute: 'Reliability', values: ['~90% — model can still add prose', '99%+ — schema is enforced'] },
            { attribute: 'Ease', values: ['Simple — just a prompt instruction', 'Requires schema definition'] },
            { attribute: 'Best for', values: ['Prototyping, simple extractions', 'Production systems, complex schemas'] },
            { attribute: 'Claude API', values: ['Any model', 'Use tools parameter with JSON schema'] },
          ]}
        />
        <TryThisCallout
          title="Structured Output with Claude Tool Use"
          prompt={`import anthropic
import json

client = anthropic.Anthropic()

# Define the schema you want
tools = [{
    "name": "extract_product_info",
    "description": "Extract product information from text",
    "input_schema": {
        "type": "object",
        "properties": {
            "product_name": {"type": "string"},
            "price": {"type": "number"},
            "in_stock": {"type": "boolean"},
            "features": {"type": "array", "items": {"type": "string"}}
        },
        "required": ["product_name", "price", "in_stock"]
    }
}]

message = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=1024,
    tools=tools,
    tool_choice={"type": "tool", "name": "extract_product_info"},
    messages=[{
        "role": "user",
        "content": "Product: ProCam X5. Price: $299.99. Currently available. Features: 4K video, waterproof, 12hr battery."
    }]
)

# Get the structured output
result = message.content[0].input
print(json.dumps(result, indent=2))`}
        />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What is RAG and when should you use it instead of just asking the AI?', answer: 'RAG = Retrieval Augmented Generation. Embed documents, search for relevant chunks at query time, include them in the prompt. Use RAG when you need the AI to answer from your specific data (documents, database) rather than just its training. It eliminates hallucination for domain-specific facts.' },
          { question: 'You\'re building a system where an LLM\'s response will be parsed as JSON by your code. What\'s the most reliable approach?', answer: 'Use tool calling / function calling with a JSON schema. This forces the model to output valid JSON matching your schema — more reliable than just asking for JSON in the prompt.' },
          { question: 'You want to build a bot that responds to WhatsApp messages using AI. What integration pattern is this?', answer: 'Webhook pattern. WhatsApp (via Twilio or similar) sends an HTTP POST to your webhook URL when a message arrives. Your server processes it with an AI API and calls the messaging API to reply.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 7 Summary" items={[
        { label: 'Direct API', value: 'Simplest pattern. Prompt in → response out. Use Anthropic or OpenAI SDK.' },
        { label: 'RAG', value: 'Embed docs → vector DB → retrieve at query time → include in prompt.' },
        { label: 'Webhook', value: 'External event → HTTP POST → AI process → action. (WhatsApp, GitHub, etc.)' },
        { label: 'Scheduled job', value: 'Cron triggers AI. Monitoring, reports, autonomous agents.' },
        { label: 'n8n', value: 'Visual automation. Self-host free. 400+ integrations + AI nodes.' },
        { label: 'Tool calling', value: 'Enforces JSON schema output. More reliable than prompt-based JSON.' },
        { label: 'Ollama local', value: 'Use openai SDK, set base_url="http://localhost:11434/v1"' },
        { label: 'Vector DB options', value: 'ChromaDB (local, simple), Qdrant (production), Pinecone (cloud)' },
      ]} />
    </SectionShell>
  )
}
