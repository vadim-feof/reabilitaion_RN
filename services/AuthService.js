import $api from "./api";

export default class AuthService {
    static async login({email, phone, password}) {
        const response = await $api.post('/login', {
            email, phone, password
        })
        return response.data
    }

    static async registration(regData) {
        const response = await $api.post('/registration', regData)
        return response.data
    }

    static async auth() {
        const response = await $api.get('/auth')

    }
}