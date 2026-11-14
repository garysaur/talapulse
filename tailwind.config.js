const colors = {
  background: 'hsl(var(--background) / <alpha-value>)',
  foreground: 'hsl(var(--foreground) / <alpha-value>)',
  card: 'hsl(var(--card) / <alpha-value>)',
  primary: { DEFAULT: 'hsl(var(--primary) / <alpha-value>)', foreground: 'hsl(var(--primary-foreground) / <alpha-value>)' },
  secondary: { DEFAULT: 'hsl(var(--secondary) / <alpha-value>)', foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)' },
  muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
  border: 'hsl(var(--border) / <alpha-value>)',
  ring: 'hsl(var(--ring) / <alpha-value>)',
  ok: 'hsl(var(--ok) / <alpha-value>)',
  warn: 'hsl(var(--warn) / <alpha-value>)',
  alert: 'hsl(var(--alert) / <alpha-value>)',
  accent: 'hsl(var(--accent) / <alpha-value>)',
};

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: { DEFAULT: 'var(--radius)' },
    },
  },
  plugins: [],
};
