import $api from './api'

export default class QuestionsService {
    static async getAll() {
        const response = await $api.get('/question')
        return response.data
    }

    static async createCategory(name) {
        console.log('NAME',name)
        const response = await $api.post('/question', {
            name
        })
        return response.data
    }

    static async addQuestion(_id, question) {
        const response = await $api.put(`/question/${_id}`, { /*_id категори*/
            ...question
        })
        return response.data
    }

    static async deleteQuestion (_id, idQuestion) {
        const response = await $api.patch(`/question/${_id}`,  /*_id категори*/
            {},
            {params: {_idquestion:idQuestion}}
            )
        return response.data
    }

    static async deleteCategory(_id) {
        const response = await $api.delete(`/question/${_id}`)
        return response.data
    }
}