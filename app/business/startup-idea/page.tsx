import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Startup Idea - Free Business Tool',
  description: 'Free startup idea tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
