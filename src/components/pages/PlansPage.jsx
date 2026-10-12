import { ArrowLeft, Check, Network } from 'lucide-react'

const FREE = [
  'Chat on web, iOS, Android, and desktop',
  'Generate code and visualize data',
  'Connect Slack and Google Workspace',
  'Extended thinking for complex work',
  'Built-in web search',
]

const PRO = [
  'Claude Code directly in your codebase',
  'Power through tasks with Cowork',
  'Build and prototype with Claude Design',
  'Higher usage limits',
  'Access to more Claude models',
  'Memory that carries across conversations',
]

const MAX = [
  'Up to 20x more usage than Pro*',
  'Recommended for Claude Code & Cowork',
  'Early access to advanced Claude features',
  'Higher output limits for all tasks',
  'Priority access at high traffic times',
]

const TEAM = [
  'Everything in Pro for your organization',
  'Centralized billing and admin controls',
  'Shared projects and connectors',
  'SSO and usage analytics',
]

const ENTERPRISE = [
  'Everything in Team, plus',
  'Custom usage and dedicated support',
  'Advanced security and compliance',
  'SCIM, audit logs, and data residency',
]

function PlanIcon() {
  return <Network size={28} strokeWidth={1.4} className="plan-icon" />
}

function Features({ items, label }) {
  return (
    <>
      {label && <div className="features-label">{label}</div>}
      <ul className="check-list" style={{ marginTop: 8 }}>
        {items.map((t) => (
          <li key={t}>
            <Check size={15} className="ck" strokeWidth={2} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function PlansPage({
  audience,
  proBilling,
  onAudience,
  onProBilling,
  onBack,
  onSelect,
}) {
  return (
    <div className="plans-page">
      <div className="plans-top">
        <button type="button" className="back-link" onClick={onBack}>
          <ArrowLeft size={16} /> Upgrade
        </button>
        <h1 className="plans-title">Plans that grow with you</h1>
        <span />
      </div>

      <div className="plans-toggle-wrap">
        <div className="seg">
          <button
            type="button"
            className={audience === 'individual' ? 'active' : ''}
            onClick={() => onAudience('individual')}
          >
            Individual
          </button>
          <button
            type="button"
            className={audience === 'team' ? 'active' : ''}
            onClick={() => onAudience('team')}
          >
            Team and Enterprise
          </button>
        </div>
      </div>

      {audience === 'individual' ? (
        <div className="plan-grid">
          <div className="plan-card">
            <PlanIcon />
            <h2>Free</h2>
            <div className="tagline">Meet Claude</div>
            <div className="price">$0</div>
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => onSelect('Free')}>
              Use Claude for free
            </button>
            <Features items={FREE} />
          </div>

          <div className="plan-card">
            <div className="billing-toggle">
              <button
                type="button"
                className={proBilling === 'monthly' ? 'active' : ''}
                onClick={() => onProBilling('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={proBilling === 'yearly' ? 'active' : ''}
                onClick={() => onProBilling('yearly')}
              >
                Yearly <span className="save">- Save 17%</span>
              </button>
            </div>
            <PlanIcon />
            <h2>Pro</h2>
            <div className="tagline">Research, code, and organize</div>
            <div className="price">{proBilling === 'yearly' ? '$17' : '$20'}</div>
            <div className="price-sub">
              USD / month {proBilling === 'yearly' ? 'billed yearly' : 'billed monthly'}
            </div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => onSelect('Pro')}>
              Get Pro plan
            </button>
            <div className="cancel-note">No commitment · Cancel anytime</div>
            <Features items={PRO} label="Everything in Free and:" />
          </div>

          <div className="plan-card">
            <PlanIcon />
            <h2>Max</h2>
            <div className="tagline">Higher limits, priority access</div>
            <div className="price">From $100</div>
            <div className="price-sub">USD / month billed monthly</div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => onSelect('Max')}>
              Get Max plan
            </button>
            <div className="cancel-note">No commitment · Cancel anytime</div>
            <Features items={MAX} label="Everything in Pro, plus:" />
          </div>
        </div>
      ) : (
        <div className="plan-grid two">
          <div className="plan-card">
            <PlanIcon />
            <h2>Team</h2>
            <div className="tagline">Collaborate with Claude at work</div>
            <div className="price">$30</div>
            <div className="price-sub">USD / seat / month</div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => onSelect('Team')}>
              Get Team plan
            </button>
            <div className="cancel-note">No commitment · Cancel anytime</div>
            <Features items={TEAM} />
          </div>
          <div className="plan-card">
            <PlanIcon />
            <h2>Enterprise</h2>
            <div className="tagline">Security and scale for large orgs</div>
            <div className="price">Custom</div>
            <div className="price-sub">Contact sales for pricing</div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => onSelect('Enterprise')}>
              Contact sales
            </button>
            <div className="cancel-note">Tailored contracts available</div>
            <Features items={ENTERPRISE} />
          </div>
        </div>
      )}

      <p className="plans-legal">
        <a href="#usage">Usage limits apply</a>. Prices and plans are subject to change at Anthropic&apos;s
        discretion.
      </p>
    </div>
  )
}
