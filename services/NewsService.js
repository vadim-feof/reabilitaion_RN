import $api from './api'

export default class NewsService {
    static async getAll() {
        const response = await $api.get('/news')
        return response.data
    }

    static async create(newNews) {
        const response = await $api.post('/news', {
            ...newNews
        })
        return response.data
    }

    static async update(news) {
        const response = await $api.put(`/news/${news._id}`, {
            news
        })
        return response.data
    }

    static async delete(news) {
        const response = await $api.delete(`/news/${news._id}`)
        return response.data
    }
}