export function SupervisorDashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
            Supervisor Dashboard
          </h1>
          <p className="text-sm text-[hsl(220,9%,46%)]">
            Dr. Ramesh Babu · HOD Computer Science · Apr 21, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 text-xs font-semibold rounded-xl bg-gradient-to-b from-[hsl(0,72%,51%)] to-[hsl(0,72%,46%)] text-white shadow-sm hover:from-[hsl(0,72%,46%)] hover:to-[hsl(0,72%,41%)] transition-all duration-200">
            📥 Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}
