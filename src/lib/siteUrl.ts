/**
 * Absolute site origin for Open Graph and other URL-based metadata.
 * WhatsApp and similar scrapers require fully qualified https:// image URLs.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) {
    return new URL(explicit);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}
