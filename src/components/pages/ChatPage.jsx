import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  Plus,
  Mic,
  AudioLines,
  ArrowUp,
  Share,
} from 'lucide-react'

function Starburst() {
  return (
    <svg className="starburst" viewBox="0 0 64 64" fill="currentColor" aria-hidden>
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <rect
          key={deg}
          x="29"
          y="4"
          width="6"
          height="22"
          rx="3"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="5" />
    </svg>
  )
}

export default function ChatPage({ chat, model, onSend, onShare }) {
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)
  const taRef = useRef(null)
  const messages = chat?.messages || []
  const empty = !chat || messages.length === 0

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, chat?.id])

  useEffect(() => {
    setDraft('')
  }, [chat?.id])

  function submit() {
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
    if (taRef.current) taRef.current.style.height = 'auto'
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function autoSize(e) {
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
    setDraft(el.value)
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <button type="button" className="chat-title-btn">
          <span>{chat?.title || 'New chat'}</span>
          <ChevronDown size={14} />
        </button>
        <button type="button" className="share-btn" onClick={onShare}>
          <Share size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          Share
        </button>
      </header>

      <div className="chat-body">
        {empty ? (
          <div className="welcome">
            <h1>Welcome! I&apos;m Claude.</h1>
            <p>
              Bring me anything—a tough problem, a half-formed idea, something you need to write.
              We&apos;ll figure it out together.
            </p>
            <p className="ask">Where do you want to start?</p>
            <Starburst />
          </div>
        ) : (
          <div className="messages">
            {messages.map((m) => (
              <div key={m.id} className={`msg ${m.role}`}>
                <div className="bubble">{m.content}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="composer-wrap">
        <div className="composer">
          <button type="button" className="icon-btn" title="Attach">
            <Plus size={18} />
          </button>
          <textarea
            ref={taRef}
            rows={1}
            placeholder="Tell Claude what you're working on"
            value={draft}
            onChange={autoSize}
            onKeyDown={onKey}
          />
          <div className="composer-actions">
            <button type="button" className="icon-btn" title="Voice">
              <Mic size={18} />
            </button>
            {draft.trim() ? (
              <button type="button" className="icon-btn" title="Send" onClick={submit} style={{ color: 'var(--text-primary)' }}>
                <ArrowUp size={18} />
              </button>
            ) : (
              <button type="button" className="icon-btn" title="Voice mode">
                <AudioLines size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <p className="disclaimer">Claude is AI and can make mistakes. Please double-check responses.</p>
        <button type="button" className="model-chip">{model}</button>
      </div>
    </div>
  )
}
