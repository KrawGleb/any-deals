import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCzU6G0jx3iOM6VdO9pUEzbr1FztjZfgrQ",
  authDomain: "listography-690a0.firebaseapp.com",
  databaseURL:
    "https://listography-690a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "listography-690a0",
  storageBucket: "gs://listography-690a0.appspot.com",
  messagingSenderId: "964387488071",
  appId: "1:964387488071:web:3d3c5189100cd089868c62",
});

const firebaseStorage = getStorage(firebaseApp);
export default firebaseStorage;
