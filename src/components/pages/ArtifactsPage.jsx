import { useState } from 'react'
import { Plus, Search, X, Boxes } from 'lucide-react'

export default function ArtifactsPage({ artifacts, onCreate, onDelete }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [query, setQuery] = useState('')

  const filtered = artifacts.filter((a) =>
    `${a.title} ${a.content}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({ title: title.trim(), content: content.trim() })
    setTitle('')
    setContent('')
    setOpen(false)
  }

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-head-row">
          <h1 className="page-title">Artifacts</h1>
          <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={16} /> New artifact
          </button>
        </div>

        <div className="toolbar">
          <div className="search-box grow" style={{ maxWidth: 280 }}>
            <Search size={14} color="var(--text-dim)" />
            <input
              placeholder="Search artifacts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 80 }}>
            <Boxes size={48} strokeWidth={1.25} />
            <h3>No artifacts yet</h3>
            <p>Artifacts are documents, code, and visuals you create with Claude.</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
              Create artifact
            </button>
          </div>
        ) : (
          <div className="item-grid">
            {filtered.map((a) => (
              <div key={a.id} className="item-card">
                <h3>{a.title}</h3>
                <p>{a.content || 'Empty artifact'}</p>
                <div className="row">
                  <span className="meta">{new Date(a.createdAt).toLocaleDateString()}</span>
                  <button type="button" className="danger-link" onClick={() => onDelete(a.id)}>
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
              <h2>Create artifact</h2>
              <button type="button" className="icon-btn" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Title</label>
              <input
                autoFocus
                placeholder="Artifact title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Content</label>
              <textarea
                placeholder="Paste or write content…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
