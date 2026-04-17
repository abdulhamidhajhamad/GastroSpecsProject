'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import PortalSidebar from '@/components/portal/PortalSidebar'

type PortalShellProps = {
  children: ReactNode
}

export default function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname()

  if (pathname === '/portal/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-white">
      <PortalSidebar />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  )
}
