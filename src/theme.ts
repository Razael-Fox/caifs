import { createTheme, MantineColorsTuple } from '@mantine/core';

const pacificCyan: MantineColorsTuple = [
  '#ecfeff',
  '#cffffe',
  '#a5f3fc',
  '#67e8f9',
  '#22d3ee',
  '#06b6d4',
  '#0891b2',
  '#0e7490',
  '#155e75',
  '#164e63',
];

export const theme = createTheme({
  primaryColor: 'pacificCyan',
  primaryShade: 6,
  defaultRadius: 'lg',
  fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
  },
  colors: {
    pacificCyan,
  },
  components: {
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#f8fafc',
          '&:focus': {
            borderColor: '#22d3ee',
          },
        },
        label: {
          color: '#cbd5e1',
          fontWeight: 600,
          marginBottom: '6px',
        },
      },
    },
    Textarea: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#f8fafc',
          '&:focus': {
            borderColor: '#22d3ee',
          },
        },
        label: {
          color: '#cbd5e1',
          fontWeight: 600,
          marginBottom: '6px',
        },
      },
    },
    Select: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#f8fafc',
        },
        label: {
          color: '#cbd5e1',
          fontWeight: 600,
          marginBottom: '6px',
        },
        dropdown: {
          backgroundColor: '#0f172a',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#f8fafc',
        },
      },
    },
    ColorInput: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#f8fafc',
        },
        label: {
          color: '#cbd5e1',
          fontWeight: 600,
          marginBottom: '6px',
        },
      },
    },
    SegmentedControl: {
      styles: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '4px',
        },
        label: {
          color: '#94a3b8',
          fontWeight: 600,
          '&[data-active]': {
            color: '#ffffff',
          },
        },
      },
    },
    Card: {
      styles: {
        root: {
          backgroundColor: 'rgba(30, 41, 59, 0.65)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});
