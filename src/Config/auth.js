import React, { useState, useEffect } from 'react'
import { Loading } from '../Components/Loading/Loading';
import firebaseConfig from './fire'

export const AuthContext = React.createContext();

export const AuthPro = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            // setLoading(false);
            setTimeout(() => {
                setLoading(false);
            },2000);
        })
    }, [])

    if (loading) {
        return <p><Loading/></p>;
    }

    return (    
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}