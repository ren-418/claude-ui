import { useMemo, useState } from 'react'
import {
  Search,
  ListFilter,
  ArrowUpDown,
  ChevronDown,
  Plus,
  MessageSquare,
  Palette,
  Code2,
  Figma,
  LineChart,
  Table2,
  FileText,
  MoreVertical,
  Plug,
  Wand2,
  Plane,
} from 'lucide-react'
import { DISCOVER_SKILLS, ANTHROPIC_SKILLS, CONNECTORS, PLUGINS } from '../../store'

const ICONS = {
  design: Palette,
  engineering: Code2,
  figma: Figma,
  searchfit: Search,
  'desktop-commander': Code2,
  'bright-data': LineChart,
  data: Table2,
}

export default function CustomizePage({
  tab,
  sub,
  installedSkills,
  installedConnectors,
  installedPlugins,
  onTab,
  onSub,
  onInstallSkill,
  onRemoveSkill,
  onToggleConnector,
  onTogglePlugin,
}) {
  const [query, setQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)

  const featured = DISCOVER_SKILLS.find((s) => s.featured)
  const forYou = DISCOVER_SKILLS.filter((s) => !s.featured && s.category !== 'New')
  const news = DISCOVER_SKILLS.filter((s) => s.category === 'New')

  const q = query.trim().toLowerCase()
  const filterSkill = (s) => !q || `${s.title} ${s.desc}`.toLowerCase().includes(q)

  const yoursSkills = useMemo(
    () => DISCOVER_SKILLS.filter((s) => installedSkills.includes(s.id)),
    [installedSkills],
  )

  return (
    <div className="page customize-page">
      <div className="page-inner">
        <h1 className="page-title">Customize</h1>

        <div className="cust-tabs">
          <div className="seg">
            {['skills', 'connectors', 'plugins'].map((t) => (
              <button
                key={t}
                type="button"
                className={tab === t ? 'active' : ''}
                onClick={() => onTab(t)}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'skills' && (
            <div className="seg">
              <button type="button" className={sub === 'yours' ? 'active' : ''} onClick={() => onSub('yours')}>
                Yours
              </button>
              <button
                type="button"
                className={sub === 'discover' ? 'active' : ''}
                onClick={() => onSub('discover')}
              >
                Discover
              </button>
            </div>
          )}

          <div className="cust-toolbar">
            <div className="search-box">
              <Search size={14} color="var(--text-dim)" />
              <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button type="button" className="icon-btn" title="Filter">
              <ListFilter size={16} />
            </button>
            <button type="button" className="icon-btn" title="Sort">
              <ArrowUpDown size={16} />
            </button>
            <div style={{ position: 'relative' }}>
              <button type="button" className="btn btn-primary" onClick={() => setAddOpen((v) => !v)}>
                <Plus size={15} /> Add <ChevronDown size={14} />
              </button>
              {addOpen && (
                <div className="dropdown">
                  <button type="button" onClick={() => { onSub('discover'); onTab('skills'); setAddOpen(false) }}>
                    Browse skills
                  </button>
                  <button type="button" onClick={() => { onTab('connectors'); setAddOpen(false) }}>
                    Add connector
                  </button>
                  <button type="button" onClick={() => { onTab('plugins'); setAddOpen(false) }}>
                    Add plugin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {tab === 'skills' && sub === 'discover' && (
          <>
            {featured && filterSkill(featured) && (
              <div className="featured-skill">
                <div>
                  <div className="eyebrow">{featured.category}</div>
                  <h2>{featured.title}</h2>
                  <p>{featured.desc}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onInstallSkill(featured.id)}
                  >
                    {installedSkills.includes(featured.id) ? 'Added' : 'Add'}
                  </button>
                </div>
                <div className="featured-art">
                  <Table2 size={36} />
                  <span className="badge">
                    <LineChart size={16} />
                  </span>
                </div>
              </div>
            )}

            <div className="section-label">For you</div>
            <div className="skill-grid">
              {forYou.filter(filterSkill).map((s) => {
                const Icon = ICONS[s.id] || FileText
                const installed = installedSkills.includes(s.id)
                return (
                  <div key={s.id} className="skill-card">
                    <div className="skill-icon">
                      <Icon size={18} />
                    </div>
                    <div className="body">
                      <h3>
                        {s.category} — {s.title}
                      </h3>
                      <p>{s.desc}</p>
                      <div className="meta">
                        by {s.by} • {s.installs} installs
                      </div>
                    </div>
                    <div className="skill-actions">
                      <button type="button" className="btn btn-secondary">
                        <MessageSquare size={13} /> Try
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => (installed ? onRemoveSkill(s.id) : onInstallSkill(s.id))}
                        title={installed ? 'Remove' : 'Add'}
                      >
                        {installed ? '✓' : <Plus size={14} />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="section-label" style={{ marginTop: 28 }}>
              <span>New skills</span>
              <button type="button" className="linkish">
                Show all →
              </button>
            </div>
            <div className="skill-grid">
              {news.filter(filterSkill).map((s) => (
                <div key={s.id} className="skill-card">
                  <div className="skill-icon">
                    <FileText size={18} />
                  </div>
                  <div className="body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="meta">{s.when}</div>
                  </div>
                  <div className="skill-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => onInstallSkill(s.id)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'skills' && sub === 'yours' && (
          <>
            {yoursSkills.length === 0 ? (
              <div className="yours-banner">
                <div>
                  <h2>Add your first skills</h2>
                  <p>Skills teach Claude how you work. Add them from Discover, or create your own.</p>
                  <button type="button" className="btn btn-primary" onClick={() => onSub('discover')}>
                    Discover skills
                  </button>
                </div>
                <Plane size={56} strokeWidth={1.2} color="var(--text-muted)" />
              </div>
            ) : (
              <div className="skill-grid" style={{ marginBottom: 28 }}>
                {yoursSkills.map((s) => {
                  const Icon = ICONS[s.id] || FileText
                  return (
                    <div key={s.id} className="skill-card">
                      <div className="skill-icon">
                        <Icon size={18} />
                      </div>
                      <div className="body">
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                      </div>
                      <button type="button" className="btn btn-secondary" onClick={() => onRemoveSkill(s.id)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="section-label">
              <span>
                From Anthropic & Partners
                <span className="count-pill">{ANTHROPIC_SKILLS.length}</span>
              </span>
            </div>
            <div className="skill-list">
              {ANTHROPIC_SKILLS.filter(filterSkill).map((s) => (
                <div key={s.id} className="skill-list-row">
                  <div className="skill-icon" style={{ width: 32, height: 32 }}>
                    <FileText size={15} />
                  </div>
                  <div className="body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <span className="when">{s.when}</span>
                  <button type="button" className="icon-btn">
                    <MoreVertical size={14} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'connectors' && (
          <div className="item-grid" style={{ marginTop: 12 }}>
            {CONNECTORS.filter((c) => !q || `${c.title} ${c.desc}`.toLowerCase().includes(q)).map((c) => {
              const on = installedConnectors.includes(c.id)
              return (
                <div key={c.id} className="item-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Plug size={18} />
                    <h3>{c.title}</h3>
                  </div>
                  <p>{c.desc}</p>
                  <div className="row">
                    <span className="meta">{on ? 'Connected' : 'Not connected'}</span>
                    <button
                      type="button"
                      className={`btn ${on ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => onToggleConnector(c.id)}
                    >
                      {on ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'plugins' && (
          <div className="item-grid" style={{ marginTop: 12 }}>
            {PLUGINS.filter((p) => !q || `${p.title} ${p.desc}`.toLowerCase().includes(q)).map((p) => {
              const on = installedPlugins.includes(p.id)
              return (
                <div key={p.id} className="item-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Wand2 size={18} />
                    <h3>{p.title}</h3>
                  </div>
                  <p>{p.desc}</p>
                  <div className="row">
                    <span className="meta">{on ? 'Enabled' : 'Available'}</span>
                    <button
                      type="button"
                      className={`btn ${on ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => onTogglePlugin(p.id)}
                    >
                      {on ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
