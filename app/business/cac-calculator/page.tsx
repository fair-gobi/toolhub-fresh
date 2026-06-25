import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Cac Calculator - Free Business Tool',
  description: 'Free cac calculator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
