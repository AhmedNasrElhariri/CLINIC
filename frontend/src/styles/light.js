import { transparentize, setLightness } from 'polished';

const textColor = '#283148';
const primaryColor = '#51C6F3';
const eventColor1 = primaryColor;
const eventColor2 = '#40C173';
const eventColor3 = '#d40000';
const eventColor4 = textColor;

export const scrollbarColor = transparentize(0.8, textColor);

export const colors = {
  primary: primaryColor,
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
  background: 'rgba(40, 49, 72, 0.03)',
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
  ],
};

export default {
  colors: { ...colors },
  // mode: 'normal',
  mode: 'large',
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
  },

  // common will be extracted
  navbar: {
    height: '130px',
  },

  breakpoints: ['40em', '52em', '64em', '100em'],

  radius: 17,
};
