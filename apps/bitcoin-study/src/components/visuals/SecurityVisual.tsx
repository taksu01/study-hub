import { useState } from 'react'

type View = 'protocol' | 'user'

const protocolThreats = [
  {
    name: '51% Attack',
    icon: '⚠',
    severity: 'Extremely expensive',
    can: ['Reorder recent transactions', 'Double-spend own recent transactions', 'Temporarily censor transactions'],
    cannot: ['Steal coins from any address', 'Change consensus rules', 'Create coins out of nothing', 'Spend coins without valid signatures'],
  },
  {
    name: 'Selfish Mining',
    icon: '🔨',
    severity: 'Theoretical',
    can: ['Gain probabilistic advantage in block races'],
    cannot: ['Easily execute profitably', 'Break consensus rules'],
  },
  {
    name: 'Eclipse Attack',
    icon: '🌑',
    severity: 'Targeted',
    can: ['Isolate a single node from the real network', 'Feed it a false view of the blockchain'],
    cannot: ['Affect nodes with diverse connections', 'Work against Tor/VPN-connected nodes'],
  },
]

const userThreats = [
  { name: 'Seed Phrase Theft', icon: '🎣', desc: 'Phishing sites, social engineering, malware, physical theft of backups', prevention: 'Never enter seed phrase online. Use hardware wallets. Store backups offline in multiple locations.' },
  { name: 'Clipboard Attacks', icon: '📋', desc: 'Malware replaces copied Bitcoin address with attacker\'s address', prevention: 'Always verify the full address before confirming a send. Use address book features.' },
  { name: 'Exchange Risk', icon: '🏦', desc: 'Exchange gets hacked, freezes accounts, or goes bankrupt (Mt. Gox, FTX)', prevention: 'Self-custody. Don\'t leave significant funds on exchanges.' },
  { name: 'Address Reuse', icon: '🔁', desc: 'Reduces privacy by linking your transactions together. Marginal cryptographic risk.', prevention: 'Use HD wallets that generate fresh addresses automatically.' },
  { name: 'Poor Backups', icon: '💀', desc: 'Lost seed phrase, stored digitally (cloud/email), no redundancy', prevention: 'Physical backup in multiple secure locations. Never store digitally.' },
]

export default function SecurityVisual() {
  const [view, setView] = useState<View>('protocol')
  const [expandedProtocol, setExpandedProtocol] = useState<number | null>(0)
  const [expandedUser, setExpandedUser] = useState<number | null>(null)

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-2">
          <span className="text-amber-500">◆</span> Threat Model Explorer
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setView('protocol')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
              ${view === 'protocol' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Protocol Threats
          </button>
          <button
            onClick={() => setView('user')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
              ${view === 'user' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            User Threats
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Level indicator */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${view === 'protocol' ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent'}`}>
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Protocol Level</span>
            <span className="text-[10px] text-blue-500 dark:text-blue-400">Very strong</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${view === 'user' ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-700' : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent'}`}>
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-medium text-orange-800 dark:text-orange-300">User Level</span>
            <span className="text-[10px] text-orange-500 dark:text-orange-400">Your responsibility</span>
          </div>
        </div>

        {/* Protocol threats */}
        {view === 'protocol' && (
          <div className="space-y-3 max-w-lg mx-auto">
            {protocolThreats.map((t, i) => (
              <div key={t.name}>
                <button
                  onClick={() => setExpandedProtocol(expandedProtocol === i ? null : i)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all cursor-pointer
                    ${expandedProtocol === i ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{t.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{t.severity}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300 dark:text-gray-600">{expandedProtocol === i ? '▼' : '▶'}</span>
                  </div>
                </button>
                {expandedProtocol === i && (
                  <div className="mt-2 grid grid-cols-2 gap-2 px-2">
                    <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">CAN do</p>
                      {t.can.map(c => (
                        <p key={c} className="text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5 mb-1">
                          <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>{c}
                        </p>
                      ))}
                    </div>
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                      <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5">CANNOT do</p>
                      {t.cannot.map(c => (
                        <p key={c} className="text-xs text-red-700 dark:text-red-300 flex items-start gap-1.5 mb-1">
                          <span className="text-red-400 mt-0.5 shrink-0">✗</span>{c}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* User threats */}
        {view === 'user' && (
          <div className="space-y-3 max-w-lg mx-auto">
            {userThreats.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setExpandedUser(expandedUser === i ? null : i)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all cursor-pointer
                  ${expandedUser === i ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{t.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.desc}</p>
                  </div>
                  <span className="text-xs text-gray-300 dark:text-gray-600">{expandedUser === i ? '▼' : '▶'}</span>
                </div>
                {expandedUser === i && (
                  <div className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Prevention</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">{t.prevention}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
