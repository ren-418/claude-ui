export function resolveTheme(pref) {
  if (pref === 'light' || pref === 'dark') return pref
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(pref) {
  const resolved = resolveTheme(pref)
  document.documentElement.setAttribute('data-theme', resolved)
  document.documentElement.style.colorScheme = resolved
  return resolved
}

export function watchSystemTheme(pref, onChange) {
  if (pref !== 'system') return () => {}
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => onChange(resolveTheme('system'))
  mq.addEventListener('change', handler)
  return () => mq.removeEventListener('change', handler)
}
