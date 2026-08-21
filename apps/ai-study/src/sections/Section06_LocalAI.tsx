import { Monitor, Download, Cpu, Boxes, BookOpen, HelpCircle, AlertTriangle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Example,
  ExpandableCardGrid, TermsMemoryBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout, NumberedSteps, CommonConfusionBlock, CompareTable,
} from '../components/ui'
import { HardwareLab } from '../components/viz/HardwareLab'
import { CodeBlock, Code } from '../components/CodeBlock'

export default function Section06() {
  return (
    <SectionShell id="section-6">
      <SectionHeader
        number={6}
        title="Local AI Setup"
        subtitle="Capable models running on your own machine — free, private, offline. The whole setup takes about five minutes; picking the right model takes the rest of this section."
      />

      <Subsection title="Why bother" icon={<Monitor className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Cloud APIs are more capable. Local models are private, free per call, and always available.
          The right answer is to have both and route between them.
        </Takeaway>

        <ExpandableCardGrid columns={3} cards={[
          {
            title: 'Privacy', subtitle: 'Nothing leaves the machine', color: 'green',
            content: 'The only option for data you genuinely cannot send to a third party.',
            points: [
              'Medical and legal documents, unreleased specs, client contracts',
              'Personal journals, financial records, trading strategies',
              'No API terms to read, because there is no API',
            ],
            tags: ['Zero exposure'],
          },
          {
            title: 'Zero marginal cost', subtitle: 'Free after the hardware', color: 'blue',
            content: 'Unlimited calls for the price of electricity. Transforms what is worth automating.',
            points: [
              'High-volume classification and tagging becomes free',
              'You can afford to run something on every file, every message, every commit',
              'No rate limits and no quota anxiety while prototyping',
            ],
            tags: ['High volume'],
          },
          {
            title: 'Always available', subtitle: 'No network required', color: 'orange',
            content: 'Planes, outages, corporate firewalls that block AI services.',
            points: [
              'Develop and test without burning API credits',
              'No provider outage can take your tool down',
              'Deterministic latency — no queue behind other customers',
            ],
            tags: ['Offline'],
          },
        ]} />

        <InfoCallout type="warning">
          <strong>The honest trade-off:</strong> an 8B local model is not Claude. It is genuinely good
          at summarising, rewriting, extraction and classification, and noticeably weaker at hard
          reasoning and long-horizon coding. Route accordingly rather than expecting parity.
        </InfoCallout>
      </Subsection>

      <Subsection title="What will actually run on your machine" icon={<Cpu className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Memory is the binding constraint, not the CPU. If the model does not fit in RAM it spills to
          disk, and "slow" becomes "unusable".
        </Takeaway>

        <HardwareLab />

        <Example label="The rule of thumb behind that lab">
          <strong>Memory needed ≈ parameters × bytes-per-weight × 1.2.</strong> At Q4 that is about
          0.55 bytes per parameter — so a 7B model needs roughly 4 GB, and a 70B model roughly 39 GB.
          Leave 4–6 GB free for the OS on top.
        </Example>

        <InfoCallout type="tip">
          <strong>Apple Silicon is unusually good at this.</strong> Unified memory means a 32 GB
          MacBook can run models that would need a 32 GB discrete GPU on a PC. On Windows and Linux,
          VRAM is what counts if you have a dedicated card; system RAM if you do not.
        </InfoCallout>
      </Subsection>

      <Subsection title="Ollama in five minutes" icon={<Download className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Ollama downloads, loads and serves models, and exposes an OpenAI-compatible API on
          <Code>localhost:11434</Code>. Anything written against the OpenAI SDK works against it with
          a changed base URL.
        </Takeaway>

        <NumberedSteps steps={[
          {
            title: 'Install',
            description: 'Download the installer from ollama.com — Windows, macOS and Linux all have one-click builds.',
            code: 'ollama --version',
          },
          {
            title: 'Pull and run your first model',
            description: 'Start small. This is ~2 GB and runs on almost anything. First run downloads; later runs are instant.',
            code: 'ollama run llama3.2:3b',
          },
          {
            title: 'Step up to the everyday workhorse',
            description: 'If the lab above says you have room, this is the model most people should actually live on.',
            code: 'ollama pull llama3.1:8b',
          },
          {
            title: 'Check what you have and what it costs you',
            description: 'List installed models with their sizes, and inspect one to see its context window and quantization.',
            code: 'ollama list\nollama show llama3.1:8b',
          },
          {
            title: 'Add a chat UI (optional)',
            description: 'Open WebUI gives you a ChatGPT-like interface over your local models, with document upload for RAG built in.',
            code: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main',
          },
        ]} />

        <CodeBlock tabs={[
          {
            label: 'Python (OpenAI SDK)',
            language: 'python',
            note: 'Two lines change. Everything else is identical to calling OpenAI.',
            code: `from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",  # Ollama, not OpenAI
    api_key="ollama",                       # Required, but ignored
)

resp = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "Explain what a token is."}],
)

print(resp.choices[0].message.content)`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
})

const resp = await client.chat.completions.create({
  model: 'llama3.1:8b',
  messages: [{ role: 'user', content: 'Explain what a token is.' }],
})

console.log(resp.choices[0].message.content)`,
          },
          {
            label: 'Shell',
            language: 'bash',
            code: `# Interactive session — Ctrl+D to exit
ollama run llama3.1:8b

# One-shot prompt
ollama run llama3.1:8b "Explain what a token is in AI"

# Native REST API
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1:8b",
  "messages": [{"role": "user", "content": "Hello"}],
  "stream": false
}'

# Free up disk when you are done experimenting
ollama rm llama3.2:3b`,
          },
        ]} />
      </Subsection>

      <Subsection title="Which model for which job" icon={<Boxes className="w-4 h-4 text-violet-500" />}>
        <ExpandableCardGrid columns={2} cards={[
          {
            title: 'Llama 3.1 8B', subtitle: 'Start here', color: 'blue',
            content: 'The default recommendation. Fits in ~6 GB, fast enough to be pleasant, good at everyday work.',
            points: [
              'Summarising, rewriting, extraction, question answering',
              'Comfortable on a 16 GB laptop with room to spare',
              'If you only ever install one local model, make it this',
            ],
            example: 'ollama pull llama3.1:8b',
            tags: ['16 GB', 'Balanced'],
          },
          {
            title: 'Qwen 2.5 Coder', subtitle: 'Best local coding model', color: 'orange',
            content: 'Coding-specialised and routinely beats larger general models on code tasks.',
            points: [
              'Available at 7B (~5 GB) and 14B (~9 GB)',
              'Strong at generation, review, and explaining unfamiliar code',
              'The 14B is worth the extra memory if you have it',
            ],
            example: 'ollama pull qwen2.5-coder:7b',
            tags: ['Coding', '16–32 GB'],
          },
          {
            title: 'DeepSeek-R1', subtitle: 'Best local reasoning', color: 'teal',
            content: 'Shows its full chain of thought in <think> tags. Competitive with closed reasoning models on maths.',
            points: [
              'Sizes from 7B to 70B — start at 7B and move up if it is not enough',
              'Much slower than a standard model, by design',
              'Use it for the hard problems, not as your daily driver',
            ],
            example: 'ollama pull deepseek-r1:7b',
            tags: ['Reasoning', 'Shows thinking'],
          },
          {
            title: 'Phi-4 / Phi-3 Mini', subtitle: 'For constrained hardware', color: 'green',
            content: 'Microsoft\'s small models punch well above their parameter count.',
            points: [
              'phi3:mini is ~2 GB and runs on 8 GB machines comfortably',
              'Beats larger models on some reasoning benchmarks',
              'The right answer when nothing else fits',
            ],
            example: 'ollama pull phi3:mini',
            tags: ['8 GB friendly'],
          },
          {
            title: 'Llama 3.3 70B', subtitle: 'Best local quality', color: 'purple',
            content: 'Close to cloud quality on many tasks — if you have the memory for it.',
            points: [
              '~39 GB at Q4, so realistically 64 GB of RAM or a serious GPU',
              'Worth it when privacy is non-negotiable and the work is hard',
              'Expect seconds per response, not milliseconds, on CPU',
            ],
            example: 'ollama pull llama3.3:70b',
            tags: ['64 GB'],
          },
          {
            title: 'Gemma 2', subtitle: 'Reliable instruction follower', color: 'cyan',
            content: 'Google\'s open family. Well-behaved and consistent about following complex instructions.',
            points: [
              '9B is ~6 GB; 27B is ~17 GB',
              'A good pick when you need it to obey a strict output format',
            ],
            example: 'ollama pull gemma2:9b',
            tags: ['Google'],
          },
        ]} />
      </Subsection>

      <Subsection title="Quantization, concretely" icon={<Cpu className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          Quantization compresses the weights from 16-bit floats down to 4 or 8 bits. Q4 roughly
          quarters the file for a quality cost most people cannot detect in ordinary use.
        </Takeaway>

        <CompareTable
          headers={['Q4_K_M', 'Q8_0', 'FP16']}
          rows={[
            { attribute: 'Bits per weight', values: ['4', '8', '16'] },
            { attribute: 'Size of a 7B model', values: ['~4 GB', '~7 GB', '~14 GB'] },
            { attribute: 'Quality cost', values: ['Mild — rarely noticeable in chat', 'Near zero', 'None, by definition'] },
            { attribute: 'Runs on', values: ['A normal 16 GB laptop', 'A 32 GB machine', 'A serious GPU'] },
            { attribute: 'Choose it when', values: ['Almost always — this is Ollama\'s default', 'You have memory spare and want the last few percent', 'You are fine-tuning, not just running'] },
          ]}
        />

        <InfoCallout type="tip">
          <strong>Do not overthink it.</strong> Ollama pulls Q4_K_M by default and that is the right
          call. A bigger model at Q4 beats a smaller model at Q8 nearly every time — spend your
          memory on parameters, not precision.
        </InfoCallout>
      </Subsection>

      <Subsection title="Key terms" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
        <TermsMemoryBlock terms={[
          {
            term: 'Ollama',
            short: 'A local runtime that downloads, loads and serves open models.',
            example: 'OpenAI-compatible API on localhost:11434',
          },
          {
            term: 'Open WebUI',
            short: 'A self-hosted chat interface over your local models.',
            example: 'Looks like ChatGPT, runs entirely on your machine',
            detail: 'Includes document upload with built-in RAG — the fastest way to chat with your own PDFs without writing code.',
          },
          {
            term: 'GGUF',
            short: 'The file format for quantized models that run on consumer hardware.',
            detail: 'What Ollama downloads. Successor to GGML.',
          },
          {
            term: 'VRAM',
            short: 'Dedicated memory on a discrete GPU. GPU inference needs the model to fit here.',
            example: 'GPU inference is 5–10× faster than CPU',
            detail: 'Apple Silicon has no separate VRAM — unified memory serves both, which is why Macs punch above their spec sheet here.',
          },
          {
            term: 'Quantization',
            short: 'Storing weights at lower precision so the model fits in less memory.',
            example: 'Q4 ≈ a quarter the size of FP16',
          },
          {
            term: 'llama.cpp',
            short: 'The C++ engine underneath Ollama that makes CPU inference practical.',
            detail: 'Ollama is essentially model management and a nice API wrapped around it.',
          },
          {
            term: 'Context length (local)',
            short: 'Local models advertise large windows but using them costs real memory.',
            example: 'A 128k context can need several extra GB',
            detail: 'Ollama defaults to a much smaller window than the model supports. Raise num_ctx deliberately and watch your memory.',
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'A bigger model',
            itemB: 'A better experience',
            explanation: 'A model that does not fit in memory spills to disk. Token generation drops from readable speed to several seconds per word, and the machine becomes unusable for anything else.',
            fix: 'The biggest model that fits comfortably — not the biggest one that technically loads.',
          },
          {
            itemA: 'The advertised context window',
            itemB: 'The window you get',
            explanation: 'Ollama defaults to a far smaller context than the model supports, because the KV cache for a large window costs gigabytes. Your 128k model may be running at 2k until you say otherwise.',
            fix: 'Set num_ctx explicitly, and budget the extra memory for it.',
          },
          {
            itemA: 'Local model quality',
            itemB: 'Frontier model quality',
            explanation: 'An 8B model is excellent at bounded text work and clearly weaker at multi-step reasoning and long coding tasks. Benchmarks that show parity usually measure something narrow.',
            fix: 'Route by task. Local for private and routine, cloud for hard.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'You have 16 GB of RAM. What should you install?',
            answer: 'Llama 3.1 8B at Q4 (~6 GB), or Qwen 2.5 Coder 7B if the work is mostly code. Both leave plenty of headroom for the OS. A 14B model would technically load and would make the machine miserable.',
          },
          {
            question: 'Your app uses the OpenAI Python SDK. What changes to point it at Ollama?',
            answer: 'Two lines: base_url to http://localhost:11434/v1 and api_key to any non-empty string. Every method works unchanged — Ollama implements the same interface.',
          },
          {
            question: 'Q4 versus FP16 — and which should you pull?',
            answer: 'Q4 is four bits per weight, about a quarter the size, with a mild quality cost. FP16 is full precision and four times larger. Pull Q4 (Ollama\'s default) and spend the saved memory on a bigger model instead.',
          },
          {
            question: 'Generation slowed to a crawl after you pulled a bigger model. What happened?',
            answer: 'It no longer fits in memory, so the OS is paging it from disk. Drop to a smaller model or a lower quantization — there is no tuning that recovers from swapping.',
          },
          {
            question: 'You need to summarise 500 client contracts. Cloud or local?',
            answer: 'Local, on both counts. The data is sensitive, and 500 calls is exactly the volume where zero marginal cost matters. Summarising is also well within an 8B model\'s competence.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Ollama quick reference" items={[
        { label: 'Install', value: 'ollama.com — one-click on Windows, macOS, Linux' },
        { label: 'Run', value: 'ollama run llama3.1:8b' },
        { label: 'Pull / list / inspect', value: 'ollama pull <model> · ollama list · ollama show <model>' },
        { label: 'Remove', value: 'ollama rm <model>' },
        { label: 'API', value: 'http://localhost:11434 — OpenAI-compatible at /v1' },
        { label: 'Chat UI', value: 'docker run -p 3000:8080 ghcr.io/open-webui/open-webui:main' },
        { label: 'Memory formula', value: 'params × 0.55 GB at Q4, plus ~30% headroom' },
        { label: '8 GB', value: 'phi3:mini · llama3.2:3b · gemma2:2b' },
        { label: '16 GB', value: 'llama3.1:8b · mistral:7b · qwen2.5-coder:7b' },
        { label: '32 GB', value: 'qwen2.5:14b · deepseek-r1:14b · gemma2:27b' },
        { label: '64 GB', value: 'llama3.3:70b · qwen2.5:32b — near cloud quality' },
      ]} />
    </SectionShell>
  )
}
