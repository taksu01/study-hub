import { Plug, Terminal, Cloud, Boxes, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  ExpandableCardGrid, CompareTable, TermsMemoryBlock,
  CommonConfusionBlock, MiniRecallBlock, CheatSheetPanel, InfoCallout,
} from '../components/ui'
import { McpDiagram } from '../components/viz/McpDiagram'
import { CodeBlock, Code } from '../components/CodeBlock'

export default function Section05() {
  return (
    <SectionShell id="section-5">
      <SectionHeader
        number={5}
        title="The Tooling Ecosystem"
        subtitle="MCP, SDKs, skills and orchestration frameworks — the connective tissue between a model and the real world, and how to avoid reaching for the heaviest one first."
      />

      <Subsection title="MCP — the USB port for AI" icon={<Plug className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Before MCP, every AI client had its own way to reach external tools, so every
          client × tool pair needed custom code. MCP replaces that multiplication with addition.
        </Takeaway>

        <McpDiagram />

        <Points items={[
          <><strong>Open standard.</strong> Proposed by Anthropic in late 2024; now supported across OpenAI, Google, Microsoft and thousands of community servers.</>,
          <><strong>You write no AI-specific code.</strong> Point a client at a server and the tools appear.</>,
          <><strong>It runs locally.</strong> Usually a process on your machine talking over stdio, not a public web service.</>,
          <><strong>Write once, use everywhere.</strong> The same server works with any MCP client, present or future.</>,
        ]} />

        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Filesystem', subtitle: 'Read and write local files', color: 'blue',
            content: 'The one you will use most. Scoped to directories you name.',
            points: ['Built into Claude Code', 'Never grant it your home directory root', 'Read access is cheap; write access deserves thought'],
            tags: ['Built-in'],
          },
          {
            title: 'Web search', subtitle: 'Past the training cutoff', color: 'green',
            content: 'Brave or Tavily. The model picks the query; the server calls the search API.',
            points: ['Essential for current docs, prices and events', 'Free API tiers exist for both', 'Returns snippets plus URLs so answers can cite'],
            tags: ['Brave', 'Tavily'],
          },
          {
            title: 'GitHub', subtitle: 'Repos, issues, PRs', color: 'purple',
            content: 'Read code and metadata without leaving the chat.',
            points: ['Review a specific PR by number', 'Search across your organisation\'s repos', 'Read a dependency\'s source instead of guessing at its behaviour'],
            tags: ['Repos', 'PRs'],
          },
          {
            title: 'Database', subtitle: 'Query your own data', color: 'orange',
            content: 'SQLite, Postgres and friends. The model reads your schema and writes SQL.',
            points: ['Excellent for exploratory analysis and debugging data', 'Read-only in production. Always', 'Point it at a replica if you have one'],
            tags: ['SQL'],
          },
          {
            title: 'Calendar / email', subtitle: 'Act on your behalf', color: 'teal',
            content: 'Google or Outlook. Where a "personal assistant" stops being a demo.',
            points: ['Check availability, draft replies, summarise an inbox', 'Gate anything that sends behind explicit approval'],
            tags: ['Google', 'Outlook'],
          },
          {
            title: 'Your own', subtitle: 'Wrap any API', color: 'pink',
            content: 'An MCP server is just a Node or Python program implementing the protocol.',
            points: ['Wrap your internal API and every client gains it at once', 'Start from the official SDK template — the protocol details are handled for you'],
            tags: ['Node', 'Python'],
          },
        ]} />

        <CodeBlock tabs={[
          {
            label: 'Add a server',
            language: 'json',
            note: 'Windows: %APPDATA%\\Claude\\claude_desktop_config.json · macOS: ~/Library/Application Support/Claude/claude_desktop_config.json',
            code: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-key-here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "E:/Project/App"
      ]
    }
  }
}`,
          },
          {
            label: 'Build a server',
            language: 'python',
            note: 'pip install mcp — this is a complete, working server.',
            code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("portfolio")


@mcp.tool()
def get_position(symbol: str) -> dict:
    """Get the current position for a ticker.

    The docstring becomes the tool description the model reads,
    so write it for the model, not for a maintainer.
    """
    row = db.query("SELECT qty, avg_cost FROM positions WHERE symbol = ?", symbol)
    if not row:
        return {"symbol": symbol, "qty": 0}
    return {"symbol": symbol, "qty": row.qty, "avg_cost": row.avg_cost}


if __name__ == "__main__":
    mcp.run()`,
          },
        ]} />

        <InfoCallout type="tip">
          Restart the client after editing the config — servers are launched at startup, so a running
          Claude will not notice the new entry.
        </InfoCallout>
      </Subsection>

      <Subsection title="Skills — reusable prompts, not new capabilities" icon={<Terminal className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          A skill is a saved prompt behind a slash command. It changes how the model
          <em> behaves</em>. An MCP server changes what it can <em>reach</em>. Different axes entirely.
        </Takeaway>

        <Points items={[
          <>Built-ins include <Code>/review</Code>, <Code>/security-review</Code> and <Code>/init</Code>.</>,
          <>Your own live in <Code>.claude/commands/</Code> — a markdown file per command.</>,
          <>Worth writing for anything you have explained more than twice: a deploy checklist, your team's debugging order, your PR house style.</>,
        ]} />

        <Example label="A skill is this small">
          A file at <Code>.claude/commands/pr.md</Code> containing your PR conventions becomes
          <Code>/pr</Code>. That is the entire mechanism.
        </Example>
      </Subsection>

      <Subsection title="The API landscape" icon={<Cloud className="w-4 h-4 text-violet-500" />}>
        <CompareTable
          headers={['Anthropic', 'OpenAI', 'Groq', 'Google', 'Ollama']}
          rows={[
            { attribute: 'Flagship', values: ['Claude Sonnet / Opus', 'GPT-4o, o-series', 'Llama 3.3 70B', 'Gemini 2.5 Pro', 'Any open model'] },
            { attribute: 'Speed', values: ['Fast', 'Fast', 'Extremely fast', 'Medium', 'Your hardware'] },
            { attribute: 'Context', values: ['200k', '128k', '128k', '1M', 'Model-dependent'] },
            { attribute: 'Cost', values: ['Per token', 'Per token', 'Per token, cheap', 'Per token', 'Free — electricity only'] },
            { attribute: 'Privacy', values: ['API terms', 'API terms', 'API terms', 'API terms', 'Nothing leaves the machine'] },
            { attribute: 'Pick it for', values: ['Coding, long docs, agent work', 'Broadest ecosystem support', 'Latency-sensitive apps and prototyping', 'Inputs over 200k tokens', 'Privacy and zero marginal cost'] },
          ]}
        />

        <InfoCallout type="tip">
          <strong>They mostly speak the same shape.</strong> Groq and Ollama both expose an
          OpenAI-compatible endpoint, so switching between them is usually a base URL and a model
          name — not a rewrite.
        </InfoCallout>
      </Subsection>

      <Subsection title="Orchestration frameworks" icon={<Boxes className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Every framework is a bet that its abstractions match your problem. Start with the raw SDK.
          Adopt a framework when you have felt the specific pain it removes — not before.
        </Takeaway>

        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Official SDK', subtitle: 'The floor — start here', color: 'purple',
            content: 'Direct API access. Tool definitions, streaming, multi-turn state, caching, vision.',
            points: [
              'pip install anthropic / npm install @anthropic-ai/sdk',
              'You write the agent loop yourself — which is about twenty lines, as Section 4 showed',
              'No abstraction between you and the API, so nothing surprising in the middle',
              'Most projects never need more than this',
            ],
            tags: ['Lowest level', 'Official'],
          },
          {
            title: 'n8n', subtitle: 'Visual workflow automation', color: 'orange',
            content: 'Drag-and-drop with 400+ integrations and AI nodes. Self-hostable in one Docker command.',
            points: [
              'Trigger (webhook or cron) → AI node → actions (Slack, email, database)',
              'Unbeatable when the hard part is connecting services, not the AI',
              'Drop to a code node when the visual builder runs out',
              'docker run -p 5678:5678 n8nio/n8n',
            ],
            tags: ['Low-code', 'Self-hostable'],
          },
          {
            title: 'LangChain', subtitle: 'Code-first agent framework', color: 'green',
            content: 'Abstractions for chains, agents, retrievers and memory in Python or TypeScript.',
            points: [
              'Large ecosystem and many pre-built integrations',
              'The abstractions cost you debuggability — stack traces get deep',
              'Worth it when you are switching providers often or need its retriever ecosystem',
            ],
            tags: ['Python', 'TypeScript'],
          },
          {
            title: 'LlamaIndex', subtitle: 'RAG specialist', color: 'blue',
            content: 'Focused on ingesting documents, chunking, embedding and querying them.',
            points: [
              'Handles PDF, CSV, web and database ingestion out of the box',
              'More opinionated and more focused than LangChain for "chat with my documents"',
              'If RAG is the whole product, this is the shorter path',
            ],
            tags: ['RAG-focused'],
          },
        ]} />

        <InfoCallout type="warning">
          <strong>The framework trap.</strong> A framework that saves you 50 lines on day one can
          cost you a week on day thirty, when you need behaviour it did not anticipate. The raw SDK
          plus a loop you understand is a genuinely competitive choice for most projects.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key terms" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
        <TermsMemoryBlock terms={[
          {
            term: 'MCP',
            short: 'Model Context Protocol — an open standard for connecting models to tools and data.',
            example: 'USB, but for AI clients and tools',
            detail: 'Anthropic proposed it in 2024; it is now supported across the major clients and thousands of community servers.',
          },
          {
            term: 'MCP server',
            short: 'A small program exposing tools and resources over the protocol.',
            example: 'npx @modelcontextprotocol/server-filesystem',
            detail: 'Usually a local process communicating over stdio — not a public web server.',
          },
          {
            term: 'MCP client',
            short: 'The AI application that connects to servers.',
            example: 'Claude Desktop, Claude Code, Cursor',
          },
          {
            term: 'Function calling',
            short: 'The mechanism by which a model requests a tool — structured JSON naming the tool and its arguments.',
            detail: 'Also called tool use. The model emits the request; your code performs it.',
          },
          {
            term: 'Webhook',
            short: 'A URL that receives an HTTP POST when something happens elsewhere.',
            example: 'WhatsApp posts here on every inbound message',
            detail: 'The standard way to trigger an agent from an external system. Section 7 builds one.',
          },
          {
            term: 'SDK',
            short: 'A language-specific library wrapping an API so you are not assembling HTTP by hand.',
            example: 'pip install anthropic',
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'An MCP server',
            itemB: 'A web server',
            explanation: 'It usually runs as a local child process talking over stdio to the client on the same machine. Nothing is listening on a public port and nothing needs deploying.',
            fix: '"Server" here means "the side that provides tools", not "a machine on the internet".',
          },
          {
            itemA: 'Skills',
            itemB: 'MCP servers',
            explanation: 'A skill is a saved prompt — it shapes behaviour. An MCP server is a set of tools — it grants reach. A skill cannot let Claude read your database; an MCP server cannot teach it your PR style.',
            fix: 'Skills change how it acts. MCP changes what it can touch.',
          },
          {
            itemA: 'n8n',
            itemB: 'LangChain',
            explanation: 'n8n is visual and shines at wiring services together. LangChain is code and shines at custom logic. They solve adjacent problems and are frequently used together.',
            fix: '"Connect these services with AI" → n8n. "Build a custom AI system" → code.',
          },
          {
            itemA: 'Needing a framework',
            itemB: 'Needing an agent',
            explanation: 'The agent loop is roughly twenty lines against the raw SDK. Wanting an agent is not by itself a reason to take on a framework\'s abstractions and upgrade treadmill.',
            fix: 'Write the loop once yourself. You will understand every framework better afterwards.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'What problem does MCP actually solve?',
            answer: 'Combinatorial explosion. Four clients and five tools used to mean twenty bespoke integrations; with a shared protocol it is nine implementations. Any compliant client works with any compliant server.',
          },
          {
            question: 'You want an AI summary posted to Slack every morning. What is the shortest path?',
            answer: 'n8n. It has scheduling, Slack and AI nodes built in — an hour of clicking. Reach for code only when the logic outgrows the visual builder.',
          },
          {
            question: 'In function calling, who runs the function?',
            answer: 'You do. The model emits structured JSON naming the tool and its arguments; your code, SDK or framework executes it and returns the result. The model never runs anything itself.',
          },
          {
            question: 'You added an MCP server to the config and the model still says it cannot search. First check?',
            answer: 'Restart the client — servers launch at startup. Then check the API key in the env block, and confirm the npx package name is right.',
          },
          {
            question: 'When is adopting LangChain actually the right call?',
            answer: 'When you are genuinely switching providers often, or you want its retriever and integration ecosystem rather than writing those yourself. Wanting an agent loop is not sufficient reason — that part is short.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 5 in nine lines" items={[
        { label: 'MCP', value: 'Open standard for AI ↔ tools. Turns clients × tools into clients + tools.' },
        { label: 'MCP server', value: 'A local program exposing tools. Config file, then restart the client.' },
        { label: 'Skills', value: 'Saved prompts behind slash commands, in .claude/commands/.' },
        { label: 'Skills vs MCP', value: 'Skills change behaviour. MCP changes reach.' },
        { label: 'Anthropic', value: 'Coding, long documents, agent work.' },
        { label: 'Groq', value: 'Fastest inference. Prototyping and latency-sensitive paths.' },
        { label: 'Ollama', value: 'Free and private. OpenAI-compatible endpoint.' },
        { label: 'n8n', value: 'Visual. Best when the hard part is connecting services.' },
        { label: 'Start point', value: 'The raw SDK. Adopt a framework once you have felt its specific pain.' },
      ]} />
    </SectionShell>
  )
}
