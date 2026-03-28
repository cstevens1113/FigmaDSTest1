/**
 * Code Connect — DataTable
 *
 * Links the Figma DataTable component to the React DataTable<T> implementation.
 * After publishing the Figma library run:
 *   npx figma connect publish --token <your-pat>
 *
 * Figma component node: 96:2
 * File: https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation
 */

import figma from '@figma/code-connect'
import { DataTable } from './DataTable'
import { Avatar } from '../Avatar'
import { Badge } from '../Badge'
import { Button } from '../Button'

// Row type used in the example
interface CustomerRow {
  id: string
  name: string
  email: string
  plan: string
  planVariant: 'default' | 'secondary' | 'outline'
  mrr: string
  status: 'Active' | 'Paused' | 'Churned'
  since: string
}

figma.connect(
  DataTable,
  'https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation?node-id=96-2',
  {
    example: () => (
      <DataTable<CustomerRow>
        caption="Top Customers"
        action={
          <Button variant="ghost" size="sm">
            View all
          </Button>
        }
        columns={[
          {
            header: 'Customer',
            width: '320px',
            accessor: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar size="xs" fallback={row.name} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-[var(--foreground)]">
                    {row.name}
                  </span>
                  <span className="text-[12px] text-[var(--muted-foreground)]">
                    {row.email}
                  </span>
                </div>
              </div>
            ),
          },
          {
            header: 'Plan',
            width: '140px',
            accessor: (row) => (
              <Badge variant={row.planVariant}>{row.plan}</Badge>
            ),
          },
          {
            header: 'MRR',
            width: '140px',
            accessor: 'mrr',
          },
          {
            header: 'Status',
            width: '160px',
            accessor: (row) => {
              const colors = {
                Active:  { bg: 'bg-[#dcfce7]', fg: 'text-[#16a34a]', dot: 'bg-[#16a34a]' },
                Paused:  { bg: 'bg-[#fef9c3]', fg: 'text-[#ca8a04]', dot: 'bg-[#ca8a04]' },
                Churned: { bg: 'bg-[#fee2e2]', fg: 'text-[#dc2626]', dot: 'bg-[#dc2626]' },
              } as const
              const c = colors[row.status]
              return (
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium ${c.bg} ${c.fg}`}
                >
                  <span className={`size-1.5 rounded-full ${c.dot}`} />
                  {row.status}
                </span>
              )
            },
          },
          {
            header: 'Member Since',
            width: '192px',
            accessor: 'since',
          },
        ]}
        data={[
          { id: '1', name: 'Acme Corp',   email: 'billing@acme.io',      plan: 'Enterprise', planVariant: 'default',   mrr: '$2,400', status: 'Active', since: 'Jan 2024' },
          { id: '2', name: 'Globex Ltd',  email: 'finance@globex.com',   plan: 'Pro',        planVariant: 'secondary', mrr: '$890',   status: 'Active', since: 'Mar 2024' },
          { id: '3', name: 'Initech LLC', email: 'accounts@initech.net', plan: 'Pro',        planVariant: 'secondary', mrr: '$890',   status: 'Paused', since: 'Jun 2023' },
          { id: '4', name: 'Umbrella Co', email: 'admin@umbrella.org',   plan: 'Starter',    planVariant: 'outline',   mrr: '$290',   status: 'Active', since: 'Sep 2023' },
        ]}
        hoverable
        onRowClick={(row) => console.log('Selected:', row.name)}
      />
    ),
  },
)
