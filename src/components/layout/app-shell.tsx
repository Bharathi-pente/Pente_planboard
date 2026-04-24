import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store'
import { Header } from './header'
import { Sidebar } from './sidebar'

export function AppShell() {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-[hsl(240,20%,98%)]">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          'pt-[64px]', // Header height
          sidebarOpen ? 'lg:pl-[240px]' : 'lg:pl-[72px]'
        )}
      >
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
