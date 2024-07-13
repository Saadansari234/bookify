import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, where, query } from "firebase/firestore"
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBg4JRzDvL4Rr6PJxCHXZw2jwzOziDio6Y",
  authDomain: "bookify-d0762.firebaseapp.com",
  projectId: "bookify-d0762",
  storageBucket: "bookify-d0762.appspot.com",
  messagingSenderId: "330631563525",
  appId: "1:330631563525:web:cc78f705f1ca8832d84f6c"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const Firestore = getFirestore(FirebaseApp)
const Storage = getStorage(FirebaseApp)

const googleProvider = new GoogleAuthProvider()

// Firebase context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {

  //signup
  const signupWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(FirebaseAuth, email, password);
  };


  // signin
  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
  };

  // signin with google
  const signInWithGoogle = () => {
    return signInWithPopup(FirebaseAuth, googleProvider)
  }


  // user validation if user is already logged in 
  const [user, setuser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setuser(user)
      } else {
        setuser(null)
      }
    })
  }, [])

  const isLogedin = user ? true : false

  // signout 
  const signUserOut=()=>{
    signOut(FirebaseAuth)
  }

  //firestore
  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(Storage, `uploads/images/${Date.now()}-${cover.name}`);
    const metadata = {
      contentType: cover.type,
    };
    const uploadResult = await uploadBytes(imageRef, cover, metadata);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    return await addDoc(collection(Firestore, 'books'), {
      name,
      isbn,
      price,
      imageURL: downloadURL,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }

  //getting data from firestore
  const listAllData = () => {
    return getDocs(collection(Firestore, "books"))
  }

  // download image url to render on screen
  const getImageURL = (path) => {
    return getDownloadURL(ref(Storage, path))
  }

  //  for getting a signle book details
  const getBookById = async (id) => {
    const docRef = doc(Firestore, "books", id)
    const result = await getDoc(docRef)
    return result
  }

  // placing order of a book with buy now btn
  const placeOrder = async (bookId, Qty) => {
    const collectionRef = collection(Firestore, "books", bookId, "order")
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      Qty
    })
    return result
  }

  // rendering all orders on navigate to order page
  const fetchMyOrders= async(userId)=>{
    if (!user) return null
    const collectionRef= collection(Firestore, "books")
    const q= query(collectionRef, where("userID","==",userId) )

    const result= await getDocs(q)
    return result

  }

  // viewing orders 
  const getOrders= async(bookId)=>{
    const collectionRef= collection(Firestore,"books", bookId, "order")
    const result= await getDocs(collectionRef)
    return result 
  }


  return (
    <FirebaseContext.Provider value={{
      signupWithEmailAndPassword,
      signInUserWithEmailAndPassword,
      signInWithGoogle,
      isLogedin,
      signUserOut,
      handleCreateNewListing,
      listAllData,
      getImageURL,
      getBookById,
      placeOrder,
      fetchMyOrders,
      user,
      getOrders
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
