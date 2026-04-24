import { PageHeader } from '@/components/layout'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { Filter, Download } from 'lucide-react'

export default function DashboardDemo() {
  return (
    <div>
      <PageHeader
        title="Student Dashboard"
        description="Welcome back! Here's your academic progress overview."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
        actions={
          <>
            <Button variant="bgo" size="md">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="bacc" size="md">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* KPI Cards */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[hsl(220,9%,46%)]">
                Total Activities
              </CardTitle>
              <Badge variant="student" size="sm">
                +12%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(238,74%,59%)]">42</div>
            <p className="text-xs text-[hsl(220,9%,46%)] mt-2">
              Across all subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[hsl(220,9%,46%)]">
                Completed
              </CardTitle>
              <Badge variant="completed" size="sm">
                67%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(158,64%,52%)]">28</div>
            <p className="text-xs text-[hsl(220,9%,46%)] mt-2">
              Activities finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[hsl(220,9%,46%)]">
                Pending
              </CardTitle>
              <Badge variant="pending" size="sm">
                Due soon
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(38,92%,50%)]">8</div>
            <p className="text-xs text-[hsl(220,9%,46%)] mt-2">
              Submissions pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[hsl(220,9%,46%)]">
                Verified Docs
              </CardTitle>
              <Badge variant="approved" size="sm">
                75%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(158,64%,52%)]">24</div>
            <p className="text-xs text-[hsl(220,9%,46%)] mt-2">
              In digital locker
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-[hsl(214,32%,91%)] last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-[hsl(238,74%,59%)] mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(222,84%,5%)]">
                      Activity {i}
                    </p>
                    <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                      Subject name • Status
                    </p>
                  </div>
                  <Badge variant="in-progress" size="sm">
                    In Progress
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-[hsl(214,32%,91%)] last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-[hsl(0,72%,51%)] mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(222,84%,5%)]">
                      Event {i}
                    </p>
                    <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                      Due in {i * 2} days
                    </p>
                  </div>
                  <Badge variant="rejected" size="sm">
                    High
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
