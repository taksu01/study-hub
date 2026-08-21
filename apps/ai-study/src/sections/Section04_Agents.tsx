import { Bot, Wrench, Boxes, ShieldAlert, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  ExpandableCardGrid, TermsMemoryBlock, CommonConfusionBlock,
  MiniRecallBlock, CheatSheetPanel, InfoCallout, TryThisCallout, CompareTable,
} from '../components/ui'
import { AgentLoopLab } from '../components/viz/AgentLoopLab'
import { CodeBlock } from '../components/CodeBlock'

export default function Section04() {
  return (
    <SectionShell id="section-4">
      <SectionHeader
        number={4}
        title="The Agent Paradigm"
        subtitle="The shift from models that answer to systems that act. It is a smaller change than it sounds — and a much bigger one in consequence."
      />

      <Subsection title="An agent is four things, and the model is only one of them" icon={<Bot className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The LLM is not the agent. It is the reasoning component inside one. Confusing the engine
          with the car is the single most common mistake in this space.
        </Takeaway>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { part: 'LLM', role: 'Decides what to do next', colour: 'border-violet-200 bg-violet-50 text-violet-800' },
            { part: 'Tools', role: 'The hands that actually do it', colour: 'border-blue-200 bg-blue-50 text-blue-800' },
            { part: 'Control loop', role: 'Your code, driving the iterations', colour: 'border-teal-200 bg-teal-50 text-teal-800' },
            { part: 'Memory', role: 'State carried between steps', colour: 'border-amber-200 bg-amber-50 text-amber-800' },
          ].map(p => (
            <div key={p.part} className={`rounded-xl border p-3.5 ${p.colour}`}>
              <h4 className="text-sm font-semibold">{p.part}</h4>
              <p className="text-xs mt-1 opacity-80 leading-relaxed">{p.role}</p>
            </div>
          ))}
        </div>

        <AgentLoopLab />

        <InfoCallout type="warning">
          <strong>The loop is what makes agents powerful and what makes them risky.</strong> An agent
          can take dozens of actions with nobody watching. That is how Claude Code writes a whole
          feature — read, write, run tests, fix, repeat. It is also why the interesting engineering
          question is what the agent <em>cannot</em> do.
        </InfoCallout>
      </Subsection>

      <Subsection title="Tools — the agent's hands" icon={<Wrench className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          A tool is just a function you described well enough that the model knows when to reach for
          it. You write the function and the description; the model chooses the moment.
        </Takeaway>

        <CodeBlock tabs={[
          {
            label: 'Defining a tool',
            language: 'python',
            note: 'The description is not documentation — it is the prompt that decides whether this tool gets used.',
            code: `tools = [
    {
        "name": "get_price",
        # Written for the model, not for a human reader.
        "description": (
            "Get the current spot price of a crypto asset in USD. "
            "Use this whenever the user asks about a current or live price. "
            "Do not use it for historical prices."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "symbol": {
                    "type": "string",
                    "description": "Ticker, e.g. BTC or ETH",
                }
            },
            "required": ["symbol"],
        },
    }
]

msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What is BTC trading at?"}],
)`,
          },
          {
            label: 'The loop',
            language: 'python',
            note: 'This is the entire agent. Everything else is more tools and better guardrails.',
            code: `def run_agent(user_message: str, max_steps: int = 10) -> str:
    messages = [{"role": "user", "content": user_message}]

    for _ in range(max_steps):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            tools=tools,
            messages=messages,
        )

        # No tool requested → the model is done reasoning.
        if response.stop_reason != "tool_use":
            return response.content[0].text

        messages.append({"role": "assistant", "content": response.content})

        # YOUR code executes the tool. The model only asked.
        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = TOOL_REGISTRY[block.name](**block.input)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(output),
                })

        messages.append({"role": "user", "content": results})

    # A step cap is a guardrail, not a formality — loops do run away.
    return "Stopped: hit the step limit without finishing."`,
          },
        ]} />

        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Web search', subtitle: 'Beat the training cutoff', color: 'blue',
            content: 'The model picks a query, your code calls a search API, results come back as context.',
            points: [
              'The single most effective grounding tool',
              'Providers: Brave, Serper, Tavily, or the provider\'s built-in search',
              'Return snippets with URLs so the model can cite them',
            ],
            tags: ['Real-time', 'Grounding'],
          },
          {
            title: 'File read / write', subtitle: 'Work on real data', color: 'purple',
            content: 'Read source files to understand context, write results back out.',
            points: [
              'What Claude Code leans on constantly',
              'Scope write access to specific directories — always',
              'Reading is cheap to allow; writing deserves a whitelist',
            ],
            tags: ['Filesystem'],
          },
          {
            title: 'Code execution', subtitle: 'Verify, do not assume', color: 'orange',
            content: 'Run Python, JS or shell and feed the output back to the model.',
            points: [
              'Lets an agent check that its own generated code actually works',
              'Turns "probably correct" into "tested"',
              'Sandbox it. Never hand agent-generated code a full-privilege shell',
            ],
            tags: ['Sandbox required'],
          },
          {
            title: 'API calls', subtitle: 'Connect to anything', color: 'teal',
            content: 'Any REST endpoint can be a tool — market data, your database, a smart bulb.',
            points: [
              'The most common custom tool you will write',
              'Return compact JSON; verbose responses waste context',
              'Handle errors as tool results, not exceptions — let the model retry',
            ],
            tags: ['HTTP'],
          },
          {
            title: 'Browser control', subtitle: 'Computer use', color: 'pink',
            content: 'Navigate pages, click, fill forms, screenshot — driving a real browser.',
            points: [
              'Via Playwright or Puppeteer, or a provider\'s computer-use API',
              'For sites that have no API, and for UI testing',
              'Slow and brittle relative to an API. Prefer an API when one exists',
            ],
            tags: ['Playwright'],
          },
          {
            title: 'Memory', subtitle: 'State across sessions', color: 'green',
            content: 'Models are stateless. A memory tool lets one save facts now and recall them later.',
            points: [
              'Start with a JSON file. Move to SQLite, then a vector store, only when you must',
              'Store decisions and preferences, not raw transcripts',
              'Semantic recall needs embeddings — see Section 7',
            ],
            tags: ['Cross-session'],
          },
        ]} />
      </Subsection>

      <Subsection title="Four shapes of agent" icon={<Boxes className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Complexity is a cost, not a badge. Pick the simplest shape the task tolerates.
        </Takeaway>

        <CompareTable
          headers={['What it does', 'Reach for it when', 'Watch out for']}
          rows={[
            {
              attribute: 'Reactive',
              values: [
                'One trigger, one action. No planning.',
                'The task is single-step and well defined — a bot replying to a message.',
                'Almost nothing. This is the safe default.',
              ],
            },
            {
              attribute: 'Planning (ReAct)',
              values: [
                'Takes a goal, plans steps, executes them, adapts on results.',
                'The task genuinely needs several dependent steps. Claude Code lives here.',
                'Runaway loops. Always cap the step count.',
              ],
            },
            {
              attribute: 'Multi-agent',
              values: [
                'An orchestrator delegating to specialised sub-agents, each with its own model and tools.',
                'Sub-tasks are genuinely independent and benefit from parallelism or different tools.',
                'A large jump in complexity and cost. Most projects that reach for this did not need it.',
              ],
            },
            {
              attribute: 'Autonomous',
              values: [
                'Runs on a schedule or trigger with no human in the loop.',
                'The domain is narrow, the actions are reversible, and the guardrails are real.',
                'Anything irreversible — money, emails, deletions. Require approval for those.',
              ],
            },
          ]}
        />

        <InfoCallout type="warning">
          <strong>On multi-agent systems:</strong> the <em>agents</em> coordinate, not the models.
          Each agent has its own model as its brain. The orchestrator's model decides which sub-agent
          to invoke; each sub-agent's model does its own work. Saying "the LLMs talk to each other"
          hides where the loop and the state actually live.
        </InfoCallout>
      </Subsection>

      <Subsection title="Guardrails" icon={<ShieldAlert className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          An agent that can take fifty actions unattended needs a shorter list of things it may do,
          not a longer one.
        </Takeaway>

        <Points items={[
          <><strong>Cap the steps.</strong> A hard iteration limit turns an infinite loop into a failed run.</>,
          <><strong>Whitelist, do not blacklist.</strong> Name the directories, the domains, the tables it may touch.</>,
          <><strong>Separate read from write.</strong> Give reading freely; make every write deliberate.</>,
          <><strong>Require approval for the irreversible.</strong> Spending money, sending mail, deleting data, publishing.</>,
          <><strong>Log every tool call.</strong> When an agent does something odd, the trace is the only way to find out why.</>,
          <><strong>Set a budget.</strong> A looping agent on a frontier model can spend real money before you notice.</>,
        ]} color="red" />

        <Example label="The cheapest guardrail there is">
          A <code>max_steps</code> counter and a <code>DRY_RUN</code> flag. Run every new agent with
          writes disabled and read the log before you let it act for real.
        </Example>
      </Subsection>

      <Subsection title="Key terms" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
        <TermsMemoryBlock terms={[
          {
            term: 'Tool call',
            short: 'The model\'s structured request to run a tool — name plus arguments.',
            example: '{ "name": "get_price", "input": { "symbol": "BTC" } }',
            detail: 'It is only a request. Your code decides whether to honour it.',
          },
          {
            term: 'Tool result',
            short: 'What you send back after running the tool. Becomes part of the context.',
            example: '{ "price": 64210.55 }',
            detail: 'Send errors back as results too — the model can often recover, where an exception just kills the run.',
          },
          {
            term: 'Agentic loop',
            short: 'Observe → think → act → observe, repeating until done.',
            detail: 'The entire structural difference between an agent and a chatbot.',
          },
          {
            term: 'ReAct',
            short: 'Reason + Act — alternating between thinking out loud and calling a tool.',
            detail: 'The standard pattern for planning agents, and the shape of the trace in the lab above.',
          },
          {
            term: 'Orchestrator',
            short: 'In a multi-agent system, the agent that assigns work to the others and collects results.',
          },
          {
            term: 'Guardrails',
            short: 'The explicit limits on what an agent may do.',
            example: 'max_steps, allowed paths, approval gates',
            detail: 'Not optional for anything autonomous. Design them before the agent, not after an incident.',
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'The LLM executes tools',
            itemB: 'Your framework executes tools',
            explanation: 'The model emits text saying which tool it wants and with what arguments. Your code reads that, runs the function, and hands back the result. The model never opens a socket or touches a file.',
            fix: 'The model decides. Your code does. That gap is where every guardrail lives.',
          },
          {
            itemA: 'Agent',
            itemB: 'Chatbot',
            explanation: 'A chatbot takes one turn: message in, reply out. An agent loops — acting, observing, and deciding again until the task is done or a limit is hit.',
            fix: 'No loop and no tools means it is a chatbot, however clever it sounds.',
          },
          {
            itemA: 'Agent',
            itemB: 'Automation (n8n, Zapier)',
            explanation: 'Classic automation follows a fixed graph you drew. An agent decides the path at runtime, which lets it handle situations you did not anticipate — and also lets it surprise you.',
            fix: 'Fixed path → automation. Chosen path → agent. If the path never varies, you did not need an agent.',
          },
          {
            itemA: 'More agents',
            itemB: 'A better system',
            explanation: 'Multi-agent architectures multiply cost, latency and failure modes. Most tasks that people split across five agents run better as one agent with five tools.',
            fix: 'Add a tool before you add an agent.',
          },
        ]} />
      </Subsection>

      <TryThisCallout
        title="Try: reason like an agent"
        prompt={`You are an AI agent with these tools:
- web_search(query: string) → search results
- read_file(path: string) → file contents
- write_file(path: string, content: string) → confirmation

Task: find the current price of Bitcoin and save it to "btc_price.txt".

Before doing anything, walk me through your plan:
1. Which tool do you call first, and with what arguments?
2. What do you do with the result?
3. Which tool comes next?
4. How do you know you are finished?
5. What would you do if the first tool returned an error?`}
      />

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'What separates an agent from a chatbot?',
            answer: 'The loop and the tools. A chatbot answers once. An agent observes, decides, acts, observes the result, and decides again until the task is done. The model is the reasoning part inside it — your code runs the loop and executes the tools.',
          },
          {
            question: 'Your agent called the same tool eleven times with the same arguments. What went wrong?',
            answer: 'It is not recognising the result as progress — usually because the tool returned something unhelpful, or an error was swallowed instead of being returned as a tool result. Cap the steps so it fails fast, then read the trace.',
          },
          {
            question: 'You want to monitor a site for price drops. What shape of agent is that?',
            answer: 'Reactive, or autonomous if it runs on a schedule. One trigger, one action. It needs a fetch tool and a notify tool — and no planning at all.',
          },
          {
            question: 'Why are guardrails not optional for autonomous agents?',
            answer: 'Because nobody is watching. Dozens of actions can happen before you look. Cap iterations, whitelist what it may touch, gate anything irreversible behind approval, and log every call.',
          },
          {
            question: 'Where should you put most of your effort when a tool is being used at the wrong times?',
            answer: 'The tool description. It is a prompt, not documentation — say plainly when to use the tool and when not to. That single string decides the model\'s choice.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 4 in nine lines" items={[
        { label: 'Agent =', value: 'model (reasoning) + tools (hands) + loop (control) + memory (state).' },
        { label: 'The loop', value: 'Observe → think → act → observe → repeat, until done or capped.' },
        { label: 'Tool', value: 'Any function you described well enough for the model to know when to call it.' },
        { label: 'Tool descriptions', value: 'They are prompts. Say when to use it — and when not to.' },
        { label: 'ReAct', value: 'Reason then act, alternating. The standard planning pattern.' },
        { label: 'Reactive', value: 'One trigger, one action. The safe default.' },
        { label: 'Multi-agent', value: 'Real cost in complexity. Add a tool before you add an agent.' },
        { label: 'Guardrails', value: 'Step caps, whitelists, approval on anything irreversible, full logging.' },
        { label: 'The rule', value: 'The model decides what. Your code does it. Guard that gap.' },
      ]} />
    </SectionShell>
  )
}
