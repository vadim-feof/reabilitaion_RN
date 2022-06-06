import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthService from "../services/AuthService";
import {toastShow} from "../utils/toastShow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PictureService from "../services/PictureService";
import {STATIC_USER_UPLOAD} from "../services/api";
import {Alert} from "react-native";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        await authUser()
    }, []);

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

    const registrationUser = async (regData, callback) => {
        try {
            setIsLoading(true)
            const {message} = await AuthService.registration(regData)
            toastShow('success', message)
            callback()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const sendEmailCode = async (email, cb) => {
        try {
            setIsLoading(true)
            await AuthService.sendEmailCode(email)
            cb()
            toastShow('success', 'Код отправлен',
                'Если письмо не дошло, проверьте папку СПАМ или отправьте код повторно')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const verifyEmailCode = async (email, code, cb) => {
        try {
            setIsLoading(true)
            await AuthService.verifyEmailCode(email, code)
            cb()
            toastShow('success', 'Код проверен.', 'Продолжите регистрацию.')
        } catch (e) {
            console.log(e)
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
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const updateUser = async (newUserData, callback) => {
        try {
            setIsLoading(true)
            const {updatedUser} = await AuthService.update(newUserData)
            setUser(updatedUser)
            toastShow('success', 'Профиль изменен')
            callback()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const uploadPhoto = async (picture) => {
        try {
            setIsLoading(true)
            const {photo} = await PictureService.uploadPicture(picture.uri, STATIC_USER_UPLOAD)
            setUser(prevUser => ({...prevUser, photo}))
            toastShow('success', 'Фотография загружена')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const removePhoto = async () => {
        try {
            setIsLoading(true)
            await PictureService.removePicture(user.photo, STATIC_USER_UPLOAD)
            setUser(prevUser => ({...prevUser, photo: ''}))
            toastShow('success', 'Фотография удалена')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user,
        token,
        isLoading,
        loginUser,
        logOut,
        registrationUser,
        authUser,
        updateUser,
        uploadPhoto,
        removePhoto,
        sendEmailCode,
        verifyEmailCode
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

