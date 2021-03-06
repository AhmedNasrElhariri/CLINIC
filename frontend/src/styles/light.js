import { transparentize, setLightness } from 'polished';
import { variant } from 'styled-system';

const textColor = '#283148';
const successColor = '#40C173';
const primaryColor = '#51C6F3'; // i changed the primary color from #51C6F3 to #1b253a
const eventColor1 = primaryColor;
const eventColor2 = successColor;
const eventColor4 = '#fe9f0b';
const eventColor3 = '#d40000';
const eventColor5 = textColor;

export const scrollbarColor = transparentize(0.8, textColor);
export const variantColors = {
  primary: {
    color: '#1b253a',
  },
  primary100: {
    color: '#019ae7',
  },
  secondary: {
    color: '#eef1f1',
  },
  white: {
    color: '#ffffff',
  },
  danger: {
    color: '#bc3254',
  },
  green: {
    color: '#037f4b',
  },
  yello: {
    color: '#ffcc03',
  },
  color100: {
    color: '#794bd1',
  },
  color200: {
    color: '#bc3254',
  },
  default: {
    color: '#1b253a',
  },
};
export const variantBackgroundColors = {
  primary: {
    bg: '#51C6F3',
  },
  primary100: {
    bg: '#019ae7',
  },
  secondary: {
    bg: '#eef1f1',
  },
  danger: {
    bg: '#bc3254',
  },
  green: {
    bg: '#037f4b',
  },
  yello: {
    bg: '#ffcc03',
  },
  color100: {
    bg: '#794bd1',
  },
  color200: {
    bg: '#bc3254',
  },
};
export const colors = {
  primary: primaryColor,
  success: successColor,
  primaryLight: '#EDF9FE',
  primaryLighter: transparentize(0.9, primaryColor),
  red: '#E60303',
  dark: '#283148',
  shadow: '#0000000D',
  grey: '#707070',
  grey100: '#2831481A',
  grey200: transparentize(0.95, textColor),
  subtle: transparentize(0.9, textColor),
  input: '#283148',
  text: textColor,
  iconBg: transparentize(0.9, primaryColor),
  texts: [
    transparentize(0.3, textColor),
    transparentize(0.5, textColor),
    transparentize(0.75, textColor),
  ],
  background: 'rgba(255,255,255,1)',
  cardBorder: transparentize(0.9, textColor),
  border: transparentize(0.85, primaryColor),
  borders: [transparentize(0.8, textColor)],
  events: [
    {
      color: eventColor1,
      bg: setLightness(0.97, eventColor1),
      hover: setLightness(0.88, eventColor1),
    },
    {
      color: eventColor2,
      bg: setLightness(0.97, eventColor2),
      hover: setLightness(0.88, eventColor2),
    },
    {
      color: eventColor3,
      bg: setLightness(0.97, eventColor3),
      hover: setLightness(0.88, eventColor3),
    },
    {
      color: eventColor4,
      bg: setLightness(0.97, eventColor4),
      hover: setLightness(0.88, eventColor4),
    },
    {
      color: eventColor5,
      bg: setLightness(0.97, eventColor5),
      hover: setLightness(0.88, eventColor5),
    },
  ],
};

export default {
  colors: { ...colors },
  // mode: 'normal',
  mode: 'normal',
  buttons: {
    primary: {
      color: colors.primary,
    },
    dark: {
      color: colors.dark,
    },
    danger: {
      color: colors.red,
    },
    success: {
      color: colors.success,
    },
  },

  // common will be extracted
  navbar: {
    height: '50px',
  },

  breakpoints: ['40em', '52em', '64em', '100em'],

  radius: 17,
  variantColors,
  variantBackgroundColors,
};
