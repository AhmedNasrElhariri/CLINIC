import crVariables from '@/utils/cr-variables';

export const buttonStyle = {
  // height: 50,
  justifyContent: 'center',
  // borderRadius: crVariables.borderRadius,
  // padding: crVariables.fieldPaddingLeft - 15,
};

export const textStyle = {
  fontWeight: '800',
};

export const primaryStyle = {
  button: {
    normal: {
      ...buttonStyle,
      backgroundColor: crVariables.primaryColor,
    },
    disabled: {
      ...buttonStyle,
      backgroundColor: crVariables.disabledBgColor,
    },
  },
  text: {
    normal: {
      ...textStyle,
      color: '#ffffff',
    },
    disabled: {
      color: crVariables.disabledColor,
    },
  },
};
