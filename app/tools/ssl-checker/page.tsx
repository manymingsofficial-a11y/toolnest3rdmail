import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { SslChecker } from '@/components/web/ssl-checker';

export const metadata = buildToolMetadata(
  'ssl-checker',
  'SSL Checker',
  'Check whether a website is reachable via HTTPS and learn how to inspect SSL certificates.'
);

const relatedSlugs = ['dns-lookup', 'ip-address-checker', 'website-screenshot'];

export default function SslCheckerPage() {
  return (
    <ToolPageTemplate
      slug="ssl-checker"
      relatedSlugs={relatedSlugs}
      blurColor="bg-emerald-400/20"
      seo={{
        whatIs: `The SSL Checker tests whether a website is reachable via HTTPS by making a real browser request to the URL. It confirms the SSL/TLS handshake completed successfully and the server responded. Browser security prevents JavaScript from reading certificate details (issuer, expiry, chain, cipher) — the tool explains how to inspect those using the browser padlock icon or openssl commands.`,
        howTo: [
          'Enter the website URL you want to check (e.g., example.com or https://example.com).',
          'Click Check HTTPS to make a real HTTPS request to the server.',
          'Review the result: a successful connection means HTTPS is working and the certificate was accepted by the browser.',
          'If the connection fails, the tool explains possible causes and how to get detailed certificate information using the browser padlock or openssl s_client.',
        ],
        benefits: [
          { title: 'Real HTTPS verification', description: 'The tool makes an actual HTTPS request to the target server. If it succeeds, the SSL/TLS certificate was valid enough for the browser to accept the connection.' },
          { title: 'Clear failure explanations', description: 'When HTTPS fails, the tool lists possible causes — DNS issues, no server on port 443, invalid/expired certificate, or network blocking — and tells you how to diagnose further.' },
          { title: 'Certificate inspection guidance', description: 'The tool explains how to view full certificate details (issuer, expiry, chain) using the browser padlock icon or the openssl s_client command in a terminal.' },
          { title: 'No fake results', description: 'The tool only reports what it actually verified. It does not fabricate certificate issuer, expiry, or chain information that browsers cannot access.' },
        ],
        faqs: [
          { q: 'Why can\'t the tool show certificate issuer and expiry?', a: 'Browser JavaScript cannot access SSL certificate details due to security restrictions. The browser validates the certificate during the TLS handshake, but does not expose the certificate fields to JavaScript. Use the padlock icon in your browser\'s address bar or run openssl s_client -connect example.com:443 in a terminal.' },
          { q: 'What does a successful check mean?', a: 'It means the browser successfully completed the TLS handshake with the server. The server is listening on port 443, has a valid SSL/TLS certificate that the browser accepted, and responded to the request.' },
          { q: 'What does a failed check mean?', a: 'The HTTPS request could not complete. Common causes: the domain has no DNS record, the server is not listening on port 443, the certificate is invalid or expired, a firewall is blocking the connection, or the server took too long to respond.' },
          { q: 'How do I check certificate expiry?', a: 'Click the padlock icon in your browser\'s address bar, then click "Certificate" or "Connection is secure" to see the validity period. Alternatively, run: openssl s_client -connect example.com:443 < /dev/null 2>/dev/null | openssl x509 -noout -dates' },
          { q: 'Can the tool check internal websites?', a: 'The tool can check any URL your browser can reach, including internal websites on your network. However, it cannot access websites behind a VPN or firewall that blocks your browser\'s connection.' },
        ],
      }}
    >
      <SslChecker />
    </ToolPageTemplate>
  );
}
