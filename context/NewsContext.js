import {createContext, useContext, useState} from "react";

export const NewsContext = createContext(null)

export const NewsProvider = ({children}) => {
    const [news, setNews] = useState([])
    const [fetchError, setFetchError] = useState('')
    const [addError, setAddError] = useState('')
    const [removeError, setRemoveError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchNews = () => {
        const addNews = (newNews) => {
            try {
                setIsLoading(true)
                // обращение к api...
                setTimeout(() => {}, 1000)
            } catch(e) {
                setFetchError(e.response.data.message)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const addNews = (newNews) => {
        try {
            setIsLoading(true)
            // обращение к api...
            setNews(prevNews => ({
                newNews,
                ...prevNews
            }))
        } catch(e) {
            setAddError(e.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const removeNews = (news) => {
        try {
            setIsLoading(true)
            // обращение к api...
            setNews(prevNews => prevNews.filter(
                newsItem => newsItem._id !== news._id
            ))
        } catch(e) {
            setRemoveError(e.response.data.message)
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