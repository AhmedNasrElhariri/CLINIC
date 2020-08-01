export const byTheme = cssProps => ({ theme: { mode } }) =>
  Object.keys(cssProps).reduce(
    (acc, key) => ({ ...acc, [key]: cssProps[key][mode] }),
    {}
  );
