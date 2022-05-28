import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthService from "../services/AuthService";
import {toastShow} from "../utils/toastShow";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        await authUser()
    }, []);

    // TODO: регистрация
    const loginUser = async ({isEmail, login, password}, callback) => {
        try {
            setIsLoading(true)
            const {user: userData, token} = await AuthService.login(isEmail, login, password)
            setToken(token)
            setUser(userData)
            toastShow('success', 'Вход выполнен')
            callback()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const logOut = async (callback) => {
        try {
            setIsLoading(true)
            await AsyncStorage.removeItem('token')
            setToken('')
            setUser({})
            toastShow('success', 'Выход выполнен')
            callback()
        } catch (e) {
            console.log(e)
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
            const storageToken = await AsyncStorage.getItem('token')
            if (storageToken) {
                const {user: userData, token} = await AuthService.auth()
                setUser(userData)
                setToken(token)
            }
        } catch (e) {
            await AsyncStorage.removeItem('token')
            setToken('')
            setUser({})
            //console.log(e)
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
        user, token, isLoading, loginUser, logOut, registrationUser, authUser, updateUser
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

