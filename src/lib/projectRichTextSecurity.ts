/**
 * URL guards for TipTap-rendered project content.
 * Stored JSON comes from admins but should still be bounded (account compromise / DB edits).
 */

const UNICODE_WS = /[\u0000-\u0020\uFEFF]/g;

const BLOCK_SCHEME = /^\s*(javascript|vbscript|file|data|blob):/i;

/** Same-document links only — no javascript: payloads in the fragment. */
const FRAGMENT_LINK = /^#[-a-z0-9_:.?/=&%+~@!$'()*+,;]*$/i;

function stripControlChars(s: string): string {
  return s.replace(/\u0000/g, '');
}

/**
 * Allowed: http(s), mailto, tel, in-page fragments, same-site path URLs (not protocol-relative).
 */
export function isSafeRichTextLinkHref(href: string | null | undefined): boolean {
  if (href == null || typeof href !== 'string') return false;
  const raw = stripControlChars(href);
  const h = raw.trim().replace(UNICODE_WS, '');
  if (!h) return false;
  if (BLOCK_SCHEME.test(h)) return false;
  if (FRAGMENT_LINK.test(h)) return true;
  if (h.startsWith('/') && !h.startsWith('//')) return true;
  try {
    const url = h.startsWith('//') ? new URL(`https:${h}`) : new URL(h);
    const proto = url.protocol.replace(/:$/, '').toLowerCase();
    return proto === 'http' || proto === 'https' || proto === 'mailto' || proto === 'tel';
  } catch {
    return false;
  }
}

/**
 * Images: only http(s) or same-origin path (no protocol-relative, no data/blob).
 */
export function isSafeRichTextImageSrc(src: string | null | undefined): boolean {
  if (src == null || typeof src !== 'string') return false;
  const raw = stripControlChars(src);
  const s = raw.trim().replace(UNICODE_WS, '');
  if (!s) return false;
  if (BLOCK_SCHEME.test(s)) return false;
  if (s.startsWith('//')) return false;
  if (s.startsWith('/') && !s.startsWith('//')) return true;
  try {
    const url = new URL(s);
    const proto = url.protocol.replace(/:$/, '').toLowerCase();
    return proto === 'http' || proto === 'https';
  } catch {
    return false;
  }
}
