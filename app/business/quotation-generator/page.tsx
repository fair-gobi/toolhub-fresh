import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Quotation Generator - Free Business Tool',
  description: 'Free quotation generator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
