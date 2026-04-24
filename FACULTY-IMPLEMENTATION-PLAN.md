# FACULTY VIEW IMPLEMENTATION PLAN

## 📋 Overview
Implementing complete Faculty Dashboard system based on HTML mockup reference with proper architecture, reusable components, and mock data integration.

---

## 🎯 SCOPE - FACULTY FEATURES

### **Screens to Implement:**

1. **Faculty Dashboard** ✅ (Phase 1 - IN PROGRESS)
   - KPI Cards (Pending Submissions, Evidence Validations, Total Classes, Completion Rate)
   - Recent Activities Table
   - Class Performance Overview
   - Upcoming Deadlines
   - Weekly Schedule

2. **Curriculum Manager** (Phase 2)
   - Activity Templates Library
   - Create New Activity Form
   - Import/Export Activities
   - Activity Categories (Curriculum, Projects, Research, Events)
   - Bulk Actions

3. **Submissions Review** (Phase 3)
   - Pending Submissions List with Filters
   - Submission Detail Modal/Drawer
   - Grading Interface with Rubrics
   - Feedback System
   - Bulk Approve/Reject

4. **Evidence Validation** (Phase 4)
   - Evidence Items List
   - Validation Interface
   - Document Preview
   - Approve/Reject with Comments
   - Validation History

5. **Class Overview** (Phase 5)
   - Class List with Performance Metrics
   - Student Progress Tracking
   - Class Analytics Dashboard
   - Individual Student View

---

## 📁 FOLDER STRUCTURE

```
src/
├── data/
│   ├── mock-faculty-dashboard.ts     ✅ CREATED
│   ├── mock-faculty-submissions.ts   ✅ CREATED
│   ├── mock-faculty-curriculum.ts    ⏳ TODO
│   ├── mock-faculty-evidence.ts      ⏳ TODO
│   └── mock-faculty-classes.ts       ⏳ TODO
│
├── services/api/
│   ├── faculty-dashboard.service.ts  ⏳ TODO
│   ├── faculty-submissions.service.ts ⏳ TODO
│   ├── faculty-curriculum.service.ts  ⏳ TODO
│   ├── faculty-evidence.service.ts    ⏳ TODO
│   └── faculty-classes.service.ts     ⏳ TODO
│
├── features/faculty/
│   ├── dashboard/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── faculty-dashboard.tsx
│   │   │   ├── faculty-stats-grid.tsx
│   │   │   ├── recent-activities-table.tsx
│   │   │   ├── class-performance-cards.tsx
│   │   │   ├── faculty-schedule.tsx
│   │   │   └── faculty-deadlines.tsx
│   │   └── hooks/
│   │       └── use-faculty-dashboard.ts
│   │
│   ├── curriculum/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── curriculum-manager.tsx
│   │   │   ├── activity-template-card.tsx
│   │   │   ├── create-activity-modal.tsx
│   │   │   ├── import-activity-modal.tsx
│   │   │   └── activity-categories.tsx
│   │   └── hooks/
│   │       └── use-curriculum.ts
│   │
│   ├── submissions/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── submissions-review.tsx
│   │   │   ├── submission-list.tsx
│   │   │   ├── submission-detail-drawer.tsx
│   │   │   ├── grading-interface.tsx
│   │   │   └── feedback-editor.tsx
│   │   └── hooks/
│   │       └── use-submissions.ts
│   │
│   ├── evidence/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── evidence-validation.tsx
│   │   │   ├── evidence-list.tsx
│   │   │   ├── evidence-detail-modal.tsx
│   │   │   └── validation-form.tsx
│   │   └── hooks/
│   │       └── use-evidence.ts
│   │
│   └── classes/
│       ├── index.ts
│       ├── components/
│       │   ├── class-overview.tsx
│       │   ├── class-card.tsx
│       │   ├── student-progress-table.tsx
│       │   └── class-analytics.tsx
│       └── hooks/
│           └── use-classes.ts
│
├── components/shared/
│   ├── faculty-kpi-card.tsx         ⏳ TODO (Reusable)
│   ├── activity-card.tsx            ⏳ TODO (Reusable)
│   ├── grading-rubric.tsx           ⏳ TODO (Reusable)
│   ├── student-avatar.tsx           ⏳ TODO (Reusable)
│   └── schedule-grid.tsx            ⏳ TODO (Reusable)
│
└── routes/
    └── app-router.tsx                ⏳ TODO (Update with Faculty routes)
```

---

## 🎨 REUSABLE COMPONENTS TO CREATE

### 1. **FacultyKPICard** (High Priority)
- Props: title, value, icon, badge, background color, onclick
- Variants: warning, success, info, danger
- Used across all dashboard views

### 2. **ActivityCard** (High Priority)
- Props: activity data, actions, status
- Used in Curriculum Manager and Class Overview

### 3. **GradingRubric** (Medium Priority)
- Props: rubric criteria, scores, editable
- Used in Submissions Review

### 4. **StudentAvatar** (High Priority)
- Props: name, avatar, color, size
- Used across all views

### 5. **ScheduleGrid** (Medium Priority)
- Props: schedule data, class colors
- Used in Dashboard

### 6. **EvidencePreview** (Medium Priority)
- Props: file type, preview URL
- Used in Evidence Validation

