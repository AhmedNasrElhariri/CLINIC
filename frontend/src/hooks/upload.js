import { useState, useCallback } from 'react';
import Compressor from 'compressorjs';

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
              quality: 0.1,
              maxHeight: 500,
              maxWidth: 500,
              success: result => resolve(result),
              error(err) {},
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
