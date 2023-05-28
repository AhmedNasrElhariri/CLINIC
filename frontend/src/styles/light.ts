import { transparentize, setLightness } from 'polished';

const textColor = '#060608'; //#1e2129'//'#283148';
const primaryColor = '#51C6F3'; // i changed the primary color from #51C6F3 to #1b253a
const eventColor1 = primaryColor;
const eventColor2 = '#40C173';
const eventColor4 = '#fe9f0b';
const eventColor3 = '#d40000';
const eventColor5 = textColor;

export const scrollbarColor = transparentize(0.8, textColor);
export const colors = {
  white: '#ffffff',
  light: 'rgba(182, 183, 183, 0.1)',
  primary: primaryColor,
  primaryDarker: '#3abbf0',
  primaryLight: '#EDF9FE',
  primaryLighter: transparentize(0.9, primaryColor),
  warning: '#ffcc03',
  warningDarker: '#fe9f0b',
  success: '#40C173',
  successDarker: '#037f4b',
  red: '#E60303',
  danger: '#e50124',
  dangerDarker: '#bc3254',
  dark: '#283148',
  shadow: '#0000000D',
  grey: '#707070',
  grey100: '#2831481A',
  grey200: transparentize(0.95, textColor),
  subtle: transparentize(0.9, textColor),
  input: '#283148',
  alertColor: '#FFFF00',
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

const lightTheme = {
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
    height: '55.5px',
  },
  breakpoints: ['40em', '52em', '64em', '100em'],
  radius: 17,
};
export default lightTheme;
