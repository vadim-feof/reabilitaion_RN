import {createContext, useContext, useMemo, useState} from "react";
import AppointmentService from "../services/AppointmentService";
import {toastShow} from "../utils/toastShow";

export const AppointmentContext = createContext(null)

export const AppointmentProvider = ({children}) => {
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('process')
    const [isLoading, setIsLoading] = useState(false)

    const filteredAppointments = useMemo(() => {
        if (filter) {
            return filterAppointments(filter)
        }
        else {
            return appointments
        }
    }, [appointments, filter])

    const fetchUserAppointments = async () => {
        try {
            setIsLoading(true)
            const fetchedAppointments = await AppointmentService.getByUser()
            setAppointments(fetchedAppointments.reverse())
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const cancelAppointmentByUser = async (_idAppointment) => {
        try {
            setIsLoading(true)
            const {cancelledAppointment} = await AppointmentService.cancelByUser(_idAppointment)
            setAppointments(prevAppointments => prevAppointments.map(appointment => {
                if (appointment._id === cancelledAppointment._id)
                    return cancelledAppointment
                return appointment
            }))
            toastShow('success', 'Запись отменена')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchAllAppointments = async () => {
        try {
            setIsLoading(true)
            const fetchedAppointments = await AppointmentService.getAll()
            setAppointments(fetchedAppointments.reverse())
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const cancelAppointmentByAdmin = async (_idAppointment) => {
        try {
            setIsLoading(true)
            const {cancelledAppointment} = await AppointmentService.cancelByAdmin(_idAppointment)
            setAppointments(prevAppointments => prevAppointments.map(appointment => {
                if (appointment._id === cancelledAppointment._id)
                    return cancelledAppointment
                return appointment
            }))
            toastShow('success', 'Запись отменена')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmAppointmentByAdmin = async (_idAppointment) => {
        try {
            setIsLoading(true)
            const {confirmedAppointment} = await AppointmentService.confirmByAdmin(_idAppointment)
            setAppointments(prevAppointments => prevAppointments.map(appointment => {
                if (appointment._id === confirmedAppointment._id)
                    return confirmedAppointment
                return appointment
            }))
            toastShow('success', 'Запись подтверждена')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    function filterAppointments(filter) {
        return appointments.filter(appointment =>
            appointment.appointmentStatus === filter
        )
    }

    const value = {
        appointments,
        filteredAppointments,
        isLoading,
        setFilter,
        fetchUserAppointments,
        cancelAppointmentByUser,
        cancelAppointmentByAdmin,
        confirmAppointmentByAdmin,
        fetchAllAppointments
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
