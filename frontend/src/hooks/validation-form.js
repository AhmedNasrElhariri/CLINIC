import { useMemo } from 'react';

function useValidationForm({ model, formValue }) {
  const checkResult = useMemo(() => {
    const checkValues = model.check(formValue);
    return checkValues;
  }, [formValue]);
  const validate = useMemo(
    () => {
      let valid = true;
      const checkResult = model.check(formValue);
      for (const val in checkResult) {
        if (checkResult[val].hasError) {
          valid = false;
          break;
        } else {
          continue;
        }
      }
      return valid;
    },
    [formValue]
  );
  return useMemo(
    () => ({
      checkResult,
      validate,
    }),
    [checkResult,validate]
  );
}

export default useValidationForm;
