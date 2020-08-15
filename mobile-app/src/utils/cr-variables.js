const textColor = 'rgb(40, 49, 72)';
const textColorLight = 'rgba(40, 49, 72, 0.5)';
const primaryColor = '#51C6F3';
const eventColor1 = primaryColor;
const eventColor2 = '#40C173';
const eventColor3 = textColor;

export default {
  primaryColor,
  textColor,
  textColorLight,
  borderColor: 'rgba(40, 49, 72, 0.2)',
  placeholderColor: 'rgba(40, 49, 72, 0.3)',
  disabledBgColor: 'rgb(233, 234, 236)',
  disabledColor: 'rgba(40, 49, 72, 0.5)',
  listDividerBg: 'rgb(233, 234, 236)',
  borderRadius: 10,
  borderWidth: 1,
  fieldMarginBottom: 30,
  fieldPaddingLeft: 20,
  fieldPaddingRight: 20,
  footerBg: '#ffffff',
  footerLogoColor: 'rgb(226, 226, 226)',
  fonts: {
    SegoeUI: 'SegoeUI',
    SegoeUIBold: 'SegoeUIBold',
    SegoeUISemiBold: 'SegoeUISemiBold',
    SegoeUISemiLight: 'SegoeUISemiLight',
  },
};

const fontFamily = {
  normal: 'SegoeUI',
  bold: 'SegoeUIBold',
  semiBold: 'SegoeUISemiBold',
  semiLight: 'SegoeUISemiLight',
};

const fontColor = {
  normal: textColor,
  primary: primaryColor,
  light: textColorLight,
};

export const getFontWeight = weight => fontFamily[weight];

export const getFontColor = variant => fontColor[variant] || fontColor.normal;
