import type { Metadata } from 'next'
import BusinessPlanGenerator from './BusinessPlanGenerator'

export const metadata: Metadata = {
  title: 'Business Plan Generator - AI Business Plans',
  description: 'Generate a complete 1-page business plan instantly.',
}

export default function Page() {
  return <BusinessPlanGenerator />
}
