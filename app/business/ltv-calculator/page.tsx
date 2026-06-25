import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Ltv Calculator - Free Business Tool',
  description: 'Free ltv calculator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
