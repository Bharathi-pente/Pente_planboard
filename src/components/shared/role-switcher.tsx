import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, GraduationCap, UserCog, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store'
import { mockUsers, mockAuthToken } from '@/data'
import type { Role } from '@/types'
import { cn } from '@/lib/utils'

const roleConfig = {
  student: {
    label: 'Student View',
    icon: GraduationCap,
    color: 'hsl(238, 74%, 59%)',
    route: '/student/dashboard',
  },
  faculty: {
    label: 'Faculty View',
    icon: Users,
    color: 'hsl(158, 64%, 52%)',
    route: '/faculty/dashboard',
  },
  supervisor: {
    label: 'Supervisor View',
    icon: UserCog,
    color: 'hsl(0, 72%, 51%)',
    route: '/supervisor/dashboard',
  },
}

export function RoleSwitcher() {
  const { role, login } = useAuthStore()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)

  const currentRole = roleConfig[role || 'student']
  const CurrentIcon = currentRole.icon

  const handleRoleChange = (newRole: Role) => {
    const userData = mockUsers[newRole]
    login(userData as any, mockAuthToken)
    setIsOpen(false)
    navigate(roleConfig[newRole].route)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'border border-[hsl(214,32%,91%)] bg-white',
          'hover:bg-[hsl(240,20%,96%)] transition-colors'
        )}
      >
        <CurrentIcon
          className="w-4 h-4"
          style={{ color: currentRole.color }}
        />
        <span className="hidden md:block text-sm font-medium text-[hsl(222,84%,5%)]">
          {currentRole.label}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-[hsl(220,9%,46%)] transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[hsl(214,32%,91%)] shadow-lg z-50 overflow-hidden animate-fadeIn">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-[hsl(220,9%,46%)] uppercase">
                Switch Role
              </div>
              {Object.entries(roleConfig).map(([roleKey, config]) => {
                const Icon = config.icon
                const isActive = role === roleKey

                return (
                  <button
                    key={roleKey}
                    onClick={() => handleRoleChange(roleKey as Role)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                      isActive
                        ? 'bg-[hsl(240,20%,96%)] text-[hsl(222,84%,5%)]'
                        : 'text-[hsl(220,9%,46%)] hover:bg-[hsl(240,20%,96%)] hover:text-[hsl(222,84%,5%)]'
                    )}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: isActive ? config.color : 'currentColor' }}
                    />
                    <span className="text-sm">{config.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="px-3 py-2 border-t border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
              <p className="text-xs text-[hsl(220,9%,46%)]">
                For development testing only
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
