import { useCallback, useMemo, useState } from 'react';

function useForm({ initValue, model }) {
  const [formValue, setFormValue] = useState(initValue);
  const [type, setType] = useState('create');
  const [show, setShow] = useState(false);
  const reset = useCallback(() => {
    setFormValue(initValue);
  }, [initValue, setFormValue]);
  const checkResult = useMemo(() => {
    const checkValues = model.check(formValue);
    return checkValues;
  }, [formValue]);
  const validate = useMemo(() => {
    let valid = true;
    const checkResult = model.check(formValue);
    for (const val in checkResult) {
      if (checkResult[val]?.hasError) {
        valid = false;
        break;
      } else {
        continue;
      }
    }
    return valid;
  }, [formValue]);
  const updateProp = useCallback((prop, val) => {
    setFormValue(formValue => ({ ...formValue, [prop]: val }));
  }, []);

  return useMemo(
    () => ({
      setFormValue,
      formValue,
      reset,
      validate,
      type,
      setType,
      updateProp,
      checkResult,
      show,
      setShow,
    }),
    [formValue, reset, type, updateProp, validate, checkResult, show, setShow]
  );
}

export default useForm;
