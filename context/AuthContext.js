import React, {createContext, useContext, useState} from 'react';
import {toastShow} from "../utils/toastShow";;

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const loginUser = async () => {
        try {
            setIsLoading(true)

        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const registrationUser = async () => {
        try {
            setIsLoading(true)

        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const authUser = async () => {
        try {
            setIsLoading(true)

        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const fetchUser = async () => {
        try {
            setIsLoading(true)
            //запрос
            setUser({})
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const updateUser = async (specialist) => {
        try {
            setIsLoading(true)
            //запрос
            setUser({})
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user, fetchUser, updateUser
    }


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('Хук useAuth должен быть использован внутри AuthProvider')
    return context
}

