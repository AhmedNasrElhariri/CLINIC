import { useCallback, useMemo, useState } from 'react';
import { isValid } from 'services/form';
import { Alert } from 'rsuite';

function useFrom({ initValue, model }) {
  const [formValue, setFormValue] = useState(initValue);
  const [type, setType] = useState('create');

  const reset = useCallback(() => {
    setFormValue(initValue);
  }, [initValue, setFormValue]);

  const validate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      throw new Error();
    }
  }, [formValue, model]);

  return useMemo(
    () => ({
      setFormValue,
      formValue,
      reset,
      validate,
      type,
      setType
    }),
    [formValue, reset, type, validate]
  );
}

export default useFrom;
