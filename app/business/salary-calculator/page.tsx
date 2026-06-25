import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Salary Calculator - Free Business Tool',
  description: 'Free salary calculator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
