import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { useAuthStore } from './store'
import { mockUsers, mockAuthToken } from './data'
import AppRouter from './routes/app-router'

function App() {
  const { isAuthenticated, login } = useAuthStore()

  // Auto-login for development/testing
  useEffect(() => {
    if (!isAuthenticated) {
      // Auto-login as faculty for testing faculty views
      // Change to mockUsers.student or mockUsers.supervisor to test other roles
      login(mockUsers.faculty as any, mockAuthToken)
    }
  }, [isAuthenticated, login])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
