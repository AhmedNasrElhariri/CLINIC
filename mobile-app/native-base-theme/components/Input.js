// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    height: variables.inputHeightBase,
    color: variables.cr.textColor,
    flex: 1,
    fontSize: variables.inputFontSize,

    paddingLeft: variables.cr.fieldPaddingLeft,
    paddingRight: variables.cr.fieldPaddingRight,
    borderWidth: variables.cr.borderWidth,
    borderRadius: variables.cr.borderRadius,
    borderColor: variables.cr.borderColor,
  };

  return inputTheme;
};
