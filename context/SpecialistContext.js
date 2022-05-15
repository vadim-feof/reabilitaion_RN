import {createContext, useContext, useState} from "react";
import {toastShow} from "../utils/toastShow";
import SpecialistService from "../services/SpecialistService";

export const SpecialistContext = createContext(null)

export const SpecialistProvider = ({children}) => {
    const [specialists, setSpecialists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchSpecialist = async () => {
        try {
            setIsLoading(true)
            const fetchedSpecialists = await SpecialistService.getAll()
            setSpecialists([...fetchedSpecialists])
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const addSpecialist = async (newSpecialist) => {
        try {
            setIsLoading(true)
            const addedSpecialist = await SpecialistService.create(newSpecialist)
            setSpecialists(prevSpecialists => [...prevSpecialists, addedSpecialist])
            toastShow('success', 'Специалист добавлен')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const updateSpecialist = async (specialist) => {
        try {
            setIsLoading(true)
            const updatedSpecialist = await SpecialistService.update(specialist)
            setSpecialists(prevSpecialist => prevSpecialist.map( specialist => {
                if (specialist._id === updatedSpecialist._id)
                    return updatedSpecialist
                return specialist
            }))
            toastShow('success', 'Специалист обновлен')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const removeSpecialist = async (specialist) => {
        try {
            setIsLoading(true)
            const deletedSpecialist = await SpecialistService.delete(specialist)
            setSpecialists(prevSpecialists => prevSpecialists.filter(
                specialistItem => specialistItem._id !== deletedSpecialist._id
            ))
            toastShow('success', 'Специалист удален')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        specialists,
        fetchSpecialist,
        addSpecialist,
        updateSpecialist,
        removeSpecialist,
        isLoading
    }
    return <SpecialistContext.Provider value={value}>
        {children}
    </SpecialistContext.Provider>
}

export const useSpecialist = () => {
    const context = useContext(SpecialistContext);
    if (!context)
        throw new Error('Хук useSpecialist должен быть использован внутри SpecialistProvider')
    return context
}