import Resizer from 'react-image-file-resizer';

export const useCompressImage = () => {
  const compressImage = (file: File | Blob,width:number,height:number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      if (file instanceof File || file instanceof Blob) {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          'WEBP',
          100,
          0,
          (uri) => {
            if (uri instanceof Blob) {
              resolve(uri);
            } else if (typeof uri === 'string') {
              fetch(uri)
                .then(response => response.blob())
                .then(blob => {
                  resolve(
                    new Blob([blob], { type: 'image/webp' })
                  );
                })
                .catch(error => reject(error));
            } else {
              reject(new Error('Unexpected file type'));
            } 
          },
          'blob',
          200,
          200
        );
      } else {
        reject(new Error('Invalid file type'));
      }
    });

  return { compressImage };
};