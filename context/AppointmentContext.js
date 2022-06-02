import {createContext, useContext, useState} from "react";
import AppointmentService from "../services/AppointmentService";
import {toastShow} from "../utils/toastShow";

export const AppointmentContext = createContext(null)

export const AppointmentProvider = ({children}) => {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchUserAppointments = async () => {
        try {
            setIsLoading(true)
            const fetchedAppointments = await AppointmentService.getByUser()
            setAppointments(fetchedAppointments)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const cancelAppointmentByUser = async (_idAppointment) => {
        try {
            setIsLoading(true)
            const cancelledAppointment = await AppointmentService.cancelByUser(_idAppointment)
            setAppointments(prevAppointments => prevAppointments.map(appointment => {
                if (appointment._id === cancelledAppointment._id)
                    return cancelledAppointment
                return appointment
            }))
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        appointments,
        isLoading,
        fetchUserAppointments,
        cancelAppointmentByUser
    }


    return <AppointmentContext.Provider value={value}>
        {children}
    </AppointmentContext.Provider>
}

export const useAppointment = () => {
    const context = useContext(AppointmentContext)
    if (!context)
        throw new Error('Хук useAppointment должен быть использован внутри AppointmentProvider')
    return context
}