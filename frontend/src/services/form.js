export const isValid = (model, formValue) => {
  return Object.entries(model.check(formValue)).every(
    ([key, value]) => !value.hasError
  );
};
