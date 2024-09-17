import React, { createContext, useEffect, useState } from 'react';
import { app } from '../components/firebase/firebase.config';
import axios from "axios";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                // Get JWT token
                const userInfo = { email: currentUser.email };
                axios.post('http://localhost:5000/jwt', userInfo) 
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token); 
                        }
                    })
                    .catch(error => console.error('Error getting token:', error));
            } else {
                // Remove token
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => unsubscribed();
    }, []);

    const authInfo = {
        user,
        signIn,
        googleSignIn,
        createUser,
        logOut,
        loading,
        setLoading,
        updateUserProfile,
        resetPassword
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;