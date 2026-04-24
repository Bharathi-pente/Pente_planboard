import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { AppShell } from '@/components/layout'
import ComponentShowcase from '@/pages/component-showcase'
import { StudentDashboard } from '@/features/student/dashboard'
import { Planboard } from '@/features/student/planboard'
import { ActivitiesPage } from '@/features/student/activities'
import { DigitalLocker } from '@/features/student/locker'
import { Portfolio } from '@/features/student/portfolio'
import { FacultyDashboard } from '@/features/faculty/dashboard'
import { CurriculumManager } from '@/features/faculty/curriculum'
import { SubmissionsReview } from '@/features/faculty/submissions'
import { EvidenceValidation } from '@/features/faculty/evidence'
import { ClassesOverview } from '@/features/faculty/classes'
import { SupervisorDashboard } from '@/features/supervisor/dashboard'
import { PortfolioReview } from '@/features/supervisor/portfolio'
import { Monitoring } from '@/features/supervisor/monitoring'
import { Escalations } from '@/features/supervisor/escalations'
import { Reports } from '@/features/supervisor/reports'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    // For now, auto-login as student for testing
    // Later this will redirect to /login
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppRouter() {
  const { role } = useAuthStore()
  
  // Determine default route based on role
  const defaultRoute = role === 'faculty' 
    ? '/faculty/dashboard' 
    : role === 'supervisor'
    ? '/supervisor/dashboard'
    : '/student/dashboard'

  return (
    <Routes>
      {/* Component Showcase (development) */}
      <Route path="/showcase" element={<ComponentShowcase />} />

      {/* Protected App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/planboard" element={<Planboard />} />
        <Route path="/student/activities" element={<ActivitiesPage />} />
        <Route path="/student/locker" element={<DigitalLocker />} />
        <Route path="/student/portfolio" element={<Portfolio />} />

        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/curriculum" element={<CurriculumManager />} />
        <Route path="/faculty/submissions" element={<SubmissionsReview />} />
        <Route path="/faculty/evidence" element={<EvidenceValidation />} />
        <Route path="/faculty/classes" element={<ClassesOverview />} />
        <Route path="/faculty/grading" element={<StudentDashboard />} />

        {/* Supervisor Routes */}
        <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
        <Route path="/supervisor/portfolio" element={<PortfolioReview />} />
        <Route path="/supervisor/monitoring" element={<Monitoring />} />
        <Route path="/supervisor/escalations" element={<Escalations />} />
        <Route path="/supervisor/reports" element={<Reports />} />
      </Route>

      {/* Login Route (placeholder) */}
      <Route
        path="/login"
        element={
          <div className="min-h-screen flex items-center justify-center bg-[hsl(240,20%,98%)]">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">PlanBoard</h1>
              <p className="text-[hsl(220,9%,46%)] mb-6">Login page coming soon</p>
              <p className="text-sm text-[hsl(220,9%,46%)]">
                For testing: Auto-login will be enabled
              </p>
            </div>
          </div>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
