import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Invoice Generator - Free Business Tool',
  description: 'Free invoice generator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
