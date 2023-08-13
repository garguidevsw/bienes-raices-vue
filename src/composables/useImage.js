import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid';

export default function useImage() {

  const storage = useFirebaseStorage()

  const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`)

  const {
    url,
    upload,
    uploadError,
  } = useStorageFile(storageRefPath)

  function uploadImage(e) {
    const data = e.target.files[0]
    console.log(data);

    if(data){
      upload(data)
      console.log(uploadError);
    }
  }

  const image = computed(() => {
    return url.value ? url.value : null
  })

  return {
    uploadImage,
    image,
    url
  }
}