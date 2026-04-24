import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Archive,
  FolderOpen,
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  Users,
  FileBarChart,
  Eye,
  ShieldAlert,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore, useUIStore } from '@/store'
import { getNavItems } from '@/config/nav-items'
import { Badge } from '@/components/ui'

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Archive,
  FolderOpen,
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  Users,
  FileBarChart,
  Eye,
  ShieldAlert,
}

export function Sidebar() {
  const location = useLocation()
  const { role, logout } = useAuthStore()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  const navItems = role ? getNavItems(role) : []

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-white border-r border-[hsl(214,32%,91%)]',
          'transition-all duration-300 ease-in-out',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarOpen ? 'w-[240px]' : 'w-[72px]'
        )}
        style={{ paddingTop: '64px' }}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                      'text-sm font-medium',
                      sidebarOpen ? 'justify-start' : 'justify-center',
                      isActive
                        ? role === 'student'
                          ? 'bg-[hsl(238,94%,95%)] text-[hsl(238,74%,59%)]'
                          : role === 'faculty'
                          ? 'bg-[hsl(152,76%,94%)] text-[hsl(158,64%,52%)]'
                          : 'bg-[hsl(0,86%,97%)] text-[hsl(0,72%,51%)]'
                        : 'text-[hsl(220,9%,46%)] hover:bg-[hsl(240,20%,96%)] hover:text-[hsl(222,84%,5%)]'
                    )}
                    onClick={() => {
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false)
                      }
                    }}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    {sidebarOpen && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <Badge
                            variant={
                              role === 'student'
                                ? 'student'
                                : role === 'faculty'
                                ? 'faculty'
                                : 'supervisor'
                            }
                            size="sm"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Sidebar Footer - Logout */}
          <div className="p-4 border-t border-[hsl(214,32%,91%)]">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full',
                'text-sm font-medium text-[hsl(220,9%,46%)]',
                'hover:bg-[hsl(0,86%,97%)] hover:text-[hsl(0,72%,51%)]',
                'transition-all',
                sidebarOpen ? 'justify-start' : 'justify-center'
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>

          {/* Collapse Button (Desktop only) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              'hidden lg:flex items-center justify-center',
              'absolute -right-3 top-24',
              'w-6 h-6 rounded-full bg-white border border-[hsl(214,32%,91%)]',
              'text-[hsl(220,9%,46%)] hover:text-[hsl(238,74%,59%)]',
              'hover:border-[hsl(238,74%,59%)]',
              'transition-all shadow-sm z-50'
            )}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
