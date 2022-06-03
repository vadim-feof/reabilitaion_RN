import $api from './api'

export default class ServicesService {
    static async getAll() {
        const response = await $api.get('/services')
        return response.data
    }

    static async create(newService) {
        const response = await $api.post('/services', {
            ...newService
        })
        return response.data
    }

    static async update(service) {
        const response = await $api.put(`/services/${service._id}`, {
            ...service
        })
        return response.data
    }

    static async delete(_id) {
        const response = await $api.delete(`/services/${_id}`)
        return response.data
    }

    static async addServiceToSpec (_idService, _idSpecialist) {
        const response = await $api.patch(`/specialist/service/${_idSpecialist}`,
            {},
            {params: {_idService}}
        )
        return response.data
    }

    static async deleteServiceFromSpec (_idService, _idSpecialist) {
        const response = await $api.delete(`/specialist/service/${_idSpecialist}`,
            {params: {_idService}}
        )
        return response.data
    }

}