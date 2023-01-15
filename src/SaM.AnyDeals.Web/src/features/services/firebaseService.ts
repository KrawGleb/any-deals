import { deleteObject, ref } from "firebase/storage";
import firebaseStorage from "../store/firebaseStorage";

export class FirebaseService {
  public static deleteFile(url?: string) {
    if (!url) return;

    const fileRef = ref(firebaseStorage, url);
    deleteObject(fileRef);
  }
}
