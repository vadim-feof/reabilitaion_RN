import {createContext, useContext, useState} from "react";
import {toastShow} from "../utils/toastShow";
import QuestionsService from "../services/QuestionsService";

export const QuestionsContext = createContext(null)

export const QuestionsProvider = ({children}) => {
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCategory = async () => {
        try {
            setIsLoading(true)
            const fetchedQuestions = await QuestionsService.getAll()
            setCategory(fetchedQuestions)
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const createCategory = async (name) => {
        try {
            setIsLoading(true)
            const addedCategory = await QuestionsService.createCategory(name)
            setCategory(prevCategory => [...prevCategory, addedCategory ])
            toastShow('success', 'Категория добавлена')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const addQuestion = async (_id,question) => {
        try {
            setIsLoading(true)
            const updatedCategory = await QuestionsService.addQuestion(_id,question)
            setCategory(prevCategory => prevCategory.map(category => {
                if (category._id === updatedCategory._id)
                    return updatedCategory
                return category
            }))
            toastShow('success', 'Вопрос добавлен',
                `Вопрос добавлен в категорию  ${updatedCategory.name}`)
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteQuestion = async (_id, idQuestion) => {
        try {
            setIsLoading(true)
            const updatedCategory = await QuestionsService.deleteQuestion(_id, idQuestion)
            setCategory(prevCategory => prevCategory.map(category => {
                if (category._id === updatedCategory._id)
                    return updatedCategory
                return category
            }))
            toastShow('success', 'Вопрос удален')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }


    const deleteCategory = async (_id) => {
        try {
            setIsLoading(true)
            const deletedCategoryId = await QuestionsService.deleteCategory(_id)
            setCategory(prevCategory => prevCategory.filter(
                CategoryItem => CategoryItem._id !== deletedCategoryId._id
            ))
            toastShow('success', 'Категория удалена')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        category,
        fetchCategory,
        createCategory,
        addQuestion,
        deleteQuestion,
        deleteCategory,
        isLoading
    }
    return <QuestionsContext.Provider value={value}>
        {children}
    </QuestionsContext.Provider>
}

export const useQuestions = () => {
    const context = useContext(QuestionsContext);
    if (!context)
        throw new Error('Хук useServices должен быть использован внутри QuestionsProvider')
    return context
}