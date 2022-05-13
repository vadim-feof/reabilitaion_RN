import {createContext, useContext, useState} from "react";
import NewsService from "../services/NewsService";
import {toastShow} from "../utils/toastShow";

export const NewsContext = createContext(null)

export const NewsProvider = ({children}) => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchNews = async () => {
        try {
            setIsLoading(true)
            const fetchedNews = await NewsService.getAll()
            setNews([...fetchedNews.reverse()])
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const addNews = async (newNews) => {
        try {
            setIsLoading(true)
            const addedNews = await NewsService.create(newNews)
            setNews(prevNews => [addedNews, ...prevNews])
            toastShow('success', 'Новость добавлена')
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const updateNews = async (news) => {
        try {
            setIsLoading(true)
            const updatedNews = await NewsService.update(news)
            setNews(prevNews => prevNews.map(news => {
                if (news._id === updatedNews._id)
                    return updatedNews
                return news
            }))
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const removeNews = async (_id) => {
        try {
            setIsLoading(true)
            const deletedNews = await NewsService.delete(_id)
            setNews(prevNews => prevNews.filter(
                newsItem => newsItem._id !== deletedNews._id
            ))
        } catch(e) {
            toastShow('error', 'Что-то пошло не так...', e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        news,
        fetchNews,
        addNews,
        updateNews,
        removeNews,
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