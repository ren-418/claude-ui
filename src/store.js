const KEY = 'claude-ai-clone-v1'

export function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function initialsFrom(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const defaultSettings = () => ({
  theme: 'system',
  chatFont: 'Anthropic Serif',
  motion: 'system',
  voiceLanguage: 'English',
  voiceStyle: 'Buttery',
  voiceSpeed: 'Normal',
  notifyResponseComplete: false,
  notifyMentions: true,
  notifyComments: true,
  fullName: 'Morgan Lee',
  preferredName: 'Morgan',
  workFunction: 'Engineering',
  instructions: '',
  email: 'morgan@example.com',
  orgId: 'org_7f3a2b91c4d8e0',
  locationMetadata: true,
  helpImprove: true,
  toolAccess: 'Ask before using',
  connectorSearch: true,
  switchModels: true,
  artifactsEnabled: true,
  artifactsPublish: false,
  inlineViz: true,
  codeExecution: true,
  generateMemory: true,
  sensitiveTopics: false,
  quietHours: false,
  breaksEnabled: false,
  quietStart: '22:00',
  quietEnd: '07:00',
  classifySessions: true,
  codeSwitchModels: true,
  codeTheme: 'dark',
  codeFont: 'Mono',
  reflectRange: 'Past month',
  reflectChart: 'Conversations',
})

const defaultState = () => ({
  view: 'chat',
  customizeTab: 'skills',
  customizeSub: 'discover',
  plansAudience: 'individual',
  proBilling: 'monthly',
  settingsOpen: false,
  settingsPanel: 'general',
  settingsSearch: '',
  profile: {
    name: 'Morgan Lee',
    email: 'morgan@example.com',
    plan: 'Free',
  },
  model: 'Sonnet',
  chats: [],
  activeChatId: null,
  projects: [],
  artifacts: [],
  installedSkills: [],
  installedConnectors: [],
  installedPlugins: [],
  prefs: defaultSettings(),
})

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      ...defaultState(),
      ...parsed,
      prefs: { ...defaultSettings(), ...(parsed.prefs || {}) },
      profile: { ...defaultState().profile, ...(parsed.profile || {}) },
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export const DISCOVER_SKILLS = [
  {
    id: 'data',
    title: 'Data',
    category: 'From Anthropic',
    desc: 'Query, chart and explain your data — SQL, spreadsheets and dashboards in one place.',
    featured: true,
    installs: '1.2M',
    color: '#1a3d2e',
  },
  {
    id: 'design',
    title: 'Design',
    category: 'Design',
    desc: 'Accelerate design workflows with critique, variants, and handoff notes.',
    installs: '2.7M',
    by: 'Anthropic',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    category: 'Engineering',
    desc: 'Streamline engineering workflows across reviews, tests, and docs.',
    installs: '2.7M',
    by: 'Anthropic',
  },
  {
    id: 'figma',
    title: 'Figma',
    category: 'Design',
    desc: 'Turn Figma frames into structured specs and implementation notes.',
    installs: '890K',
    by: 'Figma',
  },
  {
    id: 'searchfit',
    title: 'SearchFit SEO',
    category: 'Marketing',
    desc: 'Audit pages, suggest keywords, and draft on-page SEO improvements.',
    installs: '412K',
    by: 'SearchFit',
  },
  {
    id: 'desktop-commander',
    title: 'Desktop Commander',
    category: 'Productivity',
    desc: 'Control local files and terminals with careful, reviewable actions.',
    installs: '1.1M',
    by: 'Anthropic',
  },
  {
    id: 'bright-data',
    title: 'Bright Data',
    category: 'Data',
    desc: 'Collect and clean public web data for research and analysis.',
    installs: '320K',
    by: 'Bright Data',
  },
  {
    id: 'verification',
    title: 'verification-foundation',
    category: 'New',
    desc: 'from Anthropic • Structured checks for claims and sources…',
    installs: 'new',
    by: 'Anthropic',
    when: '6d ago',
  },
  {
    id: 'revenue-grid',
    title: 'Revenue Grid',
    category: 'New',
    desc: 'from Partners • Pipeline summaries and account briefs…',
    installs: 'new',
    by: 'Partners',
    when: 'Sep 30',
  },
]

export const ANTHROPIC_SKILLS = [
  { id: 'google-workspace', title: 'google-workspace', desc: 'from Anthropic • Drive, Docs, Sheets helpers…', when: '6d ago' },
  { id: 'docs', title: 'docs', desc: 'from Anthropic • Draft and revise long-form docs…', when: 'Sep 30' },
  { id: 'import-memory', title: 'import-memory', desc: 'from Anthropic • Bring preferences into Claude…', when: 'Sep 15' },
  { id: 'morning', title: 'morning', desc: 'from Anthropic • Daily briefing and priorities…', when: 'Sep 12' },
  { id: 'skill-creator', title: 'skill-creator', desc: 'from Anthropic • Author custom skills…', when: 'Aug 28' },
]

export const CONNECTORS = [
  { id: 'slack', title: 'Slack', desc: 'Search channels and draft replies' },
  { id: 'gdrive', title: 'Google Drive', desc: 'Read docs and sheets with permission' },
  { id: 'github', title: 'GitHub', desc: 'Issues, PRs, and repository context' },
  { id: 'notion', title: 'Notion', desc: 'Pages and databases as context' },
]

export const PLUGINS = [
  { id: 'browser', title: 'Browser', desc: 'Open pages and extract readable content' },
  { id: 'calendar', title: 'Calendar', desc: 'Summarize and prepare for meetings' },
  { id: 'notes', title: 'Notes', desc: 'Capture and retrieve personal notes' },
]
