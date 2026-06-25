import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Resignation Letter - Free Business Tool',
  description: 'Free resignation letter tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