### 7. **SubmissionTimeline** (Low Priority)
- Props: submission history
- Used in Submission Detail

---

## 🔄 DATA FLOW ARCHITECTURE

```
Component
   ↓
Custom Hook (use-faculty-*.ts)
   ↓
Service Layer (faculty-*.service.ts)
   ↓
Mock Data OR Real API (Toggle via VITE_USE_MOCK_DATA)
```

---

## 📊 MOCK DATA STRUCTURE

### Faculty Dashboard Data:
```typescript
{
  stats: {
    pendingSubmissions: number
    evidenceValidations: number
    totalClasses: number
    totalStudents: number
    classCompletionRate: number
  },
  recentActivities: Activity[],
  classPerformance: ClassPerformance[],
  upcomingDeadlines: Deadline[],
  weeklySchedule: Schedule
}
```

### Submissions Data:
```typescript
{
  id: string
  title: string
  student: Student
  subject: string
  type: string
  submittedDate: Date
  dueDate: Date
  status: 'pending' | 'under-review' | 'graded'
  files: File[]
  grade?: Grade
  feedback?: string
}
```

---

## 🎯 IMPLEMENTATION PHASES

### **PHASE 1: Faculty Dashboard** (Current)
**Time: 2-3 hours**

✅ Mock data created:
- `mock-faculty-dashboard.ts`
- `mock-faculty-submissions.ts`

⏳ To Do:
1. Create faculty dashboard service
2. Create custom hooks
3. Build dashboard components
4. Integrate with routing

### **PHASE 2: Submissions Review**
**Time: 3-4 hours**

1. Create submissions mock data (extended)
2. Create submissions service
3. Build submission list component
4. Build submission detail drawer
5. Build grading interface
6. Implement filters and search

### **PHASE 3: Curriculum Manager**
**Time: 2-3 hours**

1. Create curriculum mock data
2. Create curriculum service
3. Build activity template library
4. Build create/edit activity modal
5. Implement import/export

### **PHASE 4: Evidence Validation**
**Time: 2-3 hours**

1. Create evidence mock data
2. Create evidence service
3. Build evidence list
4. Build validation interface
5. Implement document preview

### **PHASE 5: Class Overview**
**Time: 2-3 hours**

1. Create class/student mock data
2. Create class service
3. Build class cards
4. Build student progress table
5. Build analytics dashboard

---

## 🎨 DESIGN SYSTEM (From HTML Mockup)

### Faculty Theme Colors:
```css
--faculty-primary: hsl(158, 64%, 52%)    /* Green */
--faculty-light: hsl(152, 76%, 94%)      /* Light Green */
--faculty-gradient: linear-gradient(135deg, #059669, #0891B2)
```

### Component Styles:
- Cards: White background, border-radius: 12px
- Buttons: Faculty gradient, hover elevation
- Tables: Zebra striping, hover states
- Badges: Color-coded by status
- Icons: Emoji + gradient backgrounds

---

## 📝 KEY FEATURES TO IMPLEMENT

### Dashboard:
- [x] KPI Cards with real-time data
- [ ] Recent activities table with actions
- [ ] Class performance cards
- [ ] Weekly schedule grid
- [ ] Upcoming deadlines list

### Submissions:
- [ ] List with filters (status, class, subject)
- [ ] Detail drawer with all submission info
- [ ] Grading interface with rubrics
- [ ] Feedback editor with rich text
- [ ] Bulk operations

### Curriculum:
- [ ] Activity template library
- [ ] Create/Edit activity form
- [ ] Category management
- [ ] Import from CSV/JSON
- [ ] Export to PDF/Excel

### Evidence:
- [ ] List with filters
- [ ] Document preview (PDF, images)
- [ ] Validation form
- [ ] Comments system
- [ ] Batch validation

### Classes:
- [ ] Class list with metrics
- [ ] Student progress tracking
- [ ] Performance analytics
- [ ] Individual student view
- [ ] Export reports

---

## ✅ QUALITY CHECKLIST

For each feature:
- [ ] Mock data in `/data` folder
- [ ] Service layer abstraction
- [ ] Custom hooks for state management
- [ ] Reusable components
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Consistent styling (faculty theme)
- [ ] TypeScript types
- [ ] Clean code organization

---

## 🚀 DEPLOYMENT READINESS

Faculty view will be production-ready with:
- ✅ Service layer for easy API integration
- ✅ Environment variable for mock/real data toggle
- ✅ TypeScript for type safety
- ✅ Reusable components
- ✅ Consistent design system
- ✅ Error handling
- ✅ Loading states

---

## 📈 PROGRESS TRACKING

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Dashboard | 🟡 In Progress | 40% |
| Phase 2: Submissions | ⚪ Not Started | 0% |
| Phase 3: Curriculum | ⚪ Not Started | 0% |
| Phase 4: Evidence | ⚪ Not Started | 0% |
| Phase 5: Classes | ⚪ Not Started | 0% |

**Overall: 8% Complete**

---

## 🎯 NEXT ACTIONS

1. ✅ Create mock data files (DONE)
2. Create faculty services
3. Build Faculty Dashboard components
4. Update routing
5. Move to Phase 2

---

**Last Updated:** April 24, 2026  
**Status:** Phase 1 In Progress  
**Estimated Completion:** 12-15 hours total
