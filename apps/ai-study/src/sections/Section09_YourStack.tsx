import { Sparkles, Layers, Wallet, ShieldCheck, CalendarClock, HelpCircle, AlertTriangle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Points, Example,
  ExpandableCardGrid, CompareTable, MiniRecallBlock, CheatSheetPanel,
  InfoCallout, CommonConfusionBlock,
} from '../components/ui'
import { ModelChooser } from '../components/viz/ModelChooser'
import { CostLab } from '../components/viz/CostLab'
import { CodeBlock, Code } from '../components/CodeBlock'

export default function Section09() {
  return (
    <SectionShell id="section-9">
      <SectionHeader
        number={9}
        title="Your AI Stack"
        subtitle="Not one tool — four layers, and a habit of routing each task to the cheapest thing that can do it well."
      />

      <Subsection title="The four layers" icon={<Layers className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          A good setup is small and deliberate. One capable cloud model, one local model, an
          automation layer, and a knowledge layer. Everything else is a variation.
        </Takeaway>

        <div className="space-y-2.5 mb-6">
          {[
            {
              name: 'Primary cloud model', tool: 'Claude Sonnet or GPT-4o',
              job: 'Your thinking partner. Coding, research, writing, anything hard.',
              note: 'Pay for this one. The gap between free tiers and a paid frontier model is the difference you feel daily.',
              colour: 'border-violet-200 bg-violet-50',
            },
            {
              name: 'Local model', tool: 'Ollama + Llama 3.1 8B',
              job: 'Private work, high-volume work, offline work.',
              note: 'Free per call, which changes what is worth automating at all.',
              colour: 'border-blue-200 bg-blue-50',
            },
            {
              name: 'Automation layer', tool: 'n8n, or cron and a script',
              job: 'Things that run without you — digests, webhooks, pipelines.',
              note: 'The plumbing connecting both models to everything else you use.',
              colour: 'border-amber-200 bg-amber-50',
            },
            {
              name: 'Knowledge layer', tool: 'Open WebUI collections or Chroma',
              job: 'Your notes and documents, made queryable.',
              note: 'Turns "I wrote that down somewhere" into an answer with a citation.',
              colour: 'border-emerald-200 bg-emerald-50',
            },
          ].map(l => (
            <div key={l.name} className={`rounded-xl border p-4 ${l.colour}`}>
              <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
                <h4 className="text-sm font-semibold text-slate-800">{l.name}</h4>
                <code className="text-[12px] font-mono text-slate-600 bg-white/70 px-2 py-0.5 rounded">
                  {l.tool}
                </code>
              </div>
              <p className="text-sm text-slate-700">{l.job}</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{l.note}</p>
            </div>
          ))}
        </div>

        <InfoCallout type="tip">
          <strong>Do not start with four.</strong> Get the cloud model working, then add Ollama when
          you first hit something you would rather not upload. The other two layers earn their place
          later, or never.
        </InfoCallout>
      </Subsection>

      <Subsection title="Routing: which model for this task?" icon={<Sparkles className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Ask the questions in this order. Privacy first, because it eliminates options rather than
          ranking them; then volume; then difficulty.
        </Takeaway>

        <ModelChooser />

        <CompareTable
          headers={['Reach for', 'Because']}
          rows={[
            { attribute: 'Coding and hard reasoning', values: ['Claude Sonnet', 'Best balance of capability and cost, with 200k context'] },
            { attribute: 'High-volume simple work', values: ['Claude Haiku / GPT-4o-mini', '10–12× cheaper and entirely adequate for classification and extraction'] },
            { attribute: 'Genuinely hard multi-step problems', values: ['Claude Opus with extended thinking, o-series', 'Only when a standard model has repeatedly failed'] },
            { attribute: 'Anything sensitive', values: ['Ollama + Llama 3.1 8B', 'Nothing leaves the machine — the only guarantee that holds'] },
            { attribute: 'Local coding', values: ['Qwen 2.5 Coder 14B', 'Beats larger general models on code'] },
            { attribute: 'Local reasoning', values: ['DeepSeek-R1', 'Shows its chain of thought; strong on maths and logic'] },
            { attribute: 'Inputs over 200k tokens', values: ['Gemini 2.5 Pro', 'One million token window, and the cheapest input rate'] },
          ]}
        />

        <InfoCallout type="tip">
          <strong>The 80/20 of this whole section:</strong> one mid-tier cloud model handles most of
          what you will throw at it. Add a local model for privacy and a cheap model for volume. Three
          models is a complete stack; ten is a hobby.
        </InfoCallout>
      </Subsection>

      <Subsection title="What it actually costs" icon={<Wallet className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Model choice dominates. Prompt length matters far less than people assume — until you
          multiply it by volume, at which point caching becomes the biggest single lever.
        </Takeaway>

        <CostLab />

        <Points items={[
          <><strong>Tier your models.</strong> There is a 10–60× spread between the cheapest and most capable tier. Getting routing right beats every other optimisation combined.</>,
          <><strong>Cache repeated prefixes.</strong> A long system prompt or a fixed document sent on every call should be cached — roughly a tenth of the rate on the cached portion.</>,
          <><strong>Go local above a threshold.</strong> Somewhere past a few thousand calls a day, hardware you own is cheaper than tokens you rent.</>,
          <><strong>Bound your outputs.</strong> Output tokens cost 4–5× input tokens. "Answer in three bullets" is a cost control, not just a style preference.</>,
        ]} />

        <CodeBlock tabs={[
          {
            label: 'Prompt caching',
            language: 'python',
            note: 'Mark the stable prefix. Everything after it varies per call and is billed normally.',
            code: `msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": LONG_STANDING_INSTRUCTIONS,   # identical on every call
            "cache_control": {"type": "ephemeral"},
        },
        {
            "type": "text",
            "text": REFERENCE_DOCUMENT,          # also stable — also cached
            "cache_control": {"type": "ephemeral"},
        },
    ],
    messages=[{"role": "user", "content": user_question}],
)

# The response reports what was read from cache versus written to it.
print(msg.usage.cache_read_input_tokens, msg.usage.cache_creation_input_tokens)`,
          },
          {
            label: 'Routing by task',
            language: 'python',
            note: 'A dozen lines that typically cut a bill by more than half.',
            code: `FAST = "claude-haiku-4-5-20251001"
GOOD = "claude-sonnet-4-6"
LOCAL = "llama3.1:8b"


def route(task_kind: str, sensitive: bool = False) -> tuple[str, object]:
    """Pick a model before picking a prompt."""
    if sensitive:
        return LOCAL, ollama_client

    if task_kind in {"classify", "extract", "tag", "summarise_short"}:
        return FAST, cloud_client

    return GOOD, cloud_client`,
          },
        ]} />
      </Subsection>

      <Subsection title="Privacy — where the data actually goes" icon={<ShieldCheck className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The important distinction is not "cloud versus local" but "API versus consumer product".
          They have different terms, and people routinely assume the wrong one.
        </Takeaway>

        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Fine for the cloud', subtitle: 'The common case', color: 'green',
            content: 'Public information, non-proprietary code, general questions, ordinary creative work.',
            points: [
              'Major providers do not train on API traffic by default',
              'This covers the large majority of everyday developer work',
              'Read the current policy rather than trusting a blog post about it',
            ],
            tags: ['Check the terms'],
          },
          {
            title: 'Keep it local', subtitle: 'When it must not leave', color: 'orange',
            content: 'Medical, legal, financial records. Client data under confidentiality. Unreleased plans.',
            points: [
              'If a leak would be a legal or compliance problem, the answer is local',
              'Ollama gives an absolute guarantee, not a policy promise',
              'Data residency requirements usually rule out cloud entirely',
            ],
            tags: ['Ollama'],
          },
          {
            title: 'API ≠ the chat product', subtitle: 'The distinction people miss', color: 'red',
            content: 'The same company\'s API and consumer app can have materially different data terms.',
            points: [
              'API traffic under your own key is generally excluded from training by default',
              'Consumer tiers may differ — check the settings and the policy',
              '"I use Claude at work" does not tell you which terms apply',
            ],
            tags: ['Read the policy'],
          },
        ]} />

        <Example label="A rule you can apply without thinking">
          Would you be comfortable if this text appeared in a third party's logs? If you hesitate,
          route it local. The hesitation is the signal.
        </Example>
      </Subsection>

      <Subsection title="A workflow that holds together" icon={<CalendarClock className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          The goal is not to use AI for everything. It is to spend your attention on the parts that
          genuinely need you.
        </Takeaway>

        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Development', subtitle: 'Claude Code + Sonnet', color: 'purple',
            content: 'Filesystem and search MCP servers, plus a CLAUDE.md that explains your project once.',
            points: [
              'Write the architecture and conventions down once; every session inherits it',
              'Add the GitHub MCP server when you review PRs regularly',
              'Custom slash commands for anything you have explained twice',
            ],
            tags: ['MCP', 'CLAUDE.md'],
          },
          {
            title: 'Research and learning', subtitle: 'Sonnet with search', color: 'blue',
            content: 'Long context handles most papers and docs whole — no RAG needed.',
            points: [
              'Paste the document rather than building a pipeline for one read',
              'Ask it to check your understanding, not just to explain',
              'Web search MCP for anything after the training cutoff',
            ],
            tags: ['Long context'],
          },
          {
            title: 'Private work', subtitle: 'Ollama + Open WebUI', color: 'green',
            content: 'A local knowledge collection over documents that cannot be uploaded.',
            points: [
              'Slightly lower quality, absolute privacy guarantee',
              'Excellent at summarising and extraction, which is most of this work anyway',
            ],
            tags: ['Zero exposure'],
          },
          {
            title: 'Automation', subtitle: 'n8n or cron + Haiku', color: 'orange',
            content: 'Scheduled jobs and webhooks, on the cheap tier by default.',
            points: [
              'Use the cheap model until a specific task visibly needs better',
              'Alert yourself when an automation fails — silent breakage is the norm otherwise',
              'Log the model output so you can audit what it decided and why',
            ],
            tags: ['Cheap tier'],
          },
        ]} />

        <CodeBlock tabs={[
          {
            label: 'Morning briefing',
            language: 'python',
            note: 'Run from cron or Task Scheduler. Cheap model, bounded output, one delivery.',
            code: `import anthropic

client = anthropic.Anthropic()

SYSTEM = """You write a morning brief for a developer.
Five bullets maximum. No preamble, no sign-off.
Lead with anything that changed materially overnight.
If nothing is worth reporting, say exactly that."""


def main() -> None:
    context = "\\n\\n".join([
        f"Headlines:\\n{fetch_headlines()}",
        f"Calendar:\\n{fetch_today()}",
        f"Open PRs:\\n{fetch_prs()}",
    ])

    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",   # cheap tier is plenty here
        max_tokens=600,                       # bounded output, bounded cost
        system=SYSTEM,
        messages=[{"role": "user", "content": context}],
    )

    deliver(msg.content[0].text)   # email, Telegram, Slack, a file


if __name__ == "__main__":
    main()`,
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'Using the best model',
            itemB: 'Building the best system',
            explanation: 'Routing every task to your most capable model is the most expensive way to be roughly as effective. Classification on a frontier model costs 60× what it needs to and is not measurably better at it.',
            fix: 'Route by task. Escalate only on observed failure.',
          },
          {
            itemA: 'Prompt caching',
            itemB: 'A general discount',
            explanation: 'Caching only applies to a stable prefix reused across calls. If every request differs from the first token, there is nothing to cache and you pay a small write penalty for trying.',
            fix: 'Cache the fixed part — system prompt, reference docs. Nothing else.',
          },
          {
            itemA: 'Local means private',
            itemB: 'Your setup is private',
            explanation: 'A local model is private. A local model behind a tool that also calls a cloud API for embeddings, or logs prompts somewhere, is not. Check the whole path.',
            fix: 'Privacy is a property of the pipeline, not of one component.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: '500,000 support messages a day need classifying. Which model?',
            answer: 'The cheap tier — Haiku or GPT-4o-mini. At that volume cost dominates, and classification is well within a small model\'s ability. Escalate only the cases it flags as uncertain.',
          },
          {
            question: 'A consultant wants to run client legal documents through AI. What do you tell them?',
            answer: 'Local, via Ollama. Client confidentiality and data residency obligations usually make cloud processing a contractual problem regardless of the provider\'s training policy.',
          },
          {
            question: 'What is prompt caching and when is it worth wiring up?',
            answer: 'The provider stores a repeated prompt prefix and bills it at roughly a tenth of the rate. Worth it when a large system prompt or fixed document is reused across many calls — a RAG service, an agent with long standing instructions. Pointless when every request is unique.',
          },
          {
            question: 'Your monthly bill tripled and nothing obvious changed. Where do you look first?',
            answer: 'Which model is handling which calls. A default that silently moved up a tier, or a new code path routing routine work to the expensive model, explains this far more often than prompt length does.',
          },
          {
            question: 'Someone says "we use AI locally so we are private". What should you check?',
            answer: 'The whole path. Local generation plus a cloud embedding call, or a tool that logs prompts to a hosted service, is not private. Privacy is a property of the pipeline, not of the model.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Your complete reference" items={[
        { label: 'Daily coding', value: 'Claude Code + Sonnet + filesystem and search MCP' },
        { label: 'High volume', value: 'Haiku or GPT-4o-mini — 10–12× cheaper, plenty for routine work' },
        { label: 'Hard problems', value: 'Opus with extended thinking, or an o-series model. Only on repeated failure.' },
        { label: 'Local general', value: 'ollama pull llama3.1:8b (16 GB) · llama3.3:70b (64 GB)' },
        { label: 'Local coding', value: 'ollama pull qwen2.5-coder:14b' },
        { label: 'Local reasoning', value: 'ollama pull deepseek-r1:14b' },
        { label: 'Automation', value: 'docker run n8nio/n8n, or cron plus a script. Cheap tier by default.' },
        { label: 'RAG, no code', value: 'Open WebUI → Workspace → Knowledge' },
        { label: 'RAG, custom', value: 'chromadb + sentence-transformers, fully local' },
        { label: 'Prompt caching', value: 'cache_control on the stable prefix. ~10% of the input rate.' },
        { label: 'Privacy rule', value: 'Would you mind it in someone\'s logs? Hesitation means local.' },
        { label: 'Consoles', value: 'console.anthropic.com for keys and usage · localhost:11434 for Ollama' },
        { label: 'The habit', value: 'Pick the model before you write the prompt.' },
      ]} />
    </SectionShell>
  )
}
