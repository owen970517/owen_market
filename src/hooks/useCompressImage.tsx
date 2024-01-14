import imageCompression from "browser-image-compression";

export const useCompressImage = () => {
    const compressImage = async (image:File) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 600,
      };
      return await imageCompression(image , options);
    };

    return {compressImage}
}