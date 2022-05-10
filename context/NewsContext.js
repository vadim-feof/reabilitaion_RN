import {createContext, useContext, useMemo, useState} from "react";

export const NewsContext = createContext(null)

export const NewsProvider = ({children}) => {
    const [news, setNews] = useState([
        {
            date: '01.01.2022',
            title: 'Мультидисциплинарный подход в диагностике и лечении заболеваний ' +
                'пищеварительной и дыхательной систем',
            content: 'УВАЖАЕМЫЕ КОЛЛЕГИ! Приглашаем Вас 12 ноября в ' +
                '9.00 (по МСК) принять участие в III Всероссийской ' +
                'научно-практической конференции «Мультидисциплинарный подход ' +
                'в диагностике и лечении заболеваний пищеварительной и дыхательной систем», ' +
                'посвященной памяти профессора В.Ю. Муравьева. Отдельная секция посвящена ' +
                'работе среднего медицинского персонала и роли медицинских сестер в организации ' +
                'работы эндоскопических отделений ...\n' +
                'Подробнеее',
            key: '1'
        },
        {
            date: '01.01.2022',
            title: 'Мультидисциплинарный подход в диагностике и лечении заболеваний ' +
                'пищеварительной и дыхательной систем',
            content: 'УВАЖАЕМЫЕ КОЛЛЕГИ! Приглашаем Вас 12 ноября в ' +
                '9.00 (по МСК) принять участие в III Всероссийской ' +
                'научно-практической конференции «Мультидисциплинарный подход ' +
                'в диагностике и лечении заболеваний пищеварительной и дыхательной систем», ' +
                'посвященной памяти профессора В.Ю. Муравьева. Отдельная секция посвящена ' +
                'работе среднего медицинского персонала и роли медицинских сестер в организации ' +
                'работы эндоскопических отделений ...\n' +
                'Подробнеее',
            key: '2'
        }

    ])
    const [fetchError, setFetchError] = useState('')
    const [addError, setAddError] = useState('')
    const [removeError, setRemoveError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchNews = () => {
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

    const addNews = async (newNews) => {
        try {
            setIsLoading(true)
            // обращение к api...
            setNews(prevNews => [newNews, ...prevNews])
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
            setTimeout(() => {}, 1000)
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