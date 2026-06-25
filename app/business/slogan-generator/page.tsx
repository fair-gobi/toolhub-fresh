import type { Metadata } from 'next'
import ToolComponent from './ToolComponent'

export const metadata: Metadata = {
  title: 'Slogan Generator - Free Business Tool',
  description: 'Free slogan generator tool for startups and businesses.',
}

export default function Page() {
  return <ToolComponent />
}
