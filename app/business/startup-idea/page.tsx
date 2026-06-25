import type { Metadata } from 'next'
import StartupIdea from './StartupIdea'

export const metadata: Metadata = {
  title: 'Startup Idea Generator - Free AI Business Ideas 2025',
  description: 'Generate unique startup ideas by industry. Free AI-powered business idea generator for entrepreneurs.',
}

export default function Page() {
  return <StartupIdea />
}
