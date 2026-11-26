import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode base palette
        base: '#0D1117',
        surface: '#161B22',
        'surface-hover': '#1C2128',
        border: '#30363D',
        'border-strong': '#484F58',
        text: '#E6EDF3',
        'text-muted': '#8B949E',
        'text-dim': '#6E7681',
        accent: '#58A6FF',
        'accent-hover': '#79B8FF',
        danger: '#F85149',

        // Tier colors (optimized for dark backgrounds)
        tier: {
          S: '#FF6B6B',
          A: '#FFD93D',
          B: '#6BCB77',
          C: '#4D96FF',
          D: '#A0AEC0',
        },
        'tier-text': {
          S: '#0D1117',
          A: '#0D1117',
          B: '#0D1117',
          C: '#FFFFFF',
          D: '#0D1117',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        heading: ['1.5rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.02em' }],
        subheading: ['0.875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.01em' }],
        body: ['0.8125rem', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['0.75rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.02em' }],
        micro: ['0.6875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
        badge: ['0.625rem', { lineHeight: '1', fontWeight: '700', letterSpacing: '0.1em' }],
      },
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        chip: '0',
      },
      boxShadow: {
        panel: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-border)',
        drag: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 2px var(--color-accent)',
        focus: '0 0 0 2px var(--color-base), 0 0 0 4px var(--color-accent)',
      },
      maxWidth: {
        container: '60rem', // 960px
      },
      transitionDuration: {
        fast: '80ms',
        panel: '200ms',
      },
      transitionTimingFunction: {
        panel: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config