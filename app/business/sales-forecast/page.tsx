import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Sales Forecast - Free Business Tool',
  description: 'Free sales forecast tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
