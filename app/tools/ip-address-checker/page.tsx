import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { IpChecker } from '@/components/web/ip-checker';

export const metadata = buildToolMetadata(
  'ip-address-checker',
  'IP Address Checker',
  'Check your network information, browser details, and local IP address.'
);

const relatedSlugs = ['browser-information', 'dns-lookup', 'ssl-checker'];

export default function IpAddressCheckerPage() {
  return (
    <ToolPageTemplate
      slug="ip-address-checker"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The IP Address Checker displays browser-accessible network and device information including connection status, local IP (via WebRTC), user agent, CPU cores, timezone, screen details, and network connection quality metrics. Public IP addresses cannot be retrieved by browser JavaScript without a server-side API.`,
        howTo: [
          'Click the Check Network Info button to gather your browser and network details.',
          'Review the displayed information in the results table — each field shows whether the data is available in your browser.',
          'Use Copy JSON to copy all values for support tickets or documentation, or Download to save as a JSON file.',
        ],
        benefits: [
          { title: 'Comprehensive network info', description: 'See connection status, effective connection type, downlink speed, round-trip time, CPU cores, timezone, screen dimensions, and local IP in one place.' },
          { title: 'Useful for support tickets', description: 'Copy the full network profile to give support teams the browser and environment details they need to troubleshoot issues.' },
          { title: 'Local IP via WebRTC', description: 'The tool attempts to detect your local or private IP address using WebRTC ICE candidates when the browser allows it. Some browsers block this for privacy.' },
          { title: 'No server calls', description: 'All information is read from browser APIs locally. No data is sent to any server. Public IP is noted as unavailable rather than faked.' },
        ],
        faqs: [
          { q: 'Can the tool show my public IP address?', a: 'No. Browser JavaScript cannot access your public IP without a server-side API call. The tool honestly reports this as unavailable. It shows your local/private IP via WebRTC when the browser permits it.' },
          { q: 'What is the local IP shown via WebRTC?', a: 'WebRTC ICE candidate enumeration can reveal your local or private IP address (e.g., 192.168.x.x). This is not your public internet IP. Some browsers block this feature for privacy reasons — the tool gracefully reports it as unavailable in that case.' },
          { q: 'What is navigator.connection data?', a: 'The Network Information API (navigator.connection) provides effective connection type (4g, 3g, etc.), estimated downlink speed, and round-trip time. Not all browsers support this API — unavailable fields are clearly labeled.' },
          { q: 'Is my information sent to a server?', a: 'No. All data is read locally from browser APIs. No network requests are made except the WebRTC STUN query used for local IP detection, which goes to a public STUN server but does not transmit your data.' },
          { q: 'Why does the tool say some fields are not available?', a: 'Different browsers expose different APIs. For example, the Network Information API is available in Chrome but not Firefox or Safari. The tool checks each API and clearly labels unavailable fields rather than showing incorrect data.' },
        ],
      }}
    >
      <IpChecker />
    </ToolPageTemplate>
  );
}
