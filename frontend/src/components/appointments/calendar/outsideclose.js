import React, { useRef, useEffect } from 'react';

export function useOutsiteClose(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default function useWithOutsideClose(ref) {
  const wrapperRef = useRef(null);
  useOutsiteClose(wrapperRef);
}
