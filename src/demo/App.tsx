import React from 'react'
import '../../src/tokens/index.css'

import { Button }         from '../components/Button'
import { Input }          from '../components/Input'
import { Textarea }       from '../components/Textarea'
import { Select }         from '../components/Select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card'
import { Badge }          from '../components/Badge'
import { Checkbox }       from '../components/Checkbox'
import { Switch }         from '../components/Switch'
import { Avatar }         from '../components/Avatar'
import { Alert, AlertTitle, AlertDescription } from '../components/Alert'
import { Display, Heading, Text, LabelText, Caption } from '../components/Typography'
import { Dialog }         from '../components/Dialog'
import { Toast, ToastProvider, useToast } from '../components/Toast'
import { Breadcrumb }     from '../components/Breadcrumb'
import { Pagination }     from '../components/Pagination'
import { Accordion }      from '../components/Accordion'
import { Combobox }       from '../components/Combobox'
import { Calendar }       from '../components/Calendar'
import { DatePicker }     from '../components/DatePicker'

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-[18px] font-semibold text-[var(--foreground)] whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
      {children}
    </section>
  )
}

// ─── Toast demo (needs hook inside provider) ──────────────────────────────────

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="flex flex-col gap-6">
      {/* Static previews */}
      <div className="flex flex-col gap-3">
        <Toast variant="default"     title="Default"     description="Your action was completed." />
        <Toast variant="success"     title="Success"     description="Your changes were saved successfully." />
        <Toast variant="warning"     title="Warning"     description="Your free trial ends in 3 days." />
        <Toast variant="destructive" title="Destructive" description="Your session has expired." />
      </div>
      {/* Live trigger buttons */}
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'default',     title: 'Default',     description: 'Your action was completed.' })}>
          Default toast
        </Button>
        <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'success',     title: 'Success!',    description: 'Changes saved.' })}>
          Success toast
        </Button>
        <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'warning',     title: 'Warning',     description: 'Trial ends in 3 days.' })}>
          Warning toast
        </Button>
        <Button size="sm" variant="destructive" onClick={() => toast({ variant: 'destructive', title: 'Error',      description: 'Session expired.' })}>
          Destructive toast
        </Button>
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark]           = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [page, setPage]           = React.useState(3)
  const [calDate, setCalDate]     = React.useState<Date | null>(new Date(2026, 2, 15))
  const [dpDate, setDpDate]       = React.useState<Date | null>(new Date(2026, 2, 26))
  const [framework, setFramework] = React.useState('next')

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">

        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)] px-8 py-4 flex items-center justify-between">
          <div>
            <span className="text-[16px] font-bold text-[var(--foreground)]">Brand Design System</span>
            <Badge variant="secondary" size="sm" className="ml-2">v0.1.0</Badge>
          </div>
          <Switch label="Dark mode" checked={dark} onChange={e => setDark(e.target.checked)} />
        </header>

        <main className="mx-auto max-w-5xl px-8 py-12 flex flex-col gap-16">

          {/* Breadcrumb */}
          <Section title="Breadcrumb">
            <Breadcrumb items={[
              { label: 'Home', href: '#' },
              { label: 'Components', href: '#' },
              { label: 'Breadcrumb', current: true },
            ]} />
            <Breadcrumb separator="›" items={[
              { label: 'Docs', href: '#' },
              { label: 'Getting Started', href: '#' },
              { label: 'Installation', current: true },
            ]} />
          </Section>

          {/* Typography */}
          <Section title="Typography">
            <Display size="2xl">Display 2xl — 60/72 Bold</Display>
            <Display size="xl">Display xl — 48/60 Bold</Display>
            <Display size="lg">Display lg — 36/44 Bold</Display>
            <Display size="md">Display md — 30/38 Bold</Display>
            <Heading size="xl">Heading xl — 24/32 Bold</Heading>
            <Heading size="lg">Heading lg — 20/28 SemiBold</Heading>
            <Heading size="md">Heading md — 18/28 SemiBold</Heading>
            <Text size="lg">Body lg — 18/28 Regular. The quick brown fox jumps over the lazy dog.</Text>
            <Text size="md">Body md — 16/24 Regular. The quick brown fox jumps over the lazy dog.</Text>
            <Text size="sm">Body sm — 14/20 Regular. The quick brown fox jumps over the lazy dog.</Text>
            <div className="flex gap-6 items-center">
              <LabelText size="md">Label md</LabelText>
              <LabelText size="sm">Label sm</LabelText>
              <Caption>Caption text</Caption>
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Button">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Section>

          {/* Badges */}
          <Section title="Badge">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="destructive" dot>Error</Badge>
              <Badge variant="secondary" dot size="sm">Small</Badge>
            </div>
          </Section>

          {/* Form Controls */}
          <Section title="Form Controls">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Email address" type="email" placeholder="you@example.com" hint="We'll never share your email." />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Input label="Error state" defaultValue="bad value" error="This field is required." />
              <Input label="Disabled" placeholder="Cannot edit" disabled />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select label="Country" placeholder="Select a country…">
                <option value="us">United States</option>
                <option value="gb">United Kingdom</option>
                <option value="ca">Canada</option>
              </Select>
              <Textarea label="Message" placeholder="Write something…" hint="Max 500 characters." rows={4} />
            </div>
          </Section>

          {/* Combobox */}
          <Section title="Combobox">
            <div className="flex flex-wrap gap-8 items-start">
              <Combobox
                label="Framework"
                placeholder="Search frameworks…"
                value={framework}
                onChange={setFramework}
                options={[
                  { value: 'next',    label: 'Next.js' },
                  { value: 'svelte',  label: 'SvelteKit' },
                  { value: 'nuxt',    label: 'Nuxt.js' },
                  { value: 'remix',   label: 'Remix' },
                  { value: 'astro',   label: 'Astro' },
                  { value: 'gatsby',  label: 'Gatsby' },
                ]}
              />
              <Combobox
                label="Disabled"
                placeholder="No options"
                disabled
                options={[]}
              />
            </div>
          </Section>

          {/* Toggles */}
          <Section title="Checkbox & Switch">
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col gap-3">
                <Checkbox label="Accept terms" description="By checking this you agree to our ToS." defaultChecked />
                <Checkbox label="Subscribe to newsletter" />
                <Checkbox label="Disabled option" disabled />
              </div>
              <div className="flex flex-col gap-4">
                <Switch label="Email notifications" description="Receive emails about your account." defaultChecked />
                <Switch label="Marketing emails" />
                <Switch label="Disabled switch" disabled />
              </div>
            </div>
          </Section>

          {/* Avatars */}
          <Section title="Avatar">
            <div className="flex flex-wrap gap-4 items-end">
              <Avatar size="xs" fallback="Chris Stevens" />
              <Avatar size="sm" fallback="Chris Stevens" />
              <Avatar size="md" fallback="Chris Stevens" />
              <Avatar size="lg" fallback="Chris Stevens" />
              <Avatar size="xl" fallback="Chris Stevens" />
            </div>
            <div className="flex gap-4 items-center">
              <Avatar size="md" src="https://i.pravatar.cc/80?img=1" alt="User avatar" />
              <Avatar size="md" src="broken-url" fallback="Fallback User" />
            </div>
          </Section>

          {/* Alerts */}
          <Section title="Alert">
            <Alert variant="default">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Your free trial ends in 3 days. Upgrade to keep access.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
            </Alert>
          </Section>

          {/* Toast */}
          <Section title="Toast">
            <ToastDemo />
          </Section>

          {/* Dialog */}
          <Section title="Dialog">
            <div className="flex gap-3">
              <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            </div>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Edit Profile"
              description="Update your account settings. Click save when you're done."
              footer={
                <>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)}>Save changes</Button>
                </>
              }
            >
              <Input label="Name" placeholder="Your full name" />
              <Input label="Email" type="email" placeholder="your@email.com" />
            </Dialog>
          </Section>

          {/* Accordion */}
          <Section title="Accordion">
            <div className="max-w-xl">
              <Accordion
                type="single"
                defaultOpen="ship"
                items={[
                  {
                    value: 'ship',
                    trigger: 'What are your shipping options?',
                    content: 'We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.',
                  },
                  {
                    value: 'return',
                    trigger: 'What is your return policy?',
                    content: 'Items may be returned within 30 days of purchase for a full refund, provided they are in original condition.',
                  },
                  {
                    value: 'support',
                    trigger: 'How can I contact customer support?',
                    content: 'Reach us via email at support@example.com or through live chat Monday–Friday, 9 am–6 pm EST.',
                  },
                ]}
              />
            </div>
          </Section>

          {/* Pagination */}
          <Section title="Pagination">
            <Pagination total={12} page={page} onChange={setPage} />
            <Text size="sm" muted>Current page: {page} of 12</Text>
          </Section>

          {/* Calendar */}
          <Section title="Calendar">
            <div className="flex flex-wrap gap-8 items-start">
              <Calendar
                value={calDate}
                onChange={setCalDate}
                today={new Date(2026, 2, 28)}
              />
              <div className="flex flex-col gap-2 pt-2">
                <Text size="sm" muted>Selected:</Text>
                <Text size="md">{calDate ? calDate.toDateString() : 'None'}</Text>
                <Button size="sm" variant="outline" onClick={() => setCalDate(null)}>Clear</Button>
              </div>
            </div>
          </Section>

          {/* DatePicker */}
          <Section title="Date Picker">
            <div className="flex flex-wrap gap-8 items-start">
              <DatePicker
                label="Due date"
                value={dpDate}
                onChange={d => setDpDate(d)}
              />
              <DatePicker
                label="Disabled"
                placeholder="Not available"
                disabled
              />
            </div>
          </Section>

          {/* Cards */}
          <Section title="Card">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(['sm', 'base', 'md'] as const).map(shadow => (
                <Card key={shadow} shadow={shadow}>
                  <CardHeader>
                    <CardTitle>shadow-{shadow}</CardTitle>
                    <CardDescription>A card with a subtle layered shadow from the design system.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>Card content goes here. Use CardContent for body and CardFooter for actions.</Text>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Confirm</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </ToastProvider>
  )
}
