import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.comonholding.com'
const SITE_NAME = "COM'ON Holding"
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * Composant SEO — à placer en tête de chaque page.
 *
 * Props :
 *  - title       : string  — titre de la page (sans suffixe)
 *  - description : string  — meta description (~155 car.)
 *  - slug        : string  — chemin URL ex: "/assurances" (défaut: "")
 *  - image       : string? — URL absolue de l'image Open Graph
 *  - type        : string? — "website" (défaut) | "article"
 *  - jsonLd      : object? — données JSON-LD supplémentaires
 */
export default function SEO({
  title,
  description,
  slug = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  favicon = null,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = `${SITE_URL}${slug}`

  /* ── Données structurées Organization (toujours présentes) ── */
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/comon-holding.png`,
    description: "Groupe ivoirien plurisectoriel regroupant des entités spécialisées dans l'assurance, l'agro-industrie, le BTP, la santé, les médias et les services.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marcory Zone 4C, Rue Marconi',
      postOfficeBoxNumber: '26 BP 1455 Abidjan 26',
      addressLocality: 'Abidjan',
      addressCountry: 'CI',
    },
    telephone: '+22527213986 54',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+22527213986 54',
      email: 'contact@comon-holding.ci',
      contactType: 'customer service',
      availableLanguage: 'French',
    },
    sameAs: [],
    ...(jsonLd || {}),
  }

  return (
    <Helmet>
      {/* ── Titre & meta de base ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Favicon dynamique par page ── */}
      {favicon
        ? <link rel="icon" type="image/png" href={favicon} />
        : <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      }

      {/* ── Langue ── */}
      <html lang="fr" />

      {/* ── Open Graph (Facebook, LinkedIn, WhatsApp…) ── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="fr_CI" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── Indexation ── */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />

      {/* ── Géolocalisation ── */}
      <meta name="geo.region"   content="CI" />
      <meta name="geo.placename" content="Abidjan, Côte d'Ivoire" />
      <meta name="geo.position" content="5.3599517;-4.0082563" />
      <meta name="ICBM"         content="5.3599517, -4.0082563" />

      {/* ── Données structurées JSON-LD ── */}
      <script type="application/ld+json">
        {JSON.stringify(orgJsonLd)}
      </script>
    </Helmet>
  )
}
