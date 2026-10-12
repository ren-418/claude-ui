import { useMemo, useState } from 'react'
import {
  X,
  Search,
  Settings,
  User,
  Shield,
  CreditCard,
  Boxes,
  History,
  Sparkles,
  Moon,
  Code2,
  Grid2x2,
  Plug,
  Wand2,
  Monitor,
  Sun,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  ArrowUp,
  FileText,
  Network,
} from 'lucide-react'
import { initialsFrom } from '../store'

const NAV = [
  {
    group: 'Settings',
    items: [
      { id: 'general', label: 'General', icon: Settings },
      { id: 'account', label: 'Account', icon: User },
      { id: 'privacy', label: 'Privacy', icon: Shield },
      { id: 'billing', label: 'Billing', icon: CreditCard },
      { id: 'capabilities', label: 'Capabilities', icon: Boxes },
      { id: 'memory', label: 'Memory', icon: History },
      { id: 'reflect', label: 'Reflect', icon: Sparkles },
      { id: 'focus', label: 'Time and focus', icon: Moon },
      { id: 'claude-code', label: 'Claude Code', icon: Code2 },
    ],
  },
  {
    group: 'Customize',
    items: [
      { id: 'skills', label: 'Skills', icon: Grid2x2 },
      { id: 'connectors', label: 'Connectors', icon: Plug },
      { id: 'plugins', label: 'Plugins', icon: Wand2 },
    ],
  },
]

const BILLING_FEATURES = [
  'Chat on web, iOS, Android, and on your desktop',
  'Generate code and visualize data',
  'Write, edit, and create content',
  'Ability to search the web',
  'Memory across conversations',
  'Create files and execute code',
  'Unlock more from Claude with desktop extensions',
  'Connect Slack and Google Workspace services',
  'Integrate any context or tool through connectors with remote MCP',
  'Extended thinking for complex work',
]

const TOPICS = [
  { name: 'Coding', pct: 42 },
  { name: 'Writing', pct: 28 },
  { name: 'Research', pct: 18 },
  { name: 'Planning', pct: 12 },
]

function Toggle({ on, onClick }) {
  return <button type="button" className={`toggle ${on ? 'on' : ''}`} onClick={onClick} aria-pressed={on} />
}

function Row({ label, hint, children }) {
  return (
    <div className="settings-row">
      <div>
        <div className="label">{label}</div>
        {hint && <div className="hint">{hint}</div>}
      </div>
      <div className="control">{children}</div>
    </div>
  )
}

