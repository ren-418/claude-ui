import { Code2 } from 'lucide-react'

export default function CodePage({ onUpgrade }) {
  return (
    <div className="page">
      <div className="code-promo">
        <div className="code-icon-wrap">
          <Code2 size={32} strokeWidth={1.5} />
        </div>
        <h1>Claude Code</h1>
        <p>
          Work with Claude directly in your codebase. Review diffs, run commands, and ship faster —
          available on Pro and Max.
        </p>
        <button type="button" className="btn btn-primary" style={{ minWidth: 180 }} onClick={onUpgrade}>
          Upgrade
        </button>
        <p style={{ marginTop: 18, fontSize: 13 }}>
          Or explore plans to unlock Claude Code, Cowork, and higher usage.
        </p>
      </div>
    </div>
  )
}
