import type { Metadata } from 'next'
import SloganGenerator from './SloganGenerator'

export const metadata: Metadata = {
  title: 'Slogan Generator - Free Tagline Maker for Business',
  description: 'Generate catchy slogans and taglines for your brand. Free slogan maker with 100+ templates.',
}

export default function Page() {
  return <SloganGenerator />
}
