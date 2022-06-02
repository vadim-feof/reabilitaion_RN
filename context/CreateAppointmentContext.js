import {createContext, useContext, useState} from "react";
import ServicesService from "../services/ServicesService";
import SpecialistService from "../services/SpecialistService";
import AppointmentService from "../services/AppointmentService";
import {toastShow} from "../utils/toastShow";


export const CreateAppointmentContext = createContext(null)

export const CreateAppointmentProvider = ({children}) => {
    const [services, setServices] = useState([])
    const [specialists, setSpecialists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchServices = async () => {
        try {
            setIsLoading(true)
            const services = await ServicesService.getAll()
            setServices(services)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchSpecialistsByService = async (_idService) => {
        try {
            setIsLoading(true)
            const specialists = await SpecialistService.getByService(_idService)
            setSpecialists(specialists)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const createAppointment = async (appointmentData, cb) => {
        try {
            setIsLoading(true)
            const appointment = await AppointmentService.create(appointmentData)
            toastShow('success', 'Запись создана')
            cb()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        services, specialists, isLoading,
        fetchServices, fetchSpecialistsByService, createAppointment
    }

    return <CreateAppointmentContext.Provider value={value}>
        {children}
    </CreateAppointmentContext.Provider>
}


export const useCreateAppointment = () => {
    const context = useContext(CreateAppointmentContext);
    if (!context)
        throw new Error('Хук useCreateAppointment должен быть использован внутри CreateAppointmentProvider')
    return context
}