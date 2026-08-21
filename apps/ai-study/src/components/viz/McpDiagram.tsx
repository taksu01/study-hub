import { useState } from 'react'
import { GitBranch, HardDrive, Database, Globe, Calendar, Plug } from 'lucide-react'

const SERVERS = [
  { id: 'fs', label: 'Filesystem', icon: HardDrive, tools: ['read_file', 'write_file', 'list_dir'] },
  { id: 'git', label: 'GitHub', icon: GitBranch, tools: ['create_issue', 'get_pr', 'search_code'] },
  { id: 'db', label: 'Postgres', icon: Database, tools: ['query', 'describe_table'] },
  { id: 'web', label: 'Web fetch', icon: Globe, tools: ['fetch_url', 'search'] },
  { id: 'cal', label: 'Calendar', icon: Calendar, tools: ['list_events', 'create_event'] },
]

const CLIENTS = ['Claude Desktop', 'Claude Code', 'Cursor', 'Your own app']

export function McpDiagram() {
  const [active, setActive] = useState<string | null>('git')
  const server = SERVERS.find(s => s.id === active)

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800">Why MCP exists</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Without it: every client needs custom code for every tool — 4 × 5 = 20 integrations.
          With it: 4 + 5 = 9.
        </p>
      </div>

      <div className="p-4">
        {/* Clients */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-1">
          {CLIENTS.map(c => (
            <div key={c} className="rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-2 text-center">
              <span className="text-xs font-medium text-blue-800">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-center uppercase tracking-wider text-slate-400 mb-2">MCP clients</p>

        {/* The protocol layer — the whole point of the picture */}
        <div className="relative my-3">
          <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-violet-300 bg-violet-50 px-4 py-3">
            <Plug className="w-4 h-4 text-violet-600" aria-hidden />
            <span className="text-sm font-semibold text-violet-800">Model Context Protocol</span>
          </div>
          <p className="text-[11px] text-center text-slate-500 mt-1.5">
            One JSON-RPC contract: <span className="font-mono">list tools</span> ·{' '}
            <span className="font-mono">call tool</span> · <span className="font-mono">read resource</span>
          </p>
        </div>

        {/* Servers */}
        <p className="text-[10px] text-center uppercase tracking-wider text-slate-400 mb-2">MCP servers — tap one</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SERVERS.map(s => {
            const Icon = s.icon
            const on = active === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActive(on ? null : s.id)}
                aria-pressed={on}
                className={`rounded-xl border px-2.5 py-2.5 flex flex-col items-center gap-1.5 transition-all cursor-pointer
                  ${on
                    ? 'border-teal-400 bg-teal-50 ring-2 ring-offset-1 ring-teal-200 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-teal-300'}`}
              >
                <Icon className={`w-4 h-4 ${on ? 'text-teal-600' : 'text-slate-400'}`} aria-hidden />
                <span className={`text-xs font-medium ${on ? 'text-teal-800' : 'text-slate-600'}`}>{s.label}</span>
              </button>
            )
          })}
        </div>

        {server && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 animate-fade-in">
            <p className="text-xs text-slate-500 mb-2">
              Connect the <strong className="text-slate-700">{server.label}</strong> server once, and
              every client above gains these tools — no client-side code:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {server.tools.map(t => (
                <code key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[13px] font-mono text-slate-700">
                  {t}()
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
