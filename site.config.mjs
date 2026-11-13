// Public site URL, used for canonical URLs, Open Graph, sitemap and robots.txt.
// [CONFIRM: domain] — ".invalid" is a reserved TLD (RFC 2606), so this placeholder can never resolve.
export const SITE_URL = 'https://confirm-domain.invalid';

export const isPlaceholderSite = SITE_URL.endsWith('.invalid');
