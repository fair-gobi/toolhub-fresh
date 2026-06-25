import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Usp Generator - Free Business Tool',
  description: 'Free usp generator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
