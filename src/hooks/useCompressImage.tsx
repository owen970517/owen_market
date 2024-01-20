import Resizer from 'react-image-file-resizer';

export const useCompressImage = () => {
  const compressImage = (file:Blob,width:number,height:number): Promise<Blob> =>
    new Promise((resolve,reject) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        'WEBP',
        100,
        0,
        (uri) => {
          if (typeof uri === 'string') {
            fetch(uri)
              .then(response => response.blob())
              .then(blob => resolve(blob))
              .catch(error => reject(error));
          } else if (uri instanceof Blob) {
            resolve(uri);
          } else {
            reject(new Error('Unexpected file type'));
          }
        },
        'blob',
        200,
        200
      );
    });

  return { compressImage };
};