import type { Metadata } from 'next'
import BrandName from './BrandName'

export const metadata: Metadata = {
  title: 'Brand Name Generator - Unique Brandable Names',
  description: 'Generate short, brandable names like Google, Spotify. Free brand name maker.',
}

export default function Page() {
  return <BrandName />
}
