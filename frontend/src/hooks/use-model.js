import { useState, useCallback } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return { visible, setVisible, open, close };
};

export default useModal;
