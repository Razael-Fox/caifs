import { createTheme, MantineColorsTuple } from '@mantine/core';

// Base colors from palette.scss converted into 10-step Mantine tuples
const copperTuple: MantineColorsTuple = [
  '#f8f4f0',
  '#ece3da',
  '#d9c5b4',
  '#c6a489',
  '#b58763',
  '#a57548', // Base: faded-copper
  '#93653d',
  '#7e5432',
  '#684326',
  '#533219',
];

const pacificCyan: MantineColorsTuple = [
  '#eff8fa',
  '#dbeff3',
  '#b4e0e8',
  '#89cfdc',
  '#367885',
  '#2a626e', // Darker shade for high text contrast
  '#1f4e58', // Base: pacific-cyan high-contrast AA compliant
  '#183d46',
  '#102b32',
  '#091b20',
];

const frostedBlue: MantineColorsTuple = [
  '#f0fcff',
  '#dcf7fc',
  '#b6eff9',
  '#82ddf0',
  '#38b2cc',
  '#1b8ea6',
  '#126d80',
  '#0a4e5d',
  '#05333e',
  '#021b22',
];

const softApricot: MantineColorsTuple = [
  '#fff9f2',
  '#fff1e3',
  '#ffe2c7',
  '#fcd7ad',
  '#f9c48d',
  '#f5ad6b',
  '#db9250',
  '#b87438',
  '#945826',
  '#734017',
];

const peachGlowTuple: MantineColorsTuple = [
  '#fff8f3',
  '#ffede2',
  '#ffd9c4',
  '#f6c28b',
  '#f2a969',
  '#eb8f47',
  '#d47530',
  '#b05b20',
  '#8d4314',
  '#6d300b',
];

export const theme = createTheme({
  primaryColor: 'pacificCyan',
  primaryShade: 6,
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  colors: {
    copper: copperTuple,
    pacificCyan,
    frostedBlue,
    softApricot,
    peachGlow: peachGlowTuple,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
      },
    },
  },
});

