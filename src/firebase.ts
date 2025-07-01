// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import type { Project } from "./types/Project";
import type { Blog } from "./types/Blog";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Kkal6FzhTxObhaNEcJ-PrCqdZarChlg",
  authDomain: "dsrajan-architects.firebaseapp.com",
  projectId: "dsrajan-architects",
  storageBucket: "dsrajan-architects.firebasestorage.app",
  messagingSenderId: "594890207572",
  appId: "1:594890207572:web:b45671846f0b7d9aee58c1",
  measurementId: "G-8LC3P0CJ97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const fetchProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

export const fetchBlogs = async (): Promise<Blog[]> => {
  const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
};

export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  const docRef = doc(db, 'blogs', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Blog;
};
