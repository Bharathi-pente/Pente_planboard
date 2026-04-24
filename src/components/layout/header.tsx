import * as React from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore, useUIStore } from '@/store'
import { Avatar, Badge } from '@/components/ui'
import { RoleSwitcher } from '@/components/shared'

export function Header() {
  const { user, role } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showNotifications, setShowNotifications] = React.useState(false)

  const notificationCount = 3

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[hsl(214,32%,91%)]"
      style={{ height: '64px' }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-[hsl(240,20%,97%)] rounded-xl transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-[hsl(220,9%,46%)]" />
            ) : (
              <Menu className="w-5 h-5 text-[hsl(220,9%,46%)]" />
            )}
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transition-transform duration-200 group-hover:scale-105"
              style={{
                background:
                  role === 'student'
                    ? 'linear-gradient(135deg, hsl(238, 74%, 59%), hsl(271, 81%, 56%))'
                    : role === 'faculty'
                    ? 'linear-gradient(135deg, hsl(158, 64%, 52%), hsl(173, 58%, 39%))'
                    : 'linear-gradient(135deg, hsl(0, 72%, 51%), hsl(330, 81%, 60%))',
              }}
            >
              P
            </div>
            <span className="hidden sm:block font-bold text-xl text-[hsl(222,84%,5%)] tracking-tight">
              PlanBoard
            </span>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,9%,46%)]" />
            <input
              type="text"
              placeholder="Search activities, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full h-10 pl-10 pr-4 rounded-xl border border-[hsl(214,32%,91%)]',
                'bg-[hsl(240,20%,98%)] text-sm text-[hsl(222,84%,5%)]',
                'placeholder:text-[hsl(220,9%,46%)]',
                'focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent focus:bg-white',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center gap-2">
          {/* Role Switcher (Development Only) */}
          <RoleSwitcher />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 hover:bg-[hsl(240,20%,97%)] rounded-xl transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[hsl(220,9%,46%)]" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(0,72%,51%)] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[hsl(214,32%,91%)] shadow-lg z-50 animate-fadeIn">
                  <div className="p-4 border-b border-[hsl(214,32%,91%)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[hsl(222,84%,5%)]">
                        Notifications
                      </h3>
                      {notificationCount > 0 && (
                        <Badge variant="default" size="sm">
                          {notificationCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="p-4 hover:bg-[hsl(240,20%,96%)] cursor-pointer transition-colors">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-[hsl(238,74%,59%)] mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                            New submission graded
                          </p>
                          <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                            Your Data Structures assignment has been graded
                          </p>
                          <p className="text-xs text-[hsl(220,9%,66%)] mt-1">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-[hsl(240,20%,96%)] cursor-pointer transition-colors">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-[hsl(158,64%,52%)] mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                            Certificate verified
                          </p>
                          <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                            AWS Cloud Practitioner certificate approved
                          </p>
                          <p className="text-xs text-[hsl(220,9%,66%)] mt-1">
                            5 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-[hsl(240,20%,96%)] cursor-pointer transition-colors">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-[hsl(38,92%,50%)] mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                            Deadline reminder
                          </p>
                          <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                            Database project due in 3 days
                          </p>
                          <p className="text-xs text-[hsl(220,9%,66%)] mt-1">
                            1 day ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-[hsl(214,32%,91%)]">
                    <button className="w-full text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-[hsl(214,32%,91%)]">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[hsl(222,84%,5%)]">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                {role === 'student'
                  ? 'Student'
                  : role === 'faculty'
                  ? 'Faculty'
                  : 'Supervisor'}
              </p>
            </div>
            <Avatar
              role={role || 'student'}
              fallback={user?.name?.charAt(0) || 'U'}
              size="md"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
