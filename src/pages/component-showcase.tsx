import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Avatar,
  Progress,
} from '@/components/ui'

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-[hsl(240,20%,98%)] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">UI Component Showcase</h1>
          <p className="text-[hsl(220,9%,46%)]">
            Base components for PlanBoard React
          </p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Button variants with different colors and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Variants */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Color Variants
              </h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="bacc">Student (Accent)</Button>
                <Button variant="bgrn">Faculty (Green)</Button>
                <Button variant="bred">Supervisor (Red)</Button>
                <Button variant="bamb">Warning (Amber)</Button>
                <Button variant="bpur">Purple</Button>
                <Button variant="bteal">Teal</Button>
                <Button variant="bgo">Outline</Button>
                <Button variant="bsu">Submit</Button>
                <Button variant="outline">Outlined</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="bacc" size="sm">
                  Small
                </Button>
                <Button variant="bacc" size="md">
                  Medium
                </Button>
                <Button variant="bacc" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Full Width */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Full Width
              </h4>
              <Button variant="bsu" fullWidth>
                Generate Portfolio
              </Button>
            </div>

            {/* Disabled */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Disabled State
              </h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="bacc" disabled>
                  Disabled Button
                </Button>
                <Button variant="bgrn" disabled>
                  Disabled Button
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Role pills and status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Badges */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Role Badges
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="student">Student</Badge>
                <Badge variant="faculty">Faculty</Badge>
                <Badge variant="supervisor">Supervisor</Badge>
              </div>
            </div>

            {/* Status Badges */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Status Badges
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="pending">Pending</Badge>
                <Badge variant="in-progress">In Progress</Badge>
                <Badge variant="completed">Completed</Badge>
                <Badge variant="approved">Approved</Badge>
                <Badge variant="rejected">Rejected</Badge>
                <Badge variant="review">Under Review</Badge>
              </div>
            </div>

            {/* Badge Sizes */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Badge Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="student" size="sm">
                  Small
                </Badge>
                <Badge variant="student" size="md">
                  Medium
                </Badge>
                <Badge variant="student" size="lg">
                  Large
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatars Section */}
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
            <CardDescription>
              User avatars with role-based gradient backgrounds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Avatars */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Role-based Gradients
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-center">
                  <Avatar role="student" fallback="ST" size="lg" />
                  <p className="text-xs mt-2 text-[hsl(220,9%,46%)]">Student</p>
                </div>
                <div className="text-center">
                  <Avatar role="faculty" fallback="FA" size="lg" />
                  <p className="text-xs mt-2 text-[hsl(220,9%,46%)]">Faculty</p>
                </div>
                <div className="text-center">
                  <Avatar role="supervisor" fallback="SU" size="lg" />
                  <p className="text-xs mt-2 text-[hsl(220,9%,46%)]">
                    Supervisor
                  </p>
                </div>
                <div className="text-center">
                  <Avatar fallback="U" size="lg" />
                  <p className="text-xs mt-2 text-[hsl(220,9%,46%)]">Default</p>
                </div>
              </div>
            </div>

            {/* Avatar Sizes */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar role="student" fallback="S" size="sm" />
                <Avatar role="student" fallback="M" size="md" />
                <Avatar role="student" fallback="L" size="lg" />
                <Avatar role="student" fallback="XL" size="xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Bars</CardTitle>
            <CardDescription>Progress indicators with variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Variants */}
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2 text-[hsl(220,9%,46%)]">
                  Default (75%)
                </p>
                <Progress value={75} variant="default" />
              </div>
              <div>
                <p className="text-sm mb-2 text-[hsl(220,9%,46%)]">
                  Student Gradient (60%)
                </p>
                <Progress value={60} variant="student" />
              </div>
              <div>
                <p className="text-sm mb-2 text-[hsl(220,9%,46%)]">
                  Faculty Gradient (85%)
                </p>
                <Progress value={85} variant="faculty" />
              </div>
              <div>
                <p className="text-sm mb-2 text-[hsl(220,9%,46%)]">
                  Supervisor Gradient (45%)
                </p>
                <Progress value={45} variant="supervisor" />
              </div>
            </div>

            {/* With Labels */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                With Label (Digital Locker Style)
              </h4>
              <Progress
                value={24}
                max={32}
                variant="student"
                showLabel
                size="md"
              />
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-[hsl(220,9%,46%)]">
                Sizes
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs mb-1.5 text-[hsl(220,9%,46%)]">Small</p>
                  <Progress value={70} variant="student" size="sm" />
                </div>
                <div>
                  <p className="text-xs mb-1.5 text-[hsl(220,9%,46%)]">
                    Medium
                  </p>
                  <Progress value={70} variant="student" size="md" />
                </div>
                <div>
                  <p className="text-xs mb-1.5 text-[hsl(220,9%,46%)]">Large</p>
                  <Progress value={70} variant="student" size="lg" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Card containers with header, content, and footer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Example Card</CardTitle>
                  <CardDescription>
                    This is a description for the card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[hsl(220,9%,46%)]">
                    Card content goes here. You can put any content inside the
                    CardContent component.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>KPI Card</CardTitle>
                  <CardDescription>Verified Documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-[hsl(158,64%,52%)]">
                      24
                    </div>
                    <Progress value={75} variant="faculty" size="sm" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
