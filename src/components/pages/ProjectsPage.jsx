import { useState } from 'react'
import { Plus, Search, ArrowUpDown, X, FolderKanban } from 'lucide-react'

export default function ProjectsPage({ projects, onCreate, onDelete }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [query, setQuery] = useState('')

  const filtered = projects.filter((p) =>
    `${p.name} ${p.goal}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({ name: name.trim(), goal: goal.trim() })
    setName('')
    setGoal('')
    setOpen(false)
  }

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-head-row">
          <h1 className="page-title" style={{ flex: 1, textAlign: 'center' }}>
            Projects
          </h1>
        </div>

        <div className="toolbar" style={{ justifyContent: 'flex-end' }}>
          <div className="search-box">
            <Search size={14} color="var(--text-dim)" />
            <input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className="icon-btn" title="Sort">
            <ArrowUpDown size={16} />
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={16} /> New project
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 80 }}>
            <FolderKanban size={48} strokeWidth={1.25} />
            <h3>No projects yet</h3>
            <p>Create a project to organize chats, files, and instructions.</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
              New project
            </button>
          </div>
        ) : (
          <div className="item-grid">
            {filtered.map((p) => (
              <div key={p.id} className="item-card">
                <h3>{p.name}</h3>
                <p>{p.goal || 'No description'}</p>
                <div className="row">
                  <span className="meta">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                  <button type="button" className="danger-link" onClick={() => onDelete(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Create a project</h2>
              <button type="button" className="icon-btn" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>What are you working on?</label>
              <input
                autoFocus
                placeholder="Name your project"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>What are you trying to achieve?</label>
              <textarea
                placeholder="Describe your project, goals, subject, etc..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
                Create project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
