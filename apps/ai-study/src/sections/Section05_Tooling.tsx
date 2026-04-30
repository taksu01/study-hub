import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, CompareTable, TermsMemoryBlock,
  CommonConfusionBlock, MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout
} from '../components/ui'

export default function Section05() {
  return (
    <SectionShell id="section-5">
      <SectionHeader
        number={5}
        title="The Tooling Ecosystem"
        subtitle="MCP, APIs, Skills, orchestration frameworks — the connective tissue between AI models and the real world."
      />

      <Subsection title="MCP — The USB Port for AI">
        <Prose>
          <p>Before MCP (Model Context Protocol), every AI tool had its own proprietary way of accessing external resources. Claude had one system. OpenAI had another. LangChain had its own. Building integrations meant writing custom code for each combination — the fragmentation tax.</p>
          <p>MCP is an open standard — proposed by Anthropic in November 2024 and since adopted industry-wide by OpenAI, Google DeepMind, Microsoft Copilot, and thousands of community contributors. It works like USB: a universal connector. Any AI client that speaks MCP can use any MCP server, regardless of who built either side. An MCP server is a small program that exposes tools (functions the AI can call) and resources (data the AI can read) over a standard protocol.</p>
        </Prose>
        <InfoCallout type="info">
          <strong>Why MCP matters to you:</strong> As a developer, MCP means you can give Claude (or any MCP-compatible AI) access to your filesystem, GitHub, databases, calendars, Slack, or any custom tool — without writing any AI-specific code. You just point the AI client at an MCP server and it uses that tool automatically. The same MCP server works with Claude, GPT-4o, and any future MCP client.
        </InfoCallout>
        <div className="mt-6" />
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Filesystem MCP',
            subtitle: 'Read/write local files',
            content: 'Gives the AI access to read and write files on your machine within specified directories.',
            details: 'Built into Claude Code. Lets Claude read your project files, write new files, and understand your codebase structure. You control which directories are accessible — never give root access. The most common MCP server for development workflows.',
            tags: ['Built-in', 'Sandboxed paths'],
            color: 'blue',
          },
          {
            title: 'Web Search MCP',
            subtitle: 'Real-time internet access',
            content: 'Lets the AI search the web for current information beyond its training cutoff.',
            details: 'Popular options: Brave Search MCP, Tavily MCP. The model decides what to search, the MCP server calls the search API, results come back as structured text. Essential for: current documentation, recent events, prices, any information that changes over time.',
            tags: ['Brave, Tavily', 'Real-time data'],
            color: 'green',
          },
          {
            title: 'GitHub MCP',
            subtitle: 'Repository access',
            content: 'Read repositories, issues, pull requests, and code without leaving your AI chat.',
            details: 'Can list repos, read file contents, search code, check issues and PRs. Useful for: having Claude review a specific PR, understanding an open-source library you\'re using, searching for examples across your organization\'s repos.',
            tags: ['Repos', 'Issues', 'PRs'],
            color: 'purple',
          },
          {
            title: 'Database MCP',
            subtitle: 'Query your data',
            content: 'Give the AI read (and optionally write) access to SQLite, PostgreSQL, or other databases.',
            details: 'The AI can run SQL queries, understand your schema, and reason about your data. Useful for: exploratory data analysis, debugging data issues, generating reports. Give read-only access in production — never write access to live databases from an AI agent.',
            tags: ['SQL queries', 'Schema understanding'],
            color: 'orange',
          },
          {
            title: 'Calendar / Email MCP',
            subtitle: 'Personal productivity',
            content: 'Connect Google Calendar, Gmail, or Outlook so the AI can read and manage your schedule.',
            details: 'Lets an AI assistant actually check your availability, schedule meetings, draft emails, and summarize your inbox. This is how you start building a genuine personal assistant — the AI needs these connections to act on your behalf.',
            tags: ['Google, Outlook', 'Personal assistant'],
            color: 'teal',
          },
          {
            title: 'Custom MCP Server',
            subtitle: 'Build your own tool',
            content: 'Any function can be an MCP server. Expose your own APIs, databases, or business logic.',
            details: 'MCP servers are just programs (Node.js or Python) that implement the MCP protocol. You can wrap any API, any database, any service. Example: build an MCP server that reads from your trading platform\'s API — then Claude can query live portfolio data during analysis.',
            tags: ['Node.js / Python', 'Any API'],
            color: 'pink',
          },
        ]} />

        <TryThisCallout
          title="Try: Add an MCP Server to Claude Code"
          prompt={`# How to add Brave Search MCP to Claude Code

1. Open your Claude Code settings file:
   Windows: %APPDATA%\\Claude\\claude_desktop_config.json
   Mac: ~/Library/Application Support/Claude/claude_desktop_config.json

2. Add this to the "mcpServers" section:
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      }
    }
  }
}

3. Restart Claude Code — it will now use Brave Search automatically
   when it needs to look up current information.

Get your free Brave Search API key at: api.search.brave.com`}
        />
      </Subsection>

      <Subsection title="Claude Code Skills — Custom Slash Commands">
        <Prose>
          <p>Skills in Claude Code are reusable slash commands that give Claude specialized capabilities for specific workflows. When you type <code>/review</code>, Claude doesn't just know what that means — there's an actual prompt template and logic behind it that gets loaded.</p>
          <p>Built-in skills include: <code>/review</code> (code review), <code>/security-review</code>, <code>/init</code> (initialize CLAUDE.md). But you can create your own — write a markdown file with a system prompt and your slash command is ready.</p>
        </Prose>
        <InfoCallout type="tip">
          Custom skills are powerful for repetitive workflows: <code>/deploy</code> that runs your specific deployment script, <code>/debug</code> that follows your team's debugging process, <code>/pr</code> that drafts PRs in your organization's style. Skills are stored in <code>.claude/commands/</code> in your project.
        </InfoCallout>
      </Subsection>

      <Subsection title="The API Landscape">
        <Prose>
          <p>These are the main AI APIs you'll use as a developer. They all work similarly — send text, get text back — but differ in models, pricing, speed, and features.</p>
        </Prose>
        <CompareTable
          headers={['Anthropic', 'OpenAI', 'Groq', 'Google', 'Ollama (Local)']}
          rows={[
            { attribute: 'Best models', values: ['Claude Sonnet/Opus', 'GPT-4o, o1', 'Llama 3.3 70B', 'Gemini 1.5 Pro', 'Any open model'] },
            { attribute: 'Speed', values: ['Fast', 'Fast', 'Extremely fast', 'Medium', 'Hardware-dependent'] },
            { attribute: 'Context', values: ['200k tokens', '128k tokens', '128k tokens', '1M tokens', 'Model-dependent'] },
            { attribute: 'Cost', values: ['Paid (per token)', 'Paid (per token)', 'Paid (but cheap)', 'Paid', 'Free (compute only)'] },
            { attribute: 'Privacy', values: ['API agreement', 'API agreement', 'API agreement', 'API agreement', 'Fully local'] },
            { attribute: 'Best for', values: ['Complex reasoning, coding', 'General versatility', 'Fast inference, prototyping', 'Very long documents', 'Local, private, free'] },
          ]}
        />
      </Subsection>

      <Subsection title="Orchestration Frameworks">
        <Prose>
          <p>Orchestration frameworks help you build agents and pipelines without writing everything from scratch. They provide abstractions for tool management, memory, prompt chaining, and multi-agent coordination.</p>
        </Prose>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'n8n',
            subtitle: 'Visual workflow automation',
            content: 'Drag-and-drop automation builder with 400+ integrations and AI nodes. No-code to low-code.',
            details: 'n8n lets you build AI-powered workflows visually: trigger (webhook, cron) → AI agent node → actions (send email, update database, post to Slack). You can self-host it for free. Great for: WhatsApp bots, content pipelines, data processing, any workflow that connects AI to other services. Add custom code nodes when you need it. Self-host: docker run -p 5678:5678 n8nio/n8n',
            tags: ['Visual', 'Self-hostable', '400+ integrations'],
            color: 'orange',
          },
          {
            title: 'LangChain',
            subtitle: 'Python/JS LLM framework',
            content: 'Code-first framework for building chains, agents, and RAG pipelines in Python or TypeScript.',
            details: 'LangChain provides abstractions for: chains (prompt → LLM → output → next step), agents (LLM + tools + loops), retrievers (RAG), memory (conversation history), callbacks. More flexible than n8n but requires coding. Large community and many pre-built integrations. Use LangChain when you need custom logic that visual tools can\'t express.',
            tags: ['Python / TypeScript', 'Production-grade'],
            color: 'green',
          },
          {
            title: 'LlamaIndex',
            subtitle: 'RAG and knowledge base specialist',
            content: 'Python framework optimized for building retrieval systems and RAG pipelines over your own data.',
            details: 'LlamaIndex excels at: ingesting documents (PDF, CSV, web, databases), chunking and embedding them, storing in vector databases, and building chat interfaces over your data. If your use case is "chat with my documents" or "AI that knows my business data," LlamaIndex is more focused than LangChain for this specific task.',
            tags: ['RAG-focused', 'Document ingestion'],
            color: 'blue',
          },
          {
            title: 'Anthropic SDK',
            subtitle: 'Direct API access — Python and TypeScript',
            content: 'The official Anthropic SDK for calling Claude\'s API — tool use, streaming, multi-turn conversations, prompt caching.',
            details: 'The Anthropic SDK (pip install anthropic / npm install @anthropic-ai/sdk) is the lowest-level, most direct way to use Claude. It handles: structured tool definitions (JSON schema), tool result handling, streaming responses, multi-turn conversation state, prompt caching, and vision inputs.\n\nThis is the base SDK — you manage the agent loop yourself if you need one.\n\nSeparate from this: Anthropic also offers a higher-level Agent SDK (anthropic-agent) specifically for multi-agent orchestration. If you\'re building a simple app or a single-agent tool, use the base SDK. If you need orchestrator + sub-agent coordination, look at the Agent SDK.',
            tags: ['pip install anthropic', 'Official, lowest-level'],
            color: 'purple',
          },
        ]} />
      </Subsection>

      <Subsection title="Key Terms">
        <TermsMemoryBlock terms={[
          { term: 'MCP', definition: 'Model Context Protocol — an open standard for connecting AI models to external tools and resources. Proposed by Anthropic in 2024, now adopted industry-wide by OpenAI, Google, Microsoft, and thousands of community servers. Like USB for AI.' },
          { term: 'MCP Server', definition: 'A small program that exposes tools (functions) and resources (data) over the MCP protocol. The AI client connects to it automatically.' },
          { term: 'MCP Client', definition: 'The AI application that connects to MCP servers. Claude Code and Claude Desktop are MCP clients.' },
          { term: 'Function calling', definition: 'The technical mechanism by which an LLM requests a tool execution. The model outputs a structured JSON object specifying tool name and parameters.' },
          { term: 'Webhook', definition: 'A URL endpoint that receives HTTP POST requests when an event happens. Used to trigger agent workflows from external systems (WhatsApp, GitHub, payment processors).' },
          { term: 'SDK', definition: 'Software Development Kit — pre-built libraries that make it easier to use an API in a specific language. Anthropic has Python and TypeScript SDKs.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: 'MCP server',
            itemB: 'A web server',
            explanation: 'An MCP server is a local process (usually) that the AI client communicates with over stdio or SSE. It\'s not a public web server. It runs on your machine, alongside your Claude Desktop or Claude Code instance.',
          },
          {
            itemA: 'n8n',
            itemB: 'LangChain',
            explanation: 'n8n is visual and low-code — great for automation workflows. LangChain is code-first and more flexible — better for complex custom agents. n8n for "connect these services with AI"; LangChain for "build a custom AI system."',
          },
          {
            itemA: 'Claude Skills',
            itemB: 'MCP servers',
            explanation: 'Skills are prompt templates / slash commands that customize how Claude responds (its behavior). MCP servers give Claude new capabilities (tools to call external resources). Skills change what Claude knows how to do. MCP servers change what Claude can access.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What problem does MCP solve?', answer: 'The fragmentation problem — every AI tool had its own integration system. MCP is a universal standard so any AI client can use any MCP server, like USB standardized device connections.' },
          { question: 'You want to build a workflow that posts an AI-generated summary to Slack every morning. Which tool is best?', answer: 'n8n — it has built-in Slack and scheduling nodes, plus AI nodes. You can build this visually in under an hour. No need for LangChain unless you need custom logic the visual builder can\'t express.' },
          { question: 'What is function calling and who actually executes the function?', answer: 'Function calling is when an LLM outputs a structured JSON request specifying which tool to call and with what parameters. Your framework (SDK, LangChain, n8n) actually executes the function and returns the result to the model.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 5 Summary" items={[
        { label: 'MCP', value: 'Open standard for AI ↔ tools. Like USB. Proposed by Anthropic, now industry-wide.' },
        { label: 'MCP server', value: 'Small local program that exposes tools/resources to any MCP client.' },
        { label: 'Claude Skills', value: 'Slash commands (/review, custom) = reusable prompt templates.' },
        { label: 'Anthropic API', value: 'Best for complex reasoning, coding, long documents.' },
        { label: 'Groq', value: 'Fastest inference — great for prototyping and latency-sensitive apps.' },
        { label: 'n8n', value: 'Visual automation + AI. Best for workflows connecting many services.' },
        { label: 'LangChain', value: 'Code-first agent/chain framework. Best for custom complex agents.' },
        { label: 'LlamaIndex', value: 'Specialized for RAG and document Q&A pipelines.' },
      ]} />
    </SectionShell>
  )
}
