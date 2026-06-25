import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Pricing Calculator - Free Business Tool',
  description: 'Free pricing calculator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
