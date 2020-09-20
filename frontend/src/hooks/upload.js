import { useState, useCallback } from 'react';

import useGlobalState from 'state';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    input: {
      clinicIds: [currentClinic.id],
    },
  };
}

function useUpload({ onCompleted, onError }) {
  const [loading, setLoading] = useState(false);

  const upload = useCallback(
    file => {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(res => {
          onCompleted(res);
        })
        .catch(err => {
          console.log(err);
          onError();
        })
        .finally(() => setLoading(false));
    },
    [onCompleted, onError]
  );

  return {
    upload,
    loading,
  };
}

export default useUpload;
