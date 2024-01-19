import { storage } from "../firebase";

export const useUpoadImage = () => {
  const uploadImageToStorage = async (compressedImage:Blob,store:string):Promise<string> => {
    const storageRef = storage.ref();
    const fileName = `${Date.now()}.webp`;
    const ImgRef = storageRef.child(`${store}/${fileName}`);
    const uploadImgTask = ImgRef.put(compressedImage);
    
    return new Promise((resolve, reject) => {
      uploadImgTask.on('state_changed', 
        null,
        (error) => { console.error('실패사유는', error); reject(error); }, 
        async () => { resolve(await uploadImgTask.snapshot.ref.getDownloadURL()); }
      );
    });
  }

  return {uploadImageToStorage}
}