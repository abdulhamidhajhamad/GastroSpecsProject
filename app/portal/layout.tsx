import type { Metadata } from 'next'
import PortalSidebar from '@/components/portal/PortalSidebar'

export const metadata: Metadata = {
  title: 'GastroSpecs Staff Portal',
  description: 'Internal operations portal — GastroSpecs Engineering Group',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
