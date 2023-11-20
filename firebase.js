import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAjnu9gVtUUF_2ft8kYidKOIi2zUH1oV2U",
    authDomain: "login-e4a9a.firebaseapp.com",
    databaseURL: "https://login-e4a9a-default-rtdb.firebaseio.com",
    projectId: "login-e4a9a",
    storageBucket: "login-e4a9a.appspot.com",
    messagingSenderId: "753763470608",
    appId: "1:753763470608:web:5b545db17f553e285d6995"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;


    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                additionalInformation
            })
        }
        catch (error) {
            console.log('OOPS...Failed to create your account ', error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signinAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}