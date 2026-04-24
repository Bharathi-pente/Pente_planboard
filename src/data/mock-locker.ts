/**
 * Mock Data - Digital Locker
 */

export const mockLockerStats = {
  verified: 24,
  pending: 8,
  total: 32,
  progressPercentage: 75,
}

export const mockLockerItems = [
  {
    id: 1,
    name: 'Hackathon Winner 2026',
    type: 'Certificate',
    category: 'Extra Curricular',
    verifiedDate: '2026-03-20',
    status: 'verified',
    issuer: 'National Tech Symposium',
  },
  {
    id: 2,
    name: 'E-Commerce Project',
    type: 'Project',
    category: 'Web Technologies',
    verifiedDate: '2026-03-28',
    status: 'verified',
    grade: 'A+',
  },
  {
    id: 3,
    name: 'Internship Certificate',
    type: 'Certificate',
    category: 'Professional',
    verifiedDate: '2026-02-15',
    status: 'verified',
    issuer: 'Tech Solutions Inc.',
  },
  {
    id: 4,
    name: 'Data Structures Test',
    type: 'Test',
    category: 'Computer Science',
    verifiedDate: '2026-04-10',
    status: 'verified',
    grade: 'A',
  },
  {
    id: 5,
    name: 'AWS Cloud Practitioner',
    type: 'Certificate',
    category: 'Certification',
    verifiedDate: '2026-01-25',
    status: 'verified',
    issuer: 'Amazon Web Services',
  },
  {
    id: 6,
    name: 'Web Development Project',
    type: 'Project',
    category: 'Web Technologies',
    verifiedDate: '2026-04-05',
    status: 'verified',
    grade: 'A+',
  },
  {
    id: 7,
    name: 'State Coding Competition',
    type: 'Certificate',
    category: 'Extra Curricular',
    verifiedDate: '2026-01-15',
    status: 'verified',
    issuer: 'State Tech Board',
  },
  {
    id: 8,
    name: 'AI Chatbot System',
    type: 'Project',
    category: 'Artificial Intelligence',
    verifiedDate: '2026-04-12',
    status: 'verified',
    grade: 'A',
  },
]

export const mockLockerItemDetails = {
  'Hackathon Winner 2026': {
    name: 'Hackathon Winner 2026',
    type: 'Certificate',
    category: 'Extra Curricular',
    description:
      'First place winner in National Tech Symposium Hackathon 2026. Built an innovative healthcare monitoring solution.',
    verifiedDate: '2026-03-20T10:00:00',
    issuedDate: '2026-03-15',
    issuer: 'National Tech Symposium',
    status: 'verified',
    verifiedBy: 'Dr. Sarah Mitchell',
    files: [
      {
        name: 'Hackathon_Certificate.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
      },
      {
        name: 'Project_Presentation.pptx',
        size: '3.5 MB',
        type: 'application/vnd.ms-powerpoint',
      },
    ],
    metadata: {
      event: 'National Tech Symposium 2026',
      position: '1st Place',
      teamSize: 4,
      prize: '$5,000',
    },
  },
  'E-Commerce Project': {
    name: 'E-Commerce Project',
    type: 'Project',
    category: 'Web Technologies',
    description:
      'Full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    verifiedDate: '2026-03-28T15:30:00',
    submittedDate: '2026-03-25',
    status: 'verified',
    grade: 'A+',
    verifiedBy: 'Prof. David Lee',
    faculty: 'Prof. David Lee',
    files: [
      {
        name: 'Ecommerce_Documentation.pdf',
        size: '2.8 MB',
        type: 'application/pdf',
      },
      {
        name: 'Source_Code.zip',
        size: '15.4 MB',
        type: 'application/zip',
      },
    ],
    links: [
      'https://github.com/student/ecommerce-platform',
      'https://ecommerce-demo.netlify.app',
    ],
    metadata: {
      teamSize: 4,
      duration: '3 months',
      technologies: 'React, Node.js, MongoDB, Stripe',
    },
  },
  'AWS Cloud Practitioner': {
    name: 'AWS Cloud Practitioner',
    type: 'Certificate',
    category: 'Certification',
    description:
      'Amazon Web Services Certified Cloud Practitioner certification. Demonstrates foundational cloud computing knowledge and AWS services expertise.',
    verifiedDate: '2026-01-25T09:00:00',
    issuedDate: '2026-01-20',
    expiryDate: '2029-01-20',
    issuer: 'Amazon Web Services',
    status: 'verified',
    verifiedBy: 'System Verified',
    files: [
      {
        name: 'AWS_Certificate.pdf',
        size: '890 KB',
        type: 'application/pdf',
      },
    ],
    metadata: {
      certificationId: 'AWS-CCP-2026-12345',
      validUntil: '2029-01-20',
      score: '850/1000',
    },
  },
}
