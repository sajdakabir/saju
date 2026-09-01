'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';

const contributions = [
  {
    name: 'n8n',
    description: 'Workflow automation platform for connecting apps and building automations with a node-based editor',
    prs: [
      { title: 'Fix(OpenAI Node): Convert binary stream to buffer before FormData append', url: 'https://github.com/n8n-io/n8n/pull/26530' }
    ],
    date: '2026'
  },
  {
    name: 'Hatchet',
    description: 'An orchestration engine for background tasks, AI agents, and durable workflows',
    prs: [
      { title: 'Reported CVE-2026-42572: cross-tenant information disclosure in listTasksByDAGIds', url: 'https://github.com/hatchet-dev/hatchet/security/advisories/GHSA-55gc-6fmc-fpx9' },
      { title: 'Fix: persist dashboard column visibility across reloads', url: 'https://github.com/hatchet-dev/hatchet/pull/3844' }
    ],
    date: '2026'
  },
  {
    name: 'Dokploy',
    description: 'Open Source Alternative to Vercel, Netlify and Heroku.',
    prs: [
      { title: 'Fix: stop leaking Drizzle SQL queries in webhook error responses', url: 'https://github.com/Dokploy/dokploy/pull/4281' }
    ],
    date: '2026'
  },
  {
    name: 'BerriAI (YC)',
    description: 'Python SDK to call 100+ LLM providers with unified APIs, cost tracking, and guardrails',
    prs: [
      { title: 'Fix: Gemini Flash 2.0 implementation is not returning the logprobs', url: 'https://github.com/BerriAI/litellm/pull/9713' }
    ],
    date: '2025'
  },
  {
    name: 'Stylelint',
    description: 'A mighty CSS linter that helps you avoid errors and enforce conventions',
    prs: [
      { title: 'Fix: custom-property-no-missing-var-function false positives for style query in if() function', url: 'https://github.com/stylelint/stylelint/pull/8813' }
    ],
    date: '2025'
  },
  {
    name: 'Ecma TC39',
    description: 'Ecma TC39 is the standards committee that designs and maintains the official JavaScript language specification',
    prs: [
      { title: 'Editorial: use typical phrasing for Agent Record field access', url: 'https://github.com/tc39/ecma262/pull/3704' }
    ],
    date: '2025'
  },
  {
    name: 'Andromeda',
    description: 'JavaScript and TypeScript runtime, written in Rust and powered by the Nova engine',
    prs: [
      { title: 'Feat: implement missing store verbose/strict in compiled binary', url: 'https://github.com/tryandromeda/andromeda/pull/172' },
      { title: 'Feat: implement profile, profileEnd and timeStamp console methods', url: 'https://github.com/tryandromeda/andromeda/pull/184' }
    ],
    date: '2025'
  },
  {
    name: 'Meilisearch',
    description: 'Powerful, fast, and an easy to use search engine',
    prs: [
      { title: 'Added updateDocumentsCsv(string docs, string primaryKey)', url: 'https://github.com/meilisearch/meilisearch-python/pull/654' }
    ],
    date: '2023'
  },
  {
    name: 'ToolJet',
    description: 'Open-source low-code application development platform for building and deploying business applications',
    prs: [
      { title: 'Documentation bug fix', url: 'https://github.com/ToolJet/ToolJet/pull/5376' }
    ],
    date: '2023'
  },
  {
    name: 'Amplication',
    description: 'Open-source backend development platform. Build production-ready services without wasting time on repetitive coding',
    prs: [
      { title: 'Docs: grammatical errors in the readme', url: 'https://github.com/amplication/amplication/pull/7154' }
    ],
    date: '2023'
  },
  {
    name: 'Litefy',
    description: 'A lightweight Spotify client',
    prs: [
      { title: 'Added Bengali language support', url: 'https://github.com/mathkruger/litefy/pull/100' }
    ],
    date: '2023'
  },
];

type Severity = 'Critical' | 'High' | 'Medium';

type SecurityFinding = {
  id: string;
  date: string;
  project: string;
  title: string;
  severity: Severity;
  cvss: string;
  href: string;
  published: boolean;
};

