import { useState, useCallback } from 'react';
import Compressor from 'compressorjs';

export function useUpload({ onCompleted = () => {}, onError = () => {} } = {}) {
  const [loading, setLoading] = useState(false);
  const getRatio = ({ size }, resolve) => {
    if (size > 800000 && size < 5000000) {
      return {
        quality: 0.5,
        maxHeight: 2500,
        maxWidth: 2500,
        success: result => resolve(result),
        error(err) {},
      };
    } else if (size > 5000000) {
      return {
        quality: 0.3,
        maxHeight: 2500,
        maxWidth: 2500,
        success: result => resolve(result),
        error(err) {},
      };
    }
    return {
      quality: 1,
      success: result => resolve(result),
      error(err) {},
    };
  };
  const upload = useCallback(
    files => {
      setLoading(true);
      const formData = new FormData();
      const compressedFiles = files.map(
        f =>
          new Promise((resolve, reject) => {
            new Compressor(f, getRatio(f, resolve));
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
