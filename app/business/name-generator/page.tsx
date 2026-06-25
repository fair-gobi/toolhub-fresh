import type { Metadata } from 'next'
import NameGenerator from './NameGenerator'

export const metadata: Metadata = {
  title: 'Business Name Generator - Free AI Startup Name Ideas 2025',
  description: 'Generate 100+ catchy business names instantly. Free startup name generator.',
}

export default function Page() {
  return <NameGenerator />
}