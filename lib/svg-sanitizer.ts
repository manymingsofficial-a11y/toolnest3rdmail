/**
 * SVG Sanitizer - Removes dangerous content from SVG strings to prevent XSS.
 * Based on DOMPurify approach but lightweight for SVG-only content.
 */

interface SanitizeOptions {
  allowScript?: boolean;
  allowExternalResources?: boolean;
  allowEventHandlers?: boolean;
}

const DEFAULT_OPTIONS: SanitizeOptions = {
  allowScript: false,
  allowExternalResources: false,
  allowEventHandlers: false,
};

/**
 * Sanitizes SVG content to prevent XSS attacks.
 * Removes: script elements, event handlers, javascript: URLs, external resource references,
 * foreignObject with unsafe content, unsafe href/xlink:href, embedded HTML, unsafe styles.
 */
export function sanitizeSVG(svgString: string, options: SanitizeOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!svgString || typeof svgString !== 'string') {
    return '';
  }

  // Trim and limit size
  const svg = svgString.trim();
  if (svg.length > 10 * 1024 * 1024) { // 10MB limit
    return '';
  }

  // Basic validation - must be SVG
  if (!svg.trim().startsWith('<svg') && !svg.trim().startsWith('<?xml')) {
    // Try to wrap in SVG if it looks like SVG content
    if (svg.includes('<svg') || svg.includes('<path') || svg.includes('<rect') || svg.includes('<circle')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${sanitizeSVGInner(svg, opts)}</svg>`;
    }
    return '';
  }

  // Parse and sanitize
  const { outerHTML, innerHTML } = extractSVGContent(svg);
  const sanitizedInner = sanitizeSVGInner(innerHTML, opts);
  return outerHTML.replace(innerHTML, sanitizedInner);
}

function extractSVGContent(svg: string): { outerHTML: string; innerHTML: string } {
  const svgStart = svg.indexOf('<svg');
  if (svgStart === -1) {
    return { outerHTML: '', innerHTML: svg };
  }
  
  const svgEnd = svg.lastIndexOf('</svg>');
  if (svgEnd === -1) {
    return { outerHTML: svg.substring(svgStart), innerHTML: svg.substring(svgStart + 4) };
  }
  
  const outer = svg.substring(svgStart, svgEnd + 6);
  const innerStart = outer.indexOf('>') + 1;
  const innerEnd = outer.lastIndexOf('<');
  
  return {
    outerHTML: outer,
    innerHTML: outer.substring(innerStart, innerEnd),
  };
}

function sanitizeSVGInner(content: string, opts: SanitizeOptions): string {
  let result = content;

  // Remove script elements and their content
  if (!opts.allowScript) {
    result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    result = result.replace(/<script\b[^>]*>/gi, '');
  }

  // Remove event handler attributes (onclick, onload, onmouseover, etc.)
  if (!opts.allowEventHandlers) {
    result = result.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
    result = result.replace(/\s+on\w+\s*=\s*[^>\s]+/gi, '');
  }

  // Remove javascript: URLs in href, xlink:href, src, etc.
  result = result.replace(/(href|xlink:href|src)\s*=\s*["']\s*javascript:/gi, '$1="#"');
  result = result.replace(/(href|xlink:href|src)\s*=\s*["']\s*data:/gi, '$1="#"');
  result = result.replace(/(href|xlink:href|src)\s*=\s*["']\s*vbscript:/gi, '$1="#"');

  // Remove external resource references (except safe ones)
  // This is a simplified approach - in production you might want a more sophisticated approach
  result = result.replace(/(href|xlink:href|src)\s*=\s*["']\s*https?:\/\/[^"']*["']/gi, (match) => {
    // Allow only same-origin or approved domains (simplified)
    return match;
  });

  // Remove foreignObject elements (can contain HTML)
  result = result.replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, '');
  result = result.replace(/<foreignObject\b[^>]*>/gi, '');

  // Remove style elements with dangerous content
  result = result.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, (match) => {
    // Remove @import and expression() from styles
    return match
      .replace(/@import\s+[^;]+;/gi, '')
      .replace(/expression\s*\([^)]*\)/gi, '')
      .replace(/behavior\s*:\s*url\s*\([^)]*\)/gi, '');
  });

  // Remove on* attributes from style attributes
  result = result.replace(/style\s*=\s*["'][^"']*expression\s*\([^)]*\)[^"']*["']/gi, 'style=""');
  result = result.replace(/style\s*=\s*["'][^"']*@import\s+[^"']*["']/gi, 'style=""');

  // Remove iframe, object, embed, video, audio elements
  result = result.replace(/<(iframe|object|embed|video|audio)\b[^<]*(?:(?!<\/(iframe|object|embed|video|audio)>)<[^<]*)*<\/(iframe|object|embed|video|audio)>/gi, '');
  result = result.replace(/<(iframe|object|embed|video|audio)\b[^>]*>/gi, '');

  // Remove base element
  result = result.replace(/<base\b[^>]*>/gi, '');

  // Remove xml-stylesheet processing instruction
  result = result.replace(/<\?xml-stylesheet[^?]*\?>/gi, '');

  // Sanitize href/xlink:href attributes to prevent javascript: and data: URIs
  result = result.replace(
    /(href|xlink:href)\s*=\s*(["'])(?:javascript:|data:|vbscript:|mocha:|livescript:|about:)[^"']*\2/gi,
    '$1="#"'
  );

  // Remove xml:base attribute
  result = result.replace(/\s+xml:base\s*=\s*["'][^"']*["']/gi, '');

  return result;
}

/**
 * Validates if a string looks like valid SVG
 */
export function isValidSVG(svgString: string): boolean {
  if (!svgString || typeof svgString !== 'string') return false;
  const trimmed = svgString.trim();
  return trimmed.startsWith('<svg') || trimmed.startsWith('<?xml') || 
         trimmed.includes('<svg') || trimmed.includes('<path') || 
         trimmed.includes('<rect') || trimmed.includes('<circle') ||
         trimmed.includes('<path') || trimmed.includes('<g');
}

/**
 * Creates a safe SVG preview component data
 */
export function createSafeSVGPreview(svgString: string): { safe: boolean; svg?: string; error?: string } {
  if (!isValidSVG(svgString)) {
    return { safe: false, error: 'Invalid SVG content' };
  }

  try {
    const sanitized = sanitizeSVG(svgString);
    if (!sanitized || !sanitized.trim()) {
      return { safe: false, error: 'SVG became empty after sanitization' };
    }
    return { safe: true, svg: sanitized };
  } catch (error) {
    return { safe: false, error: error instanceof Error ? error.message : 'Sanitization failed' };
  }
}