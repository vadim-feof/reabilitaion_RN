import $api from './api'

export default class AppointmentService {
    static async getAll() {
        const response = await $api.get('/appointment')
        return response.data
    }

    static async getByUser() {
        const response = await $api.get('/appointment/user')
        return response.data
    }

    static async create(newAppointment) {
        const response = await $api.post('/appointment', {
            ...newAppointment
        })
        return response.data
    }

    static async cancelByUser(_idAppointment) {
        const response = await $api.patch(`/appointment/${_idAppointment}`)
        return response.data
    }

    static async cancelByAdmin(_idAppointment) {
        const response = await $api.patch(`/appointment/cancel/${_idAppointment}`)
        return response.data
    }

    static async viewByAdmin(_idAppointment) {
        const response = await $api.patch(`/appointment/view/${_idAppointment}`)
        return response.data
    }
}