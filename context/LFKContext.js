import {createContext, useContext, useState} from "react";
import {toastShow} from "../utils/toastShow";
import LFKService from "../services/LFKService";

export const LFKContext = createContext(null)

export const LFKProvider = ({children}) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchItems = async () => {
        try {
            setIsLoading(true)
            const fetchedItems = await LFKService.getAll()
            setItems([...fetchedItems.reverse()])
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const addItems = async (newItems) => {
        try {
            setIsLoading(true)
            const addedItems = await LFKService.create(newItems)
            setItems(prevItems => [addedItems, ...prevItems])
            toastShow('success', 'Комплекс ЛФК добавлен')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const updateItems = async (items) => {
        try {
            setIsLoading(true)
            const updatedItems = await LFKService.update(items)
            setItems(prevItems => prevItems.map(items => {
                if (items._id === updatedItems._id)
                    return updatedItems
                return items
            }))
            toastShow('success', 'Копмлекс ЛФК обновлен')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const removeItems = async (_id) => {
        try {
            setIsLoading(true)
            const deletedItems = await LFKService.delete(_id)
            setItems(prevNews => prevNews.filter(
                newsItem => newsItem._id !== deletedItems._id
            ))
            toastShow('success', 'Комплекс ЛФК удален')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        items,
        fetchItems,
        addItems,
        updateItems,
        removeItems,
        isLoading
    }
    return <LFKContext.Provider value={value}>
        {children}
    </LFKContext.Provider>
}

export const useLFK = () => {
    const context = useContext(LFKContext);
    if (!context)
        throw new Error('Хук useNews должен быть использован внутри NewsProvider')
    return context
}