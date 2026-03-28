/**
 * Code Connect — StatCard
 *
 * Links the Figma StatCard component set to the React StatCard implementation.
 * After publishing the Figma library run:
 *   npx figma connect publish --token <your-pat>
 *
 * Figma component set node: 93:62
 * File: https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation
 */

import figma, { html } from '@figma/code-connect'
import { StatCard } from './StatCard'

// ── Variant=Up ────────────────────────────────────────────────────────────────
figma.connect(
  StatCard,
  'https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation?node-id=93-62',
  {
    variant: { Trend: 'Up' },
    props: {
      title:    figma.string('label'),
      value:    figma.string('Value'),
      change:   figma.string('change'),
      trend:    figma.enum('Trend', { Up: 'up', Down: 'down', Neutral: 'neutral' }),
    },
    example: ({ title, value, change, trend }) => (
      <StatCard
        title={title ?? 'Total Revenue'}
        value={value ?? '$84,230'}
        change={change ?? '+12.5%'}
        trend={trend ?? 'up'}
        description="vs. last month"
        sparkline={[
          { value: 14 }, { value: 18 }, { value: 10 }, { value: 24 },
          { value: 16 }, { value: 28 }, { value: 20 }, { value: 30 },
          { value: 22 }, { value: 26 }, { value: 32 }, { value: 28 },
        ]}
      />
    ),
  },
)

// ── Variant=Down ──────────────────────────────────────────────────────────────
figma.connect(
  StatCard,
  'https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation?node-id=93-62',
  {
    variant: { Trend: 'Down' },
    props: {
      title:    figma.string('label'),
      value:    figma.string('Value'),
      change:   figma.string('change'),
      trend:    figma.enum('Trend', { Up: 'up', Down: 'down', Neutral: 'neutral' }),
    },
    example: ({ title, value, change, trend }) => (
      <StatCard
        title={title ?? 'Conversion Rate'}
        value={value ?? '3.64%'}
        change={change ?? '-0.4%'}
        trend={trend ?? 'down'}
        description="vs. last month"
        sparkline={[
          { value: 28 }, { value: 26 }, { value: 30 }, { value: 22 },
          { value: 20 }, { value: 24 }, { value: 16 }, { value: 18 },
          { value: 14 }, { value: 10 }, { value: 12 }, { value: 8  },
        ]}
      />
    ),
  },
)

// ── Variant=Neutral ───────────────────────────────────────────────────────────
figma.connect(
  StatCard,
  'https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System---Foundation?node-id=93-62',
  {
    variant: { Trend: 'Neutral' },
    props: {
      title:    figma.string('label'),
      value:    figma.string('Value'),
      change:   figma.string('change'),
      trend:    figma.enum('Trend', { Up: 'up', Down: 'down', Neutral: 'neutral' }),
    },
    example: ({ title, value, change, trend }) => (
      <StatCard
        title={title ?? 'Active Users'}
        value={value ?? '12,847'}
        change={change ?? '0.0%'}
        trend={trend ?? 'neutral'}
        description="vs. last month"
        sparkline={[
          { value: 20 }, { value: 22 }, { value: 18 }, { value: 24 },
          { value: 20 }, { value: 22 }, { value: 20 }, { value: 24 },
          { value: 18 }, { value: 22 }, { value: 20 }, { value: 22 },
        ]}
      />
    ),
  },
)
