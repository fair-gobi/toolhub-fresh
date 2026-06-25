import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Name Generator - Free Business Tool',
  description: 'Free name generator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
