import {createContext, useContext, useState} from "react";
import ServicesService from "../services/ServicesService";
import {toastShow} from "../utils/toastShow";

export const ServicesContext = createContext(null)

export const ServicesProvider = ({children}) => {
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchServices = async () => {
        try {
            setIsLoading(true)
            const fetchedServices = await ServicesService.getAll()
            setServices([...fetchedServices])
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const addService = async (newService) => {
        try {
            setIsLoading(true)
            const addedService = await ServicesService.create(newService)
            setServices(prevService => [...prevService, addedService])
            toastShow('success', 'Услуга добавлена')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const updateService = async (service) => {
        try {
            setIsLoading(true)
            const updatedService = await ServicesService.update(service)
            setServices(prevService => prevService.map(service => {
                if (service._id === updatedService._id)
                    return updatedService
                return service
            }))
            toastShow('success', 'Услуга обновлена')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const removeService = async (_id) => {
        try {
            setIsLoading(true)
            const deletedServiceId = await ServicesService.delete(_id)
            setServices(prevService => prevService.filter(
                ServiceItem => ServiceItem._id !== deletedServiceId._id
            ))
            toastShow('success', 'Услуга удалена')
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const addServiceToSpec = async (_idService, _idSpecialist) => {
        try {
            setIsLoading(true)
            const {updatedSpecialist} = await ServicesService.addServiceToSpec(_idService, _idSpecialist)
            toastShow('success', 'Услуга добавлена к специалисту')
            return updatedSpecialist
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteServiceFromSpec = async (_idService, _idSpecialist) => {
        try {
            setIsLoading(true)
            const {updatedSpecialist} =await ServicesService.deleteServiceFromSpec(_idService, _idSpecialist)
            toastShow('success', 'Услуга удалена')
            return updatedSpecialist
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        services,
        fetchServices,
        addService,
        updateService,
        removeService,
        isLoading,
        addServiceToSpec,
        deleteServiceFromSpec
    }
    return <ServicesContext.Provider value={value}>
        {children}
    </ServicesContext.Provider>
}

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context)
        throw new Error('Хук useServices должен быть использован внутри ServicesProvider')
    return context
}
