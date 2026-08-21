import { Layers, Network, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react'
import {
  SectionShell, SectionHeader, Subsection, Takeaway, Example,
  TaxonomyTree, TermsMemoryBlock, CommonConfusionBlock, MiniRecallBlock,
  CheatSheetPanel, InfoCallout,
} from '../components/ui'
import { StackDiagram } from '../components/viz/StackDiagram'

export default function Section01() {
  return (
    <SectionShell id="section-1">
      <SectionHeader
        number={1}
        title="The Big Picture"
        subtitle="AI is a stack. Most developers only need to master one layer of it — this section shows you which, and why the rest is somebody else's problem."
      />

      <Subsection title="Where you actually sit" icon={<Layers className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          A researcher, a product manager and a developer saying "AI" are each talking about a
          different layer of the same stack. Almost every confusing AI conversation is really two
          people standing on different rungs.
        </Takeaway>

        <StackDiagram />

        <InfoCallout type="tip">
          <strong>The only line that matters:</strong> everything below the API is capital-intensive
          infrastructure you rent. Everything above it is judgement — and judgement is the part
          nobody can buy for you.
        </InfoCallout>
      </Subsection>

      <Subsection title="AI, ML, LLM, Foundation Model — the nesting" icon={<Network className="w-4 h-4 text-violet-500" />}>
        <Takeaway>
          These are not synonyms and not siblings. Each one is strictly contained in the one above it.
          Get the nesting right and half the vocabulary problem disappears.
        </Takeaway>

        <TaxonomyTree nodes={[
          {
            id: 'ai', label: 'AI', subtitle: 'Artificial Intelligence', color: 'slate',
            description: 'Any computer system doing something that would normally need human intelligence. Broad enough to include a 1980s rule engine ("if temp > 30, turn on the AC") and a frontier model. When the news says "AI" they mean a narrow slice of this.',
            children: [
              {
                id: 'ml', label: 'ML', subtitle: 'Machine Learning', color: 'blue',
                description: 'Systems that infer their rules from examples rather than having them hand-written. Nobody codes "emails containing VIAGRA are spam" — the model works that out from labelled mail.',
                examples: ['Spam filters', 'Fraud detection', 'Recommendations'],
                children: [
                  {
                    id: 'deep-learning', label: 'Deep Learning', subtitle: 'Many-layered neural networks', color: 'indigo',
                    description: '"Deep" means stacked layers, each learning a more abstract view than the last — pixels, then edges, then shapes, then faces. The 2017 Transformer architecture is the specific breakthrough that made modern language models possible.',
                    examples: ['Image recognition', 'Speech-to-text', 'Translation'],
                    children: [
                      {
                        id: 'foundation-models', label: 'Foundation Models', subtitle: 'Large, pre-trained, general-purpose', color: 'violet',
                        description: 'One large model that serves as the base for many downstream tasks without task-specific training. The defining property is generalisation: a model trained to predict text can also write code and follow instructions, though nobody trained it for either specifically.',
                        children: [
                          {
                            id: 'llms', label: 'LLMs', subtitle: 'Text in, text out', color: 'purple',
                            description: 'Foundation models trained mostly on text. Code, JSON and maths are all text, so they handle those too. Strictly speaking "LLM" means text-only — which makes it the wrong word for most frontier models today.',
                            examples: ['Claude Sonnet', 'GPT-4o', 'Llama 3.3 70B', 'Mistral'],
                          },
                          {
                            id: 'vision-models', label: 'Vision Models', subtitle: 'Images in or out', color: 'pink',
                            description: 'Trained on image data, operating on pixels and patches rather than text tokens. Generative ones paint from a prompt; understanding ones classify and segment. Not LLMs — different input entirely.',
                            examples: ['DALL·E 3', 'Stable Diffusion', 'Midjourney', 'Sora'],
                          },
                          {
                            id: 'audio-models', label: 'Audio Models', subtitle: 'Speech, voice, music', color: 'orange',
                            description: 'Speech-to-text (Whisper), text-to-speech (ElevenLabs), music generation (Suno). Often Transformer-based like LLMs, but applied to waveforms and spectrograms.',
                            examples: ['Whisper', 'ElevenLabs', 'Suno'],
                          },
                          {
                            id: 'multimodal', label: 'Multimodal Models', subtitle: 'Several input types, one model', color: 'teal',
                            description: 'Send an image and text together, get text back. Every frontier model is here now. The precise term when text and images are both accepted is Vision-Language Model (VLM) — the industry says "LLM" anyway.',
                            examples: ['Claude (text+image)', 'GPT-4o (text+image+audio)', 'Gemini (text+image+video)'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]} />

        <InfoCallout type="warning">
          <strong>"Agent" is deliberately missing from that tree.</strong> An agent is a system design
          pattern, not a class of model — you build agents <em>using</em> models. Listing it beside
          "LLM" would be like listing "REST API" beside "Python". Section 4 covers it properly.
        </InfoCallout>

        <Example label="Reading the tree in one sentence">
          Whisper is a <strong>foundation model</strong> and therefore also deep learning, ML and AI —
          but it is <strong>not</strong> an LLM, because it eats audio, not text.
        </Example>
      </Subsection>

      <Subsection title="Key terms" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
        <TermsMemoryBlock terms={[
          {
            term: 'LLM',
            short: 'A Transformer network trained on text that reads and writes text.',
            example: 'Claude, GPT-4o, Llama 3.3',
            detail: 'Technically text-only. Frontier models that also read images are more accurately VLMs or multimodal models — the industry uses "LLM" loosely anyway.',
          },
          {
            term: 'Model weights',
            short: 'The billions of numbers inside a trained model. The weights are the model.',
            example: 'Llama 3.1 70B ≈ 140 GB of floats',
            detail: 'Downloading an open model means downloading these. Without them the architecture is an empty shell.',
          },
          {
            term: 'Token',
            short: 'The unit a model processes — roughly ¾ of a word.',
            example: '"Hello world" ≈ 2 tokens',
            detail: 'Pricing, context limits and speed are all measured in tokens, never in words. Section 2 has a lab where you can watch text get split.',
          },
          {
            term: 'Inference',
            short: 'Running a finished model to get output — as opposed to training, which builds it.',
            example: 'Every message you send Claude is one inference',
            detail: 'Inference is what cloud APIs bill you for. Training already happened, on somebody else\'s budget.',
          },
          {
            term: 'API',
            short: 'The HTTP endpoint you POST a prompt to. Turns a research artefact into a callable component.',
            example: 'POST /v1/messages',
          },
          {
            term: 'Open-source model',
            short: 'Weights published for download and self-hosting.',
            example: 'Llama, Mistral, Gemma, DeepSeek',
            detail: 'Closed models (Claude, GPT-4) are reachable only through the provider\'s API — you never hold the weights.',
          },
        ]} />
      </Subsection>

      <Subsection title="Common confusion" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
        <CommonConfusionBlock confusions={[
          {
            itemA: 'LLM',
            itemB: 'AI',
            explanation: 'LLMs are one branch: large Transformer models trained on text. Image generators, speech recognition, recommendation engines and self-driving stacks are all AI and none of them are LLMs.',
            fix: 'LLM is a subset of AI, not a synonym for it.',
          },
          {
            itemA: 'LLM',
            itemB: 'Multimodal model / VLM',
            explanation: 'Claude, GPT-4o and Gemini all accept images. That makes them Vision-Language Models. Everyone still calls them LLMs, which is fine in conversation and wrong in a paper.',
            fix: 'If it reads images, "multimodal" is the accurate word.',
          },
          {
            itemA: 'Foundation model',
            itemB: 'LLM',
            explanation: 'All LLMs are foundation models; not all foundation models are LLMs. DALL·E generates images. Whisper processes audio. Both are foundation models, neither is an LLM.',
            fix: 'Foundation model is the parent category. LLM is its text-shaped child.',
          },
          {
            itemA: '"Just use AI for that"',
            itemB: 'A technical statement',
            explanation: 'From a PM it means "call an LLM API". From an ML researcher it could mean training something. The taxonomy gives you the vocabulary to ask which layer they mean.',
            fix: 'Ask "which layer?" before agreeing to anything.',
          },
        ]} />
      </Subsection>

      <Subsection title="Check yourself" icon={<HelpCircle className="w-4 h-4 text-violet-500" />}>
        <MiniRecallBlock questions={[
          {
            question: 'Name the AI stack from bottom to top.',
            answer: 'Data → Training → Model → API → Your app or agent → User. You work at the top two. Everything below the API line is infrastructure you rent.',
          },
          {
            question: 'Is every foundation model an LLM?',
            answer: 'No — the reverse is true. Every LLM is a foundation model, but DALL·E (images) and Whisper (audio) are foundation models that are not LLMs. LLM is the text-specific subset.',
          },
          {
            question: 'Where does "agent" sit in the taxonomy?',
            answer: 'Nowhere — it is a design pattern, not a model class. The taxonomy describes kinds of models; "agent" describes how you wire one up with tools and a loop.',
          },
          {
            question: 'Someone says their app "uses AI". What have you actually learned?',
            answer: 'Almost nothing. You know they are somewhere on the stack. Ask whether they call an API, run a local model, or trained something — those are wildly different engineering realities.',
          },
        ]} />
      </Subsection>

      <CheatSheetPanel title="Section 1 in eight lines" items={[
        { label: 'Hierarchy', value: 'AI ⊃ ML ⊃ Deep Learning ⊃ Foundation Models ⊃ LLMs' },
        { label: 'LLM', value: 'Transformer trained on text. Text in, text out.' },
        { label: 'Foundation model', value: 'Large pre-trained generalist. LLMs, vision and audio models are all subtypes.' },
        { label: 'Multimodal', value: 'Reads more than one input type. Every frontier model qualifies.' },
        { label: 'Agent', value: 'Model + tools + loop. A pattern, not a model class. See Section 4.' },
        { label: 'Generative AI', value: 'A property (it makes new content), not a node in the tree.' },
        { label: 'Your layer', value: 'API and above. No need to go deeper.' },
        { label: 'The whole idea', value: 'You do not build models. You build on top of them.' },
      ]} />
    </SectionShell>
  )
}
