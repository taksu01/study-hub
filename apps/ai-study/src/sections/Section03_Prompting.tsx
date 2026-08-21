import { MessageSquare, Wand2, Layers, Link2, AlertTriangle, HelpCircle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  ExpandableCardGrid, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout, TryThisCallout,
} from '../components/ui'
import { PromptBuilder } from '../components/viz/PromptBuilder'
import { PromptCompare } from '../components/viz/PromptCompare'
import { CodeBlock } from '../components/CodeBlock'

export default function Section03() {
  return (
    <SectionShell id="section-3">
      <SectionHeader
        number={3}
        title="Prompting Mastery"
        subtitle="The model's capability is fixed. What changes between a useless answer and an excellent one is entirely how precisely you aimed it."
      />

      <Subsection title="Watch a prompt get better, one ingredient at a time" icon={<Wand2 className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          A prompt is not a question — it is a brief. Six ingredients, and most people send only one
          of them.
        </Takeaway>

        <PromptBuilder />

        <InfoCallout type="tip">
          <strong>The single highest-leverage change:</strong> add context. Who is asking, what the
          output is for, what is off the table. Almost every disappointing answer is missing context,
          not intelligence.
        </InfoCallout>
      </Subsection>

      <Subsection title="The same request, two ways" icon={<MessageSquare className="w-4 h-4 text-violet-500" />}>
        <PromptCompare pairs={[
          {
            id: 'Debugging',
            situation: 'An API endpoint got slow and you want to know why.',
            weak: 'Why is my endpoint slow?',
            weakResult: 'A generic checklist: "consider adding caching, check your database indexes, profile your code, look at N+1 queries…"\n\nNone of it is wrong. None of it is about your endpoint.',
            strong: `You are a senior backend engineer experienced with high-traffic Node APIs.

This Express endpoint serves ~2,000 req/s against Postgres 15. p99 went from 80ms to 1.4s after last week's release. We cannot add caching or change the database this quarter.

Identify the three most likely causes. For each: the symptom I would observe, the fix, and effort in hours.

[code]`,
            strongResult: 'Three ranked causes tied to your actual constraints — e.g. an unindexed column added in the migration, an N+1 introduced by a new include, and connection-pool exhaustion at that concurrency — each with an observable symptom and an hours estimate.',
            lesson: 'The model was equally capable both times. The second prompt gave it enough to be specific, and ruled out advice you could not act on.',
          },
          {
            id: 'Formatting',
            situation: 'You want structured data your code can parse.',
            weak: 'Extract the key info from this support ticket.',
            weakResult: 'A friendly paragraph summarising the ticket, formatted differently every single time. Your parser breaks on the second call.',
            strong: `Extract fields from the ticket below.

Reply with JSON only — no prose, no code fence:
{ "customer": string, "product": string, "severity": "low"|"medium"|"high", "summary": string }

If a field is not present, use null.

Ticket: [...]`,
            strongResult: 'Exactly that object, every time, parseable without cleanup. Adding "no prose, no code fence" removes the two things models most often wrap JSON in.',
            lesson: 'When code consumes the output, describe the schema literally. Better still, use the API\'s tool-use mode, which enforces it.',
          },
          {
            id: 'Reasoning',
            situation: 'A logic-heavy question where a plausible-sounding wrong answer is costly.',
            weak: 'Should we shard this table?',
            weakResult: 'A confident recommendation, arrived at instantly, with no visible reasoning — and no way for you to spot which assumption it got wrong.',
            strong: `Should we shard this table?

Think through it step by step before answering: current row count and growth rate, the actual queries hitting it, what sharding would cost us in query complexity, and what cheaper options we have not exhausted.

Then give a recommendation, and state what would change your mind.`,
            strongResult: 'Visible reasoning you can audit, an explicit recommendation, and a stated condition that would flip it — so you can check whether that condition holds.',
            lesson: 'Asking for the reasoning does not just show the work — the intermediate tokens genuinely improve the final answer on multi-step problems.',
          },
        ]} />
      </Subsection>

      <Subsection title="Where text enters the conversation" icon={<Layers className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Three distinct slots, often confused. Which one you use determines how much weight the
          instruction carries and whether the user can see or override it.
        </Takeaway>

        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'System prompt', subtitle: 'The character sheet', color: 'purple',
            content: 'Sent before the conversation. Defines who the model is and the rules it follows. The user never sees it.',
            points: [
              'A dedicated API field — Anthropic calls it `system`',
              'Carries more weight than anything in a user message',
              'Persists across every turn without being repeated by you',
              'Where role, constraints and output format belong',
            ],
            example: 'You are a senior TypeScript developer.\nAlways return fully typed code. Never use `any`.',
            tags: ['Hidden', 'Sets behaviour'],
          },
          {
            title: 'User prompt', subtitle: 'The actual request', color: 'blue',
            content: 'What the user types this turn. In an agent, this is often formatted data or tool results rather than prose.',
            points: [
              'One per turn, and the whole history is re-sent each call',
              'Works inside the frame the system prompt established',
              'The place for the specific task, not the standing rules',
            ],
            example: 'Review the function below for race conditions.',
            tags: ['Visible', 'Per turn'],
          },
          {
            title: 'Master prompt', subtitle: 'Your saved baseline', color: 'orange',
            content: 'Not an API concept — a personal habit. A template you paste at the start of every session so you stop re-explaining yourself.',
            points: [
              'Your stack, your experience level, your formatting preferences',
              'Standing rules that save you repeating the same correction',
              'In a chat UI it goes in as the first message; in an API project it becomes the system prompt',
              'Grow it whenever you notice yourself correcting the same thing twice',
            ],
            tags: ['Personal workflow', 'Reusable'],
          },
        ]} />

        <TryThisCallout
          title="A master prompt worth stealing"
          prompt={`## Me
Software developer, [X] years. Main stack: [TypeScript / Python]. I build [web apps / data pipelines].

## How I want answers
- Direct and concise. No preamble, no recap of my question.
- Code: complete and working, properly typed, not fragments.
- Explanations: assume I know the fundamentals. Skip the basics.
- Multiple options: give the trade-offs, then pick one and say why.
- No disclaimers or "consult a professional" unless I ask.

## Standing rules
- TypeScript strict mode. Never 'any'.
- Flag non-obvious security implications.
- If you are uncertain, say so instead of guessing.
- If my question rests on a wrong assumption, correct it before answering.`}
        />

        <InfoCallout type="info">
          Do not start with all of that. Two lines — your stack, and "be concise" — already changes
          the output noticeably. Add a rule each time something annoys you twice.
        </InfoCallout>
      </Subsection>

      <Subsection title="The six techniques" icon={<Wand2 className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          These transfer across every model and every provider. Learn the names so you can diagnose
          a bad answer — "that needs few-shot" is a fix, "it gave me rubbish" is not.
        </Takeaway>

        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Zero-shot', subtitle: 'Just ask', color: 'blue',
            content: 'State the task with no examples. Correct default for anything well-defined.',
            points: [
              'Works when "correct" is obvious from the task itself',
              'Fails on ambiguous goals or very specific output shapes',
              'If the first attempt is close but wrong-shaped, go few-shot',
            ],
            example: 'Summarise this article in three bullet points.',
            tags: ['Default choice'],
          },
          {
            title: 'Few-shot', subtitle: 'Show, do not tell', color: 'purple',
            content: 'Give two to five input → output pairs before the real input. Teaches format and style far more reliably than describing them.',
            points: [
              'The most effective fix for inconsistent formatting',
              'Three examples is usually the sweet spot',
              'Make one example an edge case — that is what it will get wrong',
            ],
            example: 'apple  → 🍎 apple (fruit)\nhammer → 🔨 hammer (tool)\nocean  → ?',
            tags: ['Format control'],
          },
          {
            title: 'Chain of thought', subtitle: 'Reason before answering', color: 'orange',
            content: 'Ask it to work through the problem first. Measurably improves accuracy on maths, logic and anything multi-step.',
            points: [
              'The intermediate tokens genuinely give it more to condition on — this is not a placebo',
              'Costs more tokens and more latency, so do not use it for simple lookups',
              'Reasoning models do this internally by default',
            ],
            example: 'Think it through step by step, considering edge cases, before your final recommendation.',
            tags: ['Accuracy', 'Costs tokens'],
          },
          {
            title: 'Role prompting', subtitle: 'Give it a perspective', color: 'teal',
            content: 'Naming an expert shifts vocabulary, depth and what the model thinks counts as a good answer.',
            points: [
              'Specific beats grand — "security engineer checking OWASP Top 10" outperforms "world-class expert"',
              'Adversarial roles are underused: "you are a sceptical reviewer, find the flaw"',
              'Belongs in the system prompt, not repeated every turn',
            ],
            example: 'You are a sceptical VC. Push back on every assumption in this pitch.',
            tags: ['Shifts framing'],
          },
          {
            title: 'Structured output', subtitle: 'Name the shape', color: 'green',
            content: 'Say exactly what format you want — a JSON schema, a markdown table, exactly three sentences.',
            points: [
              'Essential the moment code parses the response',
              'Say "JSON only, no prose and no code fence" — those are the two default wrappers',
              'In production, use tool use / function calling instead, which enforces the schema rather than requesting it',
            ],
            example: '{ "action": string, "confidence": number, "reasoning": string }',
            tags: ['Machine-readable'],
          },
          {
            title: 'Negative prompting', subtitle: 'Name what to avoid', color: 'red',
            content: 'Models have strong defaults — hedging, bullet points, restating your question. One line removes each.',
            points: [
              'Cheaper than describing the positive behaviour in detail',
              'Best paired with a positive instruction, not used alone',
              'Common wins: no disclaimers, no preamble, no code you did not ask for',
            ],
            example: 'Do not restate my question. Do not add caveats. Just answer.',
            tags: ['Removes defaults'],
          },
        ]} />
      </Subsection>

      <Subsection title="Prompt chaining" icon={<Link2 className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Stop trying to do everything in one prompt. Break the task into steps where each output
          feeds the next — this is also, exactly, how agents work under the hood.
        </Takeaway>

        <Points items={[
          <><strong>Each step is easier</strong> than the monolithic version, so each is done better.</>,
          <><strong>You can inspect and correct</strong> between steps instead of discovering a wrong turn at the end.</>,
          <><strong>You control the context</strong> — step 3 only needs step 2's output, not the whole history.</>,
        ]} />

        <Example label="A content pipeline, chained">
          Research 5 key points → turn those into an outline → write section 2 from the outline →
          critique the draft → apply the critique. Five focused calls beat one call asked to "write
          me a great article".
        </Example>

        <TryThisCallout
          title="Chained code review — send these one at a time"
          prompt={`Step 1
Review the code below and list: (1) bugs, (2) security issues, (3) performance problems.
Give each finding a line number and a severity. Do not fix anything yet.
[paste code]

Step 2 — after you have the list
Fix only the HIGH severity findings. Show the complete corrected function, not a diff.

Step 3
Explain why each fix addresses the root cause, phrased so I can paste it into a PR description.`}
        />

        <InfoCallout type="tip">
          Notice step 1 ends with "do not fix anything yet". Without it the model jumps straight to
          fixes and you lose the chance to triage.
        </InfoCallout>
      </Subsection>

      <Subsection title="Same idea, in code" icon={<Layers className="w-4 h-4 text-violet-500" />}>
        <CodeBlock tabs={[
          {
            label: 'System + user',
            language: 'python',
            note: 'The system prompt is a separate parameter, not the first message.',
            code: `from anthropic import Anthropic

client = Anthropic()

msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    temperature=0,
    system=(
        "You are a senior TypeScript developer. "
        "Return fully typed code. Never use 'any'. "
        "Be concise — no preamble."
    ),
    messages=[
        {"role": "user", "content": "Write a debounce function."}
    ],
)

print(msg.content[0].text)`,
          },
          {
            label: 'Few-shot',
            language: 'python',
            note: 'Examples go in as alternating user/assistant turns — the model reads them as precedent.',
            code: `messages = [
    {"role": "user", "content": "apple"},
    {"role": "assistant", "content": "🍎 apple (fruit)"},
    {"role": "user", "content": "hammer"},
    {"role": "assistant", "content": "🔨 hammer (tool)"},
    # The real request — it will follow the established pattern.
    {"role": "user", "content": "ocean"},
]

msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=100,
    messages=messages,
)`,
          },
          {
            label: 'Chained',
            language: 'python',
            note: 'Each step passes only what the next one needs — not the whole transcript.',
            code: `def ask(system: str, prompt: str) -> str:
    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        system=system,
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text


REVIEWER = "You are a meticulous code reviewer. Be specific and terse."

findings = ask(REVIEWER, f"List bugs and security issues with line numbers. Do not fix.\\n\\n{code}")
fixes    = ask(REVIEWER, f"Fix only the HIGH severity items below. Full function, not a diff.\\n\\n{findings}\\n\\n{code}")
pr_notes = ask(REVIEWER, f"Explain these fixes for a PR description.\\n\\n{fixes}")`,
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'System prompt',
            itemB: 'Master prompt',
            explanation: 'The system prompt is an API parameter. The master prompt is your personal saved template — which becomes the system prompt when you build something, or the first message when you are in a chat UI.',
            fix: 'One is a field in a request. The other is a habit.',
          },
          {
            itemA: 'More context',
            itemB: 'More relevant context',
            explanation: 'Relevant context helps enormously. Irrelevant context actively hurts — it dilutes attention and gives the model plausible-looking material to latch onto. Asking for a code review? Do not also paste your bio.',
            fix: 'Add what changes the answer. Cut everything else.',
          },
          {
            itemA: 'Better prompting',
            itemB: 'A better model',
            explanation: 'Prompting has a ceiling. If you have applied every technique and the output is still weak, the task genuinely needs more capability. Moving up a tier will beat another hour of prompt tweaking.',
            fix: 'They are complementary. Prompting first, because it is free — but know when to stop.',
          },
          {
            itemA: 'A long prompt',
            itemB: 'A good prompt',
            explanation: 'Length is not the variable. A precise 40-word brief with a clear constraint beats 400 words of throat-clearing. The builder above shows this — the "specific" options are not always the longest.',
            fix: 'Optimise for precision, not word count.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'System prompt versus user prompt — what actually differs?',
            answer: 'The system prompt is set once, hidden from the user, carries more weight, and defines behaviour. The user prompt is the per-turn request inside that frame. Standing rules go in the system prompt; the specific task goes in the user prompt.',
          },
          {
            question: 'Your API keeps returning JSON wrapped in a markdown code fence and breaking your parser. Fix?',
            answer: 'Short term: add "Reply with JSON only — no prose, no code fence." Properly: use tool use / function calling, which enforces the schema rather than politely asking for it.',
          },
          {
            question: 'The model gives shallow answers on hard technical questions. Single most effective change?',
            answer: 'Chain of thought — ask it to reason step by step before answering. The intermediate reasoning genuinely improves the final answer, not just its presentation.',
          },
          {
            question: 'You keep re-typing the same three corrections in every session. What should you build?',
            answer: 'A master prompt. Capture those corrections once as standing rules and paste it at the start of each session — or make it the system prompt if you are building something.',
          },
          {
            question: 'When is few-shot better than just describing the format you want?',
            answer: 'Almost always, when format consistency matters. Two or three worked examples pin down style, edge cases and structure more reliably than a paragraph of description.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 3 in eight lines" items={[
        { label: 'System prompt', value: 'Behaviour and rules. Set once, hidden, high weight.' },
        { label: 'Master prompt', value: 'Your saved baseline. Paste it at the start of every session.' },
        { label: 'Zero-shot', value: 'Just ask. The right default for well-defined tasks.' },
        { label: 'Few-shot', value: 'Two to five examples. The fix for inconsistent formatting.' },
        { label: 'Chain of thought', value: '"Think step by step." Costs tokens, buys accuracy on hard problems.' },
        { label: 'Role prompting', value: 'Specific expert beats grand expert. Put it in the system prompt.' },
        { label: 'Structured output', value: 'Name the schema. In production, use tool use to enforce it.' },
        { label: 'Chaining', value: 'Several focused calls beat one giant one. This is how agents work.' },
      ]} />
    </SectionShell>
  )
}
