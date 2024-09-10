import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPwxmYjN9KfXXO74WjvdCfIhvXwe_lMuU",
  authDomain: "upload-github-project.firebaseapp.com",
  projectId: "upload-github-project",
  storageBucket: "upload-github-project.appspot.com",
  messagingSenderId: "171160672322",
  appId: "1:171160672322:web:a9139f4c563cd1b56675db",
  measurementId: "G-X974DRB9TZ",
};

const firebaseApp = initializeApp(firebaseConfig);

// AUTH

const auth = getAuth(firebaseApp);

export { auth };

// Store

import { getFirestore, setDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

async function insert(githubRepo: string, email: string) {
  const taskRef = doc(db, "tasks", email);

  const data: {
    email: string;
    githubRepo: string;
    task: string;
  } = {
    email,
    githubRepo: "https://github.com/" + githubRepo,
    task: "task1",
  };
  const options = {
    merge: true,
  };
  return await setDoc(taskRef, data, options);
}
export { db, insert };
