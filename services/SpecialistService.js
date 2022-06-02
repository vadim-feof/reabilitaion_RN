import $api from './api'

export default class SpecialistService {
    static async getAll() {
        const response = await $api.get('/specialist')
        return response.data
    }

    static async create(newSpecialist) {
        const response = await $api.post('/specialist', {
            ...newSpecialist
        })
        return response.data
    }

    static async update(specialist) {
        const response = await $api.put(`/specialist/${specialist._id}`, {
            ...specialist
        })
        return response.data
    }

    static async delete(_id) {
        const response = await $api.delete(`/specialist/${_id}`)
        return response.data
    }

    static async getByService(_idService) {
        const response = await $api.get(`/specialist/service/${_idService}`)
        return response.data
    }
}