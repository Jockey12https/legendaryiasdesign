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
    sitemap: 'https://www.legendaryiasmentor.com/sitemap.xml',
    host: 'https://www.legendaryiasmentor.com',
  }
}
