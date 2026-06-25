import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Brand Name - Free Business Tool',
  description: 'Free brand name tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
