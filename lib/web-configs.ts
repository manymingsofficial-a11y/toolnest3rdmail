import type { WebToolConfig } from '@/components/web/web-tool';

export const webToolConfigs: Record<string, WebToolConfig> = {
  'browser-information': { slug: 'browser-information', label: 'Browser Information', description: 'Show browser info', showUrlInput: false, showBrowserInfo: true, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Get Info' },
  'user-agent-parser': { slug: 'user-agent-parser', label: 'User Agent Parser', description: 'Parse user agent', showUrlInput: false, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Parse' },
  'ip-address-checker': { slug: 'ip-address-checker', label: 'IP Address Checker', description: 'Check IP', showUrlInput: false, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Check IP' },
  'http-header-viewer': { slug: 'http-header-viewer', label: 'HTTP Header Viewer', description: 'View headers', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'View Headers' },
  'cookie-viewer': { slug: 'cookie-viewer', label: 'Cookie Viewer', description: 'View cookies', showUrlInput: false, showBrowserInfo: false, showCookieViewer: true, showManifestGenerator: false, showQrLabel: false, actionLabel: 'View Cookies' },
  'dns-lookup': { slug: 'dns-lookup', label: 'DNS Lookup', description: 'Lookup DNS', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Lookup' },
  'ssl-checker': { slug: 'ssl-checker', label: 'SSL Checker', description: 'Check SSL', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Check SSL' },
  'website-screenshot': { slug: 'website-screenshot', label: 'Website Screenshot', description: 'Screenshot', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Capture' },
  'open-graph-preview': { slug: 'open-graph-preview', label: 'Open Graph Preview', description: 'Preview OG', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Preview' },
  'url-preview': { slug: 'url-preview', label: 'URL Preview', description: 'Preview URL', showUrlInput: true, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: false, actionLabel: 'Preview' },
  'qr-label-generator': { slug: 'qr-label-generator', label: 'QR Label Generator', description: 'Generate QR labels', showUrlInput: false, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: false, showQrLabel: true, actionLabel: 'Generate' },
  'website-manifest-generator': { slug: 'website-manifest-generator', label: 'Website Manifest Generator', description: 'Generate manifest', showUrlInput: false, showBrowserInfo: false, showCookieViewer: false, showManifestGenerator: true, showQrLabel: false, actionLabel: 'Generate' },
};
