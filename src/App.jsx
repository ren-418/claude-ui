import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import SettingsModal from './components/SettingsModal'
import ChatPage from './components/pages/ChatPage'
import ProjectsPage from './components/pages/ProjectsPage'
import ArtifactsPage from './components/pages/ArtifactsPage'
import CodePage from './components/pages/CodePage'
import CustomizePage from './components/pages/CustomizePage'
import PlansPage from './components/pages/PlansPage'
import { loadState, saveState, uid } from './store'
import { applyTheme, watchSystemTheme } from './theme'
import './App.css'

const LOCAL_REPLIES = [
  "Got it — I've noted that locally. In this UI clone there's no live model, but your message is saved in this chat.",
  "Thanks for sharing. I can help you outline next steps, draft copy, or break the problem down whenever you're ready.",
  "Sounds good. Keep sending ideas and I'll respond with local placeholder replies while we explore the interface.",
]

function titleFrom(text) {
  const t = text.trim().replace(/\s+/g, ' ')
  return t.length > 42 ? `${t.slice(0, 42)}…` : t || 'New chat'
}

export default function App() {
  const [state, setState] = useState(loadState)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    applyTheme(state.prefs.theme)
    return watchSystemTheme(state.prefs.theme, () => applyTheme('system'))
  }, [state.prefs.theme])

  function patch(partial) {
    setState((s) => ({ ...s, ...partial }))
  }

  function setPref(key, value) {
    setState((s) => ({ ...s, prefs: { ...s.prefs, [key]: value } }))
  }

  function setProfile(partial) {
    setState((s) => ({
      ...s,
      profile: { ...s.profile, ...partial },
      prefs: {
        ...s.prefs,
        ...(partial.name != null ? { fullName: partial.name } : {}),
        ...(partial.email != null ? { email: partial.email } : {}),
      },
    }))
  }

  function openSettings(panel = 'general') {
    patch({ settingsOpen: true, settingsPanel: panel })
  }

  function newChat() {
    const chat = {
      id: uid(),
      title: 'New chat',
      createdAt: Date.now(),
      messages: [],
    }
    patch({
      view: 'chat',
      chats: [chat, ...state.chats],
      activeChatId: chat.id,
    })
  }

  function selectChat(id) {
    patch({ view: 'chat', activeChatId: id })
  }

  function sendMessage(text) {
    let chats = [...state.chats]
    let activeId = state.activeChatId
    let chat = chats.find((c) => c.id === activeId)

    if (!chat) {
      chat = { id: uid(), title: titleFrom(text), createdAt: Date.now(), messages: [] }
      chats = [chat, ...chats]
      activeId = chat.id
    }

    const userMsg = { id: uid(), role: 'user', content: text, at: Date.now() }
    const reply = LOCAL_REPLIES[Math.floor(Math.random() * LOCAL_REPLIES.length)]
    const asstMsg = { id: uid(), role: 'assistant', content: reply, at: Date.now() }

    const updated = {
      ...chat,
      title: chat.messages.length === 0 ? titleFrom(text) : chat.title,
      messages: [...chat.messages, userMsg, asstMsg],
    }

    chats = chats.map((c) => (c.id === updated.id ? updated : c))
    if (!chats.find((c) => c.id === updated.id)) chats = [updated, ...chats]

    patch({ chats, activeChatId: activeId, view: 'chat' })
  }

  function createProject({ name, goal }) {
    const project = { id: uid(), name, goal, createdAt: Date.now() }
    patch({ projects: [project, ...state.projects] })
  }

  function deleteProject(id) {
    patch({ projects: state.projects.filter((p) => p.id !== id) })
  }

  function createArtifact({ title, content }) {
    const artifact = { id: uid(), title, content, createdAt: Date.now() }
    patch({ artifacts: [artifact, ...state.artifacts] })
  }

  function deleteArtifact(id) {
    patch({ artifacts: state.artifacts.filter((a) => a.id !== id) })
  }

  function installSkill(id) {
    if (state.installedSkills.includes(id)) return
    patch({ installedSkills: [...state.installedSkills, id] })
  }

  function removeSkill(id) {
    patch({ installedSkills: state.installedSkills.filter((s) => s !== id) })
  }

  function toggleList(key, id) {
    const list = state[key]
    patch({
      [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    })
  }

  const activeChat = state.chats.find((c) => c.id === state.activeChatId) || null

  let main = null
  switch (state.view) {
    case 'projects':
      main = (
        <ProjectsPage
          projects={state.projects}
          onCreate={createProject}
          onDelete={deleteProject}
        />
      )
      break
    case 'artifacts':
      main = (
        <ArtifactsPage
          artifacts={state.artifacts}
          onCreate={createArtifact}
          onDelete={deleteArtifact}
        />
      )
      break
    case 'code':
      main = <CodePage onUpgrade={() => patch({ view: 'plans' })} />
      break
    case 'customize':
      main = (
        <CustomizePage
          tab={state.customizeTab}
          sub={state.customizeSub}
          installedSkills={state.installedSkills}
          installedConnectors={state.installedConnectors}
          installedPlugins={state.installedPlugins}
          onTab={(customizeTab) => patch({ customizeTab })}
          onSub={(customizeSub) => patch({ customizeSub })}
          onInstallSkill={installSkill}
          onRemoveSkill={removeSkill}
          onToggleConnector={(id) => toggleList('installedConnectors', id)}
          onTogglePlugin={(id) => toggleList('installedPlugins', id)}
        />
      )
      break
    case 'plans':
      main = (
        <PlansPage
          audience={state.plansAudience}
          proBilling={state.proBilling}
          onAudience={(plansAudience) => patch({ plansAudience })}
          onProBilling={(proBilling) => patch({ proBilling })}
          onBack={() => patch({ view: 'chat' })}
          onSelect={(plan) => {
            patch({
              profile: { ...state.profile, plan },
              view: 'chat',
            })
          }}
        />
      )
      break
    default:
      main = (
        <ChatPage
          chat={activeChat}
          model={state.model}
          onSend={sendMessage}
          onShare={() => openSettings('privacy')}
        />
      )
  }

  const hideSidebar = state.view === 'plans'

  return (
    <div className="app-shell">
      {!hideSidebar && (
        <Sidebar
          open={sidebarOpen}
          view={state.view}
          chats={state.chats}
          activeChatId={state.activeChatId}
          profile={state.profile}
          onNav={(view) => patch({ view })}
          onNewChat={newChat}
          onSelectChat={selectChat}
          onOpenSettings={openSettings}
          onOpenSearch={() => openSettings('general')}
        />
      )}

      <main className="main-area">{main}</main>

      <SettingsModal
        open={state.settingsOpen}
        panel={state.settingsPanel}
        search={state.settingsSearch}
        prefs={state.prefs}
        profile={state.profile}
        onClose={() => patch({ settingsOpen: false })}
        onPanel={(settingsPanel) => patch({ settingsPanel })}
        onSearch={(settingsSearch) => patch({ settingsSearch })}
        setPref={setPref}
        setProfile={setProfile}
        onUpgrade={() => patch({ settingsOpen: false, view: 'plans' })}
        onLogout={() => {
          if (window.confirm('Clear local session data?')) {
            localStorage.removeItem('claude-ai-clone-v1')
            setState(loadState())
          }
        }}
        onGoCustomize={(tab) =>
          patch({
            settingsOpen: false,
            view: 'customize',
            customizeTab: tab,
            customizeSub: 'discover',
          })
        }
      />

      <button
        type="button"
        className="mobile-menu-fab"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
    </div>
  )
}
