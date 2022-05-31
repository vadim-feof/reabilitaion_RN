import $api from './api'

export default class LFKService {
    static async getAll() {
        const response = await $api.get('/lfk')
        return response.data
    }

    static async create(newItems) {
        const response = await $api.post('/lfk', {
            ...newItems
        })
        return response.data
    }

    static async update(items) {
        const response = await $api.put(`/lfk/${items._id}`, {
            ...items
        })
        return response.data
    }

    static async delete(_id) {
        const response = await $api.delete(`/lfk/${_id}`)
        return response.data
    }
}