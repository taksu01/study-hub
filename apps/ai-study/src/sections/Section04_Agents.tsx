import {
  SectionShell, SectionHeader, Subsection, Prose,
  InteractiveFlowMap, ExpandableCardGrid, TermsMemoryBlock,
  CommonConfusionBlock, MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout
} from '../components/ui'

export default function Section04() {
  return (
    <SectionShell id="section-4">
      <SectionHeader
        number={4}
        title="The Agent Paradigm"
        subtitle="The biggest shift in AI: from models that respond, to agents that act. Here's how it works."
      />

      <Subsection title="What Makes Something an Agent?">
        <Prose>
          <p>A chatbot answers questions. An agent takes actions. That single distinction changes everything about what AI can do.</p>
          <p>An AI agent is an LLM plus a set of tools, running in a loop. The loop is the key: the model observes a situation, decides what to do, takes an action (using a tool), observes the result, and then decides what to do next — repeating until the task is complete or it needs to stop and ask the user.</p>
          <p>Click each step in the agent loop below to understand what happens at that point.</p>
        </Prose>
        <div className="mt-4" />
        <InteractiveFlowMap
          vertical={true}
          nodes={[
            {
              id: 'observe',
              label: 'Observe',
              description: 'The agent receives input — a user request, a tool result, an event trigger, or the current state of a system. It now has a full picture of: the original task, what has happened so far, and what tools are available.',
              color: 'blue',
            },
            {
              id: 'think',
              label: 'Think (LLM)',
              description: 'The LLM processes everything in context and decides: Is the task done? If not, what\'s the next action? Which tool should I use? What parameters? This "thinking" is just text generation — the model outputs a structured action decision.',
              color: 'purple',
            },
            {
              id: 'act',
              label: 'Act (Tool Call)',
              description: 'The framework executes the tool the model requested — searching the web, reading a file, calling an API, running code, clicking a button. The model doesn\'t directly execute code; the surrounding framework does, based on the model\'s instruction.',
              color: 'orange',
            },
            {
              id: 'result',
              label: 'Get Result',
              description: 'The tool returns its output — search results, file contents, API response, code output, error message. This result is added to the context as a "tool result" message.',
              color: 'teal',
            },
            {
              id: 'loop',
              label: 'Loop or Finish',
              description: 'The agent loops back to Observe with the tool result now in context. It keeps looping until: (1) the task is complete and it gives a final answer, or (2) it needs human input, or (3) a maximum step limit is reached.',
              color: 'green',
            },
          ]}
        />
        <InfoCallout type="tip">
          <strong>The loop is what makes agents powerful and risky.</strong> An agent can take dozens of actions autonomously. This is how Claude Code can write a full feature — it reads files, writes code, runs tests, fixes errors, and repeats. It's also why guardrails matter: define what the agent CAN'T do.
        </InfoCallout>
      </Subsection>

      <Subsection title="Tools — The Agent's Hands">
        <Prose>
          <p>Tools are functions the agent can call. They're what allow the AI to actually do things beyond generating text. When you give Claude Code access to your filesystem, you've given it a file-reading and file-writing tool. When you add a web search MCP, you've given it a search tool.</p>
          <p>Any function can be a tool: you define it, describe it, and the model decides when to use it.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Web Search',
            subtitle: 'Real-time information',
            content: 'Search the internet for current information. Bypasses the model\'s training cutoff.',
            details: 'The model decides what query to search, your framework calls a search API (Brave, Google, Serper), the results come back as text in the context. The model then uses those results to answer. This is how AI can give you current stock prices, news, or documentation.',
            tags: ['Real-time', 'Grounding'],
            color: 'blue',
          },
          {
            title: 'File Read/Write',
            subtitle: 'Access the filesystem',
            content: 'Read files, write files, list directories. Allows the agent to work with your actual data.',
            details: 'This is what Claude Code uses constantly. It reads your source files to understand context, writes new code, edits existing files. For your own agents, file tools enable: reading a knowledge base, writing output reports, updating config files. Be careful with write access — always scope to specific directories.',
            tags: ['Filesystem access', 'Claude Code core tool'],
            color: 'purple',
          },
          {
            title: 'Code Execution',
            subtitle: 'Run code, get results',
            content: 'Execute Python, JavaScript, shell commands and return the output to the model.',
            details: 'A code-executing agent can: run a Python script and use the output, validate that generated code actually works, perform calculations, process data with real libraries. Claude Code can run your tests to verify its own changes work. Always sandbox code execution — never run agent-generated code with full system access.',
            tags: ['Sandboxed exec', 'Verification'],
            color: 'orange',
          },
          {
            title: 'API Calls',
            subtitle: 'Connect to anything',
            content: 'Call external REST APIs — databases, services, IoT devices, third-party platforms.',
            details: 'You can define a tool that calls any API: fetch a user\'s account data, post a tweet, check a stock price, control a smart home device. The model decides when to call it and what parameters to use. This is how a trading agent calls market data APIs, or a WhatsApp bot calls the Twilio API.',
            tags: ['External services', 'HTTP requests'],
            color: 'teal',
          },
          {
            title: 'Browser Control',
            subtitle: 'Computer use',
            content: 'Navigate websites, click buttons, fill forms, take screenshots.',
            details: 'Claude\'s "computer use" capability allows an agent to control a browser (via Playwright/Puppeteer). The model can see a screenshot, decide where to click, and navigate the web like a human. Use cases: scraping sites that block APIs, automating web workflows, testing UIs. Anthropic\'s computer use API and tools like browser-use make this accessible.',
            tags: ['Playwright', 'Computer use'],
            color: 'pink',
          },
          {
            title: 'Memory / Database',
            subtitle: 'Persistent state',
            content: 'Store and retrieve information across conversations or sessions.',
            details: 'LLMs are stateless — each conversation starts fresh. A memory tool lets the agent save information (user preferences, past decisions, learned facts) and retrieve it later. Implementations: simple JSON files, SQLite, vector databases (for semantic recall). Claude Code has memory built in via its memory system — you can tell it to remember things across sessions.',
            tags: ['Cross-session', 'Vector DB'],
            color: 'green',
          },
        ]} />
      </Subsection>

      <Subsection title="Types of Agents">
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Reactive Agent',
            subtitle: 'Responds to triggers',
            content: 'Takes action in response to an event. No planning — just respond.',
            details: 'Example: A WhatsApp bot that reads an incoming message and replies. No multi-step planning needed — one event, one action. This is the simplest agent architecture and the right choice when tasks are well-defined and single-step.',
            tags: ['Simple', 'Event-driven'],
            color: 'blue',
          },
          {
            title: 'Planning Agent',
            subtitle: 'Breaks tasks into steps',
            content: 'Receives a complex goal, plans a sequence of steps, executes them in order.',
            details: 'Example: "Build me a React component that does X." The agent plans: read codebase → understand patterns → write component → write tests → verify tests pass. Claude Code is a planning agent. ReAct (Reason + Act) is the common pattern: think about what to do, then do it, observe the result, think again.',
            tags: ['Multi-step', 'ReAct pattern'],
            color: 'purple',
          },
          {
            title: 'Multi-Agent System',
            subtitle: 'LLMs coordinating with each other',
            content: 'An orchestrator LLM that delegates subtasks to specialized sub-agents.',
            details: 'Example: Research agent (web search) + Writing agent (drafting) + Editor agent (review) all coordinated by a manager agent. Each agent specializes. This enables parallelism and specialization but adds complexity. Used in advanced pipelines like content creation, software development teams, and complex data analysis.',
            tags: ['Parallel work', 'Specialization'],
            color: 'orange',
          },
          {
            title: 'Autonomous Agent',
            subtitle: 'Runs without human input',
            content: 'Operates continuously, triggered by schedules or events, without requiring human approval for each action.',
            details: 'Example: A trading agent that monitors markets every 15 minutes and executes trades based on predefined rules + LLM reasoning. Or a content pipeline that publishes articles every day. These require careful guardrails because they act without oversight. Key principle: limit scope rigorously. An autonomous agent should only act within a well-defined domain.',
            tags: ['Scheduled', 'Guardrails essential'],
            color: 'red',
          },
        ]} />
      </Subsection>

      <Subsection title="Key Agent Terms">
        <TermsMemoryBlock terms={[
          { term: 'Tool call', definition: 'The structured request an LLM makes to execute a tool — includes the tool name and parameters. The framework executes it and returns the result.' },
          { term: 'Tool result', definition: 'The output returned to the model after a tool executes. Gets added to the conversation context so the model can use the information.' },
          { term: 'Agentic loop', definition: 'The observe → think → act → observe cycle that agents run. Each iteration processes the latest state and decides the next action.' },
          { term: 'Orchestrator', definition: 'In a multi-agent system, the LLM that coordinates other agents — assigns tasks, collects results, decides what to do next.' },
          { term: 'ReAct', definition: 'Reasoning + Acting. A prompting pattern where the model alternates between reasoning ("I need to find X") and acting (calling a tool). Standard pattern for planning agents.' },
          { term: 'Guardrails', definition: 'Constraints that limit what an agent can do. Critical for autonomous agents — define what tools it has access to, what domains it operates in, and when it must pause for human approval.' },
        ]} />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Agent',
            itemB: 'Chatbot',
            explanation: 'A chatbot has one turn: you send a message, it replies. An agent loops: it takes actions, observes results, and keeps going until the task is done. Most "AI assistants" you interact with are chatbots; Claude Code and Auto-GPT are agents.',
          },
          {
            itemA: 'Agent',
            itemB: 'Automation (n8n / Zapier)',
            explanation: 'Traditional automation follows fixed, predefined rules ("if X then Y"). An agent uses an LLM to reason about what to do next — it can handle novel situations, make judgment calls, and adapt. The boundary is blurring as automation tools add AI nodes.',
          },
          {
            itemA: 'The LLM executes tools',
            itemB: 'The framework executes tools',
            explanation: 'The LLM just generates text describing which tool to call and with what parameters. Your code (or a framework like LangChain, Claude\'s SDK) actually executes the function. The LLM never directly runs code or makes HTTP requests — it instructs your framework to do so.',
          },
        ]} />
      </Subsection>

      <TryThisCallout
        title="Try: Think Like an Agent"
        prompt={`You are an AI agent with access to these tools:
- web_search(query: string) → search results
- read_file(path: string) → file contents
- write_file(path: string, content: string) → confirmation

Task: A user wants to know the current price of Bitcoin and save it to a file called "btc_price.txt".

Walk me through your plan step by step:
1. What tool do you call first?
2. What do you do with the result?
3. What tool do you call next?
4. How do you know you're done?`}
      />

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What is the core difference between a chatbot and an agent?', answer: 'A chatbot responds to messages (one turn). An agent loops: observe → think → act with tools → observe result → think again, until the task is complete. Agents can take sequences of actions autonomously.' },
          { question: 'You want to build an agent that monitors a website for price drops. What type is this?', answer: 'A reactive agent (or autonomous agent if scheduled). It\'s triggered by an external condition (price change) and takes action (send notification, execute trade). Needs a tool for web fetching and a tool for notifications.' },
          { question: 'Why do agents need guardrails?', answer: 'Because agents can take many autonomous actions in a loop. Without constraints on what tools they can use and what domains they operate in, they can cause unintended consequences. Limit scope, require human approval for high-stakes actions.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 4 Summary" items={[
        { label: 'Agent loop', value: 'Observe → Think (LLM) → Act (tool) → Get result → Loop or finish' },
        { label: 'Tool', value: 'Any function the agent can call: search, file, API, browser, code exec' },
        { label: 'ReAct pattern', value: 'Reason then act, alternating — standard for planning agents' },
        { label: 'Reactive agent', value: 'Event triggers → one action. Simple and predictable.' },
        { label: 'Planning agent', value: 'Complex goal → plan steps → execute in sequence (Claude Code)' },
        { label: 'Multi-agent', value: 'Orchestrator + specialized sub-agents for complex parallel tasks' },
        { label: 'Guardrails', value: 'Define allowed tools, domains, and when to pause for human approval' },
        { label: 'Key rule', value: 'The LLM decides WHAT to do. Your framework actually does it.' },
      ]} />
    </SectionShell>
  )
}
