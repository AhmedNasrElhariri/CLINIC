import { transparentize } from 'polished';

const textColor = '#283148';
const primaryColor = '#51C6F3';
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
  subtle: transparentize(0.9, textColor),
  input: '#283148',
  text: textColor,
  texts: [
    transparentize(0.3, textColor),
    transparentize(0.5, textColor),
    transparentize(0.75, textColor),
  ],
  background: 'rgba(40, 49, 72, 0.03)',
  cardBorder: transparentize(0.9, textColor),
  border: transparentize(0.85, primaryColor),
  borders: [transparentize(0.8, textColor)],
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

  radius: 17,
};
