import $api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthService {
    static async login(isEmail, login, password) {
        let loginData
        if (isEmail) {
            loginData = {
                email: login,
                password
            }
        }
        else {
            loginData = {
                phone: login,
                password
            }
        }
        const response = await $api.post('/login', loginData)
        await AsyncStorage.setItem('token', response.data.token)
        return response.data
    }

    static async update(newUserData) {
        const response = await $api.patch(`/user`, {}, {
            params: {
                ...newUserData
            }
        })
        return response.data
    }

    static async registration(regData) {
        const response = await $api.post('/registration', regData)
        return response.data
    }

    static async sendEmailCode(email) {
        const response = await $api.get('/email/sendcode', {
            params: {email}
        })
        return response.data
    }

    static async verifyEmailCode(email, code) {
        const response = await $api.get('/email/verifycode', {
            params: {email, code}
        })
        return response.data
    }

    static async auth() {
        const response = await $api.get('/auth')
        await AsyncStorage.setItem('token', response.data.token)
        return response.data
    }
}
