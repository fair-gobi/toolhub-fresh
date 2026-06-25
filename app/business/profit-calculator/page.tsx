import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Profit Calculator - Free Business Tool',
  description: 'Free profit calculator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
