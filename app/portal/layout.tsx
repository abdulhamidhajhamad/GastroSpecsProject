import type { Metadata } from 'next'
import PortalShell from '@/components/portal/PortalShell'

export const metadata: Metadata = {
  title: 'GastroSpecs Staff Portal',
  description: 'Internal operations portal — GastroSpecs Engineering Group',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>
}
