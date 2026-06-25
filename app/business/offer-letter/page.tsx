import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Offer Letter - Free Business Tool',
  description: 'Free offer letter tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