function GeneralPanel({ prefs, setPref }) {
  return (
    <>
      <h1>General</h1>
      <div className="settings-block">
        <h2>Appearance</h2>
        <Row label="Theme">
          <div className="seg icons">
            {[
              { id: 'system', icon: Monitor },
              { id: 'light', icon: Sun },
              { id: 'dark', icon: Moon },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={prefs.theme === id ? 'active' : ''}
                onClick={() => setPref('theme', id)}
                title={id}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </Row>
        <Row label="Chat font">
          <select
            className="dropdown-field"
            value={prefs.chatFont}
            onChange={(e) => setPref('chatFont', e.target.value)}
          >
            <option>Anthropic Serif</option>
            <option>Anthropic Sans</option>
            <option>System</option>
          </select>
        </Row>
        <Row
          label="Motion"
          hint="Reduce animation in streaming responses and other interface elements."
        >
          <div className="seg">
            {['System', 'Reduced'].map((m) => (
              <button
                key={m}
                type="button"
                className={prefs.motion === m.toLowerCase() ? 'active' : ''}
                onClick={() => setPref('motion', m.toLowerCase())}
              >
                {m}
              </button>
            ))}
          </div>
        </Row>
      </div>

      <div className="settings-block">
        <h2>Voice</h2>
        <Row label="Language">
          <select
            className="dropdown-field"
            value={prefs.voiceLanguage}
            onChange={(e) => setPref('voiceLanguage', e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </Row>
        <Row label="Style">
          <select
            className="dropdown-field"
            value={prefs.voiceStyle}
            onChange={(e) => setPref('voiceStyle', e.target.value)}
          >
            <option>Buttery</option>
            <option>Calm</option>
            <option>Bright</option>
          </select>
        </Row>
        <Row label="Speed">
          <select
            className="dropdown-field"
            value={prefs.voiceSpeed}
            onChange={(e) => setPref('voiceSpeed', e.target.value)}
          >
            <option>Slow</option>
            <option>Normal</option>
            <option>Fast</option>
          </select>
        </Row>
      </div>

      <div className="settings-block">
        <h2>Notifications</h2>
        <Row
          label="Response completions"
          hint="Get notified when Claude has finished a response. Useful for long-running tasks."
        >
          <Toggle
            on={prefs.notifyResponseComplete}
            onClick={() => setPref('notifyResponseComplete', !prefs.notifyResponseComplete)}
          />
        </Row>
        <Row
          label="Mentions and replies"
          hint="Get an email when someone @mentions you on an artifact, or replies in a comment thread you're part of."
        >
          <Toggle on={prefs.notifyMentions} onClick={() => setPref('notifyMentions', !prefs.notifyMentions)} />
        </Row>
        <Row
          label="Comments on your artifacts"
          hint="Get an email when someone comments on an artifact you own, even when you're not mentioned."
        >
          <Toggle on={prefs.notifyComments} onClick={() => setPref('notifyComments', !prefs.notifyComments)} />
        </Row>
      </div>
    </>
  )
}

function AccountPanel({ prefs, profile, setPref, setProfile, onLogout }) {
  const [copied, setCopied] = useState(false)

  function copyOrg() {
    navigator.clipboard?.writeText(prefs.orgId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <>
      <h1>Account</h1>
      <div className="account-photo">{initialsFrom(prefs.fullName || profile.name)}</div>
      <div className="field" style={{ marginBottom: 14 }}>
        <label>Full name</label>
        <input
          value={prefs.fullName}
          onChange={(e) => {
            setPref('fullName', e.target.value)
            setProfile({ name: e.target.value })
          }}
        />
      </div>
      <div className="field" style={{ marginBottom: 14 }}>
        <label>What should Claude call you?</label>
        <input value={prefs.preferredName} onChange={(e) => setPref('preferredName', e.target.value)} />
      </div>
      <div className="field" style={{ marginBottom: 14 }}>
        <label>What best describes your work?</label>
        <select value={prefs.workFunction} onChange={(e) => setPref('workFunction', e.target.value)}>
          <option>Engineering</option>
          <option>Design</option>
          <option>Product</option>
          <option>Research</option>
          <option>Marketing</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field" style={{ marginBottom: 18 }}>
        <label>What personal preferences should Claude consider in responses?</label>
        <textarea
          placeholder="Preferences, tone, formatting…"
          value={prefs.instructions}
          onChange={(e) => setPref('instructions', e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
        <button type="button" className="btn btn-secondary" onClick={onLogout}>
          Log out
        </button>
        <button type="button" className="btn btn-secondary" style={{ color: '#f87171' }}>
          Delete account
        </button>
      </div>
      <div>
        <div className="label" style={{ marginBottom: 8 }}>
          Organization ID
        </div>
        <button type="button" className="org-pill" onClick={copyOrg}>
          {prefs.orgId}
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </>
  )
}

function PrivacyPanel({ prefs, setPref }) {
  const [open, setOpen] = useState({ data: true, training: false })

  return (
    <>
      <h1>Privacy</h1>
      <p className="sub">
        Control how Claude uses your data. These settings are stored locally in this demo and do not
        contact Anthropic servers.
      </p>
      <div className="collapse">
        <button
          type="button"
          className="collapse-head"
          onClick={() => setOpen((o) => ({ ...o, data: !o.data }))}
        >
          Your data
          {open.data ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {open.data && (
          <div className="collapse-body">
            Conversations and uploaded files stay in this browser&apos;s localStorage for the clone.
            Export or clear them anytime from Account actions in a full product.
          </div>
        )}
      </div>
      <div className="collapse">
        <button
          type="button"
          className="collapse-head"
          onClick={() => setOpen((o) => ({ ...o, training: !o.training }))}
        >
          Model improvement
          {open.training ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {open.training && (
          <div className="collapse-body">
            When enabled in the real product, anonymized feedback can help improve Claude. This toggle
            is UI-only here.
          </div>
        )}
      </div>
      <div className="settings-block" style={{ marginTop: 18 }}>
        <Row
          label="Include location metadata"
          hint="Allow approximate location to improve local results and relevance."
        >
          <Toggle
            on={prefs.locationMetadata}
            onClick={() => setPref('locationMetadata', !prefs.locationMetadata)}
          />
        </Row>
        <Row label="Help improve Claude" hint="Share feedback signals to improve model quality.">
          <Toggle on={prefs.helpImprove} onClick={() => setPref('helpImprove', !prefs.helpImprove)} />
        </Row>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="button" className="btn btn-secondary">
          Export data
        </button>
        <button type="button" className="btn btn-secondary">
          Manage data
        </button>
      </div>
    </>
  )
}

function BillingPanel({ profile, onUpgrade }) {
  return (
    <>
      <h1>Billing</h1>
      <div className="billing-header">
        <Network size={36} strokeWidth={1.3} color="var(--text-secondary)" />
        <div className="info">
          <h2>{profile.plan || 'Free'} plan</h2>
          <div className="tag">Try Claude</div>
        </div>
        <button type="button" className="btn btn-primary" onClick={onUpgrade}>
          Upgrade plan
        </button>
      </div>
      <ul className="check-list">
        {BILLING_FEATURES.map((f) => (
          <li key={f}>
            <Check size={15} className="ck" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function CapabilitiesPanel({ prefs, setPref }) {
  return (
    <>
      <h1>Capabilities</h1>
      <p className="sub">Choose which tools Claude can use while chatting.</p>
      <div className="settings-block">
        <Row label="Tool access" hint="Ask before using tools, or allow automatically.">
          <select
            className="dropdown-field"
            value={prefs.toolAccess}
            onChange={(e) => setPref('toolAccess', e.target.value)}
          >
            <option>Ask before using</option>
            <option>Allow all</option>
            <option>Disabled</option>
          </select>
        </Row>
        <Row label="Connector search" hint="Let Claude search connected apps when relevant.">
          <Toggle
            on={prefs.connectorSearch}
            onClick={() => setPref('connectorSearch', !prefs.connectorSearch)}
          />
        </Row>
        <Row label="Switch models" hint="Allow Claude to pick a better model mid-task.">
          <Toggle on={prefs.switchModels} onClick={() => setPref('switchModels', !prefs.switchModels)} />
        </Row>
        <Row label="Artifacts" hint="Create and edit artifacts in a side panel.">
          <Toggle
            on={prefs.artifactsEnabled}
            onClick={() => setPref('artifactsEnabled', !prefs.artifactsEnabled)}
          />
        </Row>
        <Row label="Publish artifacts" hint="Allow sharing public links to your artifacts.">
          <Toggle
            on={prefs.artifactsPublish}
            onClick={() => setPref('artifactsPublish', !prefs.artifactsPublish)}
          />
        </Row>
        <Row label="Inline visualizations" hint="Render charts and tables in responses.">
          <Toggle on={prefs.inlineViz} onClick={() => setPref('inlineViz', !prefs.inlineViz)} />
        </Row>
        <Row label="Code execution" hint="Run analysis code in a sandbox.">
          <Toggle on={prefs.codeExecution} onClick={() => setPref('codeExecution', !prefs.codeExecution)} />
        </Row>
      </div>
    </>
  )
}

function MemoryPanel({ prefs, setPref }) {
  const [note, setNote] = useState('')
  const [sent, setSent] = useState('')

  return (
    <>
      <h1>Memory</h1>
      <p className="sub">Claude can remember useful details across chats.</p>
      <div className="settings-block">
        <Row label="Generate memory" hint="Automatically save preferences Claude learns about you.">
          <Toggle
            on={prefs.generateMemory}
            onClick={() => setPref('generateMemory', !prefs.generateMemory)}
          />
        </Row>
        <Row label="Ignore sensitive topics" hint="Avoid storing health, finance, or private details.">
          <Toggle
            on={prefs.sensitiveTopics}
            onClick={() => setPref('sensitiveTopics', !prefs.sensitiveTopics)}
          />
        </Row>
      </div>
      <button type="button" className="btn btn-primary" style={{ marginBottom: 20 }}>
        Start import
      </button>
      <div className="empty-state" style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 14 }}>
        <FileText size={28} />
        <h3>No files yet</h3>
        <p>Imported memory files will appear here.</p>
      </div>
      <div className="memory-composer">
        <input
          placeholder="Tell Claude what to change"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && note.trim()) {
              setSent(note.trim())
              setNote('')
            }
          }}
        />
        <button
          type="button"
          className="icon-btn"
          onClick={() => {
            if (!note.trim()) return
            setSent(note.trim())
            setNote('')
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
      {sent && (
        <p style={{ marginTop: 10, color: 'var(--text-muted)', fontSize: 13 }}>
          Saved locally: “{sent}”
        </p>
      )}
    </>
  )
}

function ReflectPanel({ prefs, setPref }) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Reflect</h1>
          <p className="sub" style={{ marginBottom: 0 }}>
            Based on your conversations in Claude chat.
          </p>
        </div>
        <div className="reflect-toolbar">
          <select
            className="dropdown-field"
            value={prefs.reflectRange}
            onChange={(e) => setPref('reflectRange', e.target.value)}
          >
            <option>Past week</option>
            <option>Past month</option>
            <option>Past 3 months</option>
          </select>
          <button
            type="button"
            className="icon-btn"
            title="Refresh"
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 900)
            }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="reflect-empty">
          <FileText size={48} strokeWidth={1.2} />
          <h3>Looking at your month.</h3>
          <p>This should only take a minute or so.</p>
          <button type="button" className="btn btn-secondary" style={{ marginTop: 12 }} onClick={() => setLoading(false)}>
            Show sample insights
          </button>
        </div>
      ) : (
        <>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 15, marginTop: 24 }}>Conversation topics</h2>
          <div className="topic-bars">
            {TOPICS.map((t) => (
              <div key={t.name} className="topic-bar">
                <span>{t.name}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${t.pct}%` }} />
                </div>
                <span style={{ color: 'var(--text-dim)' }}>{t.pct}%</span>
              </div>
            ))}
          </div>

          <h2 style={{ color: 'var(--text-primary)', fontSize: 15, marginBottom: 12 }}>Expanding skills</h2>
          <div className="skill-expand-grid">
            {['Writing clarity', 'Code review', 'Research briefs', 'Meeting notes'].map((t) => (
              <div key={t} className="skill-expand-card">
                <h3>{t}</h3>
                <p>You used this more than last period. Keep the streak going.</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-secondary">
              Set quiet hours
            </button>
            <div className="seg">
              {['Conversations', 'Time spent'].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={prefs.reflectChart === c ? 'active' : ''}
                  onClick={() => setPref('reflectChart', c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

function FocusPanel({ prefs, setPref }) {
  return (
    <>
      <h1>Time and focus</h1>
      <p className="sub">Protect deep work with quiet hours and breaks.</p>
      <div className="settings-block">
        <Row label="Quiet hours" hint="Mute notifications during your focus window.">
          <Toggle on={prefs.quietHours} onClick={() => setPref('quietHours', !prefs.quietHours)} />
        </Row>
        {prefs.quietHours && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Starts</label>
              <input type="time" value={prefs.quietStart} onChange={(e) => setPref('quietStart', e.target.value)} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Ends</label>
              <input type="time" value={prefs.quietEnd} onChange={(e) => setPref('quietEnd', e.target.value)} />
            </div>
          </div>
        )}
        <Row label="Break reminders" hint="Gentle nudges to step away after long sessions.">
          <Toggle on={prefs.breaksEnabled} onClick={() => setPref('breaksEnabled', !prefs.breaksEnabled)} />
        </Row>
      </div>
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          fontSize: 13,
        }}
      >
        Schedule placeholders — connect a calendar in Connectors to sync focus blocks.
      </div>
    </>
  )
}

function ClaudeCodePanel({ prefs, setPref, onUpgrade }) {
  return (
    <>
      <h1>Claude Code</h1>
      <div className="upgrade-banner">
        <div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 4 }}>
            Unlock Claude Code
          </div>
          <p>Work in your repo with higher limits on Pro and Max.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onUpgrade}>
          Upgrade
        </button>
      </div>
      <div className="settings-block">
        <Row label="Classify sessions" hint="Label coding sessions for Reflect insights.">
          <Toggle
            on={prefs.classifySessions}
            onClick={() => setPref('classifySessions', !prefs.classifySessions)}
          />
        </Row>
        <Row label="Switch models" hint="Let Code pick a stronger model when needed.">
          <Toggle
            on={prefs.codeSwitchModels}
            onClick={() => setPref('codeSwitchModels', !prefs.codeSwitchModels)}
          />
        </Row>
      </div>
      <div className="settings-block">
        <h2>Code appearance</h2>
        <div className="code-theme-previews">
          <button
            type="button"
            className={`theme-preview light ${prefs.codeTheme === 'light' ? 'active' : ''}`}
            onClick={() => setPref('codeTheme', 'light')}
          >
            <div className="preview-bar">Light</div>
            <pre>
              <span className="diff-del">- const x = 1</span>
              {'\n'}
              <span className="diff-add">+ const x = 2</span>
              {'\n'}
              {'function run() {\n  return x\n}'}
            </pre>
          </button>
          <button
            type="button"
            className={`theme-preview dark ${prefs.codeTheme === 'dark' ? 'active' : ''}`}
            onClick={() => setPref('codeTheme', 'dark')}
          >
            <div className="preview-bar">Dark</div>
            <pre>
              <span className="diff-del">- const x = 1</span>
              {'\n'}
              <span className="diff-add">+ const x = 2</span>
              {'\n'}
              {'function run() {\n  return x\n}'}
            </pre>
          </button>
        </div>
        <Row label="Code font" hint="Font used in the Code appearance previews.">
          <select
            className="dropdown-field"
            value={prefs.codeFont}
            onChange={(e) => setPref('codeFont', e.target.value)}
          >
            <option>Mono</option>
            <option>JetBrains Mono</option>
            <option>SF Mono</option>
          </select>
        </Row>
      </div>
    </>
  )
}

function CustomizeLinkPanel({ title, body, onGo }) {
  return (
    <>
      <h1>{title}</h1>
      <p className="sub">{body}</p>
      <button type="button" className="btn btn-primary" onClick={onGo}>
        Open Customize
      </button>
    </>
  )
}

export default function SettingsModal({
  open,
  panel,
  search,
  prefs,
  profile,
  onClose,
  onPanel,
  onSearch,
  setPref,
  setProfile,
  onUpgrade,
  onLogout,
  onGoCustomize,
}) {
  const filteredNav = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return NAV
    return NAV.map((g) => ({
      ...g,
      items: g.items.filter((i) => i.label.toLowerCase().includes(q)),
    })).filter((g) => g.items.length)
  }, [search])

  if (!open) return null

  let body = null
  switch (panel) {
    case 'general':
      body = <GeneralPanel prefs={prefs} setPref={setPref} />
      break
    case 'account':
      body = (
        <AccountPanel
          prefs={prefs}
          profile={profile}
          setPref={setPref}
          setProfile={setProfile}
          onLogout={onLogout}
        />
      )
      break
    case 'privacy':
      body = <PrivacyPanel prefs={prefs} setPref={setPref} />
      break
    case 'billing':
      body = <BillingPanel profile={profile} onUpgrade={onUpgrade} />
      break
    case 'capabilities':
      body = <CapabilitiesPanel prefs={prefs} setPref={setPref} />
      break
    case 'memory':
      body = <MemoryPanel prefs={prefs} setPref={setPref} />
      break
    case 'reflect':
      body = <ReflectPanel prefs={prefs} setPref={setPref} />
      break
    case 'focus':
      body = <FocusPanel prefs={prefs} setPref={setPref} />
      break
    case 'claude-code':
      body = <ClaudeCodePanel prefs={prefs} setPref={setPref} onUpgrade={onUpgrade} />
      break
    case 'skills':
      body = (
        <CustomizeLinkPanel
          title="Skills"
          body="Manage skills that teach Claude how you work."
          onGo={() => onGoCustomize('skills')}
        />
      )
      break
    case 'connectors':
      body = (
        <CustomizeLinkPanel
          title="Connectors"
          body="Connect Slack, Drive, GitHub, and more."
          onGo={() => onGoCustomize('connectors')}
        />
      )
      break
    case 'plugins':
      body = (
        <CustomizeLinkPanel
          title="Plugins"
          body="Enable plugins to extend Claude in the browser."
          onGo={() => onGoCustomize('plugins')}
        />
      )
      break
    default:
      body = <GeneralPanel prefs={prefs} setPref={setPref} />
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-shell" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        <aside className="settings-nav">
          <div className="settings-search">
            <Search size={14} color="var(--text-dim)" />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          {filteredNav.map((g) => (
            <div key={g.group}>
              <div className="settings-group-label">{g.group}</div>
              {g.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`settings-nav-item ${panel === item.id ? 'active' : ''}`}
                    onClick={() => onPanel(item.id)}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </aside>
        <section className="settings-main">
          <button type="button" className="icon-btn settings-close" onClick={onClose} title="Close">
            <X size={18} />
          </button>
          <div className="settings-scroll">{body}</div>
        </section>
      </div>
    </div>
  )
}
