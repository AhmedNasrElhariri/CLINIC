import { useState, useCallback } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const toggle = useCallback(() => {
    console.log(!visible);
    setVisible(!visible);
  }, [visible]);

  return { visible, setVisible, open, close, toggle };
};

export default useModal;