// Coordinated disclosures reported via zerotrail — GitHub Security Advisories.
const securityFindings: SecurityFinding[] = [
  { id: 'GHSA-3556-624q-c5w3', date: 'Sep 1, 2026', project: 'logto', title: 'SSRF via webhooks and custom OAuth2 connector userinfo endpoint', severity: 'High', cvss: '', href: 'https://github.com/logto-io/logto/security/advisories/GHSA-3556-624q-c5w3', published: true },
  { id: 'GHSA-hx55-h48h-7rw9', date: 'Aug 31, 2026', project: 'flowise', title: 'SSRF + LLM API key exfiltration via user-controlled basepath/baseUrl in 8 chat-model nodes', severity: 'Critical', cvss: '9.4', href: 'https://github.com/FlowiseAI/Flowise/security/advisories/GHSA-hx55-h48h-7rw9', published: true },
  { id: 'GHSA-2j37-g5f6-h55p', date: 'Aug 26, 2026', project: 'nango', title: 'Nango proxy SSRF via base-url-override header (empty default denylist)', severity: 'High', cvss: '', href: 'https://github.com/NangoHQ/nango/security/advisories/GHSA-2j37-g5f6-h55p', published: true },
  { id: 'GHSA-hqjp-v5g5-vxvf', date: 'Aug 20, 2026', project: 'entire.io', title: 'Repository-controlled settings can lead to arbitrary code execution', severity: 'High', cvss: '8.8', href: 'https://github.com/entireio/cli/security/advisories/GHSA-hqjp-v5g5-vxvf', published: true },
  { id: 'GHSA-6774-6cqw-f586', date: 'Aug 17, 2026', project: 'martin', title: 'Out-of-gamut CIE color in the static-overlay body panics the renderer and permanently kills the render worker pool', severity: 'High', cvss: '7.5', href: 'https://github.com/maplibre/martin/security/advisories/GHSA-6774-6cqw-f586', published: true },
  { id: 'GHSA-5x5g-6p4c-jqfh', date: 'Aug 17, 2026', project: 'martin', title: 'Unbounded id repetition in sprite, font, tiles amplifies server work for a byte-identical response', severity: 'Medium', cvss: '5.3', href: 'https://github.com/maplibre/martin/security/advisories/GHSA-5x5g-6p4c-jqfh', published: true },
  { id: 'GHSA-4wr8-5c3p-rjcr', date: 'Aug 14, 2026', project: 'budibase', title: 'Missing authorization on license management endpoints allows any authenticated user to delete license', severity: 'High', cvss: '8.1', href: 'https://github.com/Budibase/budibase/security/advisories/GHSA-4wr8-5c3p-rjcr', published: true },
  { id: 'GHSA-r263-56q3-8v3v', date: 'Aug 13, 2026', project: 'lightdash', title: 'SSRF via unvalidated Google Chat and Microsoft Teams webhook URLs in scheduled deliveries', severity: 'Medium', cvss: '6.4', href: 'https://github.com/lightdash/lightdash/security/advisories/GHSA-r263-56q3-8v3v', published: true },
  { id: 'GHSA-9q4r-4842-93vw', date: 'Jul 21, 2026', project: 'trigger.dev', title: 'Cross-tenant SQL injection in the TSQL query compiler (POST /api/v1/query) via unsanitized window-function name', severity: 'High', cvss: '7.7', href: 'https://github.com/triggerdotdev/trigger.dev/security/advisories/GHSA-9q4r-4842-93vw', published: true },
  { id: 'GHSA-378x-q589-34mv', date: 'Jul 21, 2026', project: 'heym', title: 'Command execution via POST /api/mcp/fetch-tools stdio transport: supplied command is spawned before MCP validation', severity: 'High', cvss: '8.8', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-378x-q589-34mv', published: true },
  { id: 'GHSA-j57j-w9ph-xxmc', date: 'Jul 17, 2026', project: 'readest', title: 'Unauthenticated SSRF in the /api/kosync proxy via an incomplete isLanAddress host filter', severity: 'High', cvss: '7.2', href: 'https://github.com/readest/readest/security/advisories/GHSA-j57j-w9ph-xxmc', published: true },
  { id: 'GHSA-hcv7-mg77-pg73', date: 'Jul 11, 2026', project: 'heym', title: 'Unsandboxed skill code execution: skills run via a local backend subprocess without the Docker isolation that Python tools mandate', severity: 'High', cvss: '8.8', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-hcv7-mg77-pg73', published: true },
  { id: 'GHSA-pp95-gc86-jq6q', date: 'Jul 9, 2026', project: 'trigger.dev', title: 'Missing authentication in run-replay action allows cross-organization task execution (IDOR)', severity: 'High', cvss: '7.1', href: 'https://github.com/triggerdotdev/trigger.dev/security/advisories/GHSA-pp95-gc86-jq6q', published: true },
  { id: 'GHSA-jjvx-3wfc-p8hq', date: 'Jul 5, 2026', project: 'heym', title: 'SSRF via /api/mcp/fetch-tools reaches local and private URLs (SSE and streamable-HTTP transports)', severity: 'High', cvss: '7.1', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-jjvx-3wfc-p8hq', published: true },
  { id: 'GHSA-wmpc-m6g9-fwj8', date: 'Jul 5, 2026', project: 'weechat', title: 'Pre-auth memory leak in the relay-api handshake enables unauthenticated DoS', severity: 'High', cvss: '7.5', href: 'https://github.com/weechat/weechat/security/advisories/GHSA-wmpc-m6g9-fwj8', published: true },
  { id: 'GHSA-vxpw-x7j7-8723', date: 'Jul 4, 2026', project: 'heym', title: 'Missing role gate in team-member management lets any member alter the roster and reach shared credentials', severity: 'High', cvss: '8.1', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-vxpw-x7j7-8723', published: true },
  { id: 'GHSA-5748-x76g-v68m', date: 'Jul 4, 2026', project: 'heym', title: 'Horizontal IDOR: template get-by-id skips the visibility check the list path enforces', severity: 'Medium', cvss: '6.5', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-5748-x76g-v68m', published: true },
  { id: 'CVE-2026-54714', date: 'Jul 1, 2026', project: 'logto', title: 'XSS via unescaped RelayState in the SAML auto-submit form', severity: 'Medium', cvss: '6.1', href: 'https://github.com/logto-io/logto/security/advisories/GHSA-cpm5-w86q-w85f', published: true },
  { id: 'CVE-2026-54746', date: 'Jun 30, 2026', project: 'hatchet', title: 'Cross-tenant write and DoS via Dispatcher gRPC', severity: 'Medium', cvss: '6.4', href: 'https://github.com/hatchet-dev/hatchet/security/advisories/GHSA-8x7x-83cf-c3pg', published: true },
  { id: 'GHSA-rqx4-3f6q-3x2v', date: 'Jun 22, 2026', project: 'mockoon', title: 'Unauthenticated admin API + wildcard CORS enables secret theft', severity: 'High', cvss: '8.8', href: 'https://github.com/mockoon/mockoon/security/advisories/GHSA-rqx4-3f6q-3x2v', published: true },
  { id: 'PR-24739', date: 'Jun 22, 2026', project: 'n8n', title: 'Anonymous MCP OAuth DCR: rogue-client redirect URI + unenforced scope contract fixed with a redirect-URI allowlist and consent-screen trust check', severity: 'Medium', cvss: '', href: 'https://github.com/n8n-io/n8n/pull/24739', published: true },
  { id: 'GHSA-cgxm-vr2f-6fj8', date: 'Jun 19, 2026', project: 'parse-server', title: 'Denial of service via deeply nested query operators', severity: 'High', cvss: '8.7', href: 'https://github.com/parse-community/parse-server/security/advisories/GHSA-cgxm-vr2f-6fj8', published: true },
  { id: 'GHSA-5g3f-mq2c-j65v', date: 'Jun 18, 2026', project: 'readest', title: 'Unauthenticated SSRF with CORS bypass in the OPDS proxy', severity: 'Critical', cvss: '9.3', href: 'https://github.com/readest/readest/security/advisories/GHSA-5g3f-mq2c-j65v', published: true },
  { id: 'CVE-2026-48768', date: 'May 24, 2026', project: 'typebot.io', title: 'Unauthenticated arbitrary S3 object write via unsanitized filename', severity: 'Critical', cvss: '9.3', href: 'https://github.com/baptisteArno/typebot.io/security/advisories/GHSA-fp7x-6pqh-vhvf', published: true },
  { id: 'CVE-2026-47127', date: 'May 21, 2026', project: 'ghostfolio', title: 'Stripe subscription bypass', severity: 'Medium', cvss: '6.5', href: 'https://github.com/ghostfolio/ghostfolio/security/advisories/GHSA-j465-x2w3-wjj8', published: true },
  { id: 'GHSA-h669-rqwq-f598', date: 'May 20, 2026', project: 'tambo', title: 'SSRF in the URL validator (LLM, agent, and MCP URLs)', severity: 'Medium', cvss: '5.4', href: 'https://github.com/tambo-ai/tambo/security/advisories/GHSA-h669-rqwq-f598', published: true },
  { id: 'CVE-2026-45715', date: 'May 15, 2026', project: 'budibase', title: 'SSRF bypass via HTTP redirect in the REST datasource', severity: 'High', cvss: '7.7', href: 'https://github.com/Budibase/budibase/security/advisories/GHSA-fgqv-jh4g-pvg2', published: true },
  { id: 'GHSA-jw2w-wr3r-jp8w', date: 'May 11, 2026', project: 'argos', title: 'Anonymous cross-tenant build injection and status spoofing', severity: 'Critical', cvss: '9.3', href: 'https://github.com/argos-ci/argos/security/advisories/GHSA-jw2w-wr3r-jp8w', published: true },
  { id: 'CVE-2026-45297', date: 'May 8, 2026', project: 'openreplay', title: 'Cross-tenant IDOR on feature-flag and assist-stats routes', severity: 'Medium', cvss: '', href: 'https://github.com/openreplay/openreplay/security/advisories/GHSA-5m23-rcj4-cgjx', published: true },
  { id: 'CVE-2026-42572', date: 'May 6, 2026', project: 'hatchet', title: 'Cross-tenant information disclosure in listTasksByDAGIds', severity: 'Medium', cvss: '5.3', href: 'https://github.com/hatchet-dev/hatchet/security/advisories/GHSA-55gc-6fmc-fpx9', published: true },
  { id: 'CVE-2026-41318', date: 'Apr 15, 2026', project: 'anything-llm', title: 'Stored DOM XSS via prompt-injected chart caption', severity: 'Medium', cvss: '5.4', href: 'https://github.com/Mintplex-Labs/anything-llm/security/advisories/GHSA-4q6m-qh3w-9gf5', published: true },
  { id: 'CVE-2026-34449', date: 'Mar 31, 2026', project: 'siyuan', title: 'Cross-origin RCE via permissive CORS and snippet injection', severity: 'Critical', cvss: '9.6', href: 'https://github.com/siyuan-note/siyuan/security/advisories/GHSA-68p4-j234-43mv', published: true },
  { id: 'CVE-2026-33981', date: 'Mar 27, 2026', project: 'changedetection.io', title: 'Environment variable disclosure via the jq env builtin', severity: 'High', cvss: '', href: 'https://github.com/dgtlmoon/changedetection.io/security/advisories/GHSA-58r7-4wr5-hfx8', published: true },
  { id: 'PR-7772', date: 'Apr 27, 2026', project: 'tiptap', title: 'Stored XSS in @tiptap/static-renderer — missing HTML escaping in serializeAttrsToHTMLString() and text-node rendering', severity: 'Medium', cvss: '', href: 'https://github.com/ueberdosis/tiptap/pull/7772', published: true },

  // Coordinated — reported and accepted, awaiting public disclosure.
  { id: 'Reserved', date: '', project: 'metabase', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'cline', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'mindsdb', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'misoTTS', title: 'Pending disclosure', severity: 'Critical', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'tolgee-platform', title: 'Pending disclosure', severity: 'Medium', cvss: '', href: '', published: false },
];

const sevStyle: Record<Severity, string> = {
  Critical: 'border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400',
  High: 'border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Medium: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
};

// Full literal class names so Tailwind compiles them (constructed strings aren't detected).
const sevDot: Record<Severity, string> = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-500',
};

const sevOrder: Severity[] = ['Critical', 'High', 'Medium'];

export default function ContributionsPage() {
  const { theme, mounted, toggleTheme, isAnimating, incomingTheme } = useTheme();
  const [showNavigation, setShowNavigation] = useState(true);
  const [tab, setTab] = useState<'security' | 'pr'>('security');

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const publishedFindings = securityFindings.filter((f) => f.published);
  const sevCounts = sevOrder.map((sev) => ({
    sev,
    count: publishedFindings.filter((f) => f.severity === sev).length,
  }));
  const pendingCount = securityFindings.length - publishedFindings.length;

  return (
    <div className="min-h-screen transition-colors duration-200">
      <ThemeWave isAnimating={isAnimating} incomingTheme={incomingTheme} />
      <Navigation
        isVisible={showNavigation}
        theme={theme}
        onClose={() => setShowNavigation(false)}
      />

      <main className="pl-0 md:pl-24">
        <div className="min-h-screen flex justify-center p-4 sm:p-6 pt-20 sm:pt-16">
          <div className="max-w-3xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme} />

            <div className="mb-12">
              <div className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-1">
                sajdakabir.me / oss-acc
              </div>
              <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                open source contributions
              </h1>
            </div>

            {/* Tabs: Security | Pull Requests */}
            <div className="mb-8 flex items-center gap-6 border-b border-gray-200 dark:border-gray-800">
              {([
                { key: 'security', label: 'Security', count: securityFindings.length },
                { key: 'pr', label: 'Pull Requests', count: contributions.length },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-selected={tab === t.key}
                  className={`-mb-px flex items-center gap-2 border-b-2 pb-2.5 pt-1 text-[11px] font-mono uppercase tracking-wide transition-colors ${
                    tab === t.key
                      ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400'
                  }`}
                >
                  {t.label}
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Pull Requests — card list */}
            {tab === 'pr' && (
            <section className="mb-16">
              <div className="space-y-6">
                {contributions.map((project, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {project.name}
                      </h3>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                        {project.date}
                      </span>
                    </div>

                    <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-1.5">
                      {project.prs.map((pr, prIndex) => (
                        <Link
                          key={prIndex}
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group/link"
                        >
                          {/* git merge / PR icon */}
                          <svg className="w-3.5 h-3.5 shrink-0 text-purple-400 opacity-80 group-hover/link:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"/>
                          </svg>
                          <span className="group-hover/link:underline">{pr.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Security — table */}
            {tab === 'security' && (
            <section className="mb-16">
              {/* Severity summary */}
              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-gray-500 dark:text-gray-500">
                {sevCounts.map(({ sev, count }) => (
                  <span key={sev} className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${sevDot[sev]}`} />
                    <span className="text-gray-700 dark:text-gray-300">{count}</span>
                    <span className="uppercase tracking-wide">{sev}</span>
                  </span>
                ))}
                <span className="ml-auto text-gray-400 dark:text-gray-600">
                  {publishedFindings.length} disclosed · {pendingCount} pending
                </span>
              </div>
              <div className="space-y-5">
                {securityFindings.map((f, i) => {
                  const pending = !f.published;
                  const clickable = !pending && !!f.href;

                  const card = (
                    <>
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
                          {f.project}
                        </h3>
                        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap pt-0.5">
                          <span
                            className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wide ${sevStyle[f.severity]}`}
                          >
                            {f.severity}
                          </span>
                          {!pending && f.cvss && (
                            <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                              CVSS {f.cvss}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mb-2.5 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                        {pending ? (
                          <span className="italic text-gray-400 dark:text-gray-600">Pending disclosure</span>
                        ) : (
                          f.title
                        )}
                      </p>

                      <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400 dark:text-gray-600">
                        <span className={pending ? 'italic' : ''}>{f.id}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pending ? 'TBD' : f.date}</span>
                        {clickable && (
                          <svg
                            className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        )}
                      </div>
                    </>
                  );

                  const base =
                    'border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0';

                  return clickable ? (
                    <div
                      key={`${f.id}-${f.project}-${i}`}
                      onClick={() => window.open(f.href, '_blank', 'noopener,noreferrer')}
                      className={`group cursor-pointer ${base}`}
                    >
                      {card}
                    </div>
                  ) : (
                    <div
                      key={`${f.id}-${f.project}-${i}`}
                      className={`${base} ${pending ? 'opacity-60' : ''}`}
                    >
                      {card}
                    </div>
                  );
                })}
              </div>
            </section>
            )}

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
