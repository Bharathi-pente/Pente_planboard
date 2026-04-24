# PlanBoard - Academic Portfolio Management System

A comprehensive academic portfolio management system built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Atomic components (button, card, badge, etc.)
│   ├── layout/         # Layout components (header, sidebar, etc.)
│   └── shared/         # Complex shared components
├── features/           # Feature-based modules
│   ├── auth/          # Authentication & onboarding
│   └── student/       # Student dashboard, activities, locker, portfolio
├── lib/               # Utilities and configurations
├── hooks/             # Custom React hooks
├── store/             # Zustand state management
├── routes/            # React Router configuration
├── config/            # App configuration
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## 🎨 Design System

The design system is based on the original HTML implementation with:
- **Colors**: Role-based color schemes (Student: Blue/Purple, Faculty: Green, Supervisor: Red)
- **Typography**: DM Sans (sans-serif) and DM Serif Display (serif)
- **Spacing**: Consistent spacing scale
- **Components**: Pre-built UI components matching the original design

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **TanStack Query** - Server state management
- **Axios** - HTTP client

## 📝 Development Workflow

1. **Phase 1**: Setup & Core UI (✅ Complete)
2. **Phase 2**: Student Dashboard
3. **Phase 3**: Student Plan Board
4. **Phase 4**: Student Activities
5. **Phase 5**: Digital Locker
6. **Phase 6**: Portfolio

## 🎯 Features

### Student Features
- Dashboard with KPI cards and activity feed
- Interactive Gantt timeline plan board
- Activities submission with file uploads
- Digital locker for verified documents
- Portfolio builder with year/semester breakdown

### Faculty Features
- Curriculum management
- Submissions grading
- Evidence validation
- Class overview

### Supervisor Features
- Institution-wide analytics
- Student & faculty management
- Approval workflows
- Reports and analytics

## 📄 License

Private - Academic Use Only
