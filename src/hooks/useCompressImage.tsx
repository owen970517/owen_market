import imageCompression from "browser-image-compression";

export const useCompressImage = () => {
    const compressImage = async (image:File) => {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 300,
          useWebWorker: true
        };
        return await imageCompression(image , options);
    };

    return {compressImage}
}