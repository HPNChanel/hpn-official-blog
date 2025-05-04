import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Enhanced SEO component with support for Vietnamese content
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonical - Canonical URL (optional)
 * @param {boolean} props.hasVietnamese - Whether page contains Vietnamese content
 * @param {string} props.ogImage - Open Graph image URL (optional)
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {Object} props.structuredData - Structured data for the page (optional)
 * @param {string} props.altLangUrl - Alternative language URL for hreflang (optional)
 * @param {string[]} props.keywords - Keywords for meta tags (optional)
 */
const SEO = ({
  title,
  description,
  canonical,
  hasVietnamese = false,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  structuredData,
  altLangUrl,
  keywords = [],
}) => {
  const router = useRouter();
  const site = {
    name: 'HPN Blog',
    url: 'https://hpn-blog.vercel.app',
  };

  // Generate full URL for canonical and OG tags
  const pageUrl = canonical || `${site.url}${router.asPath}`;
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${site.url}${ogImage}`;
  
  return (
    <Head>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Language tags */}
      {hasVietnamese && <meta httpEquiv="Content-Language" content="vi" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Alternative language URLs */}
      {altLangUrl && (
        <>
          <link rel="alternate" href={pageUrl} hrefLang={hasVietnamese ? 'vi' : 'en'} />
          <link rel="alternate" href={altLangUrl} hrefLang={hasVietnamese ? 'en' : 'vi'} />
          <link rel="alternate" href={pageUrl} hrefLang="x-default" />
        </>
      )}
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {hasVietnamese && <meta property="og:locale" content="vi_VN" />}
      
      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />
      
      {/* Structured data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
