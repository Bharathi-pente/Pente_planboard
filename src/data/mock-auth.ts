/**
 * Mock Data - Authentication & User
 */

export const mockUsers = {
  student: {
    id: 'STU001',
    role: 'student',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    rollNumber: 'CS2024001',
    program: 'B.Tech Computer Science',
    batch: '2024-2028',
    year: 2,
    semester: 4,
    avatar: null,
  },
  faculty: {
    id: 'FAC001',
    role: 'faculty',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@university.edu',
    employeeId: 'FAC2020015',
    department: 'Computer Science',
    designation: 'Associate Professor',
    subjects: ['Machine Learning', 'Data Science', 'AI'],
    avatar: null,
  },
  supervisor: {
    id: 'SUP001',
    role: 'supervisor',
    name: 'Prof. Robert Anderson',
    email: 'robert.anderson@university.edu',
    employeeId: 'SUP2015001',
    designation: 'Head of Department',
    department: 'Computer Science',
    avatar: null,
  },
}

export const mockAuthToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTVFUwMDEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTY0NjA0MDAwMH0.example'

export const mockLoginResponse = (role: 'student' | 'faculty' | 'supervisor') => ({
  success: true,
  token: mockAuthToken,
  user: mockUsers[role],
})
