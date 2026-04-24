/**
 * Mock Data - Portfolio
 */

export const mockPortfolioData = {
  student: {
    name: 'Alex Johnson',
    rollNumber: 'CS2024001',
    program: 'B.Tech Computer Science',
    batch: '2024-2028',
    email: 'alex.johnson@university.edu',
  },
  summary: {
    totalActivities: 42,
    verifiedItems: 24,
    gpa: 3.85,
    completionRate: 75,
  },
  years: [
    {
      id: 'first-year',
      year: 'First Year',
      academicYear: '2024-2025',
      semesters: [
        {
          id: 'sem1',
          name: 'Semester 1',
          subjects: [
            {
              name: 'Mathematics I',
              code: 'MATH101',
              grade: 'A+',
              credits: 4,
              activities: 8,
            },
            {
              name: 'Programming Fundamentals',
              code: 'CS101',
              grade: 'A',
              credits: 4,
              activities: 12,
            },
            {
              name: 'Physics',
              code: 'PHY101',
              grade: 'A',
              credits: 3,
              activities: 6,
            },
          ],
          achievements: [
            'First place in Coding Competition',
            'Completed Python Certification',
          ],
        },
        {
          id: 'sem2',
          name: 'Semester 2',
          subjects: [
            {
              name: 'Mathematics II',
              code: 'MATH102',
              grade: 'A+',
              credits: 4,
              activities: 9,
            },
            {
              name: 'Data Structures',
              code: 'CS102',
              grade: 'A',
              credits: 4,
              activities: 15,
            },
            {
              name: 'Digital Logic',
              code: 'ECE101',
              grade: 'A-',
              credits: 3,
              activities: 7,
            },
          ],
          achievements: ['Hackathon Winner', 'Research Paper Published'],
        },
      ],
    },
    {
      id: 'second-year',
      year: 'Second Year',
      academicYear: '2025-2026',
      semesters: [
        {
          id: 'sem3',
          name: 'Semester 3',
          subjects: [
            {
              name: 'Database Systems',
              code: 'CS201',
              grade: 'A+',
              credits: 4,
              activities: 10,
            },
            {
              name: 'Computer Networks',
              code: 'CS202',
              grade: 'A',
              credits: 4,
              activities: 8,
            },
            {
              name: 'Operating Systems',
              code: 'CS203',
              grade: 'A',
              credits: 4,
              activities: 11,
            },
          ],
          achievements: ['AWS Certification', 'Internship at Tech Corp'],
        },
        {
          id: 'sem4',
          name: 'Semester 4',
          inProgress: true,
          subjects: [
            {
              name: 'Web Technologies',
              code: 'CS204',
              grade: 'In Progress',
              credits: 4,
              activities: 6,
            },
            {
              name: 'Software Engineering',
              code: 'CS205',
              grade: 'In Progress',
              credits: 4,
              activities: 5,
            },
            {
              name: 'Artificial Intelligence',
              code: 'CS206',
              grade: 'In Progress',
              credits: 4,
              activities: 4,
            },
          ],
          achievements: [],
        },
      ],
    },
    {
      id: 'third-year',
      year: 'Third Year',
      academicYear: '2026-2027',
      semesters: [
        {
          id: 'sem5',
          name: 'Semester 5',
          upcoming: true,
          subjects: [],
          achievements: [],
        },
        {
          id: 'sem6',
          name: 'Semester 6',
          upcoming: true,
          subjects: [],
          achievements: [],
        },
      ],
    },
  ],
}

export const mockPortfolioStats = {
  totalCredits: 68,
  completedCredits: 52,
  gpa: 3.85,
  rank: 5,
  totalStudents: 120,
}
