import React, {createContext, useContext, useState} from 'react';
import {NewsContext} from "./NewsContext";
import NewsService from "../services/NewsService";
import {toastShow} from "../utils/toastShow";
import SpecialistService from "../services/SpecialistService";
import {SpecialistContext} from "./SpecialistContext";

export const UserContext = createContext(null)

export const UserProvider = ({children}) => {

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchUser = async () => {
        try {
            setIsLoading(true)
            //запрос
            setUser([...fetch_User])
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
            setUser(prevUser => prevUser.map( user => {
                if (user._id === user._id)
                    return user
                return user
            }))
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const removeUser = async (user) => {
        try {
            setIsLoading(true)
            //апрос
            setUser(prevUser => prevUser.filter(
                UserItem => UserItem._id !== deletedUser._id
            ))
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    const value = {
        user, fetchUser, updateUser, removeUser
    }


    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};

export const useSpecialist = () => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error('Хук useSpecialist должен быть использован внутри UserProvider')
    return context
}

