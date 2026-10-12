import {
  Plus,
  FolderKanban,
  Shapes,
  Code2,
  SlidersHorizontal,
  ListFilter,
  LayoutGrid,
  Search,
  Sparkles,
} from 'lucide-react'
import { initialsFrom } from '../store'

const NAV = [
  { id: 'chat', label: 'New', icon: Plus, action: 'new' },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'artifacts', label: 'Artifacts', icon: Shapes },
  { id: 'code', label: 'Code', icon: Code2, badge: 'Upgrade' },
  { id: 'customize', label: 'Customize', icon: SlidersHorizontal },
]

export default function Sidebar({
  open,
  view,
  chats,
  activeChatId,
  profile,
  onNav,
  onNewChat,
  onSelectChat,
  onOpenSettings,
  onOpenSearch,
}) {
  const email = profile.email || profile.name || 'user@example.com'
  const short = email.length > 22 ? `${email.slice(0, 18)}…` : email

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">Claude</div>

      <nav>
        {NAV.map((item) => {
          const Icon = item.icon
          const active = item.action === 'new' ? false : view === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => (item.action === 'new' ? onNewChat() : onNav(item.id))}
            >
              <Icon className="lucide" size={16} strokeWidth={1.75} />
              <span>{item.label}</span>
              {item.badge && (
                <>
                  <span className="spacer" />
                  <span className="pill-badge">{item.badge}</span>
                </>
              )}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-section">
        <div className="section-head">
          <span>Chats and tasks</span>
          <button type="button" className="icon-btn" title="Filter" onClick={onOpenSearch}>
            <ListFilter size={14} />
          </button>
        </div>

        <button type="button" className="try-row" onClick={() => onNav('customize')}>
          <Sparkles size={14} />
          <span style={{ flex: 1, textAlign: 'left' }}>Import memory</span>
          <span className="pill-badge try">Try</span>
        </button>
        <button type="button" className="try-row" onClick={() => onNav('customize')}>
          <SlidersHorizontal size={14} />
          <span style={{ flex: 1, textAlign: 'left' }}>Customize Claude for you</span>
          <span className="pill-badge try">Try</span>
        </button>

        <div className="chat-list" style={{ marginTop: 6 }}>
          {chats.length === 0 && (
            <div style={{ padding: '10px 12px', color: 'var(--text-dim)', fontSize: 12.5 }}>
              No chats yet
            </div>
          )}
          {chats.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`chat-row ${activeChatId === c.id && view === 'chat' ? 'active' : ''}`}
              onClick={() => onSelectChat(c.id)}
            >
              {i === 0 && view === 'chat' && activeChatId === c.id && <span className="dot" />}
              <span className="title">{c.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button type="button" className="profile-btn" onClick={() => onOpenSettings('account')}>
          <span className="avatar">{initialsFrom(profile.name || email)}</span>
          <span className="profile-email">{short}</span>
        </button>
        <button type="button" className="icon-btn" title="Settings" onClick={() => onOpenSettings('general')}>
          <LayoutGrid size={16} />
        </button>
        <button type="button" className="icon-btn" title="Search" onClick={onOpenSearch}>
          <Search size={16} />
        </button>
      </div>
    </aside>
  )
}
