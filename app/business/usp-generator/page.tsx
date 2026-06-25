import type { Metadata } from 'next'
import UspGenerator from './UspGenerator'

export const metadata: Metadata = {
  title: 'USP Generator - Create Unique Selling Propositions',
  description: 'Generate powerful USP statements for your business in seconds.',
}

export default function Page() {
  return <UspGenerator />
}