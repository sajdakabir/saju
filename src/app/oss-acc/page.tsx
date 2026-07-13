'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';

type PullRequest = {
  project: string;
  title: string;
  url: string;
  date: string;
};

const pullRequests: PullRequest[] = [
  { project: 'n8n', title: 'Fix(OpenAI Node): Convert binary stream to buffer before FormData append', url: 'https://github.com/n8n-io/n8n/pull/26530', date: '2026' },
  { project: 'Hatchet', title: 'Fix: persist dashboard column visibility across reloads', url: 'https://github.com/hatchet-dev/hatchet/pull/3844', date: '2026' },
  { project: 'Dokploy', title: 'Fix: stop leaking Drizzle SQL queries in webhook error responses', url: 'https://github.com/Dokploy/dokploy/pull/4281', date: '2026' },
  { project: 'BerriAI (YC)', title: 'Fix: Gemini Flash 2.0 implementation is not returning the logprobs', url: 'https://github.com/BerriAI/litellm/pull/9713', date: '2025' },
  { project: 'Stylelint', title: 'Fix: custom-property-no-missing-var-function false positives for style query in if() function', url: 'https://github.com/stylelint/stylelint/pull/8813', date: '2025' },
  { project: 'Ecma TC39', title: 'Editorial: use typical phrasing for Agent Record field access', url: 'https://github.com/tc39/ecma262/pull/3704', date: '2025' },
  { project: 'Andromeda', title: 'Feat: implement missing store verbose/strict in compiled binary', url: 'https://github.com/tryandromeda/andromeda/pull/172', date: '2025' },
  { project: 'Andromeda', title: 'Feat: implement profile, profileEnd and timeStamp console methods', url: 'https://github.com/tryandromeda/andromeda/pull/184', date: '2025' },
  { project: 'Meilisearch', title: 'Added updateDocumentsCsv(string docs, string primaryKey)', url: 'https://github.com/meilisearch/meilisearch-python/pull/654', date: '2023' },
  { project: 'ToolJet', title: 'Documentation bug fix', url: 'https://github.com/ToolJet/ToolJet/pull/5376', date: '2023' },
  { project: 'Amplication', title: 'Docs: grammatical errors in the readme', url: 'https://github.com/amplication/amplication/pull/7154', date: '2023' },
  { project: 'Litefy', title: 'Added Bengali language support', url: 'https://github.com/mathkruger/litefy/pull/100', date: '2023' },
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
  { id: 'GHSA-9q4r-4842-93vw', date: '', project: 'trigger.dev', title: 'Pending disclosure', severity: 'High', cvss: '', href: 'https://github.com/triggerdotdev/trigger.dev/security/advisories/GHSA-9q4r-4842-93vw', published: false },
  { id: 'Reserved', date: '', project: 'metabase', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'cline', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'mindsdb', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'misoTTS', title: 'Pending disclosure', severity: 'Critical', cvss: '', href: '', published: false },
  { id: 'Reserved', date: '', project: 'flowise', title: 'Pending disclosure', severity: 'High', cvss: '', href: '', published: false },
  { id: 'GHSA-378x-q589-34mv', date: '', project: 'heym', title: 'Pending disclosure', severity: 'High', cvss: '', href: 'https://github.com/heymrun/heym/security/advisories/GHSA-378x-q589-34mv', published: false },
  { id: 'Reserved', date: '', project: 'tolgee-platform', title: 'Pending disclosure', severity: 'Medium', cvss: '', href: '', published: false },
];

const sevStyle: Record<Severity, string> = {
  Critical: 'border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400',
  High: 'border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Medium: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
};

export default function ContributionsPage() {
  const { theme, mounted, toggleTheme, isAnimating, incomingTheme } = useTheme();
  const [showNavigation, setShowNavigation] = useState(true);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

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
                sajdakabir.com / oss-acc
              </div>
              <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                open source contributions
              </h1>
            </div>

            {/* Pull Requests table */}
            <section className="mb-14">
              <h2 className="text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                Pull Requests
              </h2>
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Project
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600">
                        Contribution
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap text-right">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pullRequests.map((pr, i) => (
                      <tr
                        key={`${pr.url}-${i}`}
                        className="border-b border-gray-100 dark:border-gray-800/60 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
                      >
                        <td className="px-3 py-2.5 text-[13px] font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap align-top">
                          {pr.project}
                        </td>
                        <td className="px-3 py-2.5 text-[13px] align-top">
                          <Link
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                          >
                            {pr.title}
                          </Link>
                        </td>
                        <td className="px-3 py-2.5 text-[12px] text-gray-500 dark:text-gray-500 whitespace-nowrap text-right align-top">
                          {pr.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Security Disclosures table */}
            <section className="mb-16">
              <h2 className="text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                Security Disclosures
              </h2>
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        ID
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Project
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600">
                        Finding
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap">
                        Severity
                      </th>
                      <th className="px-3 py-2 text-[11px] font-mono uppercase tracking-wide text-gray-400 dark:text-gray-600 whitespace-nowrap text-right">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityFindings.map((f, i) => {
                      const pending = !f.published;
                      const row = (
                        <>
                          <td className="px-3 py-2.5 font-mono text-[12px] align-top whitespace-nowrap">
                            <span className={pending ? 'italic text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}>
                              {f.id}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-[13px] font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap align-top">
                            {f.project}
                          </td>
                          <td className="px-3 py-2.5 text-[13px] align-top">
                            {pending ? (
                              <span className="italic text-gray-400 dark:text-gray-600">
                                Pending disclosure
                              </span>
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400">{f.title}</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 align-top whitespace-nowrap">
                            <span
                              className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wide ${sevStyle[f.severity]}`}
                            >
                              {f.severity}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-[12px] text-gray-500 dark:text-gray-500 whitespace-nowrap text-right align-top">
                            {pending ? 'TBD' : f.date}
                          </td>
                        </>
                      );

                      const clickable = !pending && !!f.href;

                      return (
                        <tr
                          key={`${f.id}-${f.project}-${i}`}
                          onClick={
                            clickable
                              ? () => window.open(f.href, '_blank', 'noopener,noreferrer')
                              : undefined
                          }
                          className={`border-b border-gray-100 dark:border-gray-800/60 last:border-b-0 transition-colors ${
                            pending
                              ? 'opacity-60'
                              : clickable
                              ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/40'
                              : ''
                          }`}
                        >
                          {row}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
