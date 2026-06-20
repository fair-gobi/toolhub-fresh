import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://toolhub-fresh.vercel.app'
  const routes = ['', 'about','contact','privacy','ai-tools','image-tools','pdf-tools','dev-tools','text-tools','business-tools','utility-tools','finance-tools','bg-remover','image-upscaler','photo-restorer','image-compressor','image-resizer','image-to-pdf','jpg-to-png','png-to-jpg','webp-converter','pdf-merger','pdf-to-word','pdf-split','pdf-extract','pdf-password','pdf-meta','pdf-compress','qr-generator','payment-qr','yt-thumbnail','yt-title','yt-description','prompt-generator','prompts','blog-outline','hashtag-generator','caption-generator','hook-generator','tts','json-formatter','json-validator','base64-encoder','base64-decoder','uuid-generator','jwt-decoder','regex-tester','password-generator','sql-formatter','xml-formatter','html-formatter','css-minifier','js-minifier','hash-generator','lorem-ipsum','nepali-date','gpa-calculator','routine-maker','notes-converter','pan-checker','esewa-parser','invoice-generator']
  return routes.map(r => ({ url: r ? base + '/' + r : base, lastModified: new Date(), changeFrequency: 'weekly', priority: r === '' ? 1 : 0.8 }))
}
