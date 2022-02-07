import React, {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        GoogleAuthProvider,   
        signInWithPopup, 
        FacebookAuthProvider,
    } from 'firebase/auth'
import {auth} from '../firebase'


export const authContext = createContext();

export const useAuth = e =>{
    const context = useContext(authContext)
    if(!context) throw new Error('There is not provider')
    return context;
}

export function AuthProvider({children}) {
     

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //registro
    const signUp =  (email, password) => createUserWithEmailAndPassword(auth, email, password);
    //logueo
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    //logout
    const logout = () => signOut(auth);
    //logueo con google

    const googleLogin = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    const facebookLogin = () =>{
        const facebookProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        } );

        return () => unSubscribe();
    }, [])
    


    return (
        <authContext.Provider value={{signUp, login, user, logout, loading, googleLogin, facebookLogin}}>
            {children}
        </authContext.Provider>
    );
}
 
