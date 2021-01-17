import { useState, useCallback } from 'react';
import Compressor from 'compressorjs';

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

export function useUpload({ onCompleted = () => {}, onError = () => {} } = {}) {
  const [loading, setLoading] = useState(false);

  const upload = useCallback(
    files => {
      setLoading(true);
      const formData = new FormData();
      const compressedFiles = files.map(
        f =>
          new Promise((resolve, reject) => {
            new Compressor(f, {
              quality: 0.6,
              success: result => resolve(result),
              error(err) {
                console.log(err.message);
              },
            });
          })
      );

      Promise.all(compressedFiles).then(images => {
        images.forEach(result => {
          formData.append('file', result, result.name);
        });

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
      });
    },
    [onCompleted, onError]
  );

  return {
    upload,
    loading,
  };
}

export default useUpload;
