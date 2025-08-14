import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/dashboard/',
        '/api/',
        '/_next/',
        '/private/',
        '/test-',
        '/admin-debug/',
        '/test-auth/',
        '/test-firebase/',
        '/test-forms/',
        '/test-payment/',
      ],
    },
    sitemap: 'https://legendaryiasmentor.com/sitemap.xml',
    host: 'https://legendaryiasmentor.com',
  }
}
