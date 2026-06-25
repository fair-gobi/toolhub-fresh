import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Lead Value - Free Business Tool',
  description: 'Free lead value tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
