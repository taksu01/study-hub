import {
  SectionShell, SectionHeader, Subsection, Prose,
  ExpandableCardGrid, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout, TryThisCallout
} from '../components/ui'

export default function Section03() {
  return (
    <SectionShell id="section-3">
      <SectionHeader
        number={3}
        title="Prompting Mastery"
        subtitle="How you talk to AI determines what you get. Learn the techniques that separate mediocre results from exceptional ones."
      />

      <Subsection title="The Foundation: What a Prompt Really Is">
        <Prose>
          <p>A prompt is the complete input to an AI model — including any instructions, context, examples, and the actual question or task. Most people only think about the question part and wonder why the results are mediocre.</p>
          <p>Think of a model like a brilliant contractor. If you say "build me a house," you'll get something generic. If you say "build a 3-bedroom house in minimalist style, under $400k, with open floor plan, in Seattle's climate" — you'll get something actually useful. The model's capability is fixed; what changes is how precisely you direct it.</p>
        </Prose>
        <InfoCallout type="tip">
          <strong>The single biggest prompting improvement:</strong> Add context. Who are you? What's the output for? What constraints matter? What should it NOT do? More relevant context → dramatically better outputs.
        </InfoCallout>
      </Subsection>

      <Subsection title="The Three Prompt Types — and Why They Matter">
        <Prose>
          <p>There are three distinct places text enters a conversation with an AI. Each serves a different purpose and has different implications for how you build AI-powered tools.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'System Prompt',
            subtitle: 'The character sheet',
            content: 'Instructions given before the conversation starts. Defines who the AI is, what it knows, what rules it follows.',
            details: 'The system prompt is where you set up the AI\'s persona, constraints, expertise, and output format. The user never sees it. Example uses:\n• "You are a senior TypeScript developer. Always return typed code. Never use `any`."\n• "You are a trading assistant. Only discuss market analysis. Never give financial advice."\n• "You respond only in JSON. No prose."\n\nIn most APIs, the system prompt is a separate field from the user messages. In Claude, it\'s the `system` parameter.',
            tags: ['Hidden from user', 'Sets behavior'],
            color: 'purple',
          },
          {
            title: 'User Prompt',
            subtitle: 'The actual request',
            content: 'The message the user sends. The task, question, or input for this specific turn.',
            details: 'This is what users type. In a chatbot, this is the conversation. In an agent, this might be formatted data, a task description, or tool results. The user prompt works in conjunction with the system prompt — the system prompt sets up the context, the user prompt is the specific request within that context.',
            tags: ['Visible to user', 'Per-turn input'],
            color: 'blue',
          },
          {
            title: 'Master Prompt',
            subtitle: 'Your personal system prompt template',
            content: 'A reusable system prompt you\'ve crafted that you paste into every new conversation as your personal baseline.',
            details: 'Not an API concept — a personal workflow concept. Your master prompt might say:\n• Your name and role\n• How you prefer to receive answers (concise? with examples?)\n• Technologies you use (TypeScript, Python, React)\n• Communication preferences ("always give me the tradeoffs", "be direct, no fluff")\n\nInstead of re-explaining yourself every conversation, your master prompt instantly puts the model in "expert collaborator" mode for you specifically.',
            tags: ['Personal workflow', 'Reusable'],
            color: 'orange',
          },
        ]} />

        <TryThisCallout
          title="Try: Your First System Prompt"
          prompt={`You are a senior full-stack developer specializing in TypeScript, React, and Node.js.

When answering:
- Always use TypeScript with proper types (never use 'any')
- Prefer functional components with hooks
- Show the complete implementation, not just snippets
- Point out potential performance issues or security concerns
- Keep explanations concise — I'm an experienced developer

When I ask about architecture decisions, give me the tradeoffs, not just one option.`}
        />
      </Subsection>

      <Subsection title="The 6 Core Prompting Techniques">
        <Prose>
          <p>These techniques are transferable across every model. Learn these and your results will improve immediately, regardless of which AI you're using.</p>
        </Prose>
        <div className="mt-4" />
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Zero-shot Prompting',
            subtitle: 'Just ask directly',
            content: 'Give the task with no examples. Works for most tasks that the model understands from training.',
            details: 'Best for: clear, well-defined tasks. "Summarize this article in 3 bullet points." "Write a Python function that reverses a linked list." "Classify this email as spam or not spam."\n\nWhen it fails: ambiguous tasks where "correct" isn\'t obvious, highly specialized formats, or tasks requiring very specific output structure. Use few-shot instead.',
            tags: ['Simple', 'No examples needed'],
            color: 'blue',
          },
          {
            title: 'Few-shot Prompting',
            subtitle: 'Learn from examples',
            content: 'Show the model 2-5 examples of input → output before giving your actual task.',
            details: 'Examples teach format, style, and behavior more reliably than instructions alone. Input: "apple" → Output: "🍎 apple (fruit)"\nInput: "hammer" → Output: "🔨 hammer (tool)"\nInput: "ocean" → Output: ?\n\nThe model learns the pattern from your examples. Use this when: output format is specific, the style needs to match existing content, or you need consistent behavior across many inputs.',
            tags: ['Consistent output', 'Format control'],
            color: 'purple',
          },
          {
            title: 'Chain of Thought',
            subtitle: 'Think step by step',
            content: 'Ask the model to reason through the problem before giving an answer. Dramatically improves accuracy on complex tasks.',
            details: 'Simply adding "think step by step" or "let\'s work through this carefully" to your prompt improves accuracy on math, logic, and multi-step reasoning significantly. Why it works: the model\'s intermediate reasoning tokens give it more context to draw on when generating the final answer.\n\nFor critical decisions, ask: "Think through this carefully, considering edge cases, before giving your final recommendation."',
            tags: ['Better accuracy', '+reasoning'],
            color: 'orange',
          },
          {
            title: 'Role Prompting',
            subtitle: 'Give it a persona',
            content: 'Tell the model it\'s a specific expert. "You are a..." shapes vocabulary, depth, and perspective.',
            details: '"You are a security engineer reviewing code for OWASP top 10 vulnerabilities."\n"You are a Michelin-starred chef explaining flavor balance to a home cook."\n"You are a skeptical VC investor. Push back on every assumption in my pitch."\n\nRole prompting works because the model has learned different styles and knowledge frameworks from training. The persona shifts the probability distribution of outputs toward that expertise. Combine with system prompts for powerful effect.',
            tags: ['Shifts perspective', 'Expert framing'],
            color: 'teal',
          },
          {
            title: 'Structured Output',
            subtitle: 'Control the format',
            content: 'Tell the model exactly what format you want: JSON, markdown table, numbered list, specific schema.',
            details: '"Reply only in JSON with this structure: { action: string, confidence: number, reasoning: string }"\n"Format your response as a markdown table with columns: Feature | Pros | Cons | Use Case"\n"Respond in exactly 3 sentences."\n\nStructured output is critical when the AI\'s response is consumed by code. Modern APIs (Claude, OpenAI) also support "tool use" / "function calling" which forces JSON schema adherence — use that for production.',
            tags: ['Machine-readable', 'API-friendly'],
            color: 'green',
          },
          {
            title: 'Negative Prompting',
            subtitle: 'Define what NOT to do',
            content: 'Explicitly tell the model what to avoid. Prevents common failure modes without lengthy instructions.',
            details: '"Do not include caveats, disclaimers, or suggestions to consult a professional."\n"Do not use bullet points. Write in prose only."\n"Do not explain what you\'re about to do. Just do it."\n"Don\'t include any code I didn\'t ask for."\n\nAI models have default behaviors (adding disclaimers, using bullet points, being verbose). Negative prompting overrides these defaults efficiently. Pair with positive instructions for best results.',
            tags: ['Removes defaults', 'Prevents drift'],
            color: 'red',
          },
        ]} />
      </Subsection>

      <Subsection title="Building Your Master Prompt">
        <Prose>
          <p>A master prompt is your personal baseline that you paste at the start of every new conversation. It saves you from re-explaining yourself every time and ensures you always get responses calibrated to your needs.</p>
          <p>A good master prompt includes: who you are and your technical level, the technologies you work with, how you prefer responses formatted, what you don't want, and any standing instructions that save you from repeating yourself.</p>
        </Prose>

        <TryThisCallout
          title="Master Prompt Template — Copy and Customize"
          prompt={`## About Me
I'm a software developer with [X] years of experience. My primary stack is [TypeScript/Python/etc.] and I work on [web apps/data pipelines/etc.].

## How I Like to Work
- Be direct and concise. I don't need lengthy preambles.
- When I ask for code: give me complete, working implementations with proper types
- When I ask for explanations: assume I understand fundamentals, skip basics
- When there are multiple approaches: briefly describe the tradeoffs, then recommend one
- Don't add disclaimers, caveats, or "consult a professional" unless I specifically ask

## My Current Context
I'm working on: [describe your current project]
My main goal right now: [what you're trying to accomplish]

## Standing Rules
- Always use TypeScript strict mode, no 'any'
- Prefer functional patterns over OOP where reasonable
- Flag security implications when they're non-obvious
- If you're uncertain, say so rather than guessing`}
        />

        <InfoCallout type="info">
          You don't have to use all of this. Start with just the technical stack + "be concise" and you'll already see improvement. Expand the prompt as you notice repeated annoyances.
        </InfoCallout>
      </Subsection>

      <Subsection title="Advanced: Prompt Chaining">
        <Prose>
          <p>For complex tasks, don't try to do everything in one prompt. Break it into a pipeline where each step feeds the next — this is called prompt chaining and it's the foundation of how AI agents work.</p>
          <p>Example pipeline for content creation: Step 1 → "Research the topic, give me 5 key points" → Step 2 → "Given these key points, create an outline" → Step 3 → "Given this outline, write section 2 in detail" → Step 4 → "Review this draft and identify improvements."</p>
          <p>Each step is simpler and produces better output than one giant prompt trying to do everything at once. This is also how you work within context windows — only include what the current step actually needs.</p>
        </Prose>

        <TryThisCallout
          title="Try: Prompt Chaining for Code Review"
          prompt={`Step 1 — Send this first:
"Review the following code and identify: (1) bugs, (2) security issues, (3) performance problems.
List each finding with its line number and severity. Don't fix anything yet.
[paste your code]"

Step 2 — After getting the list, send:
"Now fix only the HIGH severity issues from your list.
Show the complete corrected function, not just the changed lines."

Step 3 — Then:
"Explain why each fix addresses the underlying issue,
in a way I could include in a PR description."`}
        />
      </Subsection>

      <Subsection title="Common Confusion">
        <CommonConfusionBlock confusions={[
          {
            itemA: 'System prompt',
            itemB: 'Master prompt',
            explanation: 'System prompt is an API-level concept — a dedicated parameter that sets model behavior. Master prompt is a personal workflow concept — your saved template. For Claude.ai chat (no API), your master prompt is pasted as the first user message. For API projects, it goes in the system parameter.',
          },
          {
            itemA: 'More context = better',
            itemB: 'Always',
            explanation: 'More relevant context is better. More irrelevant context can hurt — the model may get confused by noise or lose focus on what matters. Cut information that doesn\'t serve the task. If you\'re asking for a code review, don\'t also include your personal introduction unless it changes the expected output.',
          },
          {
            itemA: 'Better prompting',
            itemB: 'Replacing a more capable model',
            explanation: 'Prompting has limits. Some tasks genuinely require a stronger model. If you\'ve tried all the techniques and quality is still poor, switching from Haiku to Sonnet to Opus will help more than any prompt engineering. Prompting and model selection are complementary, not substitutes.',
          },
        ]} />
      </Subsection>

      <Subsection title="Mini Recall">
        <MiniRecallBlock questions={[
          { question: 'What\'s the difference between a system prompt and a user prompt?', answer: 'System prompt: hidden instructions that define the AI\'s behavior and persona, set before the conversation. User prompt: the actual message the user sends each turn. System prompt sets up the context; user prompt is the specific request within that context.' },
          { question: 'You\'re getting inconsistent output formats from an AI API. Which technique helps most?', answer: 'Structured output prompting — explicitly specify the exact JSON schema or format you want. For production systems, use function calling / tool use which enforces a JSON schema.' },
          { question: 'Your AI gives shallow answers on complex technical topics. What\'s the most effective single change?', answer: 'Add chain-of-thought: "Think through this carefully step by step before answering." This forces the model to reason more deeply before generating its response.' },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 3 Summary" items={[
        { label: 'System prompt', value: 'Defines AI behavior. Set once per conversation. Hidden from end users.' },
        { label: 'Master prompt', value: 'Your personal reusable system prompt. Paste at start of every session.' },
        { label: 'Few-shot', value: 'Show 2-5 examples to teach format and style.' },
        { label: 'Chain of thought', value: '"Think step by step" — improves accuracy on complex tasks.' },
        { label: 'Role prompting', value: '"You are a [expert]..." shifts style, vocabulary, and depth.' },
        { label: 'Structured output', value: 'Specify JSON schema or exact format when output goes into code.' },
        { label: 'Prompt chaining', value: 'Break complex tasks into sequential steps — each feeds the next.' },
        { label: 'Core rule', value: 'More relevant context → better results. Irrelevant context → noise.' },
      ]} />
    </SectionShell>
  )
}
