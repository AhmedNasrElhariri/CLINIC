import { useCallback, useMemo, useState } from 'react';
import { isValid } from 'services/form';
import { Alert } from 'rsuite';

function useFrom({ initValue, model }) {
  const [formValue, setFormValue] = useState(initValue);

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
      validate
    }),
    [formValue, reset, validate]
  );
}

export default useFrom;
