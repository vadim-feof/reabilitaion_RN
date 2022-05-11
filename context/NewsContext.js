import {createContext, useContext, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import News from "../screens/DrawerScreens/News";
import NewsService from "../services/NewsService";

export const NewsContext = createContext(null)

export const NewsProvider = ({children}) => {
    const [news, setNews] = useState([])
    const [fetchError, setFetchError] = useState('')
    const [addError, setAddError] = useState('')
    const [removeError, setRemoveError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchNews = async () => {
        try {
            setIsLoading(true)
            const fetchedNews = await NewsService.getAll()
            setNews([...fetchedNews])
        } catch(e) {
            setFetchError(e.response.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const addNews = async (newNews) => {
        try {
            setIsLoading(true)
            const addedNews = await NewsService.create(newNews)
            setNews(prevNews => [addedNews, ...prevNews])
        } catch(e) {
            setAddError(e.response.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const removeNews = async (news) => {
        try {
            setIsLoading(true)
            const deletedNews = await NewsService.delete(news)
            setNews(prevNews => prevNews.filter(
                newsItem => newsItem._id !== deletedNews._id
            ))
        } catch(e) {
            setRemoveError(e.response.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        news,
        fetchNews,
        addNews,
        removeNews,
        fetchError,
        addError,
        removeError,
        isLoading
    }
    return <NewsContext.Provider value={value}>
        {children}
    </NewsContext.Provider>
}

export const useNews = () => {
    const context = useContext(NewsContext);
    if (!context)
        throw new Error('Хук useNews должен быть использован внутри NewsProvider')
    return context
}