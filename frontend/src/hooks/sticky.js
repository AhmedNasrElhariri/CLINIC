import { useEffect, useMemo, useCallback, useRef } from 'react';
import * as R from 'ramda';

function useSticky({ top = 0 } = {}) {
  const ref = useRef();

  const onScroll = useCallback(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    var sticky = R.propOr(0, 'offsetTop')(element);
    if (sticky - window.pageYOffset <= top) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');
    }
  }, [top]);

  useEffect(() => {
    window.onscroll = () => onScroll();
  }, [onScroll]);

  return useMemo(
    () => ({
      ref,
    }),
    []
  );
}

export default useSticky;
