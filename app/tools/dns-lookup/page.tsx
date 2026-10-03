import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { DnsLookup } from '@/components/web/dns-lookup';

export const metadata = buildToolMetadata(
  'dns-lookup',
  'DNS Lookup',
  'Look up real DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) for any domain.'
);

const relatedSlugs = ['ip-address-checker', 'ssl-checker', 'http-header-viewer'];

export default function DnsLookupPage() {
  return (
    <ToolPageTemplate
      slug="dns-lookup"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The DNS Lookup tool queries real DNS records for any domain using Google's DNS-over-HTTPS (DoH) API. It fetches A, AAAA, MX, TXT, NS, CNAME, and SOA records directly from the browser and displays the actual responses including TTL values. No server-side proxy is needed — the DoH API returns JSON with CORS headers that browsers can read directly.`,
        howTo: [
          'Enter the domain name you want to look up (e.g., example.com).',
          'Select which record types to query: A (IPv4), AAAA (IPv6), MX (mail), TXT (text), NS (nameservers), CNAME (alias), or SOA (start of authority).',
          'Click Lookup DNS Records to fetch real records from Google\'s DNS-over-HTTPS resolver.',
          'Review the results: each record type shows the actual DNS response, record data, and TTL (time to live) values.',
        ],
        benefits: [
          { title: 'Real DNS queries', description: 'The tool fetches actual DNS records using Google\'s public DNS-over-HTTPS API (dns.google/resolve). Results are live — not cached, not faked, and not approximated.' },
          { title: 'Seven record types', description: 'Query A, AAAA, MX, TXT, NS, CNAME, and SOA records. Select only the types you need or query all of them at once.' },
          { title: 'No server-side proxy needed', description: 'Google\'s DoH JSON API includes CORS headers, so the browser can query DNS directly without a backend or proxy. This is the intended use case for DNS-over-HTTPS.' },
          { title: 'TTL and status codes', description: 'Each result shows the DNS response status (NOERROR, NXDOMAIN, etc.) and TTL values for each record, giving you the same information as a dig or nslookup command.' },
        ],
        faqs: [
          { q: 'How does the tool query DNS from the browser?', a: 'It uses Google\'s DNS-over-HTTPS JSON API at dns.google/resolve. This API returns DNS records as JSON with CORS headers, allowing browser JavaScript to make real DNS queries without a server-side proxy.' },
          { q: 'What is the difference between A and AAAA records?', a: 'A records map a domain to an IPv4 address (e.g., 93.184.216.34). AAAA records map to an IPv6 address (e.g., 2606:2800:220:1:248:1893:25c8:1946). Most domains have A records; AAAA is increasingly common.' },
          { q: 'What does NXDOMAIN mean?', a: 'NXDOMAIN (status code 3) means the domain name does not exist in DNS. No records were found because the domain is not registered or has no DNS records configured.' },
          { q: 'What is TTL?', a: 'Time to Live — how many seconds a DNS resolver caches the record before re-querying the authoritative server. A TTL of 3600 means resolvers cache the record for 1 hour. Lower TTL means faster propagation of changes but more DNS traffic.' },
          { q: 'Can I look up subdomains?', a: 'Yes. Enter the full subdomain (e.g., blog.example.com or www.example.com). DNS records exist independently for each subdomain.' },
        ],
      }}
    >
      <DnsLookup />
    </ToolPageTemplate>
  );
}
